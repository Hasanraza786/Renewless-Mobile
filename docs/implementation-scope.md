# Implementation scope and document precedence

This resolves scope terminology; it is not a claim that implementation is complete or a newly approved milestone schedule.

## Sources of truth

- Visual tokens and typography: [theme.md](theme.md).
- Materials, transitions and Loop behavior: [motion-and-mascot.md](motion-and-mascot.md).
- Screen behavior: [product-screens.md](product-screens.md), with [product-flow.md](product-flow.md).
- Free/Paid entitlement split: [feature-list.md](feature-list.md); prices, trials and billing: [revenuecat.md](revenuecat.md).
- Excluded features: [not-in-v1.md](not-in-v1.md). Its deferred-integration list does not remove locked features from product scope.

Figma and browser previews are visual references. A frame's presence does not mean the feature is implemented, and a static frame does not verify native glass or motion.

## First integration versus complete product

The first integration covers the core account/manual subscription path and its Home, List, Detail, Profile, History and Payments behavior. Categories and cancelled-until belong to the first backend slice. Runtime support must be checked against the existing API; documentation alone is not evidence of support.

Real push delivery, production Gmail, Paid AI chat (text/voice/image), widgets and billing remain locked product scope but are deferred from that first slice. Detailed milestones and backend/mobile ownership are still to be planned before feature implementation.

- Alerts always means reminders already sent. If the worker and sent-event data are unavailable, show the empty state; upcoming dates belong on Home/List.
- AI creation stays in chat: correction → updated summary → Create. Edit via the form is available only after creation.
- Images are user-attached chat content sent to Gemini vision, then dropped by Renewless after extraction. No separate OCR screen or direct reading of Apple Settings.
- First Gmail scan for one inbox is Free. Incremental sync and additional inboxes are Paid.
- Widgets use a local snapshot and require the underlying data path first.
- RevenueCat/paywall wiring is integrated last. Paid features may be developed earlier, but cannot be released as ungated features. Purchase, restore and backend entitlement enforcement must work before Paid launch.
- All three plans and trials are locked in revenuecat.md; quarterly and yearly pricing are not suggestions.
- Working Privacy/Terms URLs are required before the paywall goes live.

User/admin websites and iCloud remain later/outside v1 as listed in the exclusions document. A future implementation plan must not silently promote them into the first release.

## Remaining implementation validation

Reusable component states, loading/error behavior, native Liquid Glass support, interruptible card-to-Detail transitions and accessibility need implementation validation. The Figma component library and runtime integration are separate work; this documentation cleanup does not mark them complete.
