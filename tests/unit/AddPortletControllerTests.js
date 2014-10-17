'use strict';

describe('AddPortletController:Tests', function() {
  var ctrl, scope;
  var modalInstance;

  beforeEach(function() { // create a mock angular-bootstrap $modalInstance
    modalInstance = {
      close: function(selectedPortletKeys) {
        console.log(sprintf('modalInstance.close(%s)', selectedPortletKeys));
      },
      dismiss: function(reason) {
        console.log(sprintf('modalInstance.dismiss("%s")', reason));
      }
    };
    spyOn(modalInstance, 'close'); //.and.callThrough();
    spyOn(modalInstance, 'dismiss'); //.and.callThrough();
  });

  beforeEach(function() {
    module('nextgen');

    inject(function($controller, $rootScope, _$log_, _) {
      var underscore = _;

      scope = $rootScope.$new();

      ctrl = $controller('AddPortletController as dlg', { // see comment below
        $scope: scope,
        $log: _$log_,
        $modalInstance: modalInstance,
        options: {
          portlets: [
            { entryName: '1', isSelected: true },
            { entryName: '2', isSelected: true },
            { entryName: '3', isSelected: false }
          ]
        },
        _: underscore
      });
    });
  });

  it('should define the controller', function() {
    expect(ctrl).toBeDefined();
  });

  it('should define the properties', function() {
    expect(ctrl.options).toBeDefined();
    expect(ctrl.filter).toBeDefined();
    expect(ctrl.filters).toBeDefined();

    // SEE: http://stackoverflow.com/questions/18473574/how-to-use-scope-variables-with-the-controller-as-syntax-in-jasmine
    //expect(scope.dlg.filters).toBeDefined();
  });

  it('should define the methods', function() {
    expect(ctrl.cancel).toBeDefined();
    expect(ctrl.save).toBeDefined();
    expect(ctrl.updateSelection).toBeDefined();
  });

  it('should have 2 selected portlets', function() {
    ctrl.save();

    expect(modalInstance.close).toHaveBeenCalled();
    expect(modalInstance.close).toHaveBeenCalledWith(['1','2']);
  });

  it('should have 3 selected portlets', function() {
    ctrl.updateSelection({
      target: {
        checked: true
      }
    }, ctrl.options.portlets[2]);

    ctrl.save();

    expect(modalInstance.close).toHaveBeenCalled();
    expect(modalInstance.close).toHaveBeenCalledWith(['1','2','3']);
  });

  it('should dismiss the modalInstance', function() {
    ctrl.cancel();

    expect(modalInstance.dismiss).toHaveBeenCalled();
    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });
});