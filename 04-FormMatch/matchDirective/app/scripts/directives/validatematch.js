'use strict';

/**
 * @ngdoc directive
 * @name formMatchApp.directive:validateMatch
 * @description
 * # validateMatch
 */
angular.module('formMatchApp')
  .directive('validateMatch', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			function validateEqual(myValue){
				//myValue is this directive's value
				//otherValue is the value we are comparing to
				var otherValue = scope.$eval(attrs.validateMatch); 
				var valid = (myValue == otherValue);
				ngModelCtrl.$setValidity('equal',valid);
				// console.log("validateEqual" , valid);
				return valid? myValue: undefined;
			}

			ngModelCtrl.$parsers.push(validateEqual);
      		ngModelCtrl.$formatters.push(validateEqual);

      		scope.$watch(attrs.validateMatch, function() {
      			// console.log('watching',ngModelCtrl.$viewValue);
				// ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
				validateEqual(ngModelCtrl.$viewValue);
			});
		}
	};
});
