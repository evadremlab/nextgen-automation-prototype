module.exports = function (config) {
  'use strict';

  config.set({
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,

      // base path, that will be used to resolve files and exclude
      // basePath: '../',

      // testing framework to use (jasmine/mocha/qunit/...)
      frameworks: ['jasmine'],

      files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/underscore/underscore.js',
        'bower_components/angular-smart-table/dist/smart-table.min.js',
        'bower_components/stacktrace-js/stacktrace.js',
        'bower_components/sprintf/src/sprintf.js',
        'bower_components/angular-resource/angular-resource.js',
        'js/accela/globals.js',
        'js/**/*.js',
        'tests/unit/**/*.js',
        { pattern: 'mock-api/**/*.json', watched: true, served: true, included: false }
      ],

      preprocessors: {
        'js/**/*.js': 'coverage'
      },

      // list of files / patterns to exclude
      exclude: [
        'js/**/UNUSED/*.js',
        'js/vendor/*.js'
      ],

      // web server port
      port: 8080,

      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: [
        'Chrome'
      ],

      // Which plugins to enable
      plugins: [
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-coverage'
      ],

      reporters: ['coverage','dots'],

      coverageReporter: {
        type: 'html',
        dir: 'coverage/'
      },

      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: true,

      colors: true,

      // level of logging
      // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
      logLevel: config.LOG_WARN

      // Uncomment the following lines if you are using grunt's server to run the tests
      // proxies: {
      //   '/': 'http://localhost:9000/'
      // },
      // URL root prevent conflicts with the site root
      // urlRoot: '_karma_'
    }
  );
};
