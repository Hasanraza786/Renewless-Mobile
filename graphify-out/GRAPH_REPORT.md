# Graph Report - Renewless-mobile  (2026-11-26)

## Corpus Check
- 395 files · ~162,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2352 nodes · 9085 edges · 100 communities (74 shown, 26 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 160 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9192e927`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dropdown/index.tsx
- adapters.ts
- Container
- RenewlessWidgetProvider.kt
- AiChat/index.function.ts
- requestHandler
- RenewlessWidgetModule.kt
- alerts-action.ts
- service.ts
- RowView/index.tsx
- SubscriptionFields/index.tsx
- Provider
- App.tsx
- iOS Widget Models
- Container (2)
- detail-action.ts
- ai-consent.test.ts
- navigate
- Dev Dependencies
- outlook-login.test.ts
- requestHandler
- Onboarding/index.tsx
- MainApplication.kt
- money-actions.test.ts
- icons/index.ts
- SubscriptionDetail/index.function.ts
- endSession.ts
- scripts
- CustomButton
- api_services/request-handler.ts
- ReminderSettings/index.tsx
- YourSubscriptions/index.tsx
- Payments/index.tsx
- outlook-connect.test.ts
- gmail-action.ts
- Receipts/index.function.ts
- Release Blockers & Gaps
- trackEvent
- sync-locked-inbox.test.ts
- types.ts
- types.ts (4)
- HelpSupport/index.tsx
- inbox-slice.ts
- Community 68
- ai-draft.ts
- @invertase/react-native-apple-authentication
- ContactUs/index.function.ts
- Calendar/index.function.ts
- Icons/index.tsx (2)
- list.ts
- RowView
- Calendar/index.function.ts
- app-update-hook.test.tsx
- toRecord
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- CustomText/index.tsx
- http-provider.ts
- theme.ts
- history.ts
- SubscriptionDetail/index.tsx
- alerts.ts
- react-native-app-auth
- react-native-permissions
- Auth.test.tsx
- widget.ts
- common_styles.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- goBack
- Icons/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- Community 78
- types.ts (6)
- Splash.test.tsx
- list-slice.test.ts
- GmailViews.tsx
- react-native-device-info
- Canonical Doc Owners
- payments-action.ts
- WidgetBridge ObjC
- react-native-blob-util
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `RowView()` - 191 edges
3. `COLORS` - 171 edges
4. `SIZES` - 170 edges
5. `CustomText()` - 154 edges
6. `react` - 92 edges
7. `CustomButton()` - 92 edges
8. `Final release audit 17 Nov 2026` - 92 edges
9. `fonts` - 90 edges
10. `requestHandler()` - 87 edges

## Surprising Connections (you probably didn't know these)
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F78: Disabled-account flow shipped while Pending reapproval [Fixed/locked]` --references--> `DisabledAccountDialog()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `F3: Required-update lockout via minBuild, no upper bound [Gate met; code open]` --references--> `appUpdateFor()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/app-update.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **Release gates in order** — qa_runs_2026_11_17_final_release_audit_gate1_backend_deploy, qa_runs_2026_11_17_final_release_audit_gate2_hosting_deploy, qa_runs_2026_11_17_final_release_audit_gate3_store_privacy_forms, qa_runs_2026_11_17_final_release_audit_gate4_app_config_null, qa_runs_2026_11_17_final_release_audit_gate5_build_numbers, qa_runs_2026_11_17_final_release_audit_gate6_manual_checklist [EXTRACTED 1.00]
- **Disabled-account deletion path** — qa_runs_2026_11_17_final_release_audit_f1, qa_runs_2026_11_17_final_release_audit_f5, qa_runs_2026_11_17_final_release_audit_f33, qa_runs_2026_11_17_final_release_audit_f36, qa_runs_2026_11_17_final_release_audit_f37, qa_runs_2026_11_17_final_release_audit_f55, qa_runs_2026_11_17_final_release_audit_f73, qa_runs_2026_11_17_final_release_audit_f78 [INFERRED 0.85]
- **Store privacy disclosure consistency** — qa_runs_2026_11_17_final_release_audit_f2, qa_runs_2026_11_17_final_release_audit_f28, qa_runs_2026_11_17_final_release_audit_f29, qa_runs_2026_11_17_final_release_audit_f30, qa_runs_2026_11_17_final_release_audit_f31, qa_runs_2026_11_17_final_release_audit_f64 [INFERRED 0.85]

## Communities (100 total, 26 thin omitted)

### Community 0 - "Dropdown/index.tsx"
Cohesion: 0.14
Nodes (14): chevron_down_icon, MAX_FONT_SCALE, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT (+6 more)

### Community 1 - "adapters.ts"
Cohesion: 0.05
Nodes (63): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, logo_urls, platformBySubscription, RECEIPT_KINDS (+55 more)

### Community 2 - "Container"
Cohesion: 0.10
Nodes (45): Container(), CurrencyTabs(), Header(), MenuGroup(), StateView(), SubscriptionCard(), stack_options, AppStack (+37 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.11
Nodes (27): Props, focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat() (+19 more)

### Community 5 - "requestHandler"
Cohesion: 0.05
Nodes (47): fromScanCandidate(), toAppConfig(), toProfile(), ApiError, resetRoot(), getAppConfig(), beginSession(), syncAccount() (+39 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.13
Nodes (19): fromReminderSettings(), knownEventType(), platformOf(), toAlert(), toCalendarMonth(), toEvent(), toEvents(), toHome() (+11 more)

### Community 8 - "service.ts"
Cohesion: 0.07
Nodes (51): @react-navigation/native, UndoToast(), navigate(), NavigateArgs, navigationRef, RootParamList, TAB_NAMES, disconnectInbox() (+43 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.11
Nodes (18): benefit_check_icon, demo_app_icons, play_circle_icon, Props, styles, Props, Props, Props (+10 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.14
Nodes (31): Props, styles, createSubscription(), searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), ScanCycle, CURRENCIES (+23 more)

### Community 11 - "Provider"
Cohesion: 0.17
Nodes (5): Provider, RenewlessEntry, RenewlessWidget, .body, SnapshotStore

### Community 12 - "App.tsx"
Cohesion: 0.09
Nodes (23): App(), displayName, name, @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, redux-persist@^6.0.0, @react-native-firebase/crashlytics (+15 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.16
Nodes (15): Brand, .body, Color, dayString(), EventCopy, parseDay(), QuietView, .body (+7 more)

### Community 14 - "Container (2)"
Cohesion: 0.04
Nodes (47): dependencies, axios@^1.21.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2, react-native-config@^1.7.2 (+39 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.13
Nodes (27): categoryId(), fromCycle(), fromReminder(), hasCategories(), toSubscriptionBody(), cancelSubscription(), createFromForm(), current() (+19 more)

### Community 16 - "ai-consent.test.ts"
Cohesion: 0.33
Nodes (3): saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "outlook-login.test.ts"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 20 - "requestHandler"
Cohesion: 0.09
Nodes (41): @react-navigation/native-stack, popTo(), closeDisabledAccount(), deleteDisabledAccount(), forgotPassword(), formWide(), login(), offerDisabledDelete() (+33 more)

### Community 21 - "Onboarding/index.tsx"
Cohesion: 0.09
Nodes (33): arrow_icon, check_icon, Props, CONNECT_LABELS, Props, TRUST_ROWS, DiscoveringFooter(), Props (+25 more)

### Community 23 - "money-actions.test.ts"
Cohesion: 0.22
Nodes (5): SubscriptionFormInput, actions, mockApi, record, state

### Community 24 - "icons/index.ts"
Cohesion: 0.05
Nodes (75): plus_glyph_icon, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, calendar_icon, chevron_right_icon, gmail_icon, hint_icon (+67 more)

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.19
Nodes (20): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, ReminderPreference (+12 more)

### Community 26 - "endSession.ts"
Cohesion: 0.06
Nodes (24): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, alertsSlice, initial_state, Key, calendarSlice, initial_state, constantSlice (+16 more)

### Community 27 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, android, ios, lint, postinstall, start, test, typecheck

### Community 28 - "CustomButton"
Cohesion: 0.13
Nodes (35): AddChoiceLinks(), AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), CustomButton(), InputField(), SizedBox() (+27 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.06
Nodes (63): get(), patch(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft() (+55 more)

### Community 30 - "ReminderSettings/index.tsx"
Cohesion: 0.38
Nodes (4): device_bell_icon, DEVICE, styles, useKeyboardScroll()

### Community 31 - "YourSubscriptions/index.tsx"
Cohesion: 0.09
Nodes (53): edit_icon, AppSheet(), DateField(), toDate(), toIso(), Dropdown(), InfoTooltip(), FieldError() (+45 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 33 - "outlook-connect.test.ts"
Cohesion: 0.20
Nodes (9): isAuthExpired(), actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn (+1 more)

### Community 34 - "gmail-action.ts"
Cohesion: 0.07
Nodes (51): failedGmailScan(), fromGmailSelection(), toInbox(), apiServices, registerPush(), savePushToken(), getDashboard(), getHomeData() (+43 more)

### Community 35 - "Receipts/index.function.ts"
Cohesion: 0.25
Nodes (12): getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute, useReceipts(), ReceiptFile (+4 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "trackEvent"
Cohesion: 0.09
Nodes (24): openLegal(), PRIVACY_URL, TERMS_URL, logoutUser(), deleteAccount(), endSession(), ProfileController, useProfile() (+16 more)

### Community 38 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 39 - "types.ts"
Cohesion: 0.05
Nodes (36): status_colors, authSlice, initial_state, requests, initial_state, onboardingSlice, AuthRequest, AuthResponse (+28 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "HelpSupport/index.tsx"
Cohesion: 0.27
Nodes (5): MenuItem, Props, styles, SUPPORT_QUESTIONS, styles

### Community 42 - "inbox-slice.ts"
Cohesion: 0.33
Nodes (5): inboxSlice, initial_state, Key, InboxDetail, InboxState

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "ai-draft.ts"
Cohesion: 0.60
Nodes (3): AiDraft, missingQuestion(), draft

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.19
Nodes (11): initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useContactUs(), SupportMessage, SupportState, SupportTopic (+3 more)

### Community 48 - "Calendar/index.function.ts"
Cohesion: 0.13
Nodes (14): getCalendarMonth(), CalendarController, CalendarRoute, EMPTY, PickerAnchor, useCalendar(), dayMarker(), monthTitle() (+6 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.22
Nodes (13): byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS, ListGroup, listGroup() (+5 more)

### Community 51 - "RowView"
Cohesion: 0.07
Nodes (90): AddOptions(), AddSheet(), AppUpdate(), ChooseInboxSheet(), ConfirmDialog(), CustomText(), DialogCard(), DisabledAccountDialog() (+82 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.18
Nodes (11): useAppUpdate(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch, mockGetAppConfig, openURL (+3 more)

### Community 54 - "toRecord"
Cohesion: 0.20
Nodes (20): categoryName(), failingRow(), inboxSource(), jobStatus(), logoKey(), toAttention(), toChatDraft(), toCycle() (+12 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "CustomText/index.tsx"
Cohesion: 0.12
Nodes (27): react, react-native-svg, filter_icon, Props, Props, Props, styles, Props (+19 more)

### Community 60 - "http-provider.ts"
Cohesion: 0.10
Nodes (21): client, del(), newKey(), pending_keys, postLong(), put(), request(), upload() (+13 more)

### Community 61 - "theme.ts"
Cohesion: 0.04
Nodes (62): react-native, react-native-safe-area-context, brand_mark_paths, styles, styles, styles, styles, styles (+54 more)

### Community 62 - "history.ts"
Cohesion: 0.27
Nodes (8): SubscriptionRecord, HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 63 - "SubscriptionDetail/index.tsx"
Cohesion: 0.11
Nodes (15): arrow_right_icon, external_icon, more_icon, find_grey_icon, find_icon, remember_icon, track_icon, Props (+7 more)

### Community 64 - "alerts.ts"
Cohesion: 0.14
Nodes (25): getApplyCount(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS, accountDisplay() (+17 more)

### Community 68 - "Auth.test.tsx"
Cohesion: 0.15
Nodes (6): react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, mockBackend, Tree

### Community 69 - "widget.ts"
Cohesion: 0.12
Nodes (17): bundledLogoKey(), dashboardSlice, initial_state, DashboardState, HomeEvent, HomeSnapshot, SubscriptionDetail, spokenMoney() (+9 more)

### Community 70 - "common_styles.ts"
Cohesion: 0.14
Nodes (16): Props, Props, styles, Props, WAVE, ROWS, AiChatController, styles (+8 more)

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.06
Nodes (26): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, changePassword(), initial_state, profileSlice, selectUser() (+18 more)

### Community 76 - "Icons/index.tsx"
Cohesion: 0.08
Nodes (20): apple_icon, close_icon, google_icon, info_icon, Props, Props, OUTLOOK_SOCIAL_ICON, Props (+12 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots"
Cohesion: 0.29
Nodes (6): Backend bugs from the second pass, Bugs and gaps, Fourth pass (usage bills in onboarding), QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots, Second pass (same day, after the design revisions), Third pass (auto-advance and dismiss)

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 85 - "Splash.test.tsx"
Cohesion: 0.20
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 87 - "GmailViews.tsx"
Cohesion: 0.08
Nodes (51): check_dark_icon, OnboardingTitle(), PlatformLogo(), PriceChange(), SpendRow(), SpendRows(), TrialRows(), DraftCard() (+43 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 94 - "payments-action.ts"
Cohesion: 0.19
Nodes (6): toPayment(), PaymentDto, getAllPayments(), getPayments(), actions, mockApi

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore`, `react_native_app_auth`, `Foundation` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 576 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `theme.ts` to `Dropdown/index.tsx`, `Container`, `AiChat/index.function.ts`, `requestHandler`, `service.ts`, `RowView/index.tsx`, `SubscriptionFields/index.tsx`, `App.tsx`, `Container (2)`, `navigate`, `outlook-login.test.ts`, `requestHandler`, `Onboarding/index.tsx`, `icons/index.ts`, `SubscriptionDetail/index.function.ts`, `CustomButton`, `ReminderSettings/index.tsx`, `YourSubscriptions/index.tsx`, `gmail-action.ts`, `trackEvent`, `HelpSupport/index.tsx`, `app-update-hook.test.tsx`, `CustomText/index.tsx`, `SubscriptionDetail/index.tsx`, `alerts.ts`, `Auth.test.tsx`, `widget.ts`, `common_styles.ts`, `Icons/index.tsx`, `Splash.test.tsx`, `GmailViews.tsx`, `react-native-device-info`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dropdown/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `navigate`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.049883449883449886 - nodes in this community are weakly interconnected._
- **Why does `android` connect `scripts` to `RenewlessWidgetProvider.kt`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.10034013605442177 - nodes in this community are weakly interconnected._