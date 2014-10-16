(function () {
  'use strict';

  angular
    .module('nextgen')
    .factory('Broadcaster', service);

  /**
   * @ngInject
   */
  function service($rootScope, $log) {

    // CONSTRUCTOR

    activate();

    // PUBLIC interface

    return (getBroadcaster);

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('BROADCASTER-SERVICE');
    }

    function broadcast(event, data, msg) {
      $rootScope.$broadcast(event, {
        status: msg ? 'ERROR': 'OK',
        errorDetails: msg,
        data: data
      });
    }

    function getBroadcaster(event, methodName) {
      return {
        data: function(data) {
          broadcast(event, data);
        },
        error: function(msg) {
          broadcast(event, null, methodName + '() : ' + msg);
        }
      };
    }
  }
})();
