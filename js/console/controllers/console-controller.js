(function() {
  'use strict';

  angular
    .module('nextgen')
    .controller('ConsoleController', controller);

  /**
   * @ngInject
   */
  function controller($log, $state, CONFIG, ConsoleManager, ModalDialog, _) {

    // PRIVATE data

    var vm = this;
    
    var config = CONFIG.CONSOLE;

    // PUBLIC data

    vm.initialized = false;                         // show/hide "loading" message
    vm.availableConsoles = [];                      // required for dropdown
    vm.currentConsole = {};                         // required for pages
    vm.activePage = {};                             // updated by showPage()
    vm.dropDownStatus = { isOpen: false };          // used to close "Select Console" dropdown

    // PUBLIC methods

    vm.addPage = addPage;                           // open editPage dialog with new page
    vm.cancelConsoleChanges = cancelConsoleChanges; // revert to originalConsole
    vm.changeConsole = changeConsole;               // load a different console (ajax)
    vm.doPageAction = doPageAction;                 // move or remove a page
    vm.editPage = editPage;                         // open editPage dialog with existing page
    vm.saveConsoleChanges = saveConsoleChanges;     // save console (ajax)
    vm.showPage = showPage;                         // show selected page

    vm.leftPortlet = function(portlet) {
      return portlet.display === 'left';
    };

    vm.rightPortlet = function(portlet) {
      return portlet.display === 'right';
    };

    // CONSTRUCTOR

    activate();

    // PRIVATE methods

    /**
     * ACTIVATE
     */
    function activate() {
      $log = $log.getInstance('CONSOLE-CONTROLLER');

      ConsoleManager.getAvailableConsoles().then(function(data) {
        vm.availableConsoles = data.availableConsoles;

        changeConsole(data.defaultConsole);
      }, notify);
    }

    /**
     * ADD PAGE
     */
    function addPage() {
      editPage(ConsoleManager.createNewPage());
    }

    /**
     * CANCEL CONSOLE CHANGES
     */
    function cancelConsoleChanges() {
      vm.currentConsole = ConsoleManager.restoreOriginalConsole();

      $state.go('console');
    }

    /**
     * CHANGE CONSOLE
     */
    function changeConsole(selectedConsole) {
      vm.dropDownStatus.isOpen = false; // close the dropdown

      if (selectedConsole.id !== vm.currentConsole.id) {
        ConsoleManager.getUserConsole(selectedConsole).then(function(data) {
          vm.currentConsole = data.currentConsole;
          showPage(data.firstPage);
        }, notify);
      }
    }

    /**
     * DO PAGE ACTION
     */
    function doPageAction(action, index) {
      ConsoleManager.updateCollection(action, index, vm.currentConsole.pages);
    }

    /**
     * EDIT PAGE
     */
    function editPage(selectedPage) {
      $state.go('console.editPage', {
        page: angular.copy(selectedPage), // edit a copy, so we can cancel
        returnState: 'console.customize'
      });
    }

    /**
     * SAVE CONSOLE CHANGES
     */
    function saveConsoleChanges() {
      ConsoleManager.saveConsole(vm.currentConsole).then(function(data) {
        ModalDialog.message({ title: 'Console Customization', msg: 'Saved!'});

        $state.go('console');
      }, notify);
    }

    /**
     * SHOW PAGE
     */
    function showPage(selectedPage) {
      vm.initialized = true;
      vm.activePage = selectedPage || {};
    }

    // UTILITY METHODS

    function notify(msg) {
      ModalDialog.message({ className: 'error', title: 'Console Customization', msg: msg });
    }
  }
})();
