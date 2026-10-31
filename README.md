# Renewless mobile

React Native + TypeScript mobile client for tracking subscriptions and renewals. Existing screens and API integration are an initial implementation; the product docs describe the target behavior. The backend is a separate project.

## Product and design documents

Only five canonical product documents:

1. [Product specification](docs/product-specification.md) — features, journey, scope, catalog and prototype operation.
2. [Product screens](docs/product-screens.md) — all screen specifications, locked/pending register and change workflow.
3. [API/mobile contract](docs/api-mobile-contract.md) — shared data, operations, validation and current implementation gaps.
4. [Design system](docs/design-system.md) — theme, controls, motion, mascot, assets and provenance.
5. [Billing](docs/billing.md) — free v1 access policy; deferred Phase 2 monetization drafts, retained RevenueCat/store plans and review assets.

[AGENTS.md](AGENTS.md) is the project working policy, not a sixth product specification. Finalized screens are frozen: changes require scoped unlock confirmation. All 74 existing prototype base states, including Add/Edit trials, were approved 31 October 2026; the subsequently requested shared 22/16/12 typography is pending reapproval; native implementation is not yet complete. Every approved change updates all affected canonical documents in the same task.

Start implementation from the [React Native blueprint](docs/api-mobile-contract.md#mobile-implementation), [native route/state mapping](docs/product-screens.md#native-navigation), [shared component map](docs/design-system.md#native-components) and [milestone/release plan](docs/product-specification.md#implementation-sequence). The existing native client has documented gaps; provider/backend verification and the account-deletion release-scope gap remain explicit. No sixth mobile implementation document is needed.

The Final HTML prototype is under `prototypes/renewless-studio/dist/`. Setup below is for the initial React Native implementation; it does not imply complete design/API coverage.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


Design Studio: double-click text in a phone preview to inspect typography/color/layout in the right panel; double-click an icon for preview and SVG/PNG downloads. Use **Inspect** to pause phone actions while selecting controls. SVG export requires vector artwork; PNG supports 1×/2×/4×. Shared typography is under review; see the [lock register](docs/product-screens.md#screen-lock-register).


The [public Design Studio](https://renewless-design-studio.web.app/#home) is hosted on Firebase project/site `renewless-design-studio`, first published 31 October 2026. Configuration lives in [firebase.json](prototypes/renewless-studio/firebase.json) and [.firebaserc](prototypes/renewless-studio/.firebaserc). Hosting exposes only `prototypes/renewless-studio/dist`, with revalidation for updated files. For an authorized update, run `firebase deploy --only hosting --project renewless-design-studio` from `prototypes/renewless-studio`. Hash routes such as `/#home` share the same static entry point. Credential files, native source and canonical docs are outside the public directory.
