# QA run 2026-11-25: long scans, needs attention, usage bills, inbox slots

- Build: debug from branch `api-integration` (uncommitted work of 25 Nov 2026), Metro, live backend `https://api.renewlessapp.com` at `cc93e93`.
- Device: Samsung Galaxy S23 Ultra (SM-S918B), Android, phone layout. No tablet or iOS device in this run.
- Account: a fresh Google account made through onboarding. Its inbox's earlier `scannedInboxes` row was removed on purpose so the first scan ran in full.
- Checks before the device: `tsc`, `eslint`, `jest` (39 suites, 139 tests) all pass.
- Screenshots are not committed: they show a real inbox address (5.4).

| Case | Result | Notes |
|---|---|---|
| Onboarding: Connect Gmail → quick check | PASS | Quick check read 150 billing emails and found 1 plan. |
| Discovering progress lines (Reading · %, Checked n of m, n so far) | BLOCKED | The quick check ended before a screenshot. Covered by `scan-progress.test.ts` only. |
| Discovering · first results | PASS | Matches the Studio route. Older mail moved 0% → 27% → 69% in about a minute. |
| Discovering · notify me → Notify me | PASS | Went to Home. Push permission was already granted, so no system prompt. |
| `scan_more_found` push, only after Notify me | PASS | "Loop found 7 more subscriptions in …" arrived. |
| Home · more found on an account with nothing saved yet | FAIL → fixed | The card showed only on a populated Home. It now also shows on the empty Home. |
| Home · more found Review button size | FAIL → fixed | The button was full width. It is now compact as designed. |
| Review from Home · more found (WHAT'S NEW) | PASS | 3 new plans (including the quick check's ElevenLabs) and 2 usage bills. |
| USAGE BILLS rows | PASS | Unticked, no pencil. A ticked row moves the ring to 4/5 and the button to Add 4; the monthly total is unchanged. |
| Import with a usage bill; card cleared | PASS | Importing dismissed the MORE FOUND card. |
| Home · usage event | PASS | USAGE BILL, Around 4 Dec, "Usage charge expected", "Usage-based". The This month note adds "Usage bills aren't included." |
| Detail · usage | PASS | Usage-based, Last bill, Last 3 bills (one bill so far), Next bill, the usage note, Typical bill · last 3. No price history. |
| List · usage | PASS | Active, Bill around 4 Dec, Usage-based / Monthly. |
| Calendar with a usage bill | PASS | No 0.00 amounts. |
| Profile inbox slots, one inbox | PASS | "You can connect 1 more inbox." with Gmail and Outlook. |
| Profile 2 of 2 / used before | BLOCKED | Needs a second inbox and a disconnect. |
| PAYMENTS FAILING, CHOOSE A SUBSCRIPTION | BLOCKED | The QA inbox produced none. Covered by adapter tests. |
| Tablet layouts of the new states | BLOCKED | No tablet in this run. |

## Bugs and gaps

1. **Major, fixed in this run.** Home · still checking / more found did not show on an empty Home. Steps: onboarding → Keep looking in the background → Notify me. Expected: the card (product-screens.md#long-scans). Actual: the empty Home without the card.
2. **Backend gap.** A `paymentFailing` candidate has no price, so a failing row can never be added (product-screens.md#needs-attention-states shows "<amount> · <cycle>").
3. **Backend gap.** A recorded match cannot be changed (409 `ALREADY_MATCHED`), but the design has Change.
4. **Backend gap.** A usage subscription in the list has `price: null`, so its currency is unknown outside Detail.
5. **Watch item, not from this change.** A fresh install asks for Nearby devices permission on Android at launch.

## Second pass (same day, after the design revisions)

Same phone. The account was deleted and its scanned-inbox row removed again, so onboarding ran a full first scan.

| Case | Result | Notes |
|---|---|---|
| Discovering progress | PASS | Turning ring and "Reading your inbox · 86%" with the bar. |
| Discovering · first results (revised) | PASS | FOUND SO FAR / Loop is still looking., Rest of your year 0% → 100%, "Checked 53 of 53 emails · 2 more found". |
| Loop riding the bar at 100% | FAIL → fixed | Loop was cut off at the right end. It is now held inside the bar at both ends. Measured in the Studio; the phone still ran the old bundle at that point. |
| Discovering stage bar with Loop | Not seen on device | Added after the user asked during this pass. Approved 25 Nov 2026. Needs a new scan to be seen. |
| Notify sheet (revised) | PASS | Mint-outline Not now, 8 pt under Notify me. Notify me showed the Android notification prompt. |
| Keep looking saves found plans | PASS | ElevenLabs was saved, and Home showed the dashboard instead of the empty state. |
| Home · more found (revised) | PASS | Review → mint link. Next renewal padding 8 pt. No usage card on Home. |
| Review from more found | PASS (design) / FAIL (data) | See backend bugs 6 and 7. |
| Profile and List | PASS | "You can connect 1 more inbox."; the Status filters open. |

## Backend bugs from the second pass

6. **Major.** A plan saved from the quick check is offered again. ElevenLabs was saved through Keep looking → Notify me, then showed again as a new, ticked row in the more-found review, and was counted in "Loop found 8 more". The deep job copied the quick job's unimported plans before the save. Expected per product-screens.md#long-scans: a later find that matches something already saved is folded into it, not offered again.
7. **Minor.** One service in two usage rows: WhatsApp Business appeared twice in USAGE BILLS (€0.97 and €1.06).
8. **Minor.** A usage candidate without lastCharges (Sentry) can only show "Usage-based", with no last bill.

## Third pass (auto-advance and dismiss)

| Case | Result | Notes |
|---|---|---|
| Scan interrupted by a server restart | PASS | A backend deploy at 12:24:57 UTC restarted the server, and the scan failed with a retryable INTERNAL error. The app showed "Your scan was interrupted", and Try again started a new scan. |
| Discovering stage bar with Loop | PASS | Loop rode the "Reading your inbox" bar, which stops at 220 pt. |
| Loop at 100% | PASS | At 100% Loop sat fully inside the bar's end. |
| First results opens Your subscriptions at 100% | PASS | 80% → 100% ("Checked 53 of 53 emails") → Your subscriptions opened by itself about 4 s later, with the quick and rest-of-year finds together (3). |
| Continue without saving after the whole year | PASS | The background scan was stored as dismissed, and Home showed no MORE FOUND card (the empty Home, because nothing was saved). |

9. **Design gap.** Your subscriptions in onboarding has no USAGE BILLS section, so the usage bills a first scan finds are never shown there. After the full-year review the background card is dismissed, so they stay hidden until the next sync. Needs a decision: add the section to onboarding, or keep the card when usage bills exist.

## Fourth pass (usage bills in onboarding)

| Case | Result | Notes |
|---|---|---|
| First results lists usage bills | PASS | FOUND SO FAR showed Meta ads and WhatsApp Business as "Usage-based · Monthly". |
| Your subscriptions · usage bills | PASS | Two USAGE BILLS rows (Meta ads, last bill €74.49; WhatsApp Business, €0.97), unticked, with no pencil, and the note. Save showed 3 until they were ticked. |
| Saving usage bills from onboarding | PASS | Ready to go: "5 subscriptions saved", 3 currencies (USD, EUR, PKR). The next renewal was Claude, not a usage bill. |
| Home currency tabs | FAIL → fixed | EUR, which holds only usage bills, was the first and selected tab, so Top spending was empty. Currencies with spending now come first (USD, PKR, EUR). |
| List and Detail · usage | PASS | "Usage-based" and "Bill around 3 Dec / 4 Dec"; Meta ads Detail showed its last bill and "Expected around 4 Dec". |
