'use strict';

/**
 * @ngdoc directive
 * @name spoilerApp.directive:matches
 * @description
 * # matches
 */
angular.module('spoilerApp')
  .directive('matches', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the matches directive');
      }
    };
  });
