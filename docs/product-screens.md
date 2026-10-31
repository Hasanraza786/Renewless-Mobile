# Renewless product screens

V1 release policy, approved 31 October 2026: all planned user features are free. No paywall, paid feature gate, subscription-count monetization cap, Upgrade/Pro/Restore/Manage plan surface or billing-driven sync pause ships in v1. Authentication, Gmail consent, ownership, privacy and operational safety still apply. Own-app monetization is Phase 2 only; its retained drafts/assets are owned by [Billing](billing.md). Free availability is separate from native/API implementation readiness.

Single screen-by-screen specification, consolidated 30 October 2026. All approved screen details are in this file; there are no separate Auth/Onboarding/Home/List documents. API semantics: [API/mobile contract](api-mobile-contract.md). Shared components/assets: [Design system](design-system.md). Scope/journey: [Product specification](product-specification.md). Own-app purchases: [Billing](billing.md).

## Screen lock register

Design freeze requested by the user on 30 October 2026. **LOCKED means approved design/behavior; it does not mean backend/native implementation is complete.** Do not change a locked screen directly when asked: remind the user of its lock, explain the requested scope and obtain explicit unlock confirmation first. A routine request to change a screen is not itself an unlock. An explicit request that names the lock and authorizes a scoped unlock is sufficient; do not ask twice. Shared-component changes affecting locked screens require the same check.

| Section / exact preview screens | Status | Approval / scope |
| --- | --- | --- |
| Splash; Login; Login · error; Sign up; Verify OTP; Forgot password; Verify reset; Reset password | **BASE LOCKED · Typography pending** | Auth approved 29 Oct 2026 |
| Welcome; Connect inbox; Inbox permission; Discovering; Your subscriptions; Save your finds; Ready to go; Scan · no results; Scan · interrupted | **BASE LOCKED · Typography pending** | Complete onboarding approved 29 Oct 2026 |
| Home; Home · loading; Home · empty; Home · quiet; Spending breakdown; This month | **BASE LOCKED · Typography pending** | Home family approved 30 Oct 2026 |
| Calendar; Calendar day | **BASE LOCKED · Typography pending** | Approved 29 Oct; refinements 30 Oct 2026 |
| List; List · empty; List · upcoming; List · no renewal; List · active; List · trial; List · trial ended; List · due today; List · cancelled; List · expired | **BASE LOCKED · Typography pending** | Entire Listing finalized 30 Oct 2026, including Status filters and empty states |
| Alerts; Alerts · trial; Alerts · empty; Alerts · notifications off; Reminder settings | **BASE LOCKED · Typography pending** | Complete Alerts family approved 30 Oct 2026: compact rows, shared empty mascot, permission state, account settings and bulk confirmation |
| Profile; Profile · incomplete; Profile · social; Edit profile | **BASE LOCKED · Typography pending** | Explicitly approved 30 Oct 2026: Profile variants, inbox/menu layout, logout confirmation and Edit profile |
| Change password | **BASE LOCKED · Typography pending** | Explicitly approved 30 Oct 2026: password form, inline validation, visibility toggles, pinned commit and provider guard |
| History; History · empty | **BASE LOCKED · Typography pending** | Reapproved 30 Oct 2026: List-style All/Cancelled/Expired status filter, compact upper spacing, lifecycle cards, navigation and empty mascot |
| Payments; Payments · empty | **BASE LOCKED · Typography pending** | Reapproved 31 Oct 2026: Gmail receipt/source/copy, subscription-specific history and existing period/chart/details/empty design |
| Connected inbox; Connected inbox · reconnect; Connected inbox · syncing; Connected inbox · error; Inbox subscriptions | **BASE LOCKED · Typography pending** | Approved 31 Oct 2026: connection facts/info, reconnect/sync/error, imported list and disconnect; Explore Pro promo and standalone Pro inspection route removed |
| Detail; Detail · trial; Detail · trial ended; Detail · cancelled; Detail · no renewal; Platform subscriptions; Delete confirm | **BASE LOCKED · Typography pending** | Approved 31 Oct 2026: event/billing/email/receipt history, provider links, notes, related-platform and delete views; Reminder and Track again sheets included |
| Gmail · scanning; Gmail · review; Trial review; Gmail · nothing found; Gmail · interrupted | **BASE LOCKED · Typography pending** | Approved 31 Oct 2026: scan readiness and mascot sizes, new/update/duplicate review, trial/change/inbox sheets, selected save and empty/interrupted recovery; Trial review is a sheet inspection preset |
| Widgets | **BASE LOCKED · Typography pending** | Approved 31 Oct 2026: Small/Medium Home Screen layouts, next renewal/trial/quiet states, Loop knock/reveal and Reduced Motion, stable-ID tap navigation; refresh policy included. Native integration deferred |
| AI chat; AI chat · trial; Voice | **BASE LOCKED · Typography pending** | Approved 31 Oct 2026: shared text/voice header/composer, ordinary/trial draft cards, thinking, correction/retry/add states, audio playback and hold/release/slide-left cancellation. Image/PDF attachment design separately approved 31 Oct; live AI/microphone/native integration deferred |
| AI chat · attachment | **BASE LOCKED · Typography pending** | Approved 31 Oct 2026: Image/PDF chooser, preview/remove, multi-page fixture preview, receipt/statement review, catalog/owned-plan matching and recovery. Real native/AI/backend integration deferred |
| Add sheet | **BASE LOCKED · Typography pending** | Approved three-option layout, 26 Oct 2026 |
| Add form; Edit | **BASE LOCKED · Typography pending** | Complete Add/Edit approved 31 Oct 2026 with whole-prototype final approval: base plus Trial days, required Start date, custom validation, calculated end with 10px gap, renewal restoration, tracking switch and pinned commit. |

Shared typography scope was authorized by the user after the full-base approval on 31 October 2026: heading **22**, subheading **16**, normal text **12**, with matching line heights **28/22/18**. All 74 views now await typography reapproval; their other approved scopes remain locked. This is not a global layout, navigation or feature unlock. The Studio `screenDesignLocks` map marks each view `base`, with a Base lock badge and tooltip “Base design locked; typography pending review”. Relock the typography scope only after explicit visual acceptance.

The new studio-only inspector opens on double-click inside the phone: text shows computed family/size/weight/line height/spacing/color/alignment and layout measurements, with Copy CSS; SVG/img icons show preview and SVG/PNG export as supported by the original asset. PNG scales are 1×/2×/4×. Inspect mode pauses phone actions for inspecting controls; leaving it returns to interactive preview. Close/Escape dismisses the panel and screen changes clear stale selection. No inspector controls are part of the mobile app.

Named state routes are inspection presets, not separate product implementations. Removed Home first-visit/Home money routes stay removed. Lock applies to copy, layout, fields, interaction, state semantics and navigation, including their shared-component dependencies. Documentation consolidation, truthful implementation-gap notes and implementation that faithfully matches the lock do not need a design unlock.

Shared subscription-card scope reapproved and relocked 31 Oct 2026 at the user's explicit request: List populated states, Home upcoming subscriptions, Calendar next/day rows, This month, History, Inbox subscriptions and Platform subscriptions now use the [single card component](design-system.md#subscription-card). This approval changes card composition only; headers, filters, totals, empty states, record ownership and navigation remain frozen. History keeps lifecycle/Last price information; event rows keep trial/projected/no-charge semantics. Existing screen-family locks above include this replacement.

Header back-button component reapproved and relocked 31 Oct 2026 after explicit scoped unlock: every header Back control uses the [shared back button](design-system.md#header-back-button). Includes recovery/onboarding, manual Add/Edit base, Detail/Platform, Calendar day, spending/month views, Reminder settings, Profile subpages, History/Payments, authenticated Gmail and AI text/voice headers. Existing destinations, titles, other controls and pending feature exceptions remain unchanged; the Add/Edit trial extension was subsequently accepted with whole-prototype final approval; Phase 2 monetization remains deferred.

V1 free-access scope reapproved and relocked 31 Oct 2026 after explicit user unlock: no active Paywall or Profile Pro route; onboarding/authenticated import goes directly to Ready, whose Back returns to Save your finds; Profile has no plan/Upgrade/Restore/cap meter; all AI/Gmail/add access and extra inboxes are free without the former 25-record monetization cap. Connected inbox uses real authorization/job state and offers Sync now without Pro. Old #paywall redirects Home and #profile-pro redirects Profile. Monetization drafts/assets are Phase 2 only. Rules are recorded in AGENTS.md. Unrelated approved layouts remain unchanged; native/API integration is still separate.

## Design completion and implementation readiness

The user finalized the complete existing prototype on **31 October 2026**, including the Add/Edit trial extension after its spacing correction. All 74 current Design Studio inspection views retain their approved base, with the subsequently authorized shared typography scope pending reapproval. These are states/presets, not 74 independent native screens. Typography requires the new visual review; previously approved features retain their approval. Faithful implementation may proceed when requested; new scope still needs review and locked UX changes still require scoped unlock.

Native implementation and production integrations are not complete. [Mobile architecture](api-mobile-contract.md#mobile-implementation) owns the build plan; [navigation mapping](#native-navigation) below owns the native screen/state mapping. Phase 2 monetization is deferred. The currently excluded account-deletion flow is a separately identified [store-release scope gap](product-specification.md#release-dependencies), not an approved new screen.

## Change and documentation workflow

1. Read this register and AGENTS.md before work. Identify direct and shared-component impacts.
2. Locked scope: stop before edits and request scoped unlock. Keep unrelated locked screens frozen. Pending scope: proceed within the user's request.
3. After authorization, update the relevant screen specification and preview together; update product rules, API contracts, design system or billing only where affected. Replace superseded text rather than appending competing rules.
4. Verify links, route/register coverage, logic/visual behavior appropriate to the change, and document production gaps honestly. Approval is a design decision, not an API test result.
5. After an explicitly unlocked change, mark that scope Pending reapproval until the user accepts it. On explicit final approval, record date/scope and relock. Do not leave an ambiguous permanent global unlock.


<a id="authentication"></a>

## Authentication

The user approved the complete auth screen set: Splash, Login (including inline error state), Sign up, Verify OTP, Forgot password, Verify reset and Reset password. This is the canonical frontend/backend design behavior contract. Matching single Final routes in `prototypes/renewless-studio/dist/` are the visual reference; HTML authentication is scripted, not a working identity service.

### Screens

| Screen / route | Fields, copy and actions | Outcome |
| --- | --- | --- |
| Splash / `#splash` | Centered R draws in, Renewless below, “Stop the subscription renewals you don’t need.” No restoring-session text or preview-login action. | Production checks stored session: valid → Home; no valid session → Welcome. Do not discard a session solely because of a transient network failure. |
| Login / `#login` | Welcome back; email/password; Forgot password; Log in; Google/Apple buttons with respective icons; Sign up link. | Session on successful credentials; no login OTP. Resume pending onboarding intent or Home. |
| Login error / `#login-error` | Same layout, generic “Wrong email or password. Please try again.” beneath password. | Stay on form; do not disclose which credential is wrong. |
| Sign up / `#sign-up` | Name, email, password, confirm password; Create account; Google/Apple buttons; Log in link. No phone/DOB/gender or other optional fields. | Email signup → Verify OTP without a session. Social skips signup OTP. |
| Verify OTP / `#verify-otp` | Signup-specific copy, destination email, Change email, six-digit input, Verify email, expiry/resend details. | Successful signup verification creates session, then resumes pending intent or Home. |
| Forgot password / `#forgot-password` | Email, Send code, back/login actions. | Send reset code → Verify reset. Use generic server responses; do not enumerate accounts. |
| Verify reset / `#verify-reset` | Reset-specific copy, destination email, Change email, six-digit input, Verify code, expiry/resend details. | Returns short-lived reset authorization only → Reset password, never an authenticated Home session. |
| Reset password / `#reset-password` | New password + confirmation, password guidance, Reset password, back to reset verification. | Successful reset → Login. User logs in using the new password. |

### Native Splash implementation — frontend accepted 31 October 2026

`src/screens/Splash/index.tsx` / `index.function.ts` / `styles.ts` faithfully implement the locked Splash: centered mint R strokes, Renewless wordmark and the exact two-line tagline, with no restoring/preview login copy or actions. Existing Container/CustomText/Icons are reused. Icons adds an opt-in vector-path reveal; existing static consumers keep their rendering. Native dimensions follow the strict three-padding-token rule, including purposeful multiples; line heights derive inline from the three padding bases; the named line-height tokens are removed and unmigrated legacy screens now use natural line height. The user authorized this native correction: 100-unit mark, 20-unit inset/name gap, 12-unit tagline gap, 8-unit reveal offset, shared-typography wordmark 22/28 (heading) and tagline 12/18 (body), default letter spacing. Splash font sizes use the `SIZES.h3`/`SIZES.sm` keys (RFValue-scaled; 22/12 on the 844pt Studio frame); unmigrated legacy screens keep padding-derived font sizes until their section is implemented. This changes no other screen’s design lock. No new size aliases remain. Prototype design stays locked and unchanged. The user accepted this native Splash frontend on 31 October 2026 and then authorized adopting the shared typography on it, matching the Studio Splash (22/28 wordmark, 12/18 tagline); the typography scope itself remains pending reapproval across the prototype. Vector geometry and animation timing are not pixel-layout constants.

App renders one Splash through redux-persist hydration, then opens the existing root navigator only when hydration and the one-shot reveal have both completed. It does not replay when hydration finishes mid-animation. Reduced Motion uses the completed static mark/text, with no artificial wait. Unmount stops the timeline and prevents completion callbacks. Native launch is background-only, using the exact Splash background (`COLORS.background`, #151719), as requested by the user. iOS launch storyboard, UIWindow and pre-content React root view all use the named AppBackground resource. Android window/system splash uses app_background; Android 12+ uses a same-color drawable instead of the default visible launcher icon. There are no native launch labels, separate wordmark or duplicate logo reveal; JavaScript owns the approved R/name/tagline animation. Android device rendering remains unverified.

This is frontend Splash implementation only. It does not validate persisted credentials, implement secure-storage migration, mock/live auth continuation or certify Home routing. The existing token-based navigator still needs the documented session work. Static brand presentation requires no mock backend dataset. Prototype approval remains locked; native frontend acceptance is recorded on iOS, and Android device parity remains a separate check. Verification: TypeScript and scoped ESLint passed; four Jest tests cover hydration ordering, one-shot completion, Reduced Motion and unmount cleanup; the iOS Simulator Debug build succeeded and its launch/reveal/navigation transition was visually inspected. Android resources are updated but an Android build/device preview has not been verified.

### Shared form and layout rules

Use locked graphite/mint/Raleway and R mark/wordmark, no Loop mascot. Preserve the approved compact input sizing, consistent gaps and aligned social-provider icons. No sample/testing copy inside phone screens; external studio notice remains.

Errors appear immediately beneath their respective fields with associated accessible descriptions and invalid states. OTP is one logical field with its error below the digit group. Validate required name/email/password, email syntax and matching confirmation. Preserve entered non-secret values on errors. Focus the first invalid field on submit; never log passwords or OTPs. Keep generic credentials errors under password, while form-wide network/server failures need a clearly associated form message.

Password controls retain visibility toggles where present. Prototype password guidance is at least six characters; final backend policy and matching frontend copy must be agreed before integration, not silently diverge. Confirmation is client validation, not a separate stored credential. Keyboard avoidance, autofill, six-digit paste and large-text layout require native validation.

During requests, show pending state, prevent duplicate submits and re-enable retry after failure. Production inputs start empty or use appropriate secure autofill, never prototype fixture values. Do not show success before the server confirms it.

### Account/session and continuation

- Email signup sends a five-minute OTP; resend available after two minutes. Production expiry, cooldown, attempt limits and rate limits must be server-authoritative. Invalid/expired codes show inline errors and remain in the relevant verification flow.
- Email login returns a session without OTP. An unverified signup goes to signup verification instead of Home. Reset verification cannot be exchanged for an app session.
- Google/Apple use Firebase provider identity verified by the separate backend before issuing a Renewless session. Cancellation stays on the originating auth screen. No OTP for a successful social account flow. Gmail inbox authorization is a distinct consent process, not app sign-in.
- Preserve pending intent across login/signup/social/OTP: reviewed scan candidates → authenticated import → Ready; manual entry → Add form; ordinary returning login → Home. Authentication alone must not mark imports saved.
- Account linking requires verified ownership/provider identity. Do not merge or attach accounts based only on an unverified client email. Handle Apple relay email/missing name without inventing personal data.
- Existing session response expectation is `{ token, user }`; precise endpoints, payloads and error contracts must be verified in the separate API project. Reset authorization is short-lived and distinct. Production storage/refresh/logout behavior must be agreed with backend.
- FCM token lifecycle follows product-specification.md#journey: submit on login/signup verification/social session, update on Home if changed, clear on logout; one stored device token/account. Respect OS permission denial without blocking account access.
- Password management is available only where a password exists; no password form should be exposed from a social-only authenticated profile. The public Forgot password form must not expose account existence/provider details.

### Integration checks, not outstanding design approval

HTML uses prefilled fictional account/code values and scripted navigation. It does not verify OTPs/passwords, enforce real cooldowns, send emails, issue sessions, link provider identities or securely persist them. Splash currently advances to Welcome on a timer. Pending manual-entry routing remains a documented prototype gap in product-screens.md#onboarding.

Before release, verify real session restore/expiry and offline failure, inline API error mapping, pending states, signup/OTP expiry and resend limits, reset-token lifecycle, provider cancellation/failure, safe account linking, continuation through auth, keyboard/autofill/accessibility and token storage. Native integration and API contract validation are separate from this finalized design.

### Provider configuration handoff

Backend requires the configured Firebase project with Authentication/Google/Apple enabled and Admin credentials (service-account JSON or project_id/client_email/private_key), held in server environment, never committed. Mobile requires matching google-services.json / GoogleService-Info.plist, Google web client ID and Android debug/release SHA fingerprints. Apple setup requires the app capability, Services ID, signing key/Team ID/Key ID configured for the provider. Keep server/private keys out of the binary.

Google/Apple login requests no Gmail inbox scope and never handles the user's provider password. Apple relay email/missing subsequent name is supported using verified provider identity. Existing account linking must follow ownership rules above. [api-mobile-contract.md](api-mobile-contract.md) records required operations and the audited legacy wrapper gaps; final provider configuration is an integration dependency.

<a id="onboarding"></a>

## Onboarding

Finalized by the user on **29 October 2026**, including Save your finds, both recovery screens and the happy/sad Loop variants. This document is the canonical onboarding contract for frontend and backend. It replaces the earlier login-first flow and all superseded iteration notes. Design approval does not mean production integration is complete.

### Journey and screen inventory

Splash → Welcome → Connect inbox → Google permission → Discovering → Your subscriptions → Save your finds/account → Ready to go → Home.

Returning authenticated users enter Home. Returning users without a session can log in from Welcome. Gmail access is separate from Renewless authentication; users may save using Google, Apple or email independently of the connected inbox.

| Screen / prototype route | Approved content and actions |
| --- | --- |
| Welcome / `#welcome` | Receipt-to-subscription illustration; Find / Track / Remember with 22px centered SVG icons; Find my subscriptions → Connect inbox; Log in → Login. No sample exploration or network request. |
| Connect inbox / `#connect-inbox` | Labelled Gmail → Renewless illustration; last-12-month scope; read-only, review-before-save and first-inbox-free facts; shared information tooltip. Connect Gmail & scan → permission; manual entry → Sign up. |
| Inbox permission / `#inbox-permission` | Google icon, Your inbox. Your permission., read-only/AI explanation; Continue with Google → Discovering; Not now/back → Connect inbox. Actual application hands off to Google's account picker/consent, not a custom imitation. |
| Discovering / `#discovering` | Neutral Loop in 150px radar; Finding receipts → Grouping subscriptions → Checking renewal details. Review my subscriptions disabled until all three completed ticks; 14px space beneath action. No test buttons. Success with candidates → review; zero candidates → no results; failure → interrupted. |
| Your subscriptions / `#your-subscriptions` | Compact estimated monthly total, selected count, next-seven-days summary, platform-logo rows with dates/amounts and checkboxes. SUBSCRIPTIONS FOUND label; shared estimates tooltip. Save N subscriptions → Save your finds; disabled if none selected. Manual action → Sign up. |
| Save your finds / `#save-your-finds` | 56px brand/check tile; Keep what you found.; selected count/monthly total; Free to save. No payment required.; account explanation. Google, Apple, centered email action; underlined Terms · Privacy. Top back → review preserving selection. No bottom back button. |
| Ready to go / `#ready-to-go` | Happy Loop, SVG check badge, personalized success heading, saved count/monthly cost, one nearest renewal/trial-ending event with logo and confidence where relevant, reminder setup encouragement, dashboard CTA → Home. One-shot corner celebration. |
| Scan · no results / `#scan-no-results` | Sad Loop with inbox badge; No subscriptions found this time.; last-12-month scope, alternate-email hint, manual reassurance. Try another Gmail account → Connect inbox; manual → Sign up. Only after completed scan with zero candidates. |
| Scan · interrupted / `#scan-interrupted` | Same recovery layout, sad Loop with disconnected badge; Your scan was interrupted.; connectivity/access hint. Reconnect & try again → Connect inbox; manual → Sign up. Do not imply zero subscriptions, saved data or preserved progress without backend confirmation. |

Five conceptual progress stages: introduction, connection, scan, review/save, completion. Permission belongs to stage 2; Save your finds to stage 4; Ready to stage 5. Splash/auth retain their separate specifications; paywall belongs to Phase 2.

### Layout and copy

Use locked charcoal `#151719`, neutral cards `#202326`, mint `#B9E58C`, Raleway and shared assets. All onboarding routes use the single Final prototype view.

Keep header/progress and bottom actions fixed. Welcome, Connect inbox, permission, Discovering and results may scroll their middle content when needed. Save your finds, Ready and both recovery screens fit the standard phone view without inner scrolling. Validate small screens and large system text during native implementation: never clip essential content or controls merely to suppress overflow.

Save your finds: 26px heading, 46px social buttons, 10px action gaps; heading-to-description 14px, intro-to-summary 20px, summary-to-reassurance 16px, then account explanation 10px. Email stays centered; legal links underlined. Connect inbox retains 135px illustration, 20px/26px intro margins, 14px trust-row padding and 20px before info row. Results retain 4px intro top margin and 8px eyebrow gap.

Phone-screen copy is production-facing: no sample/test/simulation wording. The surrounding studio explicitly discloses fictional data and scripted actions. Do not remove truthful Estimated labels. Sample emails, names and dates are replaced by real account/scan data in production.

### Shared info tooltip

Connect inbox and results use `infoTooltip({id, label, paragraphs, className})` in `prototypes/renewless-studio/dist/info-tooltip.js`. Reuse this component for future informational disclosures; unique IDs and escaped plain-text content are required.

Plain inline info icon adjacent to the label, invisible 44px touch target. Graphite-green `#252B29` surface, mint border, shadow and pointer aligned to trigger. Surrounding content dims to 65% and blurs 2px; background controls become inert. Close, outside click or Escape dismisses; explicit close/Escape restores trigger focus. No API call occurs when opening a tooltip.

Connect tooltip explains mailbox-wide read access, filtering relevant receipts, AI extraction and disconnect/consent. Results tooltip explains inferred dates/costs, older/cancelled plans, normalized monthly costs versus upcoming actual charges and separate currencies.

### Data and behavior contract

- Read-only inbox access must never send/delete mail. Explain filtering and obtain processing consent before extraction. Cancellation/denial returns to Connect inbox without scanning.
- First scan covers the last 12 months; candidates are reviewable suggestions, not automatically active subscriptions. Deduplicate receipts and retain uncertain/older-date indicators.
- Selection updates count, monthly totals, upcoming summary and save label together. Preserve selection/scroll on updates and back navigation. Save with no selection is disabled.
- Monthly cost normalizes billing frequency; next-seven-day charges are a distinct calculation. Group different currencies separately with no implicit conversion. Missing dates are excluded from scheduled totals, never invented. Production uses the user's local date, today through today + 7 calendar days inclusive, matching Home/List/Calendar.
- Temporary onboarding sessions own scans/connections before login. Account linking must verify ownership and import only selected candidates, idempotently. Gmail account identity does not choose the app account automatically.
- After successful account authentication and import, go directly to Ready, then Home. Never show success for a failed import. Preserve reviewed choices through authentication and recoverable errors.
- Manual path: authenticate if necessary, then continue to Add form without requiring Gmail or inventing scanned results. Prototype routing still needs this continuation wired; see integration checks below.
- Retrying should reuse valid authorization when possible, renew consent only when necessary, and avoid duplicate scan/import jobs. Another-inbox action must permit account selection.
- Ready uses successfully saved records and account name (omit name if unavailable). Its nearest eligible date remains labelled estimated when inferred; with no eligible date show the date-setup prompt. Do not claim reminders are enabled unless configured.
- Notification token handling follows product-specification.md#journey: capture at login/signup verification/social session, update on Home when changed, clear on logout; one token/account. This design does not add a new notification permission prompt. Native OS consent/denial handling remains an integration concern.

### Accounts and free v1 access

V1 is fully free, including AI text/voice/image, ongoing Gmail sync and additional inboxes. There is no live-subscription paid cap. After successful authenticated save/import, continue directly to Ready. No plan selection, payment, purchase/restore or optional upgrade step. Phase 2 drafts remain in [Billing](billing.md#revenuecat).

Real Terms/Privacy destinations are required before release. Current prototype controls show an unavailable message. Inbox OAuth, account auth are not implemented by the HTML prototype; own-app purchases are deferred to Phase 2.

### Mascot and motion assets

- Neutral Loop: scanning. No receipt/magnifier variant.
- Sad Loop: both recovery screens, soft oval eyes and small frown without eyebrows; 128px view, 150px SVG box accounting for intrinsic whitespace. `src/assets/icons/loop-sad.svg`.
- Happy Loop: Ready, centered within 112px halo with separate 30px SVG check badge. `src/assets/icons/loop-happy.svg`.
- Ready celebration: full-phone overlay outside content padding; two outer-corner poppers animate in, overshoot/recoil, emit 60 pieces after 420ms, then exit. Particle duration 3.2s, emission stagger 261ms, complete by 4s. Upward/inward burst slows at apex then falls/fades. Poppers offset outward (left/right -12px, bottom -8px in prototype). No looping or intercepted touches.
- `src/assets/animations/ready-celebration.json`: transparent 390×844, 60fps, four-second vector adaptation. GIF is a looping charcoal-background reference, not the runtime animation. Browser uses CSS/emoji; JSON uses vector cones and is not a pixel-identical export.
- Reduced Motion removes decorative entry/scan/celebration animation. Success and error remain understandable without animation. Native Lottie rendering/aspect ratios still need validation.

### Implementation readiness and verification

Approved design reference: `prototypes/renewless-studio/dist/` routes above. HTML uses fictional candidates, fixed 26 October 2026 scan timeline, timers, fallback Alex and scripted authentication. These are not live API results.

Before frontend/backend integration, agree one versioned API contract covering temporary-session ownership/expiry, authorization state, scan job ID/stages/status, candidate fields/confidence, currency/cycle normalization, retry/error codes, selected-candidate import, account linking and owned-session authorization. The shared target behavior/data contract and audited client gaps are in [api-mobile-contract.md](api-mobile-contract.md); transport names/endpoints must be agreed with the separate backend. Import all explicitly selected valid records without a paid-count threshold or silent dropping; operational errors must be explicit.

Known prototype gaps: manual-entry continuation currently shares the account/plan route; results currently support a USD/monthly fictional dataset; Ready derives success from selections rather than a persisted import response. Implement authenticated manual routing, real candidate/account state and actual save success before release. Screen design remains approved.

Validate success, zero results, denied OAuth, interrupted scan, retry, zero/all selections, back navigation, authentication cancellation/failure, save failure, duplicate prevention, mixed currencies, missing dates, more-than-25-record imports, additional inboxes, repeated free sync, Reduced Motion, keyboard/focus and native small-screen/large-text layouts. Production must never infer completion from a timer.


### Trial-aware scan results — 30 October 2026

Receipt result rows support Free trial, Trial ends date and post-trial price. Current recurring-spend estimates exclude free trials; imminent expected post-trial charges are included only when auto-renew tracking applies. Preserve exact source dates and review before saving. See [product-screens.md#tracked-trials](product-screens.md#tracked-trials).

<a id="home"></a>

## Home family

Canonical contract for Home, Home loading, Home empty, Home quiet, Spending breakdown and This month. Use the single Final routes `#home`, `#home-loading`, `#home-empty`, `#home-quiet`, `#spending-breakdown`, `#this-month` as visual references. [Trials](product-screens.md#tracked-trials) extend all relevant rows and amounts.

### Entry and data states

A valid app session enters Home. New users who saved scanned subscriptions see their saved records; users with no saved records see Empty Home. There is no separate first-visit or money dashboard. Legacy preview links `#home-first-visit` / `#home-money` redirect to Home.

- Initial request pending with no usable cache → Home loading.
- Successful empty response → Home empty.
- Saved subscriptions → Home; no events in the upcoming window → quiet state while retaining useful spending information.
- Background refresh retains usable content. Error exits loading and offers retry; it does not imply an empty account. Never infer completion from a timer.

Home loading matches the actual renewal card, two stats, monthly summary, platform rows, forecast and upcoming rows with charcoal placeholders. Subtle 1.8-second shimmer, static with Reduced Motion, one accessible loading announcement, decorative shapes hidden. Do not display invented money/service data. Home header Add and tabs stay available.

### Section order and navigation

1. **Compact next-event card**: nearest renewal or trial end, logo, name, date and amount/context. Tap → subscription Detail. No inline Subscription actions, Keep it / Worth it / cancel controls or rotating recommendation. A tracking assumption does not confirm a payment.
2. **Tracking / Upcoming · 7 days stats**: live tracking count and eligible upcoming-event count from the same records. Exclude Cancelled/Expired from future charges and ended non-renewing trials from live tracking. Tracking is not the count of the List Active filter group.
3. **This month**: Still expected this month amount prominent; remaining scheduled-charge count and whole-month expected total secondary. An auto-renew-Off trial ending is an event, not a charge. Tap → This month.
4. **Top spending**: top three paid recurring platforms by monthly-equivalent spend; Others only when more than three exist, with platform count. Logo/name, amount, percentage and compact bars. Same-platform plans aggregate. Free trials appear separately with end date and then-price, excluded from current paid-plan percentages. View all / Others → Spending breakdown; platform row → that platform's subscriptions.
5. **Coming up · 6 months**: full-month expected charges, currency-separated, based on scheduled occurrences. Include the first expected post-trial charge only when auto-renew tracking applies; never count it twice.
6. **Upcoming subscriptions**: chronological events in the window, labelled Renews / Trial ends, tap → Detail. No events → clear quiet copy.

No broad financial recommendation or card action rotation is part of this finalized Home. Those earlier ideas are superseded. Currency is never converted or silently combined.

### Time and money semantics

Production uses user-local calendar dates. The common upcoming window is today through today + 7 calendar days, inclusive; “Renewing soon” excludes today while Due today covers it. Home's upcoming count includes both renewal and trial-ending events.

- Current monthly-equivalent spend: monthly price; quarterly / 3; yearly / 12; weekly × 52 / 12. Exclude active free trials and ended/cancelled/expired records.
- Expected this month: sum actual scheduled charge occurrences in the selected/current month, not normalized cost. Still expected is the eligible subset from today onward.
- Forecast: scheduled occurrences, no paid inference. Missing dates cannot create scheduled charges.
- Confirmed payments: successful-payment Gmail receipt records, never synthesized from dates; legacy user-confirmed records retain their original provenance.

See [api-mobile-contract.md](api-mobile-contract.md) for snapshots, precision and count consistency. Backend supplies stable IDs and normalized platform identity. Recompute relevant snapshots after mutation, import, timezone/date changes or trial transitions.

### Spending breakdown

All paid platforms sorted by monthly-equivalent spend within each currency. Explain normalization. Platform tap opens Platform subscriptions including all matching account plans; back restores the originating view. Free trials are a separate clearly labelled section with post-trial price, not part of paid percentage bars. A single platform / fewer than three platforms does not create dummy Others.

### This month

Expected total and Still upcoming totals, grouped by currency. Upcoming first (today inclusive), Earlier this month below, rows ordered by event date. Trial-end and renewal rows have their own labels; no inferred Paid/Unpaid. Each row opens Detail. Show concise empty-group copy. Date/amount confidence stays visible where relevant.

Grouped rows have 14px horizontal inset and 13px vertical padding including the last row. Content can scroll; header/back and safe-area clearance follow the shared layout. Subscriptions without a date are excluded with explanatory copy.

### Mobile/API boundary

Approved visual references do not prove native integration. The HTML uses fixed-date fictional records; its nearest-event helper inspects a limited fixture horizon. Production must return the actual nearest eligible event, even outside that horizon. The Home quiet fixture is an inspection state, not a second independent record set.

Implement pending/data/empty/error states, usable-cache refresh, server-authoritative events, currency-separated totals and mutation invalidation. Do not hard-code fixture counts, dates, percentages or sample account data. See [api-mobile-contract.md](api-mobile-contract.md).

<a id="calendar"></a>

## Calendar

Includes approved refinements through 30 October 2026. Canonical visual routes: single Final `#calendar` and companion `#calendar-day`. Native implementation uses `react-native-calendars` with theme, custom day rendering and immutable marks; the HTML is a design emulation, not an installed native dependency.

### Overview layout

No inner scrolling at the standard phone size. Calendar heading / +, month controls, selected-month expected total and event count, weekday/date grid, legend, one compact nearest-event card, fixed five-tab bar. No inline day list or upcoming list on this overview. Respect safe areas; native small screens/larger text need adaptive sizing without clipping essential controls.

Previous/next arrows navigate months. The month heading opens the themed month/year picker; explicit Show month commits it. Today returns to the current local month/date. Browser preview range is 1900–2100; native range must be coordinated with backend supported schedule dates. Native swiping can supplement explicit month controls.

### Dates, events and totals

Month results use the same underlying subscriptions and recurrence rules as Home/This month. Expected total means scheduled charges, grouped by currency, never payments already made. Missing dates are excluded. A trial ending with auto-renew tracking Off contributes an event but no expected charge. The count is an event count, not necessarily a payment count.

- Due today: coral `#F29B8F`.
- Upcoming renewal: amber `#E8BE78`.
- Trial ending: blue `#9EBCE0` (today urgency can take precedence in the marker).
- Today: mint outline, distinct from selected-date treatment.
- Past events: muted; passing the date does not prove payment or expiry.

Labels accompany colors. Trial-only dates say trial; mixed dates use a general due/event count. Event rows distinguish trial ending from renewal. The legend must match those marks. The shared Expected this month info disclosure explains projected charges, missing dates and separate currencies.

One bottom card shows the nearest eligible event in the viewed month. Heading is Due today, Trial ends today, Trial ending or Next renewal. No future event in that month → All clear. Tap the card → that subscription's Detail by stable ID.

### Date-tap routing

| Date has | Action |
| --- | --- |
| Zero events | Open existing Add sheet directly over Calendar; no empty day screen |
| One event | Open its subscription Detail |
| Multiple events | Open Calendar day list; each row → its own Detail |

Closing Add sheet preserves viewed month/selected date. Back from day list/Detail preserves calendar context. Date selection alone does not create a subscription. No automatic date prefill is promised by the current design; if added later it must be an explicit draft value, not a saved record.

Calendar day lists the selected date's events, plan/cycle, logos, amounts/currencies and trial/renewal labels. It is a separate scrollable route, not an expansion inside the overview. An empty direct/deep-linked day state may show fallback copy/Add, but ordinary zero-event taps use the sheet.

### Integration

See [api-mobile-contract.md](api-mobile-contract.md): request a month and timezone, return a coherent event snapshot, selected-month totals/count, stable subscription/event IDs, event type and expected-charge flag. Preserve recurrence anchor and date-source confidence; month navigation must not refetch raw mail. Reject stale month responses when the user moves quickly.

Production uses local calendar dates, not the preview's fixed 27 October 2026 reference date. Month-end projections clamp from the original anchor; weekly schedules use seven calendar days. Cancellation/deletion removes future charge events and invalidates affected month/Home snapshots. Trial/payment semantics are in [product-screens.md#tracked-trials](product-screens.md#tracked-trials).

Loading, empty month, request error/retry, midnight/timezone change, mixed currencies, multiple plans on one date, trial-only/mixed days, Today, back preservation and accessibility need native/API validation. Browser visual approval does not complete the real integration.

<a id="listing"></a>

## Subscription Listing

The user finalized the complete Listing section on 30 October 2026. This is the canonical mobile/backend design contract. The single Final HTML reference is `prototypes/renewless-studio/dist/`, route `#list`; named List status routes are inspection presets, not separate production pages.

### Screen and layout

- Subscriptions heading; top-right + opens the three-option Add sheet.
- Search occupies the full content width; match platform/service name, ignoring case and surrounding whitespace.
- A right-aligned **Status filters** button follows Search. A small numeric badge shows how many status groups are selected.
- No Sort by control, external selected-status chips, external Clear all, category/source/currency/price filters or horizontal status strip.
- Below the tools show matching subscription count, then grouped rows. Production uses actual data; the preview's fixed date is not production copy.
- Default order: nearest next event first (renewal or trial end), missing dates last, stable name/ID tie-break. Never compare money across currencies to sort.

### Row content and navigation

Each row shows the respective catalog logo, platform name, one semantic status, relative timing and date, amount/currency, and billing cycle. A free trial says Trial ends and Price after trial / After trial. Use explicit currency code where a symbol would be ambiguous. Platform logos and identity follow [product-specification.md#platform-catalog](product-specification.md#platform-catalog); unknown/failed assets get an accessible neutral fallback.

Predicted dates show **Estimated renewal date** as separate confidence metadata. Do not call a user-entered or exact receipt date estimated. Do not show source email or an inferred last-paid amount on List.

Tap a dated row → that subscription's Detail by stable subscription ID. A Needs date row opens its prefilled Edit form. A Trial ended row opens Detail even without a next event. Multiple subscriptions for one platform remain distinct rows; never select the first matching display name. Preserve query, selected statuses, result position and scroll when returning.

Cancelled and confirmed Expired records are available through their status filters and All; they are not restricted to History. History remains a separate view of those same records, not a separate source of truth.

### Status filters modal

The button opens a centered dialog inside the phone viewport. Graphite `#25282C`, subtle neutral border/shadow, lightly dimmed background with 2px blur. Keep at least 32px vertical clearance. Header and Done remain visible; the options area may scroll on constrained devices. It is an interactive dialog, not an informational tooltip.

| Filter group | Display rules | Color |
| --- | --- | --- |
| Active | Live record without another contextual status | `#B9E58C` |
| On trial | On trial, Trial ending soon, Trial ends today | `#9EBCE0` |
| Trial ended | Trial ended with auto-renew tracking Off | `#9DA4AB` |
| Renewing soon | Renewal 1–7 local calendar days away | `#E8BE78` |
| Due today | Renewal today | `#F29B8F` |
| Needs date | No usable next event date, excluding Trial ended | `#9EBCE0` |
| Cancelled | Explicit cancellation recorded | `#9DA4AB` |
| Expired | Access confirmed ended; not inferred from a past estimate | `#FF8A8A` |

Every option has a rounded-square checkbox, label and count, including zero-count options. Counts describe all account records before search or status filtering. Selecting zero-count options is allowed and produces an honest no-results state. Each record belongs to one filter group; the group counts sum to the All count.

Selections combine with **OR**. Search combines with the selected set using **AND**. Empty selection means all statuses; there is no separate All checkbox. Check/uncheck updates results and matching-result count immediately. **Done** closes; there is no Apply action. **Clear all**, inside the modal only, resets status selection while preserving the query.

Outside tap, Close and Escape dismiss without reverting selections. Return focus to Status filters. Trap keyboard focus in the open dialog, mark the underlying phone inert, expose expanded state and label the dialog/checkboxes. Retain text labels so color is not the only cue. Native implementation must preserve the same semantics with screen-reader and larger-text validation.

### Empty, loading and failure

- Successful empty account: No subscriptions yet, explanatory copy, small sad Loop and one compact **+ Add manually** action → Add form.
- Search/filter zero matches: retain Search and Status filters; No subscriptions found, search/filter guidance, the same mascot and compact Add manually action. Do not add Connect Gmail here.
- Mascot circle 110px; SVG box 130px including intrinsic transparent margins. Decorative and hidden from screen readers.
- Native initial fetch: distinguish pending from confirmed empty. A failed request shows retry/error and preserves usable data; never present failure as zero subscriptions. Only Home's skeleton has a separately finalized loading preview; reuse consistent loading treatment for the list during native implementation.

### Backend/mobile requirements

See [api-mobile-contract.md](api-mobile-contract.md). The list operation must return stable IDs, catalog identity, money/cycle, next event/type, computed filter group and display status, date confidence, and total status counts. Filtering may happen server-side or over a complete cached collection; client filtering over only one server page must not claim global results. Pagination totals, counts and snapshots must be coherent.

Server and client share status/date semantics from [product-screens.md#tracked-trials](product-screens.md#tracked-trials) and [design-system.md#theme](design-system.md#theme). Preview UI uses hyphenated group keys; the proposed API mapping is documented, not silently equated to the legacy `upcoming/in_progress/expired` enum.

### Validation / implementation boundary

Verified in the browser: multiple selection, immediate matching count, chip-free exterior, Clear all, search AND filters, Escape/focus return, empty results and the centered modal. Model tests cover OR/AND and empty-selection semantics. All List variants render one Final preview.

The HTML uses in-memory fixtures and a fixed reference date. It does not implement persistent accounts, pagination, production status derivation or live API filtering. Native runtime and backend integration remain separate work. There is no unresolved Listing design approval.

<a id="subscription-entry"></a>

## Add sheet, Add/Edit, Detail and reminders

Add sheet, Add form and Edit base designs were approved as single Final views on 26 October 2026. Trial/payment extensions were requested on 30 October and follow [product-screens.md#tracked-trials](product-screens.md#tracked-trials). Detail variants, Reminder/Track again sheets, Platform subscriptions and Delete confirm were separately approved and locked 31 October 2026. The full Add/Edit trial extension was also accepted with whole-prototype final approval on 31 October 2026.

### Add sheet

Side-edge-to-side-edge bottom sheet with internal padding, handle, top-right Close and exactly three choices:

1. **Add with AI** — one free chat for text, voice, images and PDFs.
2. **Add manually** — Free Add form.
3. **Connect Gmail** — all authorized scans/imports, updates and extra inboxes are free in v1.

No separate Voice option, Screenshot option, iCloud option or bottom Close button. Close restores the originating screen/context. Header + on Home, List and Calendar opens this sheet; an empty Calendar date opens it directly. The compact manual action in List empty results goes directly to Add form.

### Add / Edit form

Field order: Platform or service; Amount/Currency together; Billing cycle; Category; optional Trial days; Start date; Next renewal when not on trial; Notes. All fields are single full-width rows except Amount/Currency. Notes are visible, not hidden in More details or a separate section. No platform-logo shortcut strip.

- Service: text-only catalog suggestions while typing, up to four matches. Pick fills name/category; never price or dates. Unknown genuine names remain allowed and create pending catalog candidates. Keep keyboard arrows/Enter/Escape and accessible combobox semantics.
- Amount: required positive valid amount; show Price after trial when trial is enabled. Currency separate from shared catalog; locale/last-used default only when available. Preview USD default is a fixture. Client currently allows two decimals for its supported currencies; backend must agree supported-currency precision and validation.
- Cycle: Weekly, Monthly, Quarterly, Yearly. No arbitrary custom billing cycle. Custom trial duration is a different concept.
- Category: required supported category or permitted free text; known catalog category prefills but remains editable. No subcategory.
- Start date: optional without a trial; required for a trial. Do not fabricate start dates.
- Next renewal: explicit required date for a non-trial manual save. Imported uncertain/undated records may remain Needs date, then open Edit to supply a date. Do not silently fill a normal manual date from start + cycle; recurrence projects from a saved, explicit anchor.
- Trial: No trial / 3 / 7 / 14 / 30 days / Custom. End date, conditional validation, auto-renew tracking and post-trial price follow the canonical trial contract.
- Notes: optional, 500-character preview limit; agree matching server validation. Keep notes on Detail.

New forms start empty or use legitimate user defaults; Edit preloads saved values. Errors appear below the relevant field; focus the first invalid input. Preserve source, creator/inbox identity, platform ID, trial source/confidence and unaffected fields through edits. A change to amount/name/category must not silently change dates or start paid confirmation.

Add subscription / Save changes stays pinned outside scrolling form content, with keyboard/safe-area handling. Pending requests prevent duplicate submits; stay on form with user data intact on failure; navigate only after confirmed save. Edit and create use one reusable form/component set.

### Detail — final and locked, 31 October 2026

Top Back and Delete icon; no +. Identity/amount card includes logo, platform, category/plan, currency, cycle and contextual status. Billing section includes next event (Trial ends or Next renewal), date confidence, start date and Reminder. Trial tracking and Gmail receipt history use the shared contract. No manual payment confirmation/upload entry. Notes remain visible with Add/Edit note action.

Detail refinement approved and locked 31 October 2026: compact identity/price card adds next-event label and relative timing beside full date; trial/cancelled/expired/undated states use their own event labels without assuming payment. Billing contains cycle/start/trial end where applicable, auto-renew tracking and existing Reminder action; tracked auto-renew is not a provider setting. Source identity retains scanned inbox vs original creator email, plus real connector last-success/paused/reconnect/unavailable context where known. No synthetic successful sync from billing state or a timer.

A compact Payment history row opens Payments constrained by stable subscription ID, with the last matched Gmail receipt date/amount or neutral no-receipt copy. Back returns to the originating Detail variant; default Profile → Payments remains all-account history. Its period summary/chart/search all use the same subscription scope when entered from Detail. Separate receipt-inbox association never changes a Manual/AI subscription's creation provenance.

Verified Manage on platform link opens provider account management externally (no automatic cancellation/payment). Preview allowlist: Netflix account and Spotify manage-plan URLs; unknown/unverified platform has no generated URL. References: [Netflix](https://help.netflix.com/en/node/407), [Spotify](https://support.spotify.com/by-en/article/your-plan-details/). Notes and More on platform stay compact; related subscriptions open the existing separate screen. Top Delete and pinned Edit/cancellation remain. No inferred Paid or manual receipt-confirmation actions. Cancelled Detail has the separately authorized Track again flow below.


Source/email section:

- Gmail: originating connected inbox email, labelled Scanned inbox.
- Manual/AI/voice: app-account email captured on creation, labelled Added under; never imply this is the provider's verified account email.
- Preserve original provenance when a manual record is later matched to Gmail. Supplemental inbox evidence may be shown separately.

**More on [platform]** opens a separate Platform subscriptions route, not inline content. From Detail show other owned records on the same canonical platform ID, excluding the current ID. From spending show all matching owned plans. Each row preserves its own ID, plan, source/email, amount/cycle, trial/renewal dates. Back returns to its actual origin.

**Edit** and **I cancelled this** stay pinned at the bottom for active tracking. Cancelled Detail instead has exactly one pinned **Track again** button; no Edit or Cancellation recorded footer. Cancellation records status/access-until (when known), never cancels with the provider. Stop pending charge/trial reminders and future charge projections. Keep a Renewless-only disclaimer. Delete requires explicit confirmation, removes the tracked record and pending jobs, preserves sent/payment history under the agreed retention policy. Neither action labels a payment successful.

**View subscription ↗** is available only for a verified official management destination, with provider-aware routing. See [product-specification.md#platform-catalog](product-specification.md#platform-catalog). Missing/unknown links stay absent. Returning from the provider does not automatically change status.

Subscription-card entry/return motion uses stable ID, preserves origin scroll/filter state, and has deep-link/Reduced Motion fallback. See [design-system.md#motion-and-loop](design-system.md#motion-and-loop).

### Reminder sheet

Detail Reminder opens one bottom sheet. Radio semantics with the approved 20px rounded-square visual controls; exactly one schedule:

- Off.
- Once: 1, 2, 3, 5, 7, 10, 20 days before the relevant event.
- Every day for the last 3 days: eligible future sends on days 3, 2, 1 before the event.
- Custom whole-number days, 1 through remaining local calendar days.

Hide presets beyond the remaining days. Daily can continue for one/two remaining eligible days; never send elapsed offsets retroactively. Today/past event has no advance schedule, so show Off/date guidance. Closing discards unsaved choices. Save updates that subscription's preference and atomically replaces future jobs. Off/cancelled/trial-ended-off records do not send.

Default represented in the current preview: once 3 days before when enough time remains; otherwise Off. This replaces the older cycle-specific multi-send and automatic renewal-morning plans. Persist explicit preferences across time passing; the worker skips elapsed offsets instead of inventing new jobs. The HTML preference display is not a production scheduler.

Trial reminders target trial end; renewal reminders target renewal. Date edits, timezone changes and lifecycle transitions replace future jobs without duplicating already-sent Alerts. See [api-mobile-contract.md](api-mobile-contract.md) for event identity/versioning and [product-screens.md#tracked-trials](product-screens.md#tracked-trials) for payment semantics.

### Shared dropdowns

All single selects use `dist/select.js`: labelled accessible combobox, graphite `#25282C` listbox, mint selected text/tick, white 18px chevron inset 14px. Open menu matches trigger left edge/width with 6px gap, accounts for phone border/scaling and flips above when needed. Support arrow keys, Home/End, type-ahead, Enter/Space, Escape, Tab and outside dismissal. Native form values/change listeners remain backed by a hidden select in HTML; native mobile implementation must match semantics, not copy web DOM structure.

The status-filter modal is a multi-select dialog and platform suggestions are editable autocomplete; neither is a single-select menu. List no longer exposes Sort by.

### Integration boundary

The preview does not persist account-owned records, run AI/Gmail extraction, verify payments or schedule pushes. API validation, required field policy, ownership, idempotent create/edit, schedule versions, error mapping, concurrent edits and native keyboard/accessibility must be implemented against [api-mobile-contract.md](api-mobile-contract.md). Prototype inspection routes and source fixtures are not evidence of server coverage.

<a id="tracked-trials"></a>

### Cancelled Detail: Track again — final and locked, 31 October 2026

Exactly one pinned bottom action, Track again. Keep Cancelled status/access-until in the card until an explicit successful resume. Tap opens a graphite bottom sheet with platform heading, amount/currency/cycle, next renewal date and Reminder. Amount defaults to last tracked amount; currency/cycle retain the record. Date defaults only when today/future, otherwise blank; require a valid today/future date and positive amount. Hide the entire Reminder label/dropdown when the date is empty, invalid, past or today (no valid advance timing); save Off internally. For a future date, show the shared dropdown with Off plus only the 1/3/5/7-day options that fit. When changing dates, preserve a selected timing only if still valid; otherwise reset Off and hide the field when appropriate. Use shared themed single-select. For custom timing, the existing Detail Reminder sheet remains available after resume. Errors stay beneath fields and focus first invalid input. Close/outside/Escape cancels without mutations; inert background, trap/restore focus.

Resume tracking explicitly saves the same owned subscription ID with reviewed amount/date, active tracking and the chosen reminder; keeps creator/inbox/platform identity and notes. Preserve prior cancellation/trial metadata for audit, but clear active cancellation/access-until and old trial fields so an old trial cannot override the new renewal date. Retain historical Gmail receipts/payments and sent Alerts; do not create a payment, provider reactivation or new subscription. Replace pending reminder jobs with a new schedule version, respecting account permission/gates. Detail returns to its regular active tracking state; matching History/List results derive from the same record. Display “Tracking resumed in Renewless.” Provider management stays a separate verified external link. Backend success must precede the production state change; HTML save is in-memory only. The locked Add/Edit base is unchanged.

## Tracked trials and payment confirmation

Agreed product behavior, 30 October 2026. This contract extends the approved screen specifications and supersedes earlier renewal-only assumptions. It applies to subscriptions tracked by the user; own-app subscription trials are deferred Phase 2 drafts in billing.md#revenuecat.

### Trial input and calculation

- Add/Edit has optional Trial days: No trial, 3, 7, 14, 30 days, Custom (1–365 whole days).
- Field order remains single-column: Trial days → Custom days when selected → Start date → compact trial-end summary → auto-renew tracking switch → Notes. Only Amount/Currency share a row. Footer stays pinned. This approved extension preserves the base.
- Existing subscription Start date is the trial start date. Required only when a trial is selected; inline error: “Select a start date to calculate your trial end date.”
- Calculate trial end as Start date plus trial days using date-only arithmetic in the user's local calendar, not elapsed 24-hour timestamps. Show the calculated end date. Start/date edits recalculate immediately. Display the compact themed readout below Start date with a 10px gap from the input. Custom duration accepts 1–365 whole days with inline errors; correcting a valid field clears its error. Auto-renew Off copy explicitly says no renewals are projected.
- During trial entry, hide the duplicate Next renewal input and label Amount “Price after trial”. Currency and billing cycle describe the paid plan after the trial. Removing the trial restores the previous non-trial Next renewal value and requires it before save; a calculated hidden date must not silently replace that value.
- Renews automatically after trial defaults On. This is a user-controlled tracking assumption, not a provider setting or proof of payment. Explain that tracking does not change the service settings.
- Gmail/AI can supply an exact trial-end date. Preserve that date and its source rather than recalculating it from an inferred duration. Editing the start or duration explicitly changes the source to calculated; unrelated edits preserve the exact date. Source data without sufficient dates must be reviewed, never guessed.

### Lifecycle and events

| Condition | Display / schedule |
| --- | --- |
| Before trial end | On trial; Trial ending soon within seven days; Trial ends today on the end date |
| End passed, auto-renew tracking On | Tracked subscription remains active and recurring schedule projects from the trial-end anchor; contextual renewal statuses may become Due today / Renewing soon |
| End passed, auto-renew tracking Off | Trial ended; no recurring charges projected |
| Cancelled / deleted | Stop pending reminders and future projections; preserve already-sent notification and confirmed-payment history according to retention policy |

The end-date event is `trial-end`, not a duplicate renewal. When auto-renew is On, its expected amount is the post-trial price; subsequent renewals begin one billing interval later. With auto-renew Off, display the trial-end event without adding money to expected-charge totals. Monthly/quarterly/yearly schedules clamp month-end days from the original anchor; weekly means seven calendar days. Trial end passing never creates a paid record.

Use user-local today in production. The design prototype intentionally uses its fixed 27 October 2026 reference date. Status is recomputed when viewing/resuming the app and when the date changes; an inactive app must not be required to advance the backend schedule.

### Screen contract

| Screen | Trial behavior |
| --- | --- |
| Add / Edit | Duration, conditional start-date validation, live calculated end, post-trial price, auto-renew tracking switch; preserve fields on edit |
| Detail | Contextual trial badge, trial end/start, price after trial, auto-renew tracking, event-aware reminder sheet; compact subscription-specific Gmail payment history row |
| List | On trial and Trial ended choices in the centered Status filters modal, with global counts; no Sort by or external selected chips; contextual trial labels and end date; select records by subscription ID, not platform name |
| Home | Nearest renewal or trial-ending event; Upcoming · 7 days includes both; tracking count excludes ended non-renewing trials |
| This month | Date-ordered trial and renewal events; trial ending with auto-renew off has no scheduled charge; expected totals are currency-separated |
| Top spending / Spending breakdown | Active free trials shown separately with “then [price]/[cycle]”; exclude free-trial prices from current recurring spend and percentages |
| Forecast | First expected post-trial charge on end date when tracking auto-renew; subsequent cycle projections; no duplicate charge |
| Calendar / Calendar day | Blue trial-end marker and labelled rows; mixed dates show event count. Zero events opens Add sheet, one opens Detail, multiple opens day list |
| Platform subscriptions | Each plan has its own trial/cycle/date; include all matching platform records when entered from spending |
| Gmail / AI review | Trial end, post-trial price, confidence and source shown for review; explicit exact dates take precedence |
| Onboarding review | Free-trial rows say Trial ends and then-price; monthly-spend summary excludes free-trial price, upcoming total includes a known expected charge |
| Reminder sheet | Event-specific “days until trial ends” copy, Off, last-three-days daily, available one-time presets, custom days. Skip already-past send times; daily continues for remaining eligible days |
| Push / Alerts | Event-specific trial-ending vs renewal copy; deep-link to the same subscription. Alerts only lists already-sent reminders |
| Widgets | Same nearest-event schedule and event labels as Home |
| Payments | Only explicit confirmed payments, grouped by currency; future schedules remain in This month |

### Gmail payment receipts — revised 31 October 2026

New tracked-payment records are produced automatically by authorized Gmail scan/sync when a successful-payment receipt matches the owned subscription and billing cycle. No user Confirm payment / Mark paid / upload-receipt sheet, and no per-payment scan prompt on Detail. An upcoming invoice, payment request, failed-payment notice, unmatched amount/currency, or ambiguous same-platform match must not create a payment. Missing receipt means no matching receipt found, never Unpaid. Ambiguity is held for backend reconciliation/review; never silently match by platform name alone.

Store exact paid amount/currency/date, source Gmail receipt, originating connector/inbox, message/evidence identity, stable subscription ID and billing-cycle key. Deduplicate message identity and subscription/cycle atomically; repeat scans update the same evidence-backed record rather than double counting. Recording a receipt never advances the schedule a second time. Keep legacy user-confirmed records with truthful original provenance if any exist; no new UI creates them. Inbox disconnection cannot erase retained historical payment evidence. Gmail scan/sync is free in v1 and still requires valid consent, owned-connector access and evidence matching; it does not establish bank verification.

### Prototype boundary and validation

`dist/trial.js` owns the shared browser-only trial model, event calculations and form wiring; its manual payment sheet was removed. In-memory receipt records remain separate from projected events. No real push, mailbox search or AI receipt verification is performed; Detail/Payments inspect scoped fictional Gmail receipts. Production receipt creation belongs to the backend sync worker. The screen-library trial review / Alerts trial entries are fixtures, not extracted or delivered data.

The preview includes a Spotify free-trial fixture plus Detail trial, Detail trial ended, Trial review and AI chat trial inspection routes. Model tests cover leap dates, year boundaries, anchor preservation, exact-source priority, lifecycle transitions and no duplicate trial-end charges. Native accessibility, date pickers, push workers, Gmail matching, AI extraction, persistence and authorization remain integration work.

<a id="alerts"></a>

## Alerts and Reminder settings — Final, approved 30 October 2026

Explicitly finalized by the user on 30 October 2026; all five routes and the bulk-apply confirmation are LOCKED. Routes: `#alerts`, `#alerts-trial`, `#alerts-empty`, `#alerts-notifications-off`, `#reminder-settings`. One single Final preview. Existing finalized sections retain their locks.

Alerts: heading with top-right graphite gear → separate Reminder settings screen; concise introduction; sent reminders grouped Today / Yesterday / Earlier, newest first. Row has respective logo, platform, meaningful event-date/amount wording, sent timestamp and chevron. Trial wording uses the shared blue semantic. Compact rows: approximately 72px minimum height, 10px vertical / 12px horizontal padding, 34px logo surface, 3px text gaps; date groups separated by 13px with 7px heading-to-card gap. Grow for larger text/long copy. No repetitive Sent label on every row. Tap resolves the owned subscription ID → Detail; unavailable/deleted record gives safe feedback. Trial-only inspection route uses the same component.

Only server-confirmed sent records appear; never use `fireAt < now` as delivery proof. Group sent dates in the user's local timezone and use event dates separately. An old notification's wording must not turn “tomorrow” into a misleading current claim. No future-reminder list, header +, per-row mascot or access-ending job reintroduced by these fixtures. Keep sent history when pushes are paused or subscriptions cancelled/deleted.

Blocked device notifications → compact Notifications are off banner / Open settings. App-level pause → Push reminders are paused / Manage reminders. Permission and app preference are separate; master On does not grant OS permission. Empty state: small calm neutral Loop using shared `mascotView` (108px circle, 113px SVG canvas, centered with flex), No alerts yet, explanation and compact Manage reminders.

Reminder settings: Back → originating Alerts state; no bottom tabs on this pushed screen. Scroll content as needed, pin Save settings above safe area. Draft controls:

| Control | Behavior |
| --- | --- |
| Push reminders | Master On/Off, preserving individual schedules and sent history; Off disables subordinate draft controls |
| Renewals / Trials ending | Separate category toggles, gated by master and device permission |
| Remind me | Shared dropdown: Off, daily last 3 days, 1/2/3/5/7/10/20 days before, Custom |
| Custom days | Whole 1–365; inline error below input and first-invalid focus |
| Reminder time | Required preferred local send time, initially 09:00; timezone explanatory text |
| Apply default timing to | New subscriptions only by default; Existing subscriptions too opens confirmation |
| Device notifications | Native permission state plus OS settings action; independent of saved app switches |

No quiet hours, sound picker or snooze in this iteration. Back discards unsaved draft; Save commits and returns to origin. Errors remain field-local. Native requests must show pending/retry and not claim success before persistence.

Existing-subscription confirmation: centered graphite/blur dialog; affected count; Keep custom reminders checked by default, including explicitly Off subscriptions. Uncheck only to explicitly overwrite custom timings. Exclude cancelled, expired, deleted and ended non-renewing trials. Go back/Close/outside/Escape makes no saved changes; trap focus, inert background, restore trigger on dismissal. Update reminders saves account settings plus chosen overrides atomically; dates that already passed must not generate late sends. Saved global Off/category gates never erase schedules/history. Individual Off must remain Off under new defaults.

Preview boundary: `dist/alerts.js` stores account preferences in memory; existing timing changes update the in-memory reminder map. No OS permission is queried/granted, no push/jobs/API persistence occurs, and Open settings shows phone guidance. New-subscription inheritance and production worker gates are documented API integration work; approved Add/Edit templates and their existing preview fallback are unchanged in this task. Do not infer new-record inheritance from this HTML settings save. Reset demo restores account defaults. Current fixtures use the app's fixed reference date.

Backend/mobile precedence and account/subscription preference fields: [API/mobile contract](api-mobile-contract.md#account-reminder-settings-and-delivery-gates). Implementation gaps do not reopen this design approval. Any further change to this family, including shared mascot/control changes affecting it, requires explicit scoped unlock.

<a id="profile"></a>

## Profile and Edit profile — Final, approved 30 October 2026

Locked routes: `#profile`, `#profile-incomplete`, `#profile-social`, `#edit-profile`, explicitly finalized by the user on 30 October 2026. The default/incomplete/social states share one Profile layout. Linked Connected inbox details and imported subscriptions are separately finalized/locked 31 October 2026. Change password is separately finalized/locked; its detailed contract is below.

Order: compact initials/name/login-email/provider header with one Edit icon; Connected inboxes; Your activity; Preferences & security; Help & legal; Logout and app version. No phone/DOB/gender summary card, duplicate Edit row, separate large confirmed-payments card, header + or forced profile-completion wall. Profile scrolls with bottom content padding sufficient to reveal legal/logout/version above the five-tab bar. Grouped icon rows remain compact and grow for long names/accessibility.

- Header uses saved account name/email; app sign-in provider is separate from Gmail connection identity. Initials fall back safely. Name/email wrap; email is never inferred from a receipt/inbox.
- No Renewless plan card, premium badge, live/25 counter, Upgrade, Manage plan or Restore purchases in v1. The old `#profile-pro` inspection route redirects to Profile; account identity, edit/security/legal and owned inboxes remain.
- Connected inbox row: Gmail mark, email, actual connection state Synced / Updates paused / Reconnect needed and last successful sync. Sync success comes from actual connection/job evidence, never a billing flag. Tap → Connected inbox details: email, read-only scope, last sync, imported-record count and contextual connection actions. Empty account shows No inbox connected, free Gmail discovery copy and one Connect action. First and additional inboxes → Gmail flow without a paid gate; each requires separate OAuth consent.
- Activity contains one History row and one Payments row. Payment secondary text uses explicit confirmed records per currency when present; otherwise a neutral history label. No estimated paid amount or combined currencies.
- Preferences/security: Reminder settings shortcut opens the existing locked Alerts-owned settings route; its approved Back to Alerts behavior stays unchanged. Change password only when account has password capability. Social-only account shows provider information; direct password route gives provider guidance. Linking/editing a provider identity is not a simple profile field.
- Help/support, Privacy Policy and Terms are separate rows; configured real destinations are required for release. Unsupported/unconfigured integrations show honest unavailable feedback. Logout requires explicit confirm/cancel and does not delete account data; cancel/outside/Escape preserves current view with focus restoration.
- Edit profile: Name required, login email read-only with verified-change explanation, optional Phone/DOB/Gender, shared dropdown and white/dark-native date indicator. Field-local errors; no future DOB; preserve entered data on failure. Save returns to originating Profile variant; Back discards unsaved draft. Optional data never blocks account access. Real phone format/verification policy must be agreed separately; phone is not silently treated as verified.
- Inbox disconnect requires explicit confirmation showing email and affected imported count. Stop sync/revoke stored connection per integration contract; remove only records originally imported by this inbox, preserve manual/AI-created records even if later matched to Gmail, and preserve sent/payment history. Do not identify removal scope by platform/name. Details after missing/disconnected connector show a safe unavailable state.

Preview implementation `dist/profile.js` is in memory and resets on reload/Reset demo. Profile edits are not identity API calls; disconnect only changes fixture records; logout is navigation and not server token revocation. Restore, store management, legal/support, OAuth and native permissions are not implemented here. Date validation uses the fixed 30 Oct 2026 review cutoff; native uses actual user-local today. Native logout must invalidate server/device state and purge account-sensitive caches.

<a id="change-password"></a>

## Change password — Final, approved 30 October 2026

`#change-password` is finalized and locked by explicit user approval on 30 October 2026, including validation/pending/error states and the social-only guard. Profile/Edit profile and all Auth screens remain locked. Password-account capability is required; social-only accounts see provider guidance and Back to Profile, with no password inputs or commit button.

Use compact graphite form, small shield, concise explanatory intro and three empty labelled fields: Current password, New password, Confirm new password. Each has its own 44px show/hide toggle with descriptive label/pressed state; no shared toggle exposing all fields. Use current-password/new-password autofill hints; never prefill, trim, log or persist secrets. Display the existing six-character preview guidance consistently with Auth; final server policy must be agreed before integration, and a policy change affecting locked Auth requires scoped unlock.

Client validation: required fields; new minimum six characters; new differs from current; matching confirmation. Errors appear directly beneath each field with associated description/invalid state and first-invalid focus. After submit, correction updates related errors including confirmation. Client validation cannot determine whether current password is correct; only the authenticated API can return that field error. Network/server errors are a separate retryable form message.

Update password is pinned above the safe area, outside scrolling content. Pending state says Updating…, disables duplicate submit/field changes and keeps Back available. Back returns to originating Profile and discards the local draft. Provider-only guard remains available for direct navigation. A successful production response clears secrets, shows success and returns to Profile; failed requests preserve the entered draft for retry while on-screen. Session revocation/reauth behavior must match the server contract, not be inferred from client navigation.

HTML currently validates fields and demonstrates pending → unavailable error after one second; it does not call an identity API or claim the password changed. Values exist only in the form DOM during the visit; no credentials are stored in profile/global state. Real password verification, update, rate limits, session policy and secure native autofill/keyboard behavior remain integration work. Tests cover empty/short/reused/mismatched passwords and valid client-side input only.

<a id="remaining-screen-contracts"></a>

## Other screens — current contracts and review status

### AI chat / voice / image product rules

Free in v1, one chat for text, voice and image. Gather required subscription fields and show a summary matching manual/trial data. Correct before creation in chat; summary → Add subscription → saved Detail/List, without an intermediate Add/Edit form. After creation, Detail → Edit is allowed. Do not guess missing amounts/dates; unknown optional values remain unset. Known platforms resolve through the catalog; genuine new names remain pending candidates.

<a id="ai-text-chat"></a>
#### Text conversation, composer and draft — LOCKED, approved 31 October 2026

`#ai-chat`, `#ai-chat-trial` and `#voice` reuse the same chat shell, header, composer, message renderer, thinking/retry handling and draft card. Ordinary/trial/voice routes are inspection presets rather than separate production conversations. Text/voice design and its ordinary/trial, pending, failed/retry and added states are finalized and locked. Attachment icon appearance is included; the [attachment extension](#ai-attachments) is separately approved; Add/Edit trial extension is now approved and locked; monetization is deferred to Phase 2. Attachment work must preserve the approved text/voice scope; changes outside that pending extension require explicit unlock. Show one Final frame with the studio lock badge. Preserve locked app surfaces/common components; no intermediate Add/Edit screen before creation.

- Header: shared `aiChatHeader` with a centered stroked SVG chevron inside the existing 44px Back control, Loop / Your subscription assistant and Renewless mark; no small text-glyph arrow. User bubbles align right with light mint background/dark text; Loop aligns left with graphite background/light text. Labels, readable line length, wrapping and comfortable compact padding distinguish speakers beyond color. Phone copy contains no testing/model-upload explanatory footer; the surrounding studio retains scripted-data/integration disclosure.
- Composer stays at the bottom above the safe area; conversation alone scrolls. Empty or whitespace-only text shows attachment and voice icons. Meaningful text replaces both with one Send arrow; spaces cannot submit. Draft text can be composed while a response/save is pending, with Send disabled. Textarea grows from one to four lines, then scrolls internally; keep caret/input usable. Preview uses Enter to send, Shift+Enter for newline, ignores composing IME Enter and limits text to 2,000 characters. Native keyboard/input insets, multiline and screen-reader behavior still need device validation.
- Thinking appears on Loop’s side with three staggered bouncing dots only while a response is pending. Reduced Motion uses static dots. Disable duplicate send and draft creation during pending work; never imply a successful response before it arrives. Response text is announced accessibly without rereading the entire conversation. New messages scroll into view when already near the bottom. If the user is reading older content, preserve position and show New message ↓; tap returns to latest. User-initiated send scrolls to the submitted message.
- One compact current draft card places catalog logo/name/readiness on the left and amount/currency + cycle on the right (After trial when applicable). Below, a two-column grid shows next renewal/trial end and populated category/start date; trial duration and auto-renew tracking appear when relevant. Populated notes show in a full-width wrapping row. Remove View details: all relevant fields are visible. Hide empty optional fields; missing required fields retain clear prompts. One Add subscription button remains at the bottom. Corrections update the same draft card rather than appending repeated large summaries. A new explicit subscription intent starts a new active draft; thread messages remain visible.
- Loop asks one missing required field at a time: service, positive paid/post-trial amount, currency, cycle, valid full renewal date, or trial start/end when required. Never infer missing money/currency or ambiguous dates. Optional category/start/notes on an ordinary plan do not block creation; use catalog category where confidently known. Trial start/duration edits recalculate local end and mark calculated provenance; unrelated changes preserve exact extracted end. Auto-renew tracking is separate from provider settings and payment confirmation.
- Failed send retains its bubble/text and any newer composer draft; show a compact Couldn’t send / Retry beside that message. Retry uses the same message intent, does not duplicate the bubble or lose the prepared draft. Resolve the failed send before sending another message. API failures must not be disguised as fabricated successful AI answers. Malformed dates/amounts keep the draft reviewable and Add disabled until resolved.
- Add subscription is disabled for incomplete/currently-updating/saving/already-added drafts or unresolved failed messages. Pending says Adding…. Successful save retains a stable subscription ID/provenance/current account email and opens its Detail. Returning to chat shows Added and View subscription rather than creating a duplicate. Corrections to an already-added plan route the user to its saved Detail/Edit; an explicit new subscription may start a separate draft. Failed save must keep draft and allow safe retry; server-backed failure behavior is an integration requirement, not a working API in this preview.

Preview boundary: `dist/ai-text-chat.js` stores fictional thread/drafts locally and recognizes limited example corrections/service names with deterministic parsing, a 1.5-second scripted thinking state, external Fail next send control and local Map creation. It does not call AI/API, authenticate or verify account ownership or persist accounts. Real thinking duration comes from actual request status, not a forced delay. No microphone permission, capture, transcription or upload occurs. The attachment icon opens the Image/PDF chooser described in [Attachment flow](#ai-attachments); microphone requires a hold; release sends the simulated audio and slide-left cancels. There is no intermediate Ready composer or direct-preview bypass, explicitly disclosed outside the phone. `#voice` seeds an audio bubble with the transcript internal. Playback is actual local audio, not a simulated progress timer; recording-state design is now previewable; real capture/permission/transcription integration remains deferred. Reset conversation affects only that preset; Reset demo clears all text sessions and ignores old pending callbacks. Backend must handle true extraction, ambiguity, multiple proposed records without silent drops, ownership, conflicts, request/save idempotency and limits; see [API/mobile contract](api-mobile-contract.md#ai-text-contract). Shared layout/motion: [Design system](design-system.md#ai-text-composition).

Voice bubbles show play/pause, seekable waveform and elapsed/total duration; the transcript is internal. Server-side raw audio is discarded after transcription; only a temporary local clip is available for current-conversation playback, cleared on closing/reset/logout before any persistent history. Do not persist raw audio as saved subscription data. This local playback lifetime is part of the approved Voice contract; native retention is not implemented. Production server copies of user-attached images go to vision extraction then are discarded; temporary local preview media is kept only in the current conversation and cleared on exit/reset/logout, never in persistent subscription/history data; no separate OCR-only add screen and no direct Apple Settings access. One image can propose multiple reviewable records. Provider/model version selection remains implementation configuration; the product rule is the extraction/review behavior, not a hard-coded model release.

<a id="ai-voice"></a>
#### Voice message and hold-to-record composer — LOCKED, approved 31 October 2026

Reuse `aiChatHeader`, `aiChatComposer`, message bubbles, thinking/retry and compact draft card for text, trial and Voice inspection. `dist/chat-voice.js` owns reusable `aiVoiceMessage` and audio lifecycle helpers; avoid a parallel Voice page implementation. The microphone and attachment icons follow the existing empty/text-to-Send rule. Typed corrections work in the same voice conversation.

- Sent voice bubble is right-aligned mint with no visible transcript. A 44px circular Play/Pause control, waveform with played/unplayed color, keyboard/touch seek control and elapsed/total mm:ss replace the text content. Audio state—not a countdown timer—drives progress, seek and completion. Only one clip plays at a time; pause on Back/route departure. Playback can continue while a scripted response redraws the conversation because player instances are independent of bubble markup. Failed/unavailable audio shows retryable unavailable feedback, never a pretend playing state.
- Hold the microphone to record; releasing sends one voice message directly, followed by the shared Thinking/response flow. Do not show recording Pause/Resume/Stop controls, a Ready preview, Discard/Send confirmation or the former external Preview voice draft bypass. Sent-message playback still has its own Play/Pause controls. The active bottom composer shows Recording, live elapsed time, animated waveform, held-mic visual and Slide left to cancel / Release to send guidance.
- During a hold, dragging left at least 72 CSS px in the prototype latches cancellation and changes the hint to Release to cancel. Release then discards the clip and restores the composer. Quick taps under 300ms send nothing and show hold guidance. Native gesture thresholds need device testing. Pointer cancellation, lost capture, window blur, leaving the screen or Escape cancels safely instead of sending. Keyboard Space/Enter hold and release provide the same behavior; screen-reader/native gesture affordances require validation. Disable starting a hold while response/save/failed-send resolution is pending. Block Add while a recording/send preparation is active.
- Keep gesture capture on the stable phone/container while the composer changes, preventing a lost finger/mouse hold when its original button is replaced. Exactly one release can submit; repeated events cannot duplicate a message. Failed sends keep the audio bubble and Retry using its same message identity. Voice never automatically creates the tracked subscription; Add subscription still requires explicit review.
- The browser hold is a visual/audio simulation without microphone access or permission prompts. Timer runs until release, including holds beyond the original roughly eight-second fixture; there is no eight-second automatic send. Released clips use a matching-duration prefix/repetition of fictional PCM speech. No recognition occurs: prepared example responses are independent of the user’s spoken audio. Production must obtain microphone consent before capturing; if consent interrupts the gesture, require a fresh hold after grant rather than recording/sending on a stale release. Real live waveform, upload/transcription, denied permission/no speech/device interruption and production duration limits remain integration work. Reduced Motion keeps a static waveform/dot while the timer/gesture still work. Attachment remains a separate review.

Fixture asset `assets/voice-subscription-preview.wav` is locally generated fictional speech (about 7.79s, displayed total 0:08), not a user recording. Its waveform derives from the actual clip. No audio leaves localhost. Reset disposes current-session players; Reset demo clears all players/chat presets. Text/voice UI is approved and locked 31 October 2026; native lifecycle, media retention and API guarantees remain separate implementation work; see [voice/API contract](api-mobile-contract.md#ai-text-contract) and [shared design](design-system.md#ai-text-composition).

### Gmail connection and sync product rules

Read-only OAuth, separate from sign-in. Can belong to a temporary pre-auth scan session or an authenticated account; validate ownership before linking/import. Initial 12-month scan/review/import, later scans/incremental updates and extra inboxes are free in v1. Authorization/connection failures preserve saved records and never become billing-driven pauses.

First scan → candidates, never automatic account saves. Current candidates checked; older/uncertain candidates reviewable and not silently imported. Confirm selected IDs idempotently. Zero candidates and interrupted/denied access are distinct states. Preserve uncertainty/confidence and exact dates; trial results show trial end and post-trial price.

Incremental sync can update confidently matched owned records without a fresh onboarding review. Respect user-corrected dates; retain original manual/AI provenance and supplemental inbox evidence. Deduplicate by provider message identity, including duplicate evidence across inboxes. Ambiguous same-platform records require review or skip; never guess/create a duplicate. Cancellation evidence updates recorded status/access-until and future schedules. Disconnect stops sync; confirm any removal of inbox-imported records; unrelated manual/AI records remain.

Query → rules → relevant model inputs only (sender, subject, date, trimmed body). No whole-inbox model access or retained full mail. Refresh credentials encrypted at rest with AES-256-GCM; key held in server environment, not MongoDB. Token/cursor management stays server-side. Target Gmail users.watch/Pub/Sub plus six-hour incremental fallback; unchanged historyId avoids model work, stale history falls back from lastSyncedAt. Watch/incremental fallback infrastructure is an implementation target, not verified server capability. Receipt recording uses the same ownership, dedupe and consent rules.

<a id="authenticated-gmail"></a>
### Authenticated Gmail scan and review — Final and locked, 31 October 2026

Routes `#gmail-scanning`, `#gmail-review`, `#trial-review`, `#gmail-nothing-found`, `#gmail-interrupted` share one authenticated flow. `Trial review` is a studio preset opening the trial sheet over Review, not an additional journey page. Explicitly approved and locked 31 October 2026, including the scan-complete happy state and trial/change/inbox sheets. No design exceptions remain in this family; backend/native integration remains pending. Onboarding and Profile Connected inbox stay locked. No onboarding step strip, repeated signup or paywall promotion is inserted here. Keep the selected inbox visible and commit pinned above the safe area; only the result content scrolls.

- **Scanning:** compact Gmail header/email switcher, shared scanning Loop in an unchanged 132px halo with smaller centered scanning artwork (0.78× / 103px SVG canvas); on completion, happy Loop retains the original 1.05× / 139px artwork size in the same halo. Use concise discovery copy and three stages: Finding subscription receipts, Matching your subscriptions, Checking renewals & trials. Review subscriptions stays disabled until all stages succeed. Production progress is job-driven; no arbitrary percentage or completion timer. Back returns to entry context; leaving the view ignores stale progress. No failure/empty debug buttons inside the phone.
- **Review:** compact selected count and separate per-currency monthly-equivalent totals for selected **new** plans, clearly including their price after trial. This is not today's charge, forecast or payment total. New subscriptions, Updates found and a collapsed Already tracked section are distinct. Each row has catalog logo/name, plan, price/currency/cycle, trial-end/renewal date and a themed rounded-square checkbox. New confidently classified candidates start selected; uncertain/older items and updates start unselected. Updates show old → new price and whether the saved date will be kept. Duplicates are informational and cannot be selected. Do not deduplicate by display name: two verified distinct plans on one platform may coexist; ambiguous identity requires resolution/skip before import.
- **Review details:** open a graphite bottom sheet over results. Amount and next renewal are editable for a regular new plan. Trial sheet shows post-trial amount/currency, required start date, discovered duration with shared dropdown, computed end date and Track renewals after trial checkbox; retain an exact receipt end date until the user changes the date/duration. Local-calendar calculation and no-Paid rules follow the tracked-trial contract. Field-local validation rejects impossible dates/nonpositive paid-plan prices. Keep these details stages the draft; closing discards unsaved sheet edits. A changed trial does not navigate through Add/Edit or create a record by itself.
- **Review changes:** show current saved values against receipt proposals. Keep these choices selects that update. Preserve original subscription ID, notes, creator/inbox provenance and unrelated fields. Saved/manual-corrected dates stay unchanged unless the user explicitly checks Replace my saved renewal date. Matching Gmail evidence is supplemental on Manual/AI records, not a new creation source. Background sync may still apply confidently matched, nonconflicting updates under the existing rules; this review is for selected discovery/proposed changes, not a new mandatory review of every background receipt.
- **Commit:** label reflects selected additions/updates; disable zero selection and duplicate submit. Save only selected candidate IDs with reviewed fields; pending does not imply success. Production validates scan/account ownership, record ownership/version and idempotency, returning actual outcomes with no silent drops. Success → List; saved candidate IDs become nonselectable on returning to the same review. Keep drafts/selections on retryable failure. A duplicate receipt never creates another subscription or payment.
- **No new results:** neutral shared Loop in a 140px halo, No new subscriptions found, concise explanation and saved-subscription reassurance. Try another inbox opens the account-owned inbox picker; Add manually → Add form. This includes a scan with no actionable additions/changes, even if already tracked receipts exist; it does not claim the account has no subscriptions.
- **Interrupted:** same recovery framing with sad Loop, Your scan was interrupted, saved-subscription reassurance, Try again and Choose another inbox. Never map denied/expired authorization or a failed request to no results. Production expired consent requires reconnection; a network retry must not spend another free scan allowance. The named preview is a generic interrupted state, not a working OAuth error handler.
- **Inbox picker:** only owned connectors; selected email/tick, option to connect another Gmail inbox, concise separate-consent/free-access information. An existing inbox selection starts/resumes its properly scoped job in production. New consent requires real OAuth and ownership validation; the HTML shows unavailable feedback, without claiming a connection. Existing locked Connected inbox states/navigation remain unchanged.

Sheets use blur/dim, inert phone content, labeled dialog, close/outside/Escape, focus trap/return, white date indicator and the shared themed select. Payment receipts are recorded by the Gmail worker in the background; there is no Confirm payment, upload proof or Mark paid step.

Preview boundary: `dist/gmail-review.js` uses fictional classified candidates, a three-stage timer and local Map saves; it does not scan mail, call AI, enforce server ownership/security rules or record actual payments. The fixture includes distinct Notion Team/Figma trial subscription IDs, a Netflix proposal and an already-tracked Spotify match. Production must supply verified classification/identity instead of relying on those names. OAuth, resumable jobs, API persistence, cancellation, partial/conflict/error responses and native notification scheduling remain implementation dependencies. Reset demo clears these drafts/import IDs. See [API contract](api-mobile-contract.md#authenticated-gmail-review) and [shared composition](design-system.md#authenticated-gmail-composition).


<a id="connected-inbox"></a>
### Connected inbox and imported subscriptions — final and locked, 31 October 2026

V1 free-access scope revised 31 October 2026: default `#connected-inbox` shows actual authorization/sync state (a synced fictional fixture in the studio). Inspection states: `#connected-inbox-reconnect`, `#connected-inbox-syncing`, `#connected-inbox-error`; `#inbox-subscriptions` stays separate. No Pro state or entitlement check determines access to sync or extra inboxes.

- Center the Gmail logo with email underneath. Contextual status uses text plus semantic tint: paused amber, synced mint, reconnect/failure coral, running blue. A failed latest attempt must not show a new successful timestamp.
- Facts: last successful sync (Not synced yet when absent); clickable imported count → this connector’s owned imported records; Mailbox access / Read-only with adjacent plain info icon.
- Reuse the shared information disclosure component/theme: explain mailbox-wide read authorization, filtering relevant receipts, possible AI processing, no send/edit/delete and disconnect review. Do not imply Gmail grants receipt-only access. Blur/dim and inert background, focus trap, Escape/close/outside dismissal. Scope framing inside this screen so the popup is not clipped by the scroll viewport; do not restyle locked tooltip screens.
- Authorized connection: show facts, imported records, Sync now and disconnect. Saved records stay available; no Upgrade or entitlement-related paused state.
- Sync operation: Sync now → disabled Syncing… during the job; suppress duplicate requests and temporarily disable disconnect in this preview. Completion/error must come from backend in production. Failure copy is separate and preserves records/last successful sync; Retry uses the same operation.
- Expired authorization: Reconnect Gmail takes priority, renews consent for this owned connector and preserves existing records. Reconnection does not require any purchase.
- Disconnect keeps explicit affected-count confirmation, original import ownership scope and manual/AI preservation. Helper copy: “You’ll review what gets removed before confirming.”
- Screen Back → originating Profile; imported list Back → originating Connected inbox state. Imported list shows originating email, count, respective logos, amount/currency, trial/renewal context and stable subscription IDs → Detail. Exclude unrelated manual/AI records. No imported records → shared neutral mascot and honest empty state. Deleted/missing connector/record → safe unavailable feedback.

The HTML preview scripts an unavailable sync failure after briefly showing pending; it never claims a real scan succeeded or changes lastSync. Reconnect displays unavailable integration feedback. Fixture state routes are explicit inspection examples, not real provider state. Imported list navigation and ownership filtering are functional in-memory. Backend/native OAuth, jobs, ownership checks and persistence remain integration work. Locked Profile, Alerts and other approved renderings are unchanged by this refinement.

<a id="history"></a>
### History — final and locked, 30 October 2026

Routes: History; History · empty. One Final version. Back → Profile. Compact heading/explanation, full-width Search, right Status filters button with active-filter count, matching count and newest lifecycle-change first. Shared subscription-row shell with List; List markup/behavior remains unchanged. History rows show the respective platform logo/name, gray Cancelled or red Expired with actual lifecycle date, access-until for cancellation when known, last tracked amount/currency/cycle and chevron. Last price is explicitly not a confirmed payment. Tap → same stable-ID Detail; Back returns to History, preserving search/filters. No inline cancellation/reactivation/payment actions, fake savings or activity feed.

Filters: same centered graphite/blur status-selection treatment as List. Right **Status filters** button with selected-status count; checkbox rows **All / Cancelled / Expired**, respective gray/red status text and global per-status counts. All clears selected statuses; no specific selection means all historical records. Cancelled and Expired can be selected together (OR); name query combines with status selection (AND). Selection updates matching results/count immediately; Done/Close/outside/Escape dismiss without reverting choices, matching List. No date/category dropdowns, Apply/Reset or external chips. Trap focus, inert background, return focus to trigger. Upper heading/explanation/search/filter/count spacing is compact. Search updates results without losing focus. Status filter and compact upper spacing explicitly reapproved and relocked 30 October 2026.

History · empty uses the reusable centered neutral Loop mascot (108px halo), “Nothing here yet”, explanation and compact View subscriptions → List. No matches uses sad Loop, “No matches found” and Clear search & filters. No header +, no forced Add/Gmail CTA for lifecycle history.

Only explicit Cancelled and confirmed Expired belong here. Renewal passing never proves expiry or payment. Expiry evidence: user confirms access ended, provider email explicitly confirms access ended, or a confirmed access-until date passed with no newer renewal evidence after reconciliation. Auto-renew disabled alone means Cancelled, with remaining access shown where known. Mere stale renewal / unknown access is not Expired. Preserve expiry evidence/source/date and stable owned ID. History/List must query the same records in production.

The HTML History inspection includes three scoped fictional historical records plus owned in-memory lifecycle changes; fixtures do not change approved List data/counts. Real API pagination, persistence, evidence reconciliation and loading/error adapters remain implementation work. History has no inline Track again action. The separately reviewed cancelled Detail supports tracking resume; History continues to query the same current lifecycle records.

<a id="payments"></a>
### Payments — final and relocked, 31 October 2026

Routes Payments / Payments · empty are single-view inspection states of one screen. Back → Profile. Compact heading and “Payment receipts found in Gmail.” Populated state: shared Year and Month dropdowns (available years, All months plus January–December). Default current local year if available, otherwise newest available year; All months. Apply period by actual paidDate, not billing/renewal date. A compact solid graphite summary shows selected-period confirmed totals separately per currency, confirmation count and scheduled-charge exclusion. Name Search filters the flat newest-first list/count, not the explicitly labeled period total. No repeated month-group headings, sort/status toolbar or header +. Each shared row shows platform logo/name, full payment date, evidence source, amount/currency and Confirmed text.

The graphite card places a full-width monthly graph below the amount/count. Show six columns at a time (Jan–Jun or Jul–Dec), clear short month labels, and 44px previous/next arrow targets; disable navigation at the selected year's boundaries. Each entire column is tappable, not only its bar. Inspecting a month highlights that column in mint and shows “October · USD 27.98 confirmed” above the plot with a live accessible reading; it never changes the Year/Month dropdown, payment list or selected-period total. Changing chart page selects its first month for inspection. The Month dropdown remains the only month filter for the list. Dropdown period changes align graph page/inspection to that month (All months uses newest payment month in the selected year). Each currency has its own graph; never combine currencies. Zero months retain a visible baseline. Accessible labels include full month/year/currency/amount; keyboard focus survives inspection/paging. API still supplies 12 monthly aggregates per selected year; UI pages them six at a time. The graph is always confirmed history, never forecast/savings. The card is deliberately slightly taller to make graph targets readable on mobile.

No records in selected month: zero period totals, reusable neutral mascot and Show all months action preserving year. Search no matches: sad Loop and Clear search preserving selected period. Changing year/month preserves search. Global Payments · empty has no period filters/summary/search.

Tap a row → centered graphite payment-details dialog: logo/name/Confirmed, actual amount/currency, payment date, billing date/cycle anchor, confirmation source and source-specific explanation. New sources show Gmail receipt and originating inbox. Previously stored manual/user-reviewed records, if any, retain clearly labeled historical provenance; confirmed does not mean bank-verified. Confirmation does not advance the renewal schedule. View subscription resolves the stored subscription ID → Detail; Back → Payments. Deleted/unavailable subscription retains its payment record and gives unavailable feedback. Close/outside/Escape dismiss; inert background, focus trap and return focus.

Payments · empty: no totals, period selectors, chart, search or fake payment cards. Reusable neutral Loop in centered 108px halo, “No confirmed payments yet”, explanation that matching successful-payment receipts appear through Gmail sync, compact View subscriptions → List. Search with no matches uses sad Loop and Clear search; the selected-period total stays visible. No uploads/scans or fabricated payment creation directly on this screen.

Only explicit confirmed-payment records count, not elapsed renewal dates, upcoming charges or missing receipts. Actual payment records/totals are shared with Profile. HTML populated inspection falls back to three scoped fictional confirmed-payment examples only when the in-memory confirmation store is empty; these examples never enter the account/payment store or Profile totals. If actual preview confirmations exist, show only those; Payments · empty explicitly inspects zero records. The external studio context discloses fixtures. API persistence, pagination, production loading/retry and source/evidence verification remain integration work. Payments source/copy/receipt-context navigation scope explicitly reapproved and relocked 31 October 2026. Previously approved period filters, chart, row/empty layout and details-dialog structure remain frozen. Backend/native integration remains pending; History, Profile and other locked screens remain unchanged.

### Catalog and widgets

[product-specification.md#platform-catalog](product-specification.md#platform-catalog) owns stable identity, matching aliases, correct logo and verified provider-specific management links; no user price/email/date belongs in shared catalog. Manual autocomplete remains text-only per the approved form. Admin website is deferred; verified starter data can exist first.

<a id="widgets"></a>
#### Home Screen widgets — Final and locked, 31 October 2026

`#widgets` is explicitly approved and locked 31 October 2026, including Small/Medium layouts, next-event/trial/quiet inspection states, knock/reveal/Reduced Motion and tap destinations. No design exceptions remain in this screen; native integration remains deferred. It previews Home Screen placement rather than another in-app list. Show small square and medium wide Renewless widgets alongside a decorative calendar/app-icon/wallpaper composition. The external studio identifies the Home Screen/calendar as fictional. Calendar tile → existing Calendar is an inspection shortcut, not evidence of OS Calendar integration. No change to locked Calendar/Home/Detail layouts or shared mascot geometry.

- Small: solid graphite rounded tile, compact Renewless mark/name, event-type dot/text, respective platform logo/name, amount/currency, relative timing and full date/confidence. Medium: the same event with more breathing room and centered Loop at right. Trial wording is Trial ends, with After trial price context; auto-renew Off says Auto-renew off without implying an upcoming payment. Unknown amounts stay unknown, never NaN or invented zero. No cross-currency total or Paid status.
- Default snapshot is the earliest eligible renewal **or trial end**, ordered by local event date then stable ID. Retain Home schedule/trial/date/confidence semantics; exclude cancelled/deleted/expired tracking as defined there. Do not rotate unrelated recommendations. Small/medium show the same chosen event in this study. Tap either → owned Detail by stable subscription ID; revalidate auth/availability. Logged-out → login intent; empty/unavailable → Open Renewless/Home, never an arbitrary subscription.
- Loop’s short door-knock concept: shared happy mascot leans, a small mint hand taps the illustrated door three times, knock marks/text appear, door opens slightly, then facts settle. The browser study completes knock/reveal in under 2 seconds, runs once per entry/replay and has no sound, vibration, repeating loop or automatic state rotation. Shared mascot assets remain unchanged. All clear uses friendly Loop, All clear / Nothing coming up, and no knock.
- Native adaptation must keep facts available in the baseline snapshot; do not depend on an animation finishing to read or tap. Apple supports animations on widget data updates for at most two seconds, scheduled by the system; a knock on every Home Screen visit or continuously playing GIF/Lottie is not promised. Reduced Motion skips the knock and immediately shows facts. Always-On/static/unsupported rendering must remain useful. See [Apple animation guidance](https://developer.apple.com/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities).
- **Refresh/animation trigger policy — finalized 31 October 2026:** plan a fresh presentation approximately every **3–4 hours**, using relevant greeting/countdown/mascot-pose changes while retaining the correct next event. A changed renewal/trial schedule or other important subscription update requests an additional snapshot/timeline update. This is a desired cadence, not a promise of server pushes, exact delivery or visible animation at each interval. The OS controls refresh/animation and may delay, coalesce or skip updates; an offscreen update does not guarantee the user later sees its animation. Do not wait only for a renewal date to change, and do not claim a reliable every-phone-unlock or every-Home-Screen-entry trigger. Each permitted knock is a short one-shot under 2 seconds; no queued catch-up bursts or continuous loop. Facts remain available without it; All clear keeps the quiet static treatment. The widget layout/motion is also approved and locked 31 October 2026; neither approval implements native scheduling. See [Apple refresh guidance](https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date/).
- External studio controls Next event, Trial ending, All clear and Replay knock are inspection-only, not production widget actions or subscription mutations. Trial preset picks the nearest eligible trial; All clear deliberately inspects empty snapshot. Calendar/app icons/wallpaper are decorative reference context, not shipped third-party apps/assets.

Use an app-written shared snapshot, no direct network/API work in the widget. A real native extension, installation/configuration, snapshot privacy/logout purge, timeline refresh, supported-family sizing, accessibility and deep links remain deferred. No embedded cancel/edit/payment actions. The screen, visual/motion design and refresh/animation trigger policy are approved and locked; OS widgets are not implemented. [API/mobile snapshot contract](api-mobile-contract.md#widget-snapshot) and [design composition](design-system.md#widget-composition) own the corresponding requirements.

<a id="ai-attachments"></a>
## AI Image/PDF attachment extension — Final and locked, 31 October 2026

`#ai-chat-attachment` is an inspection preset inside the same free chat. Legacy `#ai-chat-image` redirects here. The preset starts with no selected file so the paperclip is immediately available. Text/voice base is locked; this attachment-only extension was explicitly accepted 31 October 2026; design approval does not approve native/API integration.

### Selection, preview and send

- Paperclip → a compact graphite bottom sheet with exactly **Image** and **PDF document**, close/outside/Escape and focus containment/return. Image means native Photos/image selection; PDF means native Files/document selection. No video option. Actual native pickers are implementation work; browser uses distinct file inputs. Scope access to the selected media, not the whole library/drive.
- Browser raster types PNG/JPEG/WebP ≤10 MB and ≤24 MP; PDF ≤20 MB with `%PDF-` header check. Reject video, unsupported/mismatched MIME, empty, oversize and invalid files; extension alone is insufficient. Backend must fully validate/decode PDF/images. Native HEIC/HEIF input needs tested conversion to supported raster format, orientation normalization and unnecessary metadata removal; conversion failure has a clear recovery. Native/server format/page/time budgets still require agreement. Never silently analyze just the first PDF page.
- One selected file per message. Compact thumbnail for an image or PDF icon/name/page count when verified, plus a 44px Remove action; caption is optional. Removing clears the file and preserves typed text; cancelling the picker or rejecting a replacement preserves the prior valid selection. Decode/import/pending provider-download states block Send/Add; stale selections cannot replace newer ones. No raw file persistence on the subscription.
- Preview is bounded with graphite surface, blur/dim, close, outside/Escape and focus return. Images use contain in full preview. PDF uses a native reader/page controls in the target app. Browser fixtures show actual rendered page images with Previous/Next/page count and Open PDF; arbitrary local PDFs can open in the browser viewer but receive no invented page count or local analysis. A PDF preview is not evidence that native parsing/OCR works.
- Send is available with a file even without caption, replacing idle icons. Sent image bubble or compact PDF file bubble uses the mint user surface, optional caption and preview action. Reading image… / Reading PDF… uses shared dots, static under Reduced Motion. No fake upload percentages/mandatory production delay. Multiple file results use the existing compact draft card and plan-selection controls; preserve every candidate's identity/corrections/Added state.
- Network/processing failure keeps the same file/message for Retry or Remove, preserving a newer typed caption. Unreadable and password-protected outcomes offer another file/unlocked copy; do not collect/store a bank password in chat. Corrupt/unsupported/too-large/page-budget/no-match/partial and interruption states need real service outcomes. No automatic add/update/payment confirmation.

### Receipt versus bank statement

Receipts/invoices may explicitly identify service, plan, amount/currency, cycle, renewal or trial terms; extract only supported facts and ask for missing/ambiguous fields. An invoice/payment request is not successful payment evidence. Statements show historical transactions, not a provider contract: label observed amount/date separately from proposed tracking price. Never copy the transaction/posting date into Next renewal or invent billing cycle/trial/current active state. Require review of the observed amount, billing cycle and full next renewal before Add. Corrections to planned price preserve the original observed amount/date.

Statement candidates are **possible recurring charges**. Exclude one-off, pending/declined, refunded/reversed/credit, balance/summary and duplicate/page-carry rows; uncertainty asks the user rather than claiming certainty. Multiple historical similar debits can support a candidate, not guarantee a subscription or future charge. Mixed settlement/original currencies remain distinct. The fictional two-page fixture proposes Notion/Spotify from repeated debits; coffee/groceries, credit/refund and pending Netflix are not proposed.

### Platform and owned-record matching

Use the master catalog's canonical platform ID, verified aliases/merchant identifiers, category, logo and management destinations; AI text is evidence, not authority to publish IDs/links. Prototype starter catalog metadata/illustrative aliases are not verified production merchant mappings. Generic APPLE.COM/BILL/Google/PayPal/Stripe-style descriptors cannot automatically identify an underlying service. Unknown platform → ask the name or explicitly confirm a pending new service with fallback; no invented logo, platform ID or management link.

Match only the authenticated account's existing records. A possible same-platform match shows **View existing** and **This is a separate plan**; Add stays blocked until resolved. Existing-plan sheet reuses `subscriptionCard`, opens its actual Detail and never writes extracted changes automatically. Exact provider-subscription identity narrows to its existing ID and does not offer another-plan creation. Multiple owned matches require selection; name/amount alone cannot overwrite a record. The real backend may return reviewed update/conflict proposals under the existing owned/versioned update contract; the HTML demonstrates view-versus-new decisions, not a live update API.

Only reviewed canonical tracking fields plus creator/source/input-mode and minimal observed-charge metadata enter a local created record. Raw media, filenames, matching IDs/review UI flags do not enter it. Statement uploads are for tracking discovery/review: **Payments remains the locked Gmail evidence flow**; this extension does not create confirmed payments, mark Paid, change provider settings or advance schedules.

### Runtime and privacy boundary

V1 access is free. Server pipeline classifies receipt/invoice/statement/unknown, extracts text or renders/OCRs scanned/hybrid PDF pages, normalizes relevant facts with evidence/page/confidence, grounds catalog identity and matches owned records before structured review. Treat document text as untrusted data; never execute its instructions. Use only relevant/redacted content in model requests, excluding account numbers/balances/address/unrelated personal transactions. Upload/OCR/vision/parser/database integration is not implemented by this HTML.

Server raw files are discarded after extraction/terminal cleanup under verified provider/storage retention policy. Local current-conversation file previews are temporary; remove/reset/Back/route/account exit/logout cancels pending work and revokes blobs. Scalar drafts/saved IDs may remain; returning can show unavailable attachment. No raw media in subscription/history/cache/widget data. Schema, formats, encryption/protection detection, budgets and real outcomes require separate backend/native verification.

`dist/chat-attachment.js` scripts examples only: image receipt, multiple-image plans, unclear image, real bundled PDF receipt and two-page statement, plus a **simulated protected-PDF outcome**. That outcome uses the normal fictional statement as a visual fixture; it does not claim this example file is encrypted or that local encryption detection exists. Actual personal files get local validation/preview and analysis-unavailable recovery. Studio examples/failure controls/disclosure stay outside the phone. Assets and motion: [Design system](design-system.md#ai-image-composition); data/native/backend: [document contract](api-mobile-contract.md#ai-image-contract).

<a id="native-navigation"></a>
## Native navigation and prototype mapping — final handoff, 31 October 2026

Use React Navigation native-stack with conditional root groups and a bottom-tab navigator. Native onboarding uses one `Onboarding` host with a persistent fixed header/step rail and animated content panels; the named onboarding states below are logical panel identifiers, not separate native stack routes. Auth forms remain separate routes. This implementation structure preserves the locked appearance, Back and import/auth semantics; it does not change HTML inspection routes. The table maps approved inspection presets onto actual native destinations; do not create separate navigators/components for every empty/error/trial fixture. Names here are the target typed routes, not current source coverage. Details/fields stay in their owning sections above.

| Native destination / presentation | Approved prototype views / state | Required route context |
| --- | --- | --- |
| `Splash` / bootstrap root | Splash | Session hydration/validation status; no fabricated timer completion |
| `Onboarding` host: `welcome`, `connectInbox`, `inboxPermission` panels | Corresponding onboarding screens | Temporary onboarding intent ID; consent state |
| Same host: `discovering` panel | Discovering | Owned temporary scan/job ID; stage response |
| Same host: `yourSubscriptions` panel | Your subscriptions | Scan ID/revision and selected candidate IDs in draft store |
| Same host: `saveYourFinds`, `readyToGo` panels with auth continuation guard | Save your finds; Ready to go | Continuation ID, import result ID; Ready reads actual saved IDs |
| Same host: `scanNoResults`, `scanInterrupted` recovery panels | Scan · no results/interrupted | Job ID, safe outcome/retry information |
| `Login`, `Signup`, `ForgotPassword`, `ResetPassword` / auth stack | Login/error; Sign up; Forgot/Reset password | Intent ID; reset authorization kept outside route params |
| `VerifyOtp` / auth stack | Verify OTP; Verify reset | Challenge ID and purpose signup/reset; one component, purpose-specific operation |
| `MainTabs` → `Home` | Home/loading/empty/quiet | Server/cache state, not a route variant |
| `MainTabs` → `List` | All 10 List presets | Search + status groups retained locally; one paged list |
| `MainTabs` → `Calendar` | Calendar | Viewed month and selected local date |
| `MainTabs` → `Alerts` | All 4 Alerts presets | Sent-alert query and OS permission state |
| `MainTabs` → `Profile` | Profile/incomplete/social | Account capabilities and real profile/connector data |
| `SpendingBreakdown`, `ThisMonth` / protected stack | Spending breakdown; This month | Period + currency context; platform IDs for drill-down |
| `CalendarDay` / protected stack | Calendar day | Selected `YYYY-MM-DD`; fetch same event projection |
| `AddSubscription`, `EditSubscription` / protected stack | Add form; Edit | Optional renewal-date seed or required subscription ID/revision; same form component |
| `SubscriptionDetail` / protected stack | All 5 Detail presets | Required subscription ID; lifecycle/trial/no-date derive from record |
| `PlatformSubscriptions` / protected stack | Platform subscriptions | Canonical platform ID; optional exclude-current subscription ID |
| `AiChat` / protected stack | AI chat/trial/attachment/Voice | Conversation/draft ID; voice and attachment are composer modes, not separate product conversations |
| `GmailScan`, `GmailReview`, `GmailNoResults`, `GmailInterrupted` / protected stack | Authenticated Gmail family | Owned connector + job/scan ID/revision; initial vs incremental intent |
| `ReminderSettings` / protected stack | Reminder settings | Account preference revision and OS capability |
| `ConnectedInbox`, `InboxSubscriptions` / protected stack | All 4 Connected inbox presets; Inbox subscriptions | Connector ID; authorization/job state; no email-as-authorization |
| `EditProfile`, `ChangePassword` / protected stack | Corresponding screens | Account identity/capabilities; never pass passwords through navigation |
| `History`, `Payments` / protected stack | Populated/empty presets | History search/status query; Payments year/month/currency and optional subscription ID |
| `Widgets` / protected stack | Widgets | Widget snapshots/examples from real owned data; native installation is OS-owned |
| Shared `AddSheet`, Reminder, Track again, Delete confirmation, Status filters, info, select, attachment/preview, Gmail change/trial/inbox sheets | Add sheet; Delete confirm; Trial review and in-screen sheets/dialogs | Typed local overlay payload; preserve underlying screen. They are not tab destinations |

### Root/session and continuation

The single host owns typed logical step/history, fixed chrome and panel transitions; see [native component rules](design-system.md#native-implementation-rules). Public and completing modes must preserve its owned intent/draft across separate auth routes. Do not push onboarding panels onto the stack or reset their state on each animated panel change. This alters native composition only, not approved screen actions or progression.

1. `restoring`: branded Splash while secure credential hydration/session validation runs. Do not flash Welcome/Home. A transport failure is not invalid credentials; show recoverable restore state, preserving a valid owned cache where supported.
2. `public`: onboarding and auth routes. Default Welcome; already-have-account opens Login. Pre-auth Gmail is scoped to a temporary owner and cannot authorize protected Home. Manual recovery records `add-manual` intent, authenticates, then opens AddSubscription without Gmail.
3. `completing`: after a verified Renewless session with selected scan intent, retain the reviewed SaveYourFinds pending/error state while the owned idempotent import commits; show ReadyToGo only after actual saved IDs. Its approved Back remains SaveYourFinds; repeated submission cannot duplicate imports. Existing login with no continuation goes directly to Home. Auth cancellation/failure retains the original intent; reset verification is never a login.
4. `app`: MainTabs and protected stack. Ready CTA consumes completion intent and resets to Home, so Back cannot reopen completed public auth/import screens. Authentication transitions are state-driven; do not race conditional navigator changes with manual Home navigation. Account/session keys reset old stacks and prevent cross-account UI.

Tabs, in fixed order: **Home, List, Calendar, Alerts, Profile**. Connectors has no tab; no center Add tab. Preserve each tab's local query/scroll/month on normal switching. Pushed detail/forms/history/settings hide the tab bar, as in their approved full-screen layouts. AddSheet overlays its originating tab without side inset. Empty Calendar dates open AddSheet over Calendar with selected date context; manual entry receives it as a reviewable renewal-date seed. One event opens Detail; several open CalendarDay. Returning restores the viewed month/date.

### Back, overlays and external entry

- Shared Header Back, native swipe and Android hardware Back target the same previous route/context. Hardware Back first dismisses the keyboard/active overlay, then pops the stack; at tab root return to Home before normal OS exit behavior. Do not install competing global Back handlers.
- Local modal state is controlled by one overlay host. Only one active blocking overlay; child date/select/preview presentation restores focus to its parent field. Close/outside/Back cancels without changing a record. Unsaved editing never writes on navigation; async create/import success follows its own owned request/result even if the user leaves, with no stale screen callback.
- Keep route params serializable and minimal: IDs, date/period, source route key, intent ID. No credentials, bank/receipt contents, file handles, functions or complete mutable records. Source screen context lives in keyed state, not duplicated record snapshots.
- Use a single validated linking adapter for notification/widget/cold-start links. Proposed internal targets: subscription detail by ID, selected calendar date, or Home for quiet/stale widgets. Authenticate first, validate ownership/fetch, then consume the pending target once; backend 404/403 must not reveal another account. Unknown/removed target safely returns to Home after auth. Browser hash fixture names are not production deep-link contracts.
- Gmail OAuth callback uses separately registered scheme/universal/app link and verified state/PKCE/session binding; it is never interpreted as an arbitrary navigation target. Official provider management links are verified HTTPS destinations with a safe open failure; no web page or AI-supplied URL can mutate app state.

Test warm/cold launch, app background/resume, invalid/restored sessions, login versus import continuation, cancelled providers, interrupted imports, double taps, Android Back, iOS swipe, nested overlays and notification/widget routing. No route can turn an unsuccessful network request into Ready/saved/Paid.


## Native frontend review tracking

The current section-by-section build uses explicitly enabled development mock services. All 74 prototype views retain their base locks, with shared typography pending reapproval; frontend implementation acceptance and backend/native integration readiness are separate. A native preview does not create new visual approval requirements for unchanged approved UX. Record each section's native acceptance only after user review, retaining any integration limitations. Screen/panel state coverage follows the [frontend plan](product-specification.md#frontend-delivery-plan) and [mock contract](api-mobile-contract.md#frontend-mock-phase); no mock frontend section has been accepted merely by approving this plan.
