'use strict';

describe('ConsolePageController:Tests', function() {
  var ctrl, scope;
  var consoleManager;
  var stateParams;

  beforeEach(function() { // create a mock ConsoleManager
    consoleManager = {
      getAvailablePortlets: function() {
        return {
          then: angular.noop
        }
      }
    };
    spyOn(consoleManager, 'getAvailablePortlets').and.callThrough();
  });

  beforeEach(function() { // create a mock $stateParams
    stateParams = {
      page: 'foo'
    };
  });

  beforeEach(function() {
    module('nextgen');
    inject(function($controller, $rootScope, _$log_, _$state_, _ModalDialog_, _) {
      var underscore = _;

      scope = $rootScope.$new();

      ctrl = $controller('ConsolePageController as vmPage', {
        $scope: scope,
        $log: _$log_,
        $state: _$state_,
        $stateParams: stateParams,
        ConsoleManager: consoleManager,
        ModalDialog: _ModalDialog_,
        _: underscore
      });
    });
  });

  it('should define the controller', function() {
    expect(ctrl).toBeDefined();
    expect(scope.vmPage.editedPage).toBeDefined();
    expect(scope.vmPage.editedPage).toEqual('foo');
    expect(consoleManager.getAvailablePortlets).toHaveBeenCalled();
  });
});