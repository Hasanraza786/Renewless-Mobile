# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# WorkManager's Room database is created by reflection (WorkDatabase_Impl); R8 must not remove or rename it.
-keep class * extends androidx.room.RoomDatabase { <init>(); }

# react-native-config reads the .env values from BuildConfig fields by reflection.
-keep class com.renewless.BuildConfig { *; }
