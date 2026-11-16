# Graph Report - Renewless-mobile  (2026-11-16)

## Corpus Check
- 449 files · ~130,242 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 54 file(s) not represented in the graph (top: .ttf 15, .xml 13, (none) 5)

## Summary
- 2027 nodes · 7944 edges · 94 communities (66 shown, 28 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 152 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- API DTOs & Request Handler
- Icons & Help Screen
- Icon Barrel
- Shared UI Components
- DTO Adapters
- Gmail & Inbox Actions
- Alerts & Reminder Actions
- Subscription Form & Session
- AI Chat Icons
- Auth Actions & Navigation
- Screen Shell & Mascot
- Auth Screens
- Dates, Money & Detail Sheets
- Calendar & Loaders
- Dev Dependencies
- Onboarding & Gmail Scan
- Test Setup & Dropdown
- Runtime Dependencies
- Reminder Settings
- Scan Candidates & Legal
- Redux Types & Slices
- iOS Widget Models
- Onboarding Panels
- Payments & API Errors
- AI Chat Screen
- Home Widgets
- Navigation Service
- Android Widget Provider
- Session Reset
- Root Reducer & Store
- Alerts Slice
- Loop Mascot Animation
- Sheets & List
- Payments Utils
- Android Widget Module
- Payment Spend Rows
- Subscription Detail Events
- List Utils
- Inbox Providers
- Calendar Month Grid
- Project Working Rules
- iOS Widget Styling
- Contact Support
- Spending Breakdown
- History
- Canonical Doc Owners
- iOS AppDelegate
- App Entry
- iOS Widget Bridge
- QA Plan & Contracts
- Store Compliance Tests
- Receipts Screen
- Detail & List Slices
- Outlook Login Tests
- Release Audit 16 Nov
- Tab Navigator
- Help & Support Messages
- Outlook Connect Tests
- Android MainApplication
- iOS SceneDelegate
- Release Blockers & Gaps
- Countries & Phone
- Android MainActivity
- iOS Native Imports
- React Native Delegate
- NPM Scripts
- Metro Config
- Receipt File Viewer
- Persisted Storage
- Auth Slice
- Locked Inbox Sync Test
- Status Colors
- Product Updates Test
- TS Config
- Device ID
- Axios
- React Native Config
- Code Field
- Firebase Analytics
- Image Picker
- Responsive Font Size
- RN Screens
- Bottom Tabs
- Node Engine

## God Nodes (most connected - your core abstractions)
1. `react-native` - 186 edges
2. `RowView()` - 170 edges
3. `COLORS` - 161 edges
4. `SIZES` - 161 edges
5. `CustomText()` - 141 edges
6. `react` - 87 edges
7. `fonts` - 84 edges
8. `CustomButton()` - 83 edges
9. `requestHandler()` - 75 edges
10. `useAppSelector` - 71 edges

## Surprising Connections (you probably didn't know these)
- `USE_MOCK_API = __DEV__ (src/config/api.ts)` --conceptually_related_to--> `API integration pattern (http-provider + requestHandler + onDone)`  [AMBIGUOUS]
  qa/QA-PLAN.md → AGENTS.md
- `docs/design-system.md (Design system)` --conceptually_related_to--> `Raleway SIL Open Font License 1.1`  [INFERRED]
  AGENTS.md → src/assets/fonts/OFL.txt
- `App()` --calls--> `MainNavigator()`  [EXTRACTED]
  App.tsx → src/navigation/MainNavigator.tsx
- `busy()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/google-connect-retry.test.ts → src/api_services/http-provider.ts
- `typeInto()` --calls--> `InputField()`  [EXTRACTED]
  __tests__/input-field.test.tsx → src/components/InputField/index.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Release blockers B1-B7 from the 16 November audit** — qa_runs_2026_11_16_release_audit_b1_play_signing_sha1, qa_runs_2026_11_16_release_audit_b2_record_audio, qa_runs_2026_11_16_release_audit_b3_decimal_comma, qa_runs_2026_11_16_release_audit_b4_apple_revoke, qa_runs_2026_11_16_release_audit_b5_purpose_strings, qa_runs_2026_11_16_release_audit_b6_google_oauth_verification, qa_runs_2026_11_16_release_audit_b7_microsoft_env [EXTRACTED 1.00]
- **React Native implementation rules (size, layout, navigation, colors, hooks, API)** — agents_strict_size_rule, agents_phone_tablet_together, agents_layout_component_rules, agents_navigation_service_rule, agents_colors_theme_rule, agents_hook_return_rule, agents_api_integration_pattern, agents_redux_file_naming [EXTRACTED 1.00]
- **Design lock governance (freeze, lock register, Studio badge map, doc sync)** — agents_screen_design_freeze, agents_product_screens_doc, agents_screendesignlocks_badge_map, agents_documentation_synchronization [INFERRED 0.85]

## Communities (94 total, 28 thin omitted)

### Community 0 - "API DTOs & Request Handler"
Cohesion: 0.04
Nodes (103): AiUsageDto, AlertsDto, CalendarDto, CandidateDto, CategoryDto, ChallengeDto, ChatTurnDto, ConnectorDto (+95 more)

### Community 1 - "Icons & Help Screen"
Cohesion: 0.05
Nodes (43): react-native, brand_mark_paths, styles, styles, styles, styles, styles, Props (+35 more)

### Community 2 - "Icon Barrel"
Cohesion: 0.04
Nodes (78): apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon, chevron_down_icon, chevron_right_icon, close_icon (+70 more)

### Community 3 - "Shared UI Components"
Cohesion: 0.07
Nodes (86): AddOptions(), ChooseInboxSheet(), ConfirmDialog(), CustomText(), DialogCard(), AnimatedPath, Icons(), InboxProviders() (+78 more)

### Community 4 - "DTO Adapters"
Cohesion: 0.06
Nodes (63): categories, categoryId(), categoryName(), dayLabel(), FORM_TO_BACKEND, fromCycle(), fromReminder(), fromScanCandidate() (+55 more)

### Community 5 - "Gmail & Inbox Actions"
Cohesion: 0.06
Nodes (53): fromGmailSelection(), toGmailScan(), toInbox(), openLegal(), connectGmailInbox(), connectInbox(), connectOutlookInbox(), day() (+45 more)

### Community 6 - "Alerts & Reminder Actions"
Cohesion: 0.07
Nodes (47): fromReminderSettings(), toAiReply(), toAlert(), toReminderSettings(), AlertDto, getMe(), addAiDraft(), changeAiConsent() (+39 more)

### Community 7 - "Subscription Form & Session"
Cohesion: 0.07
Nodes (41): replace(), SubscriptionFormRoute, useSubscriptionForm(), BRAND_MOTION, useSplash(), useSplashReveal(), PlatformSuggestion, ScanCycle (+33 more)

### Community 8 - "AI Chat Icons"
Cohesion: 0.11
Nodes (25): pdf_icon, Props, Props, Props, Props, styles, Props, Props (+17 more)

### Community 9 - "Auth Actions & Navigation"
Cohesion: 0.10
Nodes (41): toProfile(), popTo(), resetRoot(), beginSession(), forgotPassword(), formWide(), login(), logoutUser() (+33 more)

### Community 10 - "Screen Shell & Mascot"
Cohesion: 0.12
Nodes (36): @react-navigation/native-stack, Container(), Header(), AnimatedPath, Face(), Mascot(), Props, StateView() (+28 more)

### Community 11 - "Auth Screens"
Cohesion: 0.11
Nodes (34): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), CustomButton(), InputField(), SizedBox(), Stack (+26 more)

### Community 12 - "Dates, Money & Detail Sheets"
Cohesion: 0.13
Nodes (39): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), PhoneInputField(), SubscriptionFields(), EditProfileScreen() (+31 more)

### Community 13 - "Calendar & Loaders"
Cohesion: 0.13
Nodes (32): @react-navigation/native, toCalendarMonth(), busyMessage(), LoaderModal(), UndoToast(), MainNavigator(), navigate(), getCalendarMonth() (+24 more)

### Community 14 - "Dev Dependencies"
Cohesion: 0.07
Nodes (40): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+32 more)

### Community 15 - "Onboarding & Gmail Scan"
Cohesion: 0.11
Nodes (36): edit_icon, AddChoiceLinks(), OnboardingTitle(), PlatformLogo(), SpendRow(), CandidateRow(), Caption(), GmailRecoveryArt() (+28 more)

### Community 16 - "Test Setup & Dropdown"
Cohesion: 0.08
Nodes (24): react, react-native-safe-area-context, device_bell_icon, switch_off_icon, Props, styles, Frame, Multiple (+16 more)

### Community 17 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (37): dependencies, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2, @react-native-documents/picker@12.0.3 (+29 more)

### Community 18 - "Reminder Settings"
Cohesion: 0.13
Nodes (27): getApplyCount(), useNotificationPermission(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), ReminderPreference, SentAlert (+19 more)

### Community 19 - "Scan Candidates & Legal"
Cohesion: 0.10
Nodes (19): isAuthExpired(), toScanCandidate(), toScanStatus(), updateCandidate(), PRIVACY_URL, TERMS_URL, editOnboardingCandidate(), finishOnboarding() (+11 more)

### Community 20 - "Redux Types & Slices"
Cohesion: 0.07
Nodes (29): calendarSlice, initial_state, initial_state, onboardingSlice, AuthResponse, CalendarMonth, CalendarState, Cycle (+21 more)

### Community 21 - "iOS Widget Models"
Cohesion: 0.13
Nodes (12): dayString(), parseDay(), Provider, RenewlessEntry, RenewlessWidget, .body, RenewlessWidgetView, .stateKey (+4 more)

### Community 22 - "Onboarding Panels"
Cohesion: 0.11
Nodes (26): hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon, DiscoveringFooter(), ReadyConfetti(), accessCopy(), COPY (+18 more)

### Community 23 - "Payments & API Errors"
Cohesion: 0.10
Nodes (16): toPayment(), PaymentDto, ReceiptDto, ApiError, apiServices, getAllPayments(), getAllReceipts(), getReceipts() (+8 more)

### Community 24 - "AI Chat Screen"
Cohesion: 0.11
Nodes (22): Props, focusedTab(), startAiChat(), Attachment, ChatMessage, IMAGE_TYPES, messageId(), meterLevel() (+14 more)

### Community 25 - "Home Widgets"
Cohesion: 0.15
Nodes (14): benefit_check_icon, demo_app_icons, play_circle_icon, Props, BENEFITS, CAPTIONS, DEMO_TILES, TONE_COLOR (+6 more)

### Community 26 - "Navigation Service"
Cohesion: 0.11
Nodes (20): goBack(), NavigateArgs, navigationRef, RootParamList, TAB_NAMES, selectUser(), Fields, passwordErrors() (+12 more)

### Community 28 - "Session Reset"
Cohesion: 0.09
Nodes (7): dashboardSlice, initial_state, DashboardState, HomeSnapshot, spokenMoney(), clearWidgetSnapshot(), widgetCopy()

### Community 29 - "Root Reducer & Store"
Cohesion: 0.09
Nodes (9): AppDispatch, constant_reducer, persisted_reducer, root_reducer, store, ADMIN_SCREENS, messaging, openReminder() (+1 more)

### Community 30 - "Alerts Slice"
Cohesion: 0.10
Nodes (18): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, alertsSlice, initial_state, Key, constantSlice, initial_state, inboxSlice (+10 more)

### Community 31 - "Loop Mascot Animation"
Cohesion: 0.13
Nodes (16): react-native-svg, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, Props, Props, Props, STAGES (+8 more)

### Community 32 - "Sheets & List"
Cohesion: 0.13
Nodes (12): Props, Props, styles, OUTLOOK_SOCIAL_ICON, Props, Props, styles, Props (+4 more)

### Community 33 - "Payments Utils"
Cohesion: 0.25
Nodes (17): getPayments(), EMPTY, usePayments(), MoneyTotal, PaymentRecord, alignedMonth(), cents(), defaultYear() (+9 more)

### Community 35 - "Payment Spend Rows"
Cohesion: 0.13
Nodes (14): platform_logos, Props, Props, Row, styles, NOTES, styles, EMPTY_COPY (+6 more)

### Community 36 - "Subscription Detail Events"
Cohesion: 0.22
Nodes (18): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, amountLabel() (+10 more)

### Community 37 - "List Utils"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 38 - "Inbox Providers"
Cohesion: 0.14
Nodes (10): Props, PROVIDERS, styles, Frame, Props, styles, CONNECT_LABELS, Props (+2 more)

### Community 39 - "Calendar Month Grid"
Cohesion: 0.18
Nodes (13): AddSheet(), MonthGrid(), CalendarScreen(), CalendarRoute, LEGEND, SummaryWash(), styles, HomeEvent (+5 more)

### Community 40 - "Project Working Rules"
Cohesion: 0.17
Nodes (6): AGENTS.md - Renewless project working rules, src/screens/index.ts screens barrel, Section-by-section native frontend workflow, iOS WidgetKit and Android AppWidget, M21 Stale response after logout writes into Redux and widget, Mobile findings M19-M28 (401 handling, logout races, idempotency, RTL)

### Community 41 - "iOS Widget Styling"
Cohesion: 0.18
Nodes (8): Brand, .body, Color, EventCopy, QuietView, .body, raleway(), .body

### Community 42 - "Contact Support"
Cohesion: 0.19
Nodes (11): initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useContactUs(), SupportMessage, SupportState, SupportTopic (+3 more)

### Community 43 - "Spending Breakdown"
Cohesion: 0.26
Nodes (11): SpendRows(), TrialRows(), totalsText(), SpendingBreakdownScreen(), styles, Group(), ThisMonthScreen(), totalsText() (+3 more)

### Community 44 - "History"
Cohesion: 0.25
Nodes (10): HistoryController, useHistory(), filterHistory(), HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate() (+2 more)

### Community 45 - "Canonical Doc Owners"
Cohesion: 0.19
Nodes (10): docs/billing.md (Billing, deferred Phase 2 drafts), docs/design-system.md (Design system), Single native Onboarding host screen, docs/product-screens.md (Product screens, lock register), Design Studio screenDesignLocks badge map, Recording results, bug format and release exit criteria, README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb (+2 more)

### Community 47 - "App Entry"
Cohesion: 0.21
Nodes (9): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+1 more)

### Community 48 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 49 - "QA Plan & Contracts"
Cohesion: 0.20
Nodes (9): docs/api-mobile-contract.md (API/mobile contract), Gmail-only confirmed-payment pipeline, src/config/mock-data.ts (Onboarding scan and AI chat fixtures), QA-PLAN - pre-release testing runbook, Device matrix (iOS simulators, Pixel AVDs, real devices), Golden dataset of seeded receipts, mobile-mcp device automation, Mock scenarios in mock-data.ts (+1 more)

### Community 50 - "Store Compliance Tests"
Cohesion: 0.22
Nodes (11): Account deletion requirement (Apple 5.1.1(v), Play web page), AI chat consent (App Store 5.1.2(i)), PDF viewer patch-package patch (view-only on iOS), Store and compliance readiness (Apple, Google Play, Google OAuth/CASA), Test suites 6.1-6.11 (auth, onboarding, home, list, calendar, payments, alerts, AI chat, profile, widgets, cross-cutting), B2 Android RECORD_AUDIO permission before recording, B3 Decimal-comma amounts rejected (isValidAmount), B4 Sign in with Apple token revocation on delete (+3 more)

### Community 51 - "Receipts Screen"
Cohesion: 0.31
Nodes (9): ImagePreview(), ReceiptsController, ReceiptsRoute, useReceipts(), ReceiptCard(), ReceiptsScreen(), TONE, styles (+1 more)

### Community 52 - "Detail & List Slices"
Cohesion: 0.18
Nodes (9): detailSlice, initial_state, Key, initial_state, listSlice, DetailState, ListState, SubscriptionDetail (+1 more)

### Community 53 - "Outlook Login Tests"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 54 - "Release Audit 16 Nov"
Cohesion: 0.24
Nodes (10): gmail.readonly restricted scope and OAuth testing limits, Release audit 16 November 2026, Admin website findings M18 (session, CSP, MFA), B6 Google OAuth / CASA verification and reviewer demo account, B7 MICROSOFT_CLIENT_ID / redirect URIs for Outlook, Backend findings M1-M17 (uploads, reminders, scan staleness, OTP limits), Checks run (tests, typecheck, fuzz, audits, secret scan, prod probe), Infra findings M33-M36 (Secret Manager, shared DB, single VM, CI runner) (+2 more)

### Community 55 - "Tab Navigator"
Cohesion: 0.22
Nodes (8): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack, TabParamList

### Community 56 - "Help & Support Messages"
Cohesion: 0.27
Nodes (7): MessageRow(), SUPPORT_QUESTIONS, HelpSupportScreen(), styles, openMessage(), SupportMessagesScreen(), styles

### Community 57 - "Outlook Connect Tests"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 60 - "Release Blockers & Gaps"
Cohesion: 0.22
Nodes (8): Real-data QA entry criteria, Google Gemini AI provider (paid tier, no training), Known gaps and watch items (7-8 Nov 2026), USE_MOCK_API = __DEV__ (src/config/api.ts), B1 Play App Signing SHA-1 missing (Google sign-in DEVELOPER_ERROR), Store compliance findings M29-M32 (Gemini disclosure, AD_ID, privacy manifest, debug key), Raleway SIL Open Font License 1.1, Raleway Reserved Font Name

### Community 61 - "Countries & Phone"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 63 - "iOS Native Imports"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 65 - "NPM Scripts"
Cohesion: 0.25
Nodes (8): scripts, android, ios, lint, postinstall, start, test, typecheck

### Community 66 - "Metro Config"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 67 - "Receipt File Viewer"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

### Community 68 - "Persisted Storage"
Cohesion: 0.29
Nodes (6): react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-mmkv, redux-persist, mmkv, redux_storage

### Community 69 - "Auth Slice"
Cohesion: 0.29
Nodes (5): authSlice, initial_state, requests, AuthRequest, AuthState

### Community 70 - "Locked Inbox Sync Test"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 72 - "Product Updates Test"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 73 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

## Ambiguous Edges - Review These
- `API integration pattern (http-provider + requestHandler + onDone)` → `USE_MOCK_API = __DEV__ (src/config/api.ts)`  [AMBIGUOUS]
  qa/QA-PLAN.md · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore`, `react_native_app_auth`, `Foundation` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 470 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Icons & Help Screen` to `Icon Barrel`, `Gmail & Inbox Actions`, `Alerts & Reminder Actions`, `Subscription Form & Session`, `AI Chat Icons`, `Auth Actions & Navigation`, `Screen Shell & Mascot`, `Auth Screens`, `Dates, Money & Detail Sheets`, `Calendar & Loaders`, `Dev Dependencies`, `Onboarding & Gmail Scan`, `Test Setup & Dropdown`, `Runtime Dependencies`, `Reminder Settings`, `Scan Candidates & Legal`, `Onboarding Panels`, `AI Chat Screen`, `Home Widgets`, `Session Reset`, `Loop Mascot Animation`, `Sheets & List`, `Payment Spend Rows`, `Subscription Detail Events`, `Inbox Providers`, `Calendar Month Grid`, `Spending Breakdown`, `App Entry`, `Receipts Screen`, `Outlook Login Tests`, `Tab Navigator`, `Help & Support Messages`, `Device ID`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **What connects `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.037886510363574585 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `NPM Scripts` to `Dev Dependencies`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Should `Icons & Help Screen` be split into smaller, more focused modules?**
  _Cohesion score 0.05237171574678187 - nodes in this community are weakly interconnected._
- **Why does `android` connect `NPM Scripts` to `Android Widget Provider`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `API integration pattern (http-provider + requestHandler + onDone)` and `USE_MOCK_API = __DEV__ (src/config/api.ts)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._