package com.application.explorex

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.app.AppOpsManager
import android.os.Build
import java.util.Calendar

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeMap

class ScreenTimeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenTimeModule"
    }

   @ReactMethod
    fun getScreenTimeData(promise: Promise) {
        val appOps = reactApplicationContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            appOps.unsafeCheckOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactApplicationContext.packageName)
        } else {
            appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactApplicationContext.packageName)
        }

        if (mode != AppOpsManager.MODE_ALLOWED) {
            val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            reactApplicationContext.startActivity(intent)
            promise.reject("PERMISSION_DENIED", "Usage access permission not granted")
            return
        }

        val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

        // Set start time to midnight of the current day
        val calendarStart = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }
        val startTime = calendarStart.timeInMillis

        // Set end time to midnight of the next day
        val calendarEnd = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
            add(Calendar.DAY_OF_MONTH, 1) // Move to the next day
        }
        val endTime = calendarEnd.timeInMillis

        val stats: List<UsageStats> = usageStatsManager.queryUsageStats(
            UsageStatsManager.INTERVAL_DAILY,
            startTime,
            endTime
        )

        // Map to store app usage times
        val appUsageMap = mutableMapOf<String, Long>()
        for (usageStat in stats) {
            appUsageMap[usageStat.packageName] = usageStat.totalTimeInForeground
        }

        // Sort the apps by total time in foreground and get the top 3
        val topApps = appUsageMap.entries.sortedByDescending { it.value }.take(3)

        // Prepare the result map
        val result = WritableNativeMap()
        val totalTime = appUsageMap.values.sum()

        // Add top apps to the result as app name -> time in seconds
        val topAppsMap = WritableNativeMap()
        for (entry in topApps) {
            topAppsMap.putDouble(entry.key, (entry.value / 1000).toDouble()) // convert to seconds
        }

        result.putMap("topApps", topAppsMap)
        result.putDouble("totalTime", (totalTime / 1000).toDouble()) // convert to seconds

        promise.resolve(result)
    }

}