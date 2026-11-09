# Renewless QA plan: pre-release testing with real data

This is the runbook for the final QA pass before Renewless ships to the App Store and Google Play. It is written for a fresh Claude Code session (or a human tester) that has not seen the earlier work. Read sections 0–3 first, then run the suites in section 6 and record results as section 9 describes.

Last updated: 8 November 2026.

---

## 0. How to use this document

1. Read `AGENTS.md`. Its rules still apply during QA:
   - The design is locked. QA **reports** problems and does not redesign screens.
   - Any fix that changes a locked screen needs the user's explicit scoped unlock first.
   - Fixes that only make the app match the approved design (layout bugs, crashes, wrong data) do not need an unlock.
   - Replies to the user are in Roman Urdu. Code, commits and documents stay in English.
   - Commits carry only the user's name. No Claude or AI attribution.
2. The approved design lives in three places:
   - the prototype: `prototypes/renewless-studio/dist/index.html#<route>`, opened in a browser;
   - the screen specs: `docs/product-screens.md`;
   - the shared rules: `docs/design-system.md`.

   The lock register at the top of `docs/product-screens.md` lists every screen and its status.
3. Backend data contracts are in `docs/api-mobile-contract.md`. Real-data checks compare the app against those contracts and against the real source data, such as the actual receipt emails.
4. Work suite by suite (section 6). For every case, record pass, fail or blocked and attach evidence, such as a screenshot path or log excerpt.
5. Do not paste real email content, personal names, card numbers or tokens into results, tickets or commits (section 5.4).

---

## 1. Scope and entry criteria

**In scope**
- Every screen and state of the iOS and Android apps.
- The iOS WidgetKit widget and the Android AppWidget.
- Notifications, deep links, permissions, accessibility, performance and security basics.
- Store-submission readiness (section 7).

**Current state, as of 8 Nov 2026**
- The frontend is complete against the locked prototype, driven by mock adapters. Development builds always use mocks (`USE_MOCK_API = __DEV__` in `src/config/api.ts`).
- The real backend, Gmail OAuth, AI provider and push delivery are **not integrated yet**.

**Real-data QA can start only when all of these are true**
- [ ] A staging backend exists and implements `docs/api-mobile-contract.md`.
- [ ] There is a way to run the app against staging (see 2.2).
- [ ] A Google Cloud project for staging exists, with the OAuth consent screen in *Testing* and QA Gmail accounts added as test users (5.1).
- [ ] The AI provider is connected in staging under a no-training, no-retention agreement.
- [ ] Push notifications are wired up (APNs key, FCM project) for staging.
- [ ] Sentry (or a similar tool) is configured with `environment=staging`, and release builds upload source maps and dSYMs.

Until then, run the **mock regression** (every suite in section 6 against the mock scenarios in 4.4). This catches layout and flow bugs early.

---

## 2. Environments and builds

### 2.1 Machines and tools
- macOS with Xcode 26+ and the iOS simulators listed in 3.1.
- Android SDK at `~/Library/Android/sdk`, with AVDs `Pixel_8` and `Pixel_7a`.
- **JDK 17** for Gradle. The default `java` is 20, so always set:
  `export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home`
- Yarn, not npm. `postinstall` runs `patch-package`.
- **After any `yarn add` or `yarn remove`, run `npx patch-package`.** `yarn remove` skips postinstall, and the PDF viewer patch (`patches/@react-native-documents+viewer+4.0.2.patch`, which makes PDFs view-only on iOS) is then lost.
- The Metro bundler normally runs in the user's own terminal (`yarn start`, port 8081). Check with `curl -s localhost:8081/status`, and do not start a second one.
- Device automation uses the **mobile-mcp** tools (section 4.1), `xcrun simctl` and `adb`.

### 2.2 Builds

| Purpose | iOS | Android |
|---|---|---|
| Mock regression (debug) | `xcodebuild -workspace ios/Renewless.xcworkspace -scheme Renewless -configuration Debug -sdk iphonesimulator -destination 'id=<SIM_ID>' -derivedDataPath ios/build/widget`, then `xcrun simctl install <SIM_ID> ios/build/widget/Build/Products/Debug-iphonesimulator/Renewless.app` | `npx react-native run-android --no-packager` with JDK 17. Run `adb reverse tcp:8081 tcp:8081` first |
| Real data (staging) | Release configuration with `.env` → `API_BASE_URL=<staging>` | `cd android && ./gradlew assembleRelease` with the staging `.env` |
| Store candidate | Archive in Xcode, upload to TestFlight | `./gradlew bundleRelease`, upload to the Play internal or closed track |

- **Gap to raise before real-data QA:** a debug build cannot talk to staging, because `__DEV__` forces mocks. Either test release builds (slower, no Fast Refresh) or ask the user to approve a separate flag, such as `USE_MOCK_API` read from `.env`. Never let a release build fall back to mocks (AGENTS.md).
- One Debug `.app` from `ios/build/widget/...` installs on **any** iOS simulator. Use this to cover several screen sizes without rebuilding.
- Release signing:
  - iOS: team `7K3NY3SR6K`. App ID `com.renewless`, widget `com.renewless.RenewlessWidget`, App Group `group.com.renewless`.
  - Android: `android/keystore.properties` and a `.jks` file. **Never commit either.**

---

## 3. Device matrix

### 3.1 iOS

| Device | Screen (pt) | Why |
|---|---|---|
| iPhone SE (3rd gen), simulator "QA iPhone SE" `6914DF57-C5D9-4F1F-B61E-374429C9A4F9` | 375 × 667 | Smallest supported. Short height, Touch ID, no Dynamic Island |
| iPhone 17e, `63FFA267-0AC0-4018-88A7-8E87B7F40977` | 390 × 844 | Common small modern size |
| iPhone 17, `425B1C16-9A43-438D-BCCF-4D9255995AF3` | 402 × 874 | Mainstream |
| iPhone 18 Pro Max, `0742CBDF-3E35-4F35-9B6C-2FA5CAB65BC8` (iOS 27.0, slow) | 440 × 956 | Largest. Holds sample PDFs in Files › Downloads |
| **Real iPhone** (the user's) | n/a | Required for haptics, the App Group on a signed build, push, Face ID, performance |
| iOS 17.x device or simulator | n/a | Oldest OS for the widget (`iOS 17.0` deployment target on the extension) |

If the SE simulator has been deleted, create it again:
`xcrun simctl create "QA iPhone SE" com.apple.CoreSimulator.SimDeviceType.iPhone-SE-3rd-generation com.apple.CoreSimulator.SimRuntime.iOS-27-2`
If a new simulator shows "No script URL provided", terminate and relaunch the app once.

### 3.2 Android

| Device | Why |
|---|---|
| AVD `Pixel_8` (Android 16, 411 dp wide) | Main emulator, edge-to-edge, notification permission |
| `Pixel_8` with `adb shell wm density 480` (≈360 dp wide) | Small-phone layout. **Reset afterwards with `adb shell wm density reset`** |
| AVD `Pixel_7a` | Second size |
| Real Samsung (One UI) | Different launcher and widget behaviour, battery optimisation |
| Android 7–9 device or AVD (API 24–28) | Oldest supported OS (minSdk 24) |
| Tablet AVD | Layout sanity check only |

Emulator tips:
- Turn off handwriting mode, or the keyboard opens as a stylus toolbar: `adb shell settings put secure stylus_handwriting_enabled 0`.
- Dismiss the dev LogBox toast ("Open debugger to view warnings") before judging bottom-of-screen layout, because it covers the tab bar. Tap its × at roughly (993, 2210) on Pixel 8.

---

## 4. Tools and techniques

### 4.1 mobile-mcp (device automation)
- Start with `mobile_list_available_devices`. Android device IDs are AVD names (`Pixel_8`), not `emulator-5554`.
- Prefer `mobile_list_elements_on_screen` (exact coordinates and labels) over screenshots for finding tap targets.
- **Screenshots often lag one step behind**, especially on the 18 Pro Max and the emulator. Wait 2–4 s and take another screenshot before calling something a bug.
- Typing into a field sometimes fails if the tap lands during an animation. Tap the field again, then `mobile_type_keys`.
- Sheets and modals animate slowly on the 18 Pro Max simulator. Wait about 2 s after opening one.

### 4.2 Useful shell commands
- Deep link:
  - iOS: `xcrun simctl openurl <SIM> renewless://subscription/sub-duolingo`
  - Android: `adb shell am start -a android.intent.action.VIEW -d "renewless://subscription/sub-duolingo" com.renewless`
- Read the widget snapshot:
  - iOS: `plutil -p "$(xcrun simctl get_app_container <SIM> com.renewless group.com.renewless)/Library/Preferences/group.com.renewless.plist"`
  - Android: `adb shell run-as com.renewless cat shared_prefs/renewless_widget.xml`
- Write a test widget snapshot on iOS, for example a passed date or `more`:
  `xcrun simctl spawn <SIM> defaults write "<container>/Library/Preferences/group.com.renewless" widget_snapshot -string '{"version":1,"more":2,"event":{...}}'`
- Notification permission state on Android: `adb shell dumpsys package com.renewless | grep POST_NOTIFICATIONS`
- Crashes: iOS through `mobile_list_crashes`; Android through `adb logcat -d | grep -iE "FATAL|ReactNativeJS"`.

### 4.3 Data reset
- The mock repository lives in memory. Restarting the app resets it to fixtures. Onboarding saves replace the fixture account until the next restart.
- Reset the one-time prompts by reinstalling the app (`constant.widget_prompt_seen` and `splash_seen` are persisted).

### 4.4 Mock scenarios (`src/config/mock-data.ts`)
Change one value, reload the app, test, then **restore the default**.

| Key | Values (default first) | Covers |
|---|---|---|
| `home_scenario` | account, two_events, multiple_events, quiet, empty, error | Home event tabs, See all → Upcoming, Calendar day (multiple_events), empty and error states |
| `payments_scenario` | receipts, none | Payments empty; Home and Detail with no receipts |
| `alerts_scenario` | sent, empty | Alerts empty |
| `gmail_scan_scenario` | found, nothing, interrupted | Gmail review, nothing found, interrupted |
| `scan_scenario` / `connect_scenario` | found / granted … | Onboarding scan and connect outcomes |
| `inbox_scenario` | synced, reconnect, sync_fails | Connected inbox states |
| `profile_inbox_scenario` | connected, none | Profile with no inbox |

Sample login: `alex@example.com` / `sample123`.

---

## 5. Test accounts and real data

### 5.1 Google / Gmail
- `gmail.readonly` is a **restricted** scope. Until the app passes Google verification and the CASA assessment, the consent screen stays in Testing:
  - there is a lifetime cap of **100 test users** that cannot be reset, so use it carefully;
  - refresh tokens **expire after 7 days**, so re-consent weekly and test the expired-token recovery (the Connected inbox reconnect state);
  - users see the "unverified app" warning.
- Use a staging Google Cloud project with its own OAuth client, separate from production.
- Create 3–5 **dedicated QA Gmail accounts**. Never use personal or customer inboxes.

### 5.2 Seeding the QA inboxes
Forward or re-send realistic receipts so each inbox has:
- monthly, yearly, quarterly and weekly plans (Netflix, Spotify, iCloud+, Duolingo, Figma, Notion, YouTube Premium, App Store / Google Play receipts);
- a free trial with a later charge, and a trial that ends without a charge;
- a price change (old → new) on the same subscription;
- two plans on one platform (for example Netflix Standard and Family);
- refunds, failed or declined payments, and cancellation confirmations (these must **not** count as Paid);
- several currencies (USD, EUR, GBP, PKR, JPY with zero decimals, KWD with three decimals) and a receipt with a comma decimal separator;
- non-English receipts;
- noise: newsletters and order shipping emails that must not become subscriptions.

### 5.3 Golden dataset
For each seeded receipt, keep a row (in a spreadsheet in the QA folder, **without** the email body) with: platform, plan, amount as a decimal string, currency, billing date (local), cycle, expected next renewal, and expected status (Paid, trial, cancelled). After every scan:
- compare the app (List, Detail, Payments, Home totals) to the golden rows;
- check that totals are per currency and that different currencies are **never** added together;
- check that dates are the local calendar date, not shifted by UTC.

### 5.4 Privacy rules for testers
- Use only QA accounts. Testers follow a data-handling agreement.
- Redact amounts and merchant names that could identify a real person in screenshots shared outside the team.
- No real email text in tickets, commits, Sentry breadcrumbs or logs.
- Delete QA data from staging on a schedule. AI requests must go to a provider with no training and no retention.

---

## 6. Test suites

Run each suite on at least: iPhone SE, iPhone 18 Pro Max, Pixel 8 and Pixel 8 at 360 dp. Run widget, haptics and push suites also on real devices. **Expected** results come from the prototype and `docs/product-screens.md`. When they disagree, the doc wins; flag the difference.

### 6.1 Auth and session
- Sign up with email and OTP; log in; wrong password message; forgot password → verify → reset.
- Google sign-in and Apple sign-in, including Apple "Hide my email". Check the Profile sign-in method label.
- The same email across providers (collision or linking behaviour as the contract defines it).
- Session expiry or a 401 from any screen → back to auth, no crash, data cleared.
- Log out → Welcome; the widget snapshot is cleared (4.2); the tab state resets.
- Delete account → the account and its data are gone (backend check), the Google token is revoked, Apple tokens are revoked, a fresh sign-up works. (App Store 5.1.1(v), Play account deletion.)
- iPhone SE: on Login, "New to Renewless? Sign up" is below the fold and reachable by scrolling. This is known and acceptable; confirm it still scrolls.

### 6.2 Onboarding and Gmail
- Welcome → Connect inbox → Google consent → scanning → Your subscriptions → Ready to go. Check every panel's footer sits above the home indicator or gesture bar.
- Consent cancelled or denied → recovery copy. Scan finds nothing, or is interrupted → recovery states. Access expired → reconnect.
- Review: select and unselect, edit a candidate, the trial review sheet, the save count matches. Only selected items are saved; saving never double-saves.
- Authenticated Gmail scan (Home + → Connect Gmail): review new and updated subscriptions, "already tracked", "Add N subscriptions".
- Real data: results match the golden dataset (5.3), and noise emails are excluded.

### 6.3 Home and related
- Next event: one event; two events (tabs); three or more (See all (N) → Upcoming grouped by date); quiet; empty account (Add manually / Connect Gmail); error with Try again; loading skeleton.
- This month (paid vs upcoming, per currency) → Payments month and This month screens.
- Top spending → Spending breakdown → Platform subscriptions. Free trials. Coming up · 6 months chart.
- The last card scrolls fully above the tab bar on every device (fixed on Android on 7 Nov).
- One-time **Add widget prompt**:
  - It appears only with ≥1 subscription and when the widget is not placed. It never appears again after any close (relaunch to confirm).
  - "Watch how to add it": the clip loops and Done returns.
  - On Android, "Add widget" opens the launcher pin dialog, and the Android steps text is shown.

### 6.4 List, Detail, Add and Edit
- List: search, Status filters dialog, Sort dialog, all statuses (active, trial, trial ended, due today, cancelled, expired, needs date), empty and no-match states.
- Detail for each status: Edit, Mark as cancelled (cancel sheet), Resume, Remove tracking → Undo toast (8 s), Reminder sheet, Notes, Price history, More on platform, Manage on website (opens the browser).
- Add form and Edit form:
  - required fields, currency dropdown, trial days, notes;
  - date fields: the iOS wheel sheet is centred; on Android the system dark dialog has mint buttons and no stray sheet;
  - keyboard never hides the active field or the Save button;
  - success haptic on a real device.

### 6.5 Calendar
- Fits without scrolling on Pro Max and Pixel 8. On iPhone SE it scrolls and the legend is reachable.
- Arrows and Today; the month picker; swipe between months; a six-row month (for example August 2026) together with a four-line event card.
- Day cells: 46 pt tall, 8 pt gaps, labels (1 due / 1 trial / 3 due) never clipped. On very narrow screens they shrink to fit.
- "Expected this month": the amount is never cut to "USD". The count reads "N events".
- Tapping a day with no event opens the Add sheet with that date; one event opens Detail; several events open Calendar day.

### 6.6 Payments and History
- Year and month filters, the chart month selection, search, the Payment details dialog → View subscription, empty, month-empty and no-match states.
- Only confirmed Gmail receipts appear. Scheduled charges are never shown as payments.
- History: cancelled and expired only, Status filters, empty states, "Last tracked prices, not confirmed payments."

### 6.7 Alerts, reminders and notifications
- Alerts list grouped Today / Yesterday / Earlier. The "Notifications are off" banner shows when permission is blocked; the paused banner shows when push is paused.
- Reminder settings: toggles, the "Remind me" multi-select, custom days, the time dialog, apply-to-existing confirm, Save.
- Device notification row:
  - "Not allowed yet" → Enable → system prompt → "Allowed on this device";
  - deny → "Off · permission needed" → Enable opens Settings.
  - Run this on Android 13+ (`POST_NOTIFICATIONS`) and on iOS.
- When push is integrated:
  - a reminder arrives at the chosen local time and lead days, in the right time zone, including across DST (US 8 Nov 2026, EU 25 Oct 2026);
  - tapping it opens the right Detail;
  - it survives a reboot, an app update and Android Doze;
  - iOS keeps at most 64 pending local notifications;
  - Android exact alarms use `SCHEDULE_EXACT_ALARM` or inexact alarms, not `USE_EXACT_ALARM`.

### 6.8 AI chat
- Text: draft card → Add subscription → Detail → back shows "View subscription".
- Voice:
  - mic permission;
  - hold to record → release to send;
  - slide left → discard with the bin animation;
  - slide up → lock → Pause / Delete / Send;
  - play, seek, 1× / 1.5× / 2× speed;
  - light haptics on start, lock, discard and send (real device).
- Image (PNG/JPG/WebP ≤ 10 MB) and PDF (≤ 20 MB): attach sheet, chip, Remove, send.
  - Image preview opens full screen.
  - The PDF opens **view-only**. On iOS there must be no Markup and no "Lock PDF"; only Search, Share, Save to Files and Print. On Android it opens read-only in another app.
- Free-message usage: the line under the header shows N of 50 left and drops by one per answered message (not for a failed send or its Retry); 10 or fewer turns amber; at 0 the line is coral, the composer is disabled with Free messages renew on [date], and Retry, the draft and Add still work. Real data: the server returns 429 `AI_MONTHLY_LIMIT` and resets on the 1st in the user's timezone.
- Keyboard: the composer stays above the keyboard on iOS **and Android** (fixed 8 Nov). Test the multi-line composer up to 4 lines.
- **Consent (App Store 5.1.2(i)):** on a fresh sign-in, opening AI chat shows Before you chat with Loop. Not now returns to the Add sheet on Home, List or Calendar and nothing is sent; How we use your data › shows the privacy notice; Agree and continue opens the chat. Turn off Settings › Use Google Gemini: AI chat asks again. Sign out and in with another account: it asks again. With real data, confirm no request reaches the AI endpoint before Agree.

### 6.9 Profile
- Edit profile:
  - name required;
  - phone country picker: a full-height sheet, the search stays fixed, flags show;
  - the number saves as `+<dial> <number>` and reopens correctly;
  - shared calling codes (+1, +7, +44) reopen as US, RU and GB;
  - date of birth, gender, Save → "Profile updated.";
  - Back discards changes.
- Change password: validation, wrong current password, success, social-only accounts.
- Connected inbox: Sync now (syncing, error, reconnect), Imported subscriptions, Disconnect confirm → "Inbox disconnected. Your saved subscriptions stay." Real data: no further Gmail reads after disconnect (backend check).
- Header gear and More › Settings both open Settings.
- Settings: Reminder settings, Use Google Gemini switch (note text changes), Add the widget → Home prompt (also after it was closed once), Change password or Sign-in method, Delete account, Privacy Policy and Terms.
- Log out dialog; Delete account flow from Settings (6.1).

### 6.10 Widgets
iOS Small and Android 2×2:
- **Add:**
  - from the gallery by searching "Renewless";
  - from the in-app prompt (Android pin);
  - the preview shows real data.
- **States:**
  - next renewal; due today (coral); trial (blue);
  - **+N** when other events share the date;
  - **Needs update** (neutral Loop, "Time to check in.") when the saved date has passed. Use a past-date snapshot (4.2);
  - **All clear** when there is no event.
- **Taps:**
  - event → Detail;
  - Needs update or All clear → Home;
  - both warm and cold start;
  - signed out → ignored.
- **Data:**
  - each Home load rewrites the snapshot;
  - logout clears it;
  - the countdown changes at local midnight without opening the app (iOS timeline; Android refreshes about every 3 h);
  - a changed amount or date animates in on iOS, and does not when Reduce Motion is on.
- **Android:** the square tile on Android 12+; system font (expected); logos only for the 7 bundled platforms, other platforms show the name only.
- **Release (real device):** the iOS App Group works on a signed release build, and the widget shows data after installing from TestFlight.

### 6.11 Cross-cutting checks
- **Layout:**
  - nothing hides behind the tab bar or the gesture bar (Container `tab_bar` on Android);
  - all five tab labels show on Android;
  - dark theme everywhere, including native dialogs;
  - long names and amounts in large currencies (for example `PKR 12,345.67`) do not overflow.
- **Accessibility:**
  - VoiceOver and TalkBack labels and focus order on every screen and on the widget;
  - Dynamic Type up to AX sizes and Android font scale 200% (nothing clipped or overlapping);
  - Reduce Motion (onboarding, the widget clip, the mascot);
  - contrast ≥ 4.5:1;
  - touch targets ≥ 44 pt (iOS) and 48 dp (Android).
- **Network:** offline at launch, airplane mode mid-request, slow network, timeouts and Retry, no duplicate writes on retry.
- **Lifecycle:** background and foreground, Android process death ("Don't keep activities"), cold start from a widget or notification, rotating the device (should stay portrait), an app update from the previous build with persisted state (Redux persist).
- **Dates and money:**
  - change the time zone mid-cycle;
  - DST boundaries; month-end and the 31st; 29 Feb;
  - 12/24-hour time;
  - non-Gregorian device calendars;
  - zero- and three-decimal currencies;
  - never sum different currencies.
- **Performance:** cold start to an interactive Home under 2 s on a mid-range Android device (release build); smooth scrolling in List and Payments; no memory growth after many chat attachments.
- **Security:**
  - tokens only in Keychain or Keystore;
  - no API or AI keys in the JS bundle or APK (`unzip -p app-release.apk | strings | grep -i key`);
  - no cleartext HTTP in release;
  - no dev menu in release;
  - no tokens or email text in logs.

---

## 7. Store and compliance readiness

Researched 8 Nov 2026. Items marked **[verify]** come from secondary sources or memory and must be confirmed before acting on them.

### 7.1 Apple
- Uploads must use Xcode 26+ with the iOS 26 SDK (required since 28 Apr 2026). <https://developer.apple.com/news/upcoming-requirements/?id=04282026a>
- **4.8:** the app offers Google sign-in, so Sign in with Apple is required. It is present.
- **5.1.1(v):** in-app account deletion that removes data and revokes Sign in with Apple tokens. <https://developer.apple.com/support/offering-account-deletion-in-your-app/>
- **5.1.2(i):** disclose, and get consent, before personal data goes to a third-party AI. Done in the app (AI chat consent, Settings switch, 8 Nov); the backend still needs to record consent (section 8). <https://developer.apple.com/app-store/review/guidelines/>
- **Privacy manifest:**
  - the app has `ios/Renewless/PrivacyInfo.xcprivacy`;
  - the widget extension has `ios/RenewlessWidget/PrivacyInfo.xcprivacy` (UserDefaults 1C8F.1, no tracking, no collection; added 8 Nov), and the app declares 1C8F.1 for the shared App Group;
  - check that every pod ships its own manifest.
- Nutrition labels must match what the app actually collects (email, name, user ID, email content, audio, photos, other content, crash data).
- **Usage strings:**
  - `NSMicrophoneUsageDescription` is present;
  - add a photo library string only if the app reads the library directly (the picker does not need one);
  - show the notification prompt only after an explanation.
- Widget App Group on both App IDs and both provisioning profiles. Test on an Archive / TestFlight build.
- **Age rating:**
  - the updated questionnaire answers are required;
  - new descriptors start 16 Nov 2026;
  - declarations are due 12 Jan 2027.
  - <https://developer.apple.com/news/?id=tlur8uvi>
- **TestFlight:** external testers need Beta App Review, and builds expire after 90 days. Provide a working demo account with seeded data for App Review (2.1).

### 7.2 Google Play
- Target API 36 for new apps and updates from 31 Aug 2026. The app targets 36, which forces edge-to-edge. <https://developer.android.com/google/play/requirements/target-sdk>
- **[verify]** 16 KB page-size support for native libraries. Check with the APK Analyzer. <https://developer.android.com/guide/practices/page-sizes>
- The Data safety form must match the app's collection.
- **Account deletion:** in-app **and** a public web page link. <https://support.google.com/googleplay/android-developer/answer/13327111>
- `POST_NOTIFICATIONS` is declared (8 Nov 2026). Do not request `READ_MEDIA_*`; use the photo picker.
- New personal developer accounts must run a **closed test with ≥ 12 testers for 14 consecutive days** before production. <https://support.google.com/googleplay/android-developer/answer/14151465>
- Give the pre-launch report test credentials and review its findings.

### 7.3 Google OAuth / Gmail (the critical path)
- Brand and restricted-scope verification needs:
  - a verified domain, a homepage and a privacy policy;
  - a demo video;
  - a scope justification.
- The CASA security assessment is yearly, and Tier 2 is likely. **[verify]** cost and time: about $540 through Google's lab, or $3–4.5k elsewhere, taking several weeks. <https://support.google.com/cloud/answer/13465431>
- **Limited Use:** Gmail data is only for user-facing features; no training, no ad use.
- Start verification early. It, together with Play's 14-day closed test, sets the launch timeline.

---

## 8. Known gaps and watch items (found 7–8 Nov 2026)

| # | Item | Severity | Owner / next step |
|---|---|---|---|
| 1 | Debug builds always use mocks (`USE_MOCK_API = __DEV__`). There is no way to point a dev build at staging | Blocks real-data QA | Ask the user: test release builds, or approve an `.env` flag |
| 2 | AI consent is device-local only (App Store 5.1.2(i) UI done 8 Nov) | Must fix before release | Backend records consent per account and AI endpoints refuse without it |
| 3 | Widget privacy manifest | Resolved 8 Nov | Check the archive in Xcode's privacy report before upload |
| 4 | Haptics and the signed-build App Group not checked on a real iPhone | Must test | Real-device run (6.4, 6.8, 6.10) |
| 5 | Play account-deletion web page does not exist yet | Play blocker | Backend and website work |
| 6 | Platform logos bundled for only 7 platforms (app and widget) | Cosmetic | Needs the backend platform catalog |
| 7 | iPhone SE: Login "Sign up" line and Calendar legend need a scroll | Accepted | Re-check only |
| 8 | Android widget uses the system font, not Raleway (launcher limitation) | Accepted | None |
| 9 | Push delivery, Gmail OAuth and the AI provider are not integrated; all such flows are mock-only | Blocks real-data QA | Backend integration |
| 10 | Mock AI always returns the same receipt draft for any image or PDF | Mock only | Real extraction on staging |
| 11 | AI provider is Google Gemini via API key. **[verify]** On the unpaid tier Google may use content to improve its products; Gmail Limited Use forbids that for Gmail data | Release blocker if Gmail content reaches Gemini | Use the paid (billing-enabled) Gemini API tier and confirm current terms; then the consent dialog can also say it is not used for training |
| 12 | Prototype 600/700 text (13 places) renders in Raleway Medium; Bold/SemiBold are not bundled | Accepted (9 Nov) | None: the prototype only loads Regular and Medium, so its bold is synthesized |

---

## 9. Recording results

- Create `qa/runs/YYYY-MM-DD-<build>.md` for each pass. Record:
  - build number and environment;
  - devices and OS versions;
  - each suite case as **PASS**, **FAIL** or **BLOCKED**, with the evidence path.
- Screenshots go in `qa/runs/<run>/screens/` (redacted per 5.4). Never commit real email content.
- **Bug format:**
  - title;
  - severity: blocker, major, minor or cosmetic;
  - device and OS; build;
  - steps; expected result (cite the doc or prototype route); actual result;
  - evidence;
  - whether the fix touches a locked screen (if yes, it needs the user's scoped unlock).
- **Exit criteria for release:**
  - zero blockers and zero majors;
  - all of section 7 done;
  - the real-device suites (6.4 haptics, 6.7 push, 6.8 voice, 6.10 widget) passed on iPhone and Android;
  - real-data golden comparison 100% correct for amounts, currencies and dates.
- **After QA:**
  - update the lock register status lines in `docs/product-screens.md` (frontend acceptance and integration status are separate from the design lock);
  - report to the user in Roman Urdu;
  - commit only when the user asks.
