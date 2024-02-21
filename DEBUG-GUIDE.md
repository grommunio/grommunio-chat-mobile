# Android Mattermost to grommunio-chat transformation

## Run the app

- normally run via Android Studio

## Building the app

- get the keystore -> current keystore in `/Users/stefanakie/Desktop/grommunio-chat/Android/config-files/grommunio-keystore.keystore`
- get the keystore pwd -> see `/Users/stefanakie/Desktop/grommunio-chat/Android/config-files/gradle.properties`
- adjust `./android/gradle.properties` in project:
    ```
    MATTERMOST_RELEASE_STORE_FILE=/Users/stefanakie/Desktop/grommunio-chat/Android/config-files/grommunio-keystore.keystore
    MATTERMOST_RELEASE_KEY_ALIAS=grommunio-keystore
    MATTERMOST_RELEASE_PASSWORD=<secret>
    ```
- test if the app runs via `npm`: `npm run android` -> if not, look in the debug section

### Debug build

- [Mattermost Guide](https://developers.mattermost.com/contribute/more-info/mobile/build-your-own/android/)
  - `npm run build:android`
  - -> `./grommunio_chat.apk`

or

- [Medium Guide](https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51)
  - `react-native bundle --platform android --dev false --entry-file index.ts --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
  - `cd android`
  - `./gradlew assembleDebug`
  - -> `./android/app/build/outputs/apk/debug/app-debug.apk`

### Release build

- `react-native bundle --platform android --dev false --entry-file index.ts --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
- `cd android`
- `./gradlew assembleRelease`
- -> `./android/app/build/outputs/apk/debug/app-debug.apk`

- *Error: Duplicate resources* [Solution](#duplicate-resources)

  
## Debugging

### Refresh gradle dependencies

`rm -rf $HOME/.gradle/caches/` \
`cd android/` \
`./gradlew clean` \
`./gradlew --stop` \
`./gradlew --refresh-dependencies`

### Reinstall node modules

`rm -rf node_modules/` \
`npm run clean` \
`npm install` \

### Errors

#### INSTALL_FAILED_UPDATE_INCOMPATIBLE
> com.android.builder.testing.api.DeviceException: com.android.ddmlib.InstallException: INSTALL_FAILED_UPDATE_INCOMPATIBLE: Existing package com.grommunio.chat signatures do not match newer version; ignoring!
- uninstall app from phone
  
or

- Android Studio -> three dots -> Virtual Device Manager -> three dots -> Wipe Data
- start phone -> wait for it to boot correctly

#### Duplicate resources
> Error: Duplicate resources





