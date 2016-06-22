var path = require("path");
var fs = require('fs');

var exclude = ['node_modules','index.js', 'constants', 'webpack', 'karma', 'app.js']
var ext = '.js';
var count = 0;
var countNot = 0;
var copyRecursiveSync = function(src) {

  count++;
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  var found = false;
  exclude.forEach((e)=>{
    if (src.indexOf(e) !== -1){
      found = true;
    }
  })

  if (found)
    return;
  if (exists && isDirectory) {
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName));
    });
  } else {
    if (!src.endsWith(ext)){
      return;
    }
    findString(src,'ngInject";')
  }
};

function findString(src, searchString){
  fs.readFile(src, function (err, data) {
    if (err) throw err;
    if(data.indexOf(searchString) < 0){
     countNot++;
     console.log(" **** \"ngInject\"; not found in: ", src);
    }
});
}

copyRecursiveSync(".");