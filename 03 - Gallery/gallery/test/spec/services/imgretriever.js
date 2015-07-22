'use strict';

describe('Service: imgRetriever', function () {

  // instantiate service
  var imgRetriever,
    init = function () {
      inject(function (_imgRetriever_) {
        imgRetriever = _imgRetriever_;
      });
    };

  // load the service's module
  beforeEach(module('galleryApp'));

  it('should do something', function () {
    init();

    expect(!!imgRetriever).toBe(true);
  });

  it('should be configurable', function () {
    module(function (imgRetrieverProvider) {
      imgRetrieverProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(imgRetriever.greet()).toEqual('Lorem ipsum');
  });

});
