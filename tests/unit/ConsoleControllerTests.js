'use strict';

xdescribe('ConsoleController:Tests', function() {
  var ctrl, scope;

  beforeEach(function() {
    module('nextgen');

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('ConsoleController', {
        $scope: scope
      });
    });
  });

  it('should define the controller', function() {
    expect(ctrl).toBeDefined();
  });
});