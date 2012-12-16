/*
 * grunt-unreadable
 * https://github.com/JamieMason/grunt-unreadable
 *
 * Copyright (c) 2012 Jamie Mason
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  grunt.registerTask('unreadable', 'An intelligent/CSS-aware HTML Minifier and Optimizer', function() {
    var fs = require('fs');
    var path = require('path');
    var opts = grunt.config('unreadable');
    var files = grunt.file.expandFiles(opts.src);
    var destDir = path.resolve(opts.dest) + '/';
    var baseUrl = opts.baseUrl;
    var done = this.async();
    var count = 0;

    if(baseUrl.charAt(baseUrl.length - 1) !== '/') {
      baseUrl = baseUrl + '/';
    }

    files.forEach(function(file) {
      var srcFile = path.resolve('./' + file);
      var destFile = destDir + file;
      var fileUrl = baseUrl + file;

      require('child_process').exec('unreadable --url ' + fileUrl + ' --output ' + destFile, function(error, stdout, stderr) {
        if(!error) {
          count++;
          grunt.log.writeln(stdout);
          if(count === files.length) {
            done();
          }
        } else {

        }
      });
    });
  });

};
