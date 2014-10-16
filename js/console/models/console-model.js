(function () {
  'use strict';

  angular
    .module('nextgen')
    .factory('ConsoleModel', service);

  /**
   * @ngInject
   * @ngdoc overview
   * @name ConsoleModel
   * @requires CONFIG
   * @requires Underscore
   *
   * @description
   * Provides data models for the Console controllers.
   * Entities are defined in /js/console/entities
   */
  function service(CONFIG, _) {

    // PRIVATE data

    var _portletFactory = accela.core.automation.entity.portletFactory(CONFIG);
    var _pageFactory = accela.core.automation.entity.consolePageFactory(_portletFactory, _);
    var _consoleFactory = accela.core.automation.entity.userConsoleFactory(_pageFactory, _);

    // PUBLIC interface

    return {
      UserConsole: _consoleFactory,
      ConsolePage: _pageFactory,
      Portlet: _portletFactory
    };
  }
})();
