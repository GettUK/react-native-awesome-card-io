How to update source in real project?
- download projects under one common folder

1. OTE app
2. react-native-awesome-card-io
3. awesome-Card-IO-Android-source
4. awesome-Card-IO-ios-source

[if you have changed source files follow 5-8]

5. Setup awesome-Card-IO-Android-source: follow all instructions provided for repo
6. Setup awesome-Card-IO-ios-source: follow all instructions provided for repo(you should be able to run and build icc app successfully)

7. if you correctly setup android and ios forks, just run "react-native-awesome-card-io/prepare-custom-dependencies.sh"
8. build OTE app(it will automatiacally pickup updated source files and will build new static libaries)


PS you can use "yarn ios" and "yarn android" to run apropriate platforms



WARNING: you need to compile ios library as far as it is not possible to commit file large than 100 MB!!!
