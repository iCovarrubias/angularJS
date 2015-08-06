'use strict';

describe('Service: NotesBaseURL', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var NotesBaseURL;
  beforeEach(inject(function (_NotesBaseURL_) {
    NotesBaseURL = _NotesBaseURL_;
  }));

  it('should do something', function () {
    expect(!!NotesBaseURL).toBe(true);
  });

});
