(function() {
  'use strict';

  angular
    .module('nextgen.dialog', ['ui.bootstrap'])
    .factory('ModalDialog', service);

  /**
   * @ngInject
   */
  function service($log, $modal) {

    // PRIVATE data

    // CONSTRUCTOR

    activate();

    // PUBLIC methods

    return {
      message: message,
      addPortlet: addPortlet
    };

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('MODAL-DIALOG-SERVICE');
    }

    function message(options) {
      var modalInstance = $modal.open({
        size: 'sm',
        templateUrl: 'views/shared/modals/message.html',
        controller: function($modalInstance) {
          if (!options.className) {
            options.className = 'default';
          }
          this.options = options;
          this.ok = $modalInstance.close;
        },
        controllerAs: 'dlg'
      });
    }

    function addPortlet(options) {
       var modalInstance = $modal.open({
        size: 'lg',
        templateUrl: 'views/console/modals/add-portlet.html',
        controller: options.controller,
        controllerAs: 'dlg',
        resolve: {
          options: function () {
            return options;
          }
        }
      });

      return modalInstance;
    }
  }
})();

