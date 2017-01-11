var fs = require('fs');
var pjson = require('../package.json');
var archiver = require('archiver');
var archive = archiver('zip');
var output = '.zip';

var fileName =   './build/'+pjson.name+"."+pjson.version+output;

var fileOutput = fs.createWriteStream(fileName);


fileOutput.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.pipe(fileOutput);
archive.glob("./dist/**/!(*.js.map)");
archive.glob("./dist/.htaccess");
archive.on('error', function(err){
    throw err;
});

archive.finalize();

