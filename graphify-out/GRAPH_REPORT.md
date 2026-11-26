# Graph Report - Renewless-mobile  (2026-11-26)

## Corpus Check
- 395 files · ~163,101 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2382 nodes · 9025 edges · 95 communities (73 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 162 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `841083d9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dropdown/index.tsx
- adapters.ts
- Container
- RenewlessWidgetProvider.kt
- AiChat/index.function.ts
- requestHandler
- RenewlessWidgetModule.kt
- alerts-action.ts
- useAppSelector
- RowView/index.tsx
- SubscriptionFields/index.tsx
- Provider
- App.tsx
- iOS Widget Models
- Container (2)
- detail-action.ts
- ai-consent.test.ts
- navigate
- Dev Dependencies
- Calendar/index.tsx
- requestHandler
- Onboarding/index.tsx
- MainApplication.kt
- SizedBox
- icons/index.ts
- endSession.ts
- auth-slice.ts
- scripts
- Auth.test.tsx
- api_services/request-handler.ts
- Tabs.tsx
- YourSubscriptions/index.tsx
- Payments/index.tsx
- outlook-connect.test.ts
- requestHandler
- redux/request-handler.ts
- Release Blockers & Gaps
- social-sign-in.ts
- sync-locked-inbox.test.ts
- types.ts
- types.ts (4)
- Profile/index.tsx
- inbox-slice.ts
- Community 68
- phone.ts
- toSubscriptionBody
- ContactUs/index.function.ts
- alerts-slice.ts
- Icons/index.tsx (2)
- detail-slice.ts
- RowView
- Calendar/index.function.ts
- app-update-hook.test.tsx
- toRecord
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- CustomText/index.tsx
- http-provider.ts
- theme.ts
- status_colors.ts
- onboarding-retry.test.ts
- SubscriptionDetail/index.function.ts
- HomeSkeleton
- push.ts
- widget.ts
- ChatParts.tsx
- types.ts (5)
- Metro Config
- status_colors.ts
- profile-action.ts
- List/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots
- Community 78
- types.ts (6)
- GmailViews.tsx
- Canonical Doc Owners
- WidgetBridge ObjC
- receipt-file.ts
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 200 edges
2. `RowView()` - 180 edges
3. `COLORS` - 171 edges
4. `SIZES` - 170 edges
5. `CustomText()` - 155 edges
6. `react` - 92 edges
7. `Final release audit 17 Nov 2026` - 92 edges
8. `fonts` - 90 edges
9. `requestHandler()` - 87 edges
10. `CustomButton()` - 86 edges

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

## Communities (95 total, 22 thin omitted)

### Community 0 - "Dropdown/index.tsx"
Cohesion: 0.19
Nodes (11): chevron_down_icon, MAX_FONT_SCALE, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT (+3 more)

### Community 1 - "adapters.ts"
Cohesion: 0.05
Nodes (65): categories, CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromReminder(), inboxSource(), logo_urls (+57 more)

### Community 2 - "Container"
Cohesion: 0.14
Nodes (36): Container(), CurrencyTabs(), Header(), MenuGroup(), StateView(), SubscriptionCard(), AppStack, theme (+28 more)

### Community 4 - "AiChat/index.function.ts"
Cohesion: 0.12
Nodes (30): openLegal(), focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat() (+22 more)

### Community 5 - "requestHandler"
Cohesion: 0.05
Nodes (45): toProfile(), OutlookConnectDto, OutlookLoginDto, syncAiConsent(), beginSession(), registerPush(), savePushToken(), syncAccount() (+37 more)

### Community 7 - "alerts-action.ts"
Cohesion: 0.14
Nodes (14): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), AlertDto, flag(), getAlerts(), getAllAlerts() (+6 more)

### Community 8 - "useAppSelector"
Cohesion: 0.05
Nodes (52): @react-navigation/native, @react-navigation/native-stack, resendCode(), getCalendarMonth(), INBOX_LIMIT_NOTICE, flag(), getImportedSubscriptions(), getInbox() (+44 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.12
Nodes (21): chevron_right_icon, platform_logos, Props, styles, Props, styles, Props, Props (+13 more)

### Community 10 - "SubscriptionFields/index.tsx"
Cohesion: 0.09
Nodes (36): FieldError(), Props, styles, replace(), updateSubscription(), SubscriptionFormRoute, useSubscriptionForm(), BRAND_MOTION (+28 more)

### Community 11 - "Provider"
Cohesion: 0.17
Nodes (5): Provider, RenewlessEntry, RenewlessWidget, .body, SnapshotStore

### Community 12 - "App.tsx"
Cohesion: 0.09
Nodes (22): App(), displayName, name, @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, react-redux@^9.3.0, redux-persist@^6.0.0 (+14 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.16
Nodes (15): Brand, .body, Color, dayString(), EventCopy, parseDay(), QuietView, .body (+7 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (42): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2 (+34 more)

### Community 15 - "detail-action.ts"
Cohesion: 0.07
Nodes (33): hasCategories(), toRecord(), getDashboard(), getHomeData(), cancelSubscription(), createFromForm(), createSubscription(), current() (+25 more)

### Community 16 - "ai-consent.test.ts"
Cohesion: 0.29
Nodes (4): getMe(), saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Calendar/index.tsx"
Cohesion: 0.11
Nodes (15): info_icon, nav_next_icon, nav_prev_icon, Frame, Props, Props, styles, THEME (+7 more)

### Community 20 - "requestHandler"
Cohesion: 0.09
Nodes (43): navigate(), NavigateArgs, navigationRef, popTo(), resetRoot(), RootParamList, TAB_NAMES, closeDisabledAccount() (+35 more)

### Community 21 - "Onboarding/index.tsx"
Cohesion: 0.06
Nodes (39): react, apple_icon, google_icon, inbox_badge_icon, OUTLOOK_SOCIAL_ICON, Props, Props, DiscoveringArt() (+31 more)

### Community 23 - "SizedBox"
Cohesion: 0.15
Nodes (18): AddChoiceLinks(), SizedBox(), GmailRecoveryArt(), RecoveryFooter(), RecoveryView(), ReviewFooter(), ScanningFooter(), GmailScanScreen() (+10 more)

### Community 24 - "icons/index.ts"
Cohesion: 0.04
Nodes (80): react-native-svg@^15.16.0, react-native-svg, arrow_right_icon, external_icon, more_icon, plus_glyph_icon, LOOP_FACES, LOOP_OUTLINE (+72 more)

### Community 25 - "endSession.ts"
Cohesion: 0.12
Nodes (4): dashboardSlice, initial_state, DashboardState, clearWidgetSnapshot()

### Community 26 - "auth-slice.ts"
Cohesion: 0.09
Nodes (19): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, authSlice, initial_state, requests, calendarSlice, initial_state, constantSlice (+11 more)

### Community 27 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, android, ios, lint, postinstall, start, test, typecheck

### Community 28 - "Auth.test.tsx"
Cohesion: 0.11
Nodes (18): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), stack_options, AuthStack(), Stack, ForgotPasswordScreen() (+10 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.06
Nodes (62): get(), patch(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft() (+54 more)

### Community 30 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 31 - "YourSubscriptions/index.tsx"
Cohesion: 0.14
Nodes (41): AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), InputField(), PhoneInputField() (+33 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.14
Nodes (29): getAllPayments(), getPayments(), Field(), NOTES, PaymentDialog(), styles, EMPTY_COPY, EmptyKind (+21 more)

### Community 33 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 34 - "requestHandler"
Cohesion: 0.11
Nodes (39): failedGmailScan(), fromGmailSelection(), toInbox(), MatchResultDto, Props, connectGmailInbox(), connectInbox(), connectOutlookInbox() (+31 more)

### Community 35 - "redux/request-handler.ts"
Cohesion: 0.08
Nodes (19): toAppConfig(), apiServices, getAppConfig(), getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), AppThunk (+11 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "social-sign-in.ts"
Cohesion: 0.24
Nodes (9): apple(), GmailGrant, google(), isOutlookCancel(), LOGIN_CONFIG, OUTLOOK_CONFIG, OutlookGrant, providerSignIn() (+1 more)

### Community 38 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 39 - "types.ts"
Cohesion: 0.08
Nodes (27): initial_state, onboardingSlice, AiDraft, AuthResponse, Billing, Cycle, DatedAmount, GmailScanStatus (+19 more)

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Profile/index.tsx"
Cohesion: 0.09
Nodes (14): arrow_icon, gmail_logo, outlook_logo, Props, PROVIDERS, MenuItem, Props, styles (+6 more)

### Community 42 - "inbox-slice.ts"
Cohesion: 0.33
Nodes (5): inboxSlice, initial_state, Key, InboxDetail, InboxState

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "phone.ts"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 46 - "toSubscriptionBody"
Cohesion: 0.29
Nodes (7): categoryId(), fromCycle(), fromScanCandidate(), toSubscriptionBody(), getPlatformId(), isServerId(), updateFromForm()

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.20
Nodes (12): sendSupportMessage(), initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useContactUs(), SupportMessage, SupportState (+4 more)

### Community 48 - "alerts-slice.ts"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "detail-slice.ts"
Cohesion: 0.33
Nodes (5): detailSlice, initial_state, Key, DetailState, SubscriptionDetail

### Community 51 - "RowView"
Cohesion: 0.06
Nodes (101): AddOptions(), AddSheet(), AppUpdate(), ChooseInboxSheet(), ConfirmDialog(), CustomText(), DialogCard(), DisabledAccountDialog() (+93 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.15
Nodes (13): react-native-device-info@^15.0.2, react-native-device-info, useAppUpdate(), AppConfig, AppUpdate, appUpdateFor(), compareVersions(), mockDispatch (+5 more)

### Community 54 - "toRecord"
Cohesion: 0.15
Nodes (24): categoryName(), failingRow(), isAuthExpired(), jobStatus(), logoKey(), platformOf(), toAttention(), toCalendarMonth() (+16 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "CustomText/index.tsx"
Cohesion: 0.13
Nodes (25): react-native-safe-area-context, Props, Props, Props, Props, styles, styles, Props (+17 more)

### Community 60 - "http-provider.ts"
Cohesion: 0.06
Nodes (34): ApiError, client, del(), newKey(), pending_keys, postLong(), put(), request() (+26 more)

### Community 61 - "theme.ts"
Cohesion: 0.04
Nodes (61): react-native, brand_mark_paths, close_icon, styles, styles, styles, styles, styles (+53 more)

### Community 64 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.05
Nodes (70): getApplyCount(), useNotificationPermission(), ListRoute, useList(), Draft, ReminderSettingsController, SCOPES, useReminderSettings() (+62 more)

### Community 65 - "HomeSkeleton"
Cohesion: 1.00
Nodes (3): Block(), HomeSkeleton(), Row()

### Community 66 - "push.ts"
Cohesion: 0.15
Nodes (15): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, react-native-permissions@^5.6.3, @notifee/react-native, @react-native-firebase/messaging, react-native-permissions, store, ADMIN_SCREENS (+7 more)

### Community 69 - "widget.ts"
Cohesion: 0.13
Nodes (17): bundledLogoKey(), HomeEvent, HomeSnapshot, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS (+9 more)

### Community 70 - "ChatParts.tsx"
Cohesion: 0.14
Nodes (4): Props, WAVE, Props, styles

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "profile-action.ts"
Cohesion: 0.06
Nodes (27): PRIVACY_URL, TERMS_URL, changePassword(), MAX_INBOXES, initial_state, profileSlice, selectUser(), Fields (+19 more)

### Community 76 - "List/index.tsx"
Cohesion: 0.17
Nodes (9): calendar_icon, clock_icon, Props, Props, Props, styles, behavior, ListController (+1 more)

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

### Community 87 - "GmailViews.tsx"
Cohesion: 0.06
Nodes (63): check_dark_icon, party_popper_icon, OnboardingTitle(), PlatformLogo(), MonthGrid(), CandidateRow(), InboxLine(), MatchRow() (+55 more)

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 598 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `theme.ts` to `Dropdown/index.tsx`, `Container`, `AiChat/index.function.ts`, `requestHandler`, `useAppSelector`, `RowView/index.tsx`, `SubscriptionFields/index.tsx`, `App.tsx`, `Container (2)`, `navigate`, `Calendar/index.tsx`, `requestHandler`, `Onboarding/index.tsx`, `icons/index.ts`, `Auth.test.tsx`, `api_services/request-handler.ts`, `Tabs.tsx`, `YourSubscriptions/index.tsx`, `Payments/index.tsx`, `requestHandler`, `redux/request-handler.ts`, `Profile/index.tsx`, `app-update-hook.test.tsx`, `CustomText/index.tsx`, `http-provider.ts`, `SubscriptionDetail/index.function.ts`, `push.ts`, `widget.ts`, `ChatParts.tsx`, `profile-action.ts`, `List/index.tsx`, `GmailViews.tsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.049019607843137254 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `navigate`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.14102564102564102 - nodes in this community are weakly interconnected._
- **Why does `android` connect `scripts` to `RenewlessWidgetProvider.kt`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `AiChat/index.function.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11746031746031746 - nodes in this community are weakly interconnected._