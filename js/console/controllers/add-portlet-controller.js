(function() {
  'use strict';

  angular
    .module('nextgen')
    .controller('AddPortletController', controller);

  /**
   * @ngInject
   */
  function controller($log, $modalInstance, options, _) {

    // PRIVATE data

    var vm = this;

    // PUBLIC data

    vm.options = options; // "options" injected via resolve in ModalDialog service
    vm.filters = ['title', 'description']; // enable column sorting on these values
    vm.filter = vm.filters[0];

    // PUBLIC methods

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    vm.save = function() {
      var selectedPortlets = _.filter(vm.options.portlets, { isSelected: true });
      var selectedPortletKeys = _.pluck(selectedPortlets, 'entryName');

      $modalInstance.close(selectedPortletKeys);
    };

    vm.updateSelection = function($event, portlet) {
      portlet.isSelected = $event.target.checked;
    };

    // CONSTRUCTOR

    activate();

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('ADD-PORTLET-CONTROLLER');
    }
  }
})();