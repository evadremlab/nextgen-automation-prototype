(function() {
  'use strict';

  angular
    .module('nextgen')
    .factory('StacktraceService', function() {
      return {
        print: printStackTrace // assumes stacktrace library has already been loaded
      }
    });
})();
