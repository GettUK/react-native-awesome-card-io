here=$PWD

# 4 ups if running this script from ote_app
# 2 ups if running this scripr locally

if [ -d "$PWD/../../../../card.io-Android-source/" ]; then
    cd "$PWD/../../../../card.io-Android-source"
elif [ -d "$PWD/../../card.io-Android-source/" ]; then
    cd "$PWD/../../card.io-Android-source"
elif [ -d "$PWD/../card.io-Android-source/" ]; then
    cd "$PWD/../card.io-Android-source"
else
    cd "$PWD/card.io-Android-source"
fi

./gradlew assembleRelease

rm $here/android/aars/card.io.aar
cp ./card.io/build/outputs/aar/card.io-release.aar $here/android/aars/card.io.aar
