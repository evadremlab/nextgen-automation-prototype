'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  function loadTaskOptions(path) {
    var glob = require('glob'),
      taskOptions = {},
      key;

    glob.sync('*', {cwd: path}).forEach(function (option) {
      key = option.replace(/\.js$/, '');
      taskOptions[key] = require(path + option);
    });

    return taskOptions;
  }

  // load options automatically
  grunt.initConfig(loadTaskOptions('./build/tasks/'));

  grunt.registerTask('default', [
    'wiredep',
    'jshint:app',
//    'karma:unit',
    'less:css',
//    'autoprefixer:css',
//    'ngAnnotate:app',
    'concurrent:dev'
  ]);

  grunt.registerTask('docs', [
    'ngdocs'
  ]);
};
