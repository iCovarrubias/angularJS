'use strict';

describe('Service: NoteModel', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var NoteModel;
  beforeEach(inject(function (_NoteModel_) {
    NoteModel = _NoteModel_;
  }));

  it('should do something', function () {
    expect(!!NoteModel).toBe(true);
  });

});
