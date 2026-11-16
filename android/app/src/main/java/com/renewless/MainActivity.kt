package com.renewless

import android.content.pm.ActivityInfo
import android.content.res.Configuration
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Renewless"

  // A system change (text size, language) recreates the activity; without this factory, restoring the screen
  // fragments crashes the app (react-native-screens setup).
  override fun onCreate(savedInstanceState: Bundle?) {
    supportFragmentManager.fragmentFactory = RNScreensFragmentFactory()
    super.onCreate(savedInstanceState)
    lockPhonesToPortrait(resources.configuration)
  }

  // Unfolding a foldable changes the screen without recreating the activity (configChanges), so check again.
  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    lockPhonesToPortrait(newConfig)
  }

  // Phones are portrait-only like iPhone; tablets and open foldables (shorter side 600dp+, as useIsTablet) rotate freely.
  private fun lockPhonesToPortrait(config: Configuration) {
    val wanted =
        if (config.smallestScreenWidthDp < 600) ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        else ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
    if (requestedOrientation != wanted) requestedOrientation = wanted
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
