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
      link: function postLink(scope, element, attrs) {
        element.text('this is the spreadsheet directive');
      }
    };
  });
