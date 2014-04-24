var fs = require('fs');
var path = require('path');


module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {      
      build: {
        src: ['js/vendor/zepto.js','js/foundation/foundation.js','js/foundation/foundation.alerts.js','js/foundation/foundation.cookie.js','js/foundation/foundation.dropdown.js',
              'js/foundation/foundation.forms.js', 'js/foundation/foundation.placeholder.js','js/foundation/foundation.reveal.js','js/foundation/foundation.section.js',
              'js/foundation/foundation.tooltips.js','js/foundation/foundation.topbar.js','js/foundation/foundation.datepicker.js','js/foundation/foundation.abide.js',
              'js/jquery.noty-full-min.js','js/jsColor/jscolor.js','js/form.js','js/tweet.js','js/timepicker.js','js/jquery-ui-1.10.3.custom.min.js',
              'js/multi-select.js','js/tableSlide.js','js/js-actual.js','js/googleplus.js','js/general.js'],
        dest: 'js/all_scripts.min.js'
      }
    },
    cssmin: {
      minify: {              
        src: ['css/normalize.css', 'css/foundation-icons.css','css/foundation.css', 'css/font-awesome.css','fonts/Maven/maven.css',
              'fonts/helvetica-neue/style.css', 'fonts/pd-fonts/pd-style.css','css/jsMiniColors/jsminicolors.css','css/tweet-list.css',
              'css/date-time.css','css/multi-select.css','css/app.css'],
        dest: 'css/all_css.min.css',        
      }
    },
    replace: {
      fonts: {
        src: ['css/all_css.min.css'],             // source files array (supports minimatch)\
        overwrite: true,
        replacements: [{
          from: 'url(maven',                   // string replacement
          to: 'url(../fonts/Maven/maven'
        },{ 
          from: 'url(fonts/new/',                   // string replacement
          to: 'url(../fonts/helvetica-neue/fonts/new/'
        },{ 
          from: 'url(icomoon',                   // string replacement
          to: 'url(../fonts/pd-fonts/icomoon'
        }]
      },
      jscolor:{
        src:['js/all_scripts.min.js'],
        overwrite:true,
        replacements:[{
          from:"jscolor/",
          to: "js/jscolor/"

        }]        
      }
    }
});

  grunt.registerTask('jstranslate',"Read general.js and extract strings that need to be translated",function(){
        var file_str = ""+
          "<script>\n"+
          "function _tr(str){\n"+
          " console.log(str,Dictionary[str])\n"+
          "\treturn Dictionary[str];\n"+
          "} \n"+
          "\n"+
          "var Dictionary = { \n";
        var filePath = path.join("js",'/general.js');
        var data = fs.readFileSync(filePath, {encoding: 'utf-8'})                
        var regex = /_tr\(.*?\)/g; 
        var result;
        var usedStrings ={};        
        while ( (result = regex.exec(data)) ) {                                        
              
              var str =result[0].slice(5,-2);              
              var tmpstr = str.replace(/'/g, "\\'")
              tmpstr = tmpstr.replace(/"/g, '\\"')
              grunt.log.writeln(tmpstr);
              if (usedStrings[str] ===undefined){              
                if (str != ""){                                    
                  file_str+= '\t"'+str+'":\'<? echo _("'+tmpstr+'") ?>\',\n'
                  usedStrings[str] = true;
                }
              }
        }      
        
        file_str+= "}\n"+ "</script>";
        fs.writeFileSync('code/shared/js_strings.php', file_str);            
  })


  grunt.registerTask('minifyjs', ['uglify','replace:jscolor']);
  grunt.registerTask('minifycss', ['cssmin','replace:fonts']);  
  grunt.registerTask('build', ['minifyjs','minifycss']);
  grunt.registerTask('default', ['build']);

};
