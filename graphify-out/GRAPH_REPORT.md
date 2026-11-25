# Graph Report - Renewless-mobile  (2026-11-25)

## Corpus Check
- 392 files · ~159,374 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2408 nodes · 8802 edges · 105 communities (85 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `195d64f7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dropdown/index.tsx
- RenewlessWidgetProvider.kt
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
- profile-action.ts
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- Onboarding/index.function.ts
- navigate
- Dev Dependencies
- Tabs.tsx
- Mascot
- FirstResults/index.tsx
- support-action.ts
- YourSubscriptions/index.tsx
- @reduxjs/toolkit
- SubscriptionDetail/index.function.ts
- types.ts
- Settings/index.tsx
- CustomButton
- api_services/request-handler.ts
- icons/index.ts
- DetailSheets.tsx
- Payments/index.tsx
- gmail-action.ts
- redux/request-handler.ts
- service.ts
- Release Blockers & Gaps
- inbox-action.ts
- endSession.ts
- AuthLayout/index.tsx
- types.ts (4)
- Profile/index.tsx
- App.tsx
- Community 68
- ChatParts.tsx
- DisabledAccountDialog/index.tsx
- MessageRow/index.tsx
- ContactUs/index.function.ts
- App.tsx
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
- Calendar/index.tsx
- HomeScreen
- react-native
- history.ts
- fonts
- ReminderSettings/index.function.ts
- Auth.test.tsx
- platform_logos.ts
- calendar.ts
- reminders.ts
- sync-locked-inbox.test.ts
- phone.ts
- SubscriptionRecord
- types.ts (5)
- Metro Config
- status_colors.ts
- goBack
- react
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- ai-consent.test.ts
- Community 78
- SubscriptionDetail/index.tsx
- types.ts (6)
- HelpSupport/index.tsx
- inbox-slice.ts
- editOnboardingCandidate
- CustomText
- widget_icons.ts
- @invertase/react-native-apple-authentication
- logo_mark.ts
- Canonical Doc Owners
- WidgetBridge ObjC
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
9. `requestHandler()` - 86 edges
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

## Communities (105 total, 20 thin omitted)

### Community 0 - "Dropdown/index.tsx"
Cohesion: 0.17
Nodes (10): Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles, DEVICE (+2 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (33): AiUsageDto, AlertsDto, AppConfigDto, BillingDto, CalendarDto, ChallengeDto, ChatTurnDto, ConnectorDto (+25 more)

### Community 2 - "Container"
Cohesion: 0.18
Nodes (28): Container(), CurrencyTabs(), Header(), InfoTooltip(), MenuGroup(), StateView(), SubscriptionCard(), AddSubscriptionScreen() (+20 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.14
Nodes (23): toAiReply(), focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat() (+15 more)

### Community 5 - "auth-action.ts"
Cohesion: 0.10
Nodes (42): popTo(), resetRoot(), beginSession(), changePassword(), forgotPassword(), formWide(), login(), logoutUser() (+34 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.21
Nodes (11): receiptDate(), toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), ReceiptFile, ReceiptItem (+3 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.14
Nodes (14): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), AlertDto, flag(), getAlerts(), getAllAlerts() (+6 more)

### Community 8 - "VoiceRecorder.tsx"
Cohesion: 0.08
Nodes (20): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+12 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.09
Nodes (25): benefit_check_icon, Props, styles, styles, Props, MAX_FONT_SCALE, Props, styles (+17 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.07
Nodes (40): Props, styles, replace(), searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), BRAND_MOTION, useSplash() (+32 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.08
Nodes (7): stack_options, AppStack, MainNavigator(), theme, navigationRef, trackScreen(), listenForWidgetUrls()

### Community 12 - "profile-action.ts"
Cohesion: 0.07
Nodes (25): toInboxSlots(), deleteAccount(), getProfileData(), apple(), GmailGrant, google(), isOutlookCancel(), LOGIN_CONFIG (+17 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.04
Nodes (49): dependencies, axios@^1.21.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-blob-util@^1.1.1, react-native-calendars@^1.1314.0 (+41 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.11
Nodes (30): fromReminder(), toSubscriptionBody(), cancelSubscription(), createFromForm(), createSubscription(), current(), deleteSubscription(), findPlatforms() (+22 more)

### Community 16 - "Onboarding/index.function.ts"
Cohesion: 0.14
Nodes (16): DEEP_POLL_MS, DEEP_WAIT_MS, ONBOARDING_STEPS, PANEL_MOTION, Route, SCAN_COMPLETE_HOLD_MS, SCAN_POLL_MS, OnboardingStep (+8 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 20 - "Mascot"
Cohesion: 0.16
Nodes (18): AppUpdate(), busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot(), OnboardingTitle(), InboxLine() (+10 more)

### Community 21 - "FirstResults/index.tsx"
Cohesion: 0.08
Nodes (16): Props, CONNECT_LABELS, Props, TRUST_ROWS, styles, Props, STAGES, RADAR_SIZE (+8 more)

### Community 22 - "support-action.ts"
Cohesion: 0.11
Nodes (17): react-native-permissions@^5.6.3, react-native-permissions, dayLabel(), timeLabel(), toSupportMessage(), getSupportMessages(), markSupportRead(), sendSupportMessage() (+9 more)

### Community 23 - "YourSubscriptions/index.tsx"
Cohesion: 0.06
Nodes (42): Props, Props, Props, styles, Props, Props, Props, STAGES (+34 more)

### Community 24 - "@reduxjs/toolkit"
Cohesion: 0.10
Nodes (18): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, alertsSlice, initial_state, Key, calendarSlice, initial_state, dashboardSlice (+10 more)

### Community 25 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.21
Nodes (19): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, amountLabel() (+11 more)

### Community 26 - "types.ts"
Cohesion: 0.09
Nodes (24): status_colors, initial_state, onboardingSlice, AiDraft, AuthResponse, Billing, Cycle, GoogleConnection (+16 more)

### Community 27 - "Settings/index.tsx"
Cohesion: 0.08
Nodes (17): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+9 more)

### Community 28 - "CustomButton"
Cohesion: 0.06
Nodes (60): AddChoiceLinks(), AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), CustomButton(), SizedBox(), Stack (+52 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.05
Nodes (79): react-native-device-info@^15.0.2, react-native-device-info, del(), get(), newKey(), patch(), post(), postLong() (+71 more)

### Community 30 - "icons/index.ts"
Cohesion: 0.10
Nodes (28): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon (+20 more)

### Community 31 - "DetailSheets.tsx"
Cohesion: 0.18
Nodes (30): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), InputField(), PhoneInputField(), FieldError() (+22 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.21
Nodes (20): getPayments(), EMPTY, PaymentsController, PaymentsRoute, usePayments(), MoneyTotal, PaymentRecord, alignedMonth() (+12 more)

### Community 33 - "gmail-action.ts"
Cohesion: 0.06
Nodes (59): failedGmailScan(), fromGmailSelection(), isAuthExpired(), toInbox(), toProfile(), syncAiConsent(), registerPush(), savePushToken() (+51 more)

### Community 34 - "redux/request-handler.ts"
Cohesion: 0.06
Nodes (27): toCalendarMonth(), toEvents(), toHome(), ApiError, client, pending_keys, apiServices, bundledLogoKey() (+19 more)

### Community 35 - "service.ts"
Cohesion: 0.06
Nodes (55): @react-navigation/native, @react-navigation/native-stack, UndoToast(), AuthStack(), navigate(), NavigateArgs, RootParamList, TAB_NAMES (+47 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "inbox-action.ts"
Cohesion: 0.17
Nodes (13): disconnectInbox(), flag(), getImportedSubscriptions(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute (+5 more)

### Community 38 - "endSession.ts"
Cohesion: 0.09
Nodes (10): constantSlice, initial_state, initial_state, profileSlice, ConstantState, Profile, ProfileOverview, ProfileState (+2 more)

### Community 39 - "AuthLayout/index.tsx"
Cohesion: 0.33
Nodes (4): OUTLOOK_SOCIAL_ICON, Props, styles, behavior

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.09
Nodes (10): OPTIONS, Props, styles, Props, Props, PROVIDERS, styles, PROVIDER_LABEL (+2 more)

### Community 42 - "App.tsx"
Cohesion: 0.14
Nodes (13): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, redux-persist@^6.0.0, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, redux-persist (+5 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "ChatParts.tsx"
Cohesion: 0.12
Nodes (11): arrow_right_icon, external_icon, more_icon, plus_glyph_icon, pause_icon, pdf_icon, play_icon, clock() (+3 more)

### Community 45 - "DisabledAccountDialog/index.tsx"
Cohesion: 0.18
Nodes (7): DisabledAccountDialog(), styles, closeDisabledAccount(), deleteDisabledAccount(), actions, { ApiError }, mockApi

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.13
Nodes (11): chevron_right_icon, MenuItem, Props, styles, Props, styles, Props, styles (+3 more)

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.22
Nodes (10): initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), SupportMessage, SupportState, SupportTopic, SUPPORT_MESSAGE_MAX (+2 more)

### Community 48 - "App.tsx"
Cohesion: 0.19
Nodes (10): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+2 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "list.ts"
Cohesion: 0.23
Nodes (10): byName(), byNextEvent(), LIST_GROUPS, LIST_SORTS, ListGroup, ListSort, nextEventDate(), sortRecords() (+2 more)

### Community 51 - "RowView"
Cohesion: 0.08
Nodes (54): ConfirmDialog(), DialogCard(), AnimatedPath, Icons(), ImagePreview(), PriceChange(), RowView(), FileBubble() (+46 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.17
Nodes (13): toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "adapters.ts"
Cohesion: 0.07
Nodes (56): categories, categoryId(), categoryName(), CYCLES, EVENT_TYPES, failingRow(), FORM_TO_BACKEND, hasCategories() (+48 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Calendar/index.tsx"
Cohesion: 0.18
Nodes (7): Props, styles, LEGEND, styles, Props, styles, MONTH_NAMES

### Community 60 - "HomeScreen"
Cohesion: 0.24
Nodes (12): AddOptions(), AddSheet(), ChooseInboxSheet(), Props, InboxProviders(), HomeScreen(), ConnectArt(), ConnectInboxBody() (+4 more)

### Community 61 - "react-native"
Cohesion: 0.06
Nodes (45): react-native, react-native-safe-area-context, styles, Props, styles, styles, Props, styles (+37 more)

### Community 62 - "history.ts"
Cohesion: 0.29
Nodes (7): HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 63 - "fonts"
Cohesion: 0.12
Nodes (17): Props, styles, Props, Props, Props, Row, styles, Props (+9 more)

### Community 64 - "ReminderSettings/index.function.ts"
Cohesion: 0.19
Nodes (18): getApplyCount(), useNotificationPermission(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS (+10 more)

### Community 65 - "Auth.test.tsx"
Cohesion: 0.12
Nodes (8): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount, mockBackend, Tree

### Community 66 - "platform_logos.ts"
Cohesion: 0.18
Nodes (10): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+2 more)

### Community 67 - "calendar.ts"
Cohesion: 0.23
Nodes (9): HomeEvent, SubscriptionDetail, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS, record (+1 more)

### Community 68 - "reminders.ts"
Cohesion: 0.40
Nodes (8): daysText(), defaultTooClose(), effectiveDays(), LAST_THREE_DAYS, nextReminderValues(), preferenceFromValues(), REMINDER_PRESETS, reminderText()

### Community 69 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 70 - "phone.ts"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 71 - "SubscriptionRecord"
Cohesion: 0.14
Nodes (9): detailSlice, initial_state, Key, initial_state, listSlice, DetailState, ListState, SubscriptionRecord (+1 more)

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "goBack"
Cohesion: 0.13
Nodes (17): openLegal(), PRIVACY_URL, TERMS_URL, goBack(), updateProfile(), selectUser(), Fields, passwordErrors() (+9 more)

### Community 76 - "react"
Cohesion: 0.12
Nodes (12): react, react-native-svg, Props, styles, Props, styles, Props, styles (+4 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots"
Cohesion: 0.40
Nodes (4): Backend bugs from the second pass, Bugs and gaps, QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots, Second pass (same day, after the design revisions)

### Community 80 - "ai-consent.test.ts"
Cohesion: 0.33
Nodes (3): saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 84 - "HelpSupport/index.tsx"
Cohesion: 0.47
Nodes (3): mail_icon, SUPPORT_QUESTIONS, styles

### Community 85 - "inbox-slice.ts"
Cohesion: 0.33
Nodes (5): inboxSlice, initial_state, Key, InboxDetail, InboxState

### Community 86 - "editOnboardingCandidate"
Cohesion: 0.50
Nodes (4): fromCycle(), fromScanCandidate(), updateCandidate(), editOnboardingCandidate()

### Community 87 - "CustomText"
Cohesion: 0.10
Nodes (52): CustomText(), LinkText(), PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), Cell(), DraftCard() (+44 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 628 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `Dropdown/index.tsx`, `AiChat/index.function.ts`, `auth-action.ts`, `VoiceRecorder.tsx`, `CustomText/index.tsx`, `SubscriptionFields/index.tsx`, `profile-action.ts`, `Container (2)`, `Onboarding/index.function.ts`, `navigate`, `Tabs.tsx`, `FirstResults/index.tsx`, `support-action.ts`, `YourSubscriptions/index.tsx`, `SubscriptionDetail/index.function.ts`, `Settings/index.tsx`, `CustomButton`, `api_services/request-handler.ts`, `DetailSheets.tsx`, `gmail-action.ts`, `redux/request-handler.ts`, `service.ts`, `AuthLayout/index.tsx`, `Profile/index.tsx`, `ChatParts.tsx`, `DisabledAccountDialog/index.tsx`, `MessageRow/index.tsx`, `App.tsx`, `app-update-hook.test.tsx`, `Calendar/index.tsx`, `HomeScreen`, `fonts`, `ReminderSettings/index.function.ts`, `Auth.test.tsx`, `goBack`, `react`, `SubscriptionDetail/index.tsx`, `HelpSupport/index.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._
- **Should `AiChat/index.function.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13756613756613756 - nodes in this community are weakly interconnected._
- **Should `auth-action.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1048265460030166 - nodes in this community are weakly interconnected._