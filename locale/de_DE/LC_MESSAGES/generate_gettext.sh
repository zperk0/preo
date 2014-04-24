#/usr/bin
echo =======================START=======================

#three levels above to get the root webapp folder
DIR=$(dirname $PWD)
DIR=$(dirname $DIR)
DIR=$(dirname $DIR)

echo $DIR
if [ -f ./messages.po ]  
then
	echo Renaming old PO file - messages.po to old.po
 	mv messages.po old.po
fi
echo Generating new file list /tmp/listfile.txt
find $DIR | grep .php > /tmp/listfile.txt
echo Generating new .POT file - new.po
xgettext -n -L PHP --no-wrap -f /tmp/listfile.txt -o new.po --from-code=UTF-8

if [ -f old.po ] && [ -f new.po ] 
then
	echo Combining old.po and new.po to messages.po
	msgmerge old.po new.po --output-file=messages.po 
else
	echo not Combining old.po and new.po to messages.po
	mv new.po messages.po
fi 

echo Converting new messages.po to messages.mo
msgfmt -cv messages.po

echo Deleting unrequired and temp files
rm /tmp/listfile.txt
[ -f old.po ] && rm old.po
[ -f new.po ] && rm new.po
echo ========================END========================