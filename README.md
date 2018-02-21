#### Tool Setup
```bash
sudo npm install -g react-native-cli
sudo gem install cocoapods
brew install yarn
```

#### Project Setup
```bash
git pull git@github.com:GettUK/ote_app.git gett_ote_app
cd gett_ote_app && yarn
cd ios && pod install && cd ..
```

#### Development
- `react-native run-ios` to launch the iOS simulator
- `yarn run haul` to start the server
- `yarn run haul bundle` to bundle the project
- Xcode should automatically launch haul server on run

#### iOS Hard Reset :)
```bash
git pull orgin dev
git reset --hard
rm -rf node_modules ios/Pods ios/build
yarn
cd ios && pod install && cd ..
```
