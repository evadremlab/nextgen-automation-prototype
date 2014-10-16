(function() {
  'use strict';

  /**
   * Validate for unique value using a scope method.
   *
   * usage:
   *
   * <input type="text" name="id" ng-model="vm.id" ensure-unique="vm.isUniquePage" />
   */
  angular
    .module('nextgen')
    .directive('ensureUnique', function() {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var fn, uuid;

        if (typeof attrs.uuid === 'undefined') {
          throw new Error('DIRECTIVE ensureUnique : "uuid" attribute is required');
        } else if (attrs.ensureUnique === '') {
          throw new Error('DIRECTIVE ensureUnique : attribute valid is required');
        }

        uuid = scope.$eval(attrs.uuid); // get uuid
        fn = scope.$eval(attrs.ensureUnique); // get function reference

        if (typeof uuid === 'undefined') {
          throw new Error('DIRECTIVE ensureUnique : "uuid" property is undefined');
        } else {
          if (fn && typeof fn === 'function') {
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
              if (newValue && newValue !== oldValue) {
                ctrl.$setValidity('unique', fn(uuid, newValue));
              }
            });
          } else {
            throw new Error(sprintf('DIRECTIVE ensureUnique : validation method "%s" is undefined', attrs.ensureUnique));
          }
        }
      }
    }
  });
})();
