'use strict';

describe('Service: graphRender', function () {

  // load the service's module
  beforeEach(module('graphApp'));

  // instantiate service
  var graphRender, chartService;

  beforeEach(inject(function (_graphRender_, _ChartService_) {
    graphRender = _graphRender_;
    chartService = _ChartService_; 
    // googleLoaded = chartService.loadGoogleVisualization();
  }));

  it('should do something', function () {
    expect(!!graphRender).toBe(true);
  });

});
