# Graph Report - Renewless-mobile  (2026-11-16)

## Corpus Check
- 365 files · ~131,927 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 54 file(s) not represented in the graph (top: .ttf 15, .xml 13, (none) 5)

## Summary
- 2042 nodes · 7997 edges · 96 communities (76 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 154 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `71a9c8bc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- API DTOs & Request Handler
- Icons & Help Screen
- icons/index.ts
- Shared UI Components
- adapters.ts
- requestHandler
- logoKey
- detail-action.ts
- RowView/index.tsx
- Auth Actions & Navigation
- Container
- Auth Screens
- YourSubscriptions/index.tsx
- inbox-action.ts
- Dev Dependencies
- Onboarding & Gmail Scan
- Dropdown/index.tsx
- Runtime Dependencies
- SubscriptionDetail/index.function.ts
- ApiError
- Redux Types & Slices
- iOS Widget Models
- AddOptions/index.tsx
- payments-action.ts
- AiChat/index.function.ts
- Home Widgets
- useAppSelector
- RenewlessWidgetProvider.kt
- endSession.ts
- HomeScreen
- @reduxjs/toolkit
- SizedBox
- Icons/index.tsx
- Payments Utils
- AppSheet/index.tsx
- Auth.test.tsx
- ai-consent.test.ts
- outlook-login.test.ts
- Profile/index.tsx
- Calendar Month Grid
- Project Working Rules
- ReminderSettings/index.tsx
- profile-action.ts
- ReadyToGo/index.tsx
- History
- Canonical Doc Owners
- iOS AppDelegate
- App Entry
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
- Welcome/index.tsx
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
- DialogCard
- Home/index.function.ts
- inbox-slice.ts
- onboarding_icons.ts
- TS Config
- status_colors.ts
- constant-slice.ts
- CustomButton/index.tsx
- platform_logos.ts
- @notifee/react-native
- alerts-slice.ts
- widget_icons.ts
- ContactUs/index.function.ts
- ai-draft.ts
- @react-native-documents/picker
- @react-native-firebase/analytics
- logo_mark.ts

## God Nodes (most connected - your core abstractions)
1. `react-native` - 188 edges
2. `RowView()` - 170 edges
3. `COLORS` - 162 edges
4. `SIZES` - 161 edges
5. `CustomText()` - 142 edges
6. `react` - 86 edges
7. `fonts` - 84 edges
8. `CustomButton()` - 83 edges
9. `requestHandler()` - 79 edges
10. `useAppSelector` - 71 edges

## Surprising Connections (you probably didn't know these)
- `USE_MOCK_API = __DEV__ (src/config/api.ts)` --conceptually_related_to--> `API integration pattern (http-provider + requestHandler + onDone)`  [AMBIGUOUS]
  qa/QA-PLAN.md → AGENTS.md
- `run()` --calls--> `requestHandler()`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/redux/request-handler.ts
- `docs/design-system.md (Design system)` --conceptually_related_to--> `Raleway SIL Open Font License 1.1`  [INFERRED]
  AGENTS.md → src/assets/fonts/OFL.txt
- `App()` --calls--> `loadSessionToken()`  [EXTRACTED]
  App.tsx → src/utils/session-token.ts
- `busy()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/google-connect-retry.test.ts → src/api_services/http-provider.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **React Native implementation rules (size, layout, navigation, colors, hooks, API)** — agents_strict_size_rule, agents_phone_tablet_together, agents_layout_component_rules, agents_navigation_service_rule, agents_colors_theme_rule, agents_hook_return_rule, agents_api_integration_pattern, agents_redux_file_naming [EXTRACTED 1.00]
- **Release blockers B1-B7 from the 16 November audit** — qa_runs_2026_11_16_release_audit_b1_play_signing_sha1, qa_runs_2026_11_16_release_audit_b2_record_audio, qa_runs_2026_11_16_release_audit_b3_decimal_comma, qa_runs_2026_11_16_release_audit_b4_apple_revoke, qa_runs_2026_11_16_release_audit_b5_purpose_strings, qa_runs_2026_11_16_release_audit_b6_google_oauth_verification, qa_runs_2026_11_16_release_audit_b7_microsoft_env [EXTRACTED 1.00]
- **Design lock governance (freeze, lock register, Studio badge map, doc sync)** — agents_screen_design_freeze, agents_product_screens_doc, agents_screendesignlocks_badge_map, agents_documentation_synchronization [INFERRED 0.85]

## Communities (96 total, 20 thin omitted)

### Community 0 - "API DTOs & Request Handler"
Cohesion: 0.08
Nodes (51): get(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft(), createSubscription() (+43 more)

### Community 1 - "Icons & Help Screen"
Cohesion: 0.06
Nodes (43): react-native, styles, styles, Props, styles, styles, styles, styles (+35 more)

### Community 2 - "icons/index.ts"
Cohesion: 0.09
Nodes (34): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+26 more)

### Community 3 - "Shared UI Components"
Cohesion: 0.08
Nodes (73): ConfirmDialog(), CustomText(), AnimatedPath, Icons(), ImagePreview(), PhoneInputField(), PlatformLogo(), RowView() (+65 more)

### Community 4 - "adapters.ts"
Cohesion: 0.06
Nodes (51): categories, categoryId(), dayLabel(), FORM_TO_BACKEND, fromCycle(), fromReminder(), logo_urls, platformBySubscription (+43 more)

### Community 5 - "requestHandler"
Cohesion: 0.06
Nodes (59): fromGmailSelection(), fromScanCandidate(), isAuthExpired(), toInbox(), toProfile(), toScanCandidate(), toScanStatus(), OutlookConnectDto (+51 more)

### Community 6 - "logoKey"
Cohesion: 0.14
Nodes (21): categoryName(), logoKey(), platformOf(), receiptDate(), toAiReply(), toCalendarMonth(), toChatDraft(), toCycle() (+13 more)

### Community 7 - "detail-action.ts"
Cohesion: 0.09
Nodes (31): hasCategories(), apiServices, getDashboard(), getHomeData(), cancelSubscription(), createFromForm(), createSubscription(), current() (+23 more)

### Community 8 - "RowView/index.tsx"
Cohesion: 0.10
Nodes (23): Props, Props, Props, Props, styles, THEME, PILL, styles (+15 more)

### Community 9 - "Auth Actions & Navigation"
Cohesion: 0.12
Nodes (40): goBack(), NavigateArgs, popTo(), resetRoot(), RootParamList, TAB_NAMES, changePassword(), forgotPassword() (+32 more)

### Community 10 - "Container"
Cohesion: 0.14
Nodes (36): Container(), Header(), MenuGroup(), StateView(), SubscriptionCard(), AppStack, theme, navigationRef (+28 more)

### Community 11 - "Auth Screens"
Cohesion: 0.17
Nodes (19): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), CustomButton(), stack_options, AuthStack(), Stack (+11 more)

### Community 12 - "YourSubscriptions/index.tsx"
Cohesion: 0.06
Nodes (86): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), InputField(), FieldError(), Props (+78 more)

### Community 13 - "inbox-action.ts"
Cohesion: 0.20
Nodes (11): disconnectInbox(), flag(), getImportedSubscriptions(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute (+3 more)

### Community 14 - "Dev Dependencies"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 15 - "Onboarding & Gmail Scan"
Cohesion: 0.18
Nodes (22): AddChoiceLinks(), OnboardingTitle(), Caption(), GmailRecoveryArt(), InboxLine(), Props, RecoveryFooter(), RecoveryView() (+14 more)

### Community 16 - "Dropdown/index.tsx"
Cohesion: 0.17
Nodes (11): chevron_down_icon, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles (+3 more)

### Community 17 - "Runtime Dependencies"
Cohesion: 0.04
Nodes (49): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2 (+41 more)

### Community 18 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.05
Nodes (64): fromReminderSettings(), toAlert(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount(), getReminderSettings() (+56 more)

### Community 19 - "ApiError"
Cohesion: 0.17
Nodes (12): ApiError, app_storage, clearSessionToken(), loadSessionToken(), saveSessionToken(), sessionToken(), busy(), grant (+4 more)

### Community 20 - "Redux Types & Slices"
Cohesion: 0.07
Nodes (30): authSlice, initial_state, requests, initial_state, onboardingSlice, AuthRequest, AuthResponse, AuthState (+22 more)

### Community 21 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 22 - "AddOptions/index.tsx"
Cohesion: 0.16
Nodes (10): chevron_right_icon, OPTIONS, Props, styles, Props, PROVIDERS, styles, MenuItem (+2 more)

### Community 23 - "payments-action.ts"
Cohesion: 0.33
Nodes (3): PaymentDto, getAllPayments(), getPayments()

### Community 24 - "AiChat/index.function.ts"
Cohesion: 0.10
Nodes (33): openLegal(), PRIVACY_URL, TERMS_URL, focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage() (+25 more)

### Community 25 - "Home Widgets"
Cohesion: 0.27
Nodes (9): Props, fonts, BENEFITS, CAPTIONS, DEMO_TILES, TONE_COLOR, Props, HomeController (+1 more)

### Community 26 - "useAppSelector"
Cohesion: 0.07
Nodes (50): @react-navigation/native, @react-navigation/native-stack, navigate(), getCalendarMonth(), openReceiptFile(), getSupportMessages(), markSupportRead(), AppDispatch (+42 more)

### Community 27 - "RenewlessWidgetProvider.kt"
Cohesion: 0.06
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 29 - "HomeScreen"
Cohesion: 0.19
Nodes (14): AddOptions(), AddSheet(), ChooseInboxSheet(), Props, InboxProviders(), Block(), HomeSkeleton(), Row() (+6 more)

### Community 30 - "@reduxjs/toolkit"
Cohesion: 0.11
Nodes (16): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, calendarSlice, initial_state, dashboardSlice, initial_state, initial_state, listSlice (+8 more)

### Community 31 - "SizedBox"
Cohesion: 0.09
Nodes (33): SizedBox(), CONNECT_LABELS, ConnectArt(), ConnectInboxBody(), ConnectInboxFooter(), Props, TRUST_ROWS, TrustRows() (+25 more)

### Community 32 - "Icons/index.tsx"
Cohesion: 0.12
Nodes (14): react-native-svg, Props, Props, styles, Props, styles, LEGEND, styles (+6 more)

### Community 33 - "Payments Utils"
Cohesion: 0.27
Nodes (16): EMPTY, usePayments(), MoneyTotal, PaymentRecord, alignedMonth(), cents(), defaultYear(), inPeriod() (+8 more)

### Community 34 - "AppSheet/index.tsx"
Cohesion: 0.18
Nodes (8): close_icon, Props, styles, Props, styles, Frame, Props, styles

### Community 35 - "Auth.test.tsx"
Cohesion: 0.15
Nodes (6): react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, mockBackend, Tree

### Community 36 - "ai-consent.test.ts"
Cohesion: 0.18
Nodes (8): put(), getMe(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 37 - "outlook-login.test.ts"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 38 - "Profile/index.tsx"
Cohesion: 0.11
Nodes (18): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+10 more)

### Community 39 - "Calendar Month Grid"
Cohesion: 0.33
Nodes (6): HomeEvent, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 40 - "Project Working Rules"
Cohesion: 0.17
Nodes (6): AGENTS.md - Renewless project working rules, src/screens/index.ts screens barrel, Section-by-section native frontend workflow, iOS WidgetKit and Android AppWidget, M21 Stale response after logout writes into Redux and widget, Mobile findings M19-M28 (401 handling, logout races, idempotency, RTL)

### Community 41 - "ReminderSettings/index.tsx"
Cohesion: 0.27
Nodes (5): Props, styles, DEVICE, styles, useKeyboardScroll()

### Community 42 - "profile-action.ts"
Cohesion: 0.06
Nodes (20): updateProfile(), sendSupportMessage(), initial_state, profileSlice, selectUser(), Fields, passwordErrors(), useChangePassword() (+12 more)

### Community 43 - "ReadyToGo/index.tsx"
Cohesion: 0.15
Nodes (11): check_dark_icon, Props, CONFETTI_COLORS, PIECES, Props, HALO_SIZE, styles, COPY (+3 more)

### Community 44 - "History"
Cohesion: 0.26
Nodes (9): SubscriptionRecord, filterHistory(), HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base (+1 more)

### Community 45 - "Canonical Doc Owners"
Cohesion: 0.19
Nodes (10): docs/billing.md (Billing, deferred Phase 2 drafts), docs/design-system.md (Design system), Single native Onboarding host screen, docs/product-screens.md (Product screens, lock register), Design Studio screenDesignLocks badge map, Recording results, bug format and release exit criteria, README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb (+2 more)

### Community 47 - "App Entry"
Cohesion: 0.23
Nodes (8): App(), displayName, name, busyMessage(), LoaderModal(), MainNavigator(), persistor, trackScreen()

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
Cohesion: 0.36
Nodes (7): toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), ReceiptItem, viewReceiptPdf()

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
Cohesion: 0.15
Nodes (12): InfoTooltip(), ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack (+4 more)

### Community 56 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 57 - "CustomText/index.tsx"
Cohesion: 0.12
Nodes (21): react, react-native-safe-area-context, Props, Props, styles, Props, AnimatedPath, Face() (+13 more)

### Community 58 - "Welcome/index.tsx"
Cohesion: 0.32
Nodes (5): netflix_logo, BENEFITS, Props, ORBIT_SIZE, styles

### Community 60 - "Release Blockers & Gaps"
Cohesion: 0.22
Nodes (8): Real-data QA entry criteria, Google Gemini AI provider (paid tier, no training), Known gaps and watch items (7-8 Nov 2026), USE_MOCK_API = __DEV__ (src/config/api.ts), B1 Play App Signing SHA-1 missing (Google sign-in DEVELOPER_ERROR), Store compliance findings M29-M32 (Gemini disclosure, AD_ID, privacy manifest, debug key), Raleway SIL Open Font License 1.1, Raleway Reserved Font Name

### Community 61 - "Countries & Phone"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

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

### Community 69 - "DialogCard"
Cohesion: 0.47
Nodes (6): DialogCard(), FilterDialog(), Box(), ListDialogs(), SortDialog(), StatusDialog()

### Community 70 - "Home/index.function.ts"
Cohesion: 0.11
Nodes (20): registerPush(), savePushToken(), syncTimezone(), MAX_INBOXES, store, HomeRoute, useHome(), ADMIN_SCREENS (+12 more)

### Community 71 - "inbox-slice.ts"
Cohesion: 0.33
Nodes (5): inboxSlice, initial_state, Key, InboxDetail, InboxState

### Community 72 - "onboarding_icons.ts"
Cohesion: 0.11
Nodes (25): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_icon, edit_icon (+17 more)

### Community 73 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 77 - "constant-slice.ts"
Cohesion: 0.16
Nodes (9): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, mock_dispatch (+1 more)

### Community 78 - "CustomButton/index.tsx"
Cohesion: 0.10
Nodes (15): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, Props, behavior, Props (+7 more)

### Community 79 - "platform_logos.ts"
Cohesion: 0.22
Nodes (8): duolingo_logo, figma_logo, gmail_logo, icloud_logo, notion_logo, outlook_logo, spotify_logo, INBOX_BRAND

### Community 81 - "alerts-slice.ts"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 82 - "widget_icons.ts"
Cohesion: 0.40
Nodes (3): benefit_check_icon, demo_app_icons, play_circle_icon

### Community 83 - "ContactUs/index.function.ts"
Cohesion: 0.22
Nodes (10): initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), SupportMessage, SupportState, SupportTopic, SUPPORT_MESSAGE_MAX (+2 more)

### Community 84 - "ai-draft.ts"
Cohesion: 0.60
Nodes (3): AiDraft, missingQuestion(), draft

## Ambiguous Edges - Review These
- `API integration pattern (http-provider + requestHandler + onDone)` → `USE_MOCK_API = __DEV__ (src/config/api.ts)`  [AMBIGUOUS]
  qa/QA-PLAN.md · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore`, `react_native_app_auth`, `Foundation` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Icons & Help Screen` to `API DTOs & Request Handler`, `icons/index.ts`, `requestHandler`, `RowView/index.tsx`, `Auth Actions & Navigation`, `Container`, `Auth Screens`, `YourSubscriptions/index.tsx`, `Dev Dependencies`, `Onboarding & Gmail Scan`, `Dropdown/index.tsx`, `Runtime Dependencies`, `SubscriptionDetail/index.function.ts`, `AddOptions/index.tsx`, `AiChat/index.function.ts`, `Home Widgets`, `useAppSelector`, `HomeScreen`, `SizedBox`, `Icons/index.tsx`, `AppSheet/index.tsx`, `Auth.test.tsx`, `outlook-login.test.ts`, `Profile/index.tsx`, `ReminderSettings/index.tsx`, `profile-action.ts`, `ReadyToGo/index.tsx`, `App Entry`, `Tab Navigator`, `CustomText/index.tsx`, `Welcome/index.tsx`, `Home/index.function.ts`, `constant-slice.ts`, `CustomButton/index.tsx`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **What connects `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.0783744557329463 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `Dev Dependencies`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Should `Icons & Help Screen` be split into smaller, more focused modules?**
  _Cohesion score 0.056578947368421055 - nodes in this community are weakly interconnected._
- **Should `icons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08961593172119488 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `API integration pattern (http-provider + requestHandler + onDone)` and `USE_MOCK_API = __DEV__ (src/config/api.ts)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._