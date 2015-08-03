'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:spreadsheet
 * @description
 * # spreadsheet
 */
angular.module('mySampleApp')
  .directive('spreadsheet', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
      	ssData: "="
      },
      link: function (scope, elem) {

        var container = elem.find('div')[0];
		    if(!container)
		    {
		      throw new Error("There was a problem loading the template");
		    }
        var hot = new Handsontable(container, {
          data: scope.ssData,
          minSpareRows: 1,
          rowHeaders: true,
          colHeaders: true,
          contextMenu: true,
          afterChange: function(changes) {
            if(changes){
              //isma, when we manually change something in the spreadsheet
              // the scope gets updated but not the views
              // call apply on ssData to update the views
              var col = changes[0][0],
                  row = changes[0][1],              
                  val = changes[0][3];
              scope.$apply(function(){
                scope.ssData[col][row] = val;  
              });
            }
          }
        });
        scope.$watch('ssData', function(newVal, oldVal){
          console.log("watching data changes on spreadsheet");
          if(oldVal == undefined && newVal) {
            console.log("reload Spreadsheet")
            hot.loadData(newVal);
          }
          if(newVal && hot)
          {
            hot.render();
          }
        }, true);
  			
      }
    };
  });
