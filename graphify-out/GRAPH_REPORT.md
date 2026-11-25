# Graph Report - Renewless-mobile  (2026-11-25)

## Corpus Check
- 392 files · ~160,835 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2414 nodes · 8824 edges · 106 communities (84 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 158 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1933ca99`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CustomText/index.tsx
- adapters.ts
- Container
- Home/index.tsx
- requestHandler
- Icons/index.tsx
- Receipts/index.function.ts
- SIZES
- inbox-action.ts
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
- auth-action.ts
- YourSubscriptions/index.tsx
- HomeScreen
- scan.ts
- VoiceRecorder.tsx
- SubscriptionDetail/index.function.ts
- types.ts
- Settings/index.tsx
- InputField
- api_services/request-handler.ts
- icons/index.ts
- DetailSheets.tsx
- Payments/index.tsx
- Onboarding/index.function.ts
- gmail-action.ts
- service.ts
- Release Blockers & Gaps
- outlook-login.test.ts
- @react-native-community/datetimepicker
- GmailViews.tsx
- types.ts (4)
- Profile/index.tsx
- session-token.ts
- Community 68
- react-native
- store.ts
- ChatParts.tsx
- support-action.ts
- react-redux
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
- alerts-action.ts
- money.ts
- platform_logos.ts
- calendar.ts
- Auth.test.tsx
- sync-locked-inbox.test.ts
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
- react-native-mmkv
- Community 78
- react-native-config
- types.ts (6)
- Mascot
- Splash.test.tsx
- @react-native-firebase/crashlytics
- money
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

## Communities (106 total, 22 thin omitted)

### Community 0 - "CustomText/index.tsx"
Cohesion: 0.08
Nodes (24): react, react-native-safe-area-context, Props, styles, MAX_FONT_SCALE, Props, styles, Props (+16 more)

### Community 1 - "adapters.ts"
Cohesion: 0.05
Nodes (59): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromReminder(), logo_urls, platformBySubscription (+51 more)

### Community 2 - "Container"
Cohesion: 0.14
Nodes (42): Container(), CurrencyTabs(), CustomText(), DialogCard(), Header(), InfoTooltip(), MenuGroup(), StateView() (+34 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "requestHandler"
Cohesion: 0.06
Nodes (50): toAiReply(), openLegal(), PRIVACY_URL, TERMS_URL, focusedTab(), addAiDraft(), changeAiConsent(), consentBody() (+42 more)

### Community 5 - "Icons/index.tsx"
Cohesion: 0.10
Nodes (15): chevron_right_icon, Props, styles, Props, Props, Props, styles, Props (+7 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.27
Nodes (9): receiptDate(), toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), ReceiptFile, ReceiptItem (+1 more)

### Community 7 - "SIZES"
Cohesion: 0.16
Nodes (10): Props, styles, styles, SIZES, styles, Props, styles, DEVICE (+2 more)

### Community 8 - "inbox-action.ts"
Cohesion: 0.20
Nodes (11): disconnectInbox(), flag(), getImportedSubscriptions(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute (+3 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.14
Nodes (17): styles, Props, styles, styles, Props, Props, ROWS, AiChatController (+9 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.14
Nodes (31): Props, styles, searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), ScanCycle, CURRENCIES, addDays() (+23 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.08
Nodes (7): stack_options, AuthStack(), Stack, AppStack, theme, navigationRef, OtpScreen()

### Community 12 - "App.tsx"
Cohesion: 0.25
Nodes (7): App(), displayName, name, MainNavigator(), persistor, store, trackScreen()

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (39): dependencies, @invertase/react-native-apple-authentication@^2.5.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, react-native-confirmation-code-field@^9.0.0 (+31 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.07
Nodes (39): categoryId(), categoryName(), fromCycle(), hasCategories(), setCategories(), toPlatformSuggestion(), toRecord(), toReminder() (+31 more)

### Community 16 - "ai-consent.test.ts"
Cohesion: 0.18
Nodes (8): put(), getMe(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 17 - "navigate"
Cohesion: 0.06
Nodes (43): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+35 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 20 - "auth-action.ts"
Cohesion: 0.06
Nodes (56): toProfile(), DeleteProof, popTo(), resetRoot(), beginSession(), closeDisabledAccount(), forgotPassword(), formWide() (+48 more)

### Community 21 - "YourSubscriptions/index.tsx"
Cohesion: 0.07
Nodes (25): react-native-svg, Props, Props, Props, Props, STAGES, RADAR_SIZE, styles (+17 more)

### Community 22 - "HomeScreen"
Cohesion: 0.11
Nodes (23): AddChoiceLinks(), AddOptions(), AddSheet(), ChooseInboxSheet(), Props, InboxProviders(), Chart(), Forecast() (+15 more)

### Community 23 - "scan.ts"
Cohesion: 0.24
Nodes (9): cents(), FAILING_NOTE, MONTHLY_FACTOR, nextEvent(), paidMonthlyTotals(), Totals, upcomingWeek(), USAGE_NOTE (+1 more)

### Community 24 - "VoiceRecorder.tsx"
Cohesion: 0.08
Nodes (20): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+12 more)

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.21
Nodes (19): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, amountLabel() (+11 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (71): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, status_colors, Options, SESSION_ENDED, authSlice, initial_state, requests (+63 more)

### Community 27 - "Settings/index.tsx"
Cohesion: 0.08
Nodes (17): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+9 more)

### Community 28 - "InputField"
Cohesion: 0.15
Nodes (18): AuthDivider(), AuthFooterLink(), AuthLayout(), OUTLOOK_SOCIAL_ICON, Props, SocialButtons(), styles, ForgotPasswordScreen() (+10 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.06
Nodes (71): del(), get(), newKey(), patch(), post(), postLong(), request(), upload() (+63 more)

### Community 30 - "icons/index.ts"
Cohesion: 0.10
Nodes (28): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon (+20 more)

### Community 31 - "DetailSheets.tsx"
Cohesion: 0.13
Nodes (46): AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField(), PhoneInputField() (+38 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 33 - "Onboarding/index.function.ts"
Cohesion: 0.08
Nodes (29): fromScanCandidate(), isAuthExpired(), toScanStatus(), answerScanNotify(), editOnboardingCandidate(), finishOnboarding(), getOnboardingScan(), openBackgroundResults() (+21 more)

### Community 34 - "gmail-action.ts"
Cohesion: 0.07
Nodes (50): failedGmailScan(), fromGmailSelection(), toInbox(), connectGmailInbox(), connectInbox(), connectOutlookInbox(), day(), getGmailInboxes() (+42 more)

### Community 35 - "service.ts"
Cohesion: 0.08
Nodes (47): @react-navigation/native, @react-navigation/native-stack, UndoToast(), navigate(), NavigateArgs, RootParamList, TAB_NAMES, getCalendarMonth() (+39 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "outlook-login.test.ts"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 39 - "GmailViews.tsx"
Cohesion: 0.07
Nodes (48): OnboardingTitle(), Caption(), GmailRecoveryArt(), InboxLine(), MatchRow(), Props, RecoveryFooter(), RecoveryView() (+40 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.12
Nodes (6): MenuItem, Props, styles, PROVIDER_LABEL, syncDate(), styles

### Community 42 - "session-token.ts"
Cohesion: 0.22
Nodes (9): app_storage, clearSessionToken(), loadSessionToken(), saveSessionToken(), sessionToken(), dispatch, fails(), run() (+1 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "react-native"
Cohesion: 0.11
Nodes (13): react-native, mail_icon, Props, styles, Props, styles, Props, styles (+5 more)

### Community 45 - "store.ts"
Cohesion: 0.09
Nodes (11): AppDispatch, constant_reducer, persisted_reducer, root_reducer, ADMIN_SCREENS, forgetPushToken(), listenToPush(), messaging (+3 more)

### Community 46 - "ChatParts.tsx"
Cohesion: 0.12
Nodes (11): arrow_right_icon, external_icon, more_icon, plus_glyph_icon, pause_icon, pdf_icon, play_icon, clock() (+3 more)

### Community 47 - "support-action.ts"
Cohesion: 0.09
Nodes (15): apiServices, bundledLogoKey(), getDashboard(), getHomeData(), AppThunk, TOPIC_OPTIONS, topicOf(), useContactUs() (+7 more)

### Community 48 - "react-redux"
Cohesion: 0.14
Nodes (8): react-native-haptic-feedback@^3.0.0, react-native-responsive-fontsize@^0.5.1, react-native-screens@^4.29.0, react-redux@^9.3.0, react-native-haptic-feedback, react-native-responsive-fontsize, react-native-screens, react-redux

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.22
Nodes (16): ListRoute, useList(), TabParamList, byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS (+8 more)

### Community 51 - "RowView"
Cohesion: 0.09
Nodes (48): AppUpdate(), ConfirmDialog(), DisabledAccountDialog(), AnimatedPath, Icons(), ImagePreview(), LinkText(), PriceChange() (+40 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.17
Nodes (13): toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "logoKey"
Cohesion: 0.14
Nodes (24): failingRow(), inboxSource(), jobStatus(), logoKey(), platformOf(), toAttention(), toCalendarMonth(), toChatDraft() (+16 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Payments/index.tsx"
Cohesion: 0.11
Nodes (13): Props, styles, Props, styles, LEGEND, styles, Props, styles (+5 more)

### Community 60 - "http-provider.ts"
Cohesion: 0.16
Nodes (10): axios@^1.21.1, axios, ApiError, client, pending_keys, API_BASE_URL, busy(), grant (+2 more)

### Community 61 - "theme.ts"
Cohesion: 0.07
Nodes (32): Props, styles, Props, styles, Props, styles, app_theme, COLORS (+24 more)

### Community 62 - "history.ts"
Cohesion: 0.15
Nodes (9): SubscriptionRecord, HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records (+1 more)

### Community 63 - "fonts"
Cohesion: 0.15
Nodes (12): benefit_check_icon, Props, styles, fonts, BENEFITS, CAPTIONS, DEMO_TILES, TONE_COLOR (+4 more)

### Community 64 - "alerts-action.ts"
Cohesion: 0.08
Nodes (42): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount() (+34 more)

### Community 65 - "money.ts"
Cohesion: 0.25
Nodes (7): CURRENCY_NAMES, CURRENCY_SEARCH, NO_DECIMALS, SIGN_PATTERN, SIGNS, SYMBOLS, THREE_DECIMALS

### Community 66 - "platform_logos.ts"
Cohesion: 0.18
Nodes (10): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+2 more)

### Community 67 - "calendar.ts"
Cohesion: 0.15
Nodes (13): detailSlice, initial_state, Key, DetailState, HomeEvent, SubscriptionDetail, dayMarker(), monthTitle() (+5 more)

### Community 68 - "Auth.test.tsx"
Cohesion: 0.17
Nodes (4): react-test-renderer, mockBackend, Tree, typeInto()

### Community 69 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 70 - "ConnectInbox/index.tsx"
Cohesion: 0.09
Nodes (14): OPTIONS, Props, styles, Props, Props, PROVIDERS, styles, Frame (+6 more)

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.17
Nodes (11): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, GENDER_OPTIONS, GENDER_VALUE, GenderOption, genderOption() (+3 more)

### Community 76 - "History/index.tsx"
Cohesion: 0.20
Nodes (5): Props, styles, styles, ListController, styles

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots"
Cohesion: 0.29
Nodes (6): Backend bugs from the second pass, Bugs and gaps, Fourth pass (usage bills in onboarding), QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots, Second pass (same day, after the design revisions), Third pass (auto-advance and dismiss)

### Community 80 - "react-native-mmkv"
Cohesion: 0.29
Nodes (6): react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-mmkv, redux-persist, mmkv, redux_storage

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 84 - "Mascot"
Cohesion: 0.21
Nodes (12): busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot(), ScanCard(), RiderBar(), StageRider() (+4 more)

### Community 85 - "Splash.test.tsx"
Cohesion: 0.20
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 87 - "money"
Cohesion: 0.17
Nodes (24): PlatformLogo(), TrialRows(), Cell(), DraftCard(), CandidateRow(), NextEvent(), Toolbar(), ReadyToGoBody() (+16 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 94 - "payments-action.ts"
Cohesion: 0.33
Nodes (3): PaymentDto, getAllPayments(), getPayments()

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 96 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 630 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `CustomText/index.tsx`, `requestHandler`, `Icons/index.tsx`, `SIZES`, `CustomText/index.tsx`, `SubscriptionFields/index.tsx`, `App.tsx`, `Container (2)`, `navigate`, `Tabs.tsx`, `auth-action.ts`, `YourSubscriptions/index.tsx`, `VoiceRecorder.tsx`, `SubscriptionDetail/index.function.ts`, `Settings/index.tsx`, `InputField`, `DetailSheets.tsx`, `Onboarding/index.function.ts`, `gmail-action.ts`, `service.ts`, `outlook-login.test.ts`, `GmailViews.tsx`, `Profile/index.tsx`, `store.ts`, `ChatParts.tsx`, `support-action.ts`, `app-update-hook.test.tsx`, `Payments/index.tsx`, `theme.ts`, `fonts`, `alerts-action.ts`, `Auth.test.tsx`, `ConnectInbox/index.tsx`, `History/index.tsx`, `Splash.test.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CustomText/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08478513356562137 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051715309779825906 - nodes in this community are weakly interconnected._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.13588850174216027 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._