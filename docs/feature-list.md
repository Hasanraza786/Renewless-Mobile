# App feature list (review)

What is **in** the Renewless phone app after our locks. Not a build order.

## Free vs Paid (locked)

**Free**

- Auth, Home, List, Detail, History, Payments (estimates), Profile, catalog, reminders, Alerts, recommendation
- Manual add / edit
- **One** Gmail inbox, **first scan only:** connect, 12-month Review, Confirm. That import is Free.
- Up to **25 live** subscriptions. History does not count.

**Paid**

- AI chat add (text, voice, **and image** — e.g. Settings subscriptions screenshot → Gemini vision → summary → Create. Image is sent to the model, not stored.)
- Voice add
- **Gmail updates after the first scan** (incremental extract, new receipts, cancel mail, last paid). Without Paid, the first import stays on the list but goes stale. Copy: “Updates paused — upgrade to keep Gmail in sync.”
- **Second and further** Gmail inboxes
- **26th** subscription and above

The 25 cap is a backstop. Most people pay for **ongoing Gmail sync** or AI/voice, not for hitting 25.

**Paid plans (locked)**

- **Monthly** — **$3.99**, **1 week free**
- **3 months** — **$9.99** (~$3.33/mo), **1 week free**
- **1 year** — **$29.99** (~$2.50/mo), **first month free**

Store listing uses **$3.99**, not $3.90 (App Store / Play convention).

**Billing:** **RevenueCat** on top of **Apple App Store** and **Google Play** subscriptions. Money still goes through Apple or Google. RevenueCat does not replace them — it unifies receipts, trials, and entitlements (Gmail sync, AI, voice, extra inbox, 26th+ row) for iOS + Android + our backend.

Paywall screen (locked in [revenuecat.md](revenuecat.md)): three plans, Restore, Privacy, Terms. Wiring ships last. Profile has the same Restore + legal links.

Exclusions and deferred integration: [not-in-v1.md](not-in-v1.md). Build-scope definitions: [implementation-scope.md](implementation-scope.md).

## Look

- English UI; dark cool-graphite theme with soft mint-lime accent.
- Raleway Regular 400 / Medium 500, compact typography and old-style numerals.
- Rounded R logo, 51 × 51 master; app icons are prepared by the user. See [brand assets](brand/README.md).
- Status words + **Estimated** on predicted dates
- Tokens: [theme.md](theme.md). Motion/materials: [motion-and-mascot.md](motion-and-mascot.md).
- Supported iPhones: native Liquid Glass navigation; solid graphite fallback on older iOS/Android.
- Card-to-Detail shared transition with reverse return and scroll preservation.
- Loop companion in selected empty/success states; subtle one-shot reactions, accessibility fallbacks.

## Auth

- Login: email + password → session. No OTP. Google / Apple (Firebase)
- Signup: name, email, password required; phone, gender, DOB optional → OTP 5 min, resend after 2 min → session → Home
- Forgot: OTP 5 min, resend 2 min → reset password → login
- Google/Apple: create or login, straight Home, skippable Profile banner
- FCM: save on session, refresh on Home if changed, clear on logout (one token)
- Change password only if the account has a password

## Navigation

- Tabs: Home · List · Alerts · Profile
- Supported iPhones: floating dark Liquid Glass tab bar. Older iOS and Android: solid `#202326` bar. Active tab `#B9E58C`.
- `+` top-right on Home and List, bare mint-lime, no filled circle → Manual / AI / Voice / Connect Gmail
- Empty Home/List: friendly still Loop, plus labeled buttons and a one-time `+` tooltip
- History and Payments from Profile, not tabs

## Home

- Count cards: Active, Renewing soon (7 days), This month (per currency), Expired (tap → History). Neutral cards, mint-lime only as a thin edge on the recommendation.
- Recommendation rotates on app open: soonest (time buttons) vs most expensive upcoming (money buttons). One dark card for both.
- No upcoming rows: hide the recommendation. A relaxed Loop may sit in that empty area when other live subscriptions exist.
- Upcoming list → Detail, with the card-to-Detail expand
- Empty: friendly Loop + Add manually + Connect Gmail
- FCM check

## List

- Row: name left, price right, next date, status word, Estimated, cancelled-until; last paid only if real. Neutral monogram. No per-service logo.
- No source on the row
- Search, All / Upcoming / In progress. Expired and Cancelled are History only.
- **No renewal** banner when 1+: “2 have no renewal”
- Category, sort by next date
- Empty: same friendly Loop as Home

## Add

- Form: name (catalog search or new), category select, price, currency, cycle weekly/monthly/yearly, optional start, next renewal (estimate from start + cycle), note
- New app → shared catalog
- AI chat: any language, summary = form fields, fix in chat, Create from chat (no form). A small still Loop may be the thread avatar, not a floating bot.
- Voice: same chat, voice bubble only, hidden transcript (Whisper → Gemini Flash)
- Reminder defaults from cycle; 1/3/7 on Detail only
- First successful save in the account: one Loop nod or blink. Later saves do not.

## Detail

- Full fields, source, last paid if real, paid-on-this estimate
- Opens from a visible card by expanding that card into the hero, then reversing back to the same row. Deep links and Reduce Motion use a plain navigation fade.
- Edit → form
- I cancelled this + disclaimer (record only, not a real cancel)
- Delete secondary, same disclaimer
- Reminder on/off per subscription

## History (Profile)

- Expired + Cancelled
- Search, All / Expired / Cancelled, category, ended-on date range

## Payments (Profile)

- Paid so far + this month, one chip per currency, no convert
- Charge list (estimate from start + cycle until real charges)
- Search, category, date range

## Alerts

- Only notifications already sent
- Tap → that subscription’s Detail (no reminder-detail screen)
- Push tap same
- Empty: “No alerts yet” with a calm still Loop. No Loop on the rows.

## Gmail

- OAuth read, not login; multiple inboxes
- 12-month scan → Review (current checked, older collapsed) → Confirm
- Later sync: no Review; update or match existing manual/AI/voice row
- AI extract (Gemini Flash) same fields as the form; do not invent
- Disconnect drops that inbox’s imports only

## Profile

- Read-only details, paid so far, linked Gmail, Edit, Change password, History, Payments, Logout

## Home widget (locked)

- iOS WidgetKit + Android widget. Snapshot from the app, no API call.
- Same graphite and mint-lime tokens as the app. Solid surfaces. No Loop. No glass requirement.
- Rotates soonest vs most expensive upcoming. Small = one row. Medium = + upcoming + this-month chips.
- Tap → Home (or that Detail). No action buttons on the widget.
- Logged out: “Open Renewless”. Free.

## Catalog (locked)

- Not a user tab. Starter list + user/Gmail/AI new names + **admin can add** (and later edit/merge)
- Phone: search on Add, category prefill

## Still open on this list

- The Free/Paid split is locked. Paywall / RevenueCat is in product scope and integrated last, outside the first integration. Detailed milestones remain to be planned; Paid features must not launch before billing and entitlement gates are ready.
