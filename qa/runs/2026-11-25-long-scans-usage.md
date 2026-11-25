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
