# Graph Report - Renewless-mobile  (2026-11-16)

## Corpus Check
- 364 files · ~131,047 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 54 file(s) not represented in the graph (top: .ttf 15, .xml 13, (none) 5)

## Summary
- 2035 nodes · 7973 edges · 96 communities (75 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 153 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7b1d58f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- API DTOs & Request Handler
- Icons & Help Screen
- icons/index.ts
- Shared UI Components
- adapters.ts
- Gmail & Inbox Actions
- alerts-action.ts
- detail-action.ts
- fonts
- Auth Actions & Navigation
- Container
- Auth Screens
- Dates, Money & Detail Sheets
- inbox-action.ts
- Dev Dependencies
- Onboarding & Gmail Scan
- Test Setup & Dropdown
- Runtime Dependencies
- Reminder Settings
- Scan Candidates & Legal
- Redux Types & Slices
- iOS Widget Models
- Onboarding Panels
- redux/request-handler.ts
- AiChat/index.function.ts
- Home Widgets
- service.ts
- Android Widget Provider
- endSession.ts
- Root Reducer & Store
- @reduxjs/toolkit
- Onboarding/index.tsx
- List/index.tsx
- Payments Utils
- Android Widget Module
- Payments/index.tsx
- Subscription Detail Events
- List Utils
- Profile/index.tsx
- Calendar Month Grid
- Project Working Rules
- iOS Widget Styling
- support-action.ts
- YourSubscriptions/index.tsx
- History
- Canonical Doc Owners
- iOS AppDelegate
- App Entry
- iOS Widget Bridge
- QA Plan & Contracts
- Store Compliance Tests
- Receipts/index.tsx
- Detail & List Slices
- http-provider.ts
- Release Audit 16 Nov
- Tab Navigator
- Container/index.tsx
- Header/index.tsx
- Android MainApplication
- iOS SceneDelegate
- Release Blockers & Gaps
- Countries & Phone
- Android MainActivity
- iOS Native Imports
- React Native Delegate
- NPM Scripts
- Metro Config
- react-native-blob-util
- Persisted Storage
- SubscriptionFields/index.tsx
- Home/index.function.ts
- ChatParts.tsx
- onboarding_icons.ts
- TS Config
- react-native-device-info
- constant-slice.ts
- CustomButton/index.tsx
- platform_logos.ts
- reminders.ts
- alerts-slice.ts
- widget_icons.ts
- support-slice.ts
- ai-draft.ts
- @react-native-documents/picker
- react-native-keychain
- logo_mark.ts

## God Nodes (most connected - your core abstractions)
1. `react-native` - 186 edges
2. `RowView()` - 170 edges
3. `COLORS` - 161 edges
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
- `busy()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/google-connect-retry.test.ts → src/api_services/http-provider.ts
- `typeInto()` --calls--> `InputField()`  [EXTRACTED]
  __tests__/input-field.test.tsx → src/components/InputField/index.tsx

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **React Native implementation rules (size, layout, navigation, colors, hooks, API)** — agents_strict_size_rule, agents_phone_tablet_together, agents_layout_component_rules, agents_navigation_service_rule, agents_colors_theme_rule, agents_hook_return_rule, agents_api_integration_pattern, agents_redux_file_naming [EXTRACTED 1.00]
- **Release blockers B1-B7 from the 16 November audit** — qa_runs_2026_11_16_release_audit_b1_play_signing_sha1, qa_runs_2026_11_16_release_audit_b2_record_audio, qa_runs_2026_11_16_release_audit_b3_decimal_comma, qa_runs_2026_11_16_release_audit_b4_apple_revoke, qa_runs_2026_11_16_release_audit_b5_purpose_strings, qa_runs_2026_11_16_release_audit_b6_google_oauth_verification, qa_runs_2026_11_16_release_audit_b7_microsoft_env [EXTRACTED 1.00]
- **Design lock governance (freeze, lock register, Studio badge map, doc sync)** — agents_screen_design_freeze, agents_product_screens_doc, agents_screendesignlocks_badge_map, agents_documentation_synchronization [INFERRED 0.85]

## Communities (96 total, 21 thin omitted)

### Community 0 - "API DTOs & Request Handler"
Cohesion: 0.05
Nodes (72): AiUsageDto, AlertsDto, ScanImportDto, SubscriptionListDto, del(), get(), patch(), post() (+64 more)

### Community 1 - "Icons & Help Screen"
Cohesion: 0.07
Nodes (35): react-native, close_icon, Props, styles, styles, Props, styles, Props (+27 more)

### Community 2 - "icons/index.ts"
Cohesion: 0.10
Nodes (27): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon (+19 more)

### Community 3 - "Shared UI Components"
Cohesion: 0.08
Nodes (65): AddOptions(), AddSheet(), Props, ConfirmDialog(), CustomText(), AnimatedPath, Icons(), ImagePreview() (+57 more)

### Community 4 - "adapters.ts"
Cohesion: 0.06
Nodes (65): categories, categoryName(), dayLabel(), FORM_TO_BACKEND, logo_urls, logoKey(), platformBySubscription, platformOf() (+57 more)

### Community 5 - "Gmail & Inbox Actions"
Cohesion: 0.06
Nodes (55): fromGmailSelection(), toInbox(), logoutUser(), connectGmailInbox(), connectInbox(), connectOutlookInbox(), getGmailInboxes(), getGmailScan() (+47 more)

### Community 6 - "alerts-action.ts"
Cohesion: 0.19
Nodes (13): fromReminderSettings(), toAlert(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getReminderSettings(), saveReminderSettings() (+5 more)

### Community 7 - "detail-action.ts"
Cohesion: 0.10
Nodes (40): categoryId(), fromReminder(), toPlatformSuggestion(), toSubscriptionBody(), getDashboard(), cancelSubscription(), createFromForm(), createSubscription() (+32 more)

### Community 8 - "fonts"
Cohesion: 0.09
Nodes (29): chevron_right_icon, OPTIONS, Props, styles, Props, Props, PROVIDERS, styles (+21 more)

### Community 9 - "Auth Actions & Navigation"
Cohesion: 0.16
Nodes (31): navigate(), popTo(), resetRoot(), changePassword(), forgotPassword(), formWide(), login(), outlookLogin() (+23 more)

### Community 10 - "Container"
Cohesion: 0.13
Nodes (41): Container(), Header(), InfoTooltip(), StateView(), SubscriptionCard(), AppStack, theme, navigationRef (+33 more)

### Community 11 - "Auth Screens"
Cohesion: 0.10
Nodes (22): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), stack_options, AuthStack(), Stack, ForgotPasswordScreen() (+14 more)

### Community 12 - "Dates, Money & Detail Sheets"
Cohesion: 0.19
Nodes (33): AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField(), MonthPicker() (+25 more)

### Community 13 - "inbox-action.ts"
Cohesion: 0.21
Nodes (10): disconnectInbox(), flag(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute, STATUS (+2 more)

### Community 14 - "Dev Dependencies"
Cohesion: 0.07
Nodes (40): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+32 more)

### Community 15 - "Onboarding & Gmail Scan"
Cohesion: 0.18
Nodes (25): AddChoiceLinks(), OnboardingTitle(), SizedBox(), Caption(), GmailRecoveryArt(), InboxLine(), Props, RecoveryFooter() (+17 more)

### Community 16 - "Test Setup & Dropdown"
Cohesion: 0.11
Nodes (17): react, react-native-safe-area-context, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT (+9 more)

### Community 17 - "Runtime Dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-config@^1.7.2, react-native-confirmation-code-field@^9.0.0 (+37 more)

### Community 18 - "Reminder Settings"
Cohesion: 0.20
Nodes (17): getApplyCount(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS, accountDisplay() (+9 more)

### Community 19 - "Scan Candidates & Legal"
Cohesion: 0.09
Nodes (29): @react-navigation/native, fromCycle(), fromScanCandidate(), isAuthExpired(), toProfile(), toScanCandidate(), toScanStatus(), openLegal() (+21 more)

### Community 20 - "Redux Types & Slices"
Cohesion: 0.07
Nodes (27): status_colors, dashboardSlice, initial_state, initial_state, onboardingSlice, AuthResponse, Cycle, DashboardState (+19 more)

### Community 21 - "iOS Widget Models"
Cohesion: 0.13
Nodes (12): dayString(), parseDay(), Provider, RenewlessEntry, RenewlessWidget, .body, RenewlessWidgetView, .stateKey (+4 more)

### Community 22 - "Onboarding Panels"
Cohesion: 0.15
Nodes (18): hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon, accessCopy(), COPY, Kind, Props (+10 more)

### Community 23 - "redux/request-handler.ts"
Cohesion: 0.10
Nodes (15): hasCategories(), receiptDate(), setCategories(), toDetail(), apiServices, getDetailData(), getCategoryList(), getAllPayments() (+7 more)

### Community 24 - "AiChat/index.function.ts"
Cohesion: 0.10
Nodes (30): focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), syncAiConsent() (+22 more)

### Community 25 - "Home Widgets"
Cohesion: 0.16
Nodes (15): Props, Props, styles, Props, BENEFITS, CAPTIONS, DEMO_TILES, TONE_COLOR (+7 more)

### Community 26 - "service.ts"
Cohesion: 0.09
Nodes (39): @react-navigation/native-stack, UndoToast(), goBack(), NavigateArgs, RootParamList, TAB_NAMES, getCalendarMonth(), getImportedSubscriptions() (+31 more)

### Community 28 - "endSession.ts"
Cohesion: 0.12
Nodes (5): initial_state, profileSlice, ProfileOverview, ProfileState, RootState

### Community 29 - "Root Reducer & Store"
Cohesion: 0.12
Nodes (4): AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 30 - "@reduxjs/toolkit"
Cohesion: 0.08
Nodes (22): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, authSlice, initial_state, requests, calendarSlice, initial_state, inboxSlice (+14 more)

### Community 31 - "Onboarding/index.tsx"
Cohesion: 0.09
Nodes (21): react-native-svg, Props, styles, CONNECT_LABELS, Props, TRUST_ROWS, styles, DiscoveringFooter() (+13 more)

### Community 32 - "List/index.tsx"
Cohesion: 0.26
Nodes (9): DialogCard(), Props, styles, Box(), ListDialogs(), SortDialog(), StatusDialog(), ListController (+1 more)

### Community 33 - "Payments Utils"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 35 - "Payments/index.tsx"
Cohesion: 0.17
Nodes (24): PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), DraftCard(), CandidateRow(), TopSpending(), PaymentChart() (+16 more)

### Community 36 - "Subscription Detail Events"
Cohesion: 0.19
Nodes (17): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, ReminderPreference (+9 more)

### Community 37 - "List Utils"
Cohesion: 0.23
Nodes (16): ListRoute, useList(), SubscriptionRecord, byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS (+8 more)

### Community 38 - "Profile/index.tsx"
Cohesion: 0.10
Nodes (27): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+19 more)

### Community 39 - "Calendar Month Grid"
Cohesion: 0.22
Nodes (10): CalendarController, CalendarRoute, EMPTY, PickerAnchor, HomeEvent, TabParamList, dayMarker(), nearestEvent() (+2 more)

### Community 40 - "Project Working Rules"
Cohesion: 0.17
Nodes (6): AGENTS.md - Renewless project working rules, src/screens/index.ts screens barrel, Section-by-section native frontend workflow, iOS WidgetKit and Android AppWidget, M21 Stale response after logout writes into Redux and widget, Mobile findings M19-M28 (401 handling, logout races, idempotency, RTL)

### Community 41 - "iOS Widget Styling"
Cohesion: 0.18
Nodes (8): Brand, .body, Color, EventCopy, QuietView, .body, raleway(), .body

### Community 42 - "support-action.ts"
Cohesion: 0.15
Nodes (12): getSupportMessages(), markSupportRead(), sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useHelpSupport(), useSupportMessage(), SupportInput (+4 more)

### Community 43 - "YourSubscriptions/index.tsx"
Cohesion: 0.12
Nodes (26): check_dark_icon, CONFETTI_COLORS, PIECES, Props, ReadyArt(), ReadyToGoBody(), ReadyToGoFooter(), HALO_SIZE (+18 more)

### Community 44 - "History"
Cohesion: 0.29
Nodes (7): HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 45 - "Canonical Doc Owners"
Cohesion: 0.19
Nodes (10): docs/billing.md (Billing, deferred Phase 2 drafts), docs/design-system.md (Design system), Single native Onboarding host screen, docs/product-screens.md (Product screens, lock register), Design Studio screenDesignLocks badge map, Recording results, bug format and release exit criteria, README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb (+2 more)

### Community 47 - "App Entry"
Cohesion: 0.14
Nodes (14): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, busyMessage() (+6 more)

### Community 48 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 49 - "QA Plan & Contracts"
Cohesion: 0.20
Nodes (9): docs/api-mobile-contract.md (API/mobile contract), Gmail-only confirmed-payment pipeline, src/config/mock-data.ts (Onboarding scan and AI chat fixtures), QA-PLAN - pre-release testing runbook, Device matrix (iOS simulators, Pixel AVDs, real devices), Golden dataset of seeded receipts, mobile-mcp device automation, Mock scenarios in mock-data.ts (+1 more)

### Community 50 - "Store Compliance Tests"
Cohesion: 0.22
Nodes (11): Account deletion requirement (Apple 5.1.1(v), Play web page), AI chat consent (App Store 5.1.2(i)), PDF viewer patch-package patch (view-only on iOS), Store and compliance readiness (Apple, Google Play, Google OAuth/CASA), Test suites 6.1-6.11 (auth, onboarding, home, list, calendar, payments, alerts, AI chat, profile, widgets, cross-cutting), B2 Android RECORD_AUDIO permission before recording, B3 Decimal-comma amounts rejected (isValidAmount), B4 Sign in with Apple token revocation on delete (+3 more)

### Community 51 - "Receipts/index.tsx"
Cohesion: 0.19
Nodes (16): toReceipt(), getSubscriptionDetail(), getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute (+8 more)

### Community 52 - "Detail & List Slices"
Cohesion: 0.33
Nodes (5): detailSlice, initial_state, Key, DetailState, SubscriptionDetail

### Community 53 - "http-provider.ts"
Cohesion: 0.07
Nodes (29): ApiError, client, newKey(), pending_keys, postLong(), request(), upload(), sendChatMessage() (+21 more)

### Community 54 - "Release Audit 16 Nov"
Cohesion: 0.24
Nodes (10): gmail.readonly restricted scope and OAuth testing limits, Release audit 16 November 2026, Admin website findings M18 (session, CSP, MFA), B6 Google OAuth / CASA verification and reviewer demo account, B7 MICROSOFT_CLIENT_ID / redirect URIs for Outlook, Backend findings M1-M17 (uploads, reminders, scan staleness, OTP limits), Checks run (tests, typecheck, fuzz, audits, secret scan, prod probe), Infra findings M33-M36 (Secret Manager, shared DB, single VM, CI runner) (+2 more)

### Community 55 - "Tab Navigator"
Cohesion: 0.25
Nodes (7): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack

### Community 56 - "Container/index.tsx"
Cohesion: 0.13
Nodes (13): Props, styles, IS_TABLET, MessageRow(), Props, Props, StatusPill(), SUPPORT_QUESTIONS (+5 more)

### Community 57 - "Header/index.tsx"
Cohesion: 0.11
Nodes (13): Props, styles, AnimatedPath, Face(), Mascot(), Props, Props, styles (+5 more)

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

### Community 68 - "Persisted Storage"
Cohesion: 0.29
Nodes (6): react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-mmkv, redux-persist, mmkv, redux_storage

### Community 69 - "SubscriptionFields/index.tsx"
Cohesion: 0.12
Nodes (26): FieldError(), Props, SubscriptionFields(), styles, CURRENCIES, CURRENCY_NAMES, CURRENCY_SEARCH, NO_DECIMALS (+18 more)

### Community 70 - "Home/index.function.ts"
Cohesion: 0.11
Nodes (19): registerPush(), savePushToken(), syncTimezone(), timezone(), MAX_INBOXES, store, HomeRoute, useHome() (+11 more)

### Community 71 - "ChatParts.tsx"
Cohesion: 0.22
Nodes (15): Props, WAVE, Composer(), Props, ROWS, BlinkingMic(), clock(), DiscardBin() (+7 more)

### Community 72 - "onboarding_icons.ts"
Cohesion: 0.10
Nodes (19): apple_icon, arrow_icon, calendar_icon, check_icon, chevron_down_icon, edit_icon, filter_icon, find_grey_icon (+11 more)

### Community 73 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 75 - "react-native-device-info"
Cohesion: 0.11
Nodes (10): react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2, react-native-device-info@^15.0.2, @react-native-documents/viewer@^4.0.2, engines, node, react-native-calendars, @react-native-community/datetimepicker (+2 more)

### Community 77 - "constant-slice.ts"
Cohesion: 0.14
Nodes (11): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), Splash(), ConstantState (+3 more)

### Community 78 - "CustomButton/index.tsx"
Cohesion: 0.15
Nodes (10): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, Props, PLACEHOLDERS, styles (+2 more)

### Community 79 - "platform_logos.ts"
Cohesion: 0.20
Nodes (9): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, spotify_logo (+1 more)

### Community 80 - "reminders.ts"
Cohesion: 0.40
Nodes (8): daysText(), defaultTooClose(), effectiveDays(), LAST_THREE_DAYS, nextReminderValues(), preferenceFromValues(), REMINDER_PRESETS, reminderText()

### Community 81 - "alerts-slice.ts"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 82 - "widget_icons.ts"
Cohesion: 0.40
Nodes (3): benefit_check_icon, demo_app_icons, play_circle_icon

### Community 83 - "support-slice.ts"
Cohesion: 0.40
Nodes (4): initial_state, supportSlice, SupportMessage, SupportState

### Community 84 - "ai-draft.ts"
Cohesion: 0.60
Nodes (3): AiDraft, missingQuestion(), draft

## Ambiguous Edges - Review These
- `API integration pattern (http-provider + requestHandler + onDone)` → `USE_MOCK_API = __DEV__ (src/config/api.ts)`  [AMBIGUOUS]
  qa/QA-PLAN.md · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore`, `react_native_app_auth`, `Foundation` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 472 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Icons & Help Screen` to `Gmail & Inbox Actions`, `alerts-action.ts`, `fonts`, `Auth Actions & Navigation`, `Container`, `Auth Screens`, `Dates, Money & Detail Sheets`, `Dev Dependencies`, `Onboarding & Gmail Scan`, `Test Setup & Dropdown`, `Runtime Dependencies`, `Reminder Settings`, `Scan Candidates & Legal`, `Onboarding Panels`, `AiChat/index.function.ts`, `Home Widgets`, `Onboarding/index.tsx`, `List/index.tsx`, `Payments/index.tsx`, `Subscription Detail Events`, `Profile/index.tsx`, `support-action.ts`, `YourSubscriptions/index.tsx`, `App Entry`, `Receipts/index.tsx`, `http-provider.ts`, `Tab Navigator`, `Container/index.tsx`, `Header/index.tsx`, `SubscriptionFields/index.tsx`, `Home/index.function.ts`, `ChatParts.tsx`, `react-native-device-info`, `constant-slice.ts`, `CustomButton/index.tsx`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **What connects `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.051228070175438595 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `NPM Scripts` to `Dev Dependencies`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Should `Icons & Help Screen` be split into smaller, more focused modules?**
  _Cohesion score 0.06750700280112044 - nodes in this community are weakly interconnected._
- **Why does `android` connect `NPM Scripts` to `Android Widget Provider`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `API integration pattern (http-provider + requestHandler + onDone)` and `USE_MOCK_API = __DEV__ (src/config/api.ts)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._