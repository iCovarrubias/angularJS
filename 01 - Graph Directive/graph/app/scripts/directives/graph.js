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
      // template: '<div></div>',
      templateUrl: '../../views/graphTmpl.html',
      restrict: 'E',
      scope: {
      	gData: "="
      },

      link: function postLink(scope, elem) {
        //copy so we avoid accidentally modifying the original data
        var data = angular.copy(scope.gData);

        var canvas = elem.find('#graphCanvas')[0];
        if(!canvas)
        {
          throw new Error("There was a problem loading the template");
        }

        graphRender.draw(canvas, data);
      }
    };
  });
