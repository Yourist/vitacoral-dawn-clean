# LayoutHub Migration Audit

## Summary

This theme still contains active LayoutHub integration artifacts, but the native Dawn-compatible page foundation also exists.

Key findings:

- Native Shopify page templates currently present:
  - `templates/page.json`
  - `templates/page.contact.json`
- Native page rendering exists through:
  - `sections/main-page.liquid`
  - `sections/contact-form.liquid`
- LayoutHub integration is still present through:
  - `layout/layouthub.liquid`
  - `snippets/layouthub_header.liquid`
  - `snippets/layouthub_footer.liquid`
  - `assets/layouthub-jquery.min.js`
- LayoutHub relies on `shop.metafields.layouthub.*` and page-level `page.metafields.layouthub.*`.
- No direct content migration should happen until affected live pages and their current handles/template assignments are confirmed in Shopify Admin.

High-confidence conclusion:

- The repo is ready to support native Shopify/Dawn page migrations.
- Some trust/corporate pages are likely still app-rendered via LayoutHub rather than native `page.json`.
- The theme alone does not fully reveal which live page records use LayoutHub, so storefront/Admin verification will still be needed in the next task.

## Detected LayoutHub/App Dependencies

### Direct LayoutHub files

- `layout/layouthub.liquid`
  - Dedicated LayoutHub page layout.
  - Wraps `content_for_layout` in a `.layouthub` container.
  - Loads `layouthub_header` and `layouthub-jquery.min.js`.
- `snippets/layouthub_header.liquid`
  - Injects LayoutHub fonts, theme CSS, anti-copy code, scripts.
  - Reads `shop.metafields.layouthub.*`.
  - Reads `page.metafields.layouthub.featured_image`.
- `snippets/layouthub_footer.liquid`
  - Injects LayoutHub scripts and optional bars/popups.
  - References optional sections controlled by shop metafields:
    - `layouthub_shipping_bar`
    - `layouthub_cookie_bar`
    - `layouthub_sale_notification`
    - `layouthub_cart_related`
    - `layouthub_popup_banner`
- `assets/layouthub-jquery.min.js`
  - Bundled LayoutHub jQuery asset.

### Metafield dependency pattern

Detected references show LayoutHub depends on:

- `shop.metafields.layouthub`
- `shop.metafields.layouthub.fonts`
- `shop.metafields.layouthub.theme`
- `shop.metafields.layouthub.anti_copy`
- `shop.metafields.layouthub.scripts`
- `shop.metafields.layouthub.freeshippingbar`
- `shop.metafields.layouthub.cookie_bar`
- `shop.metafields.layouthub.sale_notification`
- `shop.metafields.layouthub.cart_related`
- `shop.metafields.layouthub.popup_banner`
- `page.metafields.layouthub.featured_image`

### What this implies

- LayoutHub pages are probably not represented as normal native `page.*.json` template variants in the repo.
- Instead, some live page records are likely assigned to a LayoutHub-driven layout/render path inside Shopify.
- Placeholder storefront text such as `The Page only can edit in LayoutHub Editor.` is consistent with an app-owned page rendering path that is no longer fully managed in native theme code.

## Affected Templates/Files

### Native page-capable files

- `templates/page.json`
  - Standard native content page template.
  - Uses `sections/main-page.liquid`.
- `templates/page.contact.json`
  - Native contact page template.
  - Uses `sections/main-page.liquid` + `sections/contact-form.liquid`.
- `sections/main-page.liquid`
  - Native editorial shell for standard pages.
- `sections/contact-form.liquid`
  - Native contact form shell.

### LayoutHub-dependent files

- `layout/layouthub.liquid`
- `snippets/layouthub_header.liquid`
- `snippets/layouthub_footer.liquid`
- `assets/layouthub-jquery.min.js`

### Trust/corporate route references already present in native theme code

These links suggest which pages matter for migration, even though the theme does not prove whether they are currently native or LayoutHub-powered:

- `/pages/biz-kimiz`
  - Referenced from `templates/index.json`
- `/pages/kalite-sertifikalari`
  - Referenced from `templates/product.json`
- `/pages/hammadde-sertifikalari`
  - Referenced from `templates/product.json`

### Files that did **not** reveal additional native page template variants

- Only `templates/page.json` and `templates/page.contact.json` were found.
- No custom page template variants such as `page.about.json`, `page.certificates.json`, `page.trust.json`, etc. were found in the repo.

This strengthens the suspicion that the important corporate/trust pages are still app-driven rather than native theme-template-driven.

## Suspected Affected Storefront URLs

### High-confidence / inferable from current theme references

- `/pages/biz-kimiz`
- `/pages/kalite-sertifikalari`
- `/pages/hammadde-sertifikalari`

### User-referenced / likely affected but not confirmed from theme code alone

- `Biz Kimiz?`
- `Eczane listesi`
- `Hangi Eczanelerde Varız?`
- `Sertifikalar`
- `Ürün Onayları`
- `Kalite Belgeleri`
- other trust/corporate pages currently showing LayoutHub placeholder behavior

### Important limitation

The theme repo does **not** expose:

- actual Shopify page records
- page handles beyond hardcoded links
- template assignments from Admin
- LayoutHub page registry/content definitions

So exact live URL-to-template mapping remains an open question for Admin/storefront inspection.

## Native vs LayoutHub Assessment

### Pages that appear native-ready

- Standard content pages using `templates/page.json`
- Contact page using `templates/page.contact.json`

These can already render through native Dawn/Vitacoral page sections.

### Pages that appear likely LayoutHub-dependent

Any important page that:

- shows the LayoutHub placeholder in preview/storefront
- is not clearly backed by `templates/page.json`
- depends on historic app-managed content blocks
- may rely on `page.metafields.layouthub.*` or LayoutHub layout assignment

Most likely candidates:

- About / trust pages
- pharmacy availability list pages
- certificates / approvals / quality documents pages
- older corporate landing pages created before the native rebuild

## Recommended Migration Priority

### P0: Trust + footer-critical pages

These are the highest priority because they support trust, PDP validation, footer credibility, and conversion confidence.

- `Biz Kimiz?`
- `Kalite Belgeleri`
- `Hammadde Sertifikaları`
- `Sertifikalar`
- `Ürün Onayları`
- `Hangi Eczanelerde Varız?` / `Eczane listesi`

Why P0:

- already linked from homepage/PDP or clearly relevant to buyer trust
- likely used in footer or product-story trust flows
- placeholder pages here damage credibility fastest

### P1: Helpful but not immediately blocking

- broader informational/corporate pages not directly tied to conversion-critical trust moments
- extended FAQ/help/brand information pages if still app-driven

Why P1:

- useful for brand depth
- less urgent than pages directly referenced by trust CTAs

### P2: Legacy / low-priority pages

- outdated campaign-style pages
- older one-off informational pages
- pages with low traffic or no active sitewide linking

Why P2:

- can be migrated after trust/corporate essentials are stable

## Proposed Native Replacement Approach

### 1. Standard editorial trust/corporate pages

Examples:

- About
- certifications
- quality documents
- approvals

Recommended native replacement:

- use `templates/page.json`
- render through `sections/main-page.liquid`
- optionally create one or two reusable native sections later for structured trust content

Suggested future section types:

- `vitacoral-page-hero`
- `vitacoral-document-list`
- `vitacoral-trust-grid`

Reason:

- avoids app lock-in
- keeps content editable in Shopify Admin
- aligns with current Vitacoral page shell styling

### 2. Certificate / approval listing pages

Examples:

- `Kalite Belgeleri`
- `Hammadde Sertifikaları`
- `Ürün Onayları`

Recommended native replacement:

- move into native page template
- keep long-form content in page content where possible
- if documents need a cleaner structured layout, add a dedicated native section later instead of reusing LayoutHub markup

Suggested future section patterns:

- grouped document cards
- approval rows
- linked PDF/file grid

### 3. Pharmacy presence / branch / list-style pages

Examples:

- `Hangi Eczanelerde Varız?`
- `Eczane listesi`

Recommended native replacement:

- native page content if the list is simple
- dedicated structured section if data is long and region-based

Suggested future section pattern:

- `vitacoral-location-list`

Reason:

- improves mobile readability
- avoids fragile pasted rich text tables if the dataset is large

### 4. Contact page

Recommended native replacement:

- keep `templates/page.contact.json`
- keep `sections/contact-form.liquid`
- if LayoutHub previously wrapped contact content, migrate only surrounding informational content, not form logic

## Risks and Open Questions

### Risks

- Live Shopify page records may still be assigned to app-controlled templates/layouts not visible in the theme repo.
- LayoutHub content itself is not stored in readable native Liquid sections here.
- Some storefront pages may depend on LayoutHub metafields or app-rendered assets beyond the obvious layout files.
- Removing LayoutHub before page-by-page migration would likely break live trust/corporate pages.

### Open questions

1. Which exact live page handles currently show the LayoutHub placeholder?
2. Which page records in Shopify Admin are assigned to LayoutHub vs native page templates?
3. Are certificate/onay pages plain rich text, document lists, or more structured app layouts?
4. Does footer navigation currently point to any hidden/legacy LayoutHub pages not referenced directly in theme code?
5. Are there unpublished or duplicate native page records already prepared in Admin?

## Recommended Next Task: LAYOUTHUB-002

### Objective

Create a page-by-page migration inventory from live Shopify/Admin/storefront state, without migrating all content yet.

### Recommended scope

- inspect live storefront links for footer/header/product-story trust pages
- identify exact page handles
- confirm each page’s current template assignment in Shopify Admin
- record whether each page is:
  - native and acceptable
  - native but needs redesign
  - LayoutHub-dependent and must be migrated
  - legacy and can be deprecated later

### Expected output

A structured migration matrix such as:

| Page | Handle | Current source | Priority | Native target | Notes |
|---|---|---|---|---|---|
| Biz Kimiz | `/pages/biz-kimiz` | LayoutHub or native | P0 | `page.json` | homepage CTA |

### Suggested follow-up sequence

1. Confirm exact affected live pages and handles.
2. Migrate one P0 page into native Shopify sections.
3. QA storefront parity and remove placeholder exposure.
4. Repeat for remaining P0 pages.
5. Only consider LayoutHub cleanup after all required live pages are safely replaced.
