(function() {
  'use strict';

  angular
    .module('underscore', [])
    .factory('_', function() {
      return window._; // assumes underscore library has already been loaded
    });

  // underscore.js mixins

  window._.mixin({
    /**
     * Replace object properties eg: 'id:console_nbr' or 'id:remove'
     */
    mapProperties: function(obj, map) {
      _.each(map, function(item) {
        var prop = item.split(':');
        var serverProp = prop[1];
        var clientProp = prop[0];

        if (serverProp !== 'REMOVE') {
          obj[serverProp] = obj[clientProp];  // set 'console_nbr' = 'id'
        }

        delete obj[clientProp];               // then remove 'id'
      });
    },
    /**
     * Move item within an array.
     */
    move: function (array, fromIndex, toIndex) {
      array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
      return array;
    }
  });
})();
