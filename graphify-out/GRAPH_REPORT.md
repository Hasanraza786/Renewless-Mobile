# Graph Report - Renewless-mobile  (2026-11-26)

## Corpus Check
- 395 files · ~163,271 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2384 nodes · 9006 edges · 101 communities (79 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 162 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d9283771`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- adapters.ts
- Container
- RenewlessWidgetProvider.kt
- AiChat/index.function.ts
- requestHandler
- CustomButton/index.tsx
- alerts-action.ts
- useAppSelector
- CustomText/index.tsx
- SubscriptionFields/index.tsx
- service.ts
- session-token.ts
- iOS Widget Models
- Container (2)
- detail-action.ts
- VoiceRecorder.tsx
- navigate
- Dev Dependencies
- Welcome/index.tsx
- requestHandler
- Onboarding/index.tsx
- ReadyToGo/index.tsx
- GmailViews.tsx
- icons/index.ts
- ScanRecovery/index.tsx
- types.ts
- list.ts
- AuthStack.tsx
- api_services/request-handler.ts
- Tabs.tsx
- YourSubscriptions/index.tsx
- Payments/index.tsx
- outlook-connect.test.ts
- gmail-action.ts
- receipts-action.ts
- Release Blockers & Gaps
- ConnectedInbox/index.function.ts
- sync-locked-inbox.test.ts
- App.tsx
- types.ts (4)
- Profile/index.tsx
- Auth.test.tsx
- Community 68
- phone.ts
- platform_logos.ts
- reminders.ts
- ContactUs/index.function.ts
- alerts-slice.ts
- Icons/index.tsx (2)
- SubscriptionDetail/index.function.ts
- RowView
- Calendar/index.function.ts
- app-update-hook.test.tsx
- payments-action.ts
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- ReminderSettings/index.tsx
- http-provider.ts
- theme.ts
- status_colors.ts
- history.ts
- ReminderSettings/index.function.ts
- SubscriptionDetail/index.tsx
- push.ts
- HomeEvent
- product-updates.test.ts
- widget.ts
- ChatParts.tsx
- widget_icons.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- Profile/index.function.ts
- Calendar/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- AddChoiceLinks/index.tsx
- Community 78
- axios
- types.ts (6)
- logo_mark.ts
- YourSubscriptions/index.tsx
- Canonical Doc Owners
- WidgetBridge ObjC
- receipt-file.ts
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `RowView()` - 178 edges
3. `COLORS` - 171 edges
4. `SIZES` - 170 edges
5. `CustomText()` - 155 edges
6. `react` - 92 edges
7. `Final release audit 17 Nov 2026` - 92 edges
8. `fonts` - 90 edges
9. `requestHandler()` - 87 edges
10. `CustomButton()` - 82 edges

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

## Communities (101 total, 22 thin omitted)

### Community 0 - "react"
Cohesion: 0.09
Nodes (20): react, chevron_down_icon, option_check_icon, MAX_FONT_SCALE, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT (+12 more)

### Community 1 - "adapters.ts"
Cohesion: 0.06
Nodes (70): categories, CYCLES, dayLabel(), EVENT_TYPES, failingRow(), FORM_TO_BACKEND, jobStatus(), logo_urls (+62 more)

### Community 2 - "Container"
Cohesion: 0.10
Nodes (44): AppUpdate(), Container(), DisabledAccountDialog(), Header(), busyMessage(), LoaderModal(), MenuGroup(), StateView() (+36 more)

### Community 3 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.07
Nodes (32): apiServices, focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat() (+24 more)

### Community 5 - "requestHandler"
Cohesion: 0.07
Nodes (26): fromScanCandidate(), isAuthExpired(), toScanStatus(), answerScanNotify(), editOnboardingCandidate(), getOnboardingScan(), openBackgroundResults(), retryOnboardingScan() (+18 more)

### Community 6 - "CustomButton/index.tsx"
Cohesion: 0.09
Nodes (17): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, Props, PLACEHOLDERS, styles (+9 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.16
Nodes (12): fromReminderSettings(), knownEventType(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getReminderSettings(), saveReminderSettings() (+4 more)

### Community 8 - "useAppSelector"
Cohesion: 0.06
Nodes (51): @react-navigation/native, @react-navigation/native-stack, getCalendarMonth(), getImportedSubscriptions(), changeProductUpdates(), openReceiptFile(), getSupportMessages(), markSupportRead() (+43 more)

### Community 9 - "CustomText/index.tsx"
Cohesion: 0.09
Nodes (40): chevron_right_icon, close_icon, nav_prev_icon, benefit_check_icon, OPTIONS, Props, styles, Props (+32 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.06
Nodes (49): Props, styles, replace(), searchPlatforms(), detailSlice, initial_state, Key, SubscriptionFormRoute (+41 more)

### Community 11 - "service.ts"
Cohesion: 0.13
Nodes (23): goBack(), NavigateArgs, popTo(), resetRoot(), RootParamList, TAB_NAMES, resetPassword(), authError() (+15 more)

### Community 12 - "session-token.ts"
Cohesion: 0.15
Nodes (14): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, app_storage, clearSessionToken() (+6 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.04
Nodes (45): dependencies, @invertase/react-native-apple-authentication@^2.5.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2 (+37 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.09
Nodes (40): categoryId(), categoryName(), fromCycle(), fromReminder(), hasCategories(), inboxSource(), toDetail(), toPlatformSuggestion() (+32 more)

### Community 16 - "VoiceRecorder.tsx"
Cohesion: 0.09
Nodes (25): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+17 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Welcome/index.tsx"
Cohesion: 0.10
Nodes (22): apple_icon, arrow_icon, calendar_icon, check_icon, edit_icon, filter_icon, find_grey_icon, find_icon (+14 more)

### Community 20 - "requestHandler"
Cohesion: 0.08
Nodes (49): toProfile(), navigate(), beginSession(), changePassword(), deleteDisabledAccount(), forgotPassword(), formWide(), login() (+41 more)

### Community 21 - "Onboarding/index.tsx"
Cohesion: 0.10
Nodes (23): Props, CONNECT_LABELS, Props, TRUST_ROWS, styles, DiscoveringArt(), DiscoveringBody(), DiscoveringFooter() (+15 more)

### Community 22 - "ReadyToGo/index.tsx"
Cohesion: 0.16
Nodes (11): react-native-svg, check_dark_icon, Props, styles, ListController, styles, CONFETTI_COLORS, PIECES (+3 more)

### Community 23 - "GmailViews.tsx"
Cohesion: 0.10
Nodes (33): PlatformLogo(), SpendRow(), SpendRows(), CandidateRow(), Caption(), GmailRecoveryArt(), InboxLine(), MatchRow() (+25 more)

### Community 24 - "icons/index.ts"
Cohesion: 0.11
Nodes (22): arrow_right_icon, external_icon, more_icon, plus_glyph_icon, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, delete_tile_icon (+14 more)

### Community 25 - "ScanRecovery/index.tsx"
Cohesion: 0.18
Nodes (16): hint_icon, retry_icon, accessCopy(), COPY, Kind, Props, RecoveryArt(), RecoveryBody() (+8 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (66): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, Options, SESSION_ENDED, authSlice, initial_state, requests, calendarSlice (+58 more)

### Community 27 - "list.ts"
Cohesion: 0.22
Nodes (13): byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS, ListGroup, listGroup() (+5 more)

### Community 28 - "AuthStack.tsx"
Cohesion: 0.20
Nodes (14): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), stack_options, AuthStack(), Stack, ForgotPasswordScreen() (+6 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.05
Nodes (78): AiUsageDto, AlertsDto, ChallengeDto, GoogleConnectDto, MatchResultDto, OutlookConnectDto, OutlookLoginDto, PaymentsDto (+70 more)

### Community 30 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 31 - "YourSubscriptions/index.tsx"
Cohesion: 0.14
Nodes (45): AddChoiceLinks(), AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField() (+37 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.14
Nodes (28): getPayments(), NOTES, styles, EMPTY_COPY, EmptyKind, EMPTY, PaymentsController, PaymentsRoute (+20 more)

### Community 33 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 34 - "gmail-action.ts"
Cohesion: 0.07
Nodes (53): failedGmailScan(), fromGmailSelection(), toInbox(), Props, registerPush(), savePushToken(), getDashboard(), connectGmailInbox() (+45 more)

### Community 35 - "receipts-action.ts"
Cohesion: 0.36
Nodes (7): receiptDate(), toReceipt(), getAllReceipts(), getReceipts(), openFile(), ReceiptItem, viewReceiptPdf()

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "ConnectedInbox/index.function.ts"
Cohesion: 0.21
Nodes (11): disconnectInbox(), flag(), getInbox(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute, STATUS, useConnectedInbox() (+3 more)

### Community 38 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 39 - "App.tsx"
Cohesion: 0.18
Nodes (9): App(), displayName, name, redux-persist@^6.0.0, redux-persist, mmkv, redux_storage, persistor (+1 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.13
Nodes (5): Props, PROVIDERS, styles, syncDate(), styles

### Community 42 - "Auth.test.tsx"
Cohesion: 0.15
Nodes (6): react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, mockBackend, Tree

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "phone.ts"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 45 - "platform_logos.ts"
Cohesion: 0.17
Nodes (11): bundledLogoKey(), duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo (+3 more)

### Community 46 - "reminders.ts"
Cohesion: 0.35
Nodes (9): ReminderPreference, daysText(), defaultTooClose(), effectiveDays(), LAST_THREE_DAYS, nextReminderValues(), preferenceFromValues(), REMINDER_PRESETS (+1 more)

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.18
Nodes (9): sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN (+1 more)

### Community 48 - "alerts-slice.ts"
Cohesion: 0.40
Nodes (4): alertsSlice, initial_state, Key, AlertsState

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.18
Nodes (22): DetailController, detailView(), DetailView, relative(), Route, Sheet, STATUS_FILL, SubscriptionDetail (+14 more)

### Community 51 - "RowView"
Cohesion: 0.06
Nodes (95): AddOptions(), AddSheet(), ChooseInboxSheet(), ConfirmDialog(), CustomText(), DialogCard(), AnimatedPath, Icons() (+87 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.15
Nodes (15): react-native-device-info@^15.0.2, react-native-device-info, toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor() (+7 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "ReminderSettings/index.tsx"
Cohesion: 0.13
Nodes (8): react-native-safe-area-context, Props, styles, styles, styles, DEVICE, styles, useKeyboardScroll()

### Community 60 - "http-provider.ts"
Cohesion: 0.06
Nodes (31): ApiError, client, newKey(), pending_keys, postLong(), put(), request(), upload() (+23 more)

### Community 61 - "theme.ts"
Cohesion: 0.06
Nodes (44): react-native, styles, styles, Props, styles, Props, styles, styles (+36 more)

### Community 63 - "history.ts"
Cohesion: 0.29
Nodes (7): HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate(), base, records

### Community 64 - "ReminderSettings/index.function.ts"
Cohesion: 0.18
Nodes (18): getApplyCount(), useNotificationPermission(), Draft, ReminderSettingsController, SCOPES, useReminderSettings(), SentAlert, ACCOUNT_REMINDER_ITEMS (+10 more)

### Community 65 - "SubscriptionDetail/index.tsx"
Cohesion: 0.25
Nodes (4): Props, styles, Props, styles

### Community 66 - "push.ts"
Cohesion: 0.24
Nodes (10): react-native-permissions@^5.6.3, react-native-permissions, ADMIN_SCREENS, forgetPushToken(), listenToPush(), messaging, openReminder(), pushToken() (+2 more)

### Community 67 - "HomeEvent"
Cohesion: 0.33
Nodes (6): HomeEvent, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 68 - "product-updates.test.ts"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 69 - "widget.ts"
Cohesion: 0.24
Nodes (6): spokenMoney(), clearWidgetSnapshot(), listenForWidgetUrls(), openWidgetUrl(), widgetAmount(), widgetCopy()

### Community 70 - "ChatParts.tsx"
Cohesion: 0.16
Nodes (6): Props, WAVE, Props, ROWS, AiChatController, styles

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "Profile/index.function.ts"
Cohesion: 0.21
Nodes (11): openLegal(), PRIVACY_URL, TERMS_URL, selectUser(), Fields, passwordErrors(), signInProvider(), useChangePassword() (+3 more)

### Community 76 - "Calendar/index.tsx"
Cohesion: 0.13
Nodes (11): Props, Props, styles, Props, styles, behavior, Props, styles (+3 more)

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

### Community 87 - "YourSubscriptions/index.tsx"
Cohesion: 0.12
Nodes (31): CurrencyTabs(), MonthGrid(), CalendarScreen(), SummaryWash(), ListTools(), ReadyArt(), ReadyToGoBody(), CYCLES (+23 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 96 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 600 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `navigate`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.0855614973262032 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `theme.ts` to `react`, `Container`, `AiChat/index.function.ts`, `requestHandler`, `CustomButton/index.tsx`, `useAppSelector`, `CustomText/index.tsx`, `SubscriptionFields/index.tsx`, `service.ts`, `Container (2)`, `VoiceRecorder.tsx`, `navigate`, `Welcome/index.tsx`, `requestHandler`, `Onboarding/index.tsx`, `ReadyToGo/index.tsx`, `GmailViews.tsx`, `ScanRecovery/index.tsx`, `api_services/request-handler.ts`, `Tabs.tsx`, `YourSubscriptions/index.tsx`, `Payments/index.tsx`, `gmail-action.ts`, `App.tsx`, `Profile/index.tsx`, `Auth.test.tsx`, `ContactUs/index.function.ts`, `SubscriptionDetail/index.function.ts`, `app-update-hook.test.tsx`, `ReminderSettings/index.tsx`, `http-provider.ts`, `ReminderSettings/index.function.ts`, `SubscriptionDetail/index.tsx`, `push.ts`, `widget.ts`, `ChatParts.tsx`, `Profile/index.function.ts`, `Calendar/index.tsx`, `AddChoiceLinks/index.tsx`, `YourSubscriptions/index.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05664568678267309 - nodes in this community are weakly interconnected._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.10460992907801418 - nodes in this community are weakly interconnected._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._