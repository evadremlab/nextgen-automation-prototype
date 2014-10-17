(function () {
  'use strict';

  angular
    .module('nextgen')
    .factory('PageDataService', service);

  /**
   * @description Provides ajax wrapper.
   *
   * @ngInject
   */
  function service($http, $log, CONFIG) {

    // PRIVATE data

    // CONSTRUCTOR

    activate();

    // PUBLIC interface

    return {
      get: makeRequest,
      post: makeRequest,
      getServiceUrl: getServiceUrl
    };

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('PAGE-DATA-SERVICE');
    }

    /**
     * Construct service url from configuration.
     * Also used by unit tests for mocking http responses.
     */
    function getServiceUrl(service, data) {
      var endPoint = service.endPoint;
      var serviceUrl = CONFIG.USE_MOCK_SERVICES ? ('mock-api/' + service.mockPath) : CONFIG.REST_SERVER;

      if (CONFIG.USE_MOCK_SERVICES) {
        if (endPoint === 'userConsole' && data) {
          endPoint += ('-' + data.consoleId);
        }
        endPoint += '.json';
      }

      return serviceUrl + endPoint;
    }

    function makeRequest(service, data, params) {
      return $http({
        method: 'POST',
        url: getServiceUrl(service, data),
        data: data || {},
        params: params || {}
      });
    }
  }
})();
