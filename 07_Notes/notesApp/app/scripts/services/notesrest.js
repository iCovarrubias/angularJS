'use strict';

/**
 * @ngdoc service
 * @name notesApp.NotesREST
 * @description
 * # NotesREST
 * Factory in the notesApp.
 */
angular.module('notesApp')
  .factory('NotesREST', function ($resource, NotesBaseURL) {
    // Service logic
    // ...

    //matching deployd API
    //redefine "save" to use PUT, a new "create" method will use POST 
    var notesResource = $resource(NotesBaseURL + ":id", { id: "@id" },
        { create: { method: "POST" }, save: { method: "PUT" }});
    

    function updateNote(note) {
      note.lastEditDate = new Date().toLocaleString();
      return note.$save();
    }

    function createNote(note) {
      note.creationDate = new Date().toLocaleString();
       return new notesResource(note).$create();
    } 

    // Public API here
    return {
      list: function () {
        return notesResource.query();
      },
      delete: function(note) {
        return note.$delete();
      }, 
      save: function(note) {
        if(note.id) {
          return updateNote(note);
        } else {
          return createNote(note);
        }
      }

    };
  });
