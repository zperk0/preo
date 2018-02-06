var fs = require('fs');

function fixCss(inputData){
  var outputData = inputData.replace(/href=\"\/styling.css\"/g,'href="/v2/styling.css"')
  return outputData;
}


function fixJs(inputData){
  var lines = inputData.trim().split('\n');
  var importline = lines.slice(-2)[0];

  if (importline.indexOf("<script") === -1){
    throw Error("<script not found. line before last should be where js files are imported -- ", filename);
  }

  var replacedLine = importline.replace(/src=\"\//g,'src="/v2/')
  var outputData = inputData.replace(importline,replacedLine);
  return outputData;
}

function fixFile(filename){
  var tmpFilename = filename+".tmp";
  var data = fs.readFileSync(filename, "utf8");
  var outputData = fixJs(data);
  outputData = fixCss(outputData);
  fs.writeFileSync(tmpFilename,outputData);
  fs.unlinkSync(filename);
  fs.renameSync(tmpFilename,filename);
}

function fixFiles(){

  var filesToFix = [
    './dist/styling/index.php',
    './dist/outlets/index.php',
    './dist/events/index.php',
    './dist/payments/index.php',
    './dist/taxes/index.php',
    './dist/menus/index.php',
    './dist/venueSettings/index.php',
    './dist/manageUsers/index.php',
    './dist/manageGroups/index.php',
    './dist/notifications/index.php',
    './dist/updateExternalMenus/index.php'
  ];

  filesToFix.forEach(function(f){
    fixFile(f);
  })
}

fixFiles();
