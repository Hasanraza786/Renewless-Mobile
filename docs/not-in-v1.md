# Scope exclusions and deferred integration

Distinguishes product exclusions from locked features deferred beyond the first integration. Locked product is in [product-flow.md](product-flow.md) and [product-screens.md](product-screens.md).

The first integration is not the complete product release. Locked Paid features, Gmail, widgets and billing remain in product scope even when integrated later. See [implementation scope](implementation-scope.md) for this distinction. Product exclusions below do not override a newer explicit lock.

## Never (out of scope)

Do not put these on a later-phase board as if they were delayed. They are not the product.

- Guest use. No account, no product screens.
- Login OTP. Email login is password → session.
- Gmail connect as sign-in. Google login is Firebase. Gmail is inbox attach after a session exists.
- Cancelling Netflix, Apple, Spotify, or any other service. Renewless only records cancelled-until. Disclaimer on Detail.
- “Open Netflix / Apple to cancel” button or any deep link that pretends we cancel for them.
- Reading the iPhone Settings subscription list.
- Apple Card / FinanceKit.
- Storing Settings screenshots on our server. The file may go to Gemini for extract, then we drop it.
- Giving the AI the whole inbox. Query → rules → model, survivors only.
- Inventing a renewal date when cycle and next date are missing (**No renewal**).
- Treating today’s fake `POST /connectors` seed as real Gmail.
- Converting currencies. No exchange rates. No “show everything in PKR.”
- One combined money total across USD + EUR + PKR.
- Decorative gradients/glow, broad illustration sets and warm olive/yellow-tinted surfaces. Exceptions: native Liquid Glass on supported iPhone navigation/controls and the single limited Loop companion. See [theme.md](theme.md) and [motion-and-mascot.md](motion-and-mascot.md).
- Loop on every subscription row, a Loop that floats over the app, a Loop that moves on its own, a second mascot, or Loop used as the logo or app icon.
- Perpetual pulsing, confetti, rolling money counters, and a splash delay.

## Later (not v1)

Planned or mentioned. Do not wire into the first integration.

### Surfaces

- User website (same API, different app, later)
- Admin website (catalog, users, counts)
- Delete account

### Add

- Subcategory (v1 is category only)
- Custom cycle (v1 is weekly / monthly / yearly)
- Separate screenshot-add/OCR screen. Images belong inside Paid AI chat with Gemini vision; there is no planned separate OCR-only path.
- iCloud inbox (app-specific password, same review/sync path as Gmail)
- Extra recommendation kinds (price change, trial ending) as their own cards
- Reminder 1 / 3 / 7 on the Add form (v1 defaults from cycle; change on Detail)

### List and money

- Sort by price
- Filter by source (AI / manual / Gmail)
- Filter by currency
- Filter by price range
- Expired or Cancelled on List (those two are History only)
- Currency tabs on Payments
- Activity-log History (every add/edit/recommendation tap). History is expired + cancelled only.
- Estimated last paid on the List row (only a real `lastCharge`)

### Navigation and chrome

- Center FAB
- Fifth bottom tab for Add
- `+` on Profile, Alerts, History, Payments, or Detail
- Repeat tooltip on `+` after the first visit

### Account and devices

- More than one FCM token (v1: one token per account; a second phone overwrites)
- Biometric unlock of the existing session
- Forced “complete profile” wall after Google/Apple
- Change password / forgot password for accounts with no password
- Profile-wide “all reminders off” (v1 is per subscription on Detail)

### Mail and AI later extras

- “Which subscription is this receipt?” picker when two rows share a name (v1 skips the mail)
- Showing the voice transcript in chat (v1: voice bubble only, hidden transcript)
- Jump from AI summary to the Add form (v1: create from chat; later edits use the form)
- Perfect “every language” speech. Pipeline is audio → hidden transcript → AI. Quality varies.

### Look

- Light mode and automatic appearance switching (v1 uses the approved dark theme).
- Non-English UI (v1 UI is English; chat/voice input may be any language)

## First integration still skips (even if the product lock mentions them)

These are locked product features, deferred from the first API/app slice. They are not excluded from the complete product. Detailed implementation milestones remain to be planned; see [implementation scope](implementation-scope.md).

- Real push worker and sent-reminder persistence. Until available, Alerts stays empty; never substitute upcoming dates for sent notifications.
- Gmail OAuth and review screen (Profile can show an empty linked-inbox state)
- Shared catalog admin
- AI chat with text, voice and image; Gmail incremental sync and extra inboxes
- Home widgets (locked product screens)
- Paywall / RevenueCat, integrated last. All three prices and trials are locked in [revenuecat.md](revenuecat.md). Paid features cannot launch without entitlement enforcement.
