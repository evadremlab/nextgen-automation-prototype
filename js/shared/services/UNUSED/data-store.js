(function() {
  'use strict';

  /**
   * For sharing AUTOMATION data between controllers.
   *
   * SEE: http://www.ramandv.com/blog/angular-js-sharing-data/
   *
   * @ngInject
   */
  angular
    .module('nextgen')
    .factory('DataStore', dataStore);

  function dataStore($log, $cacheFactory, CONFIG) {

    // PRIVATE data

    var data = {};

    // CONSTRUCTOR

    activate();

    // PUBLIC methods

    return {
      get: get,
      put: put,
      register: register,
      onSpearIndexReceived: onSpearIndexReceived
    };

    // PRIVATE methods

    function activate() {
      $log = $log.getInstance('AUTOMATION-DATA-STORE');
    }

    function get(storeId, propName) {
      var obj;
      var cache = data[storeId];

      if (cache) {
        obj = cache.get(propName);
      } else {
        $log.warn(sprintf('get() : storeId "%s" not found', storeId));
      }

      return obj;
    }

    function put(storeId, propName, obj) {
      var cache = data[storeId];

      if (cache) {
        if (storeId === CONFIG.DATASTORE.CONSOLE) {
          cache.put(propName, obj);
        } else if (storeId === CONFIG.DATASTORE.SPEAR_FORM) {
          updateSpearFormData(cache, propName, obj);
        }
      } else {
        $log.warn(sprintf('put() : storeId "%s" not found', storeId));
      }
    }

    /**
     * Create a new $cacheFactory instance.
     *
     * If values passed, add them to the cache.
     */
    function register(storeId, values) {
      var cache;
      var cacheList = $cacheFactory.info();

      // prefix the cache name so we don't conflict with Angular
      var prefixedCacheId = 'accela' + storeId;

      if (!cacheList[prefixedCacheId]) { // a cache with that id doesn't exist, create one
        data[storeId] = $cacheFactory(prefixedCacheId);
      }

      cache = data[storeId];

      if (values) {
        if (storeId == CONFIG.DATASTORE.CONSOLE) {
          initializeConsoleData(cache, values);
        } else if (storeId == CONFIG.DATASTORE.SPEAR_FORM) {
          initializeSpearFormData(cache, values);
        }
      }
    }

    function initializeConsoleData(cache, values) {
      _.each(values, function(obj, key) {
        cache.put(key, obj);
      });
    }

    function initializeSpearFormData(cache, values) {
      _.each(values, function(obj, key) {
        cache.put(key, obj);
      });
    }

    function updateSpearFormData(cache, propName, values) {
      switch (propName) {
        case 'routing':
          cache.put(propName, values);
          break;
        case 'summary':
          cache.put(propName, values);
          break;
        case 'locations':
          var locations = [];
          _.each(values, function(jsonLocation) {
            locations.push(new accela.core.automation.entity.location(jsonLocation));
          })
          cache.put(propName, locations);
          break;
        case 'people':
          var people = [];
          _.each(values, function(jsonPerson) {
            people.push(new accela.core.automation.entity.person(jsonPerson));
          });
          cache.put(propName, people);
          break;
        default:
          $log.warn(sprintf('put() : property "%s" unhandled', propName));
          break;
      }
    }

    /**
     * Handler is here because on page refresh the spear-controller hasn't been created yet
     */
    function onSpearIndexReceived(event, json) {
      $log.debug('handled ' + event.name);
      register(CONFIG.DATASTORE.SPEAR_FORM, {
        routing: json.routing,
        summary: json.data.summary
      });
    }
  }
})();
