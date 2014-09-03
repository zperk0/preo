#!/bin/bash          
basePath=$PREO_UPLOAD_ROOT
if [ -z "$basePath" ]; then
	basePath="/tmp"
fi
subPath="/menuitem/temp"
basePath+=$subPath
find $basePath -type f -mtime +0 -exec rm {} \;

