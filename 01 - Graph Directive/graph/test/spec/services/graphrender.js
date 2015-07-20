'use strict';

describe('Service: graphRender', function () {

  // load the service's module
  beforeEach(module('graphApp'));

  // instantiate service
  var graphRender;
  beforeEach(inject(function (_graphRender_) {
    graphRender = _graphRender_;
  }));

  it('should do something', function () {
    expect(!!graphRender).toBe(true);
  });

});
