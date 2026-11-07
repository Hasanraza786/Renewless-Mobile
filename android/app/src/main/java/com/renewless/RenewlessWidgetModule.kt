package com.renewless

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.os.Build
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.ViewManager

// Same JS name and methods as the iOS bridge (ios/Renewless/WidgetBridge.swift), plus requestPin for Android.
class RenewlessWidgetModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  override fun getName() = "RenewlessWidget"

  private val prefs get() = context.getSharedPreferences(RenewlessWidgetProvider.PREFS, Context.MODE_PRIVATE)
  private val component get() = ComponentName(context, RenewlessWidgetProvider::class.java)

  @ReactMethod
  fun setSnapshot(json: String) {
    prefs.edit().putString(RenewlessWidgetProvider.KEY, json).apply()
    RenewlessWidgetProvider.refreshAll(context)
  }

  @ReactMethod
  fun clear() {
    prefs.edit().remove(RenewlessWidgetProvider.KEY).apply()
    RenewlessWidgetProvider.refreshAll(context)
  }

  @ReactMethod
  fun isInstalled(promise: Promise) {
    promise.resolve(AppWidgetManager.getInstance(context).getAppWidgetIds(component).isNotEmpty())
  }

  // Opens the launcher's own "Add widget" dialog; false when the launcher cannot pin widgets.
  @ReactMethod
  fun requestPin(promise: Promise) {
    val manager = AppWidgetManager.getInstance(context)
    val supported = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && manager.isRequestPinAppWidgetSupported
    promise.resolve(supported && manager.requestPinAppWidget(component, null, null))
  }
}

class RenewlessWidgetPackage : ReactPackage {
  override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> = listOf(RenewlessWidgetModule(context))
  override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> = emptyList()
}
