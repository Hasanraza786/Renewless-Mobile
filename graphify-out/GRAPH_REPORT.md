# Graph Report - Renewless-mobile  (2026-11-24)

## Corpus Check
- 385 files · ~148,926 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2337 nodes · 8541 edges · 102 communities (82 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 150 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `87c8d1e5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ReminderSettings/index.tsx
- RenewlessWidgetProvider.kt
- requestHandler
- Home/index.tsx
- AiChat/index.function.ts
- auth-action.ts
- Receipts/index.function.ts
- alerts-action.ts
- CustomButton
- RowView/index.tsx
- API DTOs & Request Handler
- MainNavigator.tsx
- profile-action.ts
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- Header/index.tsx
- navigate
- Dev Dependencies
- Tabs.tsx
- AddOptions/index.tsx
- YourSubscriptions/index.tsx
- iOS Native Imports
- store.ts
- outlook-connect.test.ts
- SubscriptionDetail/index.function.ts
- types.ts
- http-provider.ts
- GmailViews.tsx
- api_services/request-handler.ts
- service.ts (2)
- CustomButton
- Payments/index.tsx
- gmail-action.ts
- Auth.test.tsx
- service.ts
- Release Blockers & Gaps
- App.tsx
- phone.ts
- AuthLayout/index.tsx
- types.ts (4)
- Settings/index.tsx
- session-token.ts
- Community 68
- History/index.tsx
- ChatParts.tsx
- fonts
- ContactUs/index.function.ts
- status_colors.ts
- Icons/index.tsx (2)
- list.ts
- HomeScreen
- Calendar/index.function.ts
- app-update-hook.test.tsx
- logoKey
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- payments-action.ts
- Settings/index.tsx
- react-native
- ai-consent.test.ts
- fonts
- alerts.ts
- @react-native-google-signin/google-signin
- HelpSupport/index.tsx
- calendar.ts
- platform_logos.ts
- sync-locked-inbox.test.ts
- Splash.test.tsx
- AuthStack.tsx
- types.ts (5)
- Metro Config
- status_colors.ts
- EditProfile/index.function.ts
- CustomText/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- redux-persist
- Community 78
- glyph_icons.ts
- types.ts (6)
- widget_icons.ts
- updateFromForm
- logo_mark.ts
- CustomText
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 197 edges
2. `COLORS` - 168 edges
3. `SIZES` - 166 edges
4. `CustomText()` - 146 edges
5. `RowView()` - 142 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 89 edges
8. `fonts` - 87 edges
9. `CustomButton()` - 85 edges
10. `requestHandler()` - 82 edges

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

## Communities (102 total, 20 thin omitted)

### Community 0 - "ReminderSettings/index.tsx"
Cohesion: 0.16
Nodes (11): react-native-safe-area-context, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles (+3 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (63): categories, categoryId(), CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromCycle(), fromReminder() (+55 more)

### Community 2 - "requestHandler"
Cohesion: 0.10
Nodes (41): Container(), CurrencyTabs(), Header(), busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot() (+33 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.08
Nodes (36): Props, openLegal(), PRIVACY_URL, TERMS_URL, focusedTab(), changeAiConsent(), consentBody(), sendAiMessage() (+28 more)

### Community 5 - "auth-action.ts"
Cohesion: 0.07
Nodes (57): fromScanCandidate(), toProfile(), popTo(), resetRoot(), beginSession(), changePassword(), closeDisabledAccount(), deleteDisabledAccount() (+49 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.25
Nodes (11): getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute, ReceiptFile, ReceiptItem (+3 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.18
Nodes (14): fromReminderSettings(), toReminderSettings(), flag(), getAlerts(), getApplyCount(), getReminderSettings(), saveReminderSettings(), saveSettingsAndApply() (+6 more)

### Community 8 - "CustomButton"
Cohesion: 0.16
Nodes (32): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), PhoneInputField(), SubscriptionFields(), EditProfileScreen() (+24 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.16
Nodes (13): benefit_check_icon, styles, Props, Props, styles, styles, Props, ROWS (+5 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.08
Nodes (49): Props, styles, updateSubscription(), SubscriptionFormRoute, useSubscriptionForm(), ReadyToGoBody(), PlatformSuggestion, ScanCandidate (+41 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.09
Nodes (3): AppStack, theme, navigationRef

### Community 12 - "profile-action.ts"
Cohesion: 0.10
Nodes (15): deleteAccount(), ProfileInput, apple(), GmailGrant, google(), isOutlookCancel(), LOGIN_CONFIG, OUTLOOK_CONFIG (+7 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.04
Nodes (46): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-blob-util@^1.1.1 (+38 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.07
Nodes (36): hasCategories(), toAppConfig(), toRecord(), apiServices, addAiDraft(), getAppConfig(), getDashboard(), getHomeData() (+28 more)

### Community 16 - "Header/index.tsx"
Cohesion: 0.10
Nodes (13): Props, styles, Props, Props, PLACEHOLDERS, styles, PILL, styles (+5 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.25
Nodes (7): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack

### Community 20 - "AddOptions/index.tsx"
Cohesion: 0.20
Nodes (7): OPTIONS, Props, styles, Props, Props, PROVIDERS, styles

### Community 21 - "YourSubscriptions/index.tsx"
Cohesion: 0.06
Nodes (24): Props, styles, Props, Props, Props, STAGES, RADAR_SIZE, styles (+16 more)

### Community 22 - "iOS Native Imports"
Cohesion: 0.14
Nodes (17): react-native-permissions, syncAiConsent(), registerPush(), savePushToken(), getSyncLockedInbox(), HomeRoute, useHome(), ADMIN_SCREENS (+9 more)

### Community 23 - "store.ts"
Cohesion: 0.08
Nodes (20): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+12 more)

### Community 24 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.13
Nodes (29): NextEvent(), DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL (+21 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (72): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, endSession(), Options, SESSION_ENDED, alertsSlice, initial_state, Key (+64 more)

### Community 27 - "http-provider.ts"
Cohesion: 0.12
Nodes (18): client, del(), newKey(), pending_keys, postLong(), put(), request(), upload() (+10 more)

### Community 28 - "GmailViews.tsx"
Cohesion: 0.07
Nodes (56): InfoTooltip(), OnboardingTitle(), SizedBox(), CandidateRow(), Caption(), GmailRecoveryArt(), InboxLine(), Props (+48 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.07
Nodes (60): get(), patch(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft() (+52 more)

### Community 30 - "service.ts (2)"
Cohesion: 0.10
Nodes (28): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon (+20 more)

### Community 31 - "CustomButton"
Cohesion: 0.21
Nodes (20): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), CustomButton(), InputField(), MonthPicker(), ChangePasswordScreen() (+12 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 33 - "gmail-action.ts"
Cohesion: 0.10
Nodes (35): fromGmailSelection(), toInbox(), connectGmailInbox(), connectInbox(), connectOutlookInbox(), day(), getGmailInboxes(), getGmailScan() (+27 more)

### Community 34 - "Auth.test.tsx"
Cohesion: 0.07
Nodes (18): ApiError, mockBackend, Tree, busy(), grant, mockPost, actions, connector (+10 more)

### Community 35 - "service.ts"
Cohesion: 0.07
Nodes (51): @react-navigation/native, UndoToast(), styles, MainNavigator(), navigate(), NavigateArgs, RootParamList, TAB_NAMES (+43 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "App.tsx"
Cohesion: 0.19
Nodes (9): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+1 more)

### Community 38 - "phone.ts"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 39 - "AuthLayout/index.tsx"
Cohesion: 0.13
Nodes (8): OUTLOOK_SOCIAL_ICON, Props, styles, behavior, CONNECT_LABELS, Props, TRUST_ROWS, styles

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Settings/index.tsx"
Cohesion: 0.10
Nodes (15): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+7 more)

### Community 42 - "session-token.ts"
Cohesion: 0.18
Nodes (12): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, app_storage, clearSessionToken() (+4 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "History/index.tsx"
Cohesion: 0.13
Nodes (11): react-native-svg, Props, styles, Props, styles, Props, Props, styles (+3 more)

### Community 45 - "ChatParts.tsx"
Cohesion: 0.18
Nodes (7): pause_icon, pdf_icon, play_icon, clock(), Props, WAVE, ChatMessage

### Community 46 - "fonts"
Cohesion: 0.21
Nodes (10): Props, styles, fonts, Props, Props, Props, styles, SupportMessage (+2 more)

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.17
Nodes (8): sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.13
Nodes (17): SubscriptionRecord, HISTORY_FILTERS, historyRecords(), HistoryStatus, lifecycleDate(), byName(), byNextEvent(), LIST_GROUPS (+9 more)

### Community 51 - "HomeScreen"
Cohesion: 0.29
Nodes (10): AddChoiceLinks(), AddOptions(), AddSheet(), ChooseInboxSheet(), InboxProviders(), Block(), HomeSkeleton(), Row() (+2 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.18
Nodes (11): useAppUpdate(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch, mockGetAppConfig, openURL (+3 more)

### Community 54 - "logoKey"
Cohesion: 0.13
Nodes (22): categoryName(), isAuthExpired(), knownEventType(), logoKey(), platformOf(), toAiReply(), toAlert(), toCalendarMonth() (+14 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "payments-action.ts"
Cohesion: 0.18
Nodes (7): inboxSource(), toPayment(), PaymentDto, getAllPayments(), getPayments(), actions, mockApi

### Community 60 - "Settings/index.tsx"
Cohesion: 0.13
Nodes (6): refresh_icon, widget_icon, switch_off_icon, switch_on_icon, PROVIDER_LABEL, styles

### Community 61 - "react-native"
Cohesion: 0.07
Nodes (31): react-native, styles, styles, styles, Props, styles, styles, styles (+23 more)

### Community 62 - "ai-consent.test.ts"
Cohesion: 0.33
Nodes (3): saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 63 - "fonts"
Cohesion: 0.08
Nodes (25): external_icon, chevron_right_icon, Props, Props, Props, Props, Row, styles (+17 more)

### Community 64 - "alerts.ts"
Cohesion: 0.27
Nodes (11): SentAlert, ACCOUNT_REMINDER_ITEMS, accountDisplay(), accountValues(), alertMessage(), groupAlerts(), localDate(), nextAccountValues() (+3 more)

### Community 65 - "@react-native-google-signin/google-signin"
Cohesion: 0.11
Nodes (10): react-native-gesture-handler@^3.3.0, @react-native-google-signin/google-signin@^17.0.0, react-native-image-picker@8.3.0, react-native-nitro-sound@0.2.20, @react-navigation/bottom-tabs@^7.20.0, react-native-gesture-handler, @react-native-google-signin/google-signin, react-native-image-picker (+2 more)

### Community 66 - "HelpSupport/index.tsx"
Cohesion: 0.31
Nodes (7): MenuGroup(), MessageRow(), Question(), StatusPill(), SUPPORT_QUESTIONS, HelpSupportScreen(), styles

### Community 67 - "calendar.ts"
Cohesion: 0.33
Nodes (6): HomeEvent, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 68 - "platform_logos.ts"
Cohesion: 0.22
Nodes (8): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, spotify_logo

### Community 69 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 70 - "Splash.test.tsx"
Cohesion: 0.39
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 71 - "AuthStack.tsx"
Cohesion: 0.40
Nodes (4): stack_options, AuthStack(), Stack, Splash()

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "EditProfile/index.function.ts"
Cohesion: 0.10
Nodes (23): @react-navigation/native-stack, goBack(), selectUser(), Fields, passwordErrors(), useChangePassword(), GENDER_OPTIONS, GENDER_VALUE (+15 more)

### Community 76 - "CustomText/index.tsx"
Cohesion: 0.07
Nodes (24): react, Props, styles, MAX_FONT_SCALE, Props, styles, Props, styles (+16 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 80 - "redux-persist"
Cohesion: 0.40
Nodes (4): redux-persist@^6.0.0, redux-persist, mmkv, redux_storage

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 82 - "glyph_icons.ts"
Cohesion: 0.50
Nodes (3): arrow_right_icon, more_icon, plus_glyph_icon

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 85 - "updateFromForm"
Cohesion: 0.67
Nodes (3): getPlatformId(), isServerId(), updateFromForm()

### Community 87 - "CustomText"
Cohesion: 0.07
Nodes (85): AppUpdate(), ConfirmDialog(), CustomText(), DialogCard(), DisabledAccountDialog(), AnimatedPath, Icons(), ImagePreview() (+77 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 613 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `ReminderSettings/index.tsx`, `requestHandler`, `AiChat/index.function.ts`, `auth-action.ts`, `alerts-action.ts`, `CustomButton`, `RowView/index.tsx`, `API DTOs & Request Handler`, `Container (2)`, `Profile/index.tsx`, `Header/index.tsx`, `navigate`, `Tabs.tsx`, `AddOptions/index.tsx`, `YourSubscriptions/index.tsx`, `iOS Native Imports`, `store.ts`, `SubscriptionDetail/index.function.ts`, `GmailViews.tsx`, `api_services/request-handler.ts`, `CustomButton`, `gmail-action.ts`, `Auth.test.tsx`, `service.ts`, `App.tsx`, `AuthLayout/index.tsx`, `Settings/index.tsx`, `History/index.tsx`, `ChatParts.tsx`, `fonts`, `ContactUs/index.function.ts`, `app-update-hook.test.tsx`, `Settings/index.tsx`, `fonts`, `HelpSupport/index.tsx`, `Splash.test.tsx`, `EditProfile/index.function.ts`, `CustomText/index.tsx`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.050203527815468114 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `requestHandler` be split into smaller, more focused modules?**
  _Cohesion score 0.10434782608695652 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._
- **Should `AiChat/index.function.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0797872340425532 - nodes in this community are weakly interconnected._