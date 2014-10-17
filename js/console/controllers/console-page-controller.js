(function() {
  'use strict';

  angular
    .module('nextgen')
    .controller('ConsolePageController', controller);

  /**
   * @ngInject
   */
  function controller($log, $state, $stateParams, ConsoleManager, ModalDialog, _) {

    // PRIVATE data

    var vm = this;

    var availablePortlets;
    var homeState = 'home';
    var returnState = 'console.customize';

    // PUBLIC data

    vm.editedPage = null;

    // PUBLIC methods

    vm.addPortlet = openAddPortletDialog;
    vm.cancelPageChanges = cancelPageChanges;
    vm.doPortletAction = doPortletAction;
    vm.addPortlet = openAddPortletDialog;
    vm.doPortletAction = doPortletAction;
    vm.applyPageChanges = applyPageChanges;
    vm.isUniquePage = ConsoleManager.isUniquePage;

    // CONSTRUCTOR

    activate();

    // PRIVATE methods

    /**
     * ACTIVATE
     */
    function activate() {
      $log = $log.getInstance('CONSOLE-PAGE-CONTROLLER');

      if ($stateParams.page) {
        vm.editedPage = $stateParams.page;

        ConsoleManager.getAvailablePortlets().then(function(data) {
          availablePortlets = data;
        }, notify);
      } else {
        $log.warn('vm.editedPage is undefined, routing to ' + homeState);
        $state.go(homeState);
      }
    }

    function cancelPageChanges() {
      $state.go(returnState);
    }

    function applyPageChanges() {
      ConsoleManager.applyPageChanges(vm.editedPage);

      $state.go(returnState);
    }

    /**
     * OPEN ADD PORTLET DIALOG
     */
    function openAddPortletDialog() {
      // make changes to a copy so we don't affect the master list
      var pagePortlets = angular.copy(availablePortlets);

      // mark portlets that have already been assigned to this console as "assigned"
      _.each(vm.editedPage.portlets, function(portlet) {
        pagePortlets[portlet.entryName].assigned = true;
      });

      ModalDialog.addPortlet({
        title: 'Add Portlet',
        portlets: _.toArray(pagePortlets),
        selectedPage: vm.editedPage,
        controller: 'AddPortletController',
      }).result.then(addSelectedPortlets);
    }

    /**
     * ADD SELECTED PORTLETS
     */
    function addSelectedPortlets(selectedPortletKeys) {
      var portlet;

      _.each(selectedPortletKeys, function(key) {
        portlet = availablePortlets[key];

        if (vm.editedPage.layout === 'two-column') {
          portlet.display = 'right';
        } else {
          portlet.display = 'full';
        }

        vm.editedPage.portlets.push(portlet);
      });
    }

    /**
     * DO PORTLET ACTION
     */
    function doPortletAction(action, index) {
      ConsoleManager.updateCollection(action, index, vm.editedPage.portlets);
    }

    /**
     * SAVE PAGE EDITS
     */
    function savePageEdits() {
      ConsoleManager.applyPageChanges(vm.editedPage);

      //$state.go('console.customize');
      $state.go(returnState);
    }

    // UTILITY METHODS

    function notify(msg) {
      ModalDialog.message({ className: 'error', title: 'Console Customization', msg: msg });
    }
  }
})();
