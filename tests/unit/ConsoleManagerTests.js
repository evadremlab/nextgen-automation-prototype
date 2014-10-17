'use strict';

describe('ConsoleManager:Tests', function() {
  var mgr;

  beforeEach(function() {
    module('nextgen');

    inject(function(ConsoleManager) {
      mgr = ConsoleManager;
    });
  });

  it('should define the component', function() {
    expect(mgr).toBeDefined();
  });

  it('should define the component interface', function() {
    expect(mgr.applyPageChanges).toBeDefined();
    expect(mgr.createNewPage).toBeDefined();
    expect(mgr.currentConsole).toBeDefined();
    expect(mgr.getAvailableConsoles).toBeDefined();
    expect(mgr.getAvailablePortlets).toBeDefined();
    expect(mgr.getUserConsole).toBeDefined();
    expect(mgr.isUniquePage).toBeDefined();
    expect(mgr.restoreOriginalConsole).toBeDefined();
    expect(mgr.saveConsole).toBeDefined();
    expect(mgr.updateCollection).toBeDefined();
  });
});