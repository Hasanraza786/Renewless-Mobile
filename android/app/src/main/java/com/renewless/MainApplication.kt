package com.renewless

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.modules.i18nmanager.I18nUtil

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Home Screen widget bridge (RenewlessWidgetModule.kt).
          add(RenewlessWidgetPackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    // The design is left-to-right English; an Arabic or Urdu phone must not mirror it. Set before React Native
    // starts, so the first launch is already left-to-right (iOS stays left-to-right on its own).
    I18nUtil.instance.allowRTL(this, false)
    loadReactNative(this)
  }
}
