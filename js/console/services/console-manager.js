(function () {
  'use strict';

  angular
    .module('nextgen')
    .factory('ConsoleManager', service);

  // SEE: https://github.com/idanush/ngdocs/wiki/API-Docs-Syntax

  /**
   * @ngdoc service
   * @name nextgen.ConsoleManager
   * @description some description here
   * @requires https://docs.angularjs.org/api/ng/service/$log
   * @requires https://docs.angularjs.org/api/ng/service/$q
   * @requires CONFIG
   * @requires ConsoleModel
   * @requires PageDataService
   * @requires Underscore
   *
   * @ngInject
   **/
  function service($log, $q, CONFIG, ConsoleModel, PageDataService, _) {

    // PRIVATE data

    var model = ConsoleModel;
    var config = CONFIG.CONSOLE;

    /**
     * @ngdoc property
     * @name currentConsole
     * @propertyOf nextgen.ConsoleManager
     * @description
     * Use to maintain state between Console controllers.
     */
    var currentConsole = {};

    var originalConsole = {};
    var availablePortlets;

    // CONSTRUCTOR

    activate();

    // PUBLIC interface

    return {
      applyPageChanges: applyPageChanges,
      createNewPage: createNewPage,
      currentConsole: currentConsole,
      getAvailableConsoles: getAvailableConsoles,
      getAvailablePortlets: getAvailablePortlets,
      getUserConsole: getUserConsole,
      isUniquePage: isUniquePage,
      restoreOriginalConsole: restoreOriginalConsole,
      saveConsole: saveConsole,
      updateCollection: updateCollection
    };

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('CONSOLE-MANAGER');
    }

    /**
     * @ngdoc method
     * @name applyPageChanges
     * @methodOf nextgen.ConsoleManager
     * @description
     * Looks for a matching page the the current console.
     *
     * If found, copies the id, title, description, and portlets properties to the current page.
     *
     * Otherwise, adds the new page to the current console.
     */
    function applyPageChanges(editedPage) {
      var currentPage = _.findWhere(currentConsole.pages, { uuid: editedPage.uuid });

      if (currentPage) { // replace these properties
        _.extend(currentPage, _.pick(editedPage, 'id', 'title', 'description', 'portlets'));
      } else {
        currentConsole.addPage(editedPage);
      }
    }

    /**
     * @ngdoc method
     * @name createNewPage
     * @methodOf nextgen.ConsoleManager
     * @description
     * Returns an empty ConsolePage entity.
     */
    function createNewPage() {
      return model.ConsolePage.build();
    }

    /**
     * @ngdoc method
     * @name getAvailableConsoles
     * @methodOf nextgen.ConsoleManager
     * @description
     * Uses the PageDataService to fetch available consoles and parse the response.
     *
     * Returns the default console and list of available consoles.
     */
    function getAvailableConsoles() {
      var data = {};
      var params = { servProvCode: 'BPTDEV' };
      var deferred = $q.defer();

      PageDataService.get(config.SERVICES.GET_AVAILABLE_CONSOLES, data, params)
        .then(function(response) {
          var defaultConsole;
          var availableConsoles = [];
          var status = response.data.status;
          var content = response.data.content;

          if (status.code === 'OK') {
            _.each(content, function(data) {
              availableConsoles.push(model.UserConsole.build(data));
            });

            defaultConsole = _.findWhere(availableConsoles, { 'description': 'Default console' });

            if (!defaultConsole && availableConsoles.length) {
              defaultConsole = availableConsoles[0];
            }

            if (defaultConsole) {
              deferred.resolve({
                defaultConsole: defaultConsole,
                availableConsoles: availableConsoles
              });
            } else {
              deferred.reject('Default console not found');
            }
          } else {
            deferred.reject(status.message);
          }
        }, function(error) { // already reported by HttpInterceptor
          deferred.reject(error.customErrorMessage);
        });

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name getAvailablePortlets
     * @methodOf nextgen.ConsoleManager
     * @description
     * Uses the PageDataService to fetch available portlets and parse the response.
     */
    function getAvailablePortlets() {
      var data = {};
      var params = {};
      var deferred = $q.defer();

      if (availablePortlets) {
        deferred.resolve(availablePortlets);
      } else {
        PageDataService.get(config.SERVICES.GET_AGENCY_PORTLETS, data, params)
          .then(function(response) {
            var portlets = [];
            var status = response.data.status;
            var content = response.data.content;

            if (status.code === 'OK') {
              _.each(content, function(data) {
                portlets.push(model.Portlet.build(data));
              });

              // convert array of portlets to an object hash for easier lookups
              availablePortlets = _.indexBy(portlets, 'entryName');

              deferred.resolve(availablePortlets);
            } else {
              deferred.reject(status.message);
            }
          }, function(error) { // already reported by HttpInterceptor
            deferred.reject(error.customErrorMessage);
          });
      }

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name getUserConsole
     * @methodOf nextgen.ConsoleManager
     * @description
     * Uses the PageDataService to fetch a user console and parse the response.
     *
     * Creates a backup copy of the original user console so that we can cancel changes.
     *
     * Returns the current console and first page.
     */
    function getUserConsole(selectedConsole) {
      var data = {};
      var params = {};
      var deferred = $q.defer();

      if (CONFIG.USE_MOCK_SERVICES) {
        data = { consoleId: selectedConsole.id };
      } else {
        params = { consoleId: '22' };
      }

      PageDataService.get(config.SERVICES.GET_USER_CONSOLE, data, params).then(function(response) {
        var status = response.data.status;
        var content = response.data.content;

        if (status.code === 'OK') {
          currentConsole = angular.copy(selectedConsole).addPages(content);
          originalConsole = angular.copy(currentConsole); // so we can cancel changes

          deferred.resolve({
            currentConsole: currentConsole,
            firstPage: currentConsole.pages.length ? currentConsole.pages[0] : null
          });
        } else {
          deferred.reject(status.message);
        }
      }, function(error) { // already reported by HttpInterceptor
        deferred.reject(error.customErrorMessage);
      });

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name isUniquePage
     * @methodOf nextgen.ConsoleManager
     * @description
     * Uses the underscore.js "findWhere" method to look for an existing page in the current console.
     */
    function isUniquePage(uuid, newValue) {
      var existingPage = _.findWhere(currentConsole.pages, { id: newValue });

      return (existingPage && existingPage.uuid !== uuid) ? false : true;
    }

    /**
     * @ngdoc method
     * @name restoreOriginalConsole
     * @methodOf nextgen.ConsoleManager
     * @description
     * Restores the current console from the backup copy.
     */
    function restoreOriginalConsole() {
      currentConsole = angular.copy(originalConsole);

      return currentConsole;
    }

    /**
     * @ngdoc method
     * @name saveConsole
     * @methodOf nextgen.ConsoleManager
     * @description
     * Uses the PageDataService to post the current console to the server.
     */
    function saveConsole(currentConsole) {
      var deferred = $q.defer();
      var savedConsole = angular.copy(currentConsole).map();

      PageDataService.post(config.SERVICES.SAVE_USER_CONSOLE, savedConsole)
        .then(function(response) {
          var status = response.data.status;
          var content = response.data.content;

          if (status.code === 'OK') {
            deferred.resolve(savedConsole);
          } else {
            deferred.reject(status.message);
          }
        }, function(error) { // already reported by HttpInterceptor
          deferred.reject(error.customErrorMessage);
        });

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name updateCollection
     * @methodOf nextgen.ConsoleManager
     * @description
     * Utility method to move or delete elements within an array.
     *
     * Currently used for the list of pages and portlets.
     */
    function updateCollection(action, index, collection) {
      if (action === 'up') {
        _(collection).move(index, index - 1);
      } else if (action === 'down') {
        _(collection).move(index, index + 1);
      } else if (action === 'remove') {
        collection.splice(index, 1);
      }
    }
  }
})();
