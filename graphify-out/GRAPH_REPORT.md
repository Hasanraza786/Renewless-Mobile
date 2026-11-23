# Graph Report - Renewless-mobile  (2026-11-23)

## Corpus Check
- 383 files · ~147,345 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2302 nodes · 8585 edges · 106 communities (80 shown, 26 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 150 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `defc78b8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SIZES
- RenewlessWidgetProvider.kt
- requestHandler
- Home/index.tsx
- ScanRecovery/index.tsx
- requestHandler
- redux/request-handler.ts
- ReminderSettings/index.function.ts
- CustomButton
- fonts
- API DTOs & Request Handler
- types.ts
- useAppSelector
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- Tabs.tsx
- navigate
- Dev Dependencies
- iOS AppDelegate
- money
- react
- iOS Native Imports
- store.ts
- ConfirmDialog
- CustomText
- store.ts (2)
- VoiceRecorder.tsx
- GmailScanScreen
- api_services/request-handler.ts
- service.ts (2)
- RowView
- ContactUs/index.function.ts
- gmail-action.ts
- profile-action.ts
- calendar.ts
- Release Blockers & Gaps
- App.tsx
- types.ts (2)
- react-native
- types.ts (4)
- icons/index.ts
- react-native-mmkv
- Community 68
- ReadyToGo/index.tsx
- RowView
- MessageRow/index.tsx
- ContactUs/index.function.ts
- CustomText/index.tsx
- Icons/index.tsx (2)
- List/index.function.ts
- API DTOs & Request Handler (2)
- Calendar/index.function.ts
- SubscriptionFields/index.tsx (2)
- history.ts
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- localToday
- receipts-action.ts
- theme.ts
- session-token.ts
- Payments/index.tsx
- Profile/index.tsx
- SubscriptionDetail/index.tsx
- Community 57
- DialogCard/index.tsx
- inbox-slice.ts
- inbox-action.ts
- @react-native-firebase/messaging
- widget_icons.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- EditProfile/index.function.ts
- auth-slice.ts
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- react-native-device-info
- @invertase/react-native-apple-authentication
- Community 78
- Persisted Storage
- types.ts (6)
- react-native-calendars
- @react-native-community/datetimepicker
- react-native-image-picker
- Icons
- Calendar/index.tsx
- store.ts (2) (3)
- react-native-nitro-sound
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)
- logo_mark.ts

## God Nodes (most connected - your core abstractions)
1. `react-native` - 196 edges
2. `COLORS` - 168 edges
3. `SIZES` - 166 edges
4. `RowView()` - 149 edges
5. `CustomText()` - 146 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `CustomButton()` - 88 edges
8. `react` - 88 edges
9. `fonts` - 87 edges
10. `requestHandler()` - 82 edges

## Surprising Connections (you probably didn't know these)
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
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

## Communities (106 total, 26 thin omitted)

### Community 0 - "SIZES"
Cohesion: 0.16
Nodes (10): react-native-safe-area-context, styles, styles, SIZES, styles, Props, styles, DEVICE (+2 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.04
Nodes (75): categories, categoryId(), categoryName(), CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromReminderSettings() (+67 more)

### Community 2 - "requestHandler"
Cohesion: 0.20
Nodes (28): Container(), Header(), StateView(), SubscriptionCard(), AppStack, theme, AddSubscriptionScreen(), AlertsScreen() (+20 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "ScanRecovery/index.tsx"
Cohesion: 0.16
Nodes (17): hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon, accessCopy(), COPY, Kind, Props (+9 more)

### Community 5 - "requestHandler"
Cohesion: 0.06
Nodes (40): fromCycle(), fromScanCandidate(), isAuthExpired(), toInbox(), toProfile(), toScanCandidate(), toScanStatus(), beginSession() (+32 more)

### Community 6 - "redux/request-handler.ts"
Cohesion: 0.08
Nodes (18): toAppConfig(), toHome(), ApiError, apiServices, bundledLogoKey(), getAppConfig(), getHomeData(), AppThunk (+10 more)

### Community 7 - "ReminderSettings/index.function.ts"
Cohesion: 0.11
Nodes (34): react-native-permissions, toReminderSettings(), flag(), getAlerts(), getApplyCount(), getReminderSettings(), saveReminderSettings(), AlertsController (+26 more)

### Community 8 - "CustomButton"
Cohesion: 0.11
Nodes (50): AddChoiceLinks(), AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField() (+42 more)

### Community 9 - "fonts"
Cohesion: 0.10
Nodes (23): benefit_check_icon, Props, styles, Props, styles, styles, Props, fonts (+15 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.08
Nodes (52): Props, styles, SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion, ScanCandidate, ScanCycle, amountKeyboard() (+44 more)

### Community 11 - "types.ts"
Cohesion: 0.10
Nodes (44): DeleteProof, navigate(), NavigateArgs, navigationRef, popTo(), resetRoot(), RootParamList, TAB_NAMES (+36 more)

### Community 12 - "useAppSelector"
Cohesion: 0.07
Nodes (38): @react-navigation/native, @react-navigation/native-stack, getCalendarMonth(), getImportedSubscriptions(), changeProductUpdates(), openReceiptFile(), getSupportMessages(), markSupportRead() (+30 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (38): dependencies, axios@^1.21.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-config@^1.7.2, react-native-confirmation-code-field@^9.0.0 (+30 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.08
Nodes (49): fromReminder(), hasCategories(), setCategories(), toDetail(), toPlatformSuggestion(), toRecord(), toSubscriptionBody(), addAiDraft() (+41 more)

### Community 16 - "Tabs.tsx"
Cohesion: 0.25
Nodes (7): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "iOS AppDelegate"
Cohesion: 0.08
Nodes (33): toAiReply(), getMe(), Props, openLegal(), PRIVACY_URL, TERMS_URL, focusedTab(), changeAiConsent() (+25 more)

### Community 20 - "money"
Cohesion: 0.20
Nodes (17): PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), Cell(), DraftCard(), CandidateRow(), Results() (+9 more)

### Community 21 - "react"
Cohesion: 0.06
Nodes (40): react, Props, styles, Props, styles, Props, styles, Props (+32 more)

### Community 22 - "iOS Native Imports"
Cohesion: 0.10
Nodes (23): registerPush(), savePushToken(), syncAccount(), getSyncLockedInbox(), HomeRoute, useHome(), ADMIN_SCREENS, listenToPush() (+15 more)

### Community 23 - "store.ts"
Cohesion: 0.08
Nodes (26): clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon, image_icon, lock_icon, mic_active_icon (+18 more)

### Community 24 - "ConfirmDialog"
Cohesion: 0.19
Nodes (13): AppUpdate(), ConfirmDialog(), DisabledAccountDialog(), busyMessage(), LoaderModal(), UndoToast(), MainNavigator(), DisconnectDialog() (+5 more)

### Community 25 - "CustomText"
Cohesion: 0.15
Nodes (26): AddOptions(), AddSheet(), ChooseInboxSheet(), CustomText(), InboxProviders(), InfoTooltip(), FieldError(), MonthGrid() (+18 more)

### Community 26 - "store.ts (2)"
Cohesion: 0.07
Nodes (30): dashboardSlice, initial_state, initial_state, onboardingSlice, initial_state, supportSlice, AuthResponse, Cycle (+22 more)

### Community 27 - "VoiceRecorder.tsx"
Cohesion: 0.13
Nodes (14): bin_danger_icon, bin_icon, chevron_up_icon, record_mic_icon, record_pause_icon, Composer(), BlinkingMic(), clock() (+6 more)

### Community 28 - "GmailScanScreen"
Cohesion: 0.17
Nodes (18): OnboardingTitle(), Caption(), GmailRecoveryArt(), InboxLine(), RecoveryView(), ReviewView(), ScanningFooter(), ScanningView() (+10 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.05
Nodes (77): client, del(), get(), newKey(), patch(), pending_keys, post(), postLong() (+69 more)

### Community 30 - "service.ts (2)"
Cohesion: 0.08
Nodes (20): apple_icon, arrow_icon, calendar_icon, check_icon, edit_icon, filter_icon, find_grey_icon, find_icon (+12 more)

### Community 31 - "RowView"
Cohesion: 0.11
Nodes (19): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), stack_options, AuthStack(), Stack, ForgotPasswordScreen() (+11 more)

### Community 32 - "ContactUs/index.function.ts"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 33 - "gmail-action.ts"
Cohesion: 0.11
Nodes (24): fromGmailSelection(), connectInbox(), getGmailInboxes(), getGmailScan(), INBOX_LIMIT_NOTICE, MAX_INBOXES, saveReview(), startGmailScan() (+16 more)

### Community 34 - "profile-action.ts"
Cohesion: 0.07
Nodes (24): deleteAccount(), endSession(), ProfileInput, forgetPushToken(), apple(), GmailGrant, google(), isOutlookCancel() (+16 more)

### Community 35 - "calendar.ts"
Cohesion: 0.22
Nodes (11): CalendarController, CalendarRoute, EMPTY, PickerAnchor, useCalendar(), HomeEvent, dayMarker(), monthTitle() (+3 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "App.tsx"
Cohesion: 0.19
Nodes (10): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+2 more)

### Community 38 - "types.ts (2)"
Cohesion: 0.10
Nodes (18): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, alertsSlice, initial_state, Key, calendarSlice, initial_state, detailSlice (+10 more)

### Community 39 - "react-native"
Cohesion: 0.10
Nodes (15): react-native, OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, Props, styles (+7 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "icons/index.ts"
Cohesion: 0.10
Nodes (26): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo (+18 more)

### Community 42 - "react-native-mmkv"
Cohesion: 0.40
Nodes (4): redux-persist@^6.0.0, redux-persist, mmkv, redux_storage

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "ReadyToGo/index.tsx"
Cohesion: 0.13
Nodes (11): react-native-svg, check_dark_icon, Props, styles, ListController, styles, CONFETTI_COLORS, PIECES (+3 more)

### Community 45 - "RowView"
Cohesion: 0.11
Nodes (34): ImagePreview(), LinkText(), AnimatedPath, Face(), Mascot(), PriceChange(), RowView(), FileBubble() (+26 more)

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.18
Nodes (9): sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN (+1 more)

### Community 48 - "CustomText/index.tsx"
Cohesion: 0.15
Nodes (14): chevron_down_icon, MAX_FONT_SCALE, Props, styles, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT (+6 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "List/index.function.ts"
Cohesion: 0.22
Nodes (16): ListRoute, useList(), TabParamList, byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS (+8 more)

### Community 51 - "API DTOs & Request Handler (2)"
Cohesion: 0.15
Nodes (10): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, Profile (+2 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "SubscriptionFields/index.tsx (2)"
Cohesion: 0.18
Nodes (11): useAppUpdate(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch, mockGetAppConfig, openURL (+3 more)

### Community 54 - "history.ts"
Cohesion: 0.12
Nodes (13): initial_state, listSlice, ListState, SubscriptionRecord, filterHistory(), HISTORY_FILTERS, historyCardProps(), historyRecords() (+5 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "localToday"
Cohesion: 0.17
Nodes (8): PaymentDto, getAllPayments(), getPayments(), formatDate(), isIsoDate(), localToday(), actions, mockApi

### Community 60 - "receipts-action.ts"
Cohesion: 0.31
Nodes (8): receiptDate(), toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), ReceiptItem, viewReceiptPdf()

### Community 61 - "theme.ts"
Cohesion: 0.06
Nodes (33): Props, styles, Props, styles, Props, styles, app_theme, COLORS (+25 more)

### Community 62 - "session-token.ts"
Cohesion: 0.21
Nodes (10): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, app_storage, saveSessionToken() (+2 more)

### Community 63 - "Payments/index.tsx"
Cohesion: 0.09
Nodes (19): chevron_right_icon, nav_prev_icon, OPTIONS, Props, styles, Props, Props, Row (+11 more)

### Community 64 - "Profile/index.tsx"
Cohesion: 0.09
Nodes (6): MenuItem, Props, styles, PROVIDER_LABEL, styles, styles

### Community 65 - "SubscriptionDetail/index.tsx"
Cohesion: 0.20
Nodes (8): arrow_right_icon, external_icon, more_icon, plus_glyph_icon, Props, styles, Props, styles

### Community 66 - "Community 57"
Cohesion: 0.12
Nodes (5): initial_state, profileSlice, ProfileOverview, ProfileState, RootState

### Community 67 - "DialogCard/index.tsx"
Cohesion: 0.24
Nodes (5): close_icon, Props, styles, Props, styles

### Community 68 - "inbox-slice.ts"
Cohesion: 0.33
Nodes (5): inboxSlice, initial_state, Key, InboxDetail, InboxState

### Community 69 - "inbox-action.ts"
Cohesion: 0.21
Nodes (10): disconnectInbox(), flag(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute, STATUS (+2 more)

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "EditProfile/index.function.ts"
Cohesion: 0.18
Nodes (12): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, GENDER_OPTIONS, GENDER_VALUE, GenderOption, genderOption() (+4 more)

### Community 76 - "auth-slice.ts"
Cohesion: 0.25
Nodes (6): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 82 - "Persisted Storage"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 87 - "Icons"
Cohesion: 0.10
Nodes (28): DialogCard(), AnimatedPath, Icons(), MenuGroup(), MessageRow(), Question(), StatusPill(), SUPPORT_QUESTIONS (+20 more)

### Community 88 - "Calendar/index.tsx"
Cohesion: 0.20
Nodes (7): nav_next_icon, Props, Frame, Props, styles, LEGEND, styles

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 587 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `SIZES`, `requestHandler`, `ScanRecovery/index.tsx`, `requestHandler`, `redux/request-handler.ts`, `ReminderSettings/index.function.ts`, `CustomButton`, `fonts`, `API DTOs & Request Handler`, `types.ts`, `useAppSelector`, `Container (2)`, `Profile/index.tsx`, `Tabs.tsx`, `navigate`, `iOS AppDelegate`, `react`, `iOS Native Imports`, `store.ts`, `VoiceRecorder.tsx`, `service.ts (2)`, `RowView`, `gmail-action.ts`, `profile-action.ts`, `App.tsx`, `ReadyToGo/index.tsx`, `MessageRow/index.tsx`, `ContactUs/index.function.ts`, `CustomText/index.tsx`, `API DTOs & Request Handler (2)`, `SubscriptionFields/index.tsx (2)`, `theme.ts`, `Payments/index.tsx`, `Profile/index.tsx`, `SubscriptionDetail/index.tsx`, `DialogCard/index.tsx`, `react-native-device-info`, `Icons`, `Calendar/index.tsx`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.04319717895974141 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._
- **Should `requestHandler` be split into smaller, more focused modules?**
  _Cohesion score 0.06110102843315184 - nodes in this community are weakly interconnected._
- **Should `redux/request-handler.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0846774193548387 - nodes in this community are weakly interconnected._