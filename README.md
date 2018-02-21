## OTE MOBILE

#### Tool Setup

1. `sudo npm install -g react-native-cli`
2. `sudo gem install cocoapods`
3. `brew install yarn`


#### Project Setup

1. `git pull git@github.com:GettUK/ote_app.git gett_ote_app`
2. `cd gett_ote_app` 
3. `yarn`
4. `cd ios && pod install`

#### Development 

- `yarn run haul` to start the server
- `yarn run haul bundle` to bundle the project

- `react-native run-ios` to launch the iOS simulator
- `react-native run-android` to launch the Android simulator (but it should be open with Android Studio in advance)
- `react-native run-android --deviceId [ID]` to launch the Android device by ID (which could be found by `adb devices` command)

#### Troubleshooting (iOS)

1. `git pull orgin dev`
2. `git reset --hard` 
3. `rm -rf node_modules ios/Pods ios/build yarn.lock`
4. `yarn cache clean`
5. `yarn`
6. `cd ios && pod install`

#### Minimal versions required

1. `react-native-cli` - 2.0.1
2. `cocoapods` - 1.4.0
3. `yarn` - 1.3.2

