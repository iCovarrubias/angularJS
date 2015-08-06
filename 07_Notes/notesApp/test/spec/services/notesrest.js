'use strict';

describe('Service: NotesREST', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var NotesREST;
  beforeEach(inject(function (_NotesREST_) {
    NotesREST = _NotesREST_;
  }));

  it('should do something', function () {
    expect(!!NotesREST).toBe(true);
  });

});
