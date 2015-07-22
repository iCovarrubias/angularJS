'use strict';

describe('Service: galleryRequest', function () {

  // instantiate service
  var galleryRequest,
    init = function () {
      inject(function (_galleryRequest_) {
        galleryRequest = _galleryRequest_;
      });
    };

  // load the service's module
  beforeEach(module('galleryApp'));

  it('should do something', function () {
    init();

    expect(!!galleryRequest).toBe(true);
  });

  it('should be configurable', function () {
    module(function (galleryRequestProvider) {
      galleryRequestProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(galleryRequest.greet()).toEqual('Lorem ipsum');
  });

});
