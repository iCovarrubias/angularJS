'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:graph
 * @description
 * # graph
 */
angular.module('graphApp')
  .directive('graph', function (graphRender) {
    return {
      template: '<div></div>',
      // templateUrl: '../../views/graphTmpl.html',
      restrict: 'E',
      scope: {
      	gData: "=",
        gType: "@"
      },

      link: function(scope, elem) {
        
        if(!scope.gType)
        {
          scope.gType = "pie";
        }

        //not a canvas, its where the chart will be displayed
        var canvas = elem.find('div')[0];
        if(!canvas)
        {
          throw new Error("There was a problem loading the template");
        }

        scope.$watch('gData', function(newVal, oldVal) {
          // if(angular.isUndefined(oldVal))
          console.log('watch on action ' + scope.gType, oldVal, newVal);
          if(!angular.isUndefined(newVal))
          {
            console.log('watch me draw');
            graphRender.draw(canvas, scope.gData, scope.gType);    
          }
        }, true);
        
      }
    };
  });
