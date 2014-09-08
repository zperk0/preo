#!/bin/bash          

basePath=''
mTime=0


while getopts "h?p:t:" opt; do
    case "$opt" in
    h|\?)
        echo 'ha'
        exit 0
        ;;
    p)  basePath=$OPTARG				
        ;;
    t)  mTime=$OPTARG
        ;;
    esac
done

if [ -z "$basePath" ]; then
	echo 'Please set the path using -p'
	exit 1
fi

find $basePath -type f -mtime +$mTime -exec rm {} \;
echo "Deleted files last updated $mTime days ago from: $basePath"
