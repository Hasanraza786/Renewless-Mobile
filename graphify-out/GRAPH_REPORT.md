# Graph Report - Renewless-mobile  (2026-11-17)

## Corpus Check
- 466 files · ~145,387 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2287 nodes · 8228 edges · 113 communities (88 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 145 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- adapters.ts
- RenewlessWidgetProvider.kt
- requestHandler
- Home/index.tsx
- Container
- ListDialogs.tsx
- onboarding_icons.ts
- profile-action.ts
- detail-action.ts (2) (2)
- CustomText/index.tsx
- API DTOs & Request Handler
- types.ts
- icons/index.ts
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- YourSubscriptions/index.tsx
- navigate
- Dev Dependencies
- iOS AppDelegate
- Payments Utils
- theme.ts
- iOS Native Imports
- store.ts
- Community 21
- ScanRecovery/index.tsx
- store.ts (2)
- detail-action.ts (2)
- CustomButton
- theme.ts (2)
- service.ts (2)
- RowView
- ContactUs/index.function.ts
- GmailViews.tsx
- Runtime Dependencies
- Final release audit 17 November 2026
- Release Blockers & Gaps
- Countries & Phone
- types.ts (2)
- Release Blockers & Gaps (2)
- types.ts (4)
- QA Plan & Contracts
- GmailViews.tsx (2)
- Community 68
- adapters.ts (2)
- AiChat/index.function.ts
- CustomText/index.tsx (2)
- Profile/index.tsx (2)
- Countries & Phone (2)
- Icons/index.tsx (2)
- Container (2)
- API DTOs & Request Handler (2)
- Calendar/index.function.ts
- SubscriptionFields/index.tsx (2)
- iOS Widget Bridge
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- Container (3)
- theme.ts (3)
- requestHandler (3)
- iOS SceneDelegate
- AiChat/index.function.ts (2)
- types.ts (3)
- store.ts (2) (2)
- React Native Delegate
- CustomButton (2)
- YourSubscriptions/index.tsx (2)
- Project Working Rules
- Runtime Dependencies (2)
- types.ts (5)
- Metro Config
- status_colors.ts
- QA Plan & Contracts (2)
- Android MainActivity
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- Community 21 (2)
- Runtime Dependencies (2) (2)
- Community 78
- Persisted Storage
- types.ts (6)
- Auth.test.tsx
- types.ts (2) (2)
- iOS Widget Bridge (2)
- types.ts (3) (2)
- money
- store.ts (2) (3)
- store.ts (2) (4)
- CustomButton (3)
- Canonical Doc Owners
- Container (2) (2)
- WidgetBridge ObjC
- Runtime Dependencies (3)
- store.ts (2) (2)
- types.ts (3) (3)
- Runtime Dependencies (4)
- Container (2) (3)
- Container (2) (4)
- Runtime Dependencies (6)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 194 edges
2. `COLORS` - 165 edges
3. `SIZES` - 164 edges
4. `RowView()` - 148 edges
5. `CustomText()` - 139 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 88 edges
8. `fonts` - 86 edges
9. `CustomButton()` - 75 edges
10. `useAppSelector` - 69 edges

## Surprising Connections (you probably didn't know these)
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `F3: Required-update lockout via minBuild, no upper bound [Gate met; code open]` --references--> `appUpdateFor()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/app-update.ts
- `run()` --calls--> `requestHandler()`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/redux/request-handler.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **Release gates in order** — qa_runs_2026_11_17_final_release_audit_gate1_backend_deploy, qa_runs_2026_11_17_final_release_audit_gate2_hosting_deploy, qa_runs_2026_11_17_final_release_audit_gate3_store_privacy_forms, qa_runs_2026_11_17_final_release_audit_gate4_app_config_null, qa_runs_2026_11_17_final_release_audit_gate5_build_numbers, qa_runs_2026_11_17_final_release_audit_gate6_manual_checklist [EXTRACTED 1.00]
- **Disabled-account deletion path** — qa_runs_2026_11_17_final_release_audit_f1, qa_runs_2026_11_17_final_release_audit_f5, qa_runs_2026_11_17_final_release_audit_f33, qa_runs_2026_11_17_final_release_audit_f36, qa_runs_2026_11_17_final_release_audit_f37, qa_runs_2026_11_17_final_release_audit_f55, qa_runs_2026_11_17_final_release_audit_f73, qa_runs_2026_11_17_final_release_audit_f78 [INFERRED 0.85]
- **Store privacy disclosure consistency** — qa_runs_2026_11_17_final_release_audit_f2, qa_runs_2026_11_17_final_release_audit_f28, qa_runs_2026_11_17_final_release_audit_f29, qa_runs_2026_11_17_final_release_audit_f30, qa_runs_2026_11_17_final_release_audit_f31, qa_runs_2026_11_17_final_release_audit_f64 [INFERRED 0.85]

## Communities (113 total, 25 thin omitted)

### Community 0 - "adapters.ts"
Cohesion: 0.06
Nodes (44): react-native, styles, styles, styles, Props, styles, styles, styles (+36 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.06
Nodes (68): categories, categoryId(), categoryName(), dayLabel(), FORM_TO_BACKEND, fromCycle(), fromScanCandidate(), inboxSource() (+60 more)

### Community 2 - "requestHandler"
Cohesion: 0.10
Nodes (64): Container(), CustomText(), DialogCard(), Header(), AnimatedPath, Icons(), busyMessage(), LoaderModal() (+56 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "Container"
Cohesion: 0.08
Nodes (54): AddChoiceLinks(), ChooseInboxSheet(), InboxProviders(), InfoTooltip(), OnboardingTitle(), SizedBox(), Caption(), GmailRecoveryArt() (+46 more)

### Community 5 - "ListDialogs.tsx"
Cohesion: 0.07
Nodes (40): fromGmailSelection(), toInbox(), openLegal(), PRIVACY_URL, TERMS_URL, connectGmailInbox(), connectInbox(), connectOutlookInbox() (+32 more)

### Community 6 - "onboarding_icons.ts"
Cohesion: 0.07
Nodes (28): fromReminderSettings(), toAppConfig(), toReminderSettings(), apiServices, flag(), getAlerts(), getAllAlerts(), getReminderSettings() (+20 more)

### Community 7 - "profile-action.ts"
Cohesion: 0.08
Nodes (44): getApplyCount(), useNotificationPermission(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), DetailController, detailView() (+36 more)

### Community 8 - "detail-action.ts (2) (2)"
Cohesion: 0.11
Nodes (46): check_dark_icon, AppSheet(), DateField(), toDate(), toIso(), Dropdown(), SubscriptionFields(), CandidateSheet() (+38 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.12
Nodes (28): chevron_right_icon, Props, OPTIONS, Props, Props, Props, Props, styles (+20 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.09
Nodes (42): FieldError(), Props, styles, findPlatforms(), searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion (+34 more)

### Community 11 - "types.ts"
Cohesion: 0.09
Nodes (38): @react-navigation/native-stack, ChallengeDto, SessionDto, DeleteProof, popTo(), closeDisabledAccount(), forgotPassword(), formWide() (+30 more)

### Community 12 - "icons/index.ts"
Cohesion: 0.13
Nodes (31): react, @react-navigation/native, UndoToast(), styles, AuthStack(), navigate(), getSupportMessages(), useAppDispatch() (+23 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (44): dependencies, axios@^1.21.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, @react-native-community/datetimepicker@^9.2.2, react-native-config@^1.7.2 (+36 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.10
Nodes (32): fromReminder(), hasCategories(), setCategories(), toRecord(), toReminder(), cancelSubscription(), createFromForm(), createSubscription() (+24 more)

### Community 16 - "YourSubscriptions/index.tsx"
Cohesion: 0.05
Nodes (12): stack_options, AppStack, theme, navigationRef, ICONS, RAIL_ICONS, RailStack, styles (+4 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (40): 16 Nov release audit (baseline), Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open], F40: latestVersion accepts control/bidi chars [Open], F41: Import does not re-check records added after scan [Open] (+32 more)

### Community 19 - "iOS AppDelegate"
Cohesion: 0.09
Nodes (30): focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), changeProductUpdates() (+22 more)

### Community 20 - "Payments Utils"
Cohesion: 0.07
Nodes (21): MAX_FONT_SCALE, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles (+13 more)

### Community 21 - "theme.ts"
Cohesion: 0.10
Nodes (33): AiUsageDto, AlertsDto, GoogleConnectDto, PaymentsDto, PaymentsSummaryDto, ScanImportDto, SubscriptionListDto, get() (+25 more)

### Community 22 - "iOS Native Imports"
Cohesion: 0.10
Nodes (20): bundledLogoKey(), syncAiConsent(), registerPush(), savePushToken(), getDashboard(), getHomeData(), getSyncLockedInbox(), HomeRoute (+12 more)

### Community 23 - "store.ts"
Cohesion: 0.12
Nodes (24): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+16 more)

### Community 24 - "Community 21"
Cohesion: 0.09
Nodes (25): toProfile(), resetRoot(), beginSession(), deleteDisabledAccount(), syncAccount(), timezone(), connectOnboardingGoogle(), connectOnboardingOutlook() (+17 more)

### Community 25 - "ScanRecovery/index.tsx"
Cohesion: 0.11
Nodes (29): RowView(), SpendRow(), SpendRows(), TrialRows(), BlinkingMic(), clock(), HoldBar(), LiveWave() (+21 more)

### Community 26 - "store.ts (2)"
Cohesion: 0.08
Nodes (27): initial_state, onboardingSlice, AuthResponse, Cycle, Gender, GmailScanStatus, GoogleConnection, HomePlatformSpend (+19 more)

### Community 27 - "detail-action.ts (2)"
Cohesion: 0.14
Nodes (17): benefit_check_icon, AddOptions(), AddSheet(), Props, Props, BENEFITS, CAPTIONS, DEMO_TILES (+9 more)

### Community 28 - "CustomButton"
Cohesion: 0.10
Nodes (14): OutlookConnectDto, OutlookLoginDto, deleteAccount(), apple(), GmailGrant, gmailSignIn(), google(), isOutlookCancel() (+6 more)

### Community 29 - "theme.ts (2)"
Cohesion: 0.09
Nodes (26): post(), applyReminderDefault(), changePassword(), completeOnboarding(), createFromDraft(), createSubscription(), deleteDisabledAccount(), forgotPassword() (+18 more)

### Community 30 - "service.ts (2)"
Cohesion: 0.10
Nodes (22): apple_icon, arrow_icon, calendar_icon, check_icon, chevron_down_icon, edit_icon, find_grey_icon, find_icon (+14 more)

### Community 31 - "RowView"
Cohesion: 0.17
Nodes (24): AppUpdate(), AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), ConfirmDialog(), CustomButton(), InputField() (+16 more)

### Community 32 - "ContactUs/index.function.ts"
Cohesion: 0.18
Nodes (22): Field(), PaymentDialog(), Empty(), EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentsScreen() (+14 more)

### Community 33 - "GmailViews.tsx"
Cohesion: 0.12
Nodes (20): goBack(), NavigateArgs, RootParamList, TAB_NAMES, changePassword(), selectUser(), Fields, passwordErrors() (+12 more)

### Community 34 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (18): ApiError, client, del(), newKey(), pending_keys, postLong(), request(), upload() (+10 more)

### Community 35 - "Final release audit 17 November 2026"
Cohesion: 0.15
Nodes (18): getCalendarMonth(), Props, styles, THEME, CalendarController, CalendarRoute, EMPTY, PickerAnchor (+10 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "Countries & Phone"
Cohesion: 0.13
Nodes (17): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, endSession(), forgetPushToken() (+9 more)

### Community 38 - "types.ts (2)"
Cohesion: 0.11
Nodes (16): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, calendarSlice, initial_state, dashboardSlice, initial_state, initial_state, paymentsSlice (+8 more)

### Community 39 - "Release Blockers & Gaps (2)"
Cohesion: 0.13
Nodes (10): react-native-safe-area-context, Props, styles, Props, styles, behavior, styles, DEVICE (+2 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "QA Plan & Contracts"
Cohesion: 0.13
Nodes (17): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+9 more)

### Community 42 - "GmailViews.tsx (2)"
Cohesion: 0.11
Nodes (6): mmkv, redux_storage, AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "adapters.ts (2)"
Cohesion: 0.18
Nodes (9): filter_icon, Props, styles, Props, Props, styles, styles, ListController (+1 more)

### Community 45 - "AiChat/index.function.ts"
Cohesion: 0.21
Nodes (17): ImagePreview(), Cell(), clock(), DraftCard(), FileBubble(), LoopAuthor(), MessageItem(), Props (+9 more)

### Community 46 - "CustomText/index.tsx (2)"
Cohesion: 0.18
Nodes (10): styles, Props, styles, Props, styles, styles, SupportMessage, SUPPORT_MESSAGE_MAX (+2 more)

### Community 47 - "Profile/index.tsx (2)"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 48 - "Countries & Phone (2)"
Cohesion: 0.14
Nodes (13): App(), displayName, name, react-redux@^9.3.0, redux-persist@^6.0.0, react-test-renderer@19.2.3, react-redux, react-test-renderer (+5 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.14
Nodes (18): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F3: Required-update lockout via minBuild, no upper bound [Gate met; code open], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed] (+10 more)

### Community 50 - "Container (2)"
Cohesion: 0.14
Nodes (11): Props, Props, STAGES, RADAR_SIZE, styles, CONFETTI_COLORS, PIECES, Props (+3 more)

### Community 51 - "API DTOs & Request Handler (2)"
Cohesion: 0.16
Nodes (9): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, mock_dispatch (+1 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.18
Nodes (17): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+9 more)

### Community 53 - "SubscriptionFields/index.tsx (2)"
Cohesion: 0.16
Nodes (8): useAppUpdate(), AppConfig, appUpdateFor(), mockDispatch, mockGetAppConfig, openURL, renderHook(), config

### Community 54 - "iOS Widget Bridge"
Cohesion: 0.13
Nodes (10): inboxSlice, initial_state, Key, initial_state, listSlice, InboxDetail, InboxState, ListState (+2 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Container (3)"
Cohesion: 0.18
Nodes (12): hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon, accessCopy(), COPY, Kind, Props (+4 more)

### Community 60 - "theme.ts (3)"
Cohesion: 0.17
Nodes (12): patch(), cancelSubscription(), getPriceHistory(), getSubscription(), getSubscriptionReceipts(), restoreSubscription(), resumeSubscription(), savePreferences() (+4 more)

### Community 61 - "requestHandler (3)"
Cohesion: 0.20
Nodes (4): Props, styles, PLACEHOLDERS, styles

### Community 62 - "iOS SceneDelegate"
Cohesion: 0.18
Nodes (10): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+2 more)

### Community 63 - "AiChat/index.function.ts (2)"
Cohesion: 0.18
Nodes (3): Props, DiscardBin(), LockHint()

### Community 65 - "store.ts (2) (2)"
Cohesion: 0.24
Nodes (6): OUTLOOK_SOCIAL_ICON, Props, styles, Props, Props, styles

### Community 67 - "React Native Delegate"
Cohesion: 0.27
Nodes (8): filterHistory(), HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 68 - "CustomButton (2)"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 69 - "YourSubscriptions/index.tsx (2)"
Cohesion: 0.27
Nodes (7): ConnectedInboxController, ConnectedInboxRoute, STATUS, useConnectedInbox(), formatDate(), isIsoDate(), syncLabel()

### Community 70 - "Project Working Rules"
Cohesion: 0.31
Nodes (8): store, ADMIN_SCREENS, listenToPush(), messaging, openReminder(), pushToken(), showInApp(), tap()

### Community 71 - "Runtime Dependencies (2)"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "QA Plan & Contracts (2)"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "Community 21 (2)"
Cohesion: 0.39
Nodes (6): resendCode(), clock(), CODE_LENGTH, Route, useOtp(), latinDigits()

### Community 80 - "Runtime Dependencies (2) (2)"
Cohesion: 0.25
Nodes (6): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 82 - "Persisted Storage"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 84 - "Auth.test.tsx"
Cohesion: 0.40
Nodes (6): Checklist: disabled account dialog device check, F37: Onboarding connect path lacks disabled-account delete [Fixed], F55: Disabled-account delete no loader, retry errors [Fixed], F56: Session ended mid-use drops to Login without notice [Fixed], F78: Disabled-account flow shipped while Pending reapproval [Fixed/locked], DisabledAccountDialog()

### Community 85 - "types.ts (2) (2)"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 86 - "iOS Widget Bridge (2)"
Cohesion: 0.33
Nodes (5): detailSlice, initial_state, Key, DetailState, SubscriptionDetail

### Community 87 - "types.ts (3) (2)"
Cohesion: 0.33
Nodes (4): DangerButton(), initials(), ProfileScreen(), syncDate()

### Community 88 - "money"
Cohesion: 0.50
Nodes (3): close_icon, Props, styles

### Community 90 - "store.ts (2) (4)"
Cohesion: 0.60
Nodes (3): AiDraft, missingQuestion(), draft

### Community 91 - "CustomButton (3)"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 94 - "Container (2) (2)"
Cohesion: 0.33
Nodes (4): @invertase/react-native-apple-authentication@^2.5.1, react-native-responsive-fontsize@^0.5.1, @invertase/react-native-apple-authentication, react-native-responsive-fontsize

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 96 - "Runtime Dependencies (3)"
Cohesion: 0.50
Nodes (3): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 593 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `adapters.ts` to `Container`, `ListDialogs.tsx`, `onboarding_icons.ts`, `profile-action.ts`, `detail-action.ts (2) (2)`, `CustomText/index.tsx`, `API DTOs & Request Handler`, `types.ts`, `icons/index.ts`, `Container (2)`, `YourSubscriptions/index.tsx`, `navigate`, `iOS AppDelegate`, `Payments Utils`, `iOS Native Imports`, `store.ts`, `Community 21`, `ScanRecovery/index.tsx`, `detail-action.ts (2)`, `service.ts (2)`, `Final release audit 17 November 2026`, `Release Blockers & Gaps (2)`, `QA Plan & Contracts`, `adapters.ts (2)`, `AiChat/index.function.ts`, `CustomText/index.tsx (2)`, `Countries & Phone (2)`, `Container (2)`, `API DTOs & Request Handler (2)`, `SubscriptionFields/index.tsx (2)`, `Container (3)`, `requestHandler (3)`, `AiChat/index.function.ts (2)`, `types.ts (3)`, `store.ts (2) (2)`, `CustomButton (2)`, `Project Working Rules`, `Android MainActivity`, `money`, `types.ts (3) (3)`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056235134216785596 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.057511737089201875 - nodes in this community are weakly interconnected._
- **Should `requestHandler` be split into smaller, more focused modules?**
  _Cohesion score 0.09821428571428571 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._