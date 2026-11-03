# Renewless product specification

V1 release policy, approved 31 October 2026: all planned user features are free. No paywall, paid feature gate, subscription-count monetization cap, Upgrade/Pro/Restore/Manage plan surface or billing-driven sync pause ships in v1. Authentication, Gmail consent, ownership, privacy and operational safety still apply. Own-app monetization is Phase 2 only; its retained drafts/assets are owned by [Billing](billing.md). Free availability is separate from native/API implementation readiness.

Consolidated 30 October 2026. Product/features, journey, scope, catalog and preview operation live here. Screen fields/states/design approval live only in [Product screens](product-screens.md); backend/mobile contracts in [API/mobile contract](api-mobile-contract.md); shared visuals/assets in [Design system](design-system.md); own-app purchases in [Billing](billing.md). Root README is an index/setup guide, and AGENTS.md contains the working rules. Do not create separate per-screen documents.

<a id="features"></a>

## Features and entitlements

Aligned 30 October 2026. Product scope, not a release order or a declaration that native/API integrations are complete. Approval register: [product-screens.md](product-screens.md); shared backend/mobile handoff: [api-mobile-contract.md](api-mobile-contract.md).

### V1 access — all features free

Manual tracking, all dashboard/list/calendar/detail/history/payment/profile surfaces, reminders and widgets are free. AI text/voice/image/PDF creation, the initial 12-month Gmail scan/import, subsequent scans/incremental sync and additional Gmail inboxes are also free. There is no 25-live-record paid threshold and no premium feature split. Production still validates authentication, consent, ownership, data limits/rate safety and integration capability; it must not report fake Pro entitlement to grant free access.

V1 onboarding continues from authenticated successful import directly to Ready and Home. Profile has no plan card, usage-cap meter, Upgrade, Restore or Manage plan. Existing third-party subscription prices, trials and confirmed-payment history are unchanged. Future own-app monetization and historical draft plans are **Phase 2, not v1 release blockers**; see [Billing](billing.md#revenuecat).

### Finalized design sections

- [Auth](product-screens.md#authentication): complete email/social/OTP/reset screen set, compact inputs, provider icons, field-local errors and intent continuation.
- [Onboarding](product-screens.md#onboarding): nine screens, value-first pre-auth Gmail scan/review, authenticated save, Ready and distinct empty/interruption recovery.
- [Home family](product-screens.md#home): external nearest-date event tabs, evidence-separated Paid/Upcoming month summary, top-three platform spending/Others, inline six-month forecast; skeleton/empty/quiet. The Home scope was reapproved and relocked 2 November 2026; Upcoming remains pending.
- [Calendar](product-screens.md#calendar): no-scroll overview, selected-month currency totals, semantic renewal/trial marks, month/year picker; zero-event date → Add sheet, one → Detail, multiple → separate day list.
- [Listing](product-screens.md#listing): full-width Search, left **Sort by** / right **Status filters**, separate graphite dialogs, staged sorting and immediate OR statuses + AND search, global counts, no external chips; semantic logo rows and small sad Loop/compact manual empty action. **Listing reapproved/relocked 2 November; shared header pending.**
- [Alerts and Reminder settings](product-screens.md#alerts): entire family finalized and locked 30 October 2026, including compact history, empty/permission states, account defaults and custom-preserving bulk confirmation.
- [Profile and Edit profile](product-screens.md#profile): default/incomplete/social Profile variants and Edit profile finalized/locked 30 October 2026; linked Connected inbox/imported subscriptions finalized and locked 31 October 2026; Change password is separately finalized/locked 30 October 2026.
- [Add sheet/Add/Edit](product-screens.md#subscription-entry): exactly three entry methods; text service suggestions, only Amount/Currency paired, weekly/monthly/quarterly/yearly, notes, pinned save. Trial extensions follow their shared contract.

- [AI text/voice chat](product-screens.md#ai-text-chat): ordinary/trial drafts, shared chat/composer, thinking/retry/add and hold-to-record/release-to-send playback flow finalized and locked 31 October 2026. The Image/PDF attachment UI extension is approved and locked 31 October 2026; live media/AI integration remains pending.

### Cross-screen rules

Header Back controls share the [approved component](design-system.md#header-back-button), standardized and relocked 31 October 2026. This is presentation reuse; existing journey/back destinations are preserved.

Tracked subscription listings share one [subscription-card component](design-system.md#subscription-card) across List, related platforms, imported inboxes, History, dashboard upcoming events, monthly events and Calendar next/day lists. Context determines lifecycle/event metadata; using a common presentation never converts a scheduled or historical price into payment confirmation. Card-only consistency scope approved and relocked 31 October 2026; no new product feature or backend capability is implied.


Five tabs **Home / List / Calendar / Payments / Profile**. Shared Alerts bell on authenticated full-screen headers; Home/List/Calendar retain Add. Payments is a primary tab; Profile retains its Payment history shortcut and History. One Final visual version of approved screens, no baseline duplicates. Graphite/mint/Raleway, compact spacing, accessible controls, shared dropdowns and info disclosure. Native glass where supported, solid fallback; Reduced Motion fallback. See [theme](design-system.md#theme) and [motion](design-system.md#motion-and-loop).

Recognized platforms use their respective catalog logo; unknown names remain pending with fallback. Manual service autocomplete is text-only. Stable platform/subscription IDs, source email on Detail, related-platform records in a separate screen and verified external management links follow [product-specification.md#platform-catalog](product-specification.md#platform-catalog).

Trial start = subscription start; duration calculates local end. Preserve exact extracted dates. Auto-renew tracking defaults On but does not change a provider or prove payment. Ended On stays active tracking with schedule; Off → Trial ended. Trial/renewal events drive List/Home/Calendar/reminders/widgets consistently. See [product-screens.md#tracked-trials](product-screens.md#tracked-trials).

Detail variants, related-platform/Delete views and Reminder/Track again sheets finalized and locked 31 October 2026. Detail has top Delete, pinned Edit/cancellation for active tracking or a single Track again action when cancelled, source/inbox or creator email, notes, related-platform route and reminder sheet (Off, once preset/custom, last-three-days daily). New payment records come from matched successful-payment receipts during authorized Gmail sync; no user confirmation/upload/scan prompt on Detail. Payments/Profile totals are explicit confirmations only; no automatic Paid from dates, no automatic schedule advance on confirmation.

AI text/voice/image/PDF share one free chat: input → summary → corrections in chat → Create, then normal Detail/Edit. Hidden voice transcript; server raw audio is deleted after transcription and image uploads after extraction. Voice playback uses a temporary local clip only for the current conversation, with close/reset/logout cleanup and no persistent raw-media history; this text/voice design contract is finalized and locked (31 October 2026), while native media integration remains pending; the [attachment UI extension](product-screens.md#ai-attachments) is approved and locked 31 October 2026. Gmail uses read-only OAuth, first-scan review, incremental dedupe, relevant trimmed extraction, encrypted tokens and source-preserving matching. Full details: [product-screens.md](product-screens.md).

Alerts lists only actual sends and deep-links to Detail. Profile includes account/profile editing, password capability, connectors, History, Payments, legal/Logout. History and List reference the same cancelled/confirmed expired records. Widgets use app-written snapshots and nearest-event semantics, without direct API calls or embedded subscription actions. The small/medium Loop door-knock widget design was approved and locked 31 October 2026; its baseline facts remain usable without motion. Refresh behavior finalized 31 October 2026 targets a fresh presentation every 3–4 hours plus important event updates, subject to OS scheduling; it does not promise per-unlock animation. See [Widgets](product-screens.md#widgets). These sections retain their own visual-review/integration status.

### Delivery scope

[product-specification.md#delivery-scope](product-specification.md#delivery-scope) separates core work from deferred Gmail/AI/push/widgets/billing integration. [product-specification.md#exclusions](product-specification.md#exclusions) records exclusions. Approved design and tests of HTML helpers do not constitute a deployed backend/native product.

<a id="journey"></a>

## Journey and navigation

Current consolidated journey, 30 October 2026. Detailed screen owners and approval dates: [product-screens.md](product-screens.md). Shared domain and API requirements: [api-mobile-contract.md](api-mobile-contract.md). Backend Node.js/MongoDB is a separate project; this repository contains mobile code and the HTML design preview.

### Entry, onboarding and account

The animated Splash appears on the first launch only, then Welcome. Later launches restore the session behind the native launch background: valid → Home; no valid session → Welcome. Transient offline failure must not silently log out a valid stored account. Returning users can choose Login. New users see value before app authentication:

Welcome → Connect inbox → external Google app sign-in + Gmail consent → Discovering → Your subscriptions → persist selected choices → Ready → Home. This continuation/refinement design is approved 3 November 2026; manual/no-session paths retain existing auth.

Zero scan matches → Scan no results; interrupted/denied access → appropriate recovery. Retry reuses valid authorization; another inbox permits account selection. Candidate selections are temporary until an owned, successful authenticated import. A failed save must not show Ready success. Manual choice preserves intent → authenticate if needed → Add form, without invented scan results. [product-screens.md#onboarding](product-screens.md#onboarding) owns exact UI and known prototype gaps.

Email signup (name/email/password/confirmation, no optional fields) → signup OTP → session. Password login → session without OTP. Forgot → reset OTP → short-lived reset authorization → new password → Login. OTP lifetime five minutes, resend after two minutes; backend authoritative. Google/Apple Firebase identity is verified server-side; use verified ownership when linking, never raw client email. No profile-completion wall. Preserve pending import/manual intent across all auth paths. See [product-screens.md#authentication](product-screens.md#authentication).

Gmail OAuth remains a separate grant from Google app identity within the same initiated onboarding connection journey. Verify the Renewless session before starting its account-owned scan; do not silently bind or switch accounts by inbox email. Read-only consent cannot send/delete mail. Store provider credentials server-side; native stores app session securely, with server data as authority and usable cache for refresh/offline UI.

### Main navigation

Five tabs: **Home / List / Calendar / Payments / Profile**. Payments is account-wide in its tab; Profile retains the same Payment history shortcut. History and inbox connections open from Profile. Alerts is a pushed screen from the shared header bell. Header + on Home/List/Calendar → Add sheet: Add with AI, Add manually, Connect Gmail. AI text/voice/image/PDF share one chat; no fourth Voice option. Context and drafts survive back/navigation where appropriate.

### Home and money

[Home](product-screens.md#home): nearest-date renewal/trial group → Paid/Upcoming month summary → Top spending → inline six-month forecast graph. Initial pending/no cache → skeleton; successful empty → Empty Home; records/no events in next seven days → Quiet, preserving spend data. Error offers retry; refresh retains usable content.

Next event / upcoming row → Detail. This month → chronological monthly events → Detail. Top spending View all/Others → Spending breakdown; platform row → owned Platform subscriptions → selected Detail. Back restores origin. No Home first-visit/money routes, inline renewal action panel or rotating recommendation.

Monthly-equivalent spend, scheduled charge totals and confirmed payments are three distinct measures. Never combine currencies. Free trials are separate from current recurring spend; auto-renew-On trial end can have an expected charge, not a confirmed payment.

### List and Calendar

[List](product-screens.md#listing): full-width Search → Sort by left / Status filters right → grouped results. No external selected chips; Sort by was reapproved/relocked 2 November; shared-header positioning is also approved. Centered graphite modal supports multiple status groups, immediate OR selection combined with search using AND, global status counts, matching count and internal Clear all. No selection means all. Default nearest-event order; undated last. Empty results show small sad Loop + compact Add manually.

Dated row → Detail by subscription ID; Needs date → prefilled Edit. Cancelled/confirmed Expired are available in List filters and History, using the same records. Passing a date does not prove Expired/Paid.

[Calendar](product-screens.md#calendar): no-scroll month overview, month/year picker, expected totals per currency, semantic marks and one next-event card. Zero-event date → Add sheet over Calendar; one → Detail; multiple → Calendar day → Detail. Preserve viewed month/date on return. Same schedule drives Home and Calendar.

### Create, edit, lifecycle and payments

[Manual/Add/Edit/Detail](product-screens.md#subscription-entry) use one field model and shared dropdowns. Only Amount/Currency paired; remaining fields single. Service suggestions are text-only. Normal manual renewal required; trial requires start + duration and calculates its end. Commit is pinned, pending/error is explicit, navigation waits for confirmed save.

Detail holds source/inbox or creator email, notes, trial/renewal date, Reminder, More on platform (separate route), top Delete and bottom Edit / Mark as cancelled. Provider management opens verified external links; recording cancellation never cancels the actual service. Cancellation/deletion stops future jobs/projections while retaining already-sent history. Cancelled Detail can resume Renewless tracking after reviewing amount, next renewal date and reminder; it never reactivates the provider or confirms a payment.

[Trial lifecycle](product-screens.md#tracked-trials): local Start + duration = end, preserve exact source dates on unrelated edits. Auto-renew tracking On keeps active tracking after trial and projects from original end anchor; Off → Trial ended, no recurring charges. No Paid inferred from dates. Detail → read-only subscription-specific Gmail payment history. Authorized Gmail scan/sync records matched successful-payment receipts automatically; no manual confirmation/upload flow. Missing receipt is Payment not found. Confirmation is idempotent per cycle and never advances recurrence again.

### Reminder delivery and Alerts

Account default timing now supports multiple offsets within the existing dropdown (Pending reapproval 3 Nov). Detail retains its single-choice override sheet with a Keep current reminder days option for applied multi-day preferences. Detail reminder overrides: Off, once available 1/2/3/5/7/10/20/custom days, or daily for last three days. Current default once 3 days when available, otherwise Off; no automatic extra renewal-morning send. Worker uses timezone/event/schedule version, skips elapsed offsets and rechecks current lifecycle. Save/date edits atomically replace future jobs. Persist user preference independently of elapsed send eligibility.

Alerts includes account-level Push reminders, renewal/trial toggles, preferred local time and configurable default timing under a separate Reminder settings screen. New defaults preserve custom subscription settings; bulk replacement is explicit and counted. This replaces the earlier global-mute exclusion. Detailed UI: [Product screens](product-screens.md#alerts).

Alerts means actually sent reminders, latest first. No worker/sends → No alerts yet. Tap or notification opens the same Detail. Future dates belong in Home/List/Calendar; queued/past fireAt alone never proves sent.

One FCM token/account: capture on issued session, update on change/Home, clear on logout. A second phone replaces the previous token for v1. OS permission denial does not block auth; timezone/token changes re-evaluate future jobs without duplicating sent events.

### Gmail, AI and catalog

Initial 12-month Gmail scan/review/import, later incremental sync and additional inboxes are free in v1. Retain records across connection interruption; sync state depends on authorization/job health, not billing. Gmail query → rules → relevant trimmed input to extraction. Preserve exact/user-corrected dates and creation provenance, deduplicate messages/receipts, skip ambiguous matches. Never give a model the whole inbox or retain full mail. See [product screens](product-screens.md#gmail-connection-and-sync-product-rules).

AI creation: chat inputs → compact reviewable draft → correct the same draft in chat → Add subscription. Text/voice conversation, shared composer/header, ordinary/trial drafts and voice playback/hold-to-record/release-to-send are finalized and locked, approved 31 October 2026 in [Product screens](product-screens.md#ai-text-chat). Voice hold-to-record, release-to-send and slide-left cancellation are now previewable with simulated audio; real microphone capture/permission/transcription integration and native upload/vision integration remain subsequent work; the [attachment UI extension](product-screens.md#ai-attachments) is approved and locked 31 October 2026. Voice transcript stays internal; server image copies are discarded after extraction; local previews live only in the current conversation and are cleared on exit/reset/logout. Real processing is deferred integration, not HTML behavior.

Catalog supplies stable platform identity, aliases, category, respective logo and verified provider-specific management destinations. Unknown services remain valid pending candidates with a neutral fallback. User prices/emails/dates stay private to records. See [product-specification.md#platform-catalog](product-specification.md#platform-catalog).

### Other surfaces and entitlements

Profile → compact account header, owned inboxes, grouped History/Payments and preferences/security/help/legal, then confirmed Logout. Personal phone/DOB/gender remain optional inside Edit profile, with read-only login email. Password management is conditional on account capability. Profile/Edit profile finalized 30 October 2026; Connected inbox/imported subscriptions finalized 31 October 2026, without an Explore Pro promo or separate Pro preview route; details and linked pending screens: [Product screens](product-screens.md#profile). History and its empty state finalized and locked 30 October 2026, including the reapproved status-only filter and compact upper spacing; [History contract](product-screens.md#history) owns compact cards, lifecycle dates and search/filter behavior. History is cancelled/confirmed expired records. Payments and Profile paid totals only explicit confirmations; no date-derived estimates. Payments receipt flow/source/copy is [reapproved and relocked 31 October 2026](product-screens.md#payments), with Year/Month filters, currency-separated confirmed period totals, a compact monthly chart, flat rows and evidence sources. Widgets use Home-compatible local snapshots, nearest-event labels and solid theme; the [finalized Home Screen widget design](product-screens.md#widgets) adds a short decorative Loop knock without promising continuous native animation.

V1 access is fully free; [feature scope](#features) and [Phase 2 billing drafts](billing.md#revenuecat) own the release split. No purchase, restore or billing entitlement is required before v1 feature access.

### Production handoff

[product-specification.md#delivery-scope](product-specification.md#delivery-scope) distinguishes core integration from later locked features. [api-mobile-contract.md](api-mobile-contract.md) lists observed local client wrappers and gaps; it replaces older unverified “API already supports” claims. Shared versioned schemas, server inventory, tests and native validation are required before claiming integration complete.

<a id="delivery-scope"></a>

## Delivery scope and document ownership

Consolidated 30 October 2026. Design approval, target API behavior and completed runtime integration are separate states. Whole-prototype design approval was given 31 October 2026. No deployment or backend coverage is asserted.

### Sources of truth

The [screen approval register](product-screens.md#screen-lock-register) records which sections are Final. Canonical detailed owners:

- [Auth](product-screens.md#authentication) and [onboarding](product-screens.md#onboarding): approved 29 October.
- [Home family](product-screens.md#home): approved 30 October.
- [Calendar](product-screens.md#calendar): approved 29 October, date-tap refinements 30 October.
- [Listing](product-screens.md#listing): complete section approved 30 October, including Status filters and empty states.
- [Subscription entry/Detail/reminders](product-screens.md#subscription-entry): approved Add/Edit base layouts and current reviewed downstream behavior.
- [Tracked trials/payment confirmation](product-screens.md#tracked-trials): authorized cross-screen extension 30 October; separate from own-app billing.
- [Shared API/mobile contract](api-mobile-contract.md): common semantics, required operations, current client gaps and integration acceptance checks.
- [Theme](design-system.md#theme), [motion/Loop](design-system.md#motion-and-loop), [catalog](product-specification.md#platform-catalog): shared components/assets/identity.
- [Product flow](product-specification.md#journey), [features](product-specification.md#features), [exclusions](product-specification.md#exclusions), [RevenueCat](billing.md#revenuecat): journey, access policy and scope.

Current canonical contracts replace chronological iteration notes. If a future decision changes a shared rule, update its owning document and every affected summary in the same change. Do not append a contradictory “latest update” while leaving obsolete instructions above it.

The current HTML Final preview is the visual reference. Docs describe production-facing behavior and explicitly identify fixture/integration gaps. Old theme/motion HTML studies have been removed. Retained screenshot exports are reference assets, not alternate functional specifications.

### Integration boundaries

Core account/manual integration includes Home/Loading/Empty/Quiet, List, Calendar/day, Add/Edit/Detail, category/catalog resolution, trial/lifecycle data, reminders as preferences, Profile, History and explicit Payments. Calendar and trial data cannot be omitted because legacy mobile types lack them. Initial loading/error states are required, not a separate deferred feature.

Production push worker, Gmail OAuth/scans/sync, AI text/voice/image/PDF extraction and widgets are approved v1 product scope sequenced after the first core integration. RevenueCat/own-app purchases are Phase 2 only. Read-only Payments can consume already-recorded receipts; new payment recording depends on the Gmail receipt worker and cannot be simulated as a manual payment action. Implementation milestones and ownership are finalized in the [execution plan](#implementation-sequence); this is not a claim that all product integrations ship in the first slice.

- Without sent-event persistence/delivery, Alerts shows No alerts yet, never future dates as sent.
- Pre-auth scan ownership, actual candidate import and authenticated continuation must be implemented before the production onboarding scan can ship.
- One free chat handles text/voice/image/PDF; corrections stay in chat before Create. No separate voice/screenshot add flow.
- Gmail initial/import, later sync and additional inboxes are free; authorization, ownership and safe deduplication still apply.
- Widgets consume an app-written snapshot after the underlying data path works.
- Own-app RevenueCat/store purchases, restore and paid entitlements are deferred to Phase 2 and must not gate v1 delivery or feature access. Working account/legal/privacy integrations remain required where used.
- User/admin websites and iCloud remain outside v1. A starter catalog does not require shipping the admin website.

### Implementation readiness

[api-mobile-contract.md](api-mobile-contract.md) records audited mobile wrappers and required migrations. The separate backend was not inspected; its actual schema/endpoints must be compared and a single versioned transport contract agreed. No docs-only change can verify native accessibility/materials, server ownership, payment evidence, notifications, provider authorization or store behavior.

Phone copy is user-facing; fixture disclosure stays in the surrounding studio. Replace fixture names, dates, prices and counts with real state. Test keyboard, safe areas, Larger Text, transitions, Reduced Motion, error/retry, concurrency and offline behavior. Shared helper tests do not replace backend/native validation.

<a id="exclusions"></a>

## Exclusions and deferred integrations

Aligned 30 October 2026. Canonical approvals: [product-screens.md](product-screens.md). [product-specification.md#delivery-scope](product-specification.md#delivery-scope) distinguishes deferred integrations from excluded features.

### Outside the product

- Anonymous persistent account/product use. **Temporary pre-auth onboarding connection/scan/review is supported**; account authentication is required to persist finds and enter owned Home data.
- Login OTP. Signup and reset OTP are separate supported purposes.
- Treating Gmail consent as app sign-in, or email entry / a seed connector as real inbox authorization.
- Cancelling third-party subscriptions from Renewless. Verified official external management links are supported; user records cancellation afterwards.
- Direct reading of iPhone Settings subscriptions, Apple Card or FinanceKit.
- Retained raw Settings screenshots/full inbox content; model access to the whole mailbox. Relevant consented extraction only, discard attachments after processing.
- Fabricated dates/logos/payment success, date-derived Expired or Paid, or treating missing Gmail receipt as Unpaid.
- Currency conversion and combined cross-currency totals.
- A second mascot, Loop as logo/app icon, persistent floating mascot, mascots on every row, rolling money counters or perpetual decorative pulsing.
- Decorative warm/glowing/gradient surfaces. Native navigation glass and approved limited Loop/Ready celebration are explicit exceptions to flat content, not a broad illustration system.
- An artificial network delay to prolong splash/loading. The approved brief branded splash and one-shot Ready celebration remain supported; no looping production GIF.

### Later / outside v1

- User website, admin website and iCloud IMAP inbox. Account-deletion UI is not in the approved prototype; its prior exclusion is a [store-release scope gap](#release-dependencies), not permission to ship an account-creation app without the required deletion path.
- Subcategory, custom billing cycle. **Weekly/monthly/quarterly/yearly are in scope**; custom trial days are supported separately.
- Separate screenshot/OCR add screen. Images belong in the free AI chat. Detail links to read-only Gmail receipt history; there is no manual payment-receipt upload flow.
- Extra rotating recommendation kinds/cards. Final Home uses a compact next-event link, not recommendation rotation.
- Reminder scheduling controls on Add (defaults apply; configure on Detail). The approved detailed Reminder sheet is in scope.
- List source/category filters and cross-currency price comparison remain out of scope. Search + Status filters retain their base; displayed-amount sorting grouped by currency is authorized 2 November, Pending reapproval; price-range controls were removed; no external selection chips. Cancelled and confirmed Expired **are included** in List and History.
- Activity-log History. History is cancelled/confirmed expired records, not a feed of every edit/action.
- Estimated last-paid amount or projected charges in confirmed Payments totals.
- Center Add tab/FAB or sixth navigation tab. Calendar is the approved fifth destination; Add remains a header/sheet action.
- Header + on Profile, Alerts, History, Payments or Detail; repeated introductory + tooltip.
- Multiple FCM tokens/account, biometric unlock, forced profile-completion wall, password-management forms for social-only accounts.
- Visible voice transcript, pre-create jump from AI summary to manual form, guarantees of perfect multilingual speech.
- Light/automatic appearance and non-English UI. AI/voice input may be multilingual.

### Locked features deferred from the core integration

These remain complete-product requirements; implementation sequencing does not erase approved designs or authorize claiming unfinished integrations as working. All v1 features below remain free; only own-app monetization moves to Phase 2:

- Production push worker/sent-event persistence. Alerts stays empty until real sends exist.
- Pre-auth/authenticated Gmail OAuth, scan jobs, selected import, incremental sync and extra inboxes.
- AI text/voice/image/PDF and automated receipt processing; Gmail receipt recording uses the common payment model.
- Catalog admin website; starter verified catalog data can precede it.
- Native Home widgets/snapshots.
- Own-app RevenueCat/store purchases, restore and paid entitlements are deferred to Phase 2 and must not gate v1 delivery or feature access. Working account/legal/privacy integrations remain required where used.

Onboarding's real scan path depends on the Gmail/auth integration, not the first core manual slice alone. Backend and native gaps are explicit in [api-mobile-contract.md](api-mobile-contract.md). The implementation order and completion gates are fixed in the [execution plan](#implementation-sequence).

<a id="platform-catalog"></a>

## Platform catalog

Every recognized subscription platform displays its respective logo alongside its name. This applies equally to manual entry, Gmail extraction, AI text/voice/image/PDF extraction, onboarding review, chat summaries, Home, List, Detail, Alerts and widgets where space allows. Manual service autocomplete is intentionally text-only, with no logo shortcuts. Use the same catalog identity everywhere; do not replace known brands with initials or generated logos.

### Catalog record

- Stable platform ID, normalized display name, category and matching aliases (including verified merchant/sender identifiers).
- Platform logo asset reference, with source/usage provenance. Canonical bundled images live in `src/assets/platforms`; the standalone prototype mirrors them locally.
- Verified official subscription/account-management HTTPS URL, optional official website URL, and optional billing-provider-specific management URLs (direct, Apple, Google Play).
- Review status and last verified date for identity and URLs. Prices, user-specific subscription IDs, currencies, tokens, emails and renewal dates stay on user records, not in the shared catalog.

### Admin and starter catalog

Admin adds the name, category, correct logo and verified management URL together. Require these before publishing an entry as verified/complete. If a service genuinely has no dedicated management page, use its verified official account/billing page and label the destination accurately. A missing valid destination remains pending, never fabricated. Starter records follow the same rules. Admin can later update/merge aliases, replace assets and disable broken URLs; existing subscriptions resolve identity through the stable platform ID.

This defines catalog content and admin requirements; it does not bring the deferred admin website into the first mobile integration. Seeded verified catalog data can supply the same fields before that website exists.

### AI, Gmail and manual matching

Image/PDF attachments support receipts, invoices and bank statements in the same free chat; video is excluded. Native Photos/Files selection is the target, HTML is only a preview. Server classifies/extracts relevant evidence, normalizes source facts, grounds canonical platform IDs/aliases/logos against the catalog and matches only owned database records. Possible matches require review, exact provider identity reuses the existing record and unknown merchants require clarification/pending identity. Statement amounts/dates are historical and separate from confirmed tracking price/cycle/renewal; one-off/pending/refund/credit rows are not automatically subscriptions. No uploaded document creates confirmed Payments; that Gmail-only evidence pipeline remains locked. Detailed approved UX: [attachment contract](product-screens.md#ai-attachments).

Authenticated Gmail discovery reuses onboarding controls without repeating onboarding/account creation. Review separates new plans, proposed updates and already tracked matches; trial edits are a sheet within that review. Existing saved records are preserved on empty/failure. Explicit selection/import is distinct from confidently matched background updates and successful-payment receipt recording. Screen flow was approved and locked 31 October 2026 in [Product screens](product-screens.md#authenticated-gmail); backend requirements are in [API/mobile contract](api-mobile-contract.md#authenticated-gmail-review). All scans, ongoing sync and additional inboxes are free in v1; consent and owned-connector rules still apply.


Extraction produces a candidate service name and billing source. Resolve these against catalog names/aliases and verified evidence. A confident known match inherits its logo and verified links automatically. AI never invents a logo URL, account URL, cancellation URL or affiliation. Ambiguous matches require review; do not attach a popular brand merely because its name resembles receipt text.

Unknown real services may still be saved by the user. Create a pending catalog candidate for admin review, show a neutral service placeholder with the name, and omit the management action until a verified URL exists. This is the explicit exception to the logo rule: genuine identity must take priority over an incorrect logo. Asset-load failure uses the same accessible fallback. User/AI-created candidates do not become trusted public links automatically.

### User interaction

In subscription Detail, provide **View subscription ↗** linking to the verified management page, with a brief destination label (for example, “Opens Netflix”). Keep it separate from Edit, Delete and “Mark as cancelled.” Logo and name stay visible; the action is Free for all recognized subscriptions.

When billing source is known, choose the appropriate official management destination: an Apple-billed service opens Apple subscription management, a Play-billed service opens Google Play management, and a directly billed service opens the service billing page. If source is unknown, offer a provider choice or clearly labelled official account page; do not assume direct billing. Do not claim the link opens a particular private subscription without a supported authenticated deep link.

Open the external browser or a supported official app link. The service may require sign-in; Renewless does not pass user credentials or session tokens in links. Returning to Renewless does not mark a subscription cancelled or changed automatically. The user records changes explicitly or a later verified sync updates them.

### Boundary and verification

External viewing/managing is supported. Renewless itself does not cancel third-party subscriptions. This replaces the earlier blanket exclusion on external subscription links.

Validate trusted HTTPS destinations server-side/admin-side; reject javascript/data/file URLs and unverified user/AI destinations. Disable stale/broken links until corrected. During integration verify known logo resolution, unknown/ambiguous fallback, failed image loading, provider routing, link accessibility and unchanged subscription status after returning.

<a id="prototype-operation"></a>

## Prototype operation and verification

Editable buildless HTML prototype. Open `dist/index.html` or serve `dist/` with a static HTTP server. The phone copy represents intended product wording; the surrounding studio discloses fictional/scripted data. No live auth, OAuth, Gmail/AI processing, uploads, push, purchases or persistent account saves occur.

### Current source

- `dist/app.js`: screen library, navigation, List/status filters, manual/detail/Home/Calendar interactions.
- `dist/onboarding.js`: approved onboarding views and scripted scan/continuation/celebration.
- `dist/trial.js`: shared in-memory trial/events and receipt store; manual confirmation UI removed.
- `dist/select.js`: accessible themed single-select component, same-edge/same-width graphite menu.
- `dist/info-tooltip.js`: shared informational disclosure with dim/blur backdrop.
- `dist/mascot.js`: shared expression/halo sizing component; used by finalized Alerts empty, without changing locked screen artwork.
- `dist/profile.js`: finalized Profile/Edit profile and pending inbox/security views, connector state previews, connector-owned imported list and finalized Change password form, local edit state and confirmation dialogs; no real identity/OAuth/store operations.
- `dist/alerts.js`: sent-history views and in-memory account Reminder settings; permission/job/new-record inheritance remain integration work.
- `dist/style.css`: current theme/components plus retained comparison styles for unfinalized screens.
- `dist/assets/`: self-contained brand/platform/font assets and licenses.

Approved sections render one **Final** view. Baseline/upgraded comparisons remain only where a section is not yet finalized; they are not competing specifications for approved sections. The [approval register](product-screens.md) and [API/mobile handoff](api-mobile-contract.md) are authoritative.

### Finalized sections

All 74 existing prototype inspection views have an approved base. Shared typography (22/16/12) was subsequently authorized and is pending reapproval; other scopes remain locked, including Auth, onboarding, Home, Calendar, Listing, Alerts/settings, Profile/account/connected inbox, History, Payments, subscription Detail/platform views, Add/Edit with the complete trial extension, authenticated Gmail, Widgets and AI text/voice/image/PDF flows. The [screen lock register](product-screens.md#screen-lock-register) owns the exact inventory and approval scope. These are approved designs and states, not a claim that native integrations are implemented.

List base is full-width Search with Status filters; the Sort by button/modal was reapproved/relocked 2 November; shared headers were also reapproved/relocked 2 November. No external chips. Centered graphite dialog, multiple statuses, immediate OR/AND matching, global counts and one compact manual empty action. Shared single selects use the themed component; status selection is a separate multi-select dialog.

The studio also supports double-click text inspection and icon preview/download from a right-side panel. Heading/subheading/body use the requested 22/16/12 scale. These are design-review tools and a pending typography scope, owned by [Design system](design-system.md#design-studio-inspector-and-prototype-typography) and the screen lock register; no mobile/backend feature is implied.

Public review URL: [Renewless Design Studio](https://renewless-design-studio.web.app/#home), published to Firebase project/site `renewless-design-studio` with explicit user approval on 31 October 2026. Hosting publishes only `dist`; current release version is `a3d00a9d6b3c82b1` (Welcome card clipping correction, 1 November 2026). The current typography scope remains pending review while shared publicly. The static deployment provides screen navigation, inspector and local asset downloads; it does not implement mobile authentication, Gmail/AI services or backend APIs.

### Feedback under discussion

The user is collecting external prototype reviews before deciding changes. The following is a discussion inbox, not approved product requirements, a design unlock, implementation authorization or a deployment request. Preserve the existing contracts and locks until individual decisions are made. After all reviews arrive, combine overlapping concerns into one numbered bullet list for item-by-item discussion; keep reviewer suggestions distinct from the assistant's assessment. No separate review document is created.

Reviewer 1 — received 2 November 2026, seven annotated screenshots:

1. Home money summary: propose “Paid this month” and clearer upcoming-payment metrics instead of the current ambiguous “This month” presentation.
2. Home next renewal: handle multiple subscriptions; reviewer proposes a carousel.
3. Home AI discovery: add a directly discoverable Ask Loop / AI-chat entry near the top or bottom.
4. Subscription List: add sorting and a price filter.
5. Detail actions: equal button widths and corner radii; rename “I cancelled this” to “Mark as cancelled”.
6. Cancellation: collect cancellation date and access-until date, then explicitly confirm before recording cancellation.
7. Detail insights: annual equivalent for monthly subscriptions, subscription tenure and total payments to date.
8. Price changes: display previous/new price and maintain price-update history.
9. Reminders: allow multiple selected lead days, beyond the last-three-days daily preset.
10. Account management: add Delete account.
11. Payments: offer payment-history export.
12. Currency settings: preferred currency for dashboard/overview amounts.

Initial assessment to revisit with later reviews: clarify confirmed payments versus forecast rather than merely relabeling expected amounts; assess a same-date summary against a carousel; define whether Loop creates subscriptions or also answers account questions; distinguish sorting from amount-range filtering and normalize billing periods without mixing currencies; recording cancellation does not cancel the provider; access-until/start dates may be unknown; annual estimates/tenure are not evidence of paid amounts; price edits must not rewrite historical receipts; multi-offset reminders need deduplication and per-record/default semantics; account deletion is an existing release-scope gap; export confirmed data distinctly; preferred-currency defaults and FX conversion are separate scopes. Additional assistant observation: repeated dates/status/estimated labels make subscription rows unnecessarily tall. These are tentative assessments, not decisions.

Reviewer 2 — received 2 November 2026, five written observations:

1. Home count cards: “Tracking” and “Upcoming · 7 days” have unclear purpose/titles and awkward placement; clarify, reposition or remove.
2. Home hierarchy: leading with Next renewal assumes urgency is the primary user goal; reviewer personally prefers Top spending first and explicitly asks that priority be validated.
3. Repeated analytics: question whether current-month expectations, the six-month forecast and Calendar's expected-month amount justify repeating related data across surfaces.
4. Delete subscription dialog: “Delete from Renew List” / “Keep Subscription” may confuse a tracked third-party record, its provider subscription and the Renewless account/product; clarify entity and action wording.
5. Onboarding is considered a major strength. After connecting a Google account to scan Gmail, the later Google/Apple account step feels redundant; reviewer expects an existing Google login to be reused.

Preserve these as feedback, not approved changes. Cross-review themes: Home metric clarity and hierarchy overlap with Reviewer 1's monthly-paid/upcoming and next-renewal observations; deletion-language ambiguity is distinct from recording cancellation. The Google point describes perceived repeated identity work: Gmail authorization and app authentication remain separate security/ownership concerns even if an explicitly designed combined identity/consent flow can reduce repeated interaction. Do not silently create an app session/account from an inbox-scan grant, auto-link unrelated identities or remove the reviewed account/import continuation before a design/security decision. The last review has now been received; use the consolidated discussion queue below for item-by-item decisions.

Reviewer 3 — received 2 November 2026, final review, two conversation screenshots:

- Bring a Billing/Payments destination into bottom navigation, rather than leaving it discoverable only through Profile.
- Make service-level lifetime spending, ongoing monthly cost and subscription start date/tenure easy to find (example given: cumulative Cursor spend). This overlaps Reviewer 1's Detail insights.
- Provide convenient spending periods such as This month, Last 6 months and This year.
- Lead the Payments/spending view with a prominent selected-period total and place its breakdown/details below. Existing Payments was shown to the reviewer; the remaining concern is navigation prominence and information hierarchy, not necessarily a missing report.

#### Consolidated discussion queue

Collection is complete. Home topics 1–6 and Listing topic 7 were resolved and reapproved 2 November 2026; shared headers are reapproved/relocked; Upcoming body remains pending. Detail topics 8–11 and 13 are implemented locally and reapproved/relocked 2 November 2026; Google/account continuation topic 14 and the full 12-point onboarding refinement were finalized 3 November 2026. Topics 15–16 were authorized for local implementation 3 Nov and are Pending reapproval: Payments tab, shared Alerts header entry and existing reports retained. Topic 18 export is explicitly deferred beyond v1. Topic 17 Profile Delete account entry/confirmation was explicitly unlocked and implemented as a local preview 3 Nov, Pending reapproval; production deletion remains an integration/release dependency. Topic 12 uses the existing Reminder settings dropdown with multiple ticks and compact labels, authorized under the 3 Nov scoped reminder unlock and Pending reapproval; the separate day-grid experiment remains rejected. Topic 19 preferred currency is deferred beyond v1; retain separate-currency totals and existing form currency controls. Discuss one item at a time and record decisions explicitly; suggestions do not unlock screens, alter APIs or authorize implementation/deployment. Preserve the underlying per-review notes above.

1. Home count-card clarity and position: define/rename Tracking and Upcoming · 7 days, reposition or remove as warranted. [Reviewers 1/2]
2. Home hierarchy: validate whether nearest renewal, Top spending or a compact financial overview should lead. [Reviewer 2]
3. Current-month money clarity: distinguish confirmed payments from expected upcoming charges; decide card title/amounts and meaningful progress-bar semantics. [Reviewers 1/2]
4. Analytics repetition: justify or reduce overlap across current-month Home summary, six-month forecast and Calendar totals. [Reviewer 2]
5. Multiple nearest renewals: handle same-date events; compare carousel against a grouped date summary and drill-down. [Reviewer 1]
6. Direct Loop entry: improve Home discoverability and define Add with Loop versus broader Ask Loop capabilities. [Reviewer 1]
7. Listing controls: sorting and amount-range filtering; define billing-period normalization and currency-safe comparison. [Reviewer 1]
8. Detail action consistency: equal widths/radii and clearer Mark as cancelled label. [Reviewer 1]
9. Cancellation confirmation: cancellation date, optional/unknown access-until, explicit confirmation and provider-versus-tracking distinction. [Reviewer 1]
10. Subscription/platform insights: start date/tenure, annual equivalent, ongoing monthly cost and receipt-backed cumulative payment amount/count, with coverage limitations. [Reviewers 1/3]
11. Price history: old/new price, effective date/source and immutable historical receipts. [Reviewer 1]
12. Multi-day reminders: existing Reminder settings dropdown now supports multiple selections; Off, last-three shortcut and existing custom input retained. Pending reapproval 3 Nov; do not restore the rejected day-grid design. [Reviewer 1]
13. Delete-record dialog wording: distinguish removing a tracked record, keeping tracking and cancelling an external service. [Reviewer 2]
14. Gmail/account continuation: implemented locally and finalized/relocked with the complete onboarding 3 Nov 2026. Identity + Gmail permission at connection, signed-in save without repeated auth; preserve account choice/import ownership. [Reviewer 2]
15. Payments discoverability: authorized/implemented locally 3 Nov, Pending reapproval. Payments replaces Alerts in tabs; Alerts moves to shared authenticated header. Profile retains Payment history; tracked payments are distinct from own-app billing. [Reviewer 3]
16. Reports: reuse existing Year/Month filters, confirmed selected-period totals, search and six-month inspection chart; no new rolling Last 6 months aggregate filter in this scope. Local navigation/copy update Pending reapproval. [Reviewer 3]
17. Delete account: Profile entry/confirmation authorized and implemented locally 3 Nov, Pending reapproval; real provider reauthentication, backend deletion/retention and hosted request resource remain pending. [Reviewer 1]
18. Payment-history export: explicitly deferred beyond v1 on 3 Nov 2026; no export UI/API obligation in v1. Revisit consolidated formats/period/currency scope only with separate approval; this is not a Pro entitlement. [Reviewer 1]
19. Preferred currency: explicitly deferred beyond v1 on 3 Nov. No new preference or FX conversion in v1; preserve original currencies and separate totals. [Reviewer 1]

#### Home discussion decisions — 2 November 2026

- Confirmed by the user: the proposed Active subscriptions umbrella includes ongoing trials as well as due-today/renewing-soon ongoing plans. This does not confirm payments or change provider status. Align the List's currently narrower Active filter terminology/behavior when that scope is explicitly authorized; do not implement a Home-only count with a conflicting List meaning.
- Authorized by the user on 2 November 2026 after the scoped-unlock discussion: remove the entire two-count-card section (Tracking / Upcoming · 7 days), including loading/quiet equivalents; retain the nearest renewal/trial card. Implemented locally, reapproved and relocked 2 November 2026.
- The follow-up Home hierarchy is now explicitly authorized and implemented locally, reapproved and relocked 2 November 2026: no separate seven-day list on Home; nearest-date two external tabs/See all first, Paid/Upcoming month summary, Top spending, inline six-month forecast and sticky title/Add header. The seven-date helper correction remains tested. Native Home, locked List filters and other surface ranges are unchanged; no deployment is authorized by this local preview task.

Positive feedback: Reviewer 2 considers the onboarding especially powerful. Existing reporting was not readily discovered by Reviewer 3; retain this as evidence of discoverability, without inferring a need to duplicate its feature set. The assistant's additional row-density observation remains an observation, not an extra reviewer request or an accepted change.

### Local verification

From repository root:

```sh
node --test prototypes/renewless-studio/tests/*.test.cjs
node --check prototypes/renewless-studio/dist/app.js
node --check prototypes/renewless-studio/dist/onboarding.js
node --check prototypes/renewless-studio/dist/trial.js
node --check prototypes/renewless-studio/dist/select.js
```

Tests cover browser model/filter helpers, not native integration or server operations. Dates/records are fixtures and edits reset on reload. Native/accessibility/API validation is tracked in the shared handoff.

Handoff checks on 31 October 2026: 95 prototype tests passed; app/trial JavaScript syntax and `git diff --check` passed; native `npm run typecheck` passed. All 74 Studio lock badges are fully locked, and 228 local documentation links/anchors resolved. Native device builds, provider integrations and the separate backend were not validated by these checks.

Local edits update the local preview. Public deployment is separate work and is not performed by documentation updates.

Add/Edit including its trial extension was accepted with whole-prototype approval (31 October 2026): optional Trial days, conditional required Start date, immediate local-date end calculation, post-trial pricing and user-controlled auto-renew tracking. No trial restores the original renewal input/value. The complete existing prototype is now finalized and locked; runtime implementation remains separate. Screen owner: [Tracked trials](product-screens.md#tracked-trials).

<a id="implementation-sequence"></a>
## React Native execution plan — finalized 31 October 2026

The user approved all existing prototype screens on 31 October 2026, including the last Add/Edit trial spacing. The [lock register](product-screens.md#screen-lock-register) contains all 74 approved inspection views. Implementation is a faithful native build of that contract, not a redesign. This handoff finalizes planning; production code work starts on the user's implementation instruction. The existing RN app is an initial partial client and must be migrated rather than treated as finished.

The [API/mobile blueprint](api-mobile-contract.md#mobile-implementation) is the mobile developer's primary build document. Mandatory [theme/component rules](design-system.md#native-implementation-rules) and the [current native parity audit](api-mobile-contract.md#native-parity-audit) apply: reuse existing components, token-only UI dimensions/colors, and one onboarding host with fixed header and animated logical panels. Exact native routes and state mapping are in [Product screens](product-screens.md#native-navigation); shared native component responsibilities are in [Design system](design-system.md#native-components). Keep exactly these five canonical owners; no new mobile/onboarding/auth implementation spec.

| Milestone / order | Mobile work | Backend/native dependency and exit condition |
| --- | --- | --- |
| M0 · baseline + schema | Audit installed lockfile/native OS targets, typecheck/lint/Jest/builds; agree DTOs/adapters, environments and route params | Inventory actual backend; one versioned schema/error examples. Select peer-compatible adapter versions through build spikes. No claim all existing wrappers work. |
| M1 · shell + design system | Shared screen/header/back, 5 tabs, overlays, tokens/fonts/logos/mascots, fields/select/date, status/card, charts and safe areas | Render approved fixture states only in explicit development/test mode. No production timer, auth or save bypass. Native navigation/deep-link tests. |
| M2 · account + continuation | Session bootstrap/secure storage, Login/Signup/purpose-scoped OTP/reset, provider auth, Profile/Edit/password, owned intent store | Real verified session and reset credentials, provider setup, logout cleanup. Manual auth intent returns Add; scan intent resumes only when scan/import services are available. |
| M3 · tracking core | Shared Add/Edit+trial, Detail/Reminder/Track again/Delete, catalog/platform lists, List/History, Home/month/spending and Calendar/day | Owned CRUD, revisions/idempotency, common date/event/money/status projections. Form and query invalidations tested; existing lifecycle/receipt history preserved. |
| M4 · Gmail onboarding + sync | Welcome/connect with external consent/discover/review with inline save/Ready/recovery and authenticated scan/change/trial/inbox review, connected inbox states | Verified app identity plus independent Gmail grant, account-owned OAuth/jobs/selected commit, incremental safe matching and Gmail successful-payment recording. No fake Ready or fixed stage timers. |
| M5 · reminders + receipts | Alerts/settings/permission states, device/timezone registration, Payments period/chart/evidence and record-specific history | Server scheduling/versioning/dedupe, actual sent ledger and successful receipt evidence. No local duplicate push schedule, no manual uploaded-document payment confirmation. |
| M6 · AI chat + media | One conversation/draft renderer, text corrections, real hold/release/slide-cancel voice, Image/PDF picker/preview/errors, multi-plan review | Owned extraction jobs/media cleanup, canonical catalog and owned-record matching, field confidence, idempotent creation; no video. Personal-file tests, not only scripted fixtures. |
| M7 · native widgets + motion | Small/Medium widgets, minimized atomic snapshot bridges/deep links, approved one-shot mascot/celebration | Native iOS/Android widget targets and OS-limited refresh tested; no every-unlock animation promise. Logout/stale/quiet/accessibility parity. |
| M8 · release verification | Full route/state parity, signed iOS/Android builds, accessibility/keyboard/offline/process-death checks, performance and removal of demo paths | Real backend/provider/media/push/store-policy/retention/legal verification; resolve release dependencies below. No automatic publication/deployment. |

Milestones are dependency order, not a change to free v1 scope or a promised time estimate. Backend operation work can progress alongside its corresponding mobile milestone once schemas are agreed. Core manual integration can be validated before Gmail/AI/push/widgets; do not call that subset the completed approved v1. M4 depends on M2/M3; M5 on event/receipt contracts; M6 on accounts/catalog/create operations; M7 on trustworthy summaries/events. Own-app monetization is not an M0–M8 dependency.

Definition of feature completion: native UI matches the approved state, actual owned operation succeeds, error/empty/loading/back/cleanup states work, tests cover real API/native boundaries, and relevant canonical docs remain aligned. Prototype approval, TypeScript success or a wrapper stub alone cannot meet it. Demo/fixture adapters may be used only in clearly separate development/test builds, never as production fallbacks.

<a id="release-dependencies"></a>
## Production release dependencies and known scope gap

The following are explicit build/release prerequisites, not unfinished approvals for the 74 existing views:

- Separate backend inventory and shared schema agreement: precise endpoints/DTOs/auth expiry/refresh, token/challenge policy, conflicts/idempotency, supported currencies/precision, job/media budgets/retention and ownership must be verified with the backend project.
- Native package compatibility and signed builds: current package declarations/Android minSdk/iOS Podfile do not establish supported device/OS coverage. Validate before pinning adapters. Configure actual provider IDs/redirects, APNs/FCM, email delivery, OAuth callback/verification and app identifiers.
- Real hosted Terms/Privacy/support destinations, Gmail/AI consent and privacy disclosures, server model/storage retention, release signing and store metadata must match implemented behavior. Never ship unavailable-link alerts as legal destinations.
- **Account deletion implementation remains a store-release dependency.** The user explicitly unlocked Profile Delete account entry/confirmation on 3 Nov 2026; its local design preview is Pending reapproval, superseding the earlier UI exclusion. Apple's account-creation policy requires in-app initiation, and Google Play requires an in-app path plus an external web resource for requesting deletion. This is an actual conflict in the previous release scope. The authorized local Profile entry/confirmation does not resolve the release blocker: real provider/backend reauthentication, deletion/retention/token/job cleanup and required hosted request page still need implementation and verification. The web request resource is not a full user website. Sources checked 31 October 2026: [Apple account deletion](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion), [Google Play requirements](https://support.google.com/googleplay/android-developer/answer/13327111).

Nothing in these dependencies authorizes redesigning locked screens, publishing, installing account credentials or claiming a reviewed backend. Track technical readiness against the [mobile verification gates](api-mobile-contract.md#verification-and-handoff-gates). Keep unresolved external inputs explicit instead of filling them with invented URLs/endpoints or fixture data.


<a id="frontend-delivery-plan"></a>
## Section-by-section native frontend plan — confirmed 31 October 2026

Immediate scope is the approved React Native frontend using development mock services, reviewed one section at a time. Build from current code and the coding reference project, retain TypeScript, reuse existing components and apply theme-only sizes/colors. The [mock/naming contract](api-mobile-contract.md#frontend-mock-phase) owns data and code conventions. The M0–M8 plan above still owns real integration/release; the F-sections below are frontend delivery checkpoints, not replacements for those gates or new product scope.

| Order | Section and implementation scope | Mock coverage / acceptance |
| --- | --- | --- |
| F0 | Foundations: reconcile typed target model, theme tokens/generic names, reusable Container/Header/Buttons/Input/select/date/info/status/mascot/skeleton, 5-tab/stack shell and mock service composition | One coherent config seed and isolated repository; populated/empty/loading/error scenarios; no inline screen fixtures, raw UI sizes/colors or duplicate existing controls. Keep token values/locked consumers unchanged. |
| F1 | Splash + Auth: Login, signup, purpose-specific OTP, forgot/reset, inline errors, secure-entry/visibility and keyboard | Mock session/OTP/pending/errors and auth intent restore; separate reset authorization. No fixture provider session in production storage. |
| F2 | Complete onboarding: single host/persistent header, animated panels, consent/scanning/results/save/Ready and both recoveries | Job scenarios, selection/per-currency summary, auth continuation, idempotent mock import, Ready actual saved IDs, Back and reduced motion. Approved step-specific scroll policy; no auth/import bypass. |
| F3 | Subscription entry: Add sheet + shared Add/Edit, service suggestions/selects/dates/category/notes/trial/custom days/calculated end/auto-renew and pinned submit | Creates/edits real mock records, field validation including missing trial start, exact-date preservation, duplicate submit/retry, reviewable Calendar seed. |
| F4 | Subscription browsing + management: List/status modal/empty, Detail/reminder/Track again/delete/platform subscriptions | All groups, OR status + search matching/counts, common rows/logos, lifecycle actions and related list; shared repository updates all affected queries. F3/F4 reviewed together for end-to-end CRUD. |
| F5 | Home family: populated/loading/empty/quiet, nearest-date tabs, Paid/Upcoming month summary, top-platform spend; This month/Spending breakdown drill-downs | Same subscription/event data as F3/F4; exact totals and distinct money meanings, compact spacing, chart touch regions and correct navigation. |
| F6 | Calendar + day detail | No-scroll measured month/grid, month totals, today/month selection and single next-event card. Empty date → Add sheet; one event → Detail; multiple → day view; month/date preserved on Back. |
| F7 | Alerts + reminder settings | Sent history only, compact groups, trial/access events, empty/OS-off states, per-record/default settings and bulk confirmation; future schedules separate from sent history. |
| F8 | Profile/Edit/password + connected inbox variants/imported subscriptions | Shared controls/readonly email/provider guards, logout, sync/reconnect/error/disconnect mock states and associated-record navigation. Earlier Auth components reused. The 3 Nov Profile deletion entry/confirmation preview is authorized and Pending review; production deletion/reauth remains separate. |
| F9 | History + Payments | All/Cancelled/Expired dialog, empty mascot, lifecycle cards; confirmed Gmail evidence, year/month/currency filters, usable graph, receipt detail and subscription-specific context. No expected charges marked Paid. |
| F10 | Authenticated Gmail scan/review/trial/recovery flows | Incremental candidates/new/updates/duplicate/ambiguous states, selected import and conflict/retry; shared components with onboarding but approved authenticated journey/header. |
| F11 | AI conversation/text/voice/image/PDF | One chat/composer, thinking/retry/correction, compact normal/trial drafts; hold/release/cancel voice, Image/PDF chooser/preview/remove/processing/errors and multiple-candidate review. Backend extraction is mocked; no video or uploaded-document payment confirmation. |
| F12 | Widgets preview + approved motion | Small/Medium examples, shared snapshot and deep-link semantics, nearest renewal/trial/quiet states and reduced motion. OS-installed native widgets, refresh and push are separate integration gates; preview alone cannot certify them. |
| F13 | Whole-frontend review | Run all section scenarios, creation→detail→list→home→calendar consistency, fresh launch/auth continuation, keyboard/safe areas/Back, accessibility, long values/multi-currency and no production fixture fallback. Record remaining native/API dependencies explicitly. |

Work one reviewable section at a time, with only prerequisites implemented beforehand. Existing partial screens/components are migrated, not counted as complete because a folder exists. Implementation has begun with the explicitly requested Splash slice and only its minimal shared prerequisites. F0 is not yet complete. Every section follows: inspect locked contract/current code → implement mock-backed UI → test appropriate behavior on native target → present preview → user accepts frontend section → update canonical owners and proceed. If new UX is needed, use scoped unlock rather than silently changing the prototype. No new sixth document, automatic commits, backend deployment or publication is part of this plan.


### Frontend delivery progress — Splash and onboarding

Onboarding (all nine states in one host) is implemented with mock scan/import/sign-in and awaiting the user's frontend review. Details are in [Product screens](product-screens.md#native-onboarding--1-november-2026-awaiting-frontend-acceptance).

Implementation started with the user's explicitly requested Splash slice of F1, reusing the minimal F0 primitives. Native Splash, optional shared icon path reveal and themed OS launch backgrounds are implemented and frontend-accepted by the user on 31 October 2026 (iOS verified; Android build/device parity unverified). F0 and the rest of F1 are not complete. No whole-section acceptance, real session validation, mock fixture repository or backend/provider integration is implied. Screen behavior and component/motion ownership remain in Product screens and Design system.

Home review decisions authorized 2 November 2026 (reapproved and relocked 2 November 2026; Upcoming screen pending): nearest renewal/trial remains first; same-date events use two compact external tabs with See all opening a date-grouped Upcoming screen. Home has Paid this month / Upcoming this month with evidence-separated semantics, then Top spending. Six-month forecast stays on Home below Top spending; Home's separate upcoming list and progress bar are removed. Title/Add remains visible during content scrolling, with AI reachable through the existing Add sheet. No broad Ask Loop Q&A scope, monetization change, or redesign of locked Calendar/List/Payments/drill-down screens is introduced. [Product screens](product-screens.md#home-family) owns exact layout and actions; [API contract](api-mobile-contract.md#home-review-integration-scope--2-november-2026) owns evidence/matching requirements.

The authorized Home review includes isolated two-event and three-event previews (`#home-2-events`, `#home-multiple-events`) plus a Home-only event-card chevron. Two Netflix plans remain distinct by ID/plan label; the additional Spotify trial is available in Upcoming via See all. These inspection cases were reapproved and relocked 2 November 2026, not new production features or persisted account data.

Home toolbar visibility (reapproved and relocked 2 November 2026): one nearest-date event hides the row; two show tabs only; more than two add See all with the total matching Upcoming subscriptions count. [Product screens](product-screens.md#home-family) owns the exact scope and date-range semantics.

Review queue item 7 was explicitly unlocked for implementation on 2 November 2026: separate Sort by modal beside existing Status filters, displayed-price ordering grouped by currency, without price ranges or currency controls, staged Reset/Apply and preserved status/search. Reapproved/relocked 2 November; shared headers are also reapproved/relocked. Listing base/card/status semantics and all unrelated screen locks remain intact. [Product screens](product-screens.md#listing) owns the contract.

Listing sort review refinement (reapproved/relocked 2 November 2026): show the applied order name inside Sort by rather than a numeric badge, and add Most subscriptions. Counts are computed over current search/status-matching owned records by canonical platform identity; platform groups descend by count, with stable alphabetical group ties and nearest-event ordering inside. [Product screens](product-screens.md#listing) owns exact controls and grouping.

Review status, 2 November 2026: the user explicitly finalized/relocked Listing (including applied order name and Most subscriptions), then unlocked Detail's five review items, Edit's conditional price-update/audit flow and fixed headers throughout the post-auth app. These new scopes and Price history/empty states were explicitly reapproved/relocked 2 November 2026. Existing Reminder/Track again, provider-management, payment evidence, source/email and trial semantics remain; lifecycle operations never cancel or pay a provider. [Product screens](product-screens.md#price-updates-and-history--approved-and-locked) and [API contract](api-mobile-contract.md#detail-lifecycle-spending-and-price-audit--design-approved-2-november-2026) own exact fields/data. No native/backend changes or publication are implied.

Google-continuation review item 14 was explicitly unlocked 2 November and finalized by the user with onboarding on 3 November 2026. Keep Welcome first; the existing Gmail connection journey establishes verified Google app identity and asks read-only Gmail permission before scanning. Session and mailbox grants remain separate. Signed-in users save selected finds directly from Results to Ready, without a separate Save your finds screen or another Google/Apple/email prompt. Preserve manual/skip authentication where required, returning to Add form rather than fictitious scanned success; maintain owned-import/idempotency and existing-session account choice. [Onboarding](product-screens.md#google-continuation--pending-reapproval-2-november-2026) and [API contract](api-mobile-contract.md#onboarding-google-continuation--pending-reapproval-2-november-2026) own the exact fields/conditions. Native and real provider/backend integration are not part of this prototype change.

The user authorized all 12 onboarding refinements on 2 November 2026; the local prototype design was finalized/relocked by the user 3 November 2026. Target: Welcome → Connect Gmail (external provider identity/consent) → Discovering → Results inline review/edit/save → Ready → Dashboard. Remove both separate app permission and save-confirmation frames. Preserve five conceptual stages, manual entry and an explicit zero-save route. Shared money/date rules, review corrections, owned resume/imported-record continuity and optional expression-aware mascot drawing are owned by [Product screens](product-screens.md#google-continuation--pending-reapproval-2-november-2026); production operations by [API/mobile contract](api-mobile-contract.md#onboarding-google-continuation--pending-reapproval-2-november-2026). Unrelated layouts, v1-free policy and notification setup remain unchanged.
