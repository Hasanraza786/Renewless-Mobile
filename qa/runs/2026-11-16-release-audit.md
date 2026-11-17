# Release audit: 16 November 2026

Scope: Renewless-backend, Renewless-admin, Renewless-mobile (branch `api-integration`, 47b3134), Renewless/docs, and read-only probes of production.
Method: 12 specialist audits (backend auth, live negative testing, data integrity, scaling, integrations, admin, mobile network/state, mobile UI edges, store readiness, docs drift, secrets/supply chain, production probe). A second pass tried to refute every critical and high finding, and the severities below use its adjusted values.
Live negative tests ran only against a local backend (in-memory Mongo, random port, real `.env` not loaded), which was stopped afterwards. Production received about 40 unauthenticated GET/HEAD/OPTIONS requests and nothing else.

## Status after fixes (16 November 2026, same day)

All seven blockers below are closed or in progress. A release build still has to pass on Play internal testing and TestFlight before submitting.

| # | Status | Checked |
|---|---|---|
| B1 | Upload-key and Play App Signing SHA-1 added to Firebase; Android OAuth clients exist for both; `google-services.json` refreshed | Firebase config. Google sign-in on a Play install still to test |
| B2 | Android asks for RECORD_AUDIO before recording | Galaxy S23 Ultra: prompt shown, voice note recorded and answered |
| B3 | Shared `InputField` turns `,` into `.` on the decimal pad | Galaxy S23 Ultra and iPhone simulator in the Germany region; unit test |
| B4 | App sends Apple's `authorizationCode` on delete; backend revokes the grant (deployed in 158ef4e, Apple key in Secret Manager) | iPhone: Renewless left Settings → Sign in with Apple, next sign-in asked for name and email again |
| B5 | Camera and photo-library purpose strings added | Present in the built app's Info.plist; upload check still to see in App Store Connect |
| B6 | Google OAuth verification submitted with demo video and demo account | Waiting for Google |
| B7 | `MICROSOFT_CLIENT_ID` and `MICROSOFT_REDIRECT_URIS` (`com.renewless://oauth/outlook`) set on the VM | Match the app |

Mobile findings fixed the same day (unit tests and typecheck; not yet run on a device):

| # | Status |
|---|---|
| M1 | Backend (17 Nov 2026): `POST /uploads` checks consent, the rate limits, a declared size over 14 MB and two uploads in flight per account before `express.raw` reads the body (`uploadGate`); Caddy `max_size` is 15MB (the VM's /etc/caddy/Caddyfile must be updated by hand). The 60-parallel-upload memory test was not run again |
| M4 | Backend (17 Nov 2026): on start, the server fails every scan created before it started (retryable `INTERNAL`) and drops its half-written results (`failInterruptedScans`), so the app shows Scan · interrupted / Try again instead of Discovering. Relies on the single API process (M35) |
| M19 | Only `UNAUTHORIZED` and `ACCOUNT_DISABLED` end the session (`request-handler.test.ts`) |
| M20 | endSession deletes the FCM token, offline too |
| M21 | requestHandler drops a response or error when the session token changed while it was in flight (`request-handler.test.ts`) |
| M22 | The idempotency key survives a 409 `REQUEST_IN_PROGRESS` (`idempotency-key.test.ts`) |
| M23 | Widget links accept only word-character ids and never decode (`widget.test.ts`) |
| M24 | Android no longer mirrors the app on an Arabic or Urdu phone: `MainApplication` turns RTL off before React Native starts (`I18nUtil.allowRTL(false)`), so the first launch is already left-to-right. Checked on a Galaxy S23 Ultra with the app's language set to Arabic |
| M25 | Home sends the phone's timezone on start and on return when it differs from the account's. Reminder settings shows the account's timezone (scoped unlock, approval and relock by the user on 16 Nov 2026) |
| M26 | Onboarding Google connect shows the signed-in inbox-limit message when `inboxLimit` is true |
| M27 | Not doing (user, 16 Nov 2026): no Sign in with Apple on Android and no password path for Apple accounts for now |
| M28 | List renders with SectionList, so only the rows on screen are drawn, and search filters on a deferred value so typing stays smooth. All pages are still read up front: List sorts, filters and counts on the phone, so it needs every record, and the 500-record cap bounds it at five requests |
| M29 | Scoped unlock by the user on 16 Nov 2026: Connect inbox's disclosure and its How we use your email tooltip name Google Gemini, in the prototype and native. Approved and relocked by the user on 16 Nov 2026. "Not used for training" is left out until the paid Gemini tier is confirmed (QA-PLAN #11) |
| M30 | Superseded (17 Nov 2026): bc1b768 removed AD_ID and the ADSERVICES permissions, so Play's Advertising ID answer is No. Data safety declares Device or other IDs (App functionality), Crash logs and Diagnostics, and App interactions (Analytics); filled by the user on 17 Nov 2026 |
| M31 | `PrivacyInfo.xcprivacy` lists the collected types, none used for tracking. Linked to the account, for app functionality: name, email address, phone number, other financial info (subscriptions and payments), emails (inbox billing emails), photos, audio, other user content (PDFs, notes, chat), customer support, user ID, device ID, and other data (date of birth, gender). Not linked: product interaction (Firebase Analytics, purpose Analytics) and crash data (Crashlytics). The App Store Connect App Privacy answers must match this list |
| L (mobile) | A crash inside onDone is sent to Crashlytics and no longer shows as a failed request; a JS error's text never reaches the screen. The onboarding poll skips a tick while the previous request is still running. Detail shows Not synced yet for an inbox that never synced. The fallback logo letter is taken by code point, so an emoji first letter stays whole. On Android a push that arrives while the app is open is shown by Notifee on FCM's fallback channel (the one background pushes use), and a tap opens the same screen as an FCM tap; iOS keeps its system banner. A fresh install (no install marker and no persisted state) clears a token the iOS Keychain kept from an uninstalled copy, so it starts signed out; an update keeps its login. Checked on devices: the Notifee push and its tap on a Galaxy S23 Ultra, and update, uninstall and reinstall on the iPhone 18 Pro simulator |
| L (mobile, 2) | Payments reads its other years in parallel. Alerts merges its offset pages by ID, so a row is never repeated. Detail drops a late answer for a record left behind, so the spinner no longer waits forever. The profile is not kept in storage and is read with `GET /me` on each app start; once per install the storage file is wiped and rewritten without it, so old copies in the file's bytes are gone too. A phone in landscape keeps the phone layout (shorter side decides). Text scaling stops at 1.5x. Forecast bar amounts stay on one line and shrink to fit. Mutations no longer re-read every List page: the saved record goes into List and History from the response (delete removes the row, Undo puts it back), so returning shows it at once, even offline (checked on the Galaxy with Wi-Fi off after an edit). The backend now also returns the record from `POST /drafts/:id/create` and the records from `POST /scans/:jobId/import`; until that is deployed, AI and Gmail saves fall back to one full List read. Detail and the one Home request stay. Android's native tab labels stop growing at 1.3x system text, so at 2x all five labels fit (checked on the Galaxy). Checked on a Galaxy S23 Ultra: no profile left in the storage file, Profile still shows the name after restart, landscape keeps the phone layout, Payments, Alerts and Reminder settings load, 2x system text stops at 1.5x, Forecast IDR 1776000 labels stay on one line, List search filters, Add and Remove work. Found and fixed during the check: changing system text size while the app was open crashed it on Android (react-native-screens restored its fragments); `MainActivity` now sets `RNScreensFragmentFactory`, and two text-size changes no longer crash |
| M33 | Handed to the backend team by the user (16 Nov 2026) |
| M34 | User (16 Nov 2026): development already has its own database; production gets its own before release |
| M35 | User (16 Nov 2026): keep the e2-small VM for launch (about 1,000 users); revisit with M1 fixed and memory watched |
| M36 | Not doing (user, 16 Nov 2026): the self-hosted CI runner on the developer's Mac is intentional |
| Docs | AGENTS.md no longer describes a mock-data phase or `src/config/mock-data.ts` (lines 81, 88, 89 updated with the user's permission); QA-PLAN no longer describes `USE_MOCK_API` or mock scenarios. Product specification says 2 inboxes (Gmail or Outlook); the contract's DELETE /me inputs, Manage link, Gmail trial-start and device-run notes are current; backend-plan describes deviceId as IDFV/ANDROID_ID; the support endpoint answers `VALIDATION` like every other request (backend and contract) |

## 1. Verdict (before fixes)

| Store | Verdict | Reason |
|---|---|---|
| Google Play | **NO-GO** | On a Play install, Google sign-in and Gmail connect will fail with DEVELOPER_ERROR because the Play App Signing SHA-1 is not registered. Android voice input never asks for microphone permission. Decimal-comma amounts are rejected. |
| App Store | **NO-GO** | Sign in with Apple tokens are not revoked on account deletion (guideline 5.1.1(v)). The upload is likely to fail ITMS-90683 because the camera and photo-library purpose strings are missing. Decimal-comma amounts are rejected. |

All blockers are small: config changes, a few lines of code or plist strings. Once B1 to B7 are done and checked on a release build, both stores can be GO.

## 2. Release blockers

| # | Store | Repo / file:line | Scenario | Fix |
|---|---|---|---|---|
| B1 | Play | Renewless-mobile `android/app/google-services.json` | It has only one Android OAuth client, and its certificate is the public RN **debug** key (5e8f16…f625). Neither the release key (`renewless.jks`, SHA-1 80:74:17:FF…) nor the Play App Signing key is registered. On a Play install, Continue with Google and Connect Gmail fail with DEVELOPER_ERROR, for reviewers too. `pre-deployment-checklist.md:28` is still unticked. | Add the upload-key SHA-1 and the Play App Signing SHA-1/SHA-256 (Play Console > App integrity) to the Firebase Android app `com.renewless`, then re-download the json. Test Google sign-in on an **internal-testing install from Play**. Remove the debug fingerprint from production (see M-store). |
| B2 | Play | Renewless-mobile `src/screens/AiChat/index.function.ts:205` | `startRecorder()` runs without a runtime RECORD_AUDIO request, and neither the app nor react-native-nitro-sound asks for one. On a fresh Android install voice input always fails and no prompt ever appears. | Before `startRecorder` on Android, call `request(PERMISSIONS.ANDROID.RECORD_AUDIO)` from react-native-permissions (already a dependency). When the result is blocked, show the existing message with `openSettings()`. |
| B3 | Both | Renewless-mobile `src/utils/subscription-form.ts:38` | `isValidAmount` accepts only `.`. On iPhones set to a comma-decimal region (DE, FR, ES, IT, BR, TR, ID and others) `decimal-pad` shows only `,`, so "9,99" gives "Enter a valid amount" and prices with cents cannot be entered. This affects Add/Edit, Detail, the Gmail review sheet and Onboarding. | Replace one `,` with `.` in shared code (isValidAmount and before formatAmount and submit). |
| B4 | App Store | Renewless-backend `src/services/auth.ts:349` and Renewless-mobile `src/utils/social-sign-in.ts:33` | Deleting an account never calls Apple's `/auth/revoke`. The app never sends `authorizationCode` and the server has no Apple client-secret (.p8) setup. Since 2022, reviewers can reject under 5.1.1(v). Deletion has also never been tested with an Apple account. | Mobile: send `authorizationCode` on delete. Backend: exchange it at `appleid.apple.com/auth/token` with a client_secret JWT (team ID, key ID, .p8), then POST `/auth/revoke` before `deleteAccountData`. Test end to end on an iPhone. |
| B5 | App Store | Renewless-mobile `ios/Renewless/Info.plist:63` | Only `NSMicrophoneUsageDescription` is present. The linked react-native-image-picker pod calls the AVCaptureDevice and PHPhotoLibrary authorization APIs, so App Store Connect's static check is likely to reject the build (ITMS-90683) even though the app never opens the camera. | Add accurate `NSCameraUsageDescription` and `NSPhotoLibraryUsageDescription` strings. Correct `qa/QA-PLAN.md:358` as well. |
| B6 | Both (conditional) | Renewless/docs `pre-deployment-checklist.md:26-27,62` | CASA and gmail.readonly verification are "in progress", and the consent screen is still in Testing. Anyone who is not a listed test user (max 100), including a reviewer using their own Google account, gets Google's block screen on Connect Gmail. Plain Google login may be limited too while the screen is in Testing. | Check the Google Cloud console. If not yet verified, add the reviewer Google account as a test user, use the demo account `reviewer@renewlessapp.com` with pre-imported data, and explain in the App Review notes and Play app-access notes. Do not open public rollout of Gmail until verification passes. |
| B7 | Both (check) | Renewless-backend `deploy/README.md:10`, `src/utils/microsoft.ts:32` | The VM's `app.env` was set up before Outlook existed. If `MICROSOFT_CLIENT_ID` or `MICROSOFT_REDIRECT_URIS` is missing, every Continue with Outlook and Outlook connect returns 503 or rejects the redirect, and reviewers who tap Outlook see an error. Not verified, because there was no access to production. | Confirm both are set on the VM. Add them, plus `ADMIN_ORIGINS` and `GA_PROPERTY_ID`, to the deploy README and `.env.example`. Test Outlook on a release build. |

Required steps that are not code defects, but still need doing before submit:
- **iPad (App Store):** `TARGETED_DEVICE_FAMILY = "1,2"` (project.pbxproj:472) and all iPad orientations are allowed. Run every screen on an iPad in portrait and landscape, upload the 13" set, and confirm the prototype-based screenshots match the build (guideline 2.3.3).
- **Play closed test:** if the developer account is a personal account created after November 2023, Production stays locked until 12 testers have run a closed test for 14 days (QA-PLAN.md:374).
- **Fresh release build:** the last merged release manifest (14 Nov) predates Outlook. Build a signed AAB and IPA from HEAD and test Google, Apple and Outlook sign-in on them.
- **Store forms:** the Play Advertising ID declaration must match the AD_ID permission that ships in the build. The iOS privacy manifest must match the App Privacy form (see the store table).
- **Deploys:** do not deploy during review. A restart can leave the onboarding scan stuck (see backend M4).

## 3. Findings by area

Severity uses the verifier's adjusted value. Duplicates reported by several audits are merged.

### Backend

| Sev | file:line | Issue | Fix |
|---|---|---|---|
| M1 | `src/routes/chat.ts:15` | `express.raw({limit:'15mb'})` reads the whole upload into memory before the rate limit, consent and size checks. 60 parallel uploads from one account took the process from 72 to 795 MB, and the VM has 2 GB. | Middleware before `rawFile`: run consent, `hit()` and a Content-Length > 14 MB rejection, and cap uploads in flight per user. Lower Caddy `max_size` to 15MB. |
| M2 | `src/services/reminders.ts:84` | Reminders whose offset is at least the cycle length (weekly with 7/10/20 days, or monthly with ~30) are planned only at roll time, when the send time has already passed. After the first cycle they are silently never sent. | Plan the offsets for the next two events, or set `rollAt` to the earlier of the roll time and the next event's earliest send time. Add a test for weekly with a 7-day offset. |
| M3 | `src/services/reminders.ts:167,183,229` | Reminder delivery is fragile: (a) only the session with the latest `lastUsedAt` gets the push, so an iPhone+iPad user gets it on one device; (b) a transient FCM error sets the job to `failed` for good; (c) a crash between the claim (`skipped/sending`) and the final write loses the job, because the unique dedupeKey blocks recreating it. | Send to all of the user's tokens with `sendMany`. Put `push_failed` jobs back to pending with a retry inside the 1 h window. At worker start, reset stale `sending` jobs (accepting a possible duplicate) or have shutdown wait for the in-flight batch. |
| M4 | `src/services/scan.ts:906` | `getScan` never checks for staleness. A restart, deploy or OOM during the first scan leaves the app polling "Discovering" forever, and startScan returns the dead job for 20 minutes. | In getScan, fail jobs that are queued or running with `updatedAt` older than 3 minutes (retryable), as startScan already does. |
| M5 | `src/services/auth.ts:181` | The daily code limit counts all OTP purposes per email. An attacker sending 10 forgot-password requests (rotating IPs) locks the victim, or the admin, out of reset and signup for 24 hours. | Count the limit per email+IP or per purpose, and keep a global abuse cap. |
| M6 | `src/middlewares/auth.ts:54` | A deactivated user gets 401 on `DELETE /me`, logout and support, so they cannot delete their own data (Apple 5.1.1(v) and Play deletion policy). | Allow inactive users on `DELETE /me` and `/auth/logout`. |
| M7 | `src/services/platforms.ts:29` | An admin creating a platform with a non-Latin name (爱奇艺, Яндекс Плюс, شاهد) gets 500 INTERNAL, because the key comes out empty. | Return 422 when the key is empty. Longer term, build keys with `\p{L}\p{N}`. |
| M8 | `src/validations/subscriptions.ts:78` | A trial end date before startDate is accepted (201), and the anchor moves to years before the start. | Validate `trial.endDate >= startDate`. |
| M9 | `src/services/scan.ts:461` | A model chargeDate in the future (for example the "next charge" date) creates a future Payment, which hides a real upcoming renewal from Home and Upcoming. | Clamp to the earlier of chargeDate and `todayIn(tz, receivedAt)`, as scan endings already do. |
| M10 | `src/services/projections.ts:77` | A trial's first charge is counted as both paid and upcoming when the receipt arrives up to 24 h before the trial end. | Skip a `trial_end` expected charge when its cycleKey is in the paid set. |
| M11 | `src/services/scan.ts:419` | Refund receipts are classified but never reverse a Payment, so paid totals overstate spending. | Mark the matched Payment as refunded, or document the gap in api-mobile-contract.md. |
| M12 | `src/services/connectors.ts:291` | Two accounts connected to the same Gmail: a disconnect or delete by one revokes the shared Google grant and forces the other to reconnect. | Revoke only when no other connector holds a token for that googleSub. |
| M13 | `src/utils/google.ts:75`, `microsoft.ts:71` | Any 400/401 on refresh, including `invalid_client` from a bad or rotated secret, marks **every** inbox `reconnect_needed`. | Treat only `invalid_grant` (and `interaction_required`) as expired, and fail fast at boot on empty OAuth env vars. |
| M14 | `src/services/scan.ts:1106`, `subscriptions.ts:515` | The 500-subscription cap is bypassed by scan import and by Undo/restore. | Check the count plus the new items in import and in restore, and add a test. |
| M15 | `src/controllers/auth.ts:59` | Signup, resend and forgot share 10 requests/hour per IP. On carrier CGNAT (PK, IN) or a reviewer's office network, this gives 429. | Make per-email the main limit and raise per-IP to about 100, or use a key per endpoint. |
| M16 | `src/utils/outlook.ts:172` | Outlook sender verification trusts the first Authentication-Results header without pinning the authserv-id (Gmail pins `mx.google.com`). A forged header could create confirmed Payments. Confidence low to medium. | Require Microsoft's authserv-id or compauth, otherwise `authenticated=false`. Add a forged-header test. |
| M17 | `package.json` (express > body-parser 1.20.8) | High advisory (DoS with a compressed body) on the public JSON parser. A local repro was not exploitable. | Bump express or body-parser to 1.20.9 or later, or set `inflate:false`. |
| L | various | Account and provider enumeration via forgot/signup and login timing (`controllers/auth.ts:249`). A double-tapped first social sign-in can return 409 (`services/auth.ts:304`). Google tokens are accepted without a nonce, and social/Outlook have no rate limit (`utils/social.ts:25`). Audit log keeps deleted users' emails (`models/auditLog.ts:3`). Amounts up to 1e12 lose precision in totals (`domain/money.ts:24`). Zero-width, NUL, lone-surrogate and RTL-override names are accepted (`validations/common.ts:13`). Retired currencies (HRK, ZWL, XDR) are accepted (`money.ts:8`). An idempotency key stays pending for 24 h after a crash (`middlewares/idempotency.ts:56`). A clamped month-end anchor drifts (`scan.ts:810`). A roll/edit rebuild race (`reminders.ts:89`). Cached Gmail token is not cleared on disconnect (`scan.ts:76`). Gmail quota 403 is shown as "Reconnect" (`gmail.ts:31`). No timeouts on Gemini or SMTP (`gemini.ts:44`, `mail.ts:87`). `/v1/health` does not check Mongo (`controllers/health.ts:4`). mongoose 8.24.5 has advisories with no reachable path; bump to ≥8.24.7. Support uses `VALIDATION_ERROR` instead of `VALIDATION` (`validations/support.ts:21`). | One line each, in follow-up. |

### Admin website

| Sev | file:line | Issue | Fix |
|---|---|---|---|
| M18 | `Renewless-admin/firebase.json:7`, `src/utils/session-token.ts:19`, backend `src/middlewares/auth.ts:28`, `controllers/admin.ts:47` | The admin bearer token is in localStorage with a 90-day sliding life. There is no CSP and no frame protection (clickjacking on Send push or Deactivate). requireAdmin accepts **any** session of the admin user, including the phone app's. There is no MFA. | Add CSP, `frame-ancestors 'none'`, `X-Frame-Options: DENY` and `Referrer-Policy` headers. Mark admin-scope sessions with a short absolute lifetime (about 12 h) and have requireAdmin accept only those. Add TOTP later. |
| L | various | Login timing reveals which emails have a password (`controllers/admin.ts:44`). The production bundle contains mock fixtures and the text "admin@renewless.app / admin123" (`http-provider.ts:3`). index.html is cached for 1 h, so admins can get a white screen after a deploy (`firebase.json:6`). The "Gmail" filters and metrics also count Outlook, and "Next sync" shows a different time from the app (`UserDetail/index.tsx:86`, `services/admin.ts:202`). Firebase deploy uses an unpinned `firebase-tools@14`, tag-pinned actions, and a WIF condition keyed on the repo name (`.github/workflows/deploy.yml:45`). | Follow-up. |

The admin site is not part of either store binary, so it does not block submission.

### Mobile

| Sev | file:line | Issue | Fix |
|---|---|---|---|
| M19 | `src/redux/request-handler.ts:31` | Any 401 ends the session, including a failed Google token check during signed-in Gmail connect (INVALID_TOKEN) and GMAIL/OUTLOOK_AUTH_EXPIRED. | End the session only for `UNAUTHORIZED` and `ACCOUNT_DISABLED`. |
| M20 | `src/redux/actions/auth-action.ts:301` | Logging out while offline leaves the server session holding this device's fcmToken, so the previous user's renewal pushes (name and amount) keep arriving. | Call `deleteToken(getMessaging())` in endSession. |
| M21 | `src/redux/actions/dashboard-action.ts:25` | A response that arrives after logout writes the previous user's data back into Redux and onto the **home-screen widget**. List, Detail and Payments have the same race. | In requestHandler, ignore onDone when the session token has changed. |
| M22 | `src/api_services/http-provider.ts:57` | The idempotency key is dropped on 409 REQUEST_IN_PROGRESS, so Retry after a timeout can create a duplicate subscription or import. | Keep the key when `code === 'REQUEST_IN_PROGRESS'` or the error is retryable. |
| M23 | `src/utils/widget.ts:71` | A malformed `renewless://subscription/%E0%A4%A` link makes `decodeURIComponent` throw an uncaught URIError, which is likely a crash in release. | Wrap it in try/catch, or check that the id matches `^[0-9a-f]{24}$`. |
| M24 | `android/app/src/main/AndroidManifest.xml:15` | `supportsRtl=true` without `I18nManager.allowRTL(false)`: on an Arabic or Urdu device language the whole Android UI is mirrored (core markets SAR, AED, PKR). iOS stays LTR. | Call `I18nManager.allowRTL(false)` in index.js and check on an Arabic emulator. |
| M25 | `src/redux/actions/auth-action.ts:32` | Timezone is sent only at login, so travellers get reminders in the old zone, and Reminder settings shows the device zone, not the server's. | Send updateDevice({timezone}) on app start or foreground when it differs. |
| M26 | `src/redux/actions/onboarding-action.ts:82` | `inboxLimit` from google-connect is ignored, so a full account sees "Allow Gmail access" instead of the inbox-limit notice. | Add `inboxLimit` to GoogleConnectDto and handle it first. |
| M27 | `src/components/AuthLayout/index.tsx:80` | Accounts created with Apple (often Hide My Email) cannot sign in on Android, and forgot-password returns USE_SOCIAL_LOGIN. | Add the Apple web flow on Android, or a set-password-by-email path. At minimum, add a FAQ. |
| M28 | `src/screens/List/index.tsx:98`, `list-action.ts:16` | All pages are fetched one after another, and every row renders in a ScrollView (only AiChat uses FlatList). 500 to 1000 records means jank on low-end Android. | SectionList/FlatList with a debounced search. Lazy paging for Alerts and Payments. |
| L | various | An exception inside onDone shows the raw JS message and marks a committed POST as failed (`request-handler.ts:30`). Onboarding polls every 1 s with setInterval and no in-flight guard (`Onboarding/index.function.ts:103`). A stale Detail response leaves a spinner with no retry (`detail-action.ts:37`). The iOS Keychain session survives an uninstall (`session-token.ts:21`). Profile PII is stored in unencrypted MMKV (`store.ts:22`). Payments and mutations re-read everything (`payments-action.ts:23`). Alerts re-downloads its history with offset paging that can duplicate rows (`alerts-action.ts:17`). Detail shows "Invalid Date" when never synced (`SubscriptionDetail/index.tsx:136`). Android phones rotate into tablet layouts (`utils/tablet.ts:6`). Font scaling is unbounded inside fixed-height controls (`CustomText/index.tsx:78`). Forecast labels wrap for IDR and VND (`Home/components/Forecast.tsx:34`). An emoji first letter breaks the fallback logo (`PlatformLogo/index.tsx:27`). Android shows no banner for pushes that arrive in the foreground (`utils/push.ts:34`). | Follow-up. |

Some of these touch locked screens (for example ConnectInbox copy, RTL and orientation). Under AGENTS.md they need a scoped unlock before any change.

### Store compliance

| Sev | file:line | Issue | Fix |
|---|---|---|---|
| M29 | `src/screens/Onboarding/components/ConnectInbox/index.tsx:103` | Email content goes to Google Gemini, but the connect copy says only "uses AI" (Apple 5.1.2(i), Gmail Limited Use). `checklist:50` is unticked. | Name Google Gemini before Connect (needs a scoped unlock of a locked screen). |
| M30 | `android/app/src/main/AndroidManifest.xml` (merged) | Firebase merges in AD_ID and ADSERVICES permissions. If the Play declaration says "No", the release is blocked. | Remove them with `tools:node="remove"`, or declare "Yes, analytics". |
| M31 | `ios/Renewless/PrivacyInfo.xcprivacy:45` | `NSPrivacyCollectedDataTypes` is empty, but the app collects email, name, audio, photos, email content, crash and usage data. | Fill it in to match the App Privacy form. |
| M32 | `android/app/debug.keystore` vs the production `assetlinks.json` and OAuth client | Production trusts the **public** RN debug key, so anyone can build a `com.renewless` APK that gets the Renewless Google consent screen, Gmail scope included. | Remove the debug fingerprint from the production Firebase app and assetlinks.json. Use a separate debug project or applicationIdSuffix. |
| L | various | `aps-environment` is `development` in the committed entitlements; check the exported IPA (`Renewless.entitlements:6`). The unused `fetch` background mode should be removed (`Info.plist:94`). Android phones are not locked to portrait. The support and deletion contact is a gmail.com address. The Firebase API keys need app restrictions in GCP. | Check while preparing the release. |

### Docs

| Sev | file:line | Issue | Fix |
|---|---|---|---|
| L | `product-specification.md:15` | Says "2 Gmail inboxes". The code counts any provider, and disconnected inboxes keep using a slot for good. | Correct the wording. |
| L | `api-mobile-contract.md:507,473,~504,309` | Stale notes: trial start gap, "not run end to end", DELETE /me inputs (no microsoft), manageUrl null, uploads "deferred". | Replace with the current behaviour. |
| L | `backend-plan.md:97` | deviceId is described as a keychain UUID; the app sends IDFV/ANDROID_ID. | Align with the contract. |
| L | `backend-plan.md:82`, `api-mobile-contract.md:233` | The code catalogue does not list `VALIDATION_ERROR`. | Unify on `VALIDATION`. |
| L | Renewless-mobile `AGENTS.md` | Refers to `src/config/mock-data.ts`, which no longer exists. | Remove the sentence (policy text; ask the user). |

The wire contract itself is clean: every client endpoint and DTO field exists in the backend.

### Infra / production

| Sev | file:line | Issue | Fix |
|---|---|---|---|
| M33 | `Renewless-backend/deploy/start.sh:14` | `export "$name=$(secret ...)"` hides a failed Secret Manager read, so Node starts with empty OAuth, FCM, Gemini, SMTP or encryption secrets and `/v1/health` still reports OK. Reproduced in bash. | `val=$(secret "$name") \|\| exit 1; [ -n "$val" ] \|\| exit 1`, plus validating required secrets at boot. |
| M34 | `Renewless/docs/backend-plan.md:9`, `pre-deployment-checklist.md:20-23` | Production and local development share the `renewless` database. Atlas allows 0.0.0.0/0, and the local `.env` runs workers by default (`config/index.ts:66`), which would send duplicate reminders and scans. Test data has not been wiped. | Give development its own database, set `WORKERS=off` locally, restrict Atlas to the VM IP, and wipe test data before real users arrive. |
| M35 | `Renewless-backend/deploy/README.md:3` | One e2-small VM (2 GB) runs one Node process that handles HTTP, workers, scans and 15 MB uploads together. Each deploy means a few seconds of downtime, from a self-hosted runner. | At least an e2-medium for launch. Later, a separate worker process. |
| M36 | `Renewless-backend/.github/workflows/deploy.yml:18` | CI runs `yarn install` with lifecycle scripts on the developer's Mac, which also holds owner-level gcloud credentials and the Android upload keystore. | `--ignore-scripts`, or a GitHub-hosted runner with Workload Identity. |
| — | | Scale-specific findings are in section 4. | |

Production probe passed: TLS and HSTS, no stack traces, 401s on protected routes, a strict CORS allowlist, and live `/privacy`, `/terms`, `/support/` and `/delete-account/` pages with Gmail Limited Use, Gemini and deletion content.

## 4. Scaling risk

Production is one e2-small VM with one Node process behind Caddy, not Cloud Run. Because of that, the in-memory rate limiter and lock are correct today. They break as soon as more than one instance runs.

| Users | What breaks first |
|---|---|
| **Launch to 10k** | Memory spikes from parallel uploads or PDF chat (about 50 MB per PDF turn, with M1 the trigger). A launch-day spike in Gmail connects causes Gemini 429s: each initial scan fires up to 30 Gemini calls in parallel with no global cap, and one failed batch throws away the whole scan, which is billed again on retry (`extraction.ts:136`). Flex scans that run past 20 minutes without a heartbeat are killed while still billing (`gemini.ts:32`). Every deploy or OOM strands scans and in-flight reminders (M3, M4). |
| **100k** | Admin "All users" push fails at about 95k devices because every token goes into one Mongo document (16 MB BSON limit; reproduced at 100k), and `lastUpdatePushAt` is already set, so a retry skips everyone for 24 h (`push.ts:201-203`). Admin and push filters load `distinct()` id lists into memory with no index on `connectors.status` (`admin.ts:202`, `push.ts:68`). The admin users search is an unanchored regex, so every keystroke scans the collection. Onboarding polls at 1 request/second per user. |
| **1M** | Reminder throughput: batches of 20 at about 100 sends/s means a 09:00-local peak of about 330k jobs takes about 55 minutes to drain, and anything later than 60 minutes is skipped silently (`reminders.ts:238`); this is an estimate. `distinct` results go over 16 MB at about 800k ids. A single VM cannot hold the load. Moving to multiple instances first needs the lock and rate limiter moved into Mongo or Redis, and workers split out. |

Order of fixes: M1 and M4 now; a Gemini semaphore, then 429 backoff, then a heartbeat timer before marketing pushes; batched reminder sends with `sendMany` and a cursor-based broadcast before about 50k users; a `{status, userId}` index on connectors.

## 5. Checks run

| Check | Result |
|---|---|
| Backend `npm test` | **Pass**: 254/254 (run by 3 audits) |
| Backend `npm run typecheck` | **Pass** |
| Backend `npm run lint` | **Not run** |
| Backend integration subset (gmail/outlook/push/chat) | **Pass**: 72/72 (providers are mocked) |
| Backend live fuzz (87 routes, about 8k hostile requests, local) | 1 real 500 (non-Latin platform name, M7), no hangs, every error used the correct envelope |
| Backend concurrency, IDOR, mass assignment, NoSQL injection (local) | **Pass**: idempotency, revisions, conversation cap, cross-user 404s, ignored extra fields |
| Backend upload memory test (local) | **Fail**: 72 → 795 MB (M1) |
| Push broadcast size test (local) | **Fail** at 100k tokens (BSON 16 MB) |
| Mobile `npx tsc --noEmit` | **Pass** |
| Mobile `yarn jest` | **Pass**: 26 suites, 83 tests (one worker leaked an open handle) |
| Admin `tsc`, `oxlint`, `vite build` | **Pass** (same bundle hash as the committed dist) |
| `npm audit` / `yarn audit` (prod deps) | Backend: 3 high, 8 moderate, 1 low (mongoose and body-parser). Admin: 0. Mobile: 2 high (grpc-js, not reachable) |
| Git history secret scan (5 repos) | Clean; only the expected Firebase API keys |
| Production probe (GET/HEAD/OPTIONS only) | Pass, except: no CSP or frame headers on the admin site, and the debug key is trusted in assetlinks |

## 6. Not covered (manual work left)

- No real-device runs (iPhone, iPad portrait and landscape, Android phone and tablet, foldables): RTL, Dynamic Type, landscape and slow-network behaviour were traced from code only.
- No signed release AAB or IPA was built, and nothing was uploaded to App Store Connect or Play. B1, B5 and the iPad and closed-test items need that path.
- Real Gmail and Outlook data: connectors were stubbed. Real header ordering for Outlook (M16), real receipts, refunds and trial charges were not tested.
- Real Gemini, FCM/APNs, SMTP, Apple and Google revoke behaviour: all were stubbed or taken from documentation.
- Account deletion and logout were skipped in the live run. Apple deletion has never been tested on iOS.
- Production state could not be seen: the VM `app.env` (B7), the Google Cloud consent and CASA status (B6), API key restrictions, Atlas users and network rules, and the Play account type.
- Payments and monetization: v1 is free, so no purchase flows exist to test.
- Load or throughput testing at real user counts: the scaling numbers in section 4 are estimates.
- Widgets on device, and push in the foreground and background on both platforms (QA-PLAN suites).
