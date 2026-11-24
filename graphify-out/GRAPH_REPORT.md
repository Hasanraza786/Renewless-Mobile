# Graph Report - Renewless-mobile  (2026-11-24)

## Corpus Check
- 384 files · ~148,793 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2330 nodes · 8552 edges · 92 communities (75 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 150 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `00303dba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- RenewlessWidgetProvider.kt
- requestHandler
- Home/index.tsx
- Onboarding/index.function.ts
- auth-action.ts
- Receipts/index.function.ts
- ReminderSettings/index.function.ts
- CustomButton
- RowView/index.tsx
- API DTOs & Request Handler
- MainNavigator.tsx
- Auth.test.tsx
- iOS Widget Models
- Container (2)
- Profile/index.tsx
- ScanRecovery/index.tsx
- navigate
- Dev Dependencies
- Tabs.tsx
- AddOptions/index.tsx
- YourSubscriptions/index.tsx
- iOS Native Imports
- store.ts
- outlook-connect.test.ts
- money
- types.ts
- http-provider.ts
- GmailViews.tsx
- api_services/request-handler.ts
- service.ts (2)
- CustomButton
- Payments/index.tsx
- gmail-action.ts
- outlook-login.test.ts
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
- MessageRow/index.tsx
- ContactUs/index.function.ts
- status_colors.ts
- Icons/index.tsx (2)
- SubscriptionDetail/index.function.ts
- HomeScreen
- Calendar/index.function.ts
- app-update-hook.test.tsx
- Payments Utils (2)
- Runtime Dependencies (2)
- react-native
- ListDialogs.tsx (3)
- dto.ts
- receipt-file.ts
- theme.ts
- ai-consent.test.ts
- fonts
- SubscriptionDetail/index.tsx
- product-updates.test.ts
- platform_logos.ts
- sync-locked-inbox.test.ts
- types.ts (5)
- Metro Config
- status_colors.ts
- EditProfile/index.function.ts
- Calendar/index.tsx
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- push.ts
- Community 78
- types.ts (6)
- RowView
- Canonical Doc Owners
- WidgetBridge ObjC
- Runtime Dependencies (4)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 196 edges
2. `COLORS` - 168 edges
3. `SIZES` - 166 edges
4. `CustomText()` - 146 edges
5. `RowView()` - 145 edges
6. `Final release audit 17 Nov 2026` - 92 edges
7. `react` - 89 edges
8. `fonts` - 87 edges
9. `CustomButton()` - 83 edges
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

## Communities (92 total, 17 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (27): react, react-native-safe-area-context, benefit_check_icon, Props, styles, MAX_FONT_SCALE, Props, styles (+19 more)

### Community 1 - "RenewlessWidgetProvider.kt"
Cohesion: 0.06
Nodes (61): categories, categoryId(), categoryName(), CYCLES, dayLabel(), EVENT_TYPES, FORM_TO_BACKEND, fromCycle() (+53 more)

### Community 2 - "requestHandler"
Cohesion: 0.11
Nodes (55): AppUpdate(), Container(), CustomText(), Header(), LinkText(), busyMessage(), LoaderModal(), AnimatedPath (+47 more)

### Community 3 - "Home/index.tsx"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 4 - "Onboarding/index.function.ts"
Cohesion: 0.10
Nodes (17): openLegal(), PRIVACY_URL, TERMS_URL, resetRoot(), editOnboardingCandidate(), finishOnboarding(), getOnboardingScan(), retryOnboardingScan() (+9 more)

### Community 5 - "auth-action.ts"
Cohesion: 0.08
Nodes (55): toProfile(), goBack(), popTo(), beginSession(), changePassword(), deleteDisabledAccount(), forgotPassword(), formWide() (+47 more)

### Community 6 - "Receipts/index.function.ts"
Cohesion: 0.13
Nodes (15): toAppConfig(), apiServices, getAppConfig(), getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), AppThunk (+7 more)

### Community 7 - "ReminderSettings/index.function.ts"
Cohesion: 0.07
Nodes (46): fromReminderSettings(), knownEventType(), toAlert(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount() (+38 more)

### Community 8 - "CustomButton"
Cohesion: 0.21
Nodes (26): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), PhoneInputField(), FieldError(), SubscriptionFields() (+18 more)

### Community 9 - "RowView/index.tsx"
Cohesion: 0.11
Nodes (15): styles, Props, styles, Props, styles, styles, Frame, Props (+7 more)

### Community 10 - "API DTOs & Request Handler"
Cohesion: 0.06
Nodes (55): Props, styles, replace(), searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), ReadyToGoBody(), BRAND_MOTION (+47 more)

### Community 11 - "MainNavigator.tsx"
Cohesion: 0.08
Nodes (4): stack_options, AppStack, theme, navigationRef

### Community 12 - "Auth.test.tsx"
Cohesion: 0.09
Nodes (18): @invertase/react-native-apple-authentication@^2.5.1, react-native-app-auth@9.0.0, react-native-config@^1.7.2, @react-native-google-signin/google-signin@^17.0.0, @invertase/react-native-apple-authentication, react-native-app-auth, react-native-config, @react-native-google-signin/google-signin (+10 more)

### Community 13 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 14 - "Container (2)"
Cohesion: 0.05
Nodes (37): dependencies, axios@^1.21.1, react@19.2.3, react-native@0.87.1, react-native-calendars@^1.1314.0, @react-native-community/datetimepicker@^9.2.2, react-native-confirmation-code-field@^9.0.0, react-native-device-info@^15.0.2 (+29 more)

### Community 15 - "Profile/index.tsx"
Cohesion: 0.06
Nodes (48): hasCategories(), addAiDraft(), consentBody(), sendAiMessage(), sendTurn(), syncAiConsent(), getDashboard(), getHomeData() (+40 more)

### Community 16 - "ScanRecovery/index.tsx"
Cohesion: 0.21
Nodes (14): accessCopy(), COPY, Kind, Props, RecoveryArt(), RecoveryBody(), RecoveryFooter(), ScanInterruptedArt() (+6 more)

### Community 17 - "navigate"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.09
Nodes (45): 16 Nov release audit (baseline), Checklist: disabled account dialog device check, Final release audit 17 Nov 2026, F34: Unproven pre-account takeover via Outlook email [Open], F36: Disabled self-deletion writes no audit row [Open], F37: Onboarding connect path lacks disabled-account delete [Fixed], F38: Signup accepts control/bidi chars in email [Open], F39: Error codes missing from API contract [Open] (+37 more)

### Community 19 - "Tabs.tsx"
Cohesion: 0.20
Nodes (9): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs() (+1 more)

### Community 20 - "AddOptions/index.tsx"
Cohesion: 0.10
Nodes (14): mail_icon, OPTIONS, Props, styles, Props, PROVIDERS, styles, MenuItem (+6 more)

### Community 21 - "YourSubscriptions/index.tsx"
Cohesion: 0.07
Nodes (31): react-native-svg, Props, styles, Props, Props, Props, CONNECT_LABELS, Props (+23 more)

### Community 22 - "iOS Native Imports"
Cohesion: 0.13
Nodes (15): registerPush(), savePushToken(), getSyncLockedInbox(), HomeRoute, useHome(), analytics, AnalyticsEvent, spokenMoney() (+7 more)

### Community 23 - "store.ts"
Cohesion: 0.08
Nodes (29): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+21 more)

### Community 24 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 25 - "money"
Cohesion: 0.22
Nodes (14): Cell(), DraftCard(), MonthGrid(), CalendarScreen(), SummaryWash(), PaymentChart(), Field(), PaymentDialog() (+6 more)

### Community 26 - "types.ts"
Cohesion: 0.03
Nodes (73): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, ApiError, endSession(), Options, SESSION_ENDED, authSlice, initial_state (+65 more)

### Community 27 - "http-provider.ts"
Cohesion: 0.10
Nodes (21): client, del(), newKey(), pending_keys, postLong(), put(), request(), upload() (+13 more)

### Community 28 - "GmailViews.tsx"
Cohesion: 0.14
Nodes (26): CurrencyTabs(), OnboardingTitle(), GmailSheets(), CandidateRow(), Caption(), GmailRecoveryArt(), InboxLine(), Props (+18 more)

### Community 29 - "api_services/request-handler.ts"
Cohesion: 0.07
Nodes (59): get(), patch(), post(), applyReminderDefault(), cancelSubscription(), changePassword(), completeOnboarding(), createFromDraft() (+51 more)

### Community 30 - "service.ts (2)"
Cohesion: 0.08
Nodes (33): arrow_right_icon, external_icon, more_icon, plus_glyph_icon, brand_mark_paths, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH (+25 more)

### Community 31 - "CustomButton"
Cohesion: 0.12
Nodes (37): AddChoiceLinks(), AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), ConfirmDialog(), CustomButton(), DisabledAccountDialog() (+29 more)

### Community 32 - "Payments/index.tsx"
Cohesion: 0.21
Nodes (20): getPayments(), EMPTY, PaymentsController, PaymentsRoute, usePayments(), MoneyTotal, PaymentRecord, alignedMonth() (+12 more)

### Community 33 - "gmail-action.ts"
Cohesion: 0.07
Nodes (41): @react-navigation/native-stack, fromGmailSelection(), toInbox(), Props, connectGmailInbox(), connectInbox(), connectOutlookInbox(), day() (+33 more)

### Community 34 - "outlook-login.test.ts"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 35 - "service.ts"
Cohesion: 0.06
Nodes (58): @react-navigation/native, UndoToast(), styles, focusedTab(), navigate(), NavigateArgs, RootParamList, TAB_NAMES (+50 more)

### Community 36 - "Release Blockers & Gaps"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "App.tsx"
Cohesion: 0.13
Nodes (11): App(), displayName, name, react-redux@^9.3.0, react-test-renderer@19.2.3, react-redux, react-test-renderer, MainNavigator() (+3 more)

### Community 38 - "phone.ts"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 39 - "AuthLayout/index.tsx"
Cohesion: 0.22
Nodes (5): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles

### Community 40 - "types.ts (4)"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 41 - "Settings/index.tsx"
Cohesion: 0.06
Nodes (20): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+12 more)

### Community 42 - "session-token.ts"
Cohesion: 0.14
Nodes (14): @react-native-firebase/crashlytics@26.4.0, react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, redux-persist@^6.0.0, @react-native-firebase/crashlytics, react-native-keychain, react-native-mmkv, redux-persist (+6 more)

### Community 43 - "Community 68"
Cohesion: 0.11
Nodes (19): Checklist: AI chat 14 MB PDF slow connection, Checklist: Android permissions push/receipts, Checklist: comma decimals and Arabic digits, Checklist: demo account Gmail connector, Checklist: largest accessibility text size, Checklist: Play closed-test rule (not applicable), Checklist: Profile footer version, Checklist: tablet and Galaxy Fold (+11 more)

### Community 44 - "History/index.tsx"
Cohesion: 0.16
Nodes (6): check_dark_icon, Props, styles, styles, ListController, styles

### Community 45 - "ChatParts.tsx"
Cohesion: 0.17
Nodes (9): pause_icon, pdf_icon, play_icon, clock(), Props, WAVE, AiChatController, ChatMessage (+1 more)

### Community 46 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 47 - "ContactUs/index.function.ts"
Cohesion: 0.18
Nodes (9): sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN (+1 more)

### Community 49 - "Icons/index.tsx (2)"
Cohesion: 0.18
Nodes (15): Checklist: Data safety, App Privacy, export compliance, F1: Backend main 15 commits undeployed; delete-account 404 live [Closed], F2: Live privacy policy missing Firebase Analytics/Crashlytics [Closed], F28: App Privacy misses SDK-collected data [Closed], F29: M30 row says Advertising ID Yes but AD_ID removed [Closed], F30: Privacy policy omits support data and Microsoft sign-in [Open], F31: Gemini paid tier vs no-training claim [Closed], F64: ITSAppUsesNonExemptEncryption missing [Closed] (+7 more)

### Community 50 - "SubscriptionDetail/index.function.ts"
Cohesion: 0.08
Nodes (39): ListRoute, useList(), HomeEvent, SubscriptionRecord, dayMarker(), monthTitle(), nearestEvent(), shiftMonth() (+31 more)

### Community 51 - "HomeScreen"
Cohesion: 0.20
Nodes (13): AddOptions(), AddSheet(), Props, ChooseInboxSheet(), InboxProviders(), InfoTooltip(), Chart(), Forecast() (+5 more)

### Community 52 - "Calendar/index.function.ts"
Cohesion: 0.15
Nodes (20): Architecture and scaling risks: single e2-small VM, F11: No process-wide upload in-flight cap (memory) [Open], F12: No backend error tracking, uptime, budget alerts, backups [Open], F13: Deploy has no rollback on failed health [Open], F14: Home opens duplicate renewal scans (Gemini cost) [Open], F15: No global Gemini cap, short 429 backoff, no heartbeat [Open], F16: Sender domain from first @ allows forged authenticated mail [Open], F17: Outlook sign-in silently reconnects disconnected inbox [Open] (+12 more)

### Community 53 - "app-update-hook.test.tsx"
Cohesion: 0.18
Nodes (10): useAppUpdate(), AppUpdate, appUpdateFor(), compareVersions(), mockDispatch, mockGetAppConfig, openURL, renderHook() (+2 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 58 - "ListDialogs.tsx (3)"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 59 - "dto.ts"
Cohesion: 0.06
Nodes (30): AiUsageDto, AlertDto, AlertsDto, AppConfigDto, CategoryDto, ChallengeDto, ChatDraftDto, ChatTurnDto (+22 more)

### Community 60 - "receipt-file.ts"
Cohesion: 0.29
Nodes (6): react-native-blob-util@^1.1.1, @react-native-documents/viewer@^4.0.2, react-native-blob-util, @react-native-documents/viewer, cached, clearReceiptFiles()

### Community 61 - "theme.ts"
Cohesion: 0.06
Nodes (42): react-native, close_icon, Props, styles, Props, styles, Props, styles (+34 more)

### Community 62 - "ai-consent.test.ts"
Cohesion: 0.29
Nodes (4): getMe(), saveAiConsent(), mockGetMe, mockSaveAiConsent

### Community 63 - "fonts"
Cohesion: 0.09
Nodes (28): chevron_right_icon, Props, Props, styles, Props, Props, Props, styles (+20 more)

### Community 65 - "SubscriptionDetail/index.tsx"
Cohesion: 0.18
Nodes (4): BENEFITS, Props, ORBIT_SIZE, styles

### Community 66 - "product-updates.test.ts"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 68 - "platform_logos.ts"
Cohesion: 0.20
Nodes (9): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, spotify_logo (+1 more)

### Community 69 - "sync-locked-inbox.test.ts"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 72 - "types.ts (5)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 74 - "status_colors.ts"
Cohesion: 0.25
Nodes (9): Checklist: Payments refunds display, F10: M11 partly fixed: refunds for scan-imported services not applied [Open], F26: Payments ignore refunded field [Fixed], F27: Debug key trusted by production OAuth client (M32) [Not doing], F35: M5 partly fixed: forgot-code lockout renewable by one IP [Open], F42: Undo false SUBSCRIPTION_LIMIT, no retry/idempotency [Open], F6: REGRESSION of M14: 500 cap race under concurrency [Open], F9: M2 partly fixed: monthly 30-day reminders lost [Open] (+1 more)

### Community 75 - "EditProfile/index.function.ts"
Cohesion: 0.15
Nodes (11): selectUser(), Fields, passwordErrors(), useChangePassword(), GENDER_OPTIONS, GENDER_VALUE, GenderOption, genderOption() (+3 more)

### Community 76 - "Calendar/index.tsx"
Cohesion: 0.13
Nodes (10): Props, styles, THEME, Props, styles, LEGEND, styles, Props (+2 more)

### Community 77 - "AddOptions/index.tsx"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 79 - "push.ts"
Cohesion: 0.18
Nodes (13): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, react-native-permissions@^5.6.3, @notifee/react-native, @react-native-firebase/messaging, react-native-permissions, store, ADMIN_SCREENS (+5 more)

### Community 81 - "Community 78"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 83 - "types.ts (6)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 87 - "RowView"
Cohesion: 0.09
Nodes (45): DialogCard(), AnimatedPath, Icons(), ImagePreview(), PriceChange(), RowView(), FileBubble(), LoopAuthor() (+37 more)

### Community 92 - "Canonical Doc Owners"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 95 - "WidgetBridge ObjC"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **61 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 610 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `theme.ts` to `react`, `Onboarding/index.function.ts`, `auth-action.ts`, `Receipts/index.function.ts`, `ReminderSettings/index.function.ts`, `CustomButton`, `RowView/index.tsx`, `API DTOs & Request Handler`, `Auth.test.tsx`, `Container (2)`, `Profile/index.tsx`, `ScanRecovery/index.tsx`, `navigate`, `Tabs.tsx`, `AddOptions/index.tsx`, `YourSubscriptions/index.tsx`, `iOS Native Imports`, `store.ts`, `GmailViews.tsx`, `api_services/request-handler.ts`, `CustomButton`, `gmail-action.ts`, `outlook-login.test.ts`, `service.ts`, `App.tsx`, `AuthLayout/index.tsx`, `Settings/index.tsx`, `History/index.tsx`, `ChatParts.tsx`, `MessageRow/index.tsx`, `ContactUs/index.function.ts`, `app-update-hook.test.tsx`, `fonts`, `SubscriptionDetail/index.tsx`, `Calendar/index.tsx`, `push.ts`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06938775510204082 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Home/index.tsx` to `navigate`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Should `RenewlessWidgetProvider.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.061507936507936505 - nodes in this community are weakly interconnected._
- **Should `requestHandler` be split into smaller, more focused modules?**
  _Cohesion score 0.10707070707070707 - nodes in this community are weakly interconnected._
- **Should `Home/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._