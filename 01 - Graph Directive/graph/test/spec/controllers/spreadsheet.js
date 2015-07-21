'use strict';

describe('Controller: SpreadSheetCtrl', function () {

  // load the controller's module
  beforeEach(module('graphApp'));

  var SpreadsheetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpreadsheetCtrl = $controller('SpreadSheetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SpreadsheetCtrl.awesomeThings.length).toBe(3);
  });
});
