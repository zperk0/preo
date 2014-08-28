@echo off
echo =======================START=======================
echo Renaming old PO file (messages.po to old.po)
ren messages.po old.po
echo Generating new file list (-tempFolder-\listfile.txt)
dir ..\..\..\*.php /L /B /S > %TEMP%\listfile.txt
echo Generating new .POT file (new.po)
xgettext -n -L PHP --no-wrap -f %TEMP%\listfile.txt -o new.po
echo Combining old.po and new.po to messages.po
msgmerge old.po new.po --output-file=messages.po
echo Converting new messages.po to messages.mo
msgfmt -cv messages.po
echo Deleting unrequired and temp files
del %TEMP%\listfile.txt
del old.po
del new.po
echo ========================END========================