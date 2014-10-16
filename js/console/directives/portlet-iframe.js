(function() {
  'use strict';

  angular
    .module('nextgen')
    .directive('portletIframe', function () {
      return {
        restrict: 'A',
        scope: false,
        templateUrl: 'views/console/partials/portlet-iframe.html',
        link: function(scope, elem, attrs) {
          var portlet = attrs.portletIframe;

          scope.loading = true; // show the spinner

          elem.find('iframe').bind('load', function(event) {
            scope.$apply(function() {
              scope.loading = false; // hide the spinner
            });

            if (portlet.onload) { // these are legacy javascript functions, NOT AngularJS
              try {
                eval(portlet.onload);
              } catch (ex) {
                throw new Error(sprintf('EXCEPTION calling portlet.onload for %s : %s', portlet.url, ex.message));
              }
            }
          });
        }
      };
    });
})();
