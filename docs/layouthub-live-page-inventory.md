# LayoutHub Live Page Inventory

## Purpose

This document is a live migration inventory scaffold for LayoutHub-dependent or suspected LayoutHub-dependent pages.

It is meant to be filled during:

- Shopify Admin review
- storefront preview review
- migration planning for native Dawn/Vitacoral replacement pages

This is planning only.

- Do not remove LayoutHub yet.
- Do not migrate content yet.
- Do not change page handles during audit unless migration is already approved later.

## Status Legend

### Current source

- `Native`
- `LayoutHub`
- `Unknown`

### Current storefront status

- `OK`
- `Placeholder`
- `Broken`
- `Unknown`

### Has useful content to migrate

- `Yes`
- `No`
- `Unknown`

## Live Page Inventory

| Priority | Page title | Storefront URL / handle | Current source | Current template assignment | Current storefront status | Has useful content to migrate | Suggested native target template | Footer/PDP/Homepage dependency | Migration action | Notes / open questions |
|---|---|---|---|---|---|---|---|---|---|---|
| P0 | Biz Kimiz? | `/pages/biz-kimiz` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` | Homepage CTA, likely footer trust | Verify live page, confirm source, migrate if trust content is real | Already referenced by homepage trust CTA |
| P0 | Kalite Belgeleri | `/pages/kalite-sertifikalari` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future document page section | PDP trust/story CTA, likely footer | Verify live page, preserve handle, migrate if real document/trust content exists | Already referenced from PDP product story |
| P0 | Hammadde Sertifikaları | `/pages/hammadde-sertifikalari` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future document page section | PDP trust/story CTA | Verify live page, preserve handle, migrate if real document/trust content exists | Already referenced from PDP product story |
| P0 | Hangi Eczanelerde Varız? | `TBD` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future pharmacy list section | Likely footer/trust support | Find exact handle in Admin, verify if page is live, migrate if useful | Exact handle unknown from repo |
| P0 | Eczane listesi | `TBD` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future pharmacy list section | Likely footer/trust support | Find exact handle in Admin, deduplicate against pharmacy page above | May be same page as “Hangi Eczanelerde Varız?” |
| P0 | Sertifikalar | `TBD` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future document page section | Likely footer/trust support | Find exact handle, confirm whether this is separate from Kalite/Hammadde pages | May overlap with other certificate pages |
| P0 | Ürün Onayları | `TBD` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future approval list section | Likely PDP/footer trust support | Find exact handle, preserve URL if indexed, migrate if page contains real trust info | Could be regulatory approval-style page |
| P0 | Kalite Belgeleri | `TBD or /pages/kalite-belgeleri` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future document page section | Likely footer/PDP trust support | Confirm if this is distinct from `/pages/kalite-sertifikalari` | Title overlap with existing known URL needs clarification |
| P1 | Additional trust/corporate page | `TBD` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` | Possible footer dependency | Add rows after Admin review | Use for non-blocking but useful corporate pages |
| P1 | Additional certificate/help page | `TBD` | Unknown | Unknown | Unknown | Unknown | `templates/page.json` or future document page section | Unknown | Add rows after Admin review | Use if more app-driven pages are discovered |
| P2 | Legacy campaign or obsolete corporate page | `TBD` | Unknown | Unknown | Unknown | Unknown | Native page only if still needed | None or low | Mark cleanup/redirect candidate if placeholder and unlinked | Do not migrate low-value legacy pages first |

## How To Verify In Shopify Admin

### Admin checklist

1. Go to `Shopify Admin > Online Store > Pages`.
2. Search for each known or suspected page title.
3. Open each page record.
4. Record:
   - page title
   - handle
   - visibility
   - current theme template
5. Check whether the content is:
   - native page content
   - LayoutHub/app placeholder content
   - empty/broken
6. Open the storefront URL in preview.
7. Record storefront status:
   - `OK`
   - `Placeholder`
   - `Broken`
8. Record whether the page contains useful trust/corporate content worth migrating.
9. Check whether the page is linked from:
   - homepage
   - PDP
   - footer
   - menu
10. Preserve the current URL handle for any page that is live, linked, or indexed.

## Suggested Verification Workflow

### Pass 1: Confirm exact page inventory

- confirm if `Hangi Eczanelerde Varız?` and `Eczane listesi` are one page or two
- confirm if `Kalite Belgeleri` and `/pages/kalite-sertifikalari` are one page or two
- confirm whether `Sertifikalar` is a separate page or just a navigation label

### Pass 2: Confirm current rendering source

For each page, determine whether it is:

- native Shopify page content rendered through `page.json`
- LayoutHub-rendered content
- placeholder-only app shell
- broken/unused legacy page

### Pass 3: Confirm dependency level

For each page, mark:

- linked from homepage
- linked from PDP
- linked from footer
- not linked but still useful
- not linked and likely cleanup candidate

## Migration Decision Rules

- If a page has real trust content and is linked from homepage, PDP, or footer: migrate as `P0`.
- If a page is placeholder and not linked: do not migrate yet; mark it as a cleanup/redirect candidate.
- If page content exists only in LayoutHub: copy content manually later into native page content or a future native section.
- If a URL is already indexed or linked: preserve the existing URL handle.
- If two page titles appear to describe the same content: verify duplicates before migrating.
- If a page contains document/certificate style content rather than long editorial text: prefer a future structured native section instead of a plain text-only page.

## Suggested Native Target Types

### Standard trust page

Use when the page is mostly editorial content:

- about / who we are
- trust / brand story
- quality approach overview

Suggested target:

- `templates/page.json`
- rendered with `sections/main-page.liquid`

### Document / certificate list page

Use when the page is mostly:

- certificates
- regulatory approvals
- linked files
- grouped trust documentation

Suggested target:

- `templates/page.json` initially
- later enhanced by a dedicated native section in `LAYOUTHUB-003`

### Pharmacy list page

Use when the page contains:

- pharmacy availability
- long list/table of locations
- city/region grouped entries

Suggested target:

- `templates/page.json` if simple
- future dedicated native section if the list is large or highly structured

## Recommended LAYOUTHUB-003 Scope

Build native page templates/sections for:

- standard trust page
- document/certificate list page
- pharmacy list page

Rules for `LAYOUTHUB-003`:

- no LayoutHub removal yet
- no deletion of app assets yet
- no URL handle changes for live pages
- migrate one P0 page type at a time
- verify each migrated page on storefront before touching the next

## Recommended Execution Order After This Inventory

1. Fill the table from Shopify Admin and storefront preview.
2. Confirm exact handles and duplicates.
3. Mark each row as `Native`, `LayoutHub`, or `Unknown`.
4. Mark each row as `OK`, `Placeholder`, `Broken`, or `Unknown`.
5. Confirm which pages are actually linked from homepage/PDP/footer.
6. Start `LAYOUTHUB-003` with the highest-confidence P0 page:
   - likely `Biz Kimiz?`
   - then certificate/trust pages
   - then pharmacy list page

## Notes

- The repo already supports native static pages through `templates/page.json` and `sections/main-page.liquid`.
- The biggest unknown is the live Shopify page record state, not the theme’s native rendering capability.
- This inventory should be treated as the source-of-truth worksheet before any content migration begins.
