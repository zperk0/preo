#/usr/bin
echo =======================START=======================

#
DIR=$(dirname $0)

pushd $DIR
cd ..

ROOT=$(pwd)
POT=$ROOT/locale_angular/angular_gettext.pot

popd

echo $ROOT

echo Generating angular-gettext po files
find $DIR/locale_angular -name \*.po -exec msgmerge -U {} $POT \;

echo ========================END========================