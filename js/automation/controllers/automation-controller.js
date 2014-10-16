(function() {
  'use strict';

  /**
   * Top level controller for the automation app.
   */
  angular
    .module('nextgen')
    .controller('AutomationController', controller);

  /**
   * @ngInject
   */
  function controller($log, CONFIG) {

    // PRIVATE data

    var vm = this;

    // PUBLIC data

    vm.CONFIG = CONFIG;
    vm.spaces = ['BLD-00089', 'Search', 'Person'];

    // PUBLIC methods

    vm.closeSpace = function(index) {
      vm.spaces.splice(index, 1);
    };

    // CONSTRUCTOR

    activate();

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('AUTOMATION-CONTROLLER');
    }
  }
})();
