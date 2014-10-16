(function() {
  'use strict';

  angular
    .module('nextgen')
    .factory('HttpInterceptor', httpInterceptor);

  /**
   * @ngInject
   */
  function httpInterceptor($rootScope, $log, $q, LoggingService) {

    // CONSTRUCTOR

    activate();

    // PUBLIC interface

    return {
      requestError: rejected,
      responseError: rejected,
      response: success
    };

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('HTTP-INTERCEPTOR');
    }

    function broadcast(eventName, data) {
      $log.info('broadcast(' + eventName + ')');

      $rootScope.$broadcast(eventName, data);
    }

    function formatRejectedError(rejection) {
     if (rejection.fileName) {
        return rejection.message;
      } else {
        return sprintf('%s %s - %s', rejection.status, rejection.statusText, rejection.config.url);
      }
    }

    function formatStatusCodeError(status, config) {
      var msg = sprintf('%s on "%s"', status.code, config.url);

      if (status.error) {
        msg += sprintf(' : "%s"', status.error);
      }

      return msg;
    }

    function rejected(rejection) {
      // TODO: hide any ajax spinners
      //$('.ajax-spinner').addClass('ng-hide');

      // TODO: ignore unit testing errors
      // ie: containing 'Unexpected request'

      rejection.customErrorMessage = formatRejectedError(rejection);

      $log.warn(rejection.customErrorMessage);

      LoggingService.sendToServer(rejection.customErrorMessage);

      return $q.reject(rejection);
    }

    function success(response) {
      var status = response.data.status;
      var content = response.data.content || {};
      var broadcasts = response.data.broadcast || [];

      if (status) {
        if (status.code === 'OK') {
          _.each(broadcasts, function(msg) {
            broadcast(msg, content);
          });
        } else {
          response.customErrorMessage = formatStatusCodeError(status, response.config);
        }
      }

      return response;
    }
  }
})();
