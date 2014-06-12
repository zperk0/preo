var fs = require('fs');
var path = require('path');
var wrench = require("wrench");


module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {      
      build: {
        options: {
          beautify: grunt.option('nomin')
        },
        src: ['js/foundation/foundation.js','js/foundation/foundation.alerts.js','js/foundation/foundation.cookie.js','js/foundation/foundation.dropdown.js',
              'js/foundation/foundation.forms.js', 'js/foundation/foundation.placeholder.js','js/foundation/foundation.reveal.js','js/foundation/foundation.section.js',
              'js/foundation/foundation.tooltips.js','js/foundation/foundation.topbar.js','js/foundation/foundation.datepicker.js','js/foundation/foundation.abide.js',
              'js/jquery.noty-full-min.js','js/jsColor/jscolor.js','js/form.js','js/tweet.js','js/timepicker.js','js/jquery-ui-1.10.3.custom.min.js',              
              'js/autoNumeric.js','js/multi-select.js','js/tableSlide.js','js/js-actual.js','js/googleplus.js','js/general.js'],
        dest: 'js/all_scripts.min.js'
      },
      angular:{
        options: {
          beautify: grunt.option('nomin')
        },
        src: ['bower_components/angular/angular.min.js','bower_components/angular-resource/angular-resource.min.js',
              'bower_components/angular-route/angular-route.min.js'],
        dest: 'js/angular_all.min.js'
      }
    },
    cssmin: {
      minify: {              
        src: ['css/normalize.css', 'css/foundation.css', 'css/app.css'],
        dest: 'css/all_css.min.css',        
      }
    },
    replace: {
      fonts: {
        src: ['css/all_css.min.css'],            
        overwrite: true,
        replacements: [{
          from: 'url(maven',                   
          to: 'url(../fonts/Maven/maven'
        },{ 
          from: 'url(fonts/new/',              
          to: 'url(../fonts/helvetica-neue/fonts/new/'
        },{ 
          from: 'url(icomoon',                 
          to: 'url(../fonts/pd-fonts/icomoon'
        }]
      },
      jscolor:{
        src:['js/all_scripts.min.js'],
        overwrite:true,
        replacements:[{
          from:"jscolor/",
          to: "js/jsColor/"

        }]        
      }
    },
    watch: {      
      js: {
        files: ['js/**/*.js'],
        tasks: ['minifyjs'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scss:{
        files: ['css/*.scss'],
        tasks: ['sass','minifycss','clean:appCss'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      php:{
        files:['**/*.php'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    sass: {
     dist: {
        files: {
          'css/app.css': 'css/app.scss'
        }
      }
    },
   clean:{      
      options:{
        force:true,
      },
      appCss:{
        src:["css/app.css"]
     }
   }
});


  grunt.registerTask('jstranslate',"Read all js files and extract strings that need to be translated",function(){
        var usedStrings ={};        
        var file_str = ""+
        ""+
        "<?php session_start();"+
        "  require_once('lang.php');"+ //need this for multi-language support
        "?>\n\n"+
          "function _tr(str){\n"+
         "\tvar trans=Dictionary[str];\n"+
          "\treturn trans !==undefined ? trans : str;\n"+
          "} \n"+
          "\n"+
          "var Dictionary = { \n";
        var all = wrench.readdirSyncRecursive("code");
        var allJs = ["js/general.js"];
        for (var i=0;i<all.length;i++){
            var file = all[i];
            if (file.indexOf(".js") === (file.length-3))
              allJs.push("code/"+file)
        }
        for (var i=0;i<allJs.length;i++){
          var filePath = allJs[i];
          var data = fs.readFileSync(filePath, {encoding: 'utf-8'})                
          var regex = /_tr\(.*?\)/g; 
          var result;          
          while ( (result = regex.exec(data)) ) {                                                        
                var str =result[0].slice(5,-2);              
                grunt.log.writeln(str);
                if (usedStrings[str] ===undefined){              
                  if (str != ""){                                    
                    file_str+= '\t"'+str+'":<? echo json_encode(_("'+str+'")) ?>,\n'
                    usedStrings[str] = true;
                  }
                }
          }      
        }
        file_str+= "}\n";
        fs.writeFileSync('code/shared/js_strings.php', file_str);            
  })

  grunt.registerTask('watcher',[
      'build',
      'watch'
    ])

  grunt.registerTask('minifyjs', ['uglify:build','uglify:angular','replace:jscolor']);
  grunt.registerTask('minifycss', ['sass','cssmin','clean:appCss','replace:fonts']);  
  grunt.registerTask('build', ['minifyjs','minifycss']);
  grunt.registerTask('default', ['watcher']);

};
