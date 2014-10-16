(function() {
  'use strict';

  /**
   * USER CONSOLE - dependency injection handled by ConsoleEntities factory.
   */
  accela.core.automation.entity.userConsoleFactory = function(ConsolePage, _) {

    var propertyMap = ['title:REMOVE', 'description:REMOVE'];

    // CONSTRUCTOR

    function UserConsole(data) {
      // "consoles" service returns "console_nbr"
      // "userConsole" service returns "id"
      //this.id = '' + data.console_nbr || (data.id || '');
      this.id = '' + (data.console_nbr || ''); // convert to string
      this.title = data.console_name || '';
      this.description = data.console_desc || '';
      this.pages = [];

      if ((/BPTDEV/).test(this.id)) {
        this.id = this.id.replace('BPTDEV.', '').replace('.CONSOLE', '');
      }

      this.addPages(data);
    }

    // PUBLIC methods - assigned to prototype

    UserConsole.prototype.addPages = function (data) {
      if (data.pages) {
        _.each(data.pages, this.addPage, this);
      }

      return this;
    };

    UserConsole.prototype.addPage = function (data) {
      this.pages.push(ConsolePage.build(data));
    };

    /**
     * Replace internal properties with those expected by the server.
     * "map()" is an underscore mixin, defined in /shared/services/underscore.js
     */
    UserConsole.prototype.map = function() {
      _(this).mapProperties(propertyMap);

      _.each(this.pages, function(page) {
        page.map();
      });

      return this;
    };

    // STATIC METHODS - assigned to class

      UserConsole.build = function (data) {
      return new UserConsole(data || {});
    };

    return UserConsole;
  };
})();
