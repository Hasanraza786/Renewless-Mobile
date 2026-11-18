# Graph Report - Renewless-mobile  (2026-11-18)

## Corpus Check
- 380 files · ~146,488 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2236 nodes · 8495 edges · 100 communities (81 shown, 19 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 151 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e74c8ba1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react-native
- RenewlessWidgetProvider.kt
- requestHandler
- Home/index.tsx
- Onboarding/index.tsx
- requestHandler
- profile-action.ts
- profile-action.ts
- SizedBox
- CustomText/index.tsx
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
- Payments/index.tsx
- ai-consent.test.ts
- iOS Native Imports
- store.ts
- DisabledAccountDialog/index.tsx
- Home/index.tsx
- store.ts (2)
- fonts
- GmailViews.tsx
- api_services/request-handler.ts
- service.ts (2)
- RowView
- ContactUs/index.function.ts
- Profile/index.function.ts
- Runtime Dependencies
- calendar.ts
- Release Blockers & Gaps
- Countries & Phone
- types.ts (2)
- theme.ts
- types.ts (4)
- icons/index.ts
- react-native-mmkv
- Community 68
- Icons/index.tsx
- AiChat/index.function.ts
- MessageRow/index.tsx
- ContactUs/index.function.ts
- react-test-renderer
- Icons/index.tsx (2)
- logoKey
- API DTOs & Request Handler (2)
- Calendar/index.function.ts
- SubscriptionFields/index.tsx (2)
- iOS Widget Bridge
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- payments-action.ts
- receipts-action.ts
- goBack
- sync-locked-inbox.test.ts
- SpendRows/index.tsx
- Profile/index.tsx
- Community 57
- inbox-action.ts
- Project Working Rules
- Runtime Dependencies (2)
- types.ts (5)
- Metro Config
- status_colors.ts
- QA Plan & Contracts (2)
- Android MainActivity
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- Community 78
- Persisted Storage
- types.ts (6)
- types.ts (2) (2)
- iOS Widget Bridge (2)
- RowView
- ConnectedInbox/index.tsx
- store.ts (2) (3)
- CustomButton (3)
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)
- Splash/index.tsx

## God Nodes (most connected - your core abstractions)
1. `react-native` - 194 edges
2. `RowView()` - 174 edges
3. `COLORS` - 165 edges
4. `SIZES` - 164 edges
5. `CustomText()` - 144 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 88 edges
8. `CustomButton()` - 87 edges
9. `fonts` - 86 edges
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

## Communities (100 total, 19 thin omitted)

### Community 0 - "react-native"
Cohesion: 0.11
Nodes (15): react-native, Props, styles, Props, styles, SIZES, LEGEND, styles (+7 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.06
Nodes (56): categories, dayLabel(), FORM_TO_BACKEND, fromReminder(), inboxSource(), logo_urls, platformBySubscription, RECEIPT_KINDS (+48 more)

### Community 2 - "requestHandler"
Cohesion: 0.13
Nodes (49): Container(), CustomText(), Header(), busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot() (+41 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "Onboarding/index.tsx"
Cohesion: 0.07
Nodes (47): check_dark_icon, inbox_badge_icon, offline_badge_icon, InfoTooltip(), OnboardingTitle(), CONNECT_LABELS, ConnectArt(), ConnectInboxBody() (+39 more)

### Community 5 - "requestHandler"
Cohesion: 0.06
Nodes (60): fromCycle(), fromGmailSelection(), fromScanCandidate(), isAuthExpired(), toInbox(), toProfile(), Props, beginSession() (+52 more)

### Community 6 - "profile-action.ts"
Cohesion: 0.08
Nodes (17): fromReminderSettings(), toAlert(), toReminderSettings(), apiServices, styles, flag(), getAlerts(), getAllAlerts() (+9 more)

### Community 7 - "profile-action.ts"
Cohesion: 0.06
Nodes (55): getApplyCount(), useNotificationPermission(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), detailView(), relative() (+47 more)

### Community 8 - "SizedBox"
Cohesion: 0.15
Nodes (29): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), InputField(), PhoneInputField(), Props (+21 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.10
Nodes (32): react, react-native-safe-area-context, chevron_down_icon, option_check_icon, benefit_check_icon, Props, Props, Props (+24 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.07
Nodes (62): toGmailCandidate(), Props, styles, updateSubscription(), SubscriptionFormRoute, useSubscriptionForm(), CYCLES, EditSheet() (+54 more)

### Community 11 - "types.ts"
Cohesion: 0.11
Nodes (43): @react-navigation/native-stack, navigate(), NavigateArgs, popTo(), resetRoot(), RootParamList, TAB_NAMES, forgotPassword() (+35 more)

### Community 12 - "useAppSelector"
Cohesion: 0.06
Nodes (46): @react-navigation/native, toCalendarMonth(), UndoToast(), MainNavigator(), getCalendarMonth(), getImportedSubscriptions(), getSubscriptions(), openReceiptFile() (+38 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (43): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2 (+35 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.07
Nodes (43): categoryId(), hasCategories(), toRecord(), toSubscriptionBody(), getDashboard(), getHomeData(), cancelSubscription(), createFromForm() (+35 more)

### Community 16 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "iOS AppDelegate"
Cohesion: 0.11
Nodes (26): focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), syncAiConsent() (+18 more)

### Community 20 - "Payments/index.tsx"
Cohesion: 0.16
Nodes (23): SpendRow(), SpendRows(), TrialRows(), TopSpending(), PaymentChart(), Field(), NOTES, PaymentDialog() (+15 more)

### Community 21 - "ai-consent.test.ts"
Cohesion: 0.20
Nodes (7): put(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 22 - "iOS Native Imports"
Cohesion: 0.14
Nodes (15): bundledLogoKey(), registerPush(), savePushToken(), syncAccount(), timezone(), MAX_INBOXES, useHome(), pushToken() (+7 more)

### Community 23 - "store.ts"
Cohesion: 0.10
Nodes (31): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+23 more)

### Community 24 - "DisabledAccountDialog/index.tsx"
Cohesion: 0.18
Nodes (7): DisabledAccountDialog(), styles, closeDisabledAccount(), deleteDisabledAccount(), actions, { ApiError }, mockApi

### Community 25 - "Home/index.tsx"
Cohesion: 0.17
Nodes (19): AddChoiceLinks(), AddOptions(), AddSheet(), Props, ChooseInboxSheet(), InboxProviders(), Chart(), Forecast() (+11 more)

### Community 26 - "store.ts (2)"
Cohesion: 0.07
Nodes (29): initial_state, onboardingSlice, AiDraft, AuthResponse, Cycle, Gender, GmailScanStatus, GoogleConnection (+21 more)

### Community 27 - "fonts"
Cohesion: 0.16
Nodes (14): fonts, Props, styles, THEME, BENEFITS, CAPTIONS, DEMO_TILES, TONE_COLOR (+6 more)

### Community 28 - "GmailViews.tsx"
Cohesion: 0.14
Nodes (29): PlatformLogo(), ChangesSheet(), Field(), GmailSheets(), InboxSheet(), Props, CandidateRow(), Caption() (+21 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.06
Nodes (62): react-native-device-info@^15.0.2, react-native-device-info, get(), patch(), post(), applyReminderDefault(), cancelSubscription(), changePassword() (+54 more)

### Community 30 - "service.ts (2)"
Cohesion: 0.10
Nodes (22): apple_icon, arrow_icon, calendar_icon, check_icon, edit_icon, find_grey_icon, find_icon, gmail_icon (+14 more)

### Community 31 - "RowView"
Cohesion: 0.11
Nodes (31): outlook_logo, AppUpdate(), AuthDivider(), AuthFooterLink(), AuthLayout(), OUTLOOK_SOCIAL_ICON, Props, SocialButtons() (+23 more)

### Community 32 - "ContactUs/index.function.ts"
Cohesion: 0.23
Nodes (18): EMPTY, PaymentsController, PaymentsRoute, usePayments(), PaymentRecord, alignedMonth(), cents(), defaultYear() (+10 more)

### Community 33 - "Profile/index.function.ts"
Cohesion: 0.11
Nodes (21): openLegal(), PRIVACY_URL, TERMS_URL, changePassword(), logoutUser(), deleteAccount(), endSession(), selectUser() (+13 more)

### Community 34 - "Runtime Dependencies"
Cohesion: 0.07
Nodes (27): ApiError, client, del(), newKey(), pending_keys, postLong(), request(), upload() (+19 more)

### Community 35 - "calendar.ts"
Cohesion: 0.36
Nodes (5): dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "Countries & Phone"
Cohesion: 0.11
Nodes (18): App(), displayName, name, @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-redux@^9.3.0, @react-native-firebase/crashlytics, react-native-keychain (+10 more)

### Community 38 - "types.ts (2)"
Cohesion: 0.10
Nodes (18): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, calendarSlice, initial_state, dashboardSlice, initial_state, inboxSlice, initial_state (+10 more)

### Community 39 - "theme.ts"
Cohesion: 0.07
Nodes (23): styles, styles, styles, styles, styles, styles, styles, Props (+15 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "icons/index.ts"
Cohesion: 0.09
Nodes (27): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo (+19 more)

### Community 42 - "react-native-mmkv"
Cohesion: 0.29
Nodes (6): react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-mmkv, redux-persist, mmkv, redux_storage

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "Icons/index.tsx"
Cohesion: 0.13
Nodes (14): react-native-svg, filter_icon, Props, styles, Props, styles, Props, styles (+6 more)

### Community 45 - "AiChat/index.function.ts"
Cohesion: 0.18
Nodes (18): pause_icon, pdf_icon, play_icon, ImagePreview(), Cell(), clock(), DraftCard(), LoopAuthor() (+10 more)

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.19
Nodes (11): initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useContactUs(), SupportMessage, SupportState, SupportTopic (+3 more)

### Community 48 - "react-test-renderer"
Cohesion: 0.50
Nodes (3): react-test-renderer@19.2.3, react-test-renderer, typeInto()

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "logoKey"
Cohesion: 0.21
Nodes (14): categoryName(), logoKey(), platformOf(), toAiReply(), toChatDraft(), toCycle(), toEvent(), toGmailScan() (+6 more)

### Community 51 - "API DTOs & Request Handler (2)"
Cohesion: 0.16
Nodes (9): replace(), constantSlice, initial_state, BRAND_MOTION, useSplash(), useSplashReveal(), ConstantState, mock_dispatch (+1 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "SubscriptionFields/index.tsx (2)"
Cohesion: 0.17
Nodes (13): toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "iOS Widget Bridge"
Cohesion: 0.22
Nodes (4): initial_state, listSlice, ListState, loaded

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "payments-action.ts"
Cohesion: 0.32
Nodes (4): toPayment(), PaymentDto, getAllPayments(), getPayments()

### Community 60 - "receipts-action.ts"
Cohesion: 0.36
Nodes (7): toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), ReceiptItem, viewReceiptPdf()

### Community 61 - "goBack"
Cohesion: 0.07
Nodes (20): Props, styles, Props, styles, Props, goBack(), styles, PLACEHOLDERS (+12 more)

### Community 62 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 63 - "SpendRows/index.tsx"
Cohesion: 0.50
Nodes (3): Props, Row, styles

### Community 64 - "Profile/index.tsx"
Cohesion: 0.09
Nodes (16): chevron_right_icon, mail_icon, OPTIONS, Props, styles, Props, PROVIDERS, styles (+8 more)

### Community 69 - "inbox-action.ts"
Cohesion: 0.17
Nodes (12): disconnectInbox(), flag(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute, STATUS (+4 more)

### Community 70 - "Project Working Rules"
Cohesion: 0.17
Nodes (14): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, react-native-permissions@^5.6.3, @notifee/react-native, @react-native-firebase/messaging, react-native-permissions, store, ADMIN_SCREENS (+6 more)

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
Cohesion: 0.47
Nodes (4): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL

### Community 76 - "Android MainActivity"
Cohesion: 0.12
Nodes (8): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount, mockBackend, Tree

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

### Community 85 - "types.ts (2) (2)"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 86 - "iOS Widget Bridge (2)"
Cohesion: 0.33
Nodes (5): detailSlice, initial_state, Key, DetailState, SubscriptionDetail

### Community 87 - "RowView"
Cohesion: 0.16
Nodes (25): DialogCard(), AnimatedPath, Icons(), RowView(), FileBubble(), AttachSheet(), WeekdayHeader(), FilterDialog() (+17 more)

### Community 88 - "ConnectedInbox/index.tsx"
Cohesion: 0.18
Nodes (8): close_icon, Props, styles, Frame, Props, styles, PILL, styles

### Community 91 - "CustomButton (3)"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore`, `react_native_app_auth`, `Foundation` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 542 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `Onboarding/index.tsx`, `requestHandler`, `profile-action.ts`, `profile-action.ts`, `SizedBox`, `CustomText/index.tsx`, `API DTOs & Request Handler`, `types.ts`, `useAppSelector`, `Container (2)`, `Profile/index.tsx`, `Tabs.tsx`, `navigate`, `iOS AppDelegate`, `Payments/index.tsx`, `iOS Native Imports`, `store.ts`, `DisabledAccountDialog/index.tsx`, `Home/index.tsx`, `fonts`, `GmailViews.tsx`, `api_services/request-handler.ts`, `service.ts (2)`, `RowView`, `Profile/index.function.ts`, `Runtime Dependencies`, `Countries & Phone`, `theme.ts`, `Icons/index.tsx`, `AiChat/index.function.ts`, `MessageRow/index.tsx`, `react-test-renderer`, `API DTOs & Request Handler (2)`, `SubscriptionFields/index.tsx (2)`, `goBack`, `SpendRows/index.tsx`, `Profile/index.tsx`, `Project Working Rules`, `Android MainActivity`, `ConnectedInbox/index.tsx`, `Splash/index.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react-native` be split into smaller, more focused modules?**
  _Cohesion score 0.1141025641025641 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.05669199298655757 - nodes in this community are weakly interconnected._
- **Should `requestHandler` be split into smaller, more focused modules?**
  _Cohesion score 0.1273469387755102 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._