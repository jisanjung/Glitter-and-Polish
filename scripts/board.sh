#!/usr/bin/env bash
# Task board helper (GitHub Projects v2) for agents and humans.
#   scripts/board.sh list                      # status, issue, title, labels
#   scripts/board.sh add <issue#>              # put an issue on the board in Todo
#   scripts/board.sh move <issue#> "<Status>"  # Todo | In Progress | Code Review | Done
# Needs: gh CLI logged in with the "project" scope (gh auth refresh -s project).
set -euo pipefail

OWNER="${BOARD_OWNER:-jisanjung}"
REPO="${BOARD_REPO:-jisanjung/Glitter-and-Polish}"
TITLE="${BOARD_TITLE:-Glitter & Polish — Website Tasks}"

die() { echo "board.sh: $*" >&2; exit 1; }
command -v gh >/dev/null || die "gh CLI not installed (https://cli.github.com). Fall back to docs/ai/TASKS.md."
gh auth status >/dev/null 2>&1 || die "gh is not logged in. Run: gh auth login && gh auth refresh -s project"

project_number() {
    gh project list --owner "$OWNER" --limit 100 --format json \
        --jq ".projects[] | select(.title == \"$TITLE\") | .number" | head -n1
}

NUM="$(project_number)"
[ -n "$NUM" ] || die "project \"$TITLE\" not found for $OWNER. Run scripts/setup-github-board.sh first."

project_id() { gh project view "$NUM" --owner "$OWNER" --format json --jq '.id'; }
status_field_id() {
    gh project field-list "$NUM" --owner "$OWNER" --format json \
        --jq '.fields[] | select(.name == "Status") | .id'
}
status_option_id() { # $1 = option name
    gh project field-list "$NUM" --owner "$OWNER" --format json \
        --jq ".fields[] | select(.name == \"Status\") | .options[] | select(.name == \"$1\") | .id"
}
item_id_for_issue() { # $1 = issue number
    gh project item-list "$NUM" --owner "$OWNER" --limit 500 --format json \
        --jq ".items[] | select(.content.number == $1 and .content.repository == \"$REPO\") | .id" | head -n1
}

set_status() { # $1 = item id, $2 = status name
    local opt; opt="$(status_option_id "$2")"
    [ -n "$opt" ] || die "status \"$2\" doesn't exist on the board (expected Todo, In Progress, Code Review, Done). Add missing columns in the project settings → Status field."
    gh project item-edit --project-id "$(project_id)" --id "$1" \
        --field-id "$(status_field_id)" --single-select-option-id "$opt" >/dev/null
}

cmd="${1:-list}"
case "$cmd" in
    list)
        gh project item-list "$NUM" --owner "$OWNER" --limit 500 --format json --jq '
            .items[] | [(.status // "No status"), ("#" + ((.content.number // 0) | tostring)),
                        .content.title, ((.labels // []) | join(","))] | @tsv' |
        sort -t$'\t' -k1,1 -k4,4 | column -t -s$'\t'
        ;;
    add)
        [ -n "${2:-}" ] || die "usage: board.sh add <issue#>"
        url="$(gh issue view "$2" --repo "$REPO" --json url --jq .url)"
        id="$(gh project item-add "$NUM" --owner "$OWNER" --url "$url" --format json --jq .id)"
        set_status "$id" "Todo"
        echo "#$2 added to \"$TITLE\" in Todo"
        ;;
    move)
        [ -n "${2:-}" ] && [ -n "${3:-}" ] || die "usage: board.sh move <issue#> \"Todo|In Progress|Code Review|Done\""
        id="$(item_id_for_issue "$2")"
        [ -n "$id" ] || die "issue #$2 isn't on the board. Run: scripts/board.sh add $2"
        set_status "$id" "$3"
        echo "#$2 → $3"
        ;;
    *) die "unknown command \"$cmd\" (list | add | move)";;
esac
