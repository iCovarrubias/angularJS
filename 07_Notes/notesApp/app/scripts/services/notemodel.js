'use strict';

/**
 * @ngdoc service
 * @name notesApp.NoteModel
 * @description
 * # NoteModel
 * Factory in the notesApp.
 */
angular.module('notesApp')
  .factory('NoteModel', function ($q) {

    var noteId = 10;
    var appData = []; //this is the representation of our database

    function queryNoteFn(){

    }
    function updateNoteFn(){

    }
    function deleteNoteFn(){

    }

    function createNote(obj) 
    {
      var date = new Date().toLocaleString();

      return {
        id: noteId++;
        title: obj.title,
        contents: obj.contents,
        creationDate: date,
        
        read: queryNoteFn;
        update: updateNoteFn;
        delete: deleteNoteFn;

      };
    }

    var initialData = [];
    initialData.push(createNote({title: "first note title", contents: "first note contents"}));
    initialData.push(createNote({ title: "second note title", contents: "second note contents" }));

     //matching deployd API
    //redefine "save" to use PUT, a new "create" method will use POST 
    function Resource() {
      var deferred = $.defer();
      appData.$promise = deferred.promise;
      this.query = function() {
        //we simulate an ajax call
        setTimeout(1000, function() {
          if(appData.length == 0) 
          {
            //we assume this is the first query to the server
            appData = initialData.slice();
          }
          deferred.resolve(appData);
        });
        return appData;
      }
      
      note.$promise = deferred.promise;

    }

    var notesResource = new Resource();
    

    function updateNote(note) {
      return note.$save();
    }

    function createNote(note) {
       return new notesResource(note).$create();
    }

    function queryNotes() {
      return notesResource.query();
    }

    // Public API here
    return {
      list: function () {
        return queryNotes();
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
