(function() {
  'use strict';

  angular
    .module('nextgen', [
      'nextgen.config',
      'nextgen.dialog',
      'nextgen.logging',
      'ui.router',
      'smart-table',
      'underscore'
    ]);

  angular
    .module('nextgen')
    .provider('$exceptionHandler', {
      // By default, AngularJS will catch errors and log them to the Console.
      // We want to keep that behavior; however, we want to intercept it
      // so we can also log the errors to the server for later analysis.
      $get: function(LoggingService) {
        return(LoggingService.exceptionHandler);
      }
    })
    .config(function ($httpProvider, $provide, $stateProvider, $urlRouterProvider) {

      var consoleState = {
        home : {
          name: 'console',
          url: '/console',
          controllerAs: 'vm',
          controller: 'ConsoleController',
          templateUrl: 'views/console/index.html'
        },
        // in these nested views, omit the controller property
        // so that Angular will use the existing ConsoleController
        customize: {
          name: 'console.customize',
          url: '/customize',
          templateUrl: 'views/console/customize.html'
        },
        editPage: {
          name: 'console.editPage',
          url: '/edit',
          controllerAs: 'vmPage',
          controller: 'ConsolePageController',
          templateUrl: 'views/console/edit-page.html',
          params: { // required for $stateParams
            page: ''
          }
        }
      };

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/automation/index.html'
        })
        .state(consoleState.home)
        .state(consoleState.customize)
        .state(consoleState.editPage);

      $urlRouterProvider.otherwise('/'); // default route if none of the above match

      $httpProvider.interceptors.push('HttpInterceptor');

      $provide.decorator('$log', function ($delegate) {
        // if using LoggingService in HttpInterceptor
        // getInstance method will already be provided to $log
        if (typeof $delegate.getInstance === 'undefined') {
          // otherwise return the same $log
          $delegate.getInstance = function () {
            return $delegate;
          };
        }

        return $delegate;
      });
    });
})();
