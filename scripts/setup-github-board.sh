#!/usr/bin/env bash
# One-time setup of the GitHub task board for this repo. Safe to re-run:
# existing labels are updated, existing issues (same title) and the project are reused.
#
#   gh auth login                    # once
#   gh auth refresh -s project       # Projects permission
#   scripts/setup-github-board.sh
#
# Creates: labels, one issue per docs/ai/tasks/NN-*.md spec, and the project board
# "Glitter & Polish — Website Tasks" (Status: Todo / In Progress / Code Review / Done) with every
# roadmap issue in Todo.
set -euo pipefail
cd "$(dirname "$0")/.."

OWNER="${BOARD_OWNER:-jisanjung}"
REPO="${BOARD_REPO:-jisanjung/Glitter-and-Polish}"
TITLE="${BOARD_TITLE:-Glitter & Polish — Website Tasks}"
export BOARD_OWNER="$OWNER" BOARD_REPO="$REPO" BOARD_TITLE="$TITLE"

command -v gh >/dev/null || { echo "Install the GitHub CLI first: https://cli.github.com" >&2; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login && gh auth refresh -s project" >&2; exit 1; }

echo "== Labels"
label() { gh label create "$1" --repo "$REPO" --color "$2" --description "$3" --force >/dev/null && echo "  $1"; }
label "task"               "B4687A" "Website task tracked on the board"
label "priority:chat"      "D93F0B" "Requested by the owner in chat — do first (confirm if a dependency must go first)"
label "blocked:needs-input" "FBCA04" "Waiting on the owner (content, access or a decision)"
label "area:content"       "F3E3E3" "Copy, prices, photos"
label "area:booking"       "96505F" "Booking page and availability"
label "area:email"         "3A2A33" "Email addresses, confirmations"
label "area:admin"         "6E5F67" "Admin page"
label "infra"              "C5DEF5" "Domain, DNS, hosting, Firebase"
for n in 01 02 03 04 05 06 07 08 09 10; do label "order:$n" "EADDDB" "Recommended order $n"; done

echo "== Project"
NUM="$(gh project list --owner "$OWNER" --limit 100 --format json \
        --jq ".projects[] | select(.title == \"$TITLE\") | .number" | head -n1)"
if [ -z "$NUM" ]; then
    NUM="$(gh project create --owner "$OWNER" --title "$TITLE" --format json --jq .number)"
    echo "  created project #$NUM"
else
    echo "  using existing project #$NUM"
fi
gh project link "$NUM" --owner "$OWNER" --repo "$REPO" >/dev/null 2>&1 || true

echo "== Status columns"
FIELDS="$(gh project field-list "$NUM" --owner "$OWNER" --format json)"
if echo "$FIELDS" | grep -q '"Code Review"'; then
    echo "  Todo / In Progress / Code Review / Done present"
else
    ITEMS="$(gh project item-list "$NUM" --owner "$OWNER" --limit 1 --format json --jq '.items | length')"
    FIELD_ID="$(gh project field-list "$NUM" --owner "$OWNER" --format json --jq '.fields[] | select(.name=="Status") | .id')"
    if [ "$ITEMS" = "0" ] && [ -n "$FIELD_ID" ]; then
        # Safe only on an empty board: replacing options would clear existing cards' status.
        gh api graphql -f query='mutation($f:ID!){ updateProjectV2Field(input:{fieldId:$f, singleSelectOptions:[
            {name:"Todo",color:GRAY,description:"Waiting"},
            {name:"In Progress",color:YELLOW,description:"Being worked on (one at a time)"},
            {name:"Code Review",color:PURPLE,description:"PR open with preview; a developer reviews and merges"},
            {name:"Done",color:GREEN,description:"Merged"}]}){ projectV2Field{ ... on ProjectV2SingleSelectField { name } } } }' \
            -f f="$FIELD_ID" >/dev/null && echo "  added Code Review column"
    else
        echo "  ⚠ Add a \"Code Review\" option to the Status field (between In Progress and Done)"
        echo "    in the project's settings. The board already has cards, so it isn't changed automatically."
    fi
fi

echo "== Issues"
for spec in docs/ai/tasks/[0-9][0-9]-*.md; do
    title="$(head -n1 "$spec" | sed 's/^# *//')"
    labels="$(grep -m1 -o '<!-- labels: [^>]*-->' "$spec" | sed 's/<!-- labels: *//; s/ *-->//')"
    existing="$(gh issue list --repo "$REPO" --state all --limit 200 --json number,title \
        --jq ".[] | select(.title == \"$title\") | .number" | head -n1)"
    if [ -n "$existing" ]; then
        num="$existing"; echo "  #$num exists: $title"
    else
        body="$(mktemp)"
        { tail -n +3 "$spec"; printf '\n---\nSpec file: `%s` · Agent rules: `AGENTS.md`\n' "$spec"; } > "$body"
        url="$(gh issue create --repo "$REPO" --title "$title" --label "$labels" --body-file "$body")"
        rm -f "$body"
        num="${url##*/}"; echo "  #$num created: $title"
    fi
    on_board="$(gh project item-list "$NUM" --owner "$OWNER" --limit 500 --format json \
        --jq ".items[] | select(.content.number == $num and .content.repository == \"$REPO\") | .id" | head -n1)"
    if [ -z "$on_board" ]; then scripts/board.sh add "$num"; fi
done

echo
echo "Done. Board: https://github.com/users/$OWNER/projects/$NUM"
echo "Tip: in the project's Board view, group by Status to get the Todo / In Progress / Code Review / Done columns."
scripts/board.sh list
