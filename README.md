**Install and maintenance (on Android)**

1. _Clone project:_ 
    `git clone https://github.com/designrad/Moth-app.git`

2. _(Make changes if needed:)_
    `npm install`
    
3. _(Change versionCode and versionName in build.gradle by incrementing +1:)_
        
4. _Install requirement:_
    `npm install`
    
5. _Create bundle on terminal:_
    in android directory: `./gradlew assembleRelease`
    
6. _Generate signed APK in Android Studio:_
    - open android in Android Studio
    - select Build / Generate Signed APK
    - use correct keystore and key..

7. _Create new Release in Google Play Console, Release Dashboard_
    https://play.google.com/apps/publish/
    
8. _Commit and push any changes to Github:_
    `git commit -am 'YOUR COMMENT HERE'`
    `git push -u origin master`
    
Good luck!

   
   
