/*
 * grunt-unreadable
 * https://github.com/JamieMason/grunt-unreadable
 *
 * Copyright (c) 2013 JamieMason
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    unreadable: {
      test_fixtures: {
        options: {
          baseUrl: 'http://localhost:8765/'
        },
        files: [{
          expand: true, // enable dynamic expansion.
          cwd: 'test/fixtures', // src matches are relative to this path.
          src: ['**/*.html'], // actual pattern(s) to match.
          dest: 'tmp/', // destination path prefix.
          ext: '.min.html' // dest filepaths will have this extension.
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'unreadable', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
