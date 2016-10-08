#!/bin/bash

cd /webappv2

VERSION=$(ruby -rjson -e 'j = JSON.parse(File.read("package.json")); puts j["version"]')

#install all dependeicies if not installed
npm install

#force jscore installation (will update in case of new version)
npm install jscore

bower install --allow-root

npm run release

rm -rf /var/www/html/*

cp -r ./dist/* /var/www/html
cp ./dist/.htaccess /var/www/html

tar -zcvf webapp_dist_$VERSION.tar.gz /webappv2/dist/

rm -Rf /webappv2/dist

service apache2 restart
