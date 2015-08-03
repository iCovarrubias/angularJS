'use strict';

describe('Controller: ChartsspreadsheetCtrl', function () {

  // load the controller's module
  beforeEach(module('mySampleApp'));

  var ChartsspreadsheetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartsspreadsheetCtrl = $controller('ChartsspreadsheetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChartsspreadsheetCtrl.awesomeThings.length).toBe(3);
  });
});
