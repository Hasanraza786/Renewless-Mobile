# Graph Report - Renewless-mobile  (2026-11-24)

## Corpus Check
- 383 files · ~148,286 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2327 nodes · 8542 edges · 100 communities (78 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 150 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c6355fe2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react-native
- RenewlessWidgetProvider.kt
- requestHandler
- Home/index.tsx
- Onboarding/index.function.ts
- auth-action.ts
- redux/request-handler.ts
- ReminderSettings/index.function.ts
- CustomButton
- RowView/index.tsx
- API DTOs & Request Handler
- MainNavigator.tsx
- store.ts
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- get
- navigate
- Dev Dependencies
- AiChat/index.function.ts
- AddOptions/index.tsx
- react
- iOS Native Imports
- store.ts
- DisabledAccountDialog
- CustomText
- types.ts
- request
- money
- api_services/request-handler.ts
- service.ts (2)
- RowView
- Payments/index.tsx
- gmail-action.ts
- outlook-login.test.ts
- useAppSelector
- Release Blockers & Gaps
- App.tsx
- alerts-action.ts
- react-native
- types.ts (4)
- Settings/index.tsx
- react-native-mmkv
- Community 68
- ReadyToGo/index.tsx
- ChatParts.tsx
- MessageRow/index.tsx
- ContactUs/index.function.ts
- CustomText/index.tsx
- Icons/index.tsx (2)
- SubscriptionDetail/index.function.ts
- HomeScreen
- Calendar/index.function.ts
- app-update-hook.test.tsx
- subscription
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- localToday
- Receipts/index.function.ts
- theme.ts
- ai-consent.test.ts
- fonts
- Profile/index.tsx
- SubscriptionDetail/index.tsx
- useProfile
- ImagePreview/index.tsx
- platform_logos.ts
- sync-locked-inbox.test.ts
- HelpSupport/index.tsx
- widget_icons.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- EditProfile/index.function.ts
- PaymentChart.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- @notifee/react-native
- react-native-screens@^4.29.0
- Community 78
- types.ts (6)
- RowView
- react-native-nitro-sound
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)
- logo_mark.ts

## God Nodes (most connected - your core abstractions)
1. `react-native` - 196 edges
2. `COLORS` - 168 edges
3. `SIZES` - 166 edges
4. `CustomText()` - 146 edges
5. `RowView()` - 145 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 88 edges
8. `fonts` - 87 edges
9. `CustomButton()` - 86 edges
10. `requestHandler()` - 82 edges

## Surprising Connections (you probably didn't know these)
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `F3: Required-update lockout via minBuild, no upper bound [Gate met; code open]` --references--> `appUpdateFor()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/app-update.ts
- `fails()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/api_services/http-provider.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **Release gates in order** — qa_runs_2026_11_17_final_release_audit_gate1_backend_deploy, qa_runs_2026_11_17_final_release_audit_gate2_hosting_deploy, qa_runs_2026_11_17_final_release_audit_gate3_store_privacy_forms, qa_runs_2026_11_17_final_release_audit_gate4_app_config_null, qa_runs_2026_11_17_final_release_audit_gate5_build_numbers, qa_runs_2026_11_17_final_release_audit_gate6_manual_checklist [EXTRACTED 1.00]
- **Disabled-account deletion path** — qa_runs_2026_11_17_final_release_audit_f1, qa_runs_2026_11_17_final_release_audit_f5, qa_runs_2026_11_17_final_release_audit_f33, qa_runs_2026_11_17_final_release_audit_f36, qa_runs_2026_11_17_final_release_audit_f37, qa_runs_2026_11_17_final_release_audit_f55, qa_runs_2026_11_17_final_release_audit_f73, qa_runs_2026_11_17_final_release_audit_f78 [INFERRED 0.85]
- **Store privacy disclosure consistency** — qa_runs_2026_11_17_final_release_audit_f2, qa_runs_2026_11_17_final_release_audit_f28, qa_runs_2026_11_17_final_release_audit_f29, qa_runs_2026_11_17_final_release_audit_f30, qa_runs_2026_11_17_final_release_audit_f31, qa_runs_2026_11_17_final_release_audit_f64 [INFERRED 0.85]

## Communities (100 total, 22 thin omitted)

### Community 0 - "react-native"
Cohesion: 0.09
Nodes (21): react, react-native, react-native-safe-area-context, Props, Props, styles, Props, styles (+13 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (67): categories, categoryId(), CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromCycle(), fromReminder() (+59 more)

### Community 2 - "requestHandler"
Cohesion: 0.11
Nodes (38): AppUpdate(), Container(), CurrencyTabs(), Header(), busyMessage(), LoaderModal(), AnimatedPath, Face() (+30 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "Onboarding/index.function.ts"
Cohesion: 0.12
Nodes (19): openLegal(), PRIVACY_URL, TERMS_URL, resetRoot(), MAX_INBOXES, finishOnboarding(), getOnboardingScan(), saveOnboardingFinds() (+11 more)

### Community 5 - "auth-action.ts"
Cohesion: 0.07
Nodes (45): toProfile(), OutlookConnectDto, OutlookLoginDto, beginSession(), changePassword(), deleteDisabledAccount(), forgotPassword(), formWide() (+37 more)

### Community 6 - "redux/request-handler.ts"
Cohesion: 0.08
Nodes (22): react-native-device-info, toAppConfig(), toCalendarMonth(), ApiError, client, pending_keys, apiServices, API_BASE_URL (+14 more)

### Community 7 - "ReminderSettings/index.function.ts"
Cohesion: 0.12
Nodes (31): flag(), getAlerts(), getApplyCount(), getReminderSettings(), AlertsController, useAlerts(), useNotificationPermission(), Draft (+23 more)

### Community 8 - "CustomButton"
Cohesion: 0.13
Nodes (44): AddChoiceLinks(), AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField() (+36 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.09
Nodes (22): benefit_check_icon, styles, Props, styles, Props, styles, styles, Frame (+14 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.06
Nodes (51): Props, styles, replace(), SubscriptionFormRoute, useSubscriptionForm(), BRAND_MOTION, useSplash(), useSplashReveal() (+43 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.08
Nodes (4): stack_options, AppStack, theme, navigationRef

### Community 12 - "store.ts"
Cohesion: 0.12
Nodes (4): AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.04
Nodes (51): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-blob-util@^1.1.1, react-native-calendars@^1.1314.0 (+43 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.09
Nodes (38): categoryName(), hasCategories(), toDetail(), toPlatformSuggestion(), toRecord(), toSubscriptionBody(), addAiDraft(), saveReminderSettings() (+30 more)

### Community 16 - "get"
Cohesion: 0.11
Nodes (18): get(), getAlerts(), getAppConfig(), getCalendar(), getCategories(), getConnector(), getConnectors(), getHome() (+10 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (40): 16 Nov release audit (baseline), Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open], F40: latestVersion accepts control/bidi chars [Open], F41: Import does not re-check records added after scan [Open] (+32 more)

### Community 19 - "AiChat/index.function.ts"
Cohesion: 0.18
Nodes (15): focusedTab(), startAiChat(), Attachment, IMAGE_TYPES, messageId(), meterLevel(), micAllowed(), Recording (+7 more)

### Community 20 - "AddOptions/index.tsx"
Cohesion: 0.15
Nodes (11): chevron_right_icon, OPTIONS, Props, styles, Props, PROVIDERS, styles, MenuItem (+3 more)

### Community 21 - "react"
Cohesion: 0.06
Nodes (40): Props, Props, Props, Props, GmailRecoveryArt(), Props, STAGES, GmailScanController (+32 more)

### Community 22 - "iOS Native Imports"
Cohesion: 0.12
Nodes (23): navigate(), NavigateArgs, RootParamList, TAB_NAMES, syncAiConsent(), registerPush(), savePushToken(), store (+15 more)

### Community 23 - "store.ts"
Cohesion: 0.07
Nodes (28): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+20 more)

### Community 24 - "DisabledAccountDialog"
Cohesion: 0.33
Nodes (7): Checklist: disabled account dialog device check, F37: Onboarding connect path lacks disabled-account delete [Fixed], F55: Disabled-account delete no loader, retry errors [Fixed], F56: Session ended mid-use drops to Login without notice [Fixed], F78: Disabled-account flow shipped while Pending reapproval [Fixed/locked], DisabledAccountDialog(), closeDisabledAccount()

### Community 25 - "CustomText"
Cohesion: 0.19
Nodes (21): ConfirmDialog(), CustomText(), InfoTooltip(), DisconnectDialog(), AddWidget(), HowToClip(), Strong(), WidgetTile() (+13 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (70): @reduxjs/toolkit, toAiReply(), status_colors, sendAiMessage(), sendTurn(), authSlice, initial_state, requests (+62 more)

### Community 27 - "request"
Cohesion: 0.14
Nodes (12): newKey(), patch(), postLong(), request(), upload(), savePreferences(), sendChatMessage(), updateCandidate() (+4 more)

### Community 28 - "money"
Cohesion: 0.10
Nodes (38): LinkText(), OnboardingTitle(), PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), MonthGrid(), CalendarScreen() (+30 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.09
Nodes (38): AiUsageDto, AlertsDto, ChallengeDto, GoogleConnectDto, PaymentsDto, PaymentsSummaryDto, ScanImportDto, SessionDto (+30 more)

### Community 30 - "service.ts (2)"
Cohesion: 0.11
Nodes (26): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_icon, chevron_down_icon (+18 more)

### Community 31 - "RowView"
Cohesion: 0.09
Nodes (30): @react-navigation/native-stack, AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), Stack, popTo(), ForgotPasswordScreen() (+22 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.10
Nodes (35): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack, NOTES (+27 more)

### Community 33 - "gmail-action.ts"
Cohesion: 0.07
Nodes (41): fromGmailSelection(), toGmailScan(), toInbox(), connectGmailInbox(), connectInbox(), connectOutlookInbox(), getGmailInboxes(), getGmailScan() (+33 more)

### Community 34 - "outlook-login.test.ts"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 35 - "useAppSelector"
Cohesion: 0.08
Nodes (37): @react-navigation/native, UndoToast(), AuthStack(), goBack(), useAppDispatch(), useAppSelector, CalendarController, CalendarRoute (+29 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "App.tsx"
Cohesion: 0.10
Nodes (20): App(), displayName, name, @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-redux@^9.3.0, @react-native-firebase/crashlytics, react-native-keychain (+12 more)

### Community 38 - "alerts-action.ts"
Cohesion: 0.15
Nodes (12): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), getAllAlerts(), saveSettingsAndApply(), alertsSlice, initial_state (+4 more)

### Community 39 - "react-native"
Cohesion: 0.12
Nodes (15): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, SIZES, PLACEHOLDERS, styles (+7 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Settings/index.tsx"
Cohesion: 0.10
Nodes (14): delete_tile_icon, eye_icon, eye_off_icon, help_icon, logout_icon, privacy_icon, refresh_icon, security_accent_icon (+6 more)

### Community 42 - "react-native-mmkv"
Cohesion: 0.29
Nodes (6): react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-mmkv, redux-persist, mmkv, redux_storage

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "ReadyToGo/index.tsx"
Cohesion: 0.12
Nodes (13): react-native-svg, check_dark_icon, Props, styles, Props, styles, ListController, styles (+5 more)

### Community 45 - "ChatParts.tsx"
Cohesion: 0.16
Nodes (17): ImagePreview(), Cell(), clock(), DraftCard(), FileBubble(), LoopAuthor(), MessageItem(), Props (+9 more)

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.12
Nodes (14): getSupportMessages(), markSupportRead(), initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useSupportMessage(), SupportInput (+6 more)

### Community 48 - "CustomText/index.tsx"
Cohesion: 0.15
Nodes (13): MAX_FONT_SCALE, Props, styles, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT (+5 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.14
Nodes (18): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F3: Required-update lockout via minBuild, no upper bound [Gate met; code open], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed] (+10 more)

### Community 50 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.07
Nodes (49): cancelSubscription(), current(), resumeSubscription(), updateNotes(), updateReminder(), HistoryController, useHistory(), ListRoute (+41 more)

### Community 51 - "HomeScreen"
Cohesion: 0.24
Nodes (11): AddOptions(), AddSheet(), ChooseInboxSheet(), Props, InboxProviders(), Chart(), Forecast(), shortMonth() (+3 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.18
Nodes (17): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+9 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.22
Nodes (8): react-test-renderer@19.2.3, react-test-renderer, useAppUpdate(), mockDispatch, mockGetAppConfig, openURL, renderHook(), Probe()

### Community 54 - "subscription"
Cohesion: 0.18
Nodes (11): del(), cancelSubscription(), deleteMe(), disconnectConnector(), getPriceHistory(), getSubscription(), getSubscriptionReceipts(), removeSubscription() (+3 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "localToday"
Cohesion: 0.15
Nodes (11): toPayment(), getAllPayments(), getPayments(), Route, usePlatformSubscriptions(), AppStackParamList, formatDate(), isIsoDate() (+3 more)

### Community 60 - "Receipts/index.function.ts"
Cohesion: 0.21
Nodes (14): receiptDate(), toReceipt(), getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute (+6 more)

### Community 61 - "theme.ts"
Cohesion: 0.07
Nodes (27): Props, styles, Props, styles, Props, styles, Props, styles (+19 more)

### Community 62 - "ai-consent.test.ts"
Cohesion: 0.18
Nodes (8): put(), getMe(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 63 - "fonts"
Cohesion: 0.12
Nodes (14): Props, Props, Props, Row, styles, fonts, BENEFITS, CAPTIONS (+6 more)

### Community 64 - "Profile/index.tsx"
Cohesion: 0.13
Nodes (7): plus_glyph_icon, history_icon, payments_icon, settings_icon, PROVIDER_LABEL, syncDate(), styles

### Community 65 - "SubscriptionDetail/index.tsx"
Cohesion: 0.10
Nodes (11): arrow_right_icon, external_icon, more_icon, Props, styles, BENEFITS, Props, ORBIT_SIZE (+3 more)

### Community 66 - "useProfile"
Cohesion: 0.24
Nodes (8): changeAiConsent(), consentBody(), changeProductUpdates(), useProfile(), useSettings(), dto, mockSave, user

### Community 67 - "ImagePreview/index.tsx"
Cohesion: 0.50
Nodes (3): close_icon, Props, styles

### Community 68 - "platform_logos.ts"
Cohesion: 0.22
Nodes (8): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, spotify_logo

### Community 69 - "sync-locked-inbox.test.ts"
Cohesion: 0.32
Nodes (6): getSyncLockedInbox(), dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 70 - "HelpSupport/index.tsx"
Cohesion: 0.47
Nodes (3): mail_icon, SUPPORT_QUESTIONS, styles

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "EditProfile/index.function.ts"
Cohesion: 0.12
Nodes (17): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, selectUser(), Fields, passwordErrors(), useChangePassword() (+9 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 87 - "RowView"
Cohesion: 0.10
Nodes (41): DialogCard(), AnimatedPath, Icons(), PriceChange(), RowView(), Composer(), BlinkingMic(), clock() (+33 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 610 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `requestHandler`, `Onboarding/index.function.ts`, `auth-action.ts`, `redux/request-handler.ts`, `ReminderSettings/index.function.ts`, `CustomButton`, `RowView/index.tsx`, `API DTOs & Request Handler`, `Container (2)`, `navigate`, `AiChat/index.function.ts`, `AddOptions/index.tsx`, `react`, `iOS Native Imports`, `store.ts`, `api_services/request-handler.ts`, `RowView`, `Payments/index.tsx`, `gmail-action.ts`, `outlook-login.test.ts`, `App.tsx`, `react-native`, `Settings/index.tsx`, `ReadyToGo/index.tsx`, `ChatParts.tsx`, `MessageRow/index.tsx`, `ContactUs/index.function.ts`, `CustomText/index.tsx`, `SubscriptionDetail/index.function.ts`, `HomeScreen`, `app-update-hook.test.tsx`, `theme.ts`, `fonts`, `Profile/index.tsx`, `SubscriptionDetail/index.tsx`, `ImagePreview/index.tsx`, `HelpSupport/index.tsx`, `PaymentChart.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react-native` be split into smaller, more focused modules?**
  _Cohesion score 0.08888888888888889 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.05352112676056338 - nodes in this community are weakly interconnected._
- **Should `requestHandler` be split into smaller, more focused modules?**
  _Cohesion score 0.11470985155195682 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._