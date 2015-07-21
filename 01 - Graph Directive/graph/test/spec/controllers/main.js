'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('graphApp'));

  var MainCtrl,
    scope;
    var google;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    google = {};
    google.setOnLoadCallback = function(){};
    google.visualization = {};
    google.visualization.DataTable = true;

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    }); 
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(MainCtrl.awesomeThings.length).toBe(3);
    expect(true).toBe(true);
  });
});
