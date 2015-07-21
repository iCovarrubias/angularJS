'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:spreadsheet
 * @description
 * # spreadsheet
 */
angular.module('graphApp')
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
          contextMenu: true
        });
        scope.$watch('ssData', function(newVal){
          if(newVal && hot)
          {
            hot.render();
          }
        }, true);
  			
      }
    };
  });
