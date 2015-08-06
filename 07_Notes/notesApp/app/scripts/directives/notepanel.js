'use strict';

/**
 * @ngdoc directive
 * @name notesApp.directive:notePanel
 * @description
 * # notePanel
 */
angular.module('notesApp')
  .directive('notePanel', function ($compile) {
    return {
      templateUrl: '/views/partials/noteHolder.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        
      },
      controller: function($scope, $element, NotesREST) {
      	$scope.note = {}; //this is the note we are saving and using in the form

        var noteFormElem = $element.find("form");
      	var noteContainer = $element.find('.note-container');

        //isma, this is a configuration object required by our notes directive.
        //It's just a map for the udpdate and delete operations 
        var myRestApi = {
          update: "$save",
          delete: "$delete"
        };

        //isma, again, a map that represents title, description and dates for our notes
        var propMap = {
          title: "title",
          contents: "contents",
          creationDate: "creationDate",
          lastEditDate: "lastEditDate"
        };

        function hideNoteForm(reset){
          noteFormElem.css({display: "none"});
          $scope.note = reset?{}:$scope.note; //when hiding, we create a new note
          // noteFormElem[0].reset();
          $scope.formIsShown = false;
        }
        function showNoteForm () {
          $scope.formIsShown = true;
          noteFormElem.css({display: "block"});
        }

        //creates a note element given the "note" as a parameter
        function createNoteElement(note){
           var sNote = $scope.$new();
           sNote.note = note;
           sNote.restAPI = myRestApi;
           sNote.propMap = propMap;
           return $compile('<note note-item="note" operations="restAPI" prop="propMap"/>')(sNote);
        }

        function listNotes() {
          $scope.allNotes = NotesREST.list();
          $scope.allNotes.$promise.then(function(data) {
            for(var i=0; i <$scope.allNotes.length; i ++) {
              var aNoteElem = createNoteElement(data[i]);
              noteContainer.append(aNoteElem);
            }
          });
        }

      	$scope.toggleNoteForm = function(){
          if($scope.formIsShown){
      		  hideNoteForm(false);
          } else {
            showNoteForm();
          }
      	};

      	$scope.cancelNote = function() {
      		hideNoteForm(true);
      	};

      	$scope.saveNote = function(note) {
          $scope.showValidation = true;
          if($scope.notePanel.$valid){
            NotesREST.save(note).then(function(newNote) {
              var aNoteElement = createNoteElement(newNote);
              noteContainer.append(aNoteElement);

              $scope.allNotes.push(newNote);
              hideNoteForm(true);

              $scope.showValidation = false;
            });
          }
      	};

        listNotes();
        $scope.formIsShown = !!noteFormElem.css("display");
      }
    };
  });
