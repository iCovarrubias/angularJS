'use strict';

describe('Service: rowFiller', function () {

  // load the service's module
  beforeEach(module('galleryApp'));

  // instantiate service
  var rowFiller;
  beforeEach(inject(function (_rowFiller_) {
    rowFiller = _rowFiller_;
  }));

  it('should do something', function () {
    expect(!!rowFiller).toBe(true);
  });

});
