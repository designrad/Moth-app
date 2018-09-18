**Install and maintenance (on Android)**

1. _Clone project, if needed:_ 
    `git clone https://github.com/designrad/Moth-app.git`

2. _(Make changes, if needed:)_
    `npm install`
    
3. _(Change versionCode and versionName in android/app/build.gradle (ca line 100-101 by incrementing +1:)_
        
4. _Install requirements:_
    `npm install`
    
5. _Create signed APK bundle on terminal:_
    - add keystore passwords to android/gradle.properties
    - run in android directory: `./gradlew assembleRelease`
    - removed password, so not to accidentally push to github
    
6. _If you prefer, you can generate signed APK also in Android Studio:_
    - open android in Android Studio
    - select Build / Generate Signed APK
    - use correct keystore and key..

7. _Create new Release in Google Play Console, Release Dashboard_
    https://play.google.com/apps/publish/
    
8. _Commit and push any changes to Github:_
    `git commit -am 'YOUR COMMENT HERE'`
    `git push -u origin master`
    
Good luck!

PS. From Oct 2018, all updates need to target targetSdkVersion 26 or higher. Update in Sep 2018 was still done with v23. V26 seems to mess up Android 8.0.0 map (Samsung S8) so that it won't show markers.
