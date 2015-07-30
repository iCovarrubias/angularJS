'use strict';

/**
 * @ngdoc directive
 * @name formMatchApp.directive:match
 * @description
 * # match
 */
angular.module('formMatchApp')
  .directive('match', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var mustMatch = attrs['match'];
        throw new Error('do not use, use validate-match');
      }
    };
  });
