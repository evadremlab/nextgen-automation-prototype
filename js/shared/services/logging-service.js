(function() {
  'use strict';

  angular
    .module('nextgen.logging', [
      'nextgen.config'
    ])
    .config(function ($provide, CONFIG) {
      $provide.decorator('$log', function ($delegate) {
        return enhancedLogger($delegate, CONFIG);
      });
    })
    .factory('LoggingService', service);

  /**
   * @ngInject
   */
  function service($log, $window, StacktraceService, CONFIG) {

    // CONSTRUCTOR

    activate();

    // PUBLIC interface

    return {
      exceptionHandler: exceptionHandler,
      sendToServer: sendToServer
    };

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('LOGGING-SERVICE');
    }

    function createXHRObject() {
      try {
        return new XMLHttpRequest();
      } catch (e) {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (e) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (e) {
            throw new Error('No XHR object found in this environment.');
          }
        }
      }
    }

    function exceptionHandler(exception, cause) {
      // NOTE: In production, add some debouncing
      // logic here to prevent the same client from
      // logging the same error over and over again.
      try {
        var message = exception.toString();
        var stackTrace = StacktraceService.print({ e: exception });

        $log.warn(message);

        sendToServer(message, stackTrace, cause);

      } catch (e) {
        if (console && console.warn) {
          console.warn('Error logging failed : ' + e.message);
        }
      }
    }

    function sendToServer(message, stacktrace, cause) {
      if (CONFIG.LOG_CLIENT_ERRORS) {
        writeLog({
          message: message,
          stacktrace: stacktrace || '',
          cause: cause || ''
        });
      }
    }

    /**
     * Send error details to the server using XMLHttpRequest
     * instead of $http, to avoid a circular dependency.
     */
    function writeLog(jsonData) {
      var xhr = createXHRObject();
      var endPoint = 'logClientError';
      var url = CONFIG.USE_MOCK_SERVICES ? sprintf('mock-api/error/%s.json', endPoint) : endPoint;

      jsonData.url = $window.location.href;

      xhr.open('POST', url, true); // async request
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(JSON.stringify(jsonData));
    }
  }

  // SEE: http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/

  function enhancedLogger(log, config) {
    var logEnabled = (config.CONSOLE_LOGGING_ENABLED);

    var _$log = { // capture the original methods
      log   : (logEnabled ? log.log : angular.noop),
      info  : (logEnabled ? log.info : angular.noop),
      debug : (logEnabled ? log.debug : angular.noop),
      warn  : log.warn,
      error : log.error
    };

    function prepareLogFn(logFn, prefix) {

      var enhancedLogFn = function() {
        var args = [].slice.call(arguments);

        if (prefix) { // prepend an optional prefix to the original message
          args[0] = prefix + ' : ' + args[0];
        }

        // invoke $log method with our prefixed message
        logFn.apply(null, args);
      };

      // add support for angular-mocks expectations
      enhancedLogFn.logs = [];

      return enhancedLogFn;
    }

    // add a new $log method returning an extended $log

    log.getInstance = function(prefix) {
      var logInstance = {
        log: prepareLogFn(_$log.log, prefix),
        info: prepareLogFn(_$log.info, prefix),
        debug: prepareLogFn(_$log.debug, prefix),
        warn: prepareLogFn(_$log.warn, prefix),
        error: prepareLogFn(_$log.error, prefix)
      };

      logInstance.debug('created');

      return logInstance;
    };

    return log;
  }
})();
