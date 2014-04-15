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
    }
});
//TODO fix the relative path for fonts while minifying

  grunt.registerTask('build', ['uglify','cssmin']);
  grunt.registerTask('minifycss', ['cssmin']);
  grunt.registerTask('default', ['build']);

};
