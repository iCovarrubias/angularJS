'use strict';

describe('Controller: NoteCtrl', function () {

  // load the controller's module
  beforeEach(module('notesApp'));

  var NoteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoteCtrl = $controller('NoteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NoteCtrl.awesomeThings.length).toBe(3);
  });
});
