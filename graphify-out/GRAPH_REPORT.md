# Graph Report - Renewless-mobile  (2026-11-17)

## Corpus Check
- 368 files · ~134,332 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 54 file(s) not represented in the graph (top: .ttf 15, .xml 13, (none) 5)

## Summary
- 2067 nodes · 8031 edges · 94 communities (74 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0fdb9eb0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- API DTOs & Request Handler
- SIZES
- icons/index.ts
- RowView
- store.ts
- requestHandler
- adapters.ts
- detail-action.ts
- CustomText/index.tsx
- navigate
- Container
- CustomButton
- ListDialogs.tsx
- onboarding-action.ts
- Dev Dependencies
- theme.ts
- InputField/index.tsx
- Runtime Dependencies
- alerts-action.ts
- Auth.test.tsx
- Redux Types & Slices
- iOS Widget Models
- Icons/index.tsx
- YourSubscriptions/index.tsx
- AiChat/index.function.ts
- auth-action.ts
- service.ts
- RenewlessWidgetProvider.kt
- endSession.ts
- Home/index.tsx
- @reduxjs/toolkit
- SizedBox
- ConnectInbox/index.tsx
- Payments Utils
- Calendar/index.tsx
- MessageRow/index.tsx
- ai-consent.test.ts
- outlook-login.test.ts
- Profile/index.tsx
- Calendar Month Grid
- Project Working Rules
- ReminderSettings/index.tsx
- Profile/index.function.ts
- YourSubscriptions/index.tsx
- Welcome/index.tsx
- Canonical Doc Owners
- iOS AppDelegate
- App.tsx
- iOS Widget Bridge
- QA Plan & Contracts
- Store Compliance Tests
- receipts-action.ts
- Detail & List Slices
- http-provider.ts
- Release Audit 16 Nov
- Tab Navigator
- outlook-connect.test.ts
- CustomText/index.tsx
- react-native-haptic-feedback
- iOS SceneDelegate
- Release Blockers & Gaps
- Countries & Phone
- Android MainActivity
- iOS Native Imports
- React Native Delegate
- sync-locked-inbox.test.ts
- Metro Config
- receipt-file.ts
- Persisted Storage
- payments-action.ts
- alerts-slice.ts
- onboarding_icons.ts
- TS Config
- SpendRows/index.tsx
- constant-slice.ts
- status_colors.ts
- platform_logos.ts
- calendar-slice.ts
- dashboard-slice.ts
- widget_icons.ts
- ContactUs/index.function.ts
- ai-draft.ts
- logo_mark.ts

## God Nodes (most connected - your core abstractions)
1. `react-native` - 188 edges
2. `RowView()` - 168 edges
3. `COLORS` - 162 edges
4. `SIZES` - 161 edges
5. `CustomText()` - 142 edges
6. `react` - 86 edges
7. `fonts` - 84 edges
8. `CustomButton()` - 82 edges
9. `requestHandler()` - 79 edges
10. `useAppSelector` - 71 edges

## Surprising Connections (you probably didn't know these)
- `USE_MOCK_API = __DEV__ (src/config/api.ts)` --conceptually_related_to--> `API integration pattern (http-provider + requestHandler + onDone)`  [AMBIGUOUS]
  qa/QA-PLAN.md → AGENTS.md
- `run()` --calls--> `requestHandler()`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/redux/request-handler.ts
- `docs/design-system.md (Design system)` --conceptually_related_to--> `Raleway SIL Open Font License 1.1`  [INFERRED]
  AGENTS.md → src/assets/fonts/OFL.txt
- `busy()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/google-connect-retry.test.ts → src/api_services/http-provider.ts
- `fails()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/api_services/http-provider.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **React Native implementation rules (size, layout, navigation, colors, hooks, API)** — agents_strict_size_rule, agents_phone_tablet_together, agents_layout_component_rules, agents_navigation_service_rule, agents_colors_theme_rule, agents_hook_return_rule, agents_api_integration_pattern, agents_redux_file_naming [EXTRACTED 1.00]
- **Release blockers B1-B7 from the 16 November audit** — qa_runs_2026_11_16_release_audit_b1_play_signing_sha1, qa_runs_2026_11_16_release_audit_b2_record_audio, qa_runs_2026_11_16_release_audit_b3_decimal_comma, qa_runs_2026_11_16_release_audit_b4_apple_revoke, qa_runs_2026_11_16_release_audit_b5_purpose_strings, qa_runs_2026_11_16_release_audit_b6_google_oauth_verification, qa_runs_2026_11_16_release_audit_b7_microsoft_env [EXTRACTED 1.00]
- **Design lock governance (freeze, lock register, Studio badge map, doc sync)** — agents_screen_design_freeze, agents_product_screens_doc, agents_screendesignlocks_badge_map, agents_documentation_synchronization [INFERRED 0.85]

## Communities (94 total, 20 thin omitted)

### Community 0 - "API DTOs & Request Handler"
Cohesion: 0.06
Nodes (61): AiUsageDto, AlertsDto, ChallengeDto, GoogleConnectDto, OutlookConnectDto, PaymentsSummaryDto, ScanImportDto, SessionDto (+53 more)

### Community 1 - "SIZES"
Cohesion: 0.07
Nodes (28): react-native, Props, styles, Props, styles, Props, styles, Props (+20 more)

### Community 2 - "icons/index.ts"
Cohesion: 0.09
Nodes (34): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+26 more)

### Community 3 - "RowView"
Cohesion: 0.08
Nodes (75): ConfirmDialog(), CustomText(), AnimatedPath, Icons(), ImagePreview(), InfoTooltip(), MenuGroup(), PhoneInputField() (+67 more)

### Community 4 - "store.ts"
Cohesion: 0.07
Nodes (22): registerPush(), savePushToken(), getDashboard(), getHomeData(), AppDispatch, constant_reducer, persisted_reducer, root_reducer (+14 more)

### Community 5 - "requestHandler"
Cohesion: 0.07
Nodes (52): fromGmailSelection(), toGmailScan(), toInbox(), apiServices, connectGmailInbox(), connectInbox(), connectOutlookInbox(), day() (+44 more)

### Community 6 - "adapters.ts"
Cohesion: 0.06
Nodes (61): categories, categoryName(), dayLabel(), FORM_TO_BACKEND, inboxSource(), logo_urls, logoKey(), platformBySubscription (+53 more)

### Community 7 - "detail-action.ts"
Cohesion: 0.05
Nodes (69): categoryId(), fromCycle(), fromReminder(), hasCategories(), toSubscriptionBody(), FieldError(), Props, styles (+61 more)

### Community 8 - "CustomText/index.tsx"
Cohesion: 0.10
Nodes (31): benefit_check_icon, Props, Props, styles, Props, fonts, Props, WAVE (+23 more)

### Community 9 - "navigate"
Cohesion: 0.12
Nodes (28): navigate(), formWide(), login(), logoutUser(), outlookLogin(), signup(), socialLogin(), startSession() (+20 more)

### Community 10 - "Container"
Cohesion: 0.10
Nodes (46): Container(), Header(), busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot(), StateView() (+38 more)

### Community 11 - "CustomButton"
Cohesion: 0.10
Nodes (44): AuthDivider(), AuthFooterLink(), AuthLayout(), OUTLOOK_SOCIAL_ICON, Props, SocialButtons(), styles, CustomButton() (+36 more)

### Community 12 - "ListDialogs.tsx"
Cohesion: 0.10
Nodes (32): DialogCard(), Box(), ListDialogs(), SortDialog(), StatusDialog(), ListController, ListRoute, useList() (+24 more)

### Community 13 - "onboarding-action.ts"
Cohesion: 0.11
Nodes (14): fromScanCandidate(), isAuthExpired(), toScanStatus(), editOnboardingCandidate(), finishOnboarding(), getOnboardingScan(), retryOnboardingScan(), saveOnboardingFinds() (+6 more)

### Community 14 - "Dev Dependencies"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 15 - "theme.ts"
Cohesion: 0.10
Nodes (18): Props, Props, styles, styles, Props, styles, Props, styles (+10 more)

### Community 16 - "InputField/index.tsx"
Cohesion: 0.32
Nodes (4): Props, styles, PLACEHOLDERS, styles

### Community 17 - "Runtime Dependencies"
Cohesion: 0.04
Nodes (48): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0 (+40 more)

### Community 18 - "alerts-action.ts"
Cohesion: 0.10
Nodes (34): fromReminderSettings(), toAlert(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount(), getReminderSettings() (+26 more)

### Community 19 - "Auth.test.tsx"
Cohesion: 0.12
Nodes (7): authSlice, initial_state, requests, AuthRequest, AuthState, mockBackend, Tree

### Community 20 - "Redux Types & Slices"
Cohesion: 0.09
Nodes (24): initial_state, onboardingSlice, AuthResponse, Cycle, Gender, GmailScanStatus, GoogleConnection, HomePlatformSpend (+16 more)

### Community 21 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 22 - "Icons/index.tsx"
Cohesion: 0.12
Nodes (14): chevron_right_icon, OPTIONS, Props, styles, Props, styles, Props, PROVIDERS (+6 more)

### Community 23 - "YourSubscriptions/index.tsx"
Cohesion: 0.12
Nodes (38): check_dark_icon, AppSheet(), CandidateSheet(), ChangesSheet(), Field(), GmailSheets(), InboxSheet(), Props (+30 more)

### Community 24 - "AiChat/index.function.ts"
Cohesion: 0.11
Nodes (25): focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), syncAiConsent() (+17 more)

### Community 25 - "auth-action.ts"
Cohesion: 0.08
Nodes (27): toProfile(), resetRoot(), beginSession(), signup_codes, syncAccount(), timezone(), endSession(), AuthIntent (+19 more)

### Community 26 - "service.ts"
Cohesion: 0.08
Nodes (48): @react-navigation/native, @react-navigation/native-stack, toCalendarMonth(), NavigateArgs, popTo(), RootParamList, TAB_NAMES, forgotPassword() (+40 more)

### Community 27 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 29 - "Home/index.tsx"
Cohesion: 0.19
Nodes (18): AddChoiceLinks(), AddOptions(), AddSheet(), Props, ChooseInboxSheet(), Props, InboxProviders(), Forecast() (+10 more)

### Community 30 - "@reduxjs/toolkit"
Cohesion: 0.13
Nodes (13): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, inboxSlice, initial_state, Key, initial_state, listSlice, initial_state (+5 more)

### Community 31 - "SizedBox"
Cohesion: 0.08
Nodes (46): OnboardingTitle(), Props, Caption(), GmailRecoveryArt(), InboxLine(), Props, RecoveryFooter(), RecoveryView() (+38 more)

### Community 32 - "ConnectInbox/index.tsx"
Cohesion: 0.22
Nodes (4): CONNECT_LABELS, Props, TRUST_ROWS, styles

### Community 33 - "Payments Utils"
Cohesion: 0.23
Nodes (18): getPayments(), EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents() (+10 more)

### Community 34 - "Calendar/index.tsx"
Cohesion: 0.13
Nodes (11): chevron_down_icon, close_icon, Props, styles, Frame, Props, styles, LEGEND (+3 more)

### Community 35 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 36 - "ai-consent.test.ts"
Cohesion: 0.20
Nodes (7): put(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 37 - "outlook-login.test.ts"
Cohesion: 0.10
Nodes (16): ApiError, busy(), grant, mockPost, actions, connector, grant, mockDeleteMe (+8 more)

### Community 38 - "Profile/index.tsx"
Cohesion: 0.11
Nodes (18): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+10 more)

### Community 39 - "Calendar Month Grid"
Cohesion: 0.36
Nodes (5): dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 40 - "Project Working Rules"
Cohesion: 0.17
Nodes (6): AGENTS.md - Renewless project working rules, src/screens/index.ts screens barrel, Section-by-section native frontend workflow, iOS WidgetKit and Android AppWidget, M21 Stale response after logout writes into Redux and widget, Mobile findings M19-M28 (401 handling, logout races, idempotency, RTL)

### Community 41 - "ReminderSettings/index.tsx"
Cohesion: 0.13
Nodes (15): react, react-native-safe-area-context, option_check_icon, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT (+7 more)

### Community 42 - "Profile/index.function.ts"
Cohesion: 0.10
Nodes (22): openLegal(), PRIVACY_URL, TERMS_URL, changePassword(), MAX_INBOXES, updateProfile(), initial_state, profileSlice (+14 more)

### Community 43 - "YourSubscriptions/index.tsx"
Cohesion: 0.16
Nodes (21): MonthGrid(), CONFETTI_COLORS, PIECES, Props, ReadyArt(), ReadyToGoBody(), HALO_SIZE, styles (+13 more)

### Community 44 - "Welcome/index.tsx"
Cohesion: 0.32
Nodes (5): netflix_logo, BENEFITS, Props, ORBIT_SIZE, styles

### Community 45 - "Canonical Doc Owners"
Cohesion: 0.19
Nodes (10): docs/billing.md (Billing, deferred Phase 2 drafts), docs/design-system.md (Design system), Single native Onboarding host screen, docs/product-screens.md (Product screens, lock register), Design Studio screenDesignLocks badge map, Recording results, bug format and release exit criteria, README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb (+2 more)

### Community 47 - "App.tsx"
Cohesion: 0.16
Nodes (13): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, MainNavigator() (+5 more)

### Community 48 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 49 - "QA Plan & Contracts"
Cohesion: 0.20
Nodes (9): docs/api-mobile-contract.md (API/mobile contract), Gmail-only confirmed-payment pipeline, src/config/mock-data.ts (Onboarding scan and AI chat fixtures), QA-PLAN - pre-release testing runbook, Device matrix (iOS simulators, Pixel AVDs, real devices), Golden dataset of seeded receipts, mobile-mcp device automation, Mock scenarios in mock-data.ts (+1 more)

### Community 50 - "Store Compliance Tests"
Cohesion: 0.22
Nodes (11): Account deletion requirement (Apple 5.1.1(v), Play web page), AI chat consent (App Store 5.1.2(i)), PDF viewer patch-package patch (view-only on iOS), Store and compliance readiness (Apple, Google Play, Google OAuth/CASA), Test suites 6.1-6.11 (auth, onboarding, home, list, calendar, payments, alerts, AI chat, profile, widgets, cross-cutting), B2 Android RECORD_AUDIO permission before recording, B3 Decimal-comma amounts rejected (isValidAmount), B4 Sign in with Apple token revocation on delete (+3 more)

### Community 51 - "receipts-action.ts"
Cohesion: 0.43
Nodes (6): toReceipt(), getAllReceipts(), getReceipts(), openFile(), ReceiptItem, viewReceiptPdf()

### Community 52 - "Detail & List Slices"
Cohesion: 0.33
Nodes (5): detailSlice, initial_state, Key, DetailState, SubscriptionDetail

### Community 53 - "http-provider.ts"
Cohesion: 0.11
Nodes (19): client, del(), newKey(), patch(), pending_keys, postLong(), request(), upload() (+11 more)

### Community 54 - "Release Audit 16 Nov"
Cohesion: 0.24
Nodes (10): gmail.readonly restricted scope and OAuth testing limits, Release audit 16 November 2026, Admin website findings M18 (session, CSP, MFA), B6 Google OAuth / CASA verification and reviewer demo account, B7 MICROSOFT_CLIENT_ID / redirect URIs for Outlook, Backend findings M1-M17 (uploads, reminders, scan staleness, OTP limits), Checks run (tests, typecheck, fuzz, audits, secret scan, prod probe), Infra findings M33-M36 (Secret Manager, shared DB, single VM, CI runner) (+2 more)

### Community 55 - "Tab Navigator"
Cohesion: 0.13
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 56 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 57 - "CustomText/index.tsx"
Cohesion: 0.10
Nodes (20): Props, styles, Props, Props, Props, styles, styles, Props (+12 more)

### Community 58 - "react-native-haptic-feedback"
Cohesion: 0.20
Nodes (6): react-native-haptic-feedback@^3.0.0, react-native-nitro-modules@^0.36.5, react-native-nitro-sound@0.2.20, react-native-haptic-feedback, react-native-nitro-modules, react-native-nitro-sound

### Community 60 - "Release Blockers & Gaps"
Cohesion: 0.22
Nodes (8): Real-data QA entry criteria, Google Gemini AI provider (paid tier, no training), Known gaps and watch items (7-8 Nov 2026), USE_MOCK_API = __DEV__ (src/config/api.ts), B1 Play App Signing SHA-1 missing (Google sign-in DEVELOPER_ERROR), Store compliance findings M29-M32 (Gemini disclosure, AD_ID, privacy manifest, debug key), Raleway SIL Open Font License 1.1, Raleway Reserved Font Name

### Community 61 - "Countries & Phone"
Cohesion: 0.47
Nodes (4): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL

### Community 63 - "iOS Native Imports"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 65 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 66 - "Metro Config"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 67 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

### Community 68 - "Persisted Storage"
Cohesion: 0.17
Nodes (9): react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-keychain, react-native-mmkv, redux-persist, mmkv, redux_storage (+1 more)

### Community 71 - "alerts-slice.ts"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 72 - "onboarding_icons.ts"
Cohesion: 0.12
Nodes (24): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_icon, edit_icon (+16 more)

### Community 73 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 75 - "SpendRows/index.tsx"
Cohesion: 0.50
Nodes (3): Props, Row, styles

### Community 77 - "constant-slice.ts"
Cohesion: 0.16
Nodes (9): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, mock_dispatch (+1 more)

### Community 79 - "platform_logos.ts"
Cohesion: 0.20
Nodes (9): duolingo_logo, figma_logo, gmail_logo, icloud_logo, notion_logo, outlook_logo, platform_logos, spotify_logo (+1 more)

### Community 80 - "calendar-slice.ts"
Cohesion: 0.40
Nodes (4): calendarSlice, initial_state, CalendarMonth, CalendarState

### Community 81 - "dashboard-slice.ts"
Cohesion: 0.40
Nodes (4): dashboardSlice, initial_state, DashboardState, HomeSnapshot

### Community 83 - "ContactUs/index.function.ts"
Cohesion: 0.19
Nodes (11): initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useContactUs(), SupportMessage, SupportState, SupportTopic (+3 more)

### Community 84 - "ai-draft.ts"
Cohesion: 0.60
Nodes (3): AiDraft, missingQuestion(), draft

## Ambiguous Edges - Review These
- `API integration pattern (http-provider + requestHandler + onDone)` → `USE_MOCK_API = __DEV__ (src/config/api.ts)`  [AMBIGUOUS]
  qa/QA-PLAN.md · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 490 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `SIZES` to `API DTOs & Request Handler`, `icons/index.ts`, `store.ts`, `requestHandler`, `detail-action.ts`, `CustomText/index.tsx`, `navigate`, `Container`, `CustomButton`, `ListDialogs.tsx`, `onboarding-action.ts`, `Dev Dependencies`, `theme.ts`, `InputField/index.tsx`, `Runtime Dependencies`, `alerts-action.ts`, `Auth.test.tsx`, `Icons/index.tsx`, `YourSubscriptions/index.tsx`, `AiChat/index.function.ts`, `auth-action.ts`, `service.ts`, `Home/index.tsx`, `SizedBox`, `ConnectInbox/index.tsx`, `Calendar/index.tsx`, `MessageRow/index.tsx`, `outlook-login.test.ts`, `Profile/index.tsx`, `ReminderSettings/index.tsx`, `Profile/index.function.ts`, `YourSubscriptions/index.tsx`, `Welcome/index.tsx`, `App.tsx`, `Tab Navigator`, `CustomText/index.tsx`, `SpendRows/index.tsx`, `constant-slice.ts`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.06093189964157706 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `Dev Dependencies`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `SIZES` be split into smaller, more focused modules?**
  _Cohesion score 0.07192982456140351 - nodes in this community are weakly interconnected._
- **Should `icons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08961593172119488 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `API integration pattern (http-provider + requestHandler + onDone)` and `USE_MOCK_API = __DEV__ (src/config/api.ts)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._