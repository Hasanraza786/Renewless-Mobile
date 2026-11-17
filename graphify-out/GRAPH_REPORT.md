# Graph Report - Renewless-mobile  (2026-11-17)

## Corpus Check
- 462 files · ~142,371 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 54 file(s) not represented in the graph (top: .ttf 15, .xml 13, (none) 5)

## Summary
- 2121 nodes · 8190 edges · 97 communities (75 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 150 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- SIZES
- detail-action.ts
- API DTOs & Request Handler
- ListDialogs.tsx
- SizedBox
- RenewlessWidgetProvider.kt
- service.ts
- adapters.ts
- navigate
- RowView
- Profile/index.function.ts
- SIZES (2)
- detail-action.ts (2)
- CustomText/index.tsx
- onboarding-action.ts
- iOS Widget Models
- Dev Dependencies
- alerts-action.ts
- Runtime Dependencies
- RowView (2)
- YourSubscriptions/index.tsx
- Icons/index.tsx
- endSession.ts
- CustomText/index.tsx (2)
- store.ts
- CustomButton
- AiChat/index.function.ts
- Payments Utils
- onboarding_icons.ts
- SizedBox (2)
- ReminderSettings/index.tsx
- Icons/index.tsx (2)
- store.ts (2)
- icons/index.ts
- Calendar Month Grid
- Project Working Rules
- QA Plan & Contracts
- Redux Types & Slices
- adapters.ts (2)
- CustomButton (2)
- requestHandler
- ContactUs/index.function.ts
- Release Blockers & Gaps
- Profile/index.tsx
- Home/index.tsx
- Android MainActivity
- @reduxjs/toolkit
- receipts-action.ts
- Runtime Dependencies (2)
- iOS AppDelegate
- iOS Widget Bridge
- Docs: QA and audits
- Persisted Storage
- Docs: QA and audits (2)
- ai-consent.test.ts
- platform_logos.ts
- outlook-login.test.ts
- Metro Config
- outlook-connect.test.ts
- Project Working Rules (2)
- iOS SceneDelegate
- payments-action.ts
- Countries & Phone
- iOS Native Imports
- React Native Delegate
- Auth.test.tsx
- Runtime Dependencies (3)
- TS Config
- alerts-slice.ts
- @reduxjs/toolkit (2)
- Community 70
- Release Blockers & Gaps (2)
- http-provider.ts
- status_colors.ts
- constant-slice.ts
- dashboard-slice.ts
- ContactUs/index.function.ts (2)
- auth-action.ts
- Canonical Doc Owners
- onboarding_icons.ts (2)
- widget_icons.ts
- Release Blockers & Gaps (3)
- Runtime Dependencies (4)
- Runtime Dependencies (5)
- Runtime Dependencies (6)
- logo_mark.ts

## God Nodes (most connected - your core abstractions)
1. `react-native` - 193 edges
2. `RowView()` - 172 edges
3. `COLORS` - 164 edges
4. `SIZES` - 163 edges
5. `CustomText()` - 143 edges
6. `react` - 87 edges
7. `CustomButton()` - 85 edges
8. `FONTS` - 85 edges
9. `requestHandler()` - 82 edges
10. `useAppSelector` - 73 edges

## Surprising Connections (you probably didn't know these)
- `run()` --calls--> `requestHandler()`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/redux/request-handler.ts
- `M29 Connect inbox names Google Gemini` --references--> `Screen design freeze and scoped unlock`  [INFERRED]
  qa/runs/2026-11-16-release-audit.md → AGENTS.md
- `App()` --calls--> `MainNavigator()`  [EXTRACTED]
  App.tsx → src/navigation/MainNavigator.tsx
- `App()` --calls--> `loadSessionToken()`  [EXTRACTED]
  App.tsx → src/utils/session-token.ts
- `busy()` --calls--> `ApiError`  [EXTRACTED]
  __tests__/google-connect-retry.test.ts → src/api_services/http-provider.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **Gemini paid tier and no-training disclosure** — qa_qa_plan_gemini_paid_tier, qa_runs_2026_11_16_release_audit_m29_gemini_disclosure, qa_runs_2026_11_17_final_release_audit_f31_gemini_tier_claim [EXTRACTED 1.00]
- **Baseline fixes found partial or regressed** — qa_runs_2026_11_17_final_release_audit_regressions_of_baseline, qa_runs_2026_11_17_final_release_audit_f6_cap_concurrency_regression, qa_runs_2026_11_17_final_release_audit_f9_monthly_offsets_partial, qa_runs_2026_11_17_final_release_audit_f10_refund_imported_services, qa_runs_2026_11_17_final_release_audit_f11_global_upload_cap [EXTRACTED 1.00]
- **Store privacy disclosures must match binary and policy** — qa_runs_2026_11_17_final_release_audit_f2_privacy_policy_firebase, qa_runs_2026_11_17_final_release_audit_f28_app_privacy_sdk_data, qa_runs_2026_11_17_final_release_audit_f29_m30_row_outdated, qa_runs_2026_11_16_release_audit_m31_privacy_manifest_collected_types, qa_runs_2026_11_16_release_audit_m30_ad_id_permissions [INFERRED 0.85]

## Communities (97 total, 22 thin omitted)

### Community 0 - "SIZES"
Cohesion: 0.05
Nodes (41): react-native, styles, styles, styles, Props, styles, styles, Props (+33 more)

### Community 1 - "detail-action.ts"
Cohesion: 0.06
Nodes (53): Props, styles, replace(), searchPlatforms(), SubscriptionFormRoute, useSubscriptionForm(), BRAND_MOTION, useSplash() (+45 more)

### Community 2 - "API DTOs & Request Handler"
Cohesion: 0.06
Nodes (67): del(), get(), newKey(), patch(), post(), postLong(), request(), applyReminderDefault() (+59 more)

### Community 3 - "ListDialogs.tsx"
Cohesion: 0.06
Nodes (54): detailSlice, initial_state, Key, ListRoute, useList(), DetailController, detailView(), DetailView (+46 more)

### Community 4 - "SizedBox"
Cohesion: 0.07
Nodes (57): OnboardingTitle(), SizedBox(), Caption(), GmailRecoveryArt(), InboxLine(), Props, RecoveryFooter(), RecoveryView() (+49 more)

### Community 5 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 6 - "service.ts"
Cohesion: 0.08
Nodes (45): @react-navigation/native, @react-navigation/native-stack, toCalendarMonth(), UndoToast(), MainNavigator(), NavigateArgs, navigationRef, RootParamList (+37 more)

### Community 7 - "adapters.ts"
Cohesion: 0.06
Nodes (59): categories, categoryId(), dayLabel(), FORM_TO_BACKEND, fromCycle(), fromReminder(), fromScanCandidate(), logo_urls (+51 more)

### Community 8 - "navigate"
Cohesion: 0.10
Nodes (55): toInbox(), toProfile(), navigate(), popTo(), beginSession(), changePassword(), forgotPassword(), formWide() (+47 more)

### Community 9 - "RowView"
Cohesion: 0.07
Nodes (62): AppUpdate(), ConfirmDialog(), DialogCard(), AnimatedPath, Icons(), ImagePreview(), InfoTooltip(), MenuGroup() (+54 more)

### Community 10 - "Profile/index.function.ts"
Cohesion: 0.06
Nodes (39): fromGmailSelection(), connectGmailInbox(), connectInbox(), day(), getGmailScan(), INBOX_LIMIT_NOTICE, MAX_INBOXES, saveGmailResults() (+31 more)

### Community 11 - "SIZES (2)"
Cohesion: 0.15
Nodes (29): Container(), Props, Header(), Props, AnimatedPath, Face(), Mascot(), Props (+21 more)

### Community 12 - "detail-action.ts (2)"
Cohesion: 0.09
Nodes (30): hasCategories(), apiServices, getDashboard(), getHomeData(), cancelSubscription(), createFromForm(), createSubscription(), current() (+22 more)

### Community 13 - "CustomText/index.tsx"
Cohesion: 0.10
Nodes (27): benefit_check_icon, Props, Props, styles, Props, Props, styles, Props (+19 more)

### Community 14 - "onboarding-action.ts"
Cohesion: 0.06
Nodes (24): PRIVACY_URL, TERMS_URL, editOnboardingCandidate(), getOnboardingScan(), retryOnboardingScan(), saveOnboardingFinds(), ONBOARDING_STEPS, PANEL_MOTION (+16 more)

### Community 15 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 16 - "Dev Dependencies"
Cohesion: 0.07
Nodes (40): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+32 more)

### Community 17 - "alerts-action.ts"
Cohesion: 0.11
Nodes (29): react-native-permissions, fromReminderSettings(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount(), getReminderSettings() (+21 more)

### Community 18 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (39): dependencies, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-blob-util@^1.1.1, @react-native-community/datetimepicker@^9.2.2, react-native-confirmation-code-field@^9.0.0, @react-native-documents/viewer@^4.0.2 (+31 more)

### Community 19 - "RowView (2)"
Cohesion: 0.12
Nodes (39): CustomText(), PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), FieldError(), Cell(), DraftCard() (+31 more)

### Community 20 - "YourSubscriptions/index.tsx"
Cohesion: 0.17
Nodes (35): AppSheet(), CustomButton(), DateField(), toDate(), toIso(), Dropdown(), PhoneInputField(), SubscriptionFields() (+27 more)

### Community 21 - "Icons/index.tsx"
Cohesion: 0.08
Nodes (20): react, OPTIONS, Props, styles, Props, styles, Props, styles (+12 more)

### Community 22 - "endSession.ts"
Cohesion: 0.09
Nodes (20): ApiError, client, pending_keys, resetRoot(), endSession(), Options, SESSION_ENDED, RootState (+12 more)

### Community 23 - "CustomText/index.tsx (2)"
Cohesion: 0.13
Nodes (20): Props, Props, Props, Props, Row, styles, SIZES, BENEFITS (+12 more)

### Community 24 - "store.ts"
Cohesion: 0.10
Nodes (22): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, @notifee/react-native, @react-native-firebase/messaging, bundledLogoKey(), registerPush(), HomeRoute, useHome() (+14 more)

### Community 25 - "CustomButton"
Cohesion: 0.12
Nodes (26): AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), InputField(), busyMessage(), LoaderModal(), stack_options (+18 more)

### Community 26 - "AiChat/index.function.ts"
Cohesion: 0.11
Nodes (27): openLegal(), focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat() (+19 more)

### Community 27 - "Payments Utils"
Cohesion: 0.13
Nodes (26): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack, getPayments() (+18 more)

### Community 28 - "onboarding_icons.ts"
Cohesion: 0.12
Nodes (25): apple_icon, arrow_icon, calendar_icon, check_dark_icon, check_icon, chevron_down_icon, close_icon, edit_icon (+17 more)

### Community 29 - "SizedBox (2)"
Cohesion: 0.09
Nodes (20): react-native-svg, Props, Props, STAGES, RADAR_SIZE, styles, CONFETTI_COLORS, PIECES (+12 more)

### Community 30 - "ReminderSettings/index.tsx"
Cohesion: 0.09
Nodes (18): react-native-safe-area-context, Props, Props, styles, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT (+10 more)

### Community 31 - "Icons/index.tsx (2)"
Cohesion: 0.10
Nodes (15): chevron_right_icon, mail_icon, MenuItem, Props, styles, Props, styles, Props (+7 more)

### Community 32 - "store.ts (2)"
Cohesion: 0.09
Nodes (11): App(), displayName, name, react-redux@^9.3.0, react-redux, AppDispatch, constant_reducer, persisted_reducer (+3 more)

### Community 33 - "icons/index.ts"
Cohesion: 0.09
Nodes (25): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+17 more)

### Community 34 - "Calendar Month Grid"
Cohesion: 0.12
Nodes (17): react-native-calendars@^1.1314.0, react-native-calendars, getSyncLockedInbox(), Props, styles, THEME, HomeEvent, dayMarker() (+9 more)

### Community 35 - "Project Working Rules"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 36 - "QA Plan & Contracts"
Cohesion: 0.10
Nodes (21): AI chat consent (App Store 5.1.2(i)), Apple store and compliance readiness, Cross-cutting checks (layout, a11y, network, security), Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Golden dataset of seeded receipts, Google OAuth verification and CASA (+13 more)

### Community 37 - "Redux Types & Slices"
Cohesion: 0.11
Nodes (19): initial_state, onboardingSlice, AuthResponse, Cycle, GoogleConnection, HomePlatformSpend, HomeSpending, HomeTrial (+11 more)

### Community 38 - "adapters.ts (2)"
Cohesion: 0.16
Nodes (19): categoryName(), isAuthExpired(), logoKey(), platformOf(), toAiReply(), toAlert(), toChatDraft(), toCycle() (+11 more)

### Community 39 - "CustomButton (2)"
Cohesion: 0.15
Nodes (9): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, PLACEHOLDERS, styles, Props (+1 more)

### Community 40 - "requestHandler"
Cohesion: 0.21
Nodes (10): disconnectInbox(), flag(), getInbox(), getInboxData(), reconnectInbox(), ConnectedInboxController, ConnectedInboxRoute, STATUS (+2 more)

### Community 41 - "ContactUs/index.function.ts"
Cohesion: 0.18
Nodes (9): sendSupportMessage(), TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportTopic, SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN (+1 more)

### Community 42 - "Release Blockers & Gaps"
Cohesion: 0.13
Nodes (16): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M16 Outlook sender verification, M19 any 401 ends session, M25 timezone sent only at login (+8 more)

### Community 43 - "Profile/index.tsx"
Cohesion: 0.12
Nodes (14): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, payments_icon, privacy_icon (+6 more)

### Community 44 - "Home/index.tsx"
Cohesion: 0.20
Nodes (14): AddChoiceLinks(), AddOptions(), AddSheet(), ChooseInboxSheet(), Props, InboxProviders(), Block(), HomeSkeleton() (+6 more)

### Community 46 - "@reduxjs/toolkit"
Cohesion: 0.15
Nodes (11): @reduxjs/toolkit, calendarSlice, initial_state, initial_state, listSlice, initial_state, paymentsSlice, CalendarMonth (+3 more)

### Community 47 - "receipts-action.ts"
Cohesion: 0.25
Nodes (12): getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute, useReceipts(), ReceiptFile (+4 more)

### Community 48 - "Runtime Dependencies (2)"
Cohesion: 0.24
Nodes (9): react-native-device-info@^15.0.2, react-native-device-info, toAppConfig(), useAppUpdate(), getAppConfig(), AppConfig, AppUpdate, appUpdateFor() (+1 more)

### Community 50 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 51 - "Docs: QA and audits"
Cohesion: 0.23
Nodes (13): M18 admin token and headers, M4 stale scan after restart, F12 no monitoring, alerts or confirmed backups, F13 no deploy rollback, F1 backend main not deployed, F2 privacy policy missing Firebase Analytics/Crashlytics, F3 force update lockout, F4 store link accepts any https host (+5 more)

### Community 52 - "Persisted Storage"
Cohesion: 0.17
Nodes (9): react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, redux-persist@^6.0.0, react-native-keychain, react-native-mmkv, redux-persist, mmkv, redux_storage (+1 more)

### Community 53 - "Docs: QA and audits (2)"
Cohesion: 0.18
Nodes (11): M14 500-subscription cap bypass, M1 upload read into memory before checks, M2 long reminder offsets never sent, M30 AD_ID / Advertising ID declaration, M32 public debug key trusted in production, F11 no process-wide upload cap, F27 M32 debug key still trusted, F29 M30 Advertising ID row outdated (+3 more)

### Community 54 - "ai-consent.test.ts"
Cohesion: 0.18
Nodes (8): put(), getMe(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 55 - "platform_logos.ts"
Cohesion: 0.20
Nodes (9): duolingo_logo, figma_logo, gmail_logo, icloud_logo, netflix_logo, notion_logo, outlook_logo, spotify_logo (+1 more)

### Community 56 - "outlook-login.test.ts"
Cohesion: 0.18
Nodes (9): actions, connector, grant, mockDeleteMe, mockOutlookLogin, mockOutlookSignIn, mockTrack, state (+1 more)

### Community 57 - "Metro Config"
Cohesion: 0.20
Nodes (7): config, defaults, { getDefaultConfig, mergeConfig }, react-native-config@^1.7.2, @react-native/metro-config@0.87.1, react-native-config, API_BASE_URL

### Community 58 - "outlook-connect.test.ts"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 59 - "Project Working Rules (2)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, M11 refunds never reverse payments, F10 M11 partly fixed (refunds for imported services), F26 refunded payments shown as Confirmed (+1 more)

### Community 61 - "payments-action.ts"
Cohesion: 0.25
Nodes (5): inboxSource(), toPayment(), toPriceChanges(), PaymentDto, getAllPayments()

### Community 62 - "Countries & Phone"
Cohesion: 0.33
Nodes (6): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, joinPhone(), splitPhone()

### Community 63 - "iOS Native Imports"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 65 - "Auth.test.tsx"
Cohesion: 0.29
Nodes (5): authSlice, initial_state, requests, AuthRequest, AuthState

### Community 66 - "Runtime Dependencies (3)"
Cohesion: 0.20
Nodes (6): @invertase/react-native-apple-authentication@^2.5.1, @react-native-google-signin/google-signin@^17.0.0, engines, node, @invertase/react-native-apple-authentication, @react-native-google-signin/google-signin

### Community 67 - "TS Config"
Cohesion: 0.33
Nodes (5): @react-native/typescript-config@0.87.1, @react-native/typescript-config, exclude, extends, include

### Community 68 - "alerts-slice.ts"
Cohesion: 0.33
Nodes (5): alertsSlice, initial_state, Key, AlertsState, ReminderSettings

### Community 69 - "@reduxjs/toolkit (2)"
Cohesion: 0.33
Nodes (5): inboxSlice, initial_state, Key, InboxDetail, InboxState

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (3): actions, alert, mockApi

### Community 71 - "Release Blockers & Gaps (2)"
Cohesion: 0.50
Nodes (5): Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap, M29 Connect inbox names Google Gemini, F31 Gemini paid tier claim

### Community 72 - "http-provider.ts"
Cohesion: 0.40
Nodes (3): upload(), uploadFile(), mockRequest

### Community 74 - "constant-slice.ts"
Cohesion: 0.40
Nodes (4): constantSlice, initial_state, ConstantState, Profile

### Community 75 - "dashboard-slice.ts"
Cohesion: 0.40
Nodes (4): dashboardSlice, initial_state, DashboardState, HomeSnapshot

### Community 76 - "ContactUs/index.function.ts (2)"
Cohesion: 0.40
Nodes (4): initial_state, supportSlice, SupportMessage, SupportState

### Community 77 - "auth-action.ts"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 79 - "Canonical Doc Owners"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

### Community 80 - "onboarding_icons.ts (2)"
Cohesion: 0.50
Nodes (3): LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH

## Knowledge Gaps
- **46 isolated node(s):** `Firebase Hosting site renewless-11ddb`, `React Native getting started (Metro, iOS pods, Android)`, `Raleway Reserved Font Name`, `React_RCTAppDelegate`, `ReactAppDependencyProvider` (+41 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 512 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `SIZES` to `detail-action.ts`, `API DTOs & Request Handler`, `ListDialogs.tsx`, `SizedBox`, `service.ts`, `navigate`, `Profile/index.function.ts`, `SIZES (2)`, `CustomText/index.tsx`, `onboarding-action.ts`, `Dev Dependencies`, `alerts-action.ts`, `Runtime Dependencies`, `YourSubscriptions/index.tsx`, `Icons/index.tsx`, `CustomText/index.tsx (2)`, `store.ts`, `CustomButton`, `AiChat/index.function.ts`, `Payments Utils`, `SizedBox (2)`, `ReminderSettings/index.tsx`, `Icons/index.tsx (2)`, `store.ts (2)`, `icons/index.ts`, `Calendar Month Grid`, `CustomButton (2)`, `ContactUs/index.function.ts`, `Home/index.tsx`, `Runtime Dependencies (2)`, `outlook-login.test.ts`, `Community 70`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **What connects `Firebase Hosting site renewless-11ddb`, `React Native getting started (Metro, iOS pods, Android)`, `Raleway Reserved Font Name` to the rest of the system?**
  _46 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SIZES` be split into smaller, more focused modules?**
  _Cohesion score 0.045942571785268414 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `Dev Dependencies`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `detail-action.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.059676044330775786 - nodes in this community are weakly interconnected._
- **Should `ListDialogs.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06293706293706294 - nodes in this community are weakly interconnected._