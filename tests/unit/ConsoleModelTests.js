'use strict';

/**
 * ConsoleModel unit tests.
 */

describe('ConsoleModel:Tests', function() {
  var model;

  beforeEach(function() {
    module('nextgen');

    inject(
      function(_ConsoleModel_) {
        model = _ConsoleModel_;
      }
    );
  });

  it('should define the model', function() {
    expect(model).toBeDefined();
  });

  it('should define the UserConsole', function() {
    expect(model.UserConsole).toBeDefined();
    expect(model.UserConsole.build).toBeDefined();

    var userConsole = model.UserConsole.build();

    expect(userConsole).toBeDefined();
    expect(userConsole.pages).toBeDefined();
    expect(userConsole.addPage).toBeDefined();
    expect(userConsole.addPages).toBeDefined();
    expect(userConsole.map).toBeDefined();
  });

  it('should define the ConsolePage', function() {
    expect(model.ConsolePage).toBeDefined();
    expect(model.ConsolePage.build).toBeDefined();

    var consolePage = model.ConsolePage.build();

    expect(consolePage).toBeDefined();
    expect(consolePage.portlets).toBeDefined();
    expect(consolePage.addPortlet).toBeDefined();
    expect(consolePage.map).toBeDefined();
  });

  it('should define the Portlet', function() {
    expect(model.Portlet).toBeDefined();
    expect(model.Portlet.build).toBeDefined();

    var portlet = model.Portlet.build();

    expect(portlet).toBeDefined();
    expect(portlet.getUrl).toBeDefined();
    expect(portlet.localizedTitle).toBeDefined();
    expect(portlet.map).toBeDefined();
  });
});