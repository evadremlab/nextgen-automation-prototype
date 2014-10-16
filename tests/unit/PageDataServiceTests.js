'use strict';

/**
 * PageDataService unit tests.
 */

describe('PageDataService:Tests', function() {
  var $httpBackend, service, CONFIG;

  var SERVICE_REQUEST = {
    AGENCY_PORTLETS: { mockPath: 'console/', endPoint: 'portlets' }
  };

  function createXHRObject() {
    try {
      return new XMLHttpRequest();
    } catch (e) {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e) {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          throw new Error('No XHR object found in this environment.');
        }
      }
    }
  }
  function getMockData(serviceUrl) {
    var mockData = {};
    var xhr = createXHRObject();
    // make synchronous request to load json
    // 'base/' prefix is required to locate the file
    // json files are defined in karma.conf.js under "files: [ { pattern : } ]"
    xhr.open('GET', 'base/' + serviceUrl, false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(null);

    if (xhr.status === 200) {
      mockData = angular.fromJson(xhr.responseText);
    }

    return mockData;
  }

  beforeEach(function() {
    module('nextgen');

    inject(
      function(_$httpBackend_, _PageDataService_, _CONFIG_) {
        $httpBackend = _$httpBackend_;
        service = _PageDataService_;
        CONFIG = _CONFIG_;

        CONFIG.USE_MOCK_SERVICES = true;
        CONFIG.LOG_CLIENT_ERRORS = false;
        CONFIG.CONSOLE_LOGGING_ENABLED = false;
      }
    );
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should defined the service', function() {
    expect(service).toBeDefined();
    expect(service.get).toBeDefined();
    expect(service.post).toBeDefined();
    expect(service.getServiceUrl).toBeDefined();
  });

  it('should create a valid serviceUrl', function () {
    var serviceRequest = SERVICE_REQUEST.AGENCY_PORTLETS;
    var serviceUrl = service.getServiceUrl(serviceRequest);

    expect(serviceUrl).toBeDefined();
    expect(serviceUrl).toEqual('mock-api/console/portlets.json');
  });

  it('should get agency portlets', function () {
    var data;
    var serviceRequest = SERVICE_REQUEST.AGENCY_PORTLETS;
    var serviceUrl = service.getServiceUrl(serviceRequest);

    $httpBackend.expect('POST', serviceUrl).respond(200, getMockData(serviceUrl));

    service.get(serviceRequest).then(function(response) {
      console.log(JSON.stringify(response));

      data = response.data;
    });

    $httpBackend.flush();

    expect(data).toBeDefined();
    expect(data.status).toBeDefined();
    expect(data.status.code).toEqual('OK');
  });
});