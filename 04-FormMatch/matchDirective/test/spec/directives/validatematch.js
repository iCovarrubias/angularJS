'use strict';

describe('Directive: validateMatch', function () {

  // load the directive's module
  beforeEach(module('formMatchApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validate-match></validate-match>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validateMatch directive');
  }));
});
