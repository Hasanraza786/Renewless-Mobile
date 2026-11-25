# Graph Report - Renewless-mobile  (2026-11-25)

## Corpus Check
- 392 files · ~159,835 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2410 nodes · 8809 edges · 111 communities (92 shown, 19 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f256bc5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CustomText/index.tsx
- adapters.ts
- Container
- Home/index.tsx
- AiChat/index.function.ts
- auth-action.ts
- Receipts/index.function.ts
- alerts-action.ts
- VoiceRecorder.tsx
- CustomText/index.tsx
- SubscriptionFields/index.tsx
- MainNavigator.tsx
- trackEvent
- iOS Widget Models
- Container (2)
- detail-action.ts
- gmail-action.ts
- navigate
- Dev Dependencies
- Tabs.tsx
- service.ts
- FirstResults/index.tsx
- navigate
- YourSubscriptions/index.tsx
- alerts-slice.ts
- SubscriptionDetail/index.function.ts
- types.ts
- Settings/index.tsx
- InputField
- api_services/request-handler.ts
- icons/index.ts
- DetailSheets.tsx
- Payments/index.tsx
- Onboarding/index.function.ts
- requestHandler
- useAppSelector
- Release Blockers & Gaps
- inbox-action.ts
- endSession.ts
- SIZES
- types.ts (4)
- Profile/index.tsx
- App.tsx
- Community 68
- Payments/index.tsx
- store.ts
- MessageRow/index.tsx
- ContactUs/index.function.ts
- App.tsx
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
- Calendar/index.tsx
- http-provider.ts
- theme.ts
- history.ts
- fonts
- ReminderSettings/index.function.ts
- Auth.test.tsx
- platform_logos.ts
- calendar.ts
- outlook-login.test.ts
- Home/index.function.ts
- ConnectInbox/index.tsx
- @reduxjs/toolkit
- types.ts (5)
- Metro Config
- status_colors.ts
- goBack
- react-native
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- ai-consent.test.ts
- Community 78
- SubscriptionDetail/index.tsx
- types.ts (6)
- ScanRecovery/index.tsx
- constant-slice.ts
- SubscriptionDetail/index.function.ts
- GmailViews.tsx
- widget_icons.ts
- ReminderSettings/index.function.ts
- logo_mark.ts
- outlook-connect.test.ts
- Canonical Doc Owners
- payments-action.ts
- WidgetBridge ObjC
- receipt-file.ts
- calendar-slice.ts
- ai-draft.ts
- Runtime Dependencies (4)
- @react-native-firebase/app@26.4.0

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `COLORS` - 170 edges
3. `SIZES` - 169 edges
4. `CustomText()` - 153 edges
5. `RowView()` - 145 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 90 edges
8. `fonts` - 89 edges
9. `requestHandler()` - 87 edges
10. `CustomButton()` - 83 edges

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

## Communities (111 total, 19 thin omitted)

### Community 0 - "CustomText/index.tsx"
Cohesion: 0.08
Nodes (27): react, chevron_down_icon, option_check_icon, Props, styles, MAX_FONT_SCALE, Props, styles (+19 more)

### Community 1 - "adapters.ts"
Cohesion: 0.05
Nodes (60): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromReminder(), logo_urls, platformBySubscription (+52 more)

### Community 2 - "Container"
Cohesion: 0.11
Nodes (39): Container(), CurrencyTabs(), Header(), AnimatedPath, Face(), Mascot(), StateView(), SubscriptionCard() (+31 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.14
Nodes (23): focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), Attachment (+15 more)

### Community 5 - "auth-action.ts"
Cohesion: 0.08
Nodes (34): @invertase/react-native-apple-authentication@^2.5.1, @invertase/react-native-apple-authentication, ChallengeDto, SessionDto, DeleteProof, DisabledAccountDialog(), styles, changePassword() (+26 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.29
Nodes (9): toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptFile, ReceiptItem (+1 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.14
Nodes (13): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), AlertDto, flag(), getAlerts(), getAllAlerts() (+5 more)

### Community 8 - "VoiceRecorder.tsx"
Cohesion: 0.07
Nodes (23): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+15 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.12
Nodes (16): benefit_check_icon, styles, Props, styles, Props, WAVE, Props, ROWS (+8 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.15
Nodes (28): Props, styles, SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion, AMOUNT_ERROR, CATEGORIES, CYCLES (+20 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.07
Nodes (9): busyMessage(), LoaderModal(), UndoToast(), stack_options, AppStack, MainNavigator(), theme, navigationRef (+1 more)

### Community 12 - "trackEvent"
Cohesion: 0.09
Nodes (20): openLegal(), logoutUser(), changeProductUpdates(), deleteAccount(), getProfileData(), getProfileOverview(), sendSupportMessage(), endSession() (+12 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (42): dependencies, axios@^1.21.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2 (+34 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.14
Nodes (16): categoryId(), fromCycle(), hasCategories(), toSubscriptionBody(), createFromForm(), findPlatforms(), getDetailData(), getPlatformId() (+8 more)

### Community 16 - "gmail-action.ts"
Cohesion: 0.11
Nodes (27): failedGmailScan(), fromGmailSelection(), Props, day(), getGmailInboxes(), getGmailScan(), MAX_INBOXES, saveReview() (+19 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 20 - "service.ts"
Cohesion: 0.17
Nodes (21): @react-navigation/native-stack, goBack(), NavigateArgs, popTo(), RootParamList, TAB_NAMES, socialLogin(), useAppDispatch() (+13 more)

### Community 21 - "FirstResults/index.tsx"
Cohesion: 0.08
Nodes (19): Props, DiscoveringFooter(), Props, RiderBar(), StageRider(), STAGES, useTrickle(), RADAR_SIZE (+11 more)

### Community 22 - "navigate"
Cohesion: 0.18
Nodes (15): navigate(), getSupportMessages(), markSupportRead(), useHelpSupport(), useSupportMessage(), openMessage(), styles, ADMIN_SCREENS (+7 more)

### Community 23 - "YourSubscriptions/index.tsx"
Cohesion: 0.07
Nodes (57): react-native-svg, TrialRows(), SubscriptionFields(), CandidateSheet(), CONFETTI_COLORS, PIECES, Props, ReadyConfetti() (+49 more)

### Community 24 - "alerts-slice.ts"
Cohesion: 0.40
Nodes (4): alertsSlice, initial_state, Key, AlertsState

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.37
Nodes (12): detailView(), amountLabel(), daysBetween(), eventAmount(), eventCaption(), eventCardProps(), eventStatus(), eventTiming() (+4 more)

### Community 26 - "types.ts"
Cohesion: 0.06
Nodes (32): status_colors, initial_state, onboardingSlice, AuthIntent, AuthResponse, Billing, Cycle, DatedAmount (+24 more)

### Community 27 - "Settings/index.tsx"
Cohesion: 0.08
Nodes (18): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+10 more)

### Community 28 - "InputField"
Cohesion: 0.18
Nodes (19): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), InputField(), Stack, ForgotPasswordScreen(), styles (+11 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.07
Nodes (61): get(), patch(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft() (+53 more)

### Community 30 - "icons/index.ts"
Cohesion: 0.11
Nodes (25): arrow_right_icon, more_icon, plus_glyph_icon, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon (+17 more)

### Community 31 - "DetailSheets.tsx"
Cohesion: 0.27
Nodes (16): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), PhoneInputField(), EditProfileScreen(), CancelSheet() (+8 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.27
Nodes (16): getPayments(), EMPTY, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear(), inPeriod() (+8 more)

### Community 33 - "Onboarding/index.function.ts"
Cohesion: 0.07
Nodes (41): fromScanCandidate(), isAuthExpired(), toInbox(), toProfile(), toScanStatus(), PRIVACY_URL, TERMS_URL, resetRoot() (+33 more)

### Community 34 - "requestHandler"
Cohesion: 0.08
Nodes (29): toRecord(), getDashboard(), getHomeData(), createSubscription(), deleteSubscription(), flag(), getPlatformSubscriptions(), restoreSubscription() (+21 more)

### Community 35 - "useAppSelector"
Cohesion: 0.12
Nodes (25): @react-navigation/native, AuthStack(), getCalendarMonth(), useAppSelector, CalendarController, CalendarRoute, EMPTY, PickerAnchor (+17 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "inbox-action.ts"
Cohesion: 0.24
Nodes (7): ConnectedInboxController, ConnectedInboxRoute, STATUS, useConnectedInbox(), formatDate(), isIsoDate(), syncLabel()

### Community 38 - "endSession.ts"
Cohesion: 0.09
Nodes (7): dashboardSlice, initial_state, DashboardState, HomeSnapshot, clearWidgetSnapshot(), listenForWidgetUrls(), openWidgetUrl()

### Community 39 - "SIZES"
Cohesion: 0.09
Nodes (17): react-native-safe-area-context, OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, styles, behavior (+9 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.13
Nodes (6): MenuItem, Props, styles, PROVIDER_LABEL, syncDate(), styles

### Community 42 - "App.tsx"
Cohesion: 0.19
Nodes (11): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, app_storage, clearSessionToken() (+3 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "Payments/index.tsx"
Cohesion: 0.13
Nodes (13): external_icon, Props, styles, NOTES, styles, EMPTY_COPY, EmptyKind, PaymentsController (+5 more)

### Community 45 - "store.ts"
Cohesion: 0.10
Nodes (8): redux-persist@^6.0.0, redux-persist, mmkv, redux_storage, AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.31
Nodes (7): TOPIC_OPTIONS, topicOf(), useContactUs(), SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN, SUPPORT_TOPIC_LABELS

### Community 48 - "App.tsx"
Cohesion: 0.19
Nodes (9): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+1 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 51 - "RowView"
Cohesion: 0.07
Nodes (98): AddChoiceLinks(), AddOptions(), AddSheet(), AppUpdate(), ChooseInboxSheet(), ConfirmDialog(), CustomButton(), CustomText() (+90 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.15
Nodes (15): react-native-device-info@^15.0.2, react-native-device-info, toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor() (+7 more)

### Community 54 - "logoKey"
Cohesion: 0.17
Nodes (20): categoryName(), failingRow(), jobStatus(), logoKey(), platformOf(), toAiReply(), toAttention(), toCalendarMonth() (+12 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Calendar/index.tsx"
Cohesion: 0.14
Nodes (10): nav_next_icon, nav_prev_icon, Props, Props, styles, LEGEND, styles, Props (+2 more)

### Community 60 - "http-provider.ts"
Cohesion: 0.12
Nodes (18): client, del(), newKey(), pending_keys, postLong(), put(), request(), upload() (+10 more)

### Community 61 - "theme.ts"
Cohesion: 0.06
Nodes (30): Props, styles, Props, styles, Props, styles, Props, styles (+22 more)

### Community 62 - "history.ts"
Cohesion: 0.16
Nodes (10): SubscriptionRecord, filterHistory(), HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base (+2 more)

### Community 63 - "fonts"
Cohesion: 0.09
Nodes (24): chevron_right_icon, Props, styles, OPTIONS, Props, styles, Props, Props (+16 more)

### Community 64 - "ReminderSettings/index.function.ts"
Cohesion: 0.18
Nodes (20): SentAlert, ACCOUNT_REMINDER_ITEMS, accountDisplay(), accountValues(), alertMessage(), groupAlerts(), localDate(), nextAccountValues() (+12 more)

### Community 65 - "Auth.test.tsx"
Cohesion: 0.12
Nodes (8): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount, mockBackend, Tree

### Community 66 - "platform_logos.ts"
Cohesion: 0.17
Nodes (11): bundledLogoKey(), duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo (+3 more)

### Community 67 - "calendar.ts"
Cohesion: 0.23
Nodes (9): HomeEvent, SubscriptionDetail, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS, record (+1 more)

### Community 68 - "outlook-login.test.ts"
Cohesion: 0.10
Nodes (17): ApiError, apiServices, busy(), grant, mockPost, actions, connector, grant (+9 more)

### Community 69 - "Home/index.function.ts"
Cohesion: 0.14
Nodes (19): syncAiConsent(), registerPush(), savePushToken(), syncAccount(), connectInbox(), dismissBackgroundScan(), getDeepStatus(), getSyncLockedInbox() (+11 more)

### Community 70 - "ConnectInbox/index.tsx"
Cohesion: 0.12
Nodes (9): Frame, Props, styles, PILL, styles, CONNECT_LABELS, Props, TRUST_ROWS (+1 more)

### Community 71 - "@reduxjs/toolkit"
Cohesion: 0.09
Nodes (21): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, detailSlice, initial_state, Key, inboxSlice, initial_state, Key (+13 more)

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.13
Nodes (16): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, selectUser(), Fields, passwordErrors(), useChangePassword() (+8 more)

### Community 76 - "react-native"
Cohesion: 0.09
Nodes (18): react-native, check_dark_icon, close_icon, Props, styles, Props, styles, styles (+10 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots"
Cohesion: 0.33
Nodes (5): Backend bugs from the second pass, Bugs and gaps, QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots, Second pass (same day, after the design revisions), Third pass (auto-advance and dismiss)

### Community 80 - "ai-consent.test.ts"
Cohesion: 0.29
Nodes (4): getMe(), saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 84 - "ScanRecovery/index.tsx"
Cohesion: 0.15
Nodes (14): accessCopy(), COPY, Kind, Props, RecoveryArt(), RecoveryBody(), RecoveryFooter(), ScanInterruptedArt() (+6 more)

### Community 85 - "constant-slice.ts"
Cohesion: 0.16
Nodes (9): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, mock_dispatch (+1 more)

### Community 86 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.20
Nodes (14): cancelSubscription(), current(), resumeSubscription(), updateNotes(), updateReminder(), DetailController, DetailView, relative() (+6 more)

### Community 87 - "GmailViews.tsx"
Cohesion: 0.10
Nodes (38): PlatformLogo(), SizedBox(), ChangesSheet(), Field(), GmailSheets(), MatchSheet(), shortDay(), CandidateRow() (+30 more)

### Community 89 - "ReminderSettings/index.function.ts"
Cohesion: 0.29
Nodes (10): react-native-permissions, getApplyCount(), getReminderSettings(), AlertsController, useAlerts(), useNotificationPermission(), Draft, ReminderSettingsController (+2 more)

### Community 91 - "outlook-connect.test.ts"
Cohesion: 0.20
Nodes (9): INBOX_LIMIT_NOTICE, actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn (+1 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 94 - "payments-action.ts"
Cohesion: 0.25
Nodes (5): inboxSource(), toPayment(), toPriceChanges(), PaymentDto, getAllPayments()

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 96 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

### Community 97 - "calendar-slice.ts"
Cohesion: 0.40
Nodes (4): calendarSlice, initial_state, CalendarMonth, CalendarState

### Community 98 - "ai-draft.ts"
Cohesion: 0.60
Nodes (3): AiDraft, missingQuestion(), draft

### Community 101 - "@react-native-firebase/app@26.4.0"
Cohesion: 0.33
Nodes (4): @react-native-firebase/app@26.4.0, react-native-screens@^4.29.0, @react-native-firebase/app, react-native-screens

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 629 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `CustomText/index.tsx`, `AiChat/index.function.ts`, `auth-action.ts`, `VoiceRecorder.tsx`, `CustomText/index.tsx`, `SubscriptionFields/index.tsx`, `trackEvent`, `Container (2)`, `gmail-action.ts`, `navigate`, `Tabs.tsx`, `service.ts`, `FirstResults/index.tsx`, `navigate`, `YourSubscriptions/index.tsx`, `Settings/index.tsx`, `InputField`, `api_services/request-handler.ts`, `DetailSheets.tsx`, `Onboarding/index.function.ts`, `useAppSelector`, `endSession.ts`, `SIZES`, `Profile/index.tsx`, `Payments/index.tsx`, `MessageRow/index.tsx`, `App.tsx`, `app-update-hook.test.tsx`, `Calendar/index.tsx`, `theme.ts`, `fonts`, `Auth.test.tsx`, `outlook-login.test.ts`, `Home/index.function.ts`, `ConnectInbox/index.tsx`, `SubscriptionDetail/index.tsx`, `ScanRecovery/index.tsx`, `constant-slice.ts`, `SubscriptionDetail/index.function.ts`, `GmailViews.tsx`, `ReminderSettings/index.function.ts`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CustomText/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07624113475177305 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.052083333333333336 - nodes in this community are weakly interconnected._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.11470985155195682 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._