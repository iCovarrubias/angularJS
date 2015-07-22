'use strict';

describe('Directive: scrollGallery', function () {

  // load the directive's module
  beforeEach(module('galleryApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-gallery></scroll-gallery>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollGallery directive');
  }));
});
