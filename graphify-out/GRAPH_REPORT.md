# Graph Report - Renewless-mobile  (2026-11-16)

## Corpus Check
- 368 files · ~133,916 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 54 file(s) not represented in the graph (top: .ttf 15, .xml 13, (none) 5)

## Summary
- 2066 nodes · 8027 edges · 89 communities (72 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `858e6c96`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- API DTOs & Request Handler
- SIZES
- icons/index.ts
- Icons
- adapters.ts
- requestHandler
- adapters.ts
- detail-action.ts
- CustomText/index.tsx
- service.ts
- Container
- AuthLayout/index.tsx
- SubscriptionFields/index.tsx
- inbox-action.ts
- Dev Dependencies
- theme.ts
- react
- Runtime Dependencies
- SubscriptionDetail/index.function.ts
- alerts-action.ts
- Redux Types & Slices
- iOS Widget Models
- react-native
- DetailSheets.tsx
- AiChat/index.function.ts
- social-sign-in.ts
- useAppSelector
- RenewlessWidgetProvider.kt
- endSession.ts
- RowView
- @reduxjs/toolkit
- SizedBox
- CustomButton
- Payments Utils
- Calendar/index.tsx
- list-slice.ts
- ai-consent.test.ts
- outlook-login.test.ts
- Profile/index.tsx
- Calendar Month Grid
- Project Working Rules
- ReminderSettings/index.tsx
- Profile/index.function.ts
- YourSubscriptions/index.tsx
- AddOptions/index.tsx
- Canonical Doc Owners
- iOS AppDelegate
- App.tsx
- iOS Widget Bridge
- QA Plan & Contracts
- Store Compliance Tests
- Receipts/index.function.ts
- Detail & List Slices
- http-provider.ts
- Release Audit 16 Nov
- Tab Navigator
- outlook-connect.test.ts
- Payments/index.tsx
- loop_parts.ts
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
- onboarding_icons.ts
- TS Config
- constant-slice.ts
- Header/index.tsx
- platform_logos.ts
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
- `lockedInbox()` --calls--> `getSyncLockedInbox()`  [EXTRACTED]
  __tests__/sync-locked-inbox.test.ts → src/redux/actions/gmail-action.ts
- `connect()` --calls--> `connectOutlookInbox()`  [EXTRACTED]
  __tests__/outlook-connect.test.ts → src/redux/actions/gmail-action.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **React Native implementation rules (size, layout, navigation, colors, hooks, API)** — agents_strict_size_rule, agents_phone_tablet_together, agents_layout_component_rules, agents_navigation_service_rule, agents_colors_theme_rule, agents_hook_return_rule, agents_api_integration_pattern, agents_redux_file_naming [EXTRACTED 1.00]
- **Release blockers B1-B7 from the 16 November audit** — qa_runs_2026_11_16_release_audit_b1_play_signing_sha1, qa_runs_2026_11_16_release_audit_b2_record_audio, qa_runs_2026_11_16_release_audit_b3_decimal_comma, qa_runs_2026_11_16_release_audit_b4_apple_revoke, qa_runs_2026_11_16_release_audit_b5_purpose_strings, qa_runs_2026_11_16_release_audit_b6_google_oauth_verification, qa_runs_2026_11_16_release_audit_b7_microsoft_env [EXTRACTED 1.00]
- **Design lock governance (freeze, lock register, Studio badge map, doc sync)** — agents_screen_design_freeze, agents_product_screens_doc, agents_screendesignlocks_badge_map, agents_documentation_synchronization [INFERRED 0.85]

## Communities (89 total, 17 thin omitted)

### Community 0 - "API DTOs & Request Handler"
Cohesion: 0.07
Nodes (53): react-native-device-info@^15.0.2, react-native-device-info, get(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding() (+45 more)

### Community 1 - "SIZES"
Cohesion: 0.08
Nodes (27): Props, styles, Props, Props, styles, Props, styles, IS_TABLET (+19 more)

### Community 2 - "icons/index.ts"
Cohesion: 0.10
Nodes (22): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+14 more)

### Community 3 - "Icons"
Cohesion: 0.09
Nodes (36): AnimatedPath, Icons(), ImagePreview(), AnimatedPath, Face(), Mascot(), PlatformLogo(), Cell() (+28 more)

### Community 4 - "adapters.ts"
Cohesion: 0.06
Nodes (33): AiUsageDto, AlertDto, AlertsDto, CalendarDto, CandidateDto, CategoryDto, ChallengeDto, ChatDraftDto (+25 more)

### Community 5 - "requestHandler"
Cohesion: 0.06
Nodes (49): fromGmailSelection(), toInbox(), toProfile(), OutlookConnectDto, OutlookLoginDto, beginSession(), connectGmailInbox(), connectInbox() (+41 more)

### Community 6 - "adapters.ts"
Cohesion: 0.09
Nodes (45): categories, categoryId(), categoryName(), dayLabel(), FORM_TO_BACKEND, fromCycle(), fromReminder(), fromScanCandidate() (+37 more)

### Community 7 - "detail-action.ts"
Cohesion: 0.08
Nodes (36): hasCategories(), toRecord(), apiServices, getDashboard(), getHomeData(), cancelSubscription(), createFromForm(), createSubscription() (+28 more)

### Community 8 - "CustomText/index.tsx"
Cohesion: 0.10
Nodes (32): pdf_icon, benefit_check_icon, Props, styles, Props, styles, Props, styles (+24 more)

### Community 9 - "service.ts"
Cohesion: 0.08
Nodes (52): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, @notifee/react-native, @react-native-firebase/messaging, navigate(), NavigateArgs, navigationRef, popTo() (+44 more)

### Community 10 - "Container"
Cohesion: 0.09
Nodes (65): Container(), CustomText(), DialogCard(), Header(), InputField(), busyMessage(), LoaderModal(), MenuGroup() (+57 more)

### Community 11 - "AuthLayout/index.tsx"
Cohesion: 0.07
Nodes (39): @react-navigation/native-stack, AuthDivider(), AuthFooterLink(), AuthLayout(), OUTLOOK_SOCIAL_ICON, Props, SocialButtons(), styles (+31 more)

### Community 12 - "SubscriptionFields/index.tsx"
Cohesion: 0.09
Nodes (39): Props, styles, SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion, SubscriptionRecord, HISTORY_FILTERS, historyCardProps() (+31 more)

### Community 13 - "inbox-action.ts"
Cohesion: 0.19
Nodes (11): INBOX_LIMIT_NOTICE, disconnectInbox(), flag(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute (+3 more)

### Community 14 - "Dev Dependencies"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 15 - "theme.ts"
Cohesion: 0.10
Nodes (14): Props, styles, Props, styles, Props, styles, styles, app_theme (+6 more)

### Community 16 - "react"
Cohesion: 0.10
Nodes (19): react, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles (+11 more)

### Community 17 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (37): dependencies, axios@^1.21.1, react@19.2.3, react-native@0.87.1, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2, react-native-confirmation-code-field@^9.0.0, @react-native-documents/picker@12.0.3 (+29 more)

### Community 18 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.07
Nodes (46): useReminderSettings(), DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL (+38 more)

### Community 19 - "alerts-action.ts"
Cohesion: 0.11
Nodes (18): react-native-permissions@^5.6.3, react-native-permissions, fromReminderSettings(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount() (+10 more)

### Community 20 - "Redux Types & Slices"
Cohesion: 0.06
Nodes (34): status_colors, alertsSlice, initial_state, Key, initial_state, onboardingSlice, AlertsState, AuthResponse (+26 more)

### Community 21 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 22 - "react-native"
Cohesion: 0.11
Nodes (15): react-native, chevron_right_icon, Props, styles, MenuItem, Props, styles, Props (+7 more)

### Community 23 - "DetailSheets.tsx"
Cohesion: 0.21
Nodes (26): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), FieldError(), SubscriptionFields(), CandidateSheet() (+18 more)

### Community 24 - "AiChat/index.function.ts"
Cohesion: 0.13
Nodes (23): focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), syncAiConsent() (+15 more)

### Community 25 - "social-sign-in.ts"
Cohesion: 0.12
Nodes (17): @invertase/react-native-apple-authentication@^2.5.1, react-native-app-auth@9.0.0, react-native-config@^1.7.2, @react-native-google-signin/google-signin@^17.0.0, @invertase/react-native-apple-authentication, react-native-app-auth, react-native-config, @react-native-google-signin/google-signin (+9 more)

### Community 26 - "useAppSelector"
Cohesion: 0.06
Nodes (50): @react-navigation/native, resendCode(), getCalendarMonth(), getImportedSubscriptions(), getSubscriptions(), getAllPayments(), getPayments(), changeProductUpdates() (+42 more)

### Community 27 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 28 - "endSession.ts"
Cohesion: 0.12
Nodes (4): calendarSlice, initial_state, CalendarMonth, CalendarState

### Community 29 - "RowView"
Cohesion: 0.08
Nodes (46): AddChoiceLinks(), Props, AddOptions(), AddSheet(), Props, ChooseInboxSheet(), Props, InboxProviders() (+38 more)

### Community 30 - "@reduxjs/toolkit"
Cohesion: 0.09
Nodes (19): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, authSlice, initial_state, requests, dashboardSlice, initial_state, inboxSlice (+11 more)

### Community 31 - "SizedBox"
Cohesion: 0.06
Nodes (63): react-native-svg, OnboardingTitle(), Props, Props, SizedBox(), GmailSheets(), Caption(), GmailRecoveryArt() (+55 more)

### Community 32 - "CustomButton"
Cohesion: 0.24
Nodes (14): ConfirmDialog(), CustomButton(), ConsentDialog(), DuplicateDialog(), DisconnectDialog(), InboxSheet(), Field(), PaymentDialog() (+6 more)

### Community 33 - "Payments Utils"
Cohesion: 0.25
Nodes (17): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+9 more)

### Community 34 - "Calendar/index.tsx"
Cohesion: 0.19
Nodes (7): Frame, Props, styles, LEGEND, styles, PILL, styles

### Community 35 - "list-slice.ts"
Cohesion: 0.22
Nodes (4): initial_state, listSlice, ListState, loaded

### Community 36 - "ai-consent.test.ts"
Cohesion: 0.18
Nodes (8): put(), getMe(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 37 - "outlook-login.test.ts"
Cohesion: 0.10
Nodes (16): ApiError, busy(), grant, mockPost, actions, connector, grant, mockDeleteMe (+8 more)

### Community 38 - "Profile/index.tsx"
Cohesion: 0.11
Nodes (17): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+9 more)

### Community 39 - "Calendar Month Grid"
Cohesion: 0.36
Nodes (5): dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 40 - "Project Working Rules"
Cohesion: 0.17
Nodes (6): AGENTS.md - Renewless project working rules, src/screens/index.ts screens barrel, Section-by-section native frontend workflow, iOS WidgetKit and Android AppWidget, M21 Stale response after logout writes into Redux and widget, Mobile findings M19-M28 (401 handling, logout races, idempotency, RTL)

### Community 41 - "ReminderSettings/index.tsx"
Cohesion: 0.18
Nodes (8): react-native-safe-area-context, Props, styles, styles, styles, DEVICE, styles, useKeyboardScroll()

### Community 42 - "Profile/index.function.ts"
Cohesion: 0.09
Nodes (24): openLegal(), PRIVACY_URL, TERMS_URL, changePassword(), MAX_INBOXES, initial_state, profileSlice, selectUser() (+16 more)

### Community 43 - "YourSubscriptions/index.tsx"
Cohesion: 0.12
Nodes (30): check_dark_icon, InfoTooltip(), CONFETTI_COLORS, PIECES, Props, ReadyConfetti(), ReadyToGoBody(), ReadyToGoFooter() (+22 more)

### Community 44 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): mail_icon, pencil_icon, sparkle_icon, OPTIONS, Props, styles

### Community 45 - "Canonical Doc Owners"
Cohesion: 0.19
Nodes (10): docs/billing.md (Billing, deferred Phase 2 drafts), docs/design-system.md (Design system), Single native Onboarding host screen, docs/product-screens.md (Product screens, lock register), Design Studio screenDesignLocks badge map, Recording results, bug format and release exit criteria, README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb (+2 more)

### Community 47 - "App.tsx"
Cohesion: 0.17
Nodes (11): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+3 more)

### Community 48 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 49 - "QA Plan & Contracts"
Cohesion: 0.20
Nodes (9): docs/api-mobile-contract.md (API/mobile contract), Gmail-only confirmed-payment pipeline, src/config/mock-data.ts (Onboarding scan and AI chat fixtures), QA-PLAN - pre-release testing runbook, Device matrix (iOS simulators, Pixel AVDs, real devices), Golden dataset of seeded receipts, mobile-mcp device automation, Mock scenarios in mock-data.ts (+1 more)

### Community 50 - "Store Compliance Tests"
Cohesion: 0.22
Nodes (11): Account deletion requirement (Apple 5.1.1(v), Play web page), AI chat consent (App Store 5.1.2(i)), PDF viewer patch-package patch (view-only on iOS), Store and compliance readiness (Apple, Google Play, Google OAuth/CASA), Test suites 6.1-6.11 (auth, onboarding, home, list, calendar, payments, alerts, AI chat, profile, widgets, cross-cutting), B2 Android RECORD_AUDIO permission before recording, B3 Decimal-comma amounts rejected (isValidAmount), B4 Sign in with Apple token revocation on delete (+3 more)

### Community 51 - "Receipts/index.function.ts"
Cohesion: 0.31
Nodes (9): getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute, useReceipts(), AppStackParamList (+1 more)

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

### Community 57 - "Payments/index.tsx"
Cohesion: 0.09
Nodes (19): Props, Props, Row, styles, Props, styles, NOTES, styles (+11 more)

### Community 58 - "loop_parts.ts"
Cohesion: 0.50
Nodes (3): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH

### Community 60 - "Release Blockers & Gaps"
Cohesion: 0.22
Nodes (8): Real-data QA entry criteria, Google Gemini AI provider (paid tier, no training), Known gaps and watch items (7-8 Nov 2026), USE_MOCK_API = __DEV__ (src/config/api.ts), B1 Play App Signing SHA-1 missing (Google sign-in DEVELOPER_ERROR), Store compliance findings M29-M32 (Gemini disclosure, AD_ID, privacy manifest, debug key), Raleway SIL Open Font License 1.1, Raleway Reserved Font Name

### Community 61 - "Countries & Phone"
Cohesion: 0.40
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

### Community 72 - "onboarding_icons.ts"
Cohesion: 0.12
Nodes (24): apple_icon, arrow_icon, calendar_icon, check_icon, chevron_down_icon, close_icon, edit_icon, filter_icon (+16 more)

### Community 73 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 77 - "constant-slice.ts"
Cohesion: 0.16
Nodes (9): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, mock_dispatch (+1 more)

### Community 78 - "Header/index.tsx"
Cohesion: 0.16
Nodes (5): Props, styles, PLACEHOLDERS, styles, styles

### Community 79 - "platform_logos.ts"
Cohesion: 0.20
Nodes (9): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+1 more)

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 491 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `API DTOs & Request Handler`, `SIZES`, `icons/index.ts`, `requestHandler`, `CustomText/index.tsx`, `service.ts`, `Container`, `AuthLayout/index.tsx`, `SubscriptionFields/index.tsx`, `Dev Dependencies`, `theme.ts`, `react`, `Runtime Dependencies`, `SubscriptionDetail/index.function.ts`, `alerts-action.ts`, `DetailSheets.tsx`, `AiChat/index.function.ts`, `useAppSelector`, `RowView`, `SizedBox`, `Calendar/index.tsx`, `outlook-login.test.ts`, `Profile/index.tsx`, `ReminderSettings/index.tsx`, `Profile/index.function.ts`, `YourSubscriptions/index.tsx`, `AddOptions/index.tsx`, `App.tsx`, `Tab Navigator`, `Payments/index.tsx`, `constant-slice.ts`, `Header/index.tsx`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `Dev Dependencies`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `SIZES` be split into smaller, more focused modules?**
  _Cohesion score 0.0807909604519774 - nodes in this community are weakly interconnected._
- **Should `icons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `API integration pattern (http-provider + requestHandler + onDone)` and `USE_MOCK_API = __DEV__ (src/config/api.ts)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._