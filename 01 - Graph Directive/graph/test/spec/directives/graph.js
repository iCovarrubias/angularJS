'use strict';

describe('Directive: graph', function () {

  // load the directive's module
  beforeEach(module('graphApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<graph></graph>');
    element = $compile(element)(scope);
    expect(element.find('div').length).toBe(1);
  }));
});
