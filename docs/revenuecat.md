# RevenueCat (locked)

Payment still goes through the **App Store** and **Google Play**. RevenueCat sits on top: products, trials, entitlements, webhooks to our API.

Billing is in the locked product scope, deferred from the first integration and wired last. Paid features must not launch before purchase/restore and backend entitlement gates are ready. See [implementation scope](implementation-scope.md).

## What the user buys

One Paid flag. Not five separate IAPs.

| Store product | Price | Intro |
|---|---|---|
| `renewless_pro_monthly` | $3.99 / month | 1 week free |
| `renewless_pro_quarterly` | $9.99 / 3 months | 1 week free |
| `renewless_pro_yearly` | $29.99 / year | 1 month free |

All three unlock the same entitlement: **`pro`**.

**`pro` unlocks:** Gmail incremental updates, AI chat, voice, extra Gmail inboxes, 26th+ live subscription.

## App

Paywall and billing surfaces must follow the approved [dark Raleway theme](theme.md) and [brand assets](brand/README.md). No Loop on the paywall. This visual approval does not change the build-last billing sequence or the locked plans.

- RevenueCat SDK on the phone (React Native)
- Paywall when: AI / Voice, second Gmail, Gmail “keep sync”, 26th add/confirm

### Paywall screen (locked)

Its own screen. Not a system alert only.

- The three plans: monthly $3.99, 3 months $9.99, yearly $29.99, with their free trials
- What Paid includes (sync, AI, voice, extra Gmail, 26+)
- **Restore purchases**
- **Privacy Policy** link
- **Terms and Conditions** link
- Close / not now (back to Free)

Apple and Google require Privacy + Terms on the purchase screen. Restore is required on iOS.

Links open our hosted pages (website URLs). The pages themselves can ship later; the paywall must not go live without working URLs.

- After purchase, send the RC user id (our user id) so the backend can trust webhooks

## Backend

- Store on the user: `pro` yes/no, `proExpiresAt`, `rcOriginalAppUserId`
- **Webhook** from RevenueCat: purchase, renew, cancel, expire, billing issue
- Gate Paid routes: Gmail incremental job, AI chat, voice, connector #2, create when live count is 25
- First Gmail scan stays Free even if `pro` is false

## What we need from you (before implementation)

**RevenueCat**

- Project
- Public SDK key (phone)
- Secret API key (server, webhook auth)
- Entitlement `pro`
- Offering with the three packages

**Apple**

- App Store Connect paid apps / subscriptions
- The three subscription products
- Intro offers (7-day on monthly + quarterly, 1-month on yearly)
- In-App Purchase key / shared secret for RevenueCat

**Google**

- Play Console subscriptions (same three)
- Same intro offers
- Service account JSON linked in RevenueCat

Do not put store secrets in the app binary. Server env only.

## Locked extras

- One entitlement `pro`. Not separate IAPs for Gmail / AI / voice.
- Profile also has **Restore purchases**, **Privacy Policy**, and **Terms and Conditions** (same URLs as the paywall).
