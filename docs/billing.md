# Renewless billing

## V1 — fully free, approved 31 October 2026

All planned user features are free in v1: manual tracking, AI text/voice/image/PDF, first and subsequent Gmail scans/incremental sync, additional inboxes, reminders, widgets and subscription tracking without the former 25-record paid cap. No Paywall route, Pro profile variant, Upgrade, plan meter, purchase, restore, manage-plan control or billing-induced sync pause ships in v1. Do not fake Pro=true; remove billing checks from v1 access decisions while preserving authentication, consent, ownership, validation and operational safety. Feature/native/API readiness remains separate from free availability. The finalized [mobile implementation plan](api-mobile-contract.md#mobile-implementation) and [milestones](product-specification.md#implementation-sequence) exclude purchase SDKs/paid gates from v1; Phase 2 is not a prerequisite for any approved v1 feature.

Onboarding: reviewed finds → authentication → successful import → Ready → Home. Profile contains account, inboxes, activity, preferences/security/legal and logout. Payments continues to mean Gmail evidence for tracked third-party subscriptions; provider prices/trials and confirmed receipts are unaffected by free Renewless access. Real account/privacy/legal requirements remain in their owners.

<a id="revenuecat"></a>
## Phase 2 — deferred monetization drafts

Own-app subscriptions, RevenueCat/store setup, paid entitlements, paywall comparison, restore and plan management are Phase 2 only. They are not v1 integration dependencies or launch gates. Do not enable a purchase SDK flow, paywall or backend paid check without explicit user authorization, scoped design review and synchronized product/screen/API/design/billing contracts. Future feature packaging and prices require revalidation; old price intentions are retained below, not active v1 offers.

| Retained draft store product | Draft USD price | Draft introductory offer |
| --- | --- | --- |
| `renewless_pro_monthly` | 2.99/month | One week |
| `renewless_pro_quarterly` | 8.99/3 months | One week |
| `renewless_pro_yearly` | 34.99/year | One month |

Historical concept: one `pro` entitlement, not separate feature purchases. The old proposed premium split (AI, ongoing Gmail sync, additional inboxes and 26th+ live record) is superseded for v1; all are free. Phase 2 packaging is not silently predetermined by that old split. Quarterly 8.99 is not a saving over three monthly payments at 2.99. Actual future localized products/offers, eligibility, store integration, ownership, webhook verification, legal destinations and sandbox review must be validated when Phase 2 is authorized. Store secrets stay server-side. No store configuration is claimed verified by this repository.

## Retained Phase 2 assets and notes — not v1 submission material

Existing screenshots, templates and provenance are preserved for future reference. They are not evidence of a shipped purchase flow and must not be used to describe or gate v1. The commercial examples below are historical Phase 2 drafts; any premium feature wording must be rewritten against an explicitly approved future packaging decision before use.

<a id="store-review"></a>

## Draft App Store review assets

These PNGs are rendered from the HTML prototype, not a shipped iOS build. Replace with matching screenshots from the functioning app before submission. They show the same paywall with a different selected plan. Do not upload the design prototype as evidence of implemented purchases.

Historical Phase 2 product intentions (not configured/verified here):
- Monthly: renewless_pro_monthly — USD 2.99/month, 1-week introductory trial.
- Quarterly: renewless_pro_quarterly — USD 8.99/3 months, 1-week introductory trial.
- Yearly: renewless_pro_yearly — USD 34.99/year, 1-month introductory trial.

Historical quarterly intention is USD 8.99; 3 monthly payments cost USD 8.97. No quarterly discount is claimed. Introductory offers depend on store configuration and customer eligibility. Localized store prices, renewal disclosure and working Terms/Privacy links must be verified in the actual build.

### Draft review notes (adapt to the submitted build)

#### Monthly

See the [monthly review-note template](#monthly-review-notes) and retained screenshot [app-store-review/monthly-preview.png](app-store-review/monthly-preview.png).

#### Quarterly

See the [quarterly review-note template](#quarterly-review-notes) and retained screenshot [app-store-review/quarterly-preview.png](app-store-review/quarterly-preview.png).

#### Yearly

See the [yearly review-note template](#yearly-review-notes) and retained screenshot [app-store-review/yearly-preview.png](app-store-review/yearly-preview.png).


### Corrected file encoding (2026-10-26)

All three `*-preview.png` files were re-encoded as genuine PNG (8-bit RGB, no alpha, 1242×2688 portrait, 72 DPI). The original browser export returned JPEG bytes despite the PNG filename; that mismatch is fixed. PNG signatures and decoded format/mode/dimensions are verified. Apple lists 1242×2688 as an accepted iPhone screenshot size. App Store Connect upload acceptance has not been tested.

Reference: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/

<a id="monthly-review-notes"></a>

## Monthly review-note template

```text
Renewless Pro — Monthly
Product ID: renewless_pro_monthly
Subscription duration: month. Intended US price: USD 2.99 per month.
Intended introductory offer: one week free for eligible new subscribers, followed by the recurring price above.

Historical Phase 2 product draft only. V1 provides all these features free. Before future submission, replace this line with the explicitly approved Phase 2 feature packaging; this template establishes no active paid gate.

Before submission: replace this paragraph with the verified steps to reach this product in the submitted iOS build. Supply any required reviewer account in App Review Information, verify purchase and restore in sandbox, and ensure external service access can be reviewed. No real payment or Gmail connection exists in the accompanying HTML design prototype.
```

<a id="quarterly-review-notes"></a>

## Quarterly review-note template

```text
Renewless Pro — Quarterly
Product ID: renewless_pro_quarterly
Subscription duration: three months. Intended US price: USD 8.99 per three months.
Intended introductory offer: one week free for eligible new subscribers, followed by the recurring price above.

Historical Phase 2 product draft only. V1 provides all these features free. Before future submission, replace this line with the explicitly approved Phase 2 feature packaging; this template establishes no active paid gate.

Before submission: replace this paragraph with the verified steps to reach this product in the submitted iOS build. Supply any required reviewer account in App Review Information, verify purchase and restore in sandbox, and ensure external service access can be reviewed. No real payment or Gmail connection exists in the accompanying HTML design prototype.
```

<a id="yearly-review-notes"></a>

## Yearly review-note template

```text
Renewless Pro — Yearly
Product ID: renewless_pro_yearly
Subscription duration: year. Intended US price: USD 34.99 per year.
Intended introductory offer: one month free for eligible new subscribers, followed by the recurring price above.

Historical Phase 2 product draft only. V1 provides all these features free. Before future submission, replace this line with the explicitly approved Phase 2 feature packaging; this template establishes no active paid gate.

Before submission: replace this paragraph with the verified steps to reach this product in the submitted iOS build. Supply any required reviewer account in App Review Information, verify purchase and restore in sandbox, and ensure external service access can be reviewed. No real payment or Gmail connection exists in the accompanying HTML design prototype.
```
