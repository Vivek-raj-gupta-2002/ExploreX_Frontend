package com.application.explorex

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.app.AppOpsManager
import android.os.Build
import android.util.Log
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
        try {
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
            val endTime = System.currentTimeMillis()
            val startTime = endTime - (24 * 60 * 60 * 1000)

            val stats: List<UsageStats> = usageStatsManager.queryUsageStats(
                UsageStatsManager.INTERVAL_BEST,
                startTime,
                endTime
            )

            if (stats.isEmpty()) {
                promise.reject("NO_DATA", "No usage data available for the past 24 hours")
                return
            }

            val appUsageMap = mutableMapOf<String, Long>()
            for (usageStat in stats) {
                val packageName = usageStat.packageName
                val timeVisible = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    usageStat.totalTimeVisible
                } else {
                    0L // Fallback for unsupported API levels
                }
                if (timeVisible > 0) {
                    appUsageMap[packageName] = appUsageMap.getOrDefault(packageName, 0) + timeVisible
                }
            }

            val topApps = appUsageMap.entries.sortedByDescending { it.value }.take(3)
            val result = WritableNativeMap()
            val totalTime = appUsageMap.values.sum()

            val topAppsMap = WritableNativeMap()
            for (entry in topApps) {
                topAppsMap.putInt(entry.key, (entry.value / (1000 * 60)).toInt())
            }

            result.putMap("topApps", topAppsMap)
            result.putInt("totalTime", (totalTime / (1000 * 60)).toInt())

            promise.resolve(result)
        } catch (e: Exception) {
            Log.e("ScreenTimeModule", "Error fetching screen time data", e)
            promise.reject("ERROR", "An error occurred: ${e.message}")
        }
    }
}
