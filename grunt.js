module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    unreadable: {
      baseUrl: 'http://localhost:8765',
      src: ['html/**/*.html'],
      dest: 'dest'
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'unreadable');

};
