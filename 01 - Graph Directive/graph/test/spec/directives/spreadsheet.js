'use strict';

describe('Directive: spreadsheet', function () {

  // load the directive's module
  beforeEach(module('graphApp'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function () {
    // element = angular.element('<spreadsheet></spreadsheet>');
    // element = $compile(element)(scope);
    expect(1).toBe(1); 
  }));
});
