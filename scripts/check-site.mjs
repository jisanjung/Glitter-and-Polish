#!/usr/bin/env node
// Zero-dependency site checks. Run: npm run check  (or node scripts/check-site.mjs)
// - local src/href targets exist (exact letter case, so it matches Linux hosts)
// - same-site #anchors point at ids that exist
// - no duplicate ids within a page
// - every root *.html page is a Vite build input
// - JSON files parse
// - relative links in Markdown docs resolve
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, basename, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warn = [];
const rel = (p) => relative(root, p) || ".";
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "dist-ssr"]);

// Exact-case existence check (macOS/Windows file systems ignore case; most hosts don't).
function existsExact(abs) {
    if (!existsSync(abs)) return false;
    const parts = relative(root, abs).split(sep).filter(Boolean);
    let cur = root;
    for (const part of parts) {
        if (part === "..") { cur = dirname(cur); continue; }
        if (!readdirSync(cur).includes(part)) return false;
        cur = join(cur, part);
    }
    return true;
}

function walk(dir, ext, out = []) {
    for (const name of readdirSync(dir)) {
        if (SKIP_DIRS.has(name)) continue;
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p, ext, out);
        else if (name.endsWith(ext)) out.push(p);
    }
    return out;
}

const isExternal = (u) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u); // http:, mailto:, tel:, data:, //cdn
const stripHtmlComments = (s) => s.replace(/<!--[\s\S]*?-->/g, "");

// ---------- HTML pages ----------
const pages = readdirSync(root).filter((f) => f.endsWith(".html")).map((f) => join(root, f));
const idsByPage = new Map();

for (const page of pages) {
    const html = stripHtmlComments(readFileSync(page, "utf8"));
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const seen = new Set();
    for (const id of ids) {
        if (seen.has(id)) errors.push(`${rel(page)}: duplicate id="${id}"`);
        seen.add(id);
    }
    idsByPage.set(basename(page), seen);
}

for (const page of pages) {
    const html = stripHtmlComments(readFileSync(page, "utf8"));
    // `content` is only a URL on image-type <meta> tags (og:image, twitter:image); other
    // meta content (descriptions, theme-color "#FBF7F4") is plain text.
    const refs = [
        ...[...html.matchAll(/\s(?:src|href|srcset|action)="([^"]*)"/g)].map((m) => m[1]),
        ...[...html.matchAll(/<meta\b[^>]*(?:property|name)="(?:og:image|twitter:image)[^"]*"[^>]*>/gi)]
            .map((m) => (m[0].match(/\scontent="([^"]*)"/) || [])[1])
            .filter(Boolean),
    ];
    for (let raw of refs) {
        raw = raw.trim();
        if (!raw || isExternal(raw)) continue;
        // srcset: "a.jpg 1x, b.jpg 2x"
        const candidates = raw.includes(",") && /\s\d+[wx]/.test(raw)
            ? raw.split(",").map((s) => s.trim().split(/\s+/)[0])
            : [raw];
        for (const url of candidates) {
            const [pathPart, hash] = url.split("#");
            const clean = pathPart.split("?")[0];
            if (!clean && hash !== undefined) {
                if (hash && hash !== "top" && !idsByPage.get(basename(page)).has(hash)) {
                    errors.push(`${rel(page)}: link "#${hash}" has no matching id`);
                }
                continue;
            }
            // Only check things that look like files/paths (skip meta content like "website").
            if (!/[./]/.test(clean)) continue;
            const abs = clean.startsWith("/") ? join(root, clean) : resolve(dirname(page), clean);
            if (!existsExact(abs)) {
                errors.push(`${rel(page)}: missing local file "${url}"`);
                continue;
            }
            if (hash && clean.endsWith(".html")) {
                const ids = idsByPage.get(basename(abs));
                if (ids && !ids.has(hash)) errors.push(`${rel(page)}: "${url}" — no id="${hash}" in ${basename(abs)}`);
            }
        }
    }
}

// ---------- Vite inputs ----------
const viteConfig = readFileSync(join(root, "vite.config.js"), "utf8");
for (const page of pages) {
    const name = basename(page);
    if (!viteConfig.includes(`'${name}'`) && !viteConfig.includes(`"${name}"`)) {
        errors.push(`vite.config.js: ${name} is not a build input (it won't be in dist/)`);
    }
}

// ---------- JSON ----------
for (const file of walk(root, ".json")) {
    try { JSON.parse(readFileSync(file, "utf8")); }
    catch (e) { errors.push(`${rel(file)}: invalid JSON — ${e.message}`); }
}

// ---------- Markdown relative links ----------
for (const file of walk(root, ".md")) {
    const md = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
    for (const m of md.matchAll(/\]\(([^)\s]+)\)/g)) {
        const target = m[1].split("#")[0];
        if (!target || isExternal(target)) continue;
        if (!existsSync(resolve(dirname(file), target))) errors.push(`${rel(file)}: broken link "${m[1]}"`);
    }
}

// ---------- Report ----------
for (const w of warn) console.warn(`warn  ${w}`);
if (errors.length) {
    for (const e of errors) console.error(`FAIL  ${e}`);
    console.error(`\n${errors.length} problem(s) found.`);
    process.exit(1);
}
console.log(`OK  ${pages.length} pages, local links/assets, ids, vite inputs, JSON and docs links look good.`);
