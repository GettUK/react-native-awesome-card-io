# build ios library
here=$(dirname "$0")

# expects ios sources to be on bottom level
rm -rf ./ios/CardIO
mkdir ./ios/CardIO

cd ../card.io-iOS-source

fab build:outdir=$here

cd $here


new_lib_folder=card.io_ios_sdk

cp -rf $here/$new_lib_folder/CardIO $here
rm -rf $here/$new_lib_folder
