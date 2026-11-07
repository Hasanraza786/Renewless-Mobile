package com.renewless

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.view.View
import android.widget.RemoteViews
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

// Small Home Screen widget drawn from the snapshot the app writes (src/utils/widget.ts); it never calls the API.
class RenewlessWidgetProvider : AppWidgetProvider() {

  override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
    ids.forEach { manager.updateAppWidget(it, render(context, manager, it)) }
  }

  override fun onAppWidgetOptionsChanged(context: Context, manager: AppWidgetManager, id: Int, options: android.os.Bundle) {
    manager.updateAppWidget(id, render(context, manager, id))
  }

  companion object {
    const val PREFS = "renewless_widget"
    const val KEY = "widget_snapshot"
    private const val MINT = 0xFFB9E58C.toInt()
    private const val CORAL = 0xFFF29B8F.toInt()
    private const val TRIAL_BLUE = 0xFF9EBCE0.toInt()
    private const val DAY_MS = 86_400_000L

    // Local midnight of a YYYY-MM-DD date (minSdk 24 has no java.time).
    private fun parseDay(text: String): Date? = runCatching { SimpleDateFormat("yyyy-MM-dd", Locale.US).apply { isLenient = false }.parse(text) }.getOrNull()

    private fun startOfToday(): Date = Calendar.getInstance().apply {
      set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0); set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0)
    }.time

    fun refreshAll(context: Context) {
      val manager = AppWidgetManager.getInstance(context)
      val ids = manager.getAppWidgetIds(ComponentName(context, RenewlessWidgetProvider::class.java))
      ids.forEach { manager.updateAppWidget(it, render(context, manager, it)) }
    }

    // Square tile like the iOS Small widget: the shorter side of the cell (portrait width x height).
    private fun squareTile(views: RemoteViews, manager: AppWidgetManager, id: Int) {
      if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S) return
      val options = manager.getAppWidgetOptions(id)
      val width = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH)
      val height = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT)
      if (width <= 0 || height <= 0) return
      val side = minOf(width, height).toFloat()
      views.setViewLayoutWidth(R.id.widget_tile, side, android.util.TypedValue.COMPLEX_UNIT_DIP)
      views.setViewLayoutHeight(R.id.widget_tile, side, android.util.TypedValue.COMPLEX_UNIT_DIP)
    }

    private fun open(context: Context, url: String): PendingIntent =
      PendingIntent.getActivity(
        context, url.hashCode(),
        Intent(Intent.ACTION_VIEW, Uri.parse(url), context, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP),
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
      )

    private fun quiet(context: Context, views: RemoteViews, needsUpdate: Boolean) {
      views.setViewVisibility(R.id.event_block, View.GONE)
      views.setViewVisibility(R.id.quiet_block, View.VISIBLE)
      views.setViewVisibility(R.id.quiet_art, View.VISIBLE)
      views.setImageViewResource(R.id.quiet_art, if (needsUpdate) R.drawable.widget_loop_neutral else R.drawable.widget_loop_happy)
      views.setInt(R.id.dot, "setColorFilter", MINT)
      views.setTextViewText(R.id.quiet_title, if (needsUpdate) "Time to check in." else "All clear.")
      views.setTextViewText(R.id.quiet_line, if (needsUpdate) "Open Renewless" else "Nothing coming up.")
      views.setTextViewText(R.id.quiet_note, if (needsUpdate) "to see what’s next." else "A little peace of mind.")
      views.setContentDescription(R.id.widget_root, if (needsUpdate) "Time to check in. Open Renewless to see what’s next." else "All clear. Nothing coming up. Open Renewless")
      views.setOnClickPendingIntent(R.id.widget_root, open(context, "renewless://home"))
    }

    fun render(context: Context, manager: AppWidgetManager, id: Int): RemoteViews {
      val views = RemoteViews(context.packageName, R.layout.renewless_widget)
      squareTile(views, manager, id)
      val text = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY, null)
      val snapshot = text?.let { runCatching { JSONObject(it) }.getOrNull() }
      val event = snapshot?.optJSONObject("event")
      if (event == null) {
        quiet(context, views, false)
        return views
      }
      val date = parseDay(event.optString("date"))
      // Rounded so a daylight-saving day still counts as one.
      val days = date?.let { Math.round((it.time - startOfToday().time).toDouble() / DAY_MS) } ?: -1L
      // A passed event means the snapshot is out of date until the app writes a new one.
      if (date == null || days < 0) {
        quiet(context, views, true)
        return views
      }
      val trial = event.optString("kind") == "trial_end"
      val accent = if (trial) TRIAL_BLUE else if (days == 0L) CORAL else MINT
      val price = event.optString("amount").toDoubleOrNull()
      val amount = when {
        !event.optBoolean("expected_charge", true) -> "Auto-renew off"
        price != null -> "${event.optString("currency")} ${String.format(Locale.US, "%.2f", price)}"
        else -> "Amount not set"
      }
      val whenText = when (days) { 0L -> "Today"; 1L -> "Tomorrow"; else -> "In $days days" }
      val more = snapshot.optInt("more", 0)
      val name = event.optString("name")

      views.setViewVisibility(R.id.event_block, View.VISIBLE)
      views.setViewVisibility(R.id.quiet_block, View.GONE)
      views.setViewVisibility(R.id.quiet_art, View.GONE)
      views.setInt(R.id.dot, "setColorFilter", accent)
      views.setTextViewText(R.id.eyebrow, if (trial) "TRIAL ENDING" else if (days == 0L) "DUE TODAY" else "NEXT RENEWAL")
      views.setTextColor(R.id.eyebrow, accent)
      views.setViewVisibility(R.id.more, if (more > 0) View.VISIBLE else View.GONE)
      views.setTextViewText(R.id.more, "+$more")
      val logo = context.resources.getIdentifier("widget_platform_${event.optString("platform_id")}", "drawable", context.packageName)
      views.setViewVisibility(R.id.logo, if (logo != 0) View.VISIBLE else View.GONE)
      if (logo != 0) views.setImageViewResource(R.id.logo, logo)
      views.setTextViewText(R.id.name, name)
      views.setTextViewText(R.id.amount, amount)
      views.setTextViewTextSize(R.id.amount, android.util.TypedValue.COMPLEX_UNIT_SP, if (amount.length > 12) 14f else 22f)
      views.setTextViewText(R.id.line, "$whenText · ${SimpleDateFormat("d MMM", Locale.UK).format(date)}")
      val verb = if (trial) "Trial ends" else "Renews"
      val timing = when (days) { 0L -> "$verb today"; 1L -> "$verb tomorrow"; else -> "$verb in $days days" }
      val fullDate = SimpleDateFormat("d MMM yyyy", Locale.UK).format(date)
      views.setContentDescription(
        R.id.widget_root,
        "$name. $timing, $fullDate${if (event.optBoolean("estimated")) ", estimated date" else ""}. $amount" +
          "${if (trial && event.optBoolean("expected_charge", true)) " after trial" else ""}${if (more > 0) ". And $more more on this day" else ""}. Open subscription",
      )
      views.setOnClickPendingIntent(R.id.widget_root, open(context, "renewless://subscription/${Uri.encode(event.optString("subscription_id"))}"))
      return views
    }
  }
}
