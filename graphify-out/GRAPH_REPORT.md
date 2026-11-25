# Graph Report - Renewless-mobile  (2026-11-25)

## Corpus Check
- 392 files · ~158,867 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2405 nodes · 8799 edges · 97 communities (79 shown, 18 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2435e3dd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dropdown/index.tsx
- RenewlessWidgetProvider.kt
- navigate
- Home/index.tsx
- AiChat/index.function.ts
- auth-action.ts
- Receipts/index.function.ts
- alerts-action.ts
- dateLabel
- RowView/index.tsx
- API DTOs & Request Handler
- MainNavigator.tsx
- profile-action.ts
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- Onboarding/index.function.ts
- navigate
- Dev Dependencies
- Tabs.tsx
- GmailViews.tsx
- FirstResults/index.tsx
- push.ts
- GmailSheets.tsx
- @reduxjs/toolkit
- SubscriptionDetail/index.function.ts
- types.ts
- idempotency-key.test.ts
- Onboarding/index.tsx
- api_services/request-handler.ts
- icons/index.ts
- SizedBox
- Payments/index.tsx
- gmail-action.ts
- Auth.test.tsx
- useAppSelector
- Release Blockers & Gaps
- inbox-action.ts
- endSession.ts
- AuthLayout/index.tsx
- types.ts (4)
- Profile/index.tsx
- App.tsx
- Community 68
- store.ts
- CustomButton
- MessageRow/index.tsx
- service.ts
- status_colors.ts
- Icons/index.tsx (2)
- list.ts
- RowView
- Calendar/index.function.ts
- app-update-hook.test.tsx
- logoKey
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- payments-action.ts
- widget.ts
- react-native
- history.ts
- fonts
- ReminderSettings/index.function.ts
- auth-slice.ts
- Otp/index.function.ts
- calendar.ts
- calendar-slice.ts
- sync-locked-inbox.test.ts
- constant-slice.ts
- detail-slice.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- goBack
- CustomText/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- Community 78
- types.ts (6)
- CustomText
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `COLORS` - 170 edges
3. `SIZES` - 169 edges
4. `CustomText()` - 153 edges
5. `RowView()` - 145 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 90 edges
8. `fonts` - 89 edges
9. `requestHandler()` - 86 edges
10. `CustomButton()` - 83 edges

## Surprising Connections (you probably didn't know these)
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `F3: Required-update lockout via minBuild, no upper bound [Gate met; code open]` --references--> `appUpdateFor()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/app-update.ts
- `F78: Disabled-account flow shipped while Pending reapproval [Fixed/locked]` --references--> `DisabledAccountDialog()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **Release gates in order** — qa_runs_2026_11_17_final_release_audit_gate1_backend_deploy, qa_runs_2026_11_17_final_release_audit_gate2_hosting_deploy, qa_runs_2026_11_17_final_release_audit_gate3_store_privacy_forms, qa_runs_2026_11_17_final_release_audit_gate4_app_config_null, qa_runs_2026_11_17_final_release_audit_gate5_build_numbers, qa_runs_2026_11_17_final_release_audit_gate6_manual_checklist [EXTRACTED 1.00]
- **Disabled-account deletion path** — qa_runs_2026_11_17_final_release_audit_f1, qa_runs_2026_11_17_final_release_audit_f5, qa_runs_2026_11_17_final_release_audit_f33, qa_runs_2026_11_17_final_release_audit_f36, qa_runs_2026_11_17_final_release_audit_f37, qa_runs_2026_11_17_final_release_audit_f55, qa_runs_2026_11_17_final_release_audit_f73, qa_runs_2026_11_17_final_release_audit_f78 [INFERRED 0.85]
- **Store privacy disclosure consistency** — qa_runs_2026_11_17_final_release_audit_f2, qa_runs_2026_11_17_final_release_audit_f28, qa_runs_2026_11_17_final_release_audit_f29, qa_runs_2026_11_17_final_release_audit_f30, qa_runs_2026_11_17_final_release_audit_f31, qa_runs_2026_11_17_final_release_audit_f64 [INFERRED 0.85]

## Communities (97 total, 18 thin omitted)

### Community 0 - "Dropdown/index.tsx"
Cohesion: 0.20
Nodes (10): MAX_FONT_SCALE, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles (+2 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (56): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, logo_urls, platformBySubscription, RECEIPT_KINDS (+48 more)

### Community 2 - "navigate"
Cohesion: 0.15
Nodes (27): Container(), Header(), StateView(), SubscriptionCard(), navigate(), AddSubscriptionScreen(), MessageRow(), SUPPORT_QUESTIONS (+19 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.07
Nodes (37): toAiReply(), getMe(), openLegal(), focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage() (+29 more)

### Community 5 - "auth-action.ts"
Cohesion: 0.09
Nodes (53): toProfile(), DeleteProof, popTo(), resetRoot(), saveReminderSettings(), beginSession(), changePassword(), closeDisabledAccount() (+45 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.21
Nodes (14): receiptDate(), toReceipt(), getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute (+6 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.20
Nodes (11): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), AlertDto, flag(), getAlerts(), getAllAlerts() (+3 more)

### Community 8 - "dateLabel"
Cohesion: 0.16
Nodes (19): AppSheet(), DateField(), toDate(), toIso(), PhoneInputField(), MonthGrid(), CalendarScreen(), SummaryWash() (+11 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.11
Nodes (18): pause_icon, play_icon, styles, Props, styles, Props, styles, styles (+10 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.05
Nodes (77): react-native-svg, Props, styles, searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), CONFETTI_COLORS, PIECES (+69 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.08
Nodes (4): stack_options, AppStack, theme, navigationRef

### Community 12 - "profile-action.ts"
Cohesion: 0.07
Nodes (23): @invertase/react-native-apple-authentication@^2.5.1, react-native-app-auth@9.0.0, react-native-config@^1.7.2, @react-native-google-signin/google-signin@^17.0.0, @invertase/react-native-apple-authentication, react-native-app-auth, react-native-config, @react-native-google-signin/google-signin (+15 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (43): dependencies, axios@^1.21.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-blob-util@^1.1.1, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2 (+35 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.07
Nodes (39): categoryId(), fromReminder(), hasCategories(), setCategories(), toDetail(), toRecord(), toReminder(), toSubscriptionBody() (+31 more)

### Community 16 - "Onboarding/index.function.ts"
Cohesion: 0.09
Nodes (20): fromCycle(), fromScanCandidate(), isAuthExpired(), toScanStatus(), PRIVACY_URL, TERMS_URL, answerScanNotify(), editOnboardingCandidate() (+12 more)

### Community 17 - "navigate"
Cohesion: 0.06
Nodes (44): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+36 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 20 - "GmailViews.tsx"
Cohesion: 0.13
Nodes (31): OnboardingTitle(), PlatformLogo(), CandidateRow(), Caption(), GmailRecoveryArt(), InboxLine(), MatchRow(), Props (+23 more)

### Community 21 - "FirstResults/index.tsx"
Cohesion: 0.11
Nodes (13): Props, Props, STAGES, useTrickle(), RADAR_SIZE, styles, Props, styles (+5 more)

### Community 22 - "push.ts"
Cohesion: 0.24
Nodes (10): react-native-permissions@^5.6.3, react-native-permissions, ADMIN_SCREENS, forgetPushToken(), listenToPush(), messaging, openReminder(), pushToken() (+2 more)

### Community 23 - "GmailSheets.tsx"
Cohesion: 0.18
Nodes (7): clock_icon, Props, styles, Props, styles, behavior, Props

### Community 24 - "@reduxjs/toolkit"
Cohesion: 0.10
Nodes (17): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, alertsSlice, initial_state, Key, inboxSlice, initial_state, Key (+9 more)

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.19
Nodes (20): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, ReminderPreference (+12 more)

### Community 26 - "types.ts"
Cohesion: 0.08
Nodes (28): Props, initial_state, onboardingSlice, initial_state, supportSlice, AuthResponse, Billing, Cycle (+20 more)

### Community 27 - "idempotency-key.test.ts"
Cohesion: 0.40
Nodes (3): upload(), uploadFile(), mockRequest

### Community 28 - "Onboarding/index.tsx"
Cohesion: 0.09
Nodes (27): DiscoveringFooter(), FirstResultsFooter(), ReadyConfetti(), ReadyToGoFooter(), accessCopy(), COPY, Kind, Props (+19 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.05
Nodes (76): react-native-device-info@^15.0.2, react-native-device-info, del(), get(), newKey(), patch(), post(), postLong() (+68 more)

### Community 30 - "icons/index.ts"
Cohesion: 0.03
Nodes (84): external_icon, more_icon, plus_glyph_icon, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon (+76 more)

### Community 31 - "SizedBox"
Cohesion: 0.10
Nodes (33): @react-navigation/native-stack, AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), Dropdown(), InputField(), SizedBox() (+25 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 33 - "gmail-action.ts"
Cohesion: 0.06
Nodes (59): failedGmailScan(), fromGmailSelection(), toInbox(), registerPush(), savePushToken(), connectGmailInbox(), connectInbox(), connectOutlookInbox() (+51 more)

### Community 34 - "Auth.test.tsx"
Cohesion: 0.07
Nodes (24): ApiError, client, pending_keys, apiServices, API_BASE_URL, AppThunk, Options, SESSION_ENDED (+16 more)

### Community 35 - "useAppSelector"
Cohesion: 0.12
Nodes (30): UndoToast(), AuthStack(), getCalendarMonth(), getSubscriptions(), changeProductUpdates(), useAppDispatch(), useAppSelector, AlertsController (+22 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "inbox-action.ts"
Cohesion: 0.19
Nodes (12): disconnectInbox(), flag(), getImportedSubscriptions(), getInbox(), getInboxData(), reconnectInbox(), getAllSubscriptions(), ConnectedInboxController (+4 more)

### Community 38 - "endSession.ts"
Cohesion: 0.12
Nodes (5): initial_state, profileSlice, ProfileOverview, ProfileState, RootState

### Community 39 - "AuthLayout/index.tsx"
Cohesion: 0.14
Nodes (7): OUTLOOK_SOCIAL_ICON, Props, styles, CONNECT_LABELS, Props, TRUST_ROWS, styles

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.12
Nodes (6): MenuItem, Props, styles, PROVIDER_LABEL, syncDate(), styles

### Community 42 - "App.tsx"
Cohesion: 0.09
Nodes (23): App(), displayName, name, @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, react-redux@^9.3.0, redux-persist@^6.0.0 (+15 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "store.ts"
Cohesion: 0.12
Nodes (4): AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 45 - "CustomButton"
Cohesion: 0.32
Nodes (13): AppUpdate(), ConfirmDialog(), CustomButton(), DisabledAccountDialog(), ConsentDialog(), DuplicateDialog(), ConnectedInboxScreen(), DisconnectDialog() (+5 more)

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 47 - "service.ts"
Cohesion: 0.12
Nodes (22): @react-navigation/native, NavigateArgs, RootParamList, TAB_NAMES, getSupportMessages(), markSupportRead(), TOPIC_OPTIONS, topicOf() (+14 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.23
Nodes (16): ListRoute, useList(), SubscriptionRecord, byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS (+8 more)

### Community 51 - "RowView"
Cohesion: 0.07
Nodes (64): AddChoiceLinks(), AddOptions(), AddSheet(), ChooseInboxSheet(), CurrencyTabs(), DialogCard(), AnimatedPath, Icons() (+56 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.17
Nodes (13): toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "logoKey"
Cohesion: 0.17
Nodes (20): categoryName(), failingRow(), jobStatus(), logoKey(), platformOf(), toAttention(), toCalendarMonth(), toChatDraft() (+12 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "payments-action.ts"
Cohesion: 0.16
Nodes (8): inboxSource(), toPayment(), toPriceChanges(), PaymentDto, getAllPayments(), getPayments(), actions, mockApi

### Community 60 - "widget.ts"
Cohesion: 0.16
Nodes (7): dashboardSlice, initial_state, DashboardState, HomeSnapshot, clearWidgetSnapshot(), listenForWidgetUrls(), openWidgetUrl()

### Community 61 - "react-native"
Cohesion: 0.05
Nodes (50): react-native, react-native-safe-area-context, brand_mark_paths, security_accent_icon, device_bell_icon, styles, Props, styles (+42 more)

### Community 62 - "history.ts"
Cohesion: 0.29
Nodes (7): HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 63 - "fonts"
Cohesion: 0.07
Nodes (33): arrow_right_icon, Props, styles, Props, styles, Props, PROVIDERS, Props (+25 more)

### Community 64 - "ReminderSettings/index.function.ts"
Cohesion: 0.14
Nodes (25): getApplyCount(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS, accountDisplay() (+17 more)

### Community 65 - "auth-slice.ts"
Cohesion: 0.25
Nodes (6): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount

### Community 66 - "Otp/index.function.ts"
Cohesion: 0.43
Nodes (5): clock(), CODE_LENGTH, Route, useOtp(), latinDigits()

### Community 67 - "calendar.ts"
Cohesion: 0.23
Nodes (9): HomeEvent, SubscriptionDetail, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS, record (+1 more)

### Community 68 - "calendar-slice.ts"
Cohesion: 0.40
Nodes (4): calendarSlice, initial_state, CalendarMonth, CalendarState

### Community 69 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 70 - "constant-slice.ts"
Cohesion: 0.15
Nodes (10): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, Profile (+2 more)

### Community 71 - "detail-slice.ts"
Cohesion: 0.40
Nodes (4): detailSlice, initial_state, Key, DetailState

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.16
Nodes (16): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, goBack(), selectUser(), Fields, passwordErrors() (+8 more)

### Community 76 - "CustomText/index.tsx"
Cohesion: 0.06
Nodes (24): react, Props, Props, styles, Props, styles, Frame, Props (+16 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 87 - "CustomText"
Cohesion: 0.10
Nodes (40): CustomText(), ImagePreview(), LinkText(), SpendRow(), SpendRows(), TrialRows(), FieldError(), Cell() (+32 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 625 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.05423728813559322 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `Dropdown/index.tsx`, `navigate`, `AiChat/index.function.ts`, `auth-action.ts`, `RowView/index.tsx`, `API DTOs & Request Handler`, `Container (2)`, `Onboarding/index.function.ts`, `navigate`, `Tabs.tsx`, `GmailViews.tsx`, `FirstResults/index.tsx`, `push.ts`, `GmailSheets.tsx`, `SubscriptionDetail/index.function.ts`, `Onboarding/index.tsx`, `api_services/request-handler.ts`, `icons/index.ts`, `SizedBox`, `gmail-action.ts`, `Auth.test.tsx`, `useAppSelector`, `AuthLayout/index.tsx`, `Profile/index.tsx`, `App.tsx`, `MessageRow/index.tsx`, `service.ts`, `app-update-hook.test.tsx`, `widget.ts`, `fonts`, `ReminderSettings/index.function.ts`, `constant-slice.ts`, `CustomText/index.tsx`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Should `navigate` be split into smaller, more focused modules?**
  _Cohesion score 0.1497326203208556 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._
- **Should `AiChat/index.function.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0660377358490566 - nodes in this community are weakly interconnected._