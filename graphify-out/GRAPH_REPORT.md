# Graph Report - Renewless-mobile  (2026-11-25)

## Corpus Check
- 392 files · ~160,490 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2413 nodes · 8818 edges · 104 communities (83 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 158 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a6877ec2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CustomText/index.tsx
- adapters.ts
- Container
- Home/index.tsx
- AiChat/index.function.ts
- useIsTablet
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
- Onboarding/index.function.ts
- navigate
- Dev Dependencies
- Tabs.tsx
- service.ts
- YourSubscriptions/index.tsx
- CustomButton
- money.ts
- VoiceRecorder.tsx
- SubscriptionDetail/index.function.ts
- types.ts
- Settings/index.tsx
- InputField
- api_services/request-handler.ts
- icons/index.ts
- DetailSheets.tsx
- Payments/index.tsx
- requestHandler
- gmail-action.ts
- useAppSelector
- Release Blockers & Gaps
- AddOptions/index.tsx
- @react-native-community/datetimepicker
- AuthLayout/index.tsx
- types.ts (4)
- Profile/index.tsx
- App.tsx
- Community 68
- HelpSupport/index.tsx
- store.ts
- glyph_icons.ts
- ContactUs/index.function.ts
- loop_parts.ts
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
- Payments/index.tsx
- http-provider.ts
- theme.ts
- history.ts
- fonts
- ReminderSettings/index.function.ts
- react-native-device-info
- platform_logos.ts
- calendar.ts
- Auth.test.tsx
- Home/index.function.ts
- ConnectInbox/index.tsx
- @react-native-documents/picker
- types.ts (5)
- Metro Config
- status_colors.ts
- goBack
- History/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- @react-native-firebase/analytics
- Community 78
- types.ts (6)
- Mascot
- Splash.test.tsx
- CustomText
- widget_icons.ts
- logo_mark.ts
- Canonical Doc Owners
- payments-action.ts
- WidgetBridge ObjC
- receipt-file.ts
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
9. `requestHandler()` - 87 edges
10. `CustomButton()` - 83 edges

## Surprising Connections (you probably didn't know these)
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
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

## Communities (104 total, 21 thin omitted)

### Community 0 - "CustomText/index.tsx"
Cohesion: 0.07
Nodes (28): react, react-native-safe-area-context, benefit_check_icon, Props, styles, MAX_FONT_SCALE, Props, styles (+20 more)

### Community 1 - "adapters.ts"
Cohesion: 0.05
Nodes (58): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromCycle(), fromScanCandidate(), logo_urls (+50 more)

### Community 2 - "Container"
Cohesion: 0.11
Nodes (46): Container(), Header(), AnimatedPath, Icons(), ImagePreview(), MenuGroup(), PriceChange(), StateView() (+38 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.11
Nodes (23): focusedTab(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), Attachment, ChatMessage (+15 more)

### Community 5 - "useIsTablet"
Cohesion: 0.18
Nodes (14): UndoToast(), styles, resendCode(), verifyCode(), restoreSubscription(), HistoryController, useHistory(), clock() (+6 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.27
Nodes (9): receiptDate(), toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), ReceiptFile, ReceiptItem (+1 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.13
Nodes (20): react-native-permissions, fromReminderSettings(), toReminderSettings(), flag(), getAlerts(), getApplyCount(), getReminderSettings(), saveReminderSettings() (+12 more)

### Community 8 - "VoiceRecorder.tsx"
Cohesion: 0.12
Nodes (15): clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon, image_icon, mic_active_icon, mic_icon (+7 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.14
Nodes (14): external_icon, Props, Props, styles, styles, Props, WAVE, Props (+6 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.13
Nodes (31): switch_off_icon, switch_on_icon, Props, styles, searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion (+23 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.06
Nodes (12): bundledLogoKey(), busyMessage(), LoaderModal(), stack_options, AppStack, MainNavigator(), theme, trackScreen() (+4 more)

### Community 12 - "trackEvent"
Cohesion: 0.20
Nodes (12): changePassword(), logoutUser(), selectUser(), Fields, passwordErrors(), useChangePassword(), initials(), ProfileController (+4 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (37): dependencies, @invertase/react-native-apple-authentication@^2.5.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, react-native-config@^1.7.2 (+29 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.09
Nodes (34): categoryId(), fromReminder(), hasCategories(), toSubscriptionBody(), cancelSubscription(), createFromForm(), current(), deleteSubscription() (+26 more)

### Community 16 - "Onboarding/index.function.ts"
Cohesion: 0.11
Nodes (19): openLegal(), PRIVACY_URL, TERMS_URL, DEEP_POLL_MS, DEEP_WAIT_MS, ONBOARDING_STEPS, PANEL_MOTION, Route (+11 more)

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
Cohesion: 0.14
Nodes (23): @react-navigation/native-stack, NavigateArgs, navigationRef, popTo(), RootParamList, TAB_NAMES, forgotPassword(), resetPassword() (+15 more)

### Community 21 - "YourSubscriptions/index.tsx"
Cohesion: 0.05
Nodes (48): react-native-svg, Props, Props, Props, Props, ScanningFooter(), STAGES, styles (+40 more)

### Community 22 - "CustomButton"
Cohesion: 0.15
Nodes (29): AddChoiceLinks(), AddOptions(), AddSheet(), AppUpdate(), ChooseInboxSheet(), ConfirmDialog(), CustomButton(), DisabledAccountDialog() (+21 more)

### Community 23 - "money.ts"
Cohesion: 0.13
Nodes (18): ScanCandidate, ScanCycle, CURRENCIES, CURRENCY_SEARCH, NO_DECIMALS, SIGN_PATTERN, SIGNS, SYMBOLS (+10 more)

### Community 24 - "VoiceRecorder.tsx"
Cohesion: 0.12
Nodes (13): bin_danger_icon, bin_icon, chevron_up_icon, lock_icon, record_mic_icon, record_pause_icon, send_icon, BlinkingMic() (+5 more)

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.30
Nodes (14): detailView(), relative(), amountLabel(), daysBetween(), eventAmount(), eventCaption(), eventCardProps(), eventStatus() (+6 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (77): @reduxjs/toolkit, status_colors, alertsSlice, initial_state, Key, authSlice, initial_state, requests (+69 more)

### Community 27 - "Settings/index.tsx"
Cohesion: 0.12
Nodes (14): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+6 more)

### Community 28 - "InputField"
Cohesion: 0.21
Nodes (17): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), InputField(), Stack, ForgotPasswordScreen(), styles (+9 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.07
Nodes (62): get(), post(), put(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft() (+54 more)

### Community 30 - "icons/index.ts"
Cohesion: 0.12
Nodes (25): apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon, chevron_down_icon, close_icon, edit_icon (+17 more)

### Community 31 - "DetailSheets.tsx"
Cohesion: 0.15
Nodes (33): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), PhoneInputField(), FieldError(), SubscriptionFields() (+25 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.21
Nodes (20): getPayments(), EMPTY, PaymentsController, PaymentsRoute, usePayments(), MoneyTotal, PaymentRecord, alignedMonth() (+12 more)

### Community 33 - "requestHandler"
Cohesion: 0.04
Nodes (74): toInbox(), toProfile(), ChallengeDto, OutlookConnectDto, OutlookLoginDto, SessionDto, DeleteProof, resetRoot() (+66 more)

### Community 34 - "gmail-action.ts"
Cohesion: 0.07
Nodes (37): failedGmailScan(), fromGmailSelection(), toRecord(), Props, addAiDraft(), getDashboard(), getHomeData(), createSubscription() (+29 more)

### Community 35 - "useAppSelector"
Cohesion: 0.09
Nodes (38): @react-navigation/native, AuthStack(), navigate(), getPlatformSubscriptions(), openReceiptFile(), getSupportMessages(), useAppDispatch(), useAppSelector (+30 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "AddOptions/index.tsx"
Cohesion: 0.20
Nodes (7): OPTIONS, Props, styles, Props, Props, PROVIDERS, styles

### Community 38 - "@react-native-community/datetimepicker"
Cohesion: 0.14
Nodes (8): @react-native-community/datetimepicker@^9.2.2, react-native-confirmation-code-field@^9.0.0, react-native-nitro-modules@^0.36.5, engines, node, @react-native-community/datetimepicker, react-native-confirmation-code-field, react-native-nitro-modules

### Community 39 - "AuthLayout/index.tsx"
Cohesion: 0.22
Nodes (5): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.08
Nodes (7): MenuItem, Props, styles, PROVIDER_LABEL, syncDate(), styles, styles

### Community 42 - "App.tsx"
Cohesion: 0.09
Nodes (17): App(), displayName, name, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, react-redux@^9.3.0, react-native-keychain, react-native-mmkv (+9 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "HelpSupport/index.tsx"
Cohesion: 0.47
Nodes (3): mail_icon, SUPPORT_QUESTIONS, styles

### Community 45 - "store.ts"
Cohesion: 0.10
Nodes (8): redux-persist@^6.0.0, redux-persist, mmkv, redux_storage, AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 46 - "glyph_icons.ts"
Cohesion: 0.50
Nodes (3): arrow_right_icon, more_icon, plus_glyph_icon

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.16
Nodes (10): markSupportRead(), sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportTopic, SUPPORT_MESSAGE_MAX (+2 more)

### Community 48 - "loop_parts.ts"
Cohesion: 0.50
Nodes (3): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 51 - "RowView"
Cohesion: 0.10
Nodes (35): DialogCard(), LinkText(), RowView(), clock(), FileBubble(), LoopAuthor(), MessageItem(), ThinkingDots() (+27 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.18
Nodes (11): useAppUpdate(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch, mockGetAppConfig, openURL (+3 more)

### Community 54 - "logoKey"
Cohesion: 0.13
Nodes (27): categoryName(), failingRow(), jobStatus(), knownEventType(), logoKey(), platformOf(), toAlert(), toAttention() (+19 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Payments/index.tsx"
Cohesion: 0.10
Nodes (16): Props, styles, Props, styles, LEGEND, styles, Props, styles (+8 more)

### Community 60 - "http-provider.ts"
Cohesion: 0.10
Nodes (21): axios@^1.21.1, axios, client, del(), newKey(), patch(), pending_keys, postLong() (+13 more)

### Community 61 - "theme.ts"
Cohesion: 0.06
Nodes (47): react-native, styles, styles, Props, styles, Props, styles, Props (+39 more)

### Community 62 - "history.ts"
Cohesion: 0.27
Nodes (8): SubscriptionRecord, HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 63 - "fonts"
Cohesion: 0.08
Nodes (27): chevron_right_icon, Props, styles, Props, styles, Props, Props, Props (+19 more)

### Community 64 - "ReminderSettings/index.function.ts"
Cohesion: 0.18
Nodes (18): SentAlert, ACCOUNT_REMINDER_ITEMS, accountValues(), alertMessage(), groupAlerts(), localDate(), nextAccountValues(), sentLabel() (+10 more)

### Community 66 - "platform_logos.ts"
Cohesion: 0.18
Nodes (10): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+2 more)

### Community 67 - "calendar.ts"
Cohesion: 0.20
Nodes (11): Props, styles, THEME, HomeEvent, dayMarker(), monthTitle(), nearestEvent(), shiftMonth() (+3 more)

### Community 68 - "Auth.test.tsx"
Cohesion: 0.05
Nodes (27): @react-native-firebase/crashlytics@26.4.0, @react-native-firebase/crashlytics, isAuthExpired(), toAppConfig(), ApiError, apiServices, getAppConfig(), getCalendarMonth() (+19 more)

### Community 69 - "Home/index.function.ts"
Cohesion: 0.11
Nodes (24): syncAiConsent(), registerPush(), savePushToken(), dismissBackgroundScan(), getDeepStatus(), getSyncLockedInbox(), MAX_INBOXES, BACKGROUND_PROGRESS_MS (+16 more)

### Community 70 - "ConnectInbox/index.tsx"
Cohesion: 0.15
Nodes (7): Frame, Props, styles, CONNECT_LABELS, Props, TRUST_ROWS, styles

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.18
Nodes (12): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, GENDER_OPTIONS, GENDER_VALUE, GenderOption, genderOption() (+4 more)

### Community 76 - "History/index.tsx"
Cohesion: 0.18
Nodes (5): Props, styles, styles, ListController, styles

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

### Community 84 - "Mascot"
Cohesion: 0.14
Nodes (19): AnimatedPath, Face(), Mascot(), ScanningView(), ScanCard(), Empty(), DiscoveringBody(), RiderBar() (+11 more)

### Community 85 - "Splash.test.tsx"
Cohesion: 0.39
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 87 - "CustomText"
Cohesion: 0.10
Nodes (51): CurrencyTabs(), CustomText(), InfoTooltip(), OnboardingTitle(), PlatformLogo(), SpendRow(), SpendRows(), TrialRows() (+43 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 94 - "payments-action.ts"
Cohesion: 0.29
Nodes (4): inboxSource(), toPayment(), PaymentDto, getAllPayments()

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 96 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 630 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `theme.ts` to `CustomText/index.tsx`, `AiChat/index.function.ts`, `useIsTablet`, `alerts-action.ts`, `CustomText/index.tsx`, `SubscriptionFields/index.tsx`, `MainNavigator.tsx`, `Container (2)`, `detail-action.ts`, `Onboarding/index.function.ts`, `navigate`, `Tabs.tsx`, `service.ts`, `YourSubscriptions/index.tsx`, `VoiceRecorder.tsx`, `InputField`, `DetailSheets.tsx`, `requestHandler`, `gmail-action.ts`, `useAppSelector`, `AddOptions/index.tsx`, `AuthLayout/index.tsx`, `Profile/index.tsx`, `App.tsx`, `HelpSupport/index.tsx`, `ContactUs/index.function.ts`, `app-update-hook.test.tsx`, `Payments/index.tsx`, `fonts`, `react-native-device-info`, `calendar.ts`, `Auth.test.tsx`, `Home/index.function.ts`, `ConnectInbox/index.tsx`, `History/index.tsx`, `Splash.test.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CustomText/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06938775510204082 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053939714436805924 - nodes in this community are weakly interconnected._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.10531400966183575 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._