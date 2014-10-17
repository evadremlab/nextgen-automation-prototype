# nextgen-automation-prototype

For prototyping the javascript framework requirements for the nextgen console.

Version
---
0.10.17

Prerequisites
---
* [NodeJS](http://nodejs.org/) - for server-side package management, and to enable Grunt build automation
* [Bower](http://bower.io/) - for client-side package management

Tech
---
Uses a number of open source projects:

* [AngularJS](https://angularjs.org/) - JavaScript MVC framework.
* [angular-ui-router](https://github.com/angular-ui/ui-router) - provides flexible routing with nested views.
* [angular-bootstrap](http://angular-ui.github.io/bootstrap/) - AngularJS version of Twitter Bootstrap without jQuery or Bootstrap dependencies.
* [bootstrap-css-only](https://github.com/fyockm/bootstrap-css-only) - to provide css and font resources to angular-bootstrap.
* [angular-smart-table](https://github.com/lorenzofox3/Smart-Table) - provides table sorting, filtering and pagination.
* [sprintf](https://github.com/alexei/sprintf.js) - sprintf implementation for the browser and node.js.
* [underscore](http://underscorejs.org/) - provides collection, array and utility functions.
* [stacktrace](https://github.com/stacktracejs/stacktrace.js/) - Framework-agnostic, micro-library for getting stack traces in all web browsers.
* [Grunt](http://gruntjs.com/) - for build automation.
    * [LESS](http://lesscss.org/) - to enhance our CSS development experience.
    * [JSHint](http://www.jshint.com/docs/) - to ensure consistent coding practices.
    * [WireDep](https://github.com/stephenplusplus/grunt-wiredep) - to inject Bower packages into the source code with Grunt.
    * [LiveReload](http://livereload.com/) - to reload browser when watched files change.

Initial Steps
---
(to be performed in the directory in which you cloned the repo)
```
npm install -g grunt-cli
npm install
bower install
grunt
```
