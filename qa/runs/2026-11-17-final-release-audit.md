# Final release audit: 17 November 2026

Scope: Renewless-mobile (branch `api-integration`, 3916764), Renewless-backend (local `main` at 2765934, 15 commits ahead of `origin/main`), Renewless-admin, Renewless-web, Renewless/docs, and read-only probes of production.
Baseline: [16 Nov release audit](2026-11-16-release-audit.md). Items it lists as closed or as user decisions (M27, M30 decision, M33 to M36, "Not doing") are not repeated unless a fix is shown to be wrong.
Method: 13 specialist audits (backend auth, backend live negative testing, backend data, architecture and scaling, integrations, admin, mobile network and state, mobile UI edges, Play store, App Store, docs drift, secrets and supply chain, production probe, regression diff, backend tests). A second pass tried to refute the high findings; severities below use its adjusted values. Findings reported by several audits are merged under one ID.
Live negative tests ran only against a local backend (in-memory Mongo, random port, real `.env` not loaded), stopped afterwards. Production received only unauthenticated GET/HEAD/OPTIONS requests (about 40) and 4 unauthenticated GETs to Firebase Storage on missing or public paths. No secret values appear in this report.

## Status after fixes (17 November 2026)

| # | Status | Checked |
|---|---|---|
| F1 | Closed: backend `main` pushed and deployed (2765934, `main...origin/main` level) | Live `OPTIONS /v1/auth/delete-account` answers 200; `/v1/health` ok |
| F2 | Closed: Hosting redeployed with c1c3f60 | `/privacy/` last-modified 17 Nov 07:17 GMT and names Firebase Analytics and Firebase Crashlytics |
| F29 | Closed: Play Data safety filled by the user. Advertising ID No; Device or other IDs, Crash logs and Diagnostics, App interactions declared. Baseline M30 row updated | Play Console (user) |
| F31 | Closed: the production Gemini key is on the paid tier (user, 17 Nov 2026). QA-PLAN #11 updated. The in-app "not used for training" line (M29) stays out unless separately approved | AI Studio (user) |
| F28 | Closed: App Store Connect App Privacy filled from the Xcode privacy report plus Firebase Analytics by hand (user, 17 Nov 2026) | App Store Connect (user) |
| F67 | Closed for the first upload: no build has been uploaded yet, so 1 is valid (user, 17 Nov 2026). Every later upload must raise versionCode and both iOS targets together | android/app/build.gradle:97, project.pbxproj |
| F64 | Closed: `ITSAppUsesNonExemptEncryption` = false in the app's Info.plist (HTTPS only, exempt) | `plutil -lint` |
| F3 | Gate met: live `GET /v1/app-config?platform=ios` and `android` both return `appConfig: null`. Keep it null until each store build is 100% live. The code findings (no upper bound, no live-in-store check) stay open as medium | Production GET |
| Play closed test | Not applicable: the Play developer account already has published apps (user, 17 Nov 2026) | Play Console (user) |
| F27 | Not doing (user, 17 Nov 2026): the debug key stays on the OAuth client | Decision |
| F62 | Fixed: the release manifest removes READ/WRITE_EXTERNAL_STORAGE, DOWNLOAD_WITHOUT_NOTIFICATION, SCHEDULE_EXACT_ALARM, FOREGROUND_SERVICE and RECEIVE_BOOT_COMPLETED (`tools:node="remove"`) | Merged release manifest rebuilt; push and receipts to check on the Play build |
| F23 | Fixed; scoped unlock, approval and relock by the user on 17 Nov 2026: Profile footer reads Version <version> (<build>) from the binary, in the app and the Studio | tsc, eslint, jest |
| F26 | Fixed; scoped unlock, approval and relock by the user on 17 Nov 2026: Payments rows and details show Refunded / Partly refunded and the refunded amount from the backend's `refunded`; Studio fixture shows both | `payments.test.ts`, prototype tests |
| F37 | Fixed; approved and relocked by the user on 17 Nov 2026: onboarding Connect Gmail/Outlook and Login offers the disabled-account deletion like Login (Google proof: the sign-in just given; Outlook: a fresh sign-in) | `disabled-delete.test.ts` |
| F25 | Fixed: Android rail or bottom bar and Container's tab-bar padding follow `useIsTablet` (window), not the launch screen; switching mounts the other navigator (open tab resets to Home). Fonts stay fixed. Device fold/unfold still unproven | tsc, eslint, jest |
| F52 | Fixed: a Keychain/Keystore write failure is reported to Crashlytics and the sign-in continues from memory; the next launch asks to log in | `session-token.test.ts` |
| F56 | Fixed; scoped unlock, approval and relock by the user on 17 Nov 2026: a session ended by the server shows the app's dialog once on Login (Session ended / Account disabled, OK). The unsaved form is still lost | `request-handler.test.ts` |
| F59 | Fixed: support reply keys use their position (replies only append, no ID) | tsc, eslint |
| F60 | Fixed; scoped unlock, approval and relock by the user on 17 Nov 2026: Edit profile's date of birth has Clear (iOS sheet button, Android dialog neutral button); backend already accepts `null` | tsc, eslint, jest |
| F69 | Fixed: `app-update-hook.test.tsx` covers required cannot be dismissed, optional Not now, foreground re-check and the https store fallbacks | 3 tests |
| F70 | Partly: `money-actions.test.ts` covers List paging, resume currency/amount/revision, edit keeping the trial, Gmail review save/import and its trial error, AI duplicate and separate plan. Line coverage still not the goal | 5 tests |
| F78 | Studio route Login · disabled account added. At the user's request the OS alerts became the app's `ConfirmDialog` (`DisabledAccountDialog`, app-level); the whole flow, with the onboarding path, approved and locked by the user on 17 Nov 2026. Device check: after a password login the dialog must appear as the signing-in overlay fades (two iOS modals) | Prototype tests 162/162; `disabled-delete.test.ts` 3 tests |
| F22, F24, F53, F54, F55, F57, F58, F61, F63 | Fixed in mobile 682ff8d (Arabic-Indic digits, TextInput 1.5x cap, Undo error, 300 s uploads, disabled-delete loader, ReadyToGo overflow, emoji initials, https Play fallback, dataExtractionRules) | tsc, eslint, jest |
| F3, F4, F40, F32, F8, F44, F43, F71, F41, F65 | Fixed in backend f82a5ee: latest build ≤ 2,100,000,000; store link only apps.apple.com / play.google.com with no userinfo; version name refuses control/bidi; audit records store-link changes; `trial.endDate: null` is a field error; signed refunds; import price change once, source outlook, no double import; Apple key warning at boot | Backend tests 304/304 (CI Node, 18 Nov) |
| F5, F6, F7, F9, F10, F16 | Fixed in backend e577c3b: signed-out delete counts 50 per IP per 15 min; per-user queue around the 500 cap; at most 10 reminder offsets; every renewal planned before the roll; refunds on imported services; sender read from the real address | Backend tests |
| F33, F36, F38, F42, F46, F66, F68 | Fixed in backend 5eac2e1 (Apple and Outlook signed-out delete tests, `user.delete` audit, control characters refused, Undo at 500, installation-id-not-registered dead token, tests one file at a time, mixed-script platform keys) | Backend tests |
| F13, F17, F20, F45, F47 | Fixed in backend e14e658: deploy rollback; Continue with Outlook keeps a disconnected inbox off; Sent/Drafts skipped; deleted mail skipped; photo metadata stripped, HEIC refused | Backend tests |
| F11, F21, F72 | Fixed in backend d8e6a9e: 10 uploads in memory server-wide (503 retryable); Outlook listing 50,000 with `coveredFrom`; keyset due query | Backend tests |
| F14, F15, F18, F34 | Fixed in backend c4695ae: Home's renewal check on Flex; Gemini lanes (chat 8, scans 16, Flex 4), 5/10/20 s retries, minute heartbeat; Outlook keep-alive at 60 days; no Google/Apple link to a Microsoft-only account. Also push tokens in `pushBatches` (baseline 16 MB limit) and indexed admin email search | Backend tests |
| F12 | Partly: Sentry error tracking (backend 3b7919c). Uptime check, budget and Gemini balance alerts, and Atlas backups still open (pre-deployment checklist) | Code |
| F35 | Fixed: random OTP challenge ids (f82a5ee), and the hourly code cap counts per email and address (backend df87716) | Backend tests 305/305 on ICU 77 and 78 |
| F49, F50, F51 | Fixed: admin d8b59b8 (audit filter Support and App versions; iOS store link default id6827023344; 403 `FORBIDDEN` signs out) and backend 5fac99f, 40437a9 (area filter). Admin live bundle matches the build (18 Nov) | Admin tsc, oxlint, vite build |
| F73, F74 | Fixed in web 356e8fc, live 18 Nov: CSP, X-Frame-Options DENY, Referrer-Policy, nosniff (no external resources or inline scripts left); the delete-account page tells disabled accounts to email (web 31bd698 adds the in-app Delete my account path) | Live headers and pages 200 |
| F30 | Fixed in web 31bd698, live 18 Nov: privacy policy names Microsoft (Outlook) sign-in and Contact us messages; delete-account page shows the in-app Delete my account path for a disabled account | Live /privacy/ |
| F39, F75, F76, F77 | Fixed in docs on 18 Nov 2026 (contract error codes, backend-plan sessions/Microsoft/signed-out delete, checklist ticks and Microsoft section, orientation in design-system and QA-PLAN) | Docs |
| F19, F48 | Open, process: reconnect the demo inbox before review and every 6 days while Google's consent screen is in Testing; Entra publisher verification. Both on the pre-deployment checklist | Checklist |
| F79 (new, 18 Nov) | Fixed in backend df87716: PKR, IDR, COP, HUF and RSD decimals pinned to the ICU 78 values, so an older Node cannot change stored amounts | Backend tests 305/305 on nvm Node 22.21.1 (ICU 77.1) |
| Update check (18 Nov 2026) | Changed with the user's scoped unlock of Home · update available / required: backend, admin and app compare store versions (`latestVersion`, `minVersion`; 1.9 < 1.10) instead of build numbers, so iOS may restart its build number for a new version. Layout and copy unchanged; approved and relocked by the user on 18 Nov 2026. Device check, Galaxy S23 Ultra, release build 1.0 against production: `null` config shows nothing; Android latest 1.1 / minimum 1.1 saved in the admin shows the required prompt, Back and the shade do not close it, Update now opens the Play page (Item not found until published), and it shows again on return. Optional (minimum 0) covered by unit tests only. The Android row was then deleted from production `appConfigs` (direct database delete, so no audit entry), and both platforms read `null` again | Backend 305/305, mobile jest 36 suites 126 tests, admin tsc/oxlint/build, prototype 162/162, device |

## 1. Verdict

| Store | Verdict | Reason |
|---|---|---|
| Google Play | **NO-GO today, GO after the release gates** | No code defect blocks the binary. But (F1) production runs a backend 15 commits behind, so the new disabled-account delete returns 404 and the M2, M5 to M17 fixes are not live; (F2) the live privacy policy does not mention Firebase Analytics or Crashlytics, which the Data safety form must declare; (F29) the audit's M30 row tells you to answer the Advertising ID question Yes, but the build has no AD_ID any more. |
| App Store | **NO-GO today, GO after the release gates** | Same F1 and F2. The App Privacy answers built from the app's own manifest miss data the bundled SDKs collect (F28). Do not set an iOS app-config `minBuild` during review (F3). |

No finding survived verification at blocker severity. The two highs are deploy and publish steps, not code changes. Release gates, in order:

1. Review and push backend `main` so the deploy runs. Then check `OPTIONS https://api.renewlessapp.com/v1/auth/delete-account` answers 200 `allow: POST` (F1). Do this before review starts; do not deploy during review.
2. `firebase deploy --only hosting` for renewlessapp from commit c1c3f60 and confirm /privacy/ names Firebase Analytics and Crashlytics (F2). Add support messages and Microsoft sign-in to the policy in the same deploy (F30).
3. Fill Play Data safety and App Store App Privacy from the build that ships (F28, F29), and settle the Gemini paid-tier question before relying on the policy's "not used to train" claim (F31).
4. Leave both app-config rows unset (`appConfig: null`, as today) until each store build is 100% live (F3).
5. Bump build numbers before every upload (F67).
6. Run the manual checklist in section 9 on signed store builds.

## 2. Release blockers

None after verification. The production probe reported F1 as a blocker; the verifier lowered it to high because it is a missing deploy, it affects only admin-disabled users, and normal signed-in deletion still works. It is still gate 1 above.

## 3. High

| ID | Surface | Location | Scenario and evidence | Fix |
|---|---|---|---|---|
| F1 | Backend / infra | Renewless-backend `main` vs `origin/main`; `src/routes/auth.ts:33` | `git status -sb`: `main...origin/main [ahead 15]`, origin at 45cb4fc. Deploys run only on push to main (`.github/workflows/deploy.yml:6-8`). Live `OPTIONS /v1/auth/delete-account` gives 404, the same as a made-up route, while `/v1/auth/outlook` gives 200 `allow: POST`. So mobile 3916764's Delete my account for a disabled account fails, and M2, M5, M6, M7 to M17 (including the M16 forged-header fix and the M17 advisory bump) and multi-device push are not in production, although the 16 Nov status table records them as done. | Push after review (gate 1). Optional: return the git SHA in `/v1/health` so the live version can be checked. |
| F2 | Web | https://renewlessapp.com/privacy/ vs Renewless-web `public/privacy/index.html:43` | Commit c1c3f60 adds "app usage analytics (Firebase Analytics) and crash reports (Firebase Crashlytics)", but Hosting still serves the 15 Nov version (last-modified 15 Nov 21:12 GMT, no "analytic" or "crash" anywhere). The privacy manifest and Data safety declare both. A reviewer comparing them can reject under Apple 5.1.1(i) or Play User Data. | Deploy Hosting (gate 2). |

## 4. Medium

### Release process and store forms

| ID | Location | Issue | Fix |
|---|---|---|---|
| F3 | backend `src/validations/admin.ts:161-175`; admin `src/screens/AppVersions/index.function.ts:11,72,100`; mobile `src/utils/app-update.ts:8`, `src/components/AppUpdate/index.function.ts:34` | Required-update lockout. Force update copies `latestBuild` into `minBuild`; nothing checks the build is live in the store (under review, phased release, staged rollout). Every older user, the reviewer included, gets a prompt that cannot be closed, which also blocks Settings, logout and Delete account. No upper bound: `1e300` and `9007199254740993` were saved with 200. If iOS resets CFBundleVersion for a new marketing version, users are locked for good. Reported by 7 audits; verifier lowered from high (needs an admin mistake, recoverable by a re-save within about 60 s). | Runbook and admin confirm text: "only after build N is 100% live in that store". Backend: `Number.isSafeInteger` and a sane max. Docs: build numbers must always rise. Keep app-config null during first review. |
| F4 | backend `src/validations/admin.ts:183-191` | Store link accepts any https host: `https://apps.apple.com@evil.example/`, `https://play.google.com.evil.example/x`, `https://1.2.3.4/` all 200. One stolen admin token (a phone-app session works, M18) plus Force update sends every user to a phishing page with no way out. | Allow only `apps.apple.com` (ios) and `play.google.com` (android), no userinfo. Mobile can apply the same check. |
| F28 | mobile `ios/Renewless/PrivacyInfo.xcprivacy:45-240`; baseline M31 note | App Privacy answers built from the app's manifest alone miss SDK data: Crashlytics, GoogleDataTransport and FirebaseInstallations declare OtherDiagnosticData; FirebaseMessaging and GoogleSignIn declare DeviceID, UserID, CoarseLocation, OtherUsageData for Analytics. GoogleAppMeasurement ships no manifest at all (app instance ID, IP-based coarse location). Incomplete label is a 5.1.1/5.1.2 risk. | Archive, Xcode Organizer → Generate Privacy Report, answer from that union plus Firebase Analytics by hand. Update the M31 note. |
| F29 | baseline `qa/runs/2026-11-16-release-audit.md:38` vs `android/app/src/main/AndroidManifest.xml:5-8` (bc1b768) | The M30 row still says keep AD_ID and answer Play's Advertising ID question Yes. bc1b768 removes AD_ID and both ADSERVICES permissions (merged release manifest and `aapt2 dump` confirm). Store form and binary would disagree. Device or other IDs must still be declared (ANDROID_ID is sent as deviceId, `src/utils/device-id.ts:7`). | Update the M30 row: Advertising ID = No. Data safety: Device or other IDs (App functionality), Crash logs and Diagnostics, App interactions (Analytics). |
| F30 | Renewless-web `public/privacy/index.html` ("What we collect") | Policy names only "Google or Apple sign-in identity" and does not mention Contact us data (name, email, message, app version, OS, device model, replies), though the manifest declares CustomerSupport and deletion removes support messages. | Add support messages to collected data and the deletion list; say "Google, Apple or Microsoft". |
| F31 | docs `pre-deployment-checklist.md:30` vs `qa/QA-PLAN.md:388` vs baseline M29 | Checklist ticks the paid Gemini tier (9 Nov), QA-PLAN #11 still marks it [verify] and a blocker, M29 leaves "not used for training" out of the app until confirmed, yet the live policy already promises no training. If the production key is on the free tier, the public claim is false (Gmail Limited Use). Unproven: tier not visible. | Check the key's tier in AI Studio once; then close QA-PLAN #11 and M29, or drop the claim. |
| F27 | mobile `android/app/google-services.json:21`; https://renewlessapp.com/.well-known/assetlinks.json | M32 still open (not a regression): the public RN debug key (SHA-1 5e8f16…f625, SHA-256 FA:C6:17:45…) is still trusted by the production OAuth client and is the first assetlinks fingerprint. Anyone can sign a `com.renewless` APK and get the Renewless Google consent screen with the Gmail scope. | Remove the debug fingerprint from the production Firebase app and assetlinks.json; use an applicationIdSuffix or separate Firebase project for debug. |

### Backend correctness and security

| ID | Location | Issue | Fix |
|---|---|---|---|
| F5 | backend `src/controllers/me.ts:162-185` (63e6b72) | Signed-out `POST /auth/delete-account` has no per-IP limit (login has 50 per 15 min, `controllers/auth.ts:128`), and answers 403 "Sign in and delete your account in Settings." when the password is right for an active account. Local probe, one IP, 80 accounts: login gave 30×429 from request 51; delete-account gave 0×429 (79×401, 1×403). Credential stuffing works around login's limit and gets a correct/incorrect oracle; each guess also costs a scrypt on the single VM. | First line: `hit(limits.loginIp(req.ip \|\| 'unknown'), 50, LOGIN_WINDOW)`. Answer an active account with the same 401. Add a 51-email test. |
| F6 | backend `src/services/subscriptions.ts:252-260,294,532-533`; `scan.ts:1120` | **REGRESSION of M14 under concurrency.** The 500 cap is count-then-save with no lock. At 499 live, 20 parallel creates ended at 517 to 518; at 495 live, 30 parallel restores ended at 514 to 520. Timing-dependent: other runs held at 500. Scan import uses the same pattern (traced, not fired). | Wrap assertRoom and the write in the existing `exclusive([`subs-user:${userId}`])` lock for create, restore, draft create and import. |
| F7 | backend `src/validations/reminders.ts:14-27`, `offsetsFor`, `services/reminders.ts:60-72,124` | Reminder offsets have no count limit: `[1..365]` returns 200. 500 records × 365 offsets ≈ 182k jobs; a timezone change (sent by the app on start since M25) took 86.8 s of synchronous CPU, and `/v1/health` latency rose from 28 ms to 356 ms at 100 records. One account can stall every user on the VM. | At most 10 unique offsets, 400 VALIDATION above it. |
| F8 | backend `src/validations/subscriptions.ts:78` | `trial: {endDate: null}` on POST or PATCH gives 500 INTERNAL with `retryable: true`, so Retry repeats it. Only a hand-made request or client bug reaches it. | Treat null as `''` so it becomes the 400 field error. |
| F9 | backend `src/services/reminders.ts:61-72` (plannedJobs) | **M2 only partly fixed.** Each offset is planned only for the first renewal it still fits. Monthly anchored on the 31st or 30th with a 30-day reminder, or a trial then monthly with 30 days, loses about 40% of reminders (16-month simulation in Karachi, New York, Kiritimati: missing 2027-02-28, 04-30, 06-30, 09-30, 11-30, 2028-02-29). Weekly and yearly cases are complete. The M2 test covers weekly 7 days only. | Plan each offset for every renewal whose fire time is before the next roll, plus the first after it (dedupeKey already blocks double sends). Add a monthly-31st, 30-day test across February. |
| F10 | backend `src/services/scan.ts:869-876,1180-1183,1226-1232` | **M11 only partly fixed.** `recordRefund` runs only when the service is already tracked at scan time. A refund for a service imported from the scan (onboarding, new or update candidates) is never applied, and later scans skip that message as already read. Payments and Home show 10.99 instead of 5.99. Proven from code; the only refund test uses an already-tracked record. | After the recordPayment loops in importCandidates, call `recordRefund` for each receipt (already idempotent). Add a test. |
| F16 | backend `src/utils/gmail.ts:105` (authVerdict), `src/utils/outlook.ts:140,151` | Sender check takes the domain from the first `@` in From, so `x@evil.com <billing@smallsvc.io>` (or the RFC 2047 form) with DKIM for evil.com counts as authenticated, while the service match reads the real address. Forged mail can create confirmed Payments or cancel/expire a record and stop its reminders. Outlook also accepts compauth none/softpass. Proven at function level, not with real delivery. | Take the domain from the angle-bracket address, as addressDomain does. Add a display-name test. Optionally require compauth=pass. |
| F17 | backend `src/controllers/auth.ts:219-229`, `src/services/connectors.ts:207-223` | Continue with Outlook always calls saveOutlookInbox, which sets status `connected`. A user who disconnected the inbox for privacy has it silently reconnected on the next Outlook sign-in and Renewless reads mail again. Google sign-in does not do this. | Skip the save when a `disconnected` connector exists for that address; reconnect only from Profile. Update the contract. |
| F18 | backend `src/services/scanSchedule.ts:31-46`, `src/workers/sync.ts:16-46` | Outlook refresh tokens expire after 90 days unused (Google 6 months). Inboxes with only yearly records, or users away 30+ days (paused), become Reconnect needed and miss the renewal receipt. No keep-alive refresh. Expiry from Microsoft docs, not reproduced. | Cap Outlook `nextScanAt` at about 60 days after last token use, or a refresh-only tick. |
| F20 | backend `src/services/scan.ts:32-33`, `src/utils/outlook.ts:99-105` | Gmail QUERY has no `-in:sent -in:drafts`; Outlook skips only Junk and Deleted. Freelancers' outgoing "Invoice" mails go to Gemini and pollute scan review; more mail goes to Google than "billing emails you receive" suggests. | Add `-in:sent -in:drafts`; skip `sentitems` and `drafts` on Outlook. |
| F21 | backend `src/utils/outlook.ts:31,108`, `scan.ts:781-786` | Outlook first scan stops after looking at 5,000 messages (about 5 to 6 months for a busy inbox) and still records a full successful sync, so older yearly receipts are never found. | Server-side Graph filter on subject, or mark the scan partial when the cap is hit. |
| F32 | backend `src/services/appConfig.ts:43-58` | The app_config audit entry records only build numbers (a store-link change leaves no trace), and its "before" is read separately, so parallel saves report the same before (probe: two entries both "latest 5"). | `findOneAndUpdate` with `{new:false}`; include storeUrl and notes-changed flags. |

### Integrations and ops

| ID | Location | Issue | Fix |
|---|---|---|---|
| F11 | backend `src/services/chat.ts:75-98`, `src/routes/chat.ts:16` | M1 caps uploads per account only. 40 accounts × 2 parallel 9.9 MB uploads with slow storage: RSS 159 → 999 MB (re-run by the verifier; the finder saw 1134 MB). OOM on the 2 GB VM likely needs 60 to 80 coordinated verified accounts (unproven). Lowered from high. | One process-wide in-flight counter (about 8) in admitUpload, 429 above it. |
| F12 | docs `pre-deployment-checklist.md:22,33-34`; backend `src/controllers/health.ts:4` | No backend error tracking, uptime check, budget or Gemini low-balance alert, and backups unconfirmed (the policy promises copies removed within 30 days). An Atlas failover or an empty Gemini balance (every scan and chat answers 503) pages no one. Health not pinging Mongo is the baseline L. Mobile has Crashlytics. Lowered from high. | Before launch: Atlas backups with ≤30-day retention, a free uptime monitor, GCP budget and Gemini balance alerts. |
| F13 | backend `.github/workflows/deploy.yml` | A commit that passes tests but fails at boot leaves production crash-looping: the VM is already reset to the new SHA, and the failed health step does not roll back. | Save the previous SHA; on health failure reset, install and restart. |
| F14 | backend `src/controllers/dashboard.ts:16`, `src/services/scan.ts:143-209`, `src/workers/sync.ts:18-45` | Home opens start the same renewal scan the worker will run later, on the standard (not Flex) tier, and renewal mode skips the SYNC_LIMIT and nextScanAt checks, so the worker runs it again. Roughly doubles Gemini cost for renewal checks once the worker falls behind (estimate: about 2 h backlog at 10k users). | In startScan for `renewal`, return early when the reloaded connector's nextScanAt is null or in the future. |
| F15 | backend `src/services/extraction.ts:136-168`, `src/utils/gemini.ts:31-45`, `scan.ts:152-158` | Still open from baseline §4 (not a regression): no process-wide Gemini cap (30 parallel batches per initial scan), 2 s/4 s retry on 429, and a Flex batch can run about 32 min without a heartbeat, so the 20-minute stale rule can kill a live, billing scan. | Semaphore of about 8 calls, longer 429 backoff, `alive()` on a 60 s timer. |
| F19 | docs `pre-deployment-checklist.md:26`; backend `src/utils/google.ts:82-87` | If review runs while the Google consent screen is still in Testing (the B6 fallback), Gmail refresh tokens with gmail.readonly expire 7 days after consent; the demo account's inbox turns Reconnect Gmail mid-review (2.1 risk). | Note it on the checklist and review notes; reconnect the demo inbox right before submitting and every 6 days, or keep demo data imported without needing a live connector. |
| F33 | backend `src/auth.test.ts:433-485`; mobile `__tests__/disabled-delete.test.ts` | No test covers signed-out deletion of a disabled account with Apple (revoke with the code) or Microsoft proof, or the mobile Outlook path that re-runs outlookSignIn. That is the 5.1.1(v) path for Apple-only accounts. Coverage: `utils/apple.ts` 25.8%. | One backend test each for Apple and Microsoft; one mobile test for the Outlook branch. |

### Mobile

| ID | Location | Issue | Fix |
|---|---|---|---|
| F22 | mobile `src/components/InputField/index.tsx:66`, `src/utils/subscription-form.ts:38`, `src/screens/Otp/index.function.ts:47`, `src/components/SubscriptionFields/index.tsx:116` | Arabic-Indic and Persian digits and the Arabic decimal `٫` are rejected: amount says "Enter a valid amount", OTP strips every digit so typing looks dead, custom trial days stay empty. Core SAR/AED markets. Keypad default per OS/locale unproven on device. | Map U+0660-0669 and U+06F0-06F9 to 0-9 and `٫` to `.` next to the existing `,` rewrite, in OTP and days too. |
| F23 | mobile `src/screens/Profile/index.tsx:17,117` | Profile footer always shows "Version 0.0.1"; the binary is 1.0 (1), and the update prompt and support messages say 1.0. | `DeviceInfo.getVersion()`. Profile is locked: confirm with the user (real data, not a design change). |
| F24 | mobile `src/components/InputField/index.tsx:62`, `PhoneInputField:56,78`, `Dropdown:117`, `AiChat/components/Composer.tsx:124` | Text is capped at 1.5x but no TextInput is; at AX3 to AX5 or Android 2x, typed text clips inside fixed-height fields on Login, Add/Edit, Gmail review and currency search. | `maxFontSizeMultiplier={1.5}` on the 5 TextInputs. |
| F25 | mobile `src/constants/theme.ts:6-7`, `src/navigation/Tabs.tsx:35`, `src/components/Container/index.tsx:49` | Foldables: rail vs bottom bar and Container padding are decided once at launch, while screens follow the window. Unfold keeps the phone bar under tablet layouts; fold keeps an 80dp rail on the cover screen. Unproven on device. | Decide rail/bar and padding from `useWindowDimensions` (shorter side ≥ 600); remount the navigator on class change. Font decision stays fixed. |
| F26 | mobile `src/api_services/dto.ts:97-108`, `adapters.ts:298`, `src/screens/Payments/index.tsx:142`; backend `src/services/payments.ts:99-106` | After M11, a fully refunded charge shows as "$0.00 · Confirmed", a partial refund as a smaller amount with no explanation; the app ignores the new `refunded` field. The contract documents the net amount. | Add `refunded` to the DTO and show Refunded / Partly refunded. Payments is locked: scoped unlock needed. |

## 5. Low (brief)

| ID | Location | Issue |
|---|---|---|
| F34 | backend `src/utils/microsoft.ts:98`, `services/auth.ts:288-343` | Unproven pre-account takeover: Outlook accounts take email from Graph `mail \|\| userPrincipalName` as verified; a later Google sign-in links to it by email. Refuse the link when the account is Microsoft-only with no password. |
| F35 | backend `services/auth.ts:184` | M5 partly fixed: 5 forgot requests per hour per email (all purposes) still lets one IP keep about 20 victims' reset and signup codes blocked. Count per email+IP with a looser per-email cap. |
| F36 | backend `controllers/me.ts:150-187` | A disabled account's self-deletion writes no audit row; admins see only `user.deactivate`. |
| F37 | mobile `src/redux/actions/onboarding-action.ts:106` | A disabled account using Onboarding's Connect Gmail and Login sees "sign-in failed", no disabled message and no Delete my account (Login path still covers 5.1.1(v)). Locked screen: needs scoped unlock. |
| F38 | backend `validations/auth.ts:7-12` | Signup accepts emails with NUL or U+202E and mails the code to them. Reject `\p{Cc}\p{Cf}`. |
| F39 | docs `api-mobile-contract.md` | Codes UNSUPPORTED_MEDIA, IDEMPOTENCY_CONFLICT, UNDO_EXPIRED, PDF_PROTECTED, INVALID_STATE are returned but not in the contract. |
| F40 | backend `validations/admin.ts:167-169` | `latestVersion` accepts control and bidi characters and shows them in every user's prompt. Restrict to `[0-9A-Za-z.\-]{1,20}`. |
| F41 | backend `services/scan.ts:1186-1210` | Import does not re-check records added after the scan, so a service can be imported twice (AI drafts refuse with POSSIBLE_DUPLICATE). |
| F42 | backend `services/subscriptions.ts:532-551` | Undo: `assertRoom` runs before the token lookup, so a double tap at 500 live gives a false SUBSCRIPTION_LIMIT (probe: 200 then 409); a lost Undo response cannot be retried (UNDO_EXPIRED), and restore has no idempotency. (3 audits.) |
| F43 | backend `services/scan.ts:1137-1186` | A retried update import after a crash writes a second PriceChange with no difference. |
| F44 | backend `services/extraction.ts:83-86` | A refund amount with a minus sign is dropped (`-5.00` → null). Unproven the model sends it. |
| F45 | backend `services/scan.ts:645-647` | One message deleted mid-scan (404) fails the whole scan and discards its results. Skip NOT_FOUND per message. |
| F46 | backend `utils/push.ts:6` | FCM tokens with mismatched-credential or invalid-argument are never removed; reminders retry and end push_failed. |
| F47 | backend `services/chat.ts:39-145` vs contract `:343` | Images are not decoded or stripped; GPS EXIF goes to Gemini. The contract claims a full decode and says stripping must be decided before release. |
| F48 | docs checklist; mobile `src/utils/social-sign-in.ts:74-86` | Entra publisher verification is on no checklist; without it work/school tenants may get "Need admin approval". Unproven. |
| F49 | backend `validations/admin.ts:156`; admin `AuditLog/index.function.ts:10-15` | Audit log has no area filter for app versions or support. |
| F50 | admin `src/api_services/adapters.ts:78` vs `admin-api.md:637` | iOS store link default is empty in the admin, but the doc says id6827023344; the first iOS save fails validation. |
| F51 | admin `src/redux/request-handler.ts:31` | A disabled or demoted admin gets errors on every page instead of being signed out (only 401 ends the session). |
| F52 | mobile `src/utils/session-token.ts:33-35`, `auth-action.ts:25-29` | A Keychain/Keystore write failure at sign-in leaves the user on Login with no message while requests carry the new token. Frequency unproven. |
| F53 | mobile `src/redux/actions/detail-action.ts:219-238` | Undo that fails offline or on 5xx shows nothing; the toast closes and the record stays deleted. Show `error.message`. |
| F54 | mobile `src/api_services/http-provider.ts:63-68` | Uploads use the 90 s timeout; a 14 MB PDF always fails under about 1.25 Mbps upload. Give upload() about 300 s. |
| F55 | mobile `src/redux/actions/auth-action.ts:85-116` | Disabled-account delete from Login has no loader; a retry after a dropped response says "Wrong email or password"; Apple's reused id token expires after about 10 min on the alerts. (2 audits.) |
| F56 | mobile `src/redux/request-handler.ts:41-43`, `endSession.ts:21-37` | A session expired or disabled mid-use drops to Login with no notice; the form is lost. |
| F57 | mobile `src/screens/Onboarding/components/ReadyToGo/index.tsx:105-109` | A long next-renewal name overflows off-screen (column lacks `flex_1`). |
| F58 | mobile `src/screens/Profile/index.function.ts:17` | Avatar initials split a leading emoji into a lone surrogate (fixed for PlatformLogo on 16 Nov, not here). |
| F59 | mobile `src/screens/SupportMessage/index.tsx:40` | Reply keys `sent_label + body.length` can collide. |
| F60 | mobile `src/components/DateField`, `EditProfile/index.tsx:53-56` | Optional date of birth cannot be cleared once set (locked screen; product decision). |
| F61 | mobile `src/components/AppUpdate/index.function.ts:34` | Android fallback store link is `market://`; on devices without Play the required prompt traps the user. Use the https Play URL. |
| F62 | Android merged release manifest | react-native-blob-util and Notifee add WRITE/READ_EXTERNAL_STORAGE, DOWNLOAD_WITHOUT_NOTIFICATION, SCHEDULE_EXACT_ALARM, FOREGROUND_SERVICE, RECEIVE_BOOT_COMPLETED that the app never uses. Remove with `tools:node="remove"` and retest push and receipts. |
| F63 | mobile `android/app/src/main/AndroidManifest.xml:16` | `allowBackup=false` does not stop device-to-device transfer on targetSdk 31+; the widget snapshot moves to the new phone while the session does not. Add dataExtractionRules. |
| F64 | mobile `ios/Renewless/Info.plist` | `ITSAppUsesNonExemptEncryption` is missing, so every upload waits on a manual export-compliance answer. Add `false`. |
| F65 | backend `deploy/start.sh:21` | A failed read of APPLE_PRIVATE_KEY is silent; every Apple deletion then skips revoke (B4 / 5.1.1(v)) with only a per-request log. Warn at boot or make it required. |
| F66 | backend `package.json` test script, `src/chat.test.ts:70-71` | Parallel test files race for the Mongo memory-server port (coverage run: 15 failures); the deploy gate runs this suite. `--test-concurrency=1` or retry, and guard `server?.close`. |
| F67 | mobile `android/app/build.gradle:97`, `ios/Renewless.xcodeproj/project.pbxproj:452,484,514,697` | versionCode and CURRENT_PROJECT_VERSION are 1 in all configurations (app and widget). The second Play upload is refused; an iOS bump to one target only gives ITMS-90473. The update prompt compares this number. (3 audits.) |
| F68 | backend `services/platforms.ts:34` | Mixed-script platform names key on the Latin part only (`شاهد VIP` → `vip`), so they collide with unrelated platforms. |
| F69 | mobile `src/components/AppUpdate/*` | The update hook and modal have no tests (required cannot be dismissed, foreground re-check, fallback URL). |
| F70 | mobile `list-action.ts`, `detail-action.ts`, `gmail-action.ts`, `ai-action.ts` | Low line coverage on money and idempotency actions (9% to 35%). |
| F71 | backend `services/scan.ts:1176`, `models/priceChange.ts:21` | Outlook price changes are still stored as source `gmail` (app unaffected). |
| F72 | backend `src/workers/sync.ts:18-29` | The due query re-reads every inbox already tried (`limit(500 + tried.size)`), about n²/1000 reads per run with tokens loaded. |
| F73 | https://renewlessapp.com/delete-account/ | The deletion page does not mention Delete my account on the disabled-account login message (add after F1 is deployed). |
| F74 | Renewless-web `firebase.json` | Public site sends no CSP, frame or referrer headers (admin side is the known M18). |
| F75 | docs `backend-plan.md:96-97,293`; `admin-api.md:200` | backend-plan still says one push token per account and has no microsoft provider or signed-out delete; admin-api says a disabled user can do nothing, not that they can delete. |
| F76 | docs `pre-deployment-checklist.md:28,48,50,64` | Done items still unticked (B1, privacy policy, M29, Apple deletion); no Microsoft/Entra section at all. |
| F77 | docs `design-system.md:285`, `qa/QA-PLAN.md:311` | Docs do not record that Android phones are portrait-only and tablets and open foldables rotate (8419988). |
| F78 | docs `product-screens.md:110`; mobile 3916764 | The disabled-account delete flow ships while its design is Pending reapproval, with no Studio route. Get the user's reapproval and relock, or record it as a native-only system alert. |

## 6. Architecture and scaling risks

Production is one e2-small VM (2 GB), one Node process, behind Caddy (M35 decision). The in-memory lock and limiter are correct for that.

| Load | What breaks first | Evidence |
|---|---|---|
| Launch day (any load) | A bad deploy has no rollback (F13) and nothing alerts anyone (F12). The 15 undeployed commits (F1) must go out before review, not during it, because a restart fails running onboarding scans (M4). | Code and checklist |
| A few accounts, deliberate | One account with 365 reminder offsets stalls the event loop for tens of seconds on every timezone change (F7). Signed-out delete allows unlimited guesses per IP (F5). | Local runs: 86.8 s rebuild; 0×429 over 80 accounts |
| Dozens of connects per minute | Gemini TPM quota: each initial scan sends up to 30 batches at once with no global cap; 2 s/4 s backoff then the whole scan fails (F15). | Code; quota not verified |
| 60 to 80 coordinated upload accounts | Memory: about 10 to 12 MB per upload in flight, no global cap (F11). | 40 accounts → about 1 GB RSS |
| About 10k users | Renewal scans: the worker drains about 800 scans an hour; Home opens start duplicate standard-tier scans (F14). Outlook 5,000-message cap and 90-day token expiry start to show (F18, F21). | Arithmetic estimate |
| About 50k due inboxes | Worker due query grows with the square of the backlog (F72). | Code |
| About 100k | Baseline §4 still open: "All users" push hits the 16 MB BSON limit, `distinct()` id lists and unanchored regex search in admin. | Baseline |
| About 1M | Baseline §4: reminder drain about 55 min at a 09:00 peak, single VM cannot hold it. | Baseline estimate |

Recommended order: (1) F1 deploy with F13 rollback and F12 monitoring and backups; (2) F5 and F7 one-line limits; (3) F6 lock around the cap; (4) F11 global upload cap and F15 Gemini semaphore and heartbeat; (5) F14 renewal-scan guard; (6) baseline push and admin items before about 50k users; (7) move the lock and limiter to shared storage before running a second instance.

## 7. Regressions of baseline fixes

| Baseline | Finding | What is wrong |
|---|---|---|
| M14 | **REGRESSION of M14** (F6) | The cap holds for sequential calls but not under concurrency (creates and Undo overshoot to 520). Undo at exactly 500 also gives a false SUBSCRIPTION_LIMIT (F42). |
| M2 | Partial (F9) | Monthly with a 30-day offset (and trial then monthly) still misses about 40% of reminders. |
| M11 | Partial (F10) | Refunds work only for services tracked before the scan. |
| M5 | Partial (F35) | Lockout shortened from 24 h to 1 h but still renewable by one IP. |
| M30 | Out of date (F29) | The decision row says keep AD_ID and answer Yes; bc1b768 removed AD_ID. |
| M1 | Incomplete (F11) | Per-account gate works; no process-wide cap. |
| Status table, 16 Nov | Not deployed (F1) | M2, M5, M6 to M17, multi-device push are on local `main` only; production runs 45cb4fc. |
| M32 | Still open (F27) | Not a regression; never closed. |

No regression found in B1 to B5, M3, M4, M8, M10, M12, M13, M16 (fix itself correct; F16 is a different root cause), M19 to M26, M28, M29, M31, M33.

## 8. What was verified OK

| Area | Result |
|---|---|
| Backend `npm test` | **Pass** 278/278 (several audits). Typecheck pass. `biome check src` pass, 140 files (not run on 16 Nov). Coverage 91.8% lines, 86.7% branches |
| Backend `yarn audit` prod | M17 highs gone; 4 moderate, 1 low, all transitive under firebase-admin |
| Mobile | `tsc --noEmit` pass; `eslint .` 0 problems; `jest` 34 suites, 109 tests pass (was 26/83); same one leaked open handle |
| Admin | `tsc`, `oxlint`, `vite build` pass (same bundle hash as committed dist); `npm audit` 0 |
| Auth and sessions | Every non-public route requires a user; every `/v1/admin` route checks the role from the database; disabled accounts are refused on every request; sessions revoked on reset, password change, logout and delete; Google, Apple (nonce) and Outlook (PKCE, allowlisted redirect) verification pinned; Gmail connect checks the code's sub matches the id token |
| Account deletion | Covers every owned collection twice, storage folders, Gmail grants (except shared, M12), Apple revoke after the data is gone; hostile bodies to signed-out delete all 400, wrong password and unknown email give the same 401, parallel deletes safe |
| Live negative fuzz (local, about 900 requests) | Amounts, currencies (KWD 3 decimals, JPY 0), dates and leap days, pagination, cursors, NoSQL operators, mass assignment, IDOR on changed routes, idempotency (20 parallel same key → 1 record), revision races, body abuse (413, 431), odd timezones, support limits, admin query abuse all correct. Only 5xx: F8 |
| Money and dates | Integer minor units, no cross-currency sums, refunds clamped at 0 and once per message; Jan 31 and Feb 29 recurrences correct; DST gaps (New York, Lord Howe, Chatham) correct |
| Reminders | No duplicate sends in a 16-month simulation; weekly and yearly offsets complete; stuck jobs requeued; multicast to every device |
| Uploads (M1) | Consent, rate limits, declared size and 2-per-account checked before the body is read; video and encrypted PDFs refused |
| Mobile state | M19 to M23 hold; endSession clears the FCM token offline; timers and listeners clean up; double-submit guarded; idempotency keys kept per user |
| App update (logic) | Integer compare, NaN/0/missing builds show nothing, a failed fetch never blocks, a required prompt cannot be closed; live `GET /v1/app-config` returns `appConfig: null` for both platforms, so no prompt at launch |
| Play build | targetSdk 36, release signing without debug fallback, 16 KB page alignment, no cleartext, not debuggable, no AD_ID, photo picker (no media permission), RECORD_AUDIO and POST_NOTIFICATIONS requested at runtime, exported components protected |
| iOS build | Purpose strings present, ATS strict, `remote-notification` only, Sign in with Apple and App Group entitlements, widget privacy manifest, every listed SDK ships a privacy manifest, icons without alpha, 4.8 and 3.1 met, no paywall copy |
| Secrets and supply chain | Tracked files and full git history of 5 repos clean apart from the public Firebase client keys; real `.env`, keystore and signing files git-ignored; no git/http/latest dependencies; M33 fail-closed confirmed |
| Production probe | TLS 1.3, HSTS, 308 to HTTPS, structured errors with no stack, `/v1/health` leaks nothing, strict CORS allowlist, privacy/terms/support/delete-account pages live, AASA and Microsoft identity files served |
| Docs | All 15 markdown files: 0 broken links or anchors; every backend error code the app checks is documented; Studio lock map has 110 routes, all locked, matching the register |

## 9. What was NOT tested, and the manual checklist

Not tested:
- No device or simulator runs this round: iPhone, iPad portrait and landscape, Android phone and tablet, Galaxy Fold, Arabic keypad, AX5 text size, push in foreground, background and cold start, widgets.
- No signed AAB or IPA built and nothing uploaded; the newest release APK predates HEAD. Xcode Privacy Report not generated.
- Real Google, Apple and Microsoft tokens, Apple revoke, real Gmail and Outlook mailboxes, real Gemini and FCM: all stubbed. F16 proven at function level only; Microsoft 90-day and Google 7-day token expiry not reproduced.
- Production state: VM `app.env`, Caddyfile `max_size`, Atlas tier, backups and network rules, Gemini tier, Entra publisher status, Google consent and CASA status, Play and App Store Connect forms, Play account type. The demo account was not logged in (authenticated production requests were not allowed).
- No load test at real user counts; section 6 numbers are estimates except the local probes named there.
- Admin UI not run in a browser. Admin support reply concurrency untested (wrong field name in the probe).

Manual checklist before submitting (signed store builds, after gates 1 and 2):

- [x] `OPTIONS https://api.renewlessapp.com/v1/auth/delete-account` → 200 `allow: POST`; /privacy/ shows Firebase Analytics and Crashlytics (checked live 18 Nov 2026).
- [x] Build steps settled (user, 18 Nov 2026): the stores still need a new build number per upload (Android `versionCode` always higher; iOS unique within a version, app and widget equal), but the app's update check compares only store versions since 18 Nov 2026, so every store release raises the version name; signed AAB to Play internal testing and the IPA from Xcode Organizer to TestFlight (Release has `DEBUG_INFORMATION_FORMAT = dwarf-with-dsym` and the RNFB Crashlytics run script uploads the dSYMs at archive); app-config is `null` for both platforms.
- [ ] Play internal testing install: Continue with Google, Connect Gmail, Continue with Outlook (personal Hotmail and a work account), email signup with OTP.
- [ ] TestFlight install: Sign in with Apple, Google, Outlook; delete an Apple account and confirm Renewless leaves Settings → Sign in with Apple.
- [ ] Disabled account dialog (17 Nov change, iPhone and Android): password login to a disabled QA account → the signing-in overlay fades and the themed Account disabled dialog appears (iOS: two modals in a row, check it is not swallowed); Cancel closes; Delete my account → Delete your Renewless account? → Delete account shows the spinner on the button, then Account deleted. Repeat with Google, Apple and Outlook login, and from onboarding Connect Gmail and Login / Connect Outlook/Hotmail and Login. Outlook: closing the fresh Microsoft sheet keeps the dialog open. Tablet: dialog centred at readable width.
- [ ] Payments refunds (17 Nov change): with a QA payment that has a refund, the row shows the net amount with Refunded or Partly refunded in muted text; Payment details shows the status, a Refunded row and the after-refund note; totals and the chart use the net amount. Phone and tablet.
- [ ] Android permissions (F62): on the Play build a push arrives in foreground, background and after a restart, a tap opens the right screen, a receipt PDF opens, and photo/PDF pickers attach in AI chat; Play Console's permission list no longer shows storage, exact alarm, foreground service or boot.
- [ ] Profile footer (17 Nov change): reads Renewless · Version 1.0 (1) on the TestFlight and Play builds, matching the store build.
- [ ] Disabled account (use a QA account, disable it in admin): Login with password, Google, Apple and Outlook each offers Delete my account and deletion succeeds; Onboarding Connect Gmail behaviour noted (F37).
- [ ] Demo account `reviewer@renewlessapp.com`: data present, Gmail connector not in Reconnect state (F19); reconnect right before submitting.
- [ ] Add, edit, delete and Undo a subscription; Undo with Wi-Fi off (F53).
- [ ] Amounts with comma decimals (Germany region) and, on an Arabic-locale phone, Arabic digits in amount and OTP (F22).
- [ ] Largest accessibility text size: Login, Add/Edit, Gmail review sheet inputs readable (F24).
- [ ] iPad and an Android tablet, portrait and landscape: every tab and sheet; Galaxy Fold folded → unfolded and back (F25).
- [ ] Android phone stays portrait; tablet rotates.
- [ ] Push: reminder and admin push in foreground, background and cold start on both platforms; tap opens the right screen; two devices on one account both receive.
- [ ] AI chat: image, 14 MB PDF on a slow connection (F54), voice note on fresh Android install.
- [ ] Gmail and Outlook scan with a real QA inbox: review, import, Payments totals; a refunded charge (F10, F26).
- [ ] Widgets on iOS and Android, including after logout.
- [ ] Logout offline, then log in as another QA account: no previous data or pushes.
- [ ] Play Data safety, Advertising ID = No, App Privacy from the Xcode report; export compliance answered or plist key added (F64).
- [ ] Play closed-test rule (12 testers, 14 days) checked for the account type.
