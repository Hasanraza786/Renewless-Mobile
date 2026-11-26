# Graph Report - Renewless-mobile  (2026-11-26)

## Corpus Check
- 394 files · ~161,696 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2424 nodes · 8834 edges · 109 communities (85 shown, 24 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 160 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d37e441c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ReminderSettings/index.tsx
- adapters.ts
- Container
- Home/index.tsx
- AiChat/index.function.ts
- Onboarding/index.function.ts
- getReceipts
- alerts-action.ts
- PlatformSubscriptions/index.tsx
- CustomText/index.tsx
- SubscriptionFields/index.tsx
- MainNavigator.tsx
- App.tsx
- iOS Widget Models
- Container (2)
- detail-action.ts
- ai-consent.test.ts
- navigate
- Dev Dependencies
- Tabs.tsx
- requestHandler
- react
- HomeScreen
- scan-utils.test.ts
- VoiceRecorder.tsx
- SubscriptionDetail/index.function.ts
- types.ts
- Settings/index.tsx
- InputField
- api_services/request-handler.ts
- icons/index.ts
- DetailSheets.tsx
- Payments/index.tsx
- onboarding-action.ts
- gmail-action.ts
- useAppSelector
- Release Blockers & Gaps
- profile-action.ts
- AddOptions/index.tsx
- support-action.ts
- types.ts (4)
- Profile/index.tsx
- session-token.ts
- Community 68
- HelpSupport/index.tsx
- store.ts
- glyph_icons.ts
- ContactUs/index.function.ts
- Calendar/index.function.ts
- Icons/index.tsx (2)
- list.ts
- RowView
- Calendar/index.function.ts
- app-update-hook.test.tsx
- adapters.ts
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- Payments/index.tsx
- http-provider.ts
- theme.ts
- history.ts
- Welcome/index.tsx
- alerts.ts
- patch
- platform_logos.ts
- calendar.ts
- Auth.test.tsx
- Home/index.function.ts
- CustomButton/index.tsx
- @react-native-documents/picker
- types.ts (5)
- Metro Config
- status_colors.ts
- goBack
- Icons/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- Community 78
- react-native-config
- types.ts (6)
- Mascot
- Splash.test.tsx
- list-slice.test.ts
- CustomText
- widget_icons.ts
- react-native-device-info
- logo_mark.ts
- @notifee/react-native
- Canonical Doc Owners
- payments-action.ts
- WidgetBridge ObjC
- receipt-file.ts
- react-native-calendars
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `COLORS` - 171 edges
3. `SIZES` - 170 edges
4. `CustomText()` - 154 edges
5. `RowView()` - 144 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 91 edges
8. `fonts` - 90 edges
9. `requestHandler()` - 87 edges
10. `Icons()` - 81 edges

## Surprising Connections (you probably didn't know these)
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
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

## Communities (109 total, 24 thin omitted)

### Community 0 - "ReminderSettings/index.tsx"
Cohesion: 0.14
Nodes (12): react-native-safe-area-context, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles (+4 more)

### Community 1 - "adapters.ts"
Cohesion: 0.06
Nodes (32): AiUsageDto, AlertsDto, AppConfigDto, BillingDto, CategoryDto, ChallengeDto, ChatTurnDto, ConnectorDto (+24 more)

### Community 2 - "Container"
Cohesion: 0.18
Nodes (28): Container(), CurrencyTabs(), Header(), MenuGroup(), StateView(), SubscriptionCard(), AddSubscriptionScreen(), CalendarScreen() (+20 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.10
Nodes (30): openLegal(), focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat() (+22 more)

### Community 5 - "Onboarding/index.function.ts"
Cohesion: 0.07
Nodes (32): PRIVACY_URL, TERMS_URL, resetRoot(), answerScanNotify(), saveOnboardingFinds(), DEEP_POLL_MS, DEEP_WAIT_MS, ONBOARDING_STEPS (+24 more)

### Community 6 - "getReceipts"
Cohesion: 0.50
Nodes (4): receiptDate(), toReceipt(), getAllReceipts(), getReceipts()

### Community 7 - "alerts-action.ts"
Cohesion: 0.12
Nodes (19): fromReminderSettings(), toReminderSettings(), AlertDto, flag(), getAlerts(), getApplyCount(), getReminderSettings(), saveReminderSettings() (+11 more)

### Community 8 - "PlatformSubscriptions/index.tsx"
Cohesion: 0.15
Nodes (16): @react-navigation/native, @react-navigation/native-stack, ConnectedInboxController, ConnectedInboxRoute, STATUS, useConnectedInbox(), InboxSubscriptionsRoute, Route (+8 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.07
Nodes (40): chevron_right_icon, benefit_check_icon, Props, styles, styles, Props, MAX_FONT_SCALE, Props (+32 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.14
Nodes (31): Props, styles, searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), ScanCycle, CURRENCIES, addDays() (+23 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.08
Nodes (4): stack_options, AppStack, theme, navigationRef

### Community 12 - "App.tsx"
Cohesion: 0.18
Nodes (11): App(), displayName, name, react-test-renderer@19.2.3, react-test-renderer, MainNavigator(), persistor, store (+3 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (40): dependencies, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, @react-native-community/datetimepicker@^9.2.2, react-native-confirmation-code-field@^9.0.0, @react-native-firebase/analytics@26.4.0 (+32 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.14
Nodes (24): fromReminder(), toDetail(), toSubscriptionBody(), cancelSubscription(), createFromForm(), current(), deleteSubscription(), findPlatforms() (+16 more)

### Community 16 - "ai-consent.test.ts"
Cohesion: 0.29
Nodes (4): getMe(), saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (40): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+32 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.22
Nodes (8): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack, TabParamList

### Community 20 - "requestHandler"
Cohesion: 0.10
Nodes (50): toProfile(), navigate(), NavigateArgs, popTo(), RootParamList, TAB_NAMES, beginSession(), changePassword() (+42 more)

### Community 21 - "react"
Cohesion: 0.05
Nodes (63): react, react-native-svg, Props, Props, Props, Props, Props, GmailRecoveryArt() (+55 more)

### Community 22 - "HomeScreen"
Cohesion: 0.16
Nodes (16): AddOptions(), AddSheet(), ChooseInboxSheet(), InboxProviders(), Chart(), Forecast(), shortMonth(), Column() (+8 more)

### Community 23 - "scan-utils.test.ts"
Cohesion: 0.40
Nodes (3): ScanCandidate, nextEvent(), items

### Community 24 - "VoiceRecorder.tsx"
Cohesion: 0.07
Nodes (23): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+15 more)

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.21
Nodes (19): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, amountLabel() (+11 more)

### Community 26 - "types.ts"
Cohesion: 0.04
Nodes (62): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, status_colors, alertsSlice, initial_state, Key, authSlice, initial_state (+54 more)

### Community 27 - "Settings/index.tsx"
Cohesion: 0.08
Nodes (18): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+10 more)

### Community 28 - "InputField"
Cohesion: 0.19
Nodes (16): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), Stack, ForgotPasswordScreen(), styles, LoginScreen() (+8 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.07
Nodes (57): get(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft(), createSubscription() (+49 more)

### Community 30 - "icons/index.ts"
Cohesion: 0.10
Nodes (28): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon (+20 more)

### Community 31 - "DetailSheets.tsx"
Cohesion: 0.13
Nodes (45): AddChoiceLinks(), AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField() (+37 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.21
Nodes (20): getPayments(), EMPTY, PaymentsController, PaymentsRoute, usePayments(), MoneyTotal, PaymentRecord, alignedMonth() (+12 more)

### Community 33 - "onboarding-action.ts"
Cohesion: 0.07
Nodes (33): isAuthExpired(), toInbox(), connectGmailInbox(), connectOutlookInbox(), day(), scannedBeforeNotice(), connectOnboardingGoogle(), connectOnboardingOutlook() (+25 more)

### Community 34 - "gmail-action.ts"
Cohesion: 0.08
Nodes (39): failedGmailScan(), fromGmailSelection(), toRecord(), apiServices, connectInbox(), getGmailInboxes(), getGmailScan(), INBOX_LIMIT_NOTICE (+31 more)

### Community 35 - "useAppSelector"
Cohesion: 0.14
Nodes (23): UndoToast(), AuthStack(), markSupportRead(), useAppDispatch(), useAppSelector, useHelpSupport(), HistoryController, useHistory() (+15 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "profile-action.ts"
Cohesion: 0.07
Nodes (15): toInboxSlots(), getProfileData(), ProfileInput, actions, connector, grant, mockDeleteMe, mockOutlookLogin (+7 more)

### Community 38 - "AddOptions/index.tsx"
Cohesion: 0.15
Nodes (9): OPTIONS, Props, styles, Props, Props, styles, Props, styles (+1 more)

### Community 39 - "support-action.ts"
Cohesion: 0.18
Nodes (9): getSupportMessages(), SupportInput, ADMIN_SCREENS, listenToPush(), messaging, openReminder(), pushToken(), showInApp() (+1 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.10
Nodes (9): Props, Props, PROVIDERS, styles, MenuItem, Props, styles, styles (+1 more)

### Community 42 - "session-token.ts"
Cohesion: 0.21
Nodes (10): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, app_storage, saveSessionToken() (+2 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "HelpSupport/index.tsx"
Cohesion: 0.47
Nodes (3): mail_icon, SUPPORT_QUESTIONS, styles

### Community 45 - "store.ts"
Cohesion: 0.10
Nodes (7): redux-persist, mmkv, redux_storage, AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 46 - "glyph_icons.ts"
Cohesion: 0.40
Nodes (4): arrow_right_icon, external_icon, more_icon, plus_glyph_icon

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.31
Nodes (7): TOPIC_OPTIONS, topicOf(), useContactUs(), SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN, SUPPORT_TOPIC_LABELS

### Community 48 - "Calendar/index.function.ts"
Cohesion: 0.22
Nodes (10): getCalendarMonth(), CalendarController, CalendarRoute, EMPTY, PickerAnchor, useCalendar(), shiftMonth(), currencyOrder() (+2 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 51 - "RowView"
Cohesion: 0.07
Nodes (60): AppUpdate(), ConfirmDialog(), DialogCard(), DisabledAccountDialog(), AnimatedPath, Icons(), ImagePreview(), LinkText() (+52 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.17
Nodes (13): toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "adapters.ts"
Cohesion: 0.05
Nodes (65): categories, categoryId(), categoryName(), CYCLES, dayLabel(), EVENT_TYPES, failingRow(), FORM_TO_BACKEND (+57 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Payments/index.tsx"
Cohesion: 0.11
Nodes (13): Props, styles, LEGEND, styles, Props, styles, NOTES, styles (+5 more)

### Community 60 - "http-provider.ts"
Cohesion: 0.09
Nodes (23): axios@^1.21.1, axios, client, del(), newKey(), pending_keys, postLong(), put() (+15 more)

### Community 61 - "theme.ts"
Cohesion: 0.05
Nodes (52): react-native, styles, Props, styles, styles, Props, styles, Props (+44 more)

### Community 62 - "history.ts"
Cohesion: 0.27
Nodes (8): SubscriptionRecord, HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 63 - "Welcome/index.tsx"
Cohesion: 0.22
Nodes (4): BENEFITS, Props, ORBIT_SIZE, styles

### Community 64 - "alerts.ts"
Cohesion: 0.18
Nodes (20): useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS, accountDisplay(), accountValues(), alertMessage(), localDate(), nextAccountValues() (+12 more)

### Community 65 - "patch"
Cohesion: 0.25
Nodes (8): fromCycle(), fromScanCandidate(), patch(), savePreferences(), updateCandidate(), updateMe(), updateSubscription(), editOnboardingCandidate()

### Community 66 - "platform_logos.ts"
Cohesion: 0.20
Nodes (9): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+1 more)

### Community 67 - "calendar.ts"
Cohesion: 0.15
Nodes (12): detailSlice, initial_state, Key, DetailState, HomeEvent, SubscriptionDetail, dayMarker(), monthTitle() (+4 more)

### Community 68 - "Auth.test.tsx"
Cohesion: 0.09
Nodes (12): ApiError, endSession(), Options, SESSION_ENDED, forgetPushToken(), clearSessionToken(), clearWidgetSnapshot(), mockBackend (+4 more)

### Community 69 - "Home/index.function.ts"
Cohesion: 0.10
Nodes (22): toHome(), bundledLogoKey(), syncAiConsent(), registerPush(), savePushToken(), getDashboard(), getHomeData(), dismissBackgroundScan() (+14 more)

### Community 70 - "CustomButton/index.tsx"
Cohesion: 0.11
Nodes (11): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, CONNECT_LABELS, Props, TRUST_ROWS (+3 more)

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.10
Nodes (21): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, goBack(), selectUser(), Fields, passwordErrors() (+13 more)

### Community 76 - "Icons/index.tsx"
Cohesion: 0.11
Nodes (11): Props, styles, Props, styles, Frame, Props, styles, Props (+3 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots"
Cohesion: 0.29
Nodes (6): Backend bugs from the second pass, Bugs and gaps, Fourth pass (usage bills in onboarding), QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots, Second pass (same day, after the design revisions), Third pass (auto-advance and dismiss)

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 82 - "react-native-config"
Cohesion: 0.14
Nodes (8): react-native-config@^1.7.2, react-native-gesture-handler@^3.3.0, react-native-nitro-modules@^0.36.5, engines, node, react-native-config, react-native-gesture-handler, react-native-nitro-modules

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 84 - "Mascot"
Cohesion: 0.15
Nodes (18): busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot(), InboxLine(), ScanningView(), Empty() (+10 more)

### Community 85 - "Splash.test.tsx"
Cohesion: 0.39
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 87 - "CustomText"
Cohesion: 0.09
Nodes (54): CustomText(), InfoTooltip(), OnboardingTitle(), PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), FieldError() (+46 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 94 - "payments-action.ts"
Cohesion: 0.33
Nodes (3): toPayment(), PaymentDto, getAllPayments()

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 96 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 634 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `theme.ts` to `ReminderSettings/index.tsx`, `AiChat/index.function.ts`, `Onboarding/index.function.ts`, `alerts-action.ts`, `PlatformSubscriptions/index.tsx`, `CustomText/index.tsx`, `SubscriptionFields/index.tsx`, `App.tsx`, `Container (2)`, `navigate`, `Tabs.tsx`, `requestHandler`, `react`, `VoiceRecorder.tsx`, `SubscriptionDetail/index.function.ts`, `Settings/index.tsx`, `InputField`, `DetailSheets.tsx`, `gmail-action.ts`, `profile-action.ts`, `AddOptions/index.tsx`, `support-action.ts`, `Profile/index.tsx`, `HelpSupport/index.tsx`, `app-update-hook.test.tsx`, `Payments/index.tsx`, `Welcome/index.tsx`, `Auth.test.tsx`, `Home/index.function.ts`, `CustomButton/index.tsx`, `goBack`, `Icons/index.tsx`, `Splash.test.tsx`, `react-native-device-info`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ReminderSettings/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._
- **Should `AiChat/index.function.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10099573257467995 - nodes in this community are weakly interconnected._