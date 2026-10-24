# Renewless screens (locked for integration)

Screen-by-screen product lock. Pair this with [product-flow.md](product-flow.md). Exclusions and deferred integration: [not-in-v1.md](not-in-v1.md). This is planning, not implementation.

The phone app is the integration target. User website copies the same screens later. Admin is a separate small site.

Each screen lists **on the screen**, **not on this screen**, and **later**. Do not wire later items into the first integration.

## What was wrong and is now corrected

These were in the old guest-first plan. Do not build them.

- The app does **not** open without an account. Login or signup first.
- Connecting Gmail is **not** sign-in. Google login (Firebase) is sign-in. Gmail connect is inbox attach after the user already has a session.
- Login does **not** send OTP. Only email signup and forgot-password send OTP.
- The app **never** cancels Netflix, Apple, or any other service. It only reminds and stores cancelled-until.
- A user-attached Settings screenshot goes through Paid AI chat to Gemini Flash vision. It is sent to the model and dropped after extraction; Renewless does not retain the image. There is no separate on-device OCR flow.
- If cycle is unknown, the list does **not** invent a renewal date. That row is **No renewal** (internal: `needs_date`).
- Today’s `POST /connectors` fake seed is **not** the Gmail product. Do not integrate the app against those dummy review rows as if they were real mail.
- Today’s `GET /notifications` is **not** push. Alerts lists only reminders already sent; future scheduled dates never appear there. Until sent-reminder data exists, show the honest empty state. Real delivery requires the push worker.

## Suggestions (good, not locked yet)

Say yes if you want any of these locked.

1. ~~Email signup: phone, date of birth, and gender optional.~~ **Locked.** Name, email, and password are required. The extra three can be empty.
2. ~~Do not block Home after social login.~~ **Locked.** Google or Apple goes straight to Home. No profile wall. Profile may show a small skippable banner if phone, date of birth, or gender is empty.
3. ~~Ask for notification permission after the first subscription.~~ **Locked (your rule).** Take the FCM token at login and at signup-verify / social session. On Home, if the device token differs from the stored token, update it. On logout, clear it. One token per account.
4. ~~Resend OTP with 15-minute expiry.~~ **Locked.** Signup and forgot-password codes last **5 minutes**. Resend is enabled after **2 minutes**.
5. ~~Plus menu only two items.~~ **Superseded.** Plus is Manual / AI / Voice / Connect Gmail. Images attach within Paid AI chat; there is no separate Screenshot item. iCloud remains later/out of v1.
6. ~~Push tap opens subscription detail.~~ **Locked** with Alerts.
7. **Phone first, website later.** Same API. Do not design a different web flow.
8. ~~Paywall / Pro split is not decided.~~ **Locked.** Free = manual app + one Gmail **first scan** + 25 live rows. Paid = Gmail **updates after first scan**, AI chat, voice, extra Gmail, 26th+ row. RevenueCat UI last.

## Look (v1)

- Approved 24 October 2026: cool graphite, soft mint-lime and Raleway.
- Name: Renewless. Tagline: “Stop the subscription renewals you don't need.” Raleway Medium wordmark plus rounded R mark; [51 × 51 logo assets](brand/README.md). The user prepares native app icons.
- Dark theme for v1. Solid content surfaces; native Liquid Glass navigation on supported iPhones, solid fallback elsewhere. No decorative gradients/glow or broad illustration set; the limited Loop companion is approved.
- Ground `#151719`; cards `#202326`; text `#E8EAED`; secondary text `#9DA4AB`; accent `#B9E58C`. Accent-filled buttons use graphite labels.
- Raleway Regular 400 / Medium 500; compact headings and rows, intentional old-style figures (descending 3/5/7/9).
- Upcoming / Estimated / No renewal use secondary text; In progress uses primary text; Expired / cancelled-until use `#FF8A8A`. No accent-filled cards.
- UI language: English.
- Tokens, type, and components: [theme.md](theme.md).
- Motion, floating glass tab bar, card-to-Detail transition and Loop placements: [motion-and-mascot.md](motion-and-mascot.md). These visual rules preserve the screen behavior below.

## Navigation after login (locked)

Four tabs. History and Payments are not tabs. They open from Profile.

1. **Home**
2. **List**
3. **Alerts**
4. **Profile**

**Tab bar (locked)**

- Floating dark native Liquid Glass on supported iPhones. Solid `card` (`#202326`) on older iOS and Android.
- Active icon and label `#B9E58C`. Inactive `#9DA4AB`.
- The bar sits above the bottom safe area and does not cover the last row or a form’s commit button.
- No center Add tab. No capsule painted behind the active tab beyond the native selection treatment.

**Add (locked)**

- **+** in the **top-right header** on Home and List only. Bare mint-lime `#B9E58C`, at least a 44pt hit area, no filled circle. Opens the add sheet (Manual / AI / Voice / Connect Gmail).
- Empty Home/List also show labeled buttons: **Add manually** and **Connect Gmail**, with the friendly Loop companion beside that copy. The words stay the information. Loop does not replace the buttons.
- First visit only: a one-time tooltip on the `+` — “Add a subscription.” Never again.
- No `+` on Profile, Alerts, History, Payments, or Detail.
- No center FAB. No fifth Add tab.

A saved session skips auth and lands on Home. A missing or logged-out session lands on Login.

---

## Auth screens

### Splash

- Restore the saved session token.
- Valid token → Home.
- No token or 401 → Login.

Not on this screen: onboarding carousel, guest list.

### Login

Brand lockup on Login and Sign up: the 51 × 51 rounded R mark beside the Raleway Medium wordmark **Renewless**, tagline underneath. Graphite ground. No Loop on auth.

On the screen:

- Email, password, Log in
- Forgot password
- Continue with Google
- Continue with Apple
- Link to Sign up

Behavior:

- Success → `{ token, user }` → Home. No OTP.
- Wrong email or password → one generic error. Do not say which field is wrong.
- Unverified email signup → stay in the OTP screen (API resends the signup code). Do not open Home.
- Google or Apple → Firebase, then our API. New account is created. Existing account is opened. Same `{ token, user }` → Home.

Not on this screen: phone, date of birth, gender, Gmail inbox permission.

On success, send the current FCM token with the session. Same on signup verify and on Google/Apple.

### Sign up

On the screen:

- Name, email, password (required)
- Phone, date of birth, gender (optional)
- Create account
- Continue with Google
- Continue with Apple
- Link to Log in

Behavior:

- Email create → OTP screen. No session yet.
- Google or Apple → same as login. Skip OTP. Home.

### Verify OTP

Used for email signup and for forgot password. Same screen, different copy.

On the screen:

- Email (read-only)
- 6-digit code
- Verify
- Resend (enabled after 2 minutes)
- Code expires in 5 minutes

Signup verify → `{ token, user }` → Home.

Forgot verify → reset token only → Reset password. Not Home.

### Reset password

- New password, confirm
- Save → Login (not Home)

Forgot password is hidden for accounts that have no password (Google/Apple only).

### Forgot password

- Email
- Send code → Verify OTP (reset)

---

## Home

First product screen after login.

**Top count cards (locked)**

- Active (not expired, not cancelled)
- Renewing soon (next 7 days)
- This month (one total per currency)
- Expired (tap → History)

**Recommendation (locked method)**

We cannot know if the person still uses Netflix, Cursor, or any other service. Those apps do not give us usage. A charge in Gmail only means they are still paying, not that they are using it.

One card at a time. It is the one dark recommendation card from [theme.md](theme.md): `#202326` surface, a narrow `#B9E58C` edge, Raleway amounts. **Each kind has its own sentence and its own action buttons.** Do not reuse one generic “Still using?” sentence for every recommendation. Do not give the two kinds two different palettes.

It **changes on each app open** (app comes to the foreground). Navigating Home → List → Home in the same session does not rotate.

Two kinds, take turns:

1. **Soonest** — the upcoming row with the nearest renewal\
   Card is about time. Example: “Netflix renews in 3 days.”\
   Buttons:
   - **Keep it** — skip this check-in until the next cycle
   - **I’ll cancel on the service** — keep the row and the reminder
   - **Already cancelled** — ask for access-until, reminder becomes “access ending”

2. **Most expensive upcoming** — the highest price among upcoming (next 7 days)\
   Card is about money. Example: “Cursor · $20 — biggest charge in the next 7 days.”\
   Buttons:
   - **Worth it** — skip this check-in until the next cycle
   - **Too expensive** — keep the row and the reminder
   - **Already cancelled** — same access-until flow as Detail

If both kinds pick the same row, show the next soonest or the next most expensive so the sentence actually changes when there are two or more upcoming rows. If only one upcoming row exists, that row can appear, but the **kind still rotates**, so the sentence and buttons still change (time vs money). The surface stays the same dark card.

A row already answered with **Keep it** or **Worth it** this cycle is skipped for that kind until the next renewal.

If there is no upcoming row, hide the recommendation. When the person already has live subscriptions and nothing is upcoming, a relaxed Loop may sit only in that empty area. It stays still unless tapped once.

A later kind (price change, trial ending) gets its own card and buttons. Do not bolt it onto these two.

Rotation is stored on the phone (last kind + last row). The dashboard API still returns the upcoming list; the phone picks which card to show.

**Upcoming list (locked)**

Soonest renewals. Tap a row → Detail.

**Also**

- Empty state if none: friendly Loop, plus **Add manually** and **Connect Gmail**. Loop is still at rest. Reduce Motion keeps it static. The buttons remain the way to add.
- Add action
- Compare this device’s FCM token with the account. If it changed, update it. If it matches, do nothing.

Not on this screen: full search, voice, paywall, inbox sync progress as a primary UI.

---

## List (locked)

All of the user’s subscriptions.

**Row**

- Name, price + currency, next date, status word
- **Estimated** if the next date is predicted
- **Cancelled-until** when set
- **Last paid** only when a real `lastCharge` exists (Gmail or user-set). Do not estimate last paid on the list.
- Source (manual / AI / voice / Gmail) is **not** on the row. That stays on Detail.

Tap a row → Detail. The card expands into the Detail hero; see Detail. Rows are grouped on `#202326`: name on the left, price on the right, status as text. A neutral monogram is allowed. No per-service logo. Add action as on the add sheet. Empty: the same friendly Loop as Home, plus Add manually and Connect Gmail. No fake rows.

## List filters (locked)

- **Search** — name
- **Status chips** — All (default), Upcoming (next 7 days), In progress. **Expired and Cancelled are not on List.** They live only on History.
- **No renewal** — not a fourth tab that is always visible. When 1+ rows have no next date, a chip/banner: “2 have no renewal.” Tap shows only those rows. When the count is 0, hide it. Internal status stays `needs_date`.
- **Category** — catalog categories plus any the user has used
- **Sort** — next date only. No price sort in v1 (mixed currencies)
- **Not on the list** — Expired, Cancelled, source, currency, price range. Cancelled-until rows are History only (even if access has not ended yet).

## History (locked)

Past subscriptions. Opens from Profile, not a fifth tab.

**Who is on this page**

- **Expired** — next renewal is in the past
- **Cancelled** — cancelled-until is set (access still running or already ended)

Active / upcoming / in progress stay on List, not here.

**Row**

- Name, category, price + currency
- **Ended on** (expiry date or access-until)
- Last paid only if a real `lastCharge` exists
- Paid on this one (estimate until Gmail charges exist)
- Cancelled badge when cancelled. Source stays on Detail, not on the row.

Tap → Detail.

**Filters**

- **Search** — name
- **Status** — All, Expired, Cancelled
- **Category**
- **Date** — ended-on range (from / to)

No source filter. No price sort.

## Payments (locked)

Money only. Opens from Profile, not a tab. Not History (no Expired/Cancelled lists here). No `+`.

**Currency rule (whole app)**

- Each subscription and each charge stores its own ISO currency (`USD`, `EUR`, `PKR`).
- Never convert. Never show one combined number across currencies.
- Totals are one amount per currency, as chips: `$ 240    € 36    Rs 4,500`.
- Hide a chip when that currency’s total for the block is 0.
- Use `$` / `€` when the symbol is clear. Use the code for `PKR` / `INR`.
- Add/Edit default currency: device locale, else last used. User can change it.
- Catalog does not store the user’s currency.

**Top**

- Paid so far — chips per currency
- This month — chips per currency
- Label **Estimated** until Gmail (or user) gives real charges

**Charge list**

- Date · name · amount + currency · Estimated or Confirmed
- Order: charge date, newest first
- Tap → Detail

**How a charge is computed (v1)**

- From start date + cycle + price, each occurrence from start through today
- Skip **No renewal** rows
- Cancelled-until counts only through the access-until date
- A real `lastCharge` (later Gmail or user) is **Confirmed**; estimates stay **Estimated**
- Mix is allowed in the list; totals still sum inside each currency only

**Filters**

- Search — name
- Category
- Date range — charge date from / to

**Not on this page**

- Upcoming renewals
- Source (AI / manual / Gmail)
- Price sort
- Currency tabs
- Status / Expired / Cancelled filters

---

## Add sheet (locked)

Opens from the Home/List header `+`, or from the empty-state buttons.

- Add manually → Add form (Free)
- Add by AI → chat, then Create from the summary (**Paid**)
- Add by voice → same chat, voice bubble only (**Paid**)
- Connect Gmail → first **scan** Free; later updates and another inbox **Paid**

Later, not on this sheet yet: iCloud. Settings/screenshot photos go through AI chat (locked).

---

## Add form and Edit form (locked)

On the screen, in order:

1. **Name** — search the catalog while typing. Pick a known app, or add a new name.
2. **Category** — searchable select from our list (no subcategory). If the name matches the catalog, category is prefilled. The user can change it. A new app is saved to the shared catalog with this category.
3. **Price** and currency
4. **Cycle** — weekly, monthly, or yearly
5. **Start date** — optional, only if they remember
6. **Next renewal** — can be typed, or filled as an estimate from start + cycle
7. **Note** — optional
8. Save

The first successful save in the account may show one Loop nod or blink. The success is still text. Later saves do not repeat that reaction. Reduce Motion keeps Loop static.

Reminder defaults follow the cycle. The user changes 1 / 3 / 7 days on Detail, not on this form.

**Estimate (start + cycle → next renewal)**

- Start + weekly → next date that is today or later, stepping 7 days from start
- Start + monthly → same, stepping one month
- Start + yearly → same, stepping one year
- If start is in the future, next renewal is the start date
- That filled date is **Estimated** (`predicted`)
- If the user types or edits next renewal, it becomes `user` and we do not overwrite it again
- No start date → we do not invent start. User types next renewal, or the row is **No renewal** if that is also empty
- No cycle and no next renewal → **No renewal**. Do not invent a date

Not on this screen: subcategory, custom cycle, Gmail OAuth, screenshot picker.

---

## Add by AI chat and voice (locked)

**AI chat is its own screen.** Plus → Add by AI. The user does **not** go to the Add form for this path.

1. User types or speaks in the chat. Any language. Roman Urdu, Urdu, Hindi, English are first-class; other languages are best-effort on the same model.
2. AI replies in the user’s language. If name, price, cycle, or next renewal is missing, it asks a short follow-up (one or two, not a long chat).
3. When it has enough, the last AI message is a **summary that matches the Add form fields**: name, category, price, currency, cycle, start date (if any), next renewal, note. Dates we estimated say Estimated.
4. User taps **Create** on that summary. The subscription is created from the chat. Same save rules as the form (catalog, estimate, No renewal, reminder defaults).
5. Success → List (or Detail). No form in between. The first subscription saved in the account may get the same one-shot Loop nod or blink as the form. Later creates do not.

A small Loop may sit in this thread as the chat avatar. It is not a floating bot. Empty Home, empty List, empty Alerts, and the no-upcoming area keep their own still Loop, as locked in [motion-and-mascot.md](motion-and-mascot.md). In chat it stays still except for one tap reaction. Essential status stays in the text.

If something in the summary is wrong, the user **says so in the chat**. AI updates the summary. There is no Edit button on the summary and no jump to the form during create.

After the row exists, Detail → Edit opens the locked Add/Edit form. That is the only form edit path.

If a required field is still missing, do not create. Ask in chat.

**Voice**

- Same chat screen. Mic on the composer.
- The thread shows a **voice message** only (duration / waveform). Do **not** show the transcript to the user.
- Behind the screen: transcribe (Urdu, English, French, or other) and send **only that text** to the AI. The user never sees that text.
- Audio is dropped after transcription. Do not store it.

**Image in chat (locked)**

- Same AI chat. Attach or camera: e.g. iPhone Settings → Subscriptions screenshot.
- Image goes to **Gemini Flash (vision)** with the chat. Not a separate screenshot flow. Not on-device-only OCR.
- The thread shows the **image**. Extracted text is not shown as a transcript.
- After extract: same summary + Create. One screenshot can list **several** rows. Summary is a list; Create adds the checked / listed ones. User says in chat which to drop.
- **Do not store the image** on our server after the model returns. Send, extract, drop.
- Honest: the file is sent to Google’s model. It is not kept in Renewless.
- Source `prompt`. **Paid** (same as AI chat).
- Same rules: do not invent dates; match existing names; catalog for new real apps.

**Rules (same as the locked form)**

- Category from catalog if the name matches; otherwise AI may suggest it. Before Create, the user corrects it in chat; after creation, Detail → Edit uses the form.
- New name + category is added to the shared catalog on Save.
- Start + cycle can estimate next renewal. Mark **Estimated**. Do not invent a date.
- Source is `prompt` or `voice`.
- Reminder defaults follow the cycle.

**If AI is unsure**

- Ask in chat. Leave optional unknown fields unset in the summary; if a required field is missing, do not Create. Do not guess a price or a date.

AI chat and voice are **Paid**. Manual add is Free.

**Model (recommendation, not locked)**

- Speech-to-text: **OpenAI Whisper** (or Gemini transcribe). Built for many languages. Urdu, English, French go through the same step.
- Chat + extract: **Gemini 2.5 Flash** on the transcript only.
- Do not use a heavy Pro/Opus model for this. It is field extraction, not a long assistant.

Quality varies by accent and noise. We do not promise perfect “every language.” We do promise: audio → hidden transcript → AI, never audio stored, never transcript shown in the chat.

---

## Detail (locked)

**Entry/return motion:** a visible subscription card moves and expands into the top Detail hero over 300–350ms; remaining fields fade in. Back reverses into the original row, preserving source tab/filter/search/scroll. For deep links, missing targets or Reduce Motion, use the documented navigation/fade fallback. See [motion specification](motion-and-mascot.md).

Opens from List or History. No `+` in the header.

**On the screen**

- Name, category, price + currency, cycle
- Start date if set, next renewal, **Estimated** if predicted
- Status: Upcoming / In progress / Expired / No renewal
- Last paid only if a real `lastCharge` exists
- Paid on this one (estimate until Gmail charges exist)
- Cancelled-until when set
- Note
- Source: Manual / AI / Voice / Gmail + email
- Reminder: on/off, 1 / 3 / 7 days plus renewal morning

**Edit** opens the locked Add/Edit form.

**I cancelled this** asks for an access-until date. The card stays. Reminders become “access ending”, not “new charge”. If they do not know the date, default to next renewal.

Show a **disclaimer** on that confirm (and keep a short line on the cancelled card):

> This only updates your record in Renewless. It does not cancel the subscription on the real service.

**Delete** is secondary (menu). Confirm: “This removes it from Renewless. It does not cancel the real service.”

No “Open Netflix / Apple to cancel” button.

---

## Gmail connect (locked)

Not Google login. The user already has a session. Gmail is read-only OAuth. Do not reuse the Firebase login token. Do not type email/password.

**Where:** Add sheet **Connect Gmail**, and Profile linked list + Connect another. Multiple Gmail accounts per user.

**First scan**

- Last **12 months** only. Older mail is not read.
- Query → rules → AI. The model never sees the whole inbox. Full emails are not stored.
- After the scan, **Review**. Nothing goes to List until Confirm.

**Review**

- Current finds first (last charge or next date still in play, plus cancel mail). These start **checked**.
- Older finds collapsed: “12 older”. User can open and check them. They start **unchecked**.
- Confirm once. Only checked rows become subscriptions. Then List. Reminders schedule after Confirm.
- Scanning: show progress, Confirm disabled until the scan finishes.
- 0 hits: “Nothing found”, back to List. No empty Review to confirm.
- New real product names join the catalog. Raw bank strings do not.

**Later sync**

- Incremental. No second Review.
- A sent push can appear in Alerts. Tap → subscription Detail.

**Mail matches a row the user already added (manual / AI / voice)**

- Do **not** create a second card.
- Match on the catalog name (`PAYPAL *NETFLIX` → Netflix). One Netflix → that row.
- Update that row: last paid **Confirmed**; price if the receipt changed it; next date becomes `confirmed` only if the current date is Estimated. A date the user typed is not overwritten.
- Cancel mail sets cancelled-until (`confirmed`). Same Renewless-only disclaimer.
- Source stays Manual / AI / Voice. Detail may show “Also seen in Gmail · you@…”.
- Reminders reschedule if dates changed.
- Same receipt on two inboxes updates once.
- Two rows with the same name (work vs personal): attach to the closest price, or the one with no last paid. If still unclear, **skip** — do not invent a third card. No extra “which one?” screen in v1.

**Disconnect**

- Confirm: imported rows from this inbox are removed. Manual / AI / Voice rows stay. Sync stops.

**AI extract from mail (locked)**

- Same fields as the Add form: name, category, price, currency, cycle, last paid, next renewal, cancel / access-until.
- Do not invent a price or date. Missing cycle + next date → **No renewal**.
- Model: **Gemini Flash** on from + subject + date + trimmed body. Not Whisper (mail is already text).
- First scan and later sync use the same extract. Only the UX differs (Review vs auto-update).
- Mail language is best-effort.

The **first scan** of the first Gmail inbox (connect + 12-month Review + Confirm) is **Free**. **Later incremental updates** on that inbox are **Paid**. Another inbox is **Paid**. Without Paid: imported rows stay, sync pauses.

Profile shows the linked Gmail list (email, status, last sync). iCloud is not v1.

---

## Alerts (locked)

**Only notifications that have already been sent.** Future reminders do not appear here. Those stay on the schedule, on Home upcoming, and on Detail.

**Row**

- Name · sent date/time · kind (**Renews** or **Access ending**)
- **Estimated** if that date was predicted
- Tap → that **subscription’s Detail**. There is no separate reminder-detail screen. Push tap is the same.

Newest sent first. Empty: “No alerts yet.” A small calm Loop may sit with that sentence. Loop is still unless the person taps it once, which may blink or nod. No autonomous looping. Reduce Motion keeps it static. No `+`. Loop is not on alert rows.

Reminder **on/off is per subscription** (Detail). Off → not sent, not listed here. No Profile-wide “all reminders off” in v1.

Push tap opens the same row / Detail.

Later kinds (Gmail, price change) are not v1.

v1 without the worker yet: show only rows whose `fireAt` is already in the past (as if sent). Do not list future `fireAt`.

---

## Profile (locked)

This screen is **read-only**. No input fields here. Details, spend, linked Gmail, and two actions: Edit profile and Change password.

**Details (display only)**

- Name, email, phone, date of birth, gender
- Empty optional fields show as a dash or “Not set”
- Skippable banner if phone, date of birth, or gender is empty after social (or email) signup. Dismissing it does not block any screen.

**Paid so far**

- Totals by currency: how much this person has paid on their subscriptions up to today
- First product: estimate from each row’s start date, cycle, and price, counting charges from start through today
- Skip No renewal rows (no cycle, do not invent)
- A cancelled-until row counts only through the access-until date
- Label the figure **Estimated** until Gmail charge history exists later
- This is not the Home “this month” card. Home is this month. Profile is so far.

**Actions**

- **Edit profile** — opens a separate form (name, email, phone, date of birth, gender). Save returns to this read-only Profile.
- **Change password** — separate screen. Hidden if the account has no password (Google/Apple only).
- **History** — expired and cancelled (locked)
- **Payments** — money (locked)
- **Restore purchases**
- **Privacy Policy** and **Terms and Conditions** (same URLs as the paywall)
- **Log out** — clears the session and the stored FCM token

**Linked Gmail**

- List of Gmail accounts the user has connected
- Show email, status, last sync
- Tap a row later can open disconnect / manage. First lock: the list is visible on Profile
- Empty: “No inbox connected” plus a way to Connect Gmail

Not on this screen: inline edit fields, Paywall, delete account, reminder defaults as a form, or a global “all reminders off” (timezone stays silent from the device).

---

## Catalog (locked)

Not a user tab. Shared list of known apps. Stores **normalized name + category** only. No user price, dates, or email.

**How names get in**

- App ships a starter list
- User Add/AI/Gmail: a new real name + category is added for the next user
- **Admin can add** (and later edit/merge) whenever a name should be there
- Raw bank strings stay off the catalog; the user’s own subscription still saves

**On the phone**

- Add/Edit name field searches the catalog
- Pick → category prefills, user can change
- `PAYPAL *NETFLIX` → Netflix

---

## Deferred integration of locked screens

- **AI chat (text, voice and image)** — locked Paid flow above: correct in chat, summary → Create, with no intermediate form. Deferred from the first integration, not removed from product scope.
- **iCloud connect** — app-specific password, then the same Review screen
- **Paywall screen** — last to build, content locked: three plans, Restore, Privacy Policy link, Terms link. See [revenuecat.md](revenuecat.md).
- **Home widget** — locked (section below)

## Home widget (locked)

The phone home-screen widget (iOS WidgetKit, Android app widget). It reads a **small snapshot** the app already wrote (App Group / shared storage). It does not call the API itself.

**What it shows**

Same idea as Home, in the approved graphite and mint-lime tokens, with Raleway where the platform widget can load the bundled font. Rotate **soonest renewal** and **most expensive upcoming** when the snapshot refreshes (app open, subscription change, or the system’s widget timeline). One hero row: name, price, date, Estimated if needed. Small widget = that one row. Medium can add 1–2 more upcoming under it, plus this-month chips (no currency convert). No Loop on the widget. No Liquid Glass requirement. Solid `#151719` ground and `#202326` rows.

**Tap** opens the app on **Home** (or that subscription’s Detail). No “Keep it / Worth it” buttons on the widget — no space, and a widget cannot finish those actions.

**Empty / logged out:** “Open Renewless”. No `+`.

**Free.** Display only. Not a Paid feature.

**Not in the widget:** Alerts inbox, Gmail status, paywall, voice.
- **User website** — same screens as the phone
- **Admin** — sign in, catalog, users, a few counts

---

## Integration map (what each screen needs)

Auth

- Login / signup / OTP / reset / social session
- Firebase only on the phone for Google and Apple; backend verifies the ID token

Home and List

- Dashboard counts
- Subscription list with status, search, category, sort

Add / Edit / Detail

- Create, read, update, delete
- Cancelled-until
- Reminder preference on the row
- Catalog name suggestions

Gmail

- Start OAuth, list connectors, disconnect
- Review list + one confirm
- Do not use the current fake connector seed

Alerts and Profile

- Notification list (dates first, push later)
- Profile update, change password, logout
- Device timezone
- FCM token: save at session start, refresh on Home if the device token changed, clear on logout

## Out of scope everywhere

- Guest browsing
- Cancelling a third-party subscription
- Reading Apple Settings subscriptions
- Apple Card / FinanceKit
- Retaining uploaded chat images on Renewless servers after extraction; direct access to Apple Settings is also out of scope
- Giving the model the whole inbox
- Light mode and automatic theme switching in v1
- Loop on every row, a persistent floating Loop, or any motion that loops on its own
- A second mascot, or Loop in place of the R mark or the app icon
