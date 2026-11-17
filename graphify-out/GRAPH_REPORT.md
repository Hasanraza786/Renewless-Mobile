# Graph Report - Renewless-mobile  (2026-11-17)

## Corpus Check
- 464 files · ~143,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .ttf 15, .xml 14, (none) 5)

## Summary
- 2249 nodes · 8169 edges · 102 communities (80 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 153 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- theme.ts
- Container
- API DTOs & Request Handler
- adapters.ts
- RenewlessWidgetProvider.kt
- Home/index.tsx
- requestHandler
- CustomText/index.tsx
- service.ts
- CustomButton
- Profile/index.tsx
- requestHandler (2)
- navigate
- ListDialogs.tsx
- iOS Widget Models
- Container (2)
- ScanRecovery/index.tsx
- icons/index.ts
- Dev Dependencies
- detail-action.ts (2)
- profile-action.ts
- Community 21
- detail-action.ts (2) (2)
- Payments Utils
- AiChat/index.function.ts
- YourSubscriptions/index.tsx
- SubscriptionFields/index.tsx
- Runtime Dependencies
- store.ts (2)
- store.ts
- Countries & Phone
- types.ts
- onboarding_icons.ts
- money
- GmailViews.tsx
- ContactUs/index.function.ts
- Project Working Rules
- types.ts (2)
- RowView
- Release Blockers & Gaps
- Splash.test.tsx
- types.ts (3)
- ListDialogs.tsx (2)
- types.ts (4)
- YourSubscriptions/index.tsx (2)
- Android MainActivity
- store.ts (2)
- service.ts (2)
- QA Plan & Contracts
- Profile/index.tsx (2)
- Icons/index.tsx
- iOS AppDelegate
- iOS Widget Bridge
- Community 53
- SubscriptionFields/index.tsx (2)
- Payments Utils (2)
- Runtime Dependencies (2)
- Community 57
- react-native
- ListDialogs.tsx (3)
- Icons/index.tsx (2)
- Release Blockers & Gaps (2)
- requestHandler (3)
- Project Working Rules (2)
- iOS SceneDelegate
- Calendar/index.function.ts
- iOS Native Imports
- React Native Delegate
- Community 68
- types.ts (5)
- Metro Config
- Persisted Storage
- QA Plan & Contracts (2)
- Final release audit 17 November 2026
- AddOptions/index.tsx
- SubscriptionDetail/index.tsx
- Auth.test.tsx
- Runtime Dependencies (2)
- Community 78
- types.ts (6)
- status_colors.ts
- auth-action.ts
- TS Config
- store.ts (2) (2)
- Canonical Doc Owners
- Release Blockers & Gaps (3)
- Runtime Dependencies (3)
- Runtime Dependencies (4)
- Runtime Dependencies (5)
- Runtime Dependencies (6)
- Runtime Dependencies (7)

## God Nodes (most connected - your core abstractions)
1. `react-native` - 192 edges
2. `COLORS` - 165 edges
3. `SIZES` - 164 edges
4. `RowView()` - 152 edges
5. `CustomText()` - 143 edges
6. `Final release audit 17 Nov 2026` - 93 edges
7. `react` - 87 edges
8. `fonts` - 86 edges
9. `CustomButton()` - 81 edges
10. `useAppSelector` - 70 edges

## Surprising Connections (you probably didn't know these)
- `F78: Disabled-account delete shipped while design Pending` --references--> `DisabledAccountDialog()`  [EXTRACTED]
  qa/runs/2026-11-17-final-release-audit.md → src/components/DisabledAccountDialog/index.tsx
- `run()` --calls--> `requestHandler()`  [EXTRACTED]
  __tests__/request-handler.test.ts → src/redux/request-handler.ts
- `typeInto()` --calls--> `InputField()`  [EXTRACTED]
  __tests__/input-field.test.tsx → src/components/InputField/index.tsx
- `connect()` --calls--> `connectOutlookInbox()`  [EXTRACTED]
  __tests__/outlook-connect.test.ts → src/redux/actions/gmail-action.ts
- `lockedInbox()` --calls--> `getSyncLockedInbox()`  [EXTRACTED]
  __tests__/sync-locked-inbox.test.ts → src/redux/actions/gmail-action.ts

## Import Cycles
- 4-file cycle: `src/redux/actions/support-action.ts -> src/redux/request-handler.ts -> src/redux/endSession.ts -> src/utils/push.ts -> src/redux/actions/support-action.ts`

## Hyperedges (group relationships)
- **Release gates in order** — qa_runs_2026_11_17_final_release_audit_gate1_push_backend, qa_runs_2026_11_17_final_release_audit_gate2_deploy_hosting, qa_runs_2026_11_17_final_release_audit_gate3_store_privacy_forms, qa_runs_2026_11_17_final_release_audit_gate4_app_config_null, qa_runs_2026_11_17_final_release_audit_gate5_bump_build_numbers, qa_runs_2026_11_17_final_release_audit_gate6_manual_checklist [EXTRACTED 1.00]
- **Disabled-account self-deletion findings** — qa_runs_2026_11_17_final_release_audit_f1, qa_runs_2026_11_17_final_release_audit_f5, qa_runs_2026_11_17_final_release_audit_f33, qa_runs_2026_11_17_final_release_audit_f36, qa_runs_2026_11_17_final_release_audit_f37, qa_runs_2026_11_17_final_release_audit_f55, qa_runs_2026_11_17_final_release_audit_f73, qa_runs_2026_11_17_final_release_audit_f78 [INFERRED 0.85]
- **Store privacy disclosure consistency** — qa_runs_2026_11_17_final_release_audit_f2, qa_runs_2026_11_17_final_release_audit_f28, qa_runs_2026_11_17_final_release_audit_f29, qa_runs_2026_11_17_final_release_audit_f30, qa_runs_2026_11_17_final_release_audit_f31, qa_runs_2026_11_17_final_release_audit_f47 [INFERRED 0.85]

## Communities (102 total, 22 thin omitted)

### Community 0 - "theme.ts"
Cohesion: 0.04
Nodes (67): react-native, chevron_right_icon, styles, styles, styles, styles, styles, styles (+59 more)

### Community 1 - "Container"
Cohesion: 0.09
Nodes (66): Container(), Props, CustomText(), Header(), Props, Icons(), InfoTooltip(), AnimatedPath (+58 more)

### Community 2 - "API DTOs & Request Handler"
Cohesion: 0.05
Nodes (77): AiUsageDto, AlertsDto, ChallengeDto, GoogleConnectDto, PaymentsDto, PaymentsSummaryDto, ScanImportDto, SessionDto (+69 more)

### Community 3 - "adapters.ts"
Cohesion: 0.06
Nodes (64): categories, categoryName(), dayLabel(), FORM_TO_BACKEND, inboxSource(), isAuthExpired(), logo_urls, logoKey() (+56 more)

### Community 4 - "RenewlessWidgetProvider.kt"
Cohesion: 0.05
Nodes (12): MainApplication, RenewlessWidgetModule, RenewlessWidgetPackage, RenewlessWidgetProvider, scripts, android, ios, lint (+4 more)

### Community 5 - "Home/index.tsx"
Cohesion: 0.09
Nodes (48): AddChoiceLinks(), Props, AddOptions(), AddSheet(), Props, InboxProviders(), PlatformLogo(), Props (+40 more)

### Community 6 - "requestHandler"
Cohesion: 0.07
Nodes (41): fromGmailSelection(), toInbox(), ChooseInboxSheet(), Props, addAiDraft(), getDashboard(), connectGmailInbox(), connectInbox() (+33 more)

### Community 7 - "CustomText/index.tsx"
Cohesion: 0.09
Nodes (34): react-native-safe-area-context, close_icon, Props, AppUpdate(), ConfirmDialog(), Props, MAX_FONT_SCALE, Props (+26 more)

### Community 8 - "service.ts"
Cohesion: 0.10
Nodes (38): react, @react-navigation/native, UndoToast(), styles, AuthStack(), getCalendarMonth(), disconnectInbox(), getSubscriptions() (+30 more)

### Community 9 - "CustomButton"
Cohesion: 0.13
Nodes (35): AuthDivider(), AuthFooterLink(), AuthLayout(), OUTLOOK_SOCIAL_ICON, Props, SocialButtons(), CustomButton(), Props (+27 more)

### Community 10 - "Profile/index.tsx"
Cohesion: 0.06
Nodes (32): brand_mark_paths, LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH, duolingo_logo, figma_logo, gmail_logo, icloud_logo (+24 more)

### Community 11 - "requestHandler (2)"
Cohesion: 0.07
Nodes (34): fromCycle(), fromScanCandidate(), toProfile(), OutlookConnectDto, OutlookLoginDto, openLegal(), PRIVACY_URL, TERMS_URL (+26 more)

### Community 12 - "navigate"
Cohesion: 0.10
Nodes (39): @react-navigation/native-stack, popTo(), resetRoot(), forgotPassword(), formWide(), login(), offerDisabledDelete(), outlookLogin() (+31 more)

### Community 13 - "ListDialogs.tsx"
Cohesion: 0.09
Nodes (32): react-native-permissions, fromReminderSettings(), toAlert(), toReminderSettings(), flag(), getAlerts(), getAllAlerts(), getApplyCount() (+24 more)

### Community 14 - "iOS Widget Models"
Cohesion: 0.09
Nodes (20): Brand, .body, Color, dayString(), EventCopy, parseDay(), Provider, QuietView (+12 more)

### Community 15 - "Container (2)"
Cohesion: 0.05
Nodes (12): DisabledAccountDialog(), stack_options, AppStack, MainNavigator(), theme, closeDisabledAccount(), deleteDisabledAccount(), AppUpdate (+4 more)

### Community 16 - "ScanRecovery/index.tsx"
Cohesion: 0.08
Nodes (33): hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon, CONFETTI_COLORS, PIECES, Props, ReadyArt() (+25 more)

### Community 17 - "icons/index.ts"
Cohesion: 0.07
Nodes (30): bin_danger_icon, bin_icon, chevron_up_icon, clock_accent_icon, close_small_icon, device_bell_icon, gear_accent_icon, image_icon (+22 more)

### Community 18 - "Dev Dependencies"
Cohesion: 0.07
Nodes (40): devDependencies, @babel/core@^7.25.2, @babel/preset-env@^7.25.3, @babel/runtime@^7.25.0, eslint@^8.19.0, jest@^29.6.3, patch-package@^8.0.1, prettier@2.8.8 (+32 more)

### Community 19 - "detail-action.ts (2)"
Cohesion: 0.10
Nodes (34): categoryId(), fromReminder(), toSubscriptionBody(), cancelSubscription(), createFromForm(), current(), deleteSubscription(), findPlatforms() (+26 more)

### Community 20 - "profile-action.ts"
Cohesion: 0.07
Nodes (31): ApiError, client, newKey(), pending_keys, postLong(), request(), upload(), sendChatMessage() (+23 more)

### Community 21 - "Community 21"
Cohesion: 0.05
Nodes (39): Final release audit 17 Nov 2026, 16 Nov release audit (baseline), F17: Outlook sign-in silently reconnects disconnected inbox, F20: Scan reads sent and drafts mail, F32: app_config audit entry incomplete and racy, F34: Outlook pre-account takeover via email link, F36: Disabled self-deletion writes no audit row, F38: Signup accepts control/bidi chars in email (+31 more)

### Community 22 - "detail-action.ts (2) (2)"
Cohesion: 0.08
Nodes (15): hasCategories(), setCategories(), toAppConfig(), apiServices, getAppConfig(), getHomeData(), getAllSubscriptions(), getCategoryList() (+7 more)

### Community 23 - "Payments Utils"
Cohesion: 0.13
Nodes (30): Field(), NOTES, PaymentDialog(), styles, Empty(), EMPTY_COPY, EmptyKind, EMPTY (+22 more)

### Community 24 - "AiChat/index.function.ts"
Cohesion: 0.10
Nodes (28): getMe(), focusedTab(), changeAiConsent(), consentBody(), sendAiMessage(), sendTurn(), startAiChat(), syncAiConsent() (+20 more)

### Community 25 - "YourSubscriptions/index.tsx"
Cohesion: 0.16
Nodes (32): calendar_icon, clock_icon, AppSheet(), DateField(), Props, toDate(), toIso(), styles (+24 more)

### Community 26 - "SubscriptionFields/index.tsx"
Cohesion: 0.13
Nodes (31): FieldError(), Props, SubscriptionFields(), styles, createSubscription(), updateSubscription(), SubscriptionFormRoute, useSubscriptionForm() (+23 more)

### Community 27 - "Runtime Dependencies"
Cohesion: 0.06
Nodes (35): dependencies, axios@^1.21.1, react@19.2.3, react-native@0.87.1, react-native-blob-util@^1.1.1, @react-native-community/datetimepicker@^9.2.2, react-native-config@^1.7.2, @react-native-documents/picker@12.0.3 (+27 more)

### Community 28 - "store.ts (2)"
Cohesion: 0.08
Nodes (15): App(), displayName, name, react-redux@^9.3.0, redux-persist@^6.0.0, react-redux, redux-persist, mmkv (+7 more)

### Community 29 - "store.ts"
Cohesion: 0.13
Nodes (22): bundledLogoKey(), navigate(), logoutUser(), registerPush(), savePushToken(), MAX_INBOXES, changeProductUpdates(), deleteAccount() (+14 more)

### Community 30 - "Countries & Phone"
Cohesion: 0.11
Nodes (18): COUNTRIES, Country, countryFlag(), PREFERRED_FOR_DIAL, changePassword(), selectUser(), Fields, passwordErrors() (+10 more)

### Community 31 - "types.ts"
Cohesion: 0.09
Nodes (24): dashboardSlice, initial_state, initial_state, onboardingSlice, AuthResponse, Cycle, DashboardState, GmailScanStatus (+16 more)

### Community 32 - "onboarding_icons.ts"
Cohesion: 0.10
Nodes (22): apple_icon, arrow_icon, chevron_down_icon, filter_icon, find_grey_icon, find_icon, gmail_icon, google_icon (+14 more)

### Community 33 - "money"
Cohesion: 0.16
Nodes (20): check_dark_icon, CYCLES, Props, YourSubscriptionsBody(), RING, RING_WIDTH, styles, ScanCandidate (+12 more)

### Community 34 - "GmailViews.tsx"
Cohesion: 0.20
Nodes (21): edit_icon, OnboardingTitle(), Caption(), GmailRecoveryArt(), InboxLine(), Props, RecoveryFooter(), RecoveryView() (+13 more)

### Community 35 - "ContactUs/index.function.ts"
Cohesion: 0.13
Nodes (14): sendSupportMessage(), initial_state, supportSlice, TOPIC_OPTIONS, topicOf(), useContactUs(), SupportInput, SupportMessage (+6 more)

### Community 36 - "Project Working Rules"
Cohesion: 0.10
Nodes (22): AGENTS.md working rules, API integration pattern (requestHandler, onDone), Attachment and document rules, Boxed icon rule, External reference project anonymity rule, Hook return rule, Letter spacing rule, Code naming conventions (+14 more)

### Community 37 - "types.ts (2)"
Cohesion: 0.10
Nodes (17): @reduxjs/toolkit@^2.13.0, @reduxjs/toolkit, calendarSlice, initial_state, inboxSlice, initial_state, Key, initial_state (+9 more)

### Community 38 - "RowView"
Cohesion: 0.19
Nodes (19): ImagePreview(), Cell(), clock(), DraftCard(), FileBubble(), LoopAuthor(), MessageItem(), Props (+11 more)

### Community 39 - "Release Blockers & Gaps"
Cohesion: 0.11
Nodes (20): B1 Play App Signing SHA-1 not registered, B2 Android RECORD_AUDIO permission, B3 decimal-comma amounts rejected, B4 Sign in with Apple token revoke on delete, B7 Microsoft client env on VM, M11 refunds never reverse payments, M14 500-subscription cap bypass, M16 Outlook sender verification (+12 more)

### Community 40 - "Splash.test.tsx"
Cohesion: 0.15
Nodes (10): NavigateArgs, navigationRef, replace(), RootParamList, TAB_NAMES, BRAND_MOTION, useSplash(), useSplashReveal() (+2 more)

### Community 41 - "types.ts (3)"
Cohesion: 0.11
Nodes (10): constantSlice, initial_state, initial_state, profileSlice, ConstantState, Profile, ProfileOverview, ProfileState (+2 more)

### Community 42 - "ListDialogs.tsx (2)"
Cohesion: 0.23
Nodes (15): ListRoute, useList(), byName(), byNextEvent(), filterRecords(), groupCounts(), LIST_GROUPS, LIST_SORTS (+7 more)

### Community 43 - "types.ts (4)"
Cohesion: 0.11
Nodes (6): alertsSlice, initial_state, Key, AlertsState, ReminderSettings, clearWidgetSnapshot()

### Community 44 - "YourSubscriptions/index.tsx (2)"
Cohesion: 0.18
Nodes (13): PaymentChart(), Props, styles, CURRENCIES, CURRENCY_NAMES, money(), NO_DECIMALS, SIGN_PATTERN (+5 more)

### Community 46 - "store.ts (2)"
Cohesion: 0.18
Nodes (13): @notifee/react-native@^9.1.8, @react-native-firebase/messaging@26.4.0, @notifee/react-native, @react-native-firebase/messaging, endSession(), ADMIN_SCREENS, forgetPushToken(), listenToPush() (+5 more)

### Community 47 - "service.ts (2)"
Cohesion: 0.25
Nodes (12): getAllReceipts(), getReceipts(), openFile(), openReceiptFile(), ReceiptsController, ReceiptsRoute, useReceipts(), ReceiptFile (+4 more)

### Community 48 - "QA Plan & Contracts"
Cohesion: 0.15
Nodes (14): Apple store and compliance readiness, Device matrix (iOS and Android), Real-data QA entry criteria, Gmail restricted scope testing limits, Google OAuth verification and CASA, Google Play readiness, mobile-mcp device automation, PDF viewer view-only patch (+6 more)

### Community 49 - "Profile/index.tsx (2)"
Cohesion: 0.18
Nodes (5): DangerButton(), PROVIDER_LABEL, ProfileScreen(), syncDate(), styles

### Community 50 - "Icons/index.tsx"
Cohesion: 0.23
Nodes (10): DialogCard(), AnimatedPath, Props, styles, Box(), ListDialogs(), SortDialog(), StatusDialog() (+2 more)

### Community 52 - "iOS Widget Bridge"
Cohesion: 0.15
Nodes (3): Foundation, WidgetBridge, WidgetKit

### Community 53 - "Community 53"
Cohesion: 0.28
Nodes (13): F1: Backend main not deployed (15 commits ahead), F2: Live privacy policy missing Firebase Analytics/Crashlytics, F28: App Privacy answers miss SDK-collected data, F30: Privacy policy omits support messages and Microsoft sign-in, F67: Build numbers stuck at 1, F73: Delete-account page omits disabled-account path, Gate 1: push backend main and verify delete-account route, Gate 2: deploy Hosting privacy policy (+5 more)

### Community 54 - "SubscriptionFields/index.tsx (2)"
Cohesion: 0.23
Nodes (10): SubscriptionRecord, amountLabel(), eventAmount(), HISTORY_FILTERS, historyCardProps(), historyRecords(), HistoryStatus, lifecycleDate() (+2 more)

### Community 55 - "Payments Utils (2)"
Cohesion: 0.18
Nodes (10): @react-navigation/bottom-tabs@^7.20.0, @react-navigation/bottom-tabs, IS_TABLET, ICONS, RAIL_ICONS, RailStack, styles, tab_icon() (+2 more)

### Community 56 - "Runtime Dependencies (2)"
Cohesion: 0.24
Nodes (6): react-native-device-info@^15.0.2, react-native-device-info, useAppUpdate(), AppConfig, appUpdateFor(), config

### Community 57 - "Community 57"
Cohesion: 0.24
Nodes (11): Architecture and scaling risks (single e2-small VM), F11: No process-wide upload cap (memory), F12: No backend error tracking, uptime, budget alerts or confirmed backups, F13: Deploy has no rollback on failed health, F14: Home opens duplicate renewal scans, F15: No global Gemini concurrency cap / heartbeat, F18: Outlook refresh token 90-day expiry, no keep-alive, F21: Outlook first scan capped at 5,000 messages (+3 more)

### Community 58 - "react-native"
Cohesion: 0.31
Nodes (7): styles, ApplyDialog(), DEVICE, ReminderSettingsScreen(), SectionLabel(), Toggle(), useKeyboardScroll()

### Community 59 - "ListDialogs.tsx (3)"
Cohesion: 0.35
Nodes (9): ReminderPreference, daysText(), defaultTooClose(), effectiveDays(), LAST_THREE_DAYS, nextReminderValues(), preferenceFromValues(), REMINDER_PRESETS (+1 more)

### Community 60 - "Icons/index.tsx (2)"
Cohesion: 0.24
Nodes (8): react-native-svg@^15.16.0, react-native-svg, check_icon, DiscoveringFooter(), Props, STAGES, RADAR_SIZE, styles

### Community 61 - "Release Blockers & Gaps (2)"
Cohesion: 0.22
Nodes (10): F10: Refunds not applied to services imported from scan (M11 partial), F16: Sender domain check spoofable via display name, F19: Gmail tokens expire in 7 days while consent screen in Testing, F22: Arabic-Indic/Persian digits rejected in inputs, F24: TextInputs lack maxFontSizeMultiplier, F25: Foldable rail/bar decided once at launch, F26: Payments ignore refunded field, F53: Offline Undo failure shows nothing (+2 more)

### Community 62 - "requestHandler (3)"
Cohesion: 0.22
Nodes (8): actions, connect(), connector, dispatch(), grant, mockOutlookConnect, mockOutlookSignIn, mockTrack

### Community 63 - "Project Working Rules (2)"
Cohesion: 0.22
Nodes (9): Product screens lock register, Mandatory documentation synchronization, Pending reapproval status, Screen design freeze and scoped unlock, Design Studio screenDesignLocks badge map, Gemini paid tier requirement (gap #11), Known gaps and watch items, Play account-deletion web page gap (+1 more)

### Community 65 - "Calendar/index.function.ts"
Cohesion: 0.33
Nodes (6): HomeEvent, dayMarker(), monthTitle(), nearestEvent(), shiftMonth(), WEEKDAYS

### Community 66 - "iOS Native Imports"
Cohesion: 0.29
Nodes (6): FirebaseCore, React, react_native_app_auth, React_RCTAppDelegate, ReactAppDependencyProvider, UIKit

### Community 68 - "Community 68"
Cohesion: 0.29
Nodes (8): F23: Profile footer shows hardcoded Version 0.0.1, F31: Gemini paid-tier vs no-training claim unverified, F33: No tests for Apple/Microsoft disabled-account deletion, F37: Onboarding Connect path lacks disabled-account delete, F55: Disabled-account delete has no loader / retry issues, F64: ITSAppUsesNonExemptEncryption missing, F78: Disabled-account delete shipped while design Pending, Status after fixes (17 Nov 2026)

### Community 69 - "types.ts (5)"
Cohesion: 0.25
Nodes (6): authSlice, initial_state, requests, AuthRequest, AuthState, DisabledAccount

### Community 70 - "Metro Config"
Cohesion: 0.29
Nodes (5): config, defaults, { getDefaultConfig, mergeConfig }, @react-native/metro-config@0.87.1, @react-native/metro-config

### Community 71 - "Persisted Storage"
Cohesion: 0.29
Nodes (5): react-native-keychain@^11.0.0, react-native-mmkv@^4.3.2, react-native-keychain, react-native-mmkv, storage

### Community 72 - "QA Plan & Contracts (2)"
Cohesion: 0.29
Nodes (7): AI chat consent (App Store 5.1.2(i)), Cross-cutting checks (layout, a11y, network, security), Golden dataset of seeded receipts, AI chat suite, Auth and session suite, Widgets suite, Test suites (section 6)

### Community 73 - "Final release audit 17 November 2026"
Cohesion: 0.33
Nodes (7): F27: Public RN debug key trusted by production OAuth (M32), F29: M30 row says Advertising ID Yes though AD_ID removed, F35: Forgot-code lockout renewable per IP (M5 partial), F42: Undo at 500 gives false SUBSCRIPTION_LIMIT, F6: 500 subscription cap race under concurrency (M14 regression), F9: Monthly reminders with 30-day offset lose ~40% (M2 partial), Regressions of baseline fixes

### Community 74 - "AddOptions/index.tsx"
Cohesion: 0.33
Nodes (5): pencil_icon, sparkle_icon, OPTIONS, Props, styles

### Community 75 - "SubscriptionDetail/index.tsx"
Cohesion: 0.48
Nodes (6): Badge(), Body(), Field(), LinkCard(), Props, SubscriptionDetailScreen()

### Community 76 - "Auth.test.tsx"
Cohesion: 0.33
Nodes (5): dispatch(), earlier, later, lockedInbox(), mockGetConnectors

### Community 77 - "Runtime Dependencies (2)"
Cohesion: 0.20
Nodes (6): @react-native-firebase/analytics@26.4.0, react-native-gesture-handler@^3.3.0, engines, node, @react-native-firebase/analytics, react-native-gesture-handler

### Community 78 - "Community 78"
Cohesion: 0.33
Nodes (6): F3: Required-update lockout via app-config minBuild, F4: Store link accepts any https host (phishing), F40: latestVersion accepts control/bidi chars, F61: Android fallback store link uses market://, F69: AppUpdate has no tests, Gate 4: leave app-config null until build 100% live

### Community 79 - "types.ts (6)"
Cohesion: 0.33
Nodes (5): detailSlice, initial_state, Key, DetailState, SubscriptionDetail

### Community 81 - "auth-action.ts"
Cohesion: 0.40
Nodes (3): dto, mockSave, user

### Community 82 - "TS Config"
Cohesion: 0.40
Nodes (4): exclude, extends, include, @react-native/typescript-config

### Community 84 - "store.ts (2) (2)"
Cohesion: 0.50
Nodes (3): react-test-renderer@19.2.3, react-test-renderer, typeInto()

### Community 85 - "Canonical Doc Owners"
Cohesion: 0.50
Nodes (4): README - Renewless mobile index and setup, Firebase Hosting site renewless-11ddb, Final HTML prototype / Design Studio, React Native getting started (Metro, iOS pods, Android)

## Knowledge Gaps
- **95 isolated node(s):** `.stateKey`, `SwiftUI`, `Foundation`, `FirebaseCore`, `react_native_app_auth` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 606 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scripts` connect `RenewlessWidgetProvider.kt` to `Dev Dependencies`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **What connects `.stateKey`, `SwiftUI`, `Foundation` to the rest of the system?**
  _95 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `theme.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03937007874015748 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `theme.ts` to `Container`, `Home/index.tsx`, `requestHandler`, `CustomText/index.tsx`, `service.ts`, `CustomButton`, `requestHandler (2)`, `navigate`, `ListDialogs.tsx`, `ScanRecovery/index.tsx`, `icons/index.ts`, `Dev Dependencies`, `detail-action.ts (2)`, `profile-action.ts`, `detail-action.ts (2) (2)`, `Payments Utils`, `AiChat/index.function.ts`, `YourSubscriptions/index.tsx`, `SubscriptionFields/index.tsx`, `Runtime Dependencies`, `store.ts (2)`, `store.ts`, `onboarding_icons.ts`, `money`, `GmailViews.tsx`, `ContactUs/index.function.ts`, `RowView`, `Splash.test.tsx`, `types.ts (3)`, `YourSubscriptions/index.tsx (2)`, `store.ts (2)`, `Profile/index.tsx (2)`, `Icons/index.tsx`, `Payments Utils (2)`, `Runtime Dependencies (2)`, `react-native`, `Icons/index.tsx (2)`, `AddOptions/index.tsx`, `SubscriptionDetail/index.tsx`, `store.ts (2) (2)`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.09221213569039656 - nodes in this community are weakly interconnected._
- **Should `API DTOs & Request Handler` be split into smaller, more focused modules?**
  _Cohesion score 0.04928404928404929 - nodes in this community are weakly interconnected._
- **Should `adapters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06321334503950835 - nodes in this community are weakly interconnected._