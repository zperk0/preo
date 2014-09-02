#/usr/bin
echo =======================START=======================

#
DIR=$(dirname $0)

POT=$DIR/messages.pot

pushd $DIR
cd ..

ROOT=$(pwd)

grunt jstranslate

popd

echo $ROOT
echo Generating php file list /tmp/listfile.txt
find $ROOT | grep .php > /tmp/listfile.txt
echo Generating .POT file - $POT
xgettext -n -L PHP --no-wrap -f /tmp/listfile.txt -o $POT --from-code=UTF-8

echo Generating po files
find $DIR -name \*.po -exec msgmerge -U {} $POT \;

echo Generating mo files
find $DIR -name \*.po -execdir msgfmt -cv {} \;

echo Deleting unrequired and temp files
rm /tmp/listfile.txt

echo ========================END========================