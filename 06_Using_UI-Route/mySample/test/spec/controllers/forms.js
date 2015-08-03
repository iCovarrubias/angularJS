'use strict';

describe('Controller: FormsCtrl', function () {

  // load the controller's module
  beforeEach(module('mySampleApp'));

  var FormsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormsCtrl = $controller('FormsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormsCtrl.awesomeThings.length).toBe(3);
  });
});
