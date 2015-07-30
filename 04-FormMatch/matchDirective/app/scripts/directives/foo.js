'use strict';

/**
 * @ngdoc directive
 * @name formMatchApp.directive:foo
 * @description
 * # foo
 */
angular.module('formMatchApp')
  .directive("foo", function() {
  return {
    template: "<div>the template</div>",
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude) {
      transclude(function(clone) {
        element.append(clone);
      });
    }
  };
})
  