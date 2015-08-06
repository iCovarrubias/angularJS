'use strict';

/**
 * @ngdoc directive
 * @name notesApp.directive:note
 * @description
 * # note
 */
angular.module('notesApp')
  .directive('note', function () {
    return {
      templateUrl: '/views/partials/note.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        
        //isma, we'll leave this here just as a reminder of how we did
        //things back in the day, now we are using ng-change instead
        // var updateTimerId;
        /*
        element.on("input", function(event) {
          if(updateTimerId)
          {
            clearTimeout(updateTimerId);
          }
          function delayUpdate(){
            scope.save();
          }
          //isma TODO: add the $timer service
          updateTimerId = setTimeout(delayUpdate, 2000);
        });*/
      },
      scope: {
        noteItem: '=',
        operations: '=', //define {delete, create, update}
        prop: "="
      },
      controller: function($scope, $element, $timeout) {
        var $noteBody = $element.find('.note-body');
        var $noteTitle = $element.find('.note-title');

        //used to delay saving on keystrokes
        var updateTimerId;
        function delayUpdate(){
          $scope.save();
        }

        $scope.currentNote = {}; //the note used for display
        if(!$scope.prop) {
          $scope.prop = {
            title: "title",
            contents: "contents",
            creationDate: "creationDate",
            lastEditDate: "lastEditDate"
          };
        }
        function setCurrentNote(note) {
          $scope.currentNote.title = note[$scope.prop.title];
          $scope.currentNote.contents = note[$scope.prop.contents];
          $scope.currentNote.creationDate = note[$scope.prop.creationDate];
          $scope.currentNote.lastEditDate = note[$scope.prop.lastEditDate];
        }

      	$scope.toggleEditMode = function(event){
          //enable/disable the note title
          $noteTitle.prop('disabled', function(i, val) { return !val;});

      		//switch between note edit-mode and just display-mode
          var disp = $noteBody.css('display') == 'none'? 'block':'none';
          $noteBody.css('display', disp);
      	};

        $scope.delete = function() {
          if($scope.operations && $scope.operations.delete) {
            $scope.noteItem[$scope.operations.delete]();
          } 
          $element.remove();
        };

        $scope.save = function() {
          //copy the properties from the currentNote to the one we are saving
          $scope.noteItem[$scope.prop.title] = $scope.currentNote.title;
          $scope.noteItem[$scope.prop.contents] = $scope.currentNote.contents;

          if($scope.noteItem && $scope.noteItem.id) {
            $scope.noteItem[$scope.prop.lastEditDate] = new Date().toLocaleString();
          }


          if($scope.operations && $scope.operations.update) {
            $scope.noteItem[$scope.operations.update]().then(function() {
              // setCurrentNote(res);
              //I just want to update the last edit date
              $scope.currentNote.lastEditDate =  $scope.noteItem[$scope.prop.lastEditDate];
            });
          }
        };

        
        $scope.onDataChanged = function() {
          if(updateTimerId)
          {
            $timeout.cancel(updateTimerId);
          }
          //isma TODO: add the $timer service
          updateTimerId = $timeout(delayUpdate, 2000);
        };

        setCurrentNote($scope.noteItem);
      }
    };
  });
