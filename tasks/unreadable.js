/*
 * grunt-unreadable
 * https://github.com/JamieMason/grunt-unreadable
 *
 * Copyright (c) 2013 JamieMason
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  'use strict';

  grunt.registerMultiTask('unreadable', 'Grunt plugin for Unreadable: an intelligent/CSS-aware HTML Minifier and Optimizer.', function() {

    // dependencies
    var childProcess = require('child_process');
    var fs = require('fs');
    var path = require('path');

    var filesProcessed = 0;
    var task = this;
    var done = task.async();

    var options = task.options({

    });

    var workingSet = {
      valid: [],
      invalid: [],
      isInvalid: function() {
        return this.invalid.length > 0;
      }
    };

    /**
     * @param  {String}  program
     * @param  {Function}  onComplete
     * @return {Boolean}
     */
    function isInstalled(program, onComplete) {
      childProcess.exec(program + ' --version', function(error, stdOut, stdErr) {
        onComplete(!error && stdOut && stdOut.search(/\s?[0-9]+\.[0-9]+\.[0-9]+\s?/) !== -1);
      });
    }

    /**
     * @param  {String} file
     * @return {String}
     */
    function getCliCommand(file) {
      return 'unreadable --url ' + file.src + ' --output ' + file.dest;
    }

    /**
     * @param  {Object} workingSet
     * @param  {Object} file
     * @return {Object}
     */
    function groupByValidity(workingSet, file) {
      (grunt.file.exists(file.src) ? workingSet.valid : workingSet.invalid).push(file);
      return workingSet;
    }

    /**
     * @param  {String} filePath
     * @return {String}
     */
    function toAbsolutePath(filePath) {
      return path.resolve(filePath) + (grunt.file.isDir(filePath) ? '/' : '');
    }

    /**
     * @param  {Object} file
     * @return {Object}
     */
    function prepareFile(file) {
      return {
        src: toAbsolutePath(file.src[0]),
        dest: toAbsolutePath(file.dest)
      };
    }

    /**
     * @param  {Object} file
     * @param  {Function} onComplete
     */
    function minify(file, onComplete) {
      childProcess.exec(getCliCommand(file), function(error, stdOut, stdErr) {
        if (error) {
          grunt.fail.warn('Command Line Error: "' + error.message + '"', 3);
        } else {
          grunt.log.writeln(stdOut);
        }
        onComplete();
      });
    }

    isInstalled('phantomjs', function(phantomjsIsInstalled) {
      if (!phantomjsIsInstalled) {
        grunt.fail.fatal('phantomjs is not installed', 3);
      } else {
        isInstalled('unreadable', function(unreadableIsInstalled) {
          if (!unreadableIsInstalled) {
            grunt.fail.fatal('unreadable is not installed', 3);
          } else {

            // task.files is a collection of arrays containing file paths.
            // convert this to a collection of absolute paths, grouped by validity.
            workingSet = task.files.map(prepareFile).reduce(groupByValidity, workingSet);

            // if any of the file paths are invalid, don't process any files
            if (workingSet.isInvalid()) {
              grunt.fail.warn(['Unable to reach'].concat(workingSet.invalid, '').join('\n'), 3);
              return;
            }

            // process all valid files
            workingSet.valid.forEach(function(file, ix, validFiles) {
              var isLastFile = (ix + 1) === validFiles.length;
              minify(file, function() {
                if (isLastFile) {
                  done();
                }
              });
            });

          }
        });
      }
    });

  });

};
