# Graph Report - Renewless-mobile  (2026-11-27)

## Corpus Check
- 395 files · ~164,034 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2393 nodes · 9017 edges · 99 communities (80 shown, 19 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 162 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dce155b3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- adapters.ts
- Container
- RenewlessWidgetProvider.kt
- AiChat/index.function.ts
- requestHandler
- SIZES
- redux/request-handler.ts
- useAppSelector
- RowView/index.tsx
- SubscriptionFields/index.tsx
- Onboarding/index.tsx
- http-provider.ts
- iOS Widget Models
- Container (2)
- detail-action.ts
- VoiceRecorder.tsx
- navigate
- Dev Dependencies
- Welcome/index.tsx
- analytics.ts
- FirstResults/index.tsx
- react
- GmailViews.tsx
- icons/index.ts
- toRecord
- types.ts
- list.ts
- Signup/index.tsx
- api_services/request-handler.ts
- Tabs.tsx
- YourSubscriptions/index.tsx
- Payments/index.tsx
- Splash.test.tsx
- gmail-action.ts
- Receipts/index.function.ts
- Release Blockers & Gaps
- ConnectedInbox/index.function.ts
- sync-locked-inbox.test.ts
- store.ts
- types.ts (4)
- Profile/index.tsx
- App.tsx
- Community 68
- phone.ts
- platform_logos.ts
- auth-action.ts
- ContactUs/index.function.ts
- ChatParts.tsx
- Icons/index.tsx (2)
- events.ts
- RowView
- Calendar/index.function.ts
- app-update-hook.test.tsx
- alerts-action.ts
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- Auth.test.tsx
- ai-consent.test.ts
- react-native
- GmailScan/index.function.ts
- service.ts
- alerts-action.ts
- SubscriptionDetail/index.tsx
- push.ts
- Welcome/index.tsx
- ChangePassword/index.function.ts
- support-action.ts
- widget_icons.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- profile-action.ts
- theme.ts
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- fonts
- Community 78
- types.ts (6)
- logo_mark.ts
- glyph_icons.ts
- YourSubscriptions/index.tsx
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `RowView()` - 175 edges
3. `COLORS` - 171 edges
4. `SIZES` - 170 edges
5. `CustomText()` - 155 edges
6. `react` - 92 edges
7. `Final release audit 17 Nov 2026` - 92 edges
8. `fonts` - 90 edges
9. `requestHandler()` - 87 edges
10. `CustomButton()` - 82 edges

## Surprising Connections (you probably didn't know these)
- `F52: Keychain write failure silent at sign-in [Fixed]` --references--> `saveSessionToken()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/session-token.ts
- `F37: Onboarding connect path lacks disabled-account delete [Fixed]` --references--> `DisabledAccountDialog()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `F26: Payments ignore refunded field [Fixed]` --references--> `statusLabel()`  [INFERRED]
  qa/runs/2026-11-17-final-release-audit.md → src/utils/payments.ts
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

## Communities (99 total, 19 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (24): react, react-native-safe-area-context, chevron_down_icon, option_check_icon, benefit_check_icon, MAX_FONT_SCALE, Frame, Multiple (+16 more)

### Community 1 - "adapters.ts"
Cohesion: 0.05
Nodes (60): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, jobStatus(), logo_urls, platformBySubscription (+52 more)

### Community 2 - "Container"
Cohesion: 0.10
Nodes (63): AddOptions(), AddSheet(), AppUpdate(), ChooseInboxSheet(), Container(), CurrencyTabs(), CustomText(), DisabledAccountDialog() (+55 more)

### Community 3 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.09
Nodes (30): toAiReply(), Props, openLegal(), PRIVACY_URL, TERMS_URL, focusedTab(), changeAiConsent(), consentBody() (+22 more)

### Community 5 - "requestHandler"
Cohesion: 0.06
Nodes (29): fromScanCandidate(), isAuthExpired(), toScanStatus(), resetRoot(), answerScanNotify(), editOnboardingCandidate(), finishOnboarding(), getOnboardingScan() (+21 more)

### Community 6 - "SIZES"
Cohesion: 0.08
Nodes (20): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, Props, styles, Props (+12 more)

### Community 7 - "redux/request-handler.ts"
Cohesion: 0.06
Nodes (23): hasCategories(), platformOf(), setCategories(), toAppConfig(), toCalendarMonth(), toEvent(), toEvents(), toHome() (+15 more)

### Community 8 - "useAppSelector"
Cohesion: 0.12
Nodes (27): UndoToast(), getSubscriptions(), useAppDispatch(), useAppSelector, AlertsController, useAlerts(), CalendarController, CalendarRoute (+19 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.09
Nodes (23): chevron_right_icon, OPTIONS, Props, styles, styles, Props, styles, styles (+15 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.11
Nodes (34): Props, styles, searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion, SubscriptionRecord, AMOUNT_ERROR (+26 more)

### Community 11 - "Onboarding/index.tsx"
Cohesion: 0.10
Nodes (33): OnboardingTitle(), CONNECT_LABELS, ConnectInboxFooter(), Props, TRUST_ROWS, styles, DiscoveringArt(), DiscoveringBody() (+25 more)

### Community 12 - "http-provider.ts"
Cohesion: 0.06
Nodes (35): react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, react-native-keychain, react-native-mmkv, ApiError, client, pending_keys, API_BASE_URL (+27 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.04
Nodes (47): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-blob-util@^1.1.1, react-native-calendars@^1.1314.0 (+39 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.12
Nodes (29): categoryId(), fromCycle(), fromReminder(), toSubscriptionBody(), cancelSubscription(), createFromForm(), current(), deleteSubscription() (+21 more)

### Community 16 - "VoiceRecorder.tsx"
Cohesion: 0.08
Nodes (24): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+16 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Welcome/index.tsx"
Cohesion: 0.12
Nodes (15): apple_icon, arrow_icon, calendar_icon, edit_icon, filter_icon, gmail_icon, google_icon, hint_icon (+7 more)

### Community 20 - "analytics.ts"
Cohesion: 0.15
Nodes (19): @react-navigation/native-stack, popTo(), forgotPassword(), resetPassword(), authError(), useForgotPassword(), Route, useLogin() (+11 more)

### Community 21 - "FirstResults/index.tsx"
Cohesion: 0.18
Nodes (10): Props, Props, RiderBar(), StageRider(), STAGES, useTrickle(), RADAR_SIZE, styles (+2 more)

### Community 22 - "react"
Cohesion: 0.09
Nodes (19): close_icon, Props, Props, styles, Props, styles, Props, styles (+11 more)

### Community 23 - "GmailViews.tsx"
Cohesion: 0.12
Nodes (25): PlatformLogo(), CandidateRow(), Caption(), GmailRecoveryArt(), InboxLine(), MatchRow(), Props, RecoveryView() (+17 more)

### Community 24 - "icons/index.ts"
Cohesion: 0.14
Nodes (17): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon (+9 more)

### Community 25 - "toRecord"
Cohesion: 0.25
Nodes (16): categoryName(), failingRow(), inboxSource(), logoKey(), toAttention(), toChatDraft(), toCycle(), toDated() (+8 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (73): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, status_colors, alertsSlice, initial_state, Key, authSlice, initial_state (+65 more)

### Community 27 - "list.ts"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 28 - "Signup/index.tsx"
Cohesion: 0.22
Nodes (13): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), stack_options, AuthStack(), Stack, ForgotPasswordScreen() (+5 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.05
Nodes (78): del(), get(), newKey(), patch(), post(), postLong(), put(), request() (+70 more)

### Community 30 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 31 - "YourSubscriptions/index.tsx"
Cohesion: 0.12
Nodes (50): AddChoiceLinks(), AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField() (+42 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.15
Nodes (27): getPayments(), NOTES, styles, EMPTY_COPY, EmptyKind, EMPTY, PaymentsController, PaymentsRoute (+19 more)

### Community 33 - "Splash.test.tsx"
Cohesion: 0.36
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 34 - "gmail-action.ts"
Cohesion: 0.11
Nodes (51): failedGmailScan(), fromGmailSelection(), toInbox(), addAiDraft(), syncAiConsent(), beginSession(), deleteDisabledAccount(), logoutUser() (+43 more)

### Community 35 - "Receipts/index.function.ts"
Cohesion: 0.20
Nodes (15): receiptDate(), toReceipt(), ReceiptDto, getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController (+7 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "ConnectedInbox/index.function.ts"
Cohesion: 0.15
Nodes (16): disconnectInbox(), flag(), getImportedSubscriptions(), getInbox(), getInboxData(), reconnectInbox(), getAllSubscriptions(), ConnectedInboxController (+8 more)

### Community 38 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 39 - "store.ts"
Cohesion: 0.10
Nodes (8): redux-persist@^6.0.0, redux-persist, mmkv, redux_storage, AppDispatch, constant_reducer, persisted_reducer, root_reducer

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.13
Nodes (5): Props, PROVIDERS, styles, syncDate(), styles

### Community 42 - "App.tsx"
Cohesion: 0.21
Nodes (9): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, persistor (+1 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "phone.ts"
Cohesion: 0.20
Nodes (12): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, GENDER_OPTIONS, GENDER_VALUE, GenderOption, genderOption() (+4 more)

### Community 45 - "platform_logos.ts"
Cohesion: 0.18
Nodes (10): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, platform_logos (+2 more)

### Community 46 - "auth-action.ts"
Cohesion: 0.12
Nodes (16): closeDisabledAccount(), formWide(), login(), offerDisabledDelete(), outlookLogin(), registerPush(), signup(), signup_codes (+8 more)

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.36
Nodes (7): TOPIC_OPTIONS, topicOf(), useContactUs(), SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN, SUPPORT_TOPIC_LABELS

### Community 48 - "ChatParts.tsx"
Cohesion: 0.15
Nodes (7): Props, WAVE, Props, ROWS, Props, AiChatController, styles

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "events.ts"
Cohesion: 0.07
Nodes (37): bundledLogoKey(), detailView(), relative(), HomeEvent, dayMarker(), monthTitle(), nearestEvent(), shiftMonth() (+29 more)

### Community 51 - "RowView"
Cohesion: 0.08
Nodes (60): ConfirmDialog(), DialogCard(), AnimatedPath, Icons(), ImagePreview(), LinkText(), RowView(), TrialRows() (+52 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.14
Nodes (13): react-native-device-info@^15.0.2, react-native-device-info, useAppUpdate(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "alerts-action.ts"
Cohesion: 0.15
Nodes (14): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), AlertDto, flag(), getAlerts(), getAllAlerts() (+6 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "Auth.test.tsx"
Cohesion: 0.11
Nodes (13): react-native-config@^1.7.2, react-native-config, apple(), GmailGrant, google(), isOutlookCancel(), LOGIN_CONFIG, OUTLOOK_CONFIG (+5 more)

### Community 60 - "ai-consent.test.ts"
Cohesion: 0.33
Nodes (3): getMe(), mockGetMe, mockSaveAiConsent

### Community 61 - "react-native"
Cohesion: 0.07
Nodes (28): react-native, react-native-svg, mail_icon, Props, styles, Props, styles, Props (+20 more)

### Community 62 - "GmailScan/index.function.ts"
Cohesion: 0.15
Nodes (16): CandidateEdit, GmailPhase, GmailScanRoute, GmailSheet, MONTHLY, GmailCandidate, GmailSelection, ScanAttention (+8 more)

### Community 63 - "service.ts"
Cohesion: 0.19
Nodes (14): @react-navigation/native, navigate(), NavigateArgs, navigationRef, RootParamList, TAB_NAMES, getSupportMessages(), markSupportRead() (+6 more)

### Community 64 - "alerts-action.ts"
Cohesion: 0.14
Nodes (26): getApplyCount(), useNotificationPermission(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS (+18 more)

### Community 65 - "SubscriptionDetail/index.tsx"
Cohesion: 0.25
Nodes (4): Props, styles, Props, styles

### Community 66 - "push.ts"
Cohesion: 0.17
Nodes (14): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, react-native-permissions@^5.6.3, @notifee/react-native, @react-native-firebase/messaging, react-native-permissions, store, ADMIN_SCREENS (+6 more)

### Community 67 - "Welcome/index.tsx"
Cohesion: 0.20
Nodes (9): check_icon, find_grey_icon, find_icon, remember_icon, track_icon, BENEFITS, Props, ORBIT_SIZE (+1 more)

### Community 68 - "ChangePassword/index.function.ts"
Cohesion: 0.26
Nodes (8): changePassword(), selectUser(), Fields, passwordErrors(), signInProvider(), useChangePassword(), initials(), PROVIDER_LABEL

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "profile-action.ts"
Cohesion: 0.09
Nodes (16): toProfile(), changeProductUpdates(), updateProfile(), ProfileInput, actions, connector, grant, mockDeleteMe (+8 more)

### Community 76 - "theme.ts"
Cohesion: 0.11
Nodes (16): Props, styles, styles, app_theme, COLORS, is_ios, IS_TABLET, screen (+8 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots"
Cohesion: 0.29
Nodes (6): Backend bugs from the second pass, Bugs and gaps, Fourth pass (usage bills in onboarding), QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots, Second pass (same day, after the design revisions), Third pass (auto-advance and dismiss)

### Community 80 - "fonts"
Cohesion: 0.11
Nodes (24): nav_prev_icon, Props, styles, Props, styles, Props, Props, Props (+16 more)

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 85 - "glyph_icons.ts"
Cohesion: 0.40
Nodes (4): arrow_right_icon, external_icon, more_icon, plus_glyph_icon

### Community 87 - "YourSubscriptions/index.tsx"
Cohesion: 0.07
Nodes (53): check_dark_icon, SpendRow(), SpendRows(), Cell(), DraftCard(), Chart(), shortMonth(), CONFETTI_COLORS (+45 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 604 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `react`, `AiChat/index.function.ts`, `requestHandler`, `SIZES`, `redux/request-handler.ts`, `useAppSelector`, `RowView/index.tsx`, `SubscriptionFields/index.tsx`, `Onboarding/index.tsx`, `Container (2)`, `detail-action.ts`, `navigate`, `analytics.ts`, `FirstResults/index.tsx`, `react`, `GmailViews.tsx`, `Tabs.tsx`, `YourSubscriptions/index.tsx`, `Payments/index.tsx`, `Splash.test.tsx`, `gmail-action.ts`, `Profile/index.tsx`, `App.tsx`, `auth-action.ts`, `ChatParts.tsx`, `events.ts`, `app-update-hook.test.tsx`, `Auth.test.tsx`, `GmailScan/index.function.ts`, `service.ts`, `alerts-action.ts`, `SubscriptionDetail/index.tsx`, `push.ts`, `Welcome/index.tsx`, `support-action.ts`, `profile-action.ts`, `theme.ts`, `fonts`, `YourSubscriptions/index.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.0743321718931475 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `navigate`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051587301587301584 - nodes in this community are weakly interconnected._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.0992063492063492 - nodes in this community are weakly interconnected._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._