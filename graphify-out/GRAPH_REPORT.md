# Graph Report - Renewless-mobile  (2026-11-17)

## Corpus Check
- 377 files · ~142,561 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2126 nodes · 8205 edges · 86 communities (69 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 150 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5b06305a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- theme.ts
- SubscriptionFields/index.tsx
- API DTOs & Request Handler
- ListDialogs.tsx
- GmailViews.tsx
- RenewlessWidgetProvider.kt
- service.ts
- adapters.ts
- navigate
- RowView
- Container
- goBack
- detail-action.ts (2)
- CustomText/index.tsx
- requestHandler
- iOS Widget Models
- Dev Dependencies
- Dropdown/index.tsx
- Runtime Dependencies
- money
- YourSubscriptions/index.tsx
- AddOptions/index.tsx
- profile-action.ts
- ScanRecovery/index.tsx
- store.ts
- CustomButton
- AiChat/index.function.ts
- Payments Utils
- onboarding_icons.ts
- Icons/index.tsx
- react-native
- MessageRow/index.tsx
- store.ts (2)
- icons/index.ts
- Calendar/index.function.ts
- Project Working Rules
- QA Plan & Contracts
- types.ts
- adapters.ts (2)
- CustomButton (2)
- SubscriptionDetail/index.tsx
- ContactUs/index.function.ts
- Release Blockers & Gaps
- Profile/index.tsx
- Home/index.tsx
- Android MainActivity
- Splash.test.tsx
- Onboarding/index.tsx
- Runtime Dependencies (2)
- iOS AppDelegate
- iOS Widget Bridge
- Final release audit 17 November 2026
- Persisted Storage
- Receipts/index.tsx
- ai-consent.test.ts
- platform_logos.ts
- Welcome/index.tsx
- Metro Config
- react-native-device-info
- Project Working Rules (2)
- iOS SceneDelegate
- payments-action.ts
- Countries & Phone
- iOS Native Imports
- React Native Delegate
- Auth.test.tsx
- react-native-config
- TS Config
- payments-action.ts
- Release Blockers & Gaps (2)
- http-provider.ts
- status_colors.ts
- auth-action.ts
- Canonical Doc Owners
- Release Blockers & Gaps (3)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 193 edges
2. `RowView()` - 172 edges
3. `COLORS` - 164 edges
4. `SIZES` - 163 edges
5. `CustomText()` - 143 edges
6. `react` - 87 edges
7. `CustomButton()` - 85 edges
8. `fonts` - 85 edges
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

## Communities (86 total, 17 thin omitted)

### Community 0 - "theme.ts"
Cohesion: 0.07
Nodes (28): styles, styles, styles, styles, styles, styles, styles, Props (+20 more)

### Community 1 - "SubscriptionFields/index.tsx"
Cohesion: 0.10
Nodes (37): Props, styles, SubscriptionFormRoute, useSubscriptionForm(), PlatformSuggestion, SubscriptionRecord, HISTORY_FILTERS, historyCardProps() (+29 more)

### Community 2 - "API DTOs & Request Handler"
Cohesion: 0.06
Nodes (67): del(), get(), newKey(), patch(), post(), postLong(), request(), applyReminderDefault() (+59 more)

### Community 3 - "ListDialogs.tsx"
Cohesion: 0.06
Nodes (62): react-native-permissions, getApplyCount(), getReminderSettings(), AlertsController, useAlerts(), useNotificationPermission(), ListRoute, useList() (+54 more)

### Community 4 - "GmailViews.tsx"
Cohesion: 0.20
Nodes (19): OnboardingTitle(), Caption(), GmailRecoveryArt(), InboxLine(), Props, RecoveryFooter(), RecoveryView(), Results() (+11 more)

### Community 5 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 6 - "service.ts"
Cohesion: 0.07
Nodes (52): @react-navigation/native, @react-navigation/native-stack, UndoToast(), navigate(), NavigateArgs, navigationRef, RootParamList, TAB_NAMES (+44 more)

### Community 7 - "adapters.ts"
Cohesion: 0.06
Nodes (57): categories, categoryId(), dayLabel(), FORM_TO_BACKEND, fromCycle(), fromReminder(), fromScanCandidate(), logo_urls (+49 more)

### Community 8 - "navigate"
Cohesion: 0.10
Nodes (46): toProfile(), popTo(), beginSession(), changePassword(), forgotPassword(), formWide(), login(), logoutUser() (+38 more)

### Community 9 - "RowView"
Cohesion: 0.12
Nodes (45): CustomText(), DialogCard(), AnimatedPath, Icons(), ImagePreview(), MenuGroup(), PhoneInputField(), RowView() (+37 more)

### Community 10 - "Container"
Cohesion: 0.11
Nodes (45): Container(), Header(), busyMessage(), LoaderModal(), AnimatedPath, Face(), Mascot(), StateView() (+37 more)

### Community 11 - "goBack"
Cohesion: 0.08
Nodes (18): Props, styles, Props, styles, IS_TABLET, goBack(), PLACEHOLDERS, styles (+10 more)

### Community 12 - "detail-action.ts (2)"
Cohesion: 0.09
Nodes (31): hasCategories(), toRecord(), getDashboard(), getHomeData(), cancelSubscription(), createFromForm(), createSubscription(), current() (+23 more)

### Community 13 - "CustomText/index.tsx"
Cohesion: 0.09
Nodes (35): Props, Props, Props, styles, Props, Frame, Props, MenuItem (+27 more)

### Community 14 - "requestHandler"
Cohesion: 0.06
Nodes (55): fromGmailSelection(), isAuthExpired(), toGmailScan(), toInbox(), toScanStatus(), resetRoot(), connectGmailInbox(), connectInbox() (+47 more)

### Community 15 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 16 - "Dev Dependencies"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+34 more)

### Community 17 - "Dropdown/index.tsx"
Cohesion: 0.15
Nodes (13): chevron_down_icon, benefit_check_icon, MAX_FONT_SCALE, Frame, Multiple, Single, OPTION_DETAIL_HEIGHT, OPTION_HEIGHT (+5 more)

### Community 18 - "Runtime Dependencies"
Cohesion: 0.04
Nodes (50): dependencies, axios@^1.21.1, @invertase/react-native-apple-authentication@^2.5.1, @notifee/react-native@^9.1.8, react@19.2.3, react-native@0.87.1, react-native-app-auth@9.0.0, react-native-calendars@^1.1314.0 (+42 more)

### Community 19 - "money"
Cohesion: 0.14
Nodes (29): PlatformLogo(), SpendRow(), SpendRows(), TrialRows(), Cell(), DraftCard(), MonthGrid(), CandidateRow() (+21 more)

### Community 20 - "YourSubscriptions/index.tsx"
Cohesion: 0.12
Nodes (42): AppSheet(), DateField(), toDate(), toIso(), Dropdown(), SubscriptionFields(), CandidateSheet(), ChangesSheet() (+34 more)

### Community 21 - "AddOptions/index.tsx"
Cohesion: 0.17
Nodes (9): chevron_right_icon, OPTIONS, Props, styles, Props, PROVIDERS, styles, Props (+1 more)

### Community 22 - "profile-action.ts"
Cohesion: 0.04
Nodes (43): ApiError, client, pending_keys, apiServices, deleteAccount(), endSession(), Options, SESSION_ENDED (+35 more)

### Community 23 - "ScanRecovery/index.tsx"
Cohesion: 0.21
Nodes (14): accessCopy(), COPY, Kind, Props, RecoveryArt(), RecoveryBody(), RecoveryFooter(), ScanInterruptedArt() (+6 more)

### Community 24 - "store.ts"
Cohesion: 0.12
Nodes (18): registerPush(), savePushToken(), HomeRoute, useHome(), analytics, AnalyticsEvent, ADMIN_SCREENS, listenToPush() (+10 more)

### Community 25 - "CustomButton"
Cohesion: 0.12
Nodes (36): AppUpdate(), AuthDivider(), AuthFooterLink(), AuthLayout(), SocialButtons(), ConfirmDialog(), CustomButton(), InputField() (+28 more)

### Community 26 - "AiChat/index.function.ts"
Cohesion: 0.08
Nodes (34): openLegal(), PRIVACY_URL, TERMS_URL, focusedTab(), addAiDraft(), changeAiConsent(), consentBody(), sendAiMessage() (+26 more)

### Community 27 - "Payments Utils"
Cohesion: 0.14
Nodes (25): ICONS, RAIL_ICONS, RailStack, styles, tab_icon(), Tabs(), TabsStack, EMPTY (+17 more)

### Community 28 - "onboarding_icons.ts"
Cohesion: 0.09
Nodes (27): brand_mark_paths, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, apple_icon, arrow_icon, calendar_icon, check_icon (+19 more)

### Community 29 - "Icons/index.tsx"
Cohesion: 0.10
Nodes (20): react-native-svg, check_dark_icon, party_popper_icon, Props, styles, Props, Props, styles (+12 more)

### Community 30 - "react-native"
Cohesion: 0.12
Nodes (14): react, react-native, react-native-safe-area-context, Props, styles, Props, styles, Props (+6 more)

### Community 31 - "MessageRow/index.tsx"
Cohesion: 0.31
Nodes (5): Props, styles, Props, styles, SUPPORT_STATUS_LABELS

### Community 32 - "store.ts (2)"
Cohesion: 0.07
Nodes (17): App(), displayName, name, react-redux@^9.3.0, redux-persist@^6.0.0, react-test-renderer@19.2.3, react-redux, react-test-renderer (+9 more)

### Community 33 - "icons/index.ts"
Cohesion: 0.08
Nodes (39): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, clock_icon, close_small_icon, device_bell_icon, gear_accent_icon (+31 more)

### Community 34 - "Calendar/index.function.ts"
Cohesion: 0.16
Nodes (12): getCalendarMonth(), CalendarController, CalendarRoute, EMPTY, PickerAnchor, useCalendar(), HomeEvent, dayMarker() (+4 more)

### Community 35 - "Project Working Rules"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 36 - "QA Plan & Contracts"
Cohesion: 0.10
Nodes (21): AI chat consent (App Store 5.1.2(i)), Apple store and compliance readiness, Cross-cutting checks (layout, a11y, network, security), Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Golden dataset of seeded receipts, Google OAuth verification and CASA (+13 more)

### Community 37 - "types.ts"
Cohesion: 0.03
Nodes (68): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, alertsSlice, initial_state, Key, authSlice, initial_state, requests (+60 more)

### Community 38 - "adapters.ts (2)"
Cohesion: 0.18
Nodes (16): categoryName(), logoKey(), platformOf(), toAiReply(), toAlert(), toCalendarMonth(), toChatDraft(), toCycle() (+8 more)

### Community 39 - "CustomButton (2)"
Cohesion: 0.11
Nodes (14): OUTLOOK_SOCIAL_ICON, Props, styles, Props, styles, Props, behavior, Props (+6 more)

### Community 40 - "SubscriptionDetail/index.tsx"
Cohesion: 0.33
Nodes (8): Badge(), Body(), Field(), DetailView, LinkCard(), Props, styles, syncLabel()

### Community 41 - "ContactUs/index.function.ts"
Cohesion: 0.10
Nodes (18): fromReminderSettings(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), saveReminderSettings(), saveSettingsAndApply(), sendSupportMessage() (+10 more)

### Community 42 - "Release Blockers & Gaps"
Cohesion: 0.14
Nodes (16): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M16 Outlook sender verification, M19 any 401 ends session, M25 timezone sent only at login (+8 more)

### Community 43 - "Profile/index.tsx"
Cohesion: 0.11
Nodes (18): delete_tile_icon, eye_icon, eye_off_icon, help_icon, history_icon, logout_icon, mail_icon, payments_icon (+10 more)

### Community 44 - "Home/index.tsx"
Cohesion: 0.11
Nodes (30): AddChoiceLinks(), AddOptions(), AddSheet(), Props, ChooseInboxSheet(), Props, InboxProviders(), InfoTooltip() (+22 more)

### Community 46 - "Splash.test.tsx"
Cohesion: 0.20
Nodes (6): replace(), BRAND_MOTION, useSplash(), useSplashReveal(), mock_dispatch, mock_replace

### Community 47 - "Onboarding/index.tsx"
Cohesion: 0.22
Nodes (7): styles, Props, styles, Panel, PANELS, Props, styles

### Community 48 - "Runtime Dependencies (2)"
Cohesion: 0.27
Nodes (8): toAppConfig(), useAppUpdate(), getAppConfig(), AppThunk, AppConfig, AppUpdate, appUpdateFor(), config

### Community 50 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 51 - "Final release audit 17 November 2026"
Cohesion: 0.12
Nodes (24): M14 500-subscription cap bypass, M18 admin token and headers, M1 upload read into memory before checks, M2 long reminder offsets never sent, M30 AD_ID / Advertising ID declaration, M31 iOS privacy manifest collected types, M32 public debug key trusted in production, F11 no process-wide upload cap (+16 more)

### Community 52 - "Persisted Storage"
Cohesion: 0.29
Nodes (5): react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, react-native-keychain, react-native-mmkv, storage

### Community 53 - "Receipts/index.tsx"
Cohesion: 0.28
Nodes (5): close_icon, Props, styles, TONE, styles

### Community 54 - "ai-consent.test.ts"
Cohesion: 0.18
Nodes (8): put(), getMe(), saveAiConsent(), saveReminderSettings(), setSubscriptionReminder(), updateDevice(), mockGetMe, mockSaveAiConsent

### Community 55 - "platform_logos.ts"
Cohesion: 0.22
Nodes (8): duolingo_logo, figma_logo, gmail_logo, icloud_logo, notion_logo, outlook_logo, spotify_logo, INBOX_BRAND

### Community 56 - "Welcome/index.tsx"
Cohesion: 0.32
Nodes (5): netflix_logo, BENEFITS, Props, ORBIT_SIZE, styles

### Community 57 - "Metro Config"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 58 - "react-native-device-info"
Cohesion: 0.19
Nodes (6): react-native-blob-util@^1.1.1, react-native-device-info@^15.0.2, @react-navigation/bottom-tabs@^7.20.0, react-native-blob-util, react-native-device-info, @react-navigation/bottom-tabs

### Community 59 - "Project Working Rules (2)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, M11 refunds never reverse payments, F10 M11 partly fixed (refunds for imported services), F26 refunded payments shown as Confirmed (+1 more)

### Community 61 - "payments-action.ts"
Cohesion: 0.18
Nodes (12): inboxSource(), receiptDate(), toDetail(), toPayment(), toPriceChanges(), toReceipt(), PaymentDto, getAllPayments() (+4 more)

### Community 62 - "Countries & Phone"
Cohesion: 0.20
Nodes (12): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, GENDER_OPTIONS, GENDER_VALUE, GenderOption, genderOption() (+4 more)

### Community 63 - "iOS Native Imports"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 65 - "Auth.test.tsx"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 66 - "react-native-config"
Cohesion: 0.50
Nodes (3): react-native-config@^1.7.2, react-native-config, API_BASE_URL

### Community 67 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 70 - "payments-action.ts"
Cohesion: 0.33
Nodes (3): actions, alert, mockApi

### Community 71 - "Release Blockers & Gaps (2)"
Cohesion: 0.50
Nodes (5): Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap, M29 Connect inbox names Google Gemini, F31 Gemini paid tier claim

### Community 72 - "http-provider.ts"
Cohesion: 0.40
Nodes (3): upload(), uploadFile(), mockRequest

### Community 77 - "auth-action.ts"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 79 - "Canonical Doc Owners"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **47 isolated node(s):** `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore`, `react_native_app_auth`, `Foundation` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 513 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `theme.ts`, `SubscriptionFields/index.tsx`, `ListDialogs.tsx`, `GmailViews.tsx`, `navigate`, `Container`, `goBack`, `CustomText/index.tsx`, `requestHandler`, `Dev Dependencies`, `Dropdown/index.tsx`, `Runtime Dependencies`, `YourSubscriptions/index.tsx`, `AddOptions/index.tsx`, `profile-action.ts`, `ScanRecovery/index.tsx`, `store.ts`, `CustomButton`, `AiChat/index.function.ts`, `Payments Utils`, `Icons/index.tsx`, `MessageRow/index.tsx`, `store.ts (2)`, `icons/index.ts`, `CustomButton (2)`, `SubscriptionDetail/index.tsx`, `ContactUs/index.function.ts`, `Profile/index.tsx`, `Home/index.tsx`, `Splash.test.tsx`, `Onboarding/index.tsx`, `Runtime Dependencies (2)`, `Receipts/index.tsx`, `Welcome/index.tsx`, `react-native-device-info`, `payments-action.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `React_RCTAppDelegate`, `ReactAppDependencyProvider`, `FirebaseCore` to the rest of the system?**
  _47 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `theme.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07155399473222125 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `Dev Dependencies`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `SubscriptionFields/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09696969696969697 - nodes in this community are weakly interconnected._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.06057945566286216 - nodes in this community are weakly interconnected._
- **Should `ListDialogs.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.061052631578947365 - nodes in this community are weakly interconnected._