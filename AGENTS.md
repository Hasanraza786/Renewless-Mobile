# Renewless project working rules

## Current phase and document ownership

- Current phase: the complete existing prototype base was approved 31 October 2026; the user subsequently authorized shared typography (heading 22, subheading 16, body 12) plus the studio inspector. Typography is Pending reapproval across all 74 views; other design scopes remain locked. The canonical React Native implementation handoff/navigation/milestones are finalized; implement faithfully when requested. A docs-finalization task does not authorize general native/API changes, dependency installation or deployment.
- Maintain exactly five canonical product documents: `docs/product-specification.md`, `docs/product-screens.md`, `docs/api-mobile-contract.md`, `docs/design-system.md`, `docs/billing.md`.
- Root README is an index/setup guide. This AGENTS.md is working policy. Do not create separate Auth, Onboarding, Home, Calendar, Listing, per-screen, duplicate summary or dated override documents.
- Product specification owns features/journey/scope/catalog; Product screens owns screen fields/actions/states/layout/approval; API/mobile contract owns shared backend data/operations/errors; Design system owns common visual/components/assets/motion; Billing owns Renewless Pro purchases/entitlements. Use links to owners instead of independent repeated specifications.

## Release policy — v1 free, monetization Phase 2

- V1 is fully free: all planned tracking, AI text/voice/image/PDF, Gmail scans/ongoing sync, additional inboxes, reminders and widgets have no paid entitlement gate or 25-record monetization cap.
- Do not show Paywall, Upgrade, Renewless Pro, plan usage meters, purchase/restore/manage-plan controls or billing-related access pauses in v1. Authentication, consent, ownership, security/rate limits and real integration prerequisites still apply; free access does not claim an implemented feature or unlimited backend resources.
- Own-app subscriptions, RevenueCat/store purchases and monetization are Phase 2 only. Keep proposed plans and existing review assets in docs/billing.md as deferred drafts. Enabling monetization later requires explicit user approval and synchronized canonical docs; do not silently restore old gates or fake Pro=true.
- This release-policy change was explicitly unlocked by the user. Preserve unrelated finalized designs and the existing scoped-unlock process. Product monetization never changes tracked third-party plan prices/trials or confirmed-payment semantics.

## Screen design freeze — explicit user requirement

- Before changing any screen or shared component, read the lock register in `docs/product-screens.md` and identify affected locked views. Locks cover layout, copy, fields, interaction, status/data semantics and navigation, not just screenshots.
- **If asked to change a LOCKED screen, stop before edits, remind the user that it is locked, explain the requested scope and request explicit unlock confirmation.** A normal change request or “resume” is not an unlock.
- An explicit instruction acknowledging the lock and authorizing a specific unlock/change is sufficient. Do not request the same approval twice. Keep the unlock limited to that scope; unrelated locked screens remain frozen.
- A shared component/domain change that changes locked views also requires scoped unlock. Work on pending screens must not silently alter finalized ones.
- Add form/Edit including the complete trial extension are now fully locked after whole-prototype approval on 31 October 2026. No trial-extension pending exception remains.
- Documentation consolidation, accurate gap reporting and implementation that faithfully matches the approved contract do not need a design unlock. Do not use this exception to introduce new UX or silently “fix” an approved behavior.
- After an unlocked edit, mark the affected scope Pending reapproval. Relock with date/scope only after explicit user final approval. New/unreviewed screens start Pending; a preview frame or discussed product rule is not final approval.
- Do not reopen or redesign approved screens while implementing them. New scope, including the separately flagged store account-deletion gap, requires explicit scoped approval before a new design is added.

## Mandatory documentation synchronization

- Every authorized screen/feature change updates its owning canonical specification and all affected API, design-system, product and billing contracts in the same task. This rule applies during design and future implementation.
- Replace superseded requirements; do not append conflicting “latest update” notes. Update the lock register, relevant routes and final approval date/scope when appropriate.
- Keep the Design Studio `screenDesignLocks` badge map in `prototypes/renewless-studio/dist/app.js` synchronized with the Product screens lock register on finalization, scoped unlock and reapproval. Locked = lock icon; partial base = Base lock; pending = no icon. Viewing a locked screen remains allowed.
- On finalizing a pending section, record its exact screens/states, pending exceptions and lock status. Keep final design separate from implementation readiness.
- Preserve stable subscription/platform IDs, local date/recurrence semantics, separate currencies, trial vs renewal events, explicit payment confirmation and actually-sent Alerts consistently across surfaces.
- Do not claim backend capability from HTML behavior or client wrapper presence. The separate backend needs its own schema/integration verification; document known gaps.
- Validate local links/anchors and obsolete filename references after documentation changes; review routes/register coverage and appropriate behavior after UX changes. Keep runtime/push/OAuth/purchase limitations truthful.
- Reuse `dist/mascot.js` / `mascotView` for new mascot placements. Preserve the approved assets, centered framing and decorative accessibility; do not change locked placements while adopting the component without scoped unlock.
- Keep approved screens single Final in the prototype. Preserve user-facing production copy and the surrounding studio fixture disclosure.

## Attachment and document rules

- Image/PDF share the free AI conversation and native Photos/Files target UX; no video input. HTML is a design preview, not native picker/parser/AI/database integration.
- Ground extraction in the canonical platform catalog and owned records. Never let model IDs/aliases overwrite existing records or publish unverified platforms/links. Review ambiguous/new/existing proposals explicitly.
- Bank statements supply historical charge evidence; do not invent cycle/next renewal or auto-mark Paid. Uploaded-document discovery does not change the locked Gmail-only confirmed-payment pipeline. Keep observed facts separate from reviewed tracking fields and discard raw document media under its lifecycle contract.

## Repository assets

- Do not delete assets, fonts/licenses, screenshots, animation JSON/GIF, tests or source code as part of documentation cleanup. Source/license attribution belongs in Design system; App Store draft notes belong in Billing.
- Preserve unrelated user changes. Publication, native integration and design approval are separate work.

## Redux file naming

- Action files use kebab-case `<feature>-action.ts`, e.g. `profile-action.ts` and `auth-action.ts`, under `src/redux/actions/`.
- Slice files use kebab-case `<feature>-slice.ts`, e.g. `profile-slice.ts` and `session-slice.ts`, under `src/redux/slices/`. Keep `index.ts` as the barrel.
- Apply this convention to new Redux modules and update imports/exports when renaming. File naming does not change reducer names, persisted keys or exported symbols.

## React Native implementation rules — confirmed 31 October 2026

- **Strict size rule:** do not add new entries to `SIZES`. Layout/spacing/radii/icon/touch dimensions use only existing `SIZES.padding`, `SIZES.padding2`, `SIZES.padding3`, with simple purposeful multiples allowed (for example `SIZES.padding * 5` for a logo). No raw nonzero UI pixel values, ad hoc `+ 2` adjustments, arbitrary fractional multipliers or new brand/screen/semantic size aliases. Font sizes also derive from these same three padding values; the 11 named font-size aliases are removed and must not be restored or replaced by another map/helper of aliases. Value-preserving sums, differences and integer divisions of the three bases are permitted for typography (e.g. `SIZES.padding2 + SIZES.padding3 / 4` preserves 14). Existing line-height tokens remain for now; do not add typography tokens. Leave unrelated legacy consumers intact and migrate only authorized sections. Zero resets, flex/aspect ratios, percentages, animation progress/time and SVG viewBox/path coordinates are not pixel tokens. Runtime containers use flex/measured available space/safe areas, not fixed full-device heights. This user correction supersedes the earlier permission to add missing generic size tokens; colors still follow the separate theme rule.
- No raw color strings, hex/RGB/RGBA or inline alpha colors in native UI. Reference theme `COLORS`/`colors`; new colors are added to the same theme first, with general visual/semantic names, never screen-specific names. Preserve existing exports while migrating aliases/callers; do not change approved color values. Licensed provider artwork retains its brand colors; artwork coordinates are not layout sizes. App-tinted icons/mascots use shared theme inputs; do not recolor brand assets.
- Reuse the app's existing components. Inspect their APIs before creating a new component. Prefer a typed prop/variant/slot in the existing component if it can faithfully support the behavior. New components are for distinct reusable responsibilities, not screen-specific copies or giant unrelated mode switches. Shared changes must preserve all locked consumers.
- Onboarding is one native `Onboarding` host screen with a persistent fixed header/steps and shared footer region. Content panels change with directional slide/opacity transitions and Reduced Motion fallback. Existing approved states/back/recovery/auth/import semantics remain; the HTML inspection routes remain separate references. Auth screens stay separate and resume the owned onboarding intent. Never advance scan/import via animation or timers. Details: `docs/product-screens.md#native-navigation` and `docs/design-system.md#native-implementation-rules`.
- This instruction records the native implementation approach and audits gaps; it does not authorize redesigning locked screens or claim the current native code already follows these rules. Update canonical owners during implementation and verify shared consumers, safe areas, keyboard and accessibility.

## Native frontend phase and NOMW reference — confirmed 31 October 2026

- Current execution phase is section-by-section React Native frontend with backend-shaped **development mock data**, followed by user review of each section. This is separate from verified API/native-provider integration and from redesigning locked UX. A planning request does not itself authorize starting every implementation section.
- Naming/code reference is the local read-only `/Users/razahasan/Desktop/MobileApps/nomw` mobile project. Use its separation of screen rendering, functional hook, styles, API service, action and slice, while retaining Renewless TypeScript and its stricter theme/security rules. Do not copy business logic, credentials, dependencies or inconsistent legacy conventions wholesale.
- Components/screens/types: PascalCase. Functions, handlers, setters and exported actions: camelCase (`onSubmit`, `getSubscriptions`, `setSelectedStatus`). Local/domain UI state: descriptive snake_case (`selected_statuses`, `scan_loading`, `form_data`), setters camelCase. Constants: UPPER_SNAKE_CASE. Keep library-required identifiers and external DTO keys exact; map DTOs once at the adapter boundary. Retain existing public symbols until deliberate migration. Redux filenames remain `<feature>-action.ts` and `<feature>-slice.ts`.
- Screens use `index.tsx` for presentation, `index.function.ts` for nontrivial `use<Screen>` hook logic and existing `styles.ts` for styles; do not mass-rename existing files merely to copy NOMW's mixed singular/plural style filenames. Small presentational components need no empty functional file.
- Put the shared development dataset/scenario configuration in `src/config/mock-data.ts` when implementation begins. Screens/components must not import fixtures directly. An explicitly selected development mock adapter implements the same typed service interfaces as the API adapter, through existing actions/slices. No production fallback from failed API to mocks, no fake provider/payment proof and no raw personal media in fixtures.
- Backend-shaped mocks are provisional DTO contracts until verified against the separate backend. Stable IDs, exact money/currency, local dates/events, revisions/cursors, structured errors and cross-surface relationships must follow canonical docs. Mock mutations use an isolated in-memory repository; reset restores fixtures. Review pending/empty/error/retry and interactions as well as populated screens.
- Each section: inspect approved contract → reuse/extend components → implement mock-backed states → native/device checks appropriate to scope → show user preview → record frontend acceptance and update owners. Prototype design stays locked; frontend acceptance, real integration and release readiness are separate statuses.
