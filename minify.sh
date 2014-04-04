#!/bin/bash  
echo "Initializing..."
echo ""
timestamp="$(date +"%s")" #current timestamp
appPath="./" #root path for the webapp
footerFileName="inc/shared/f.php" #path and name of footer file
headerFileName="inc/shared/meta.php" #path and name of header file
echo "Current Timestamp: ${timestamp}"
echo ""
echo "App root: ${appPath}"
echo ""
echo "Starting with Footer file (JS)..."
echo ""
echo "Footer file: ${appPath}${footerFileName}"
echo ""
currentJS=$(grep -oh 'js\/foundation_reqPlugins_allplugins_min_AND_general.*\.js' ${appPath}${footerFileName})
if [ "${currentJS}" != ""  ]
then
	echo "Current JS file: ${appPath}${currentJS}"
else
	currentJS=$(grep -oh 'cache\/foundation_reqPlugins_allplugins_min_AND_general.*\.js' ${appPath}${footerFileName})
	echo "Current JS file: ${appPath}${currentJS}"
fi
echo ""
newJS="cache/foundation_reqPlugins_allplugins_min_AND_general_${timestamp}.js"
echo "Minifying..."
echo ""
java -jar yuicompressor-2.4.8.jar "${appPath}${currentJS}" -o ${appPath}${newJS}
echo "New JS file: ${appPath}${newJS}"
echo ""
echo "Updating ${appPath}${footerFileName}"
echo ""
#newJS=${newJS//\//\\\/} #escape all / as its being used in regex below #we can skip this as we are using @ as the delimiter below
sed -i -r s@\(js\|cache\)/foundation_reqPlugins_allplugins_min_AND_general.*\.js@${newJS}@ ${appPath}${footerFileName}
echo "JS file minified, saved and ${appPath}${footerFileName} has been updated"
echo ""
echo "Starting with Header file (CSS)..."
echo ""
echo "Header file: ${appPath}${headerFileName}"
echo ""
currentCSS=$(grep -oh 'css\/normalize-foundationMIN_and_dependantsMIN_and_app.*\.css' ${appPath}${headerFileName})
if [ "${currentCSS}" != "" ]
then
	echo "Current CSS file: ${appPath}${currentCSS}"
else
	currentCSS=$(grep -oh 'cache\/normalize-foundationMIN_and_dependantsMIN_and_app.*\.css' ${appPath}${headerFileName})
	echo "Current CSS file: ${appPath}${currentCSS}"
fi
echo ""
newCSS="cache/normalize-foundationMIN_and_dependantsMIN_and_app_${timestamp}.css"
echo "Minifying..."
echo ""
java -jar yuicompressor-2.4.8.jar "${appPath}${currentCSS}" -o ${appPath}${newCSS}
echo "New CSS file: ${appPath}${newCSS}"
echo ""
echo "Updating ${appPath}${headerFileName}"
echo ""
#newCSS=${newCSS//\//\\\/} #escape all / as its being used in regex below #we can skip this as we are using @ as the delimiter below
sed -i -r s@\(css\|cache\)/normalize-foundationMIN_and_dependantsMIN_and_app.*\.css@${newCSS}@ ${appPath}${headerFileName}
echo "CSS file minified, saved and ${appPath}${headerFileName} has been updated"
echo ""
echo "All required files are now minified and the necessary source files have been updated successfully."
echo ""