## OTE MOBILE

#### Tool Setup
```bash
sudo npm install -g react-native-cli
sudo gem install cocoapods
sudo gem install fastlane -NV
brew install yarn
```

#### Project Setup
```bash
git pull git@github.com:GettUK/ote_app.git gett_ote_app
cd gett_ote_app && yarn
cd ios && pod install && cd ..
```

#### Development
Metro-bundler considered to be default bundler for this project.
If you'd like to use Haul instead, you still can run it manually

- `yarn ios` to launch the iOS simulator and Metro-bundler server
- `yarn android` to launch the Android emulator (but it should be open with Android Studio in advance)
- `yarn android --deviceId [ID]` to launch the Android device by ID (which could be found by `adb devices` command)
- `yarn start` or `yarn cold-start` to start Metro-bundler server manually
- `yarn haul` to start the Haul-bundler server manually
- `yarn haul bundle` to bundle the project manually
- Xcode should automatically launch haul server on run/build/archive

#### Fastlane
To upload ios:
- `cd ios && bundle exec fastlane --verbose` to upload beta build
- you will be prompted for your apple id automatically when running fastlane
- add your `apple_id` to `ios/fastlane/Appfile` if you don't want to enter it every time

To upload android:
- add `android/fastlane/Google.json` which is obtained from google console or shared by app release managers
- `cd android && bundle exec fastlane --verbose` to upload android beta build

#### Troubleshooting bundler
In order to start Metro server without previously cached transformation better to use `yarn clear-cache` command.
After resetting cache with this command, please run `yarn android` or `yarn ios` again.

#### Troubleshooting iOS
If your iOS run/build/archive fails:
```bash
git pull orgin dev
git reset --hard
rm -rf node_modules ios/Pods ios/build
yarn cache clean
yarn
cd ios && pod install && cd ..
```

#### Troubleshooting Android
If you get location permission error:
- Install Android emulator of api level 22 or less (Android 5.1 or less)

If you get error about missing `index.delta`:
- Press `Cmd + M` in emulator to bring up dev menu
- Go to `Dev Settings`
- Switch off the experimental `Use JS Deltas` flag
- Go back to the error and double press `R` to reload

#### Minimal versions required

- `react-native-cli` - 2.0.1
- `cocoapods` - 1.4.0
- `yarn` - 1.3.2
