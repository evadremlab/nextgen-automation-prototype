(function () {
  'use strict';

  var config = {
    'CURRENT_VERSION': '0.10.17',
    'PROJECT_NAME': 'NextGen Automation Prototype',
    'USE_MOCK_SERVICES': true,
    'USE_MOCK_PORTLETS': true,
    'LOG_CLIENT_ERRORS': true,
    'CONSOLE_LOGGING_ENABLED': true,
    'REST_SERVER': 'https://dbalmer-vm864.accela.com:5443/console/',
    'CONSOLE': {
      'SERVICES': {
        'GET_AVAILABLE_CONSOLES': { mockPath: 'console/', endPoint: 'consoles' },
        'GET_USER_CONSOLE': { mockPath: 'console/', endPoint: 'userConsole' },
        'GET_AGENCY_PORTLETS': { mockPath: 'console/', endPoint: 'portlets' },
        'SAVE_USER_CONSOLE': { mockPath: 'console/', endPoint: 'saveUserConsole' }
      }
    },
    'NAVIGATION' : {
      'TILES': [
        { text: 'Dashboard', visible: true, state: 'home' }
      ],
      'BUTTONS': [
        { text: 'Console', visible: true, state: 'console' }
      ]
    }
  };

  /**
   * Assume that most of this would be returned by server on initial page load.
   */
  angular
    .module('nextgen.config', [])
    .constant('CONFIG', config);
})();
