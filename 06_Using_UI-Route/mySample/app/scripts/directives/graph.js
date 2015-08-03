'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:graph
 * @description
 * # graph
 */
angular.module('mySampleApp')
  .directive('graph', function (graphRender) {
    return {
      template: '<div></div>',
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
          if(!angular.isUndefined(newVal))
          {
            graphRender.draw(canvas, scope.gData, scope.gType);    
          }
        }, true);
        
      }
    };
  });
