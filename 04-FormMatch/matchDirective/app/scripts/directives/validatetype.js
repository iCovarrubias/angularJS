'use strict';

/**
 * @ngdoc directive
 * @name formMatchApp.directive:validateType
 * @description
 * # validateType
 * Checks if a field type is valid, supported values are "number" and "alpha"
 * if type is ommited then is set to "alpha" by default
 */
angular.module('formMatchApp')
  .directive('validateType', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
          var RANGE_DEFAULT_TYPE = "alpha";
        	var type=attrs.validateType?attrs.validateType:RANGE_DEFAULT_TYPE;//default to alpha
          console.log('on link, the type is',type);
        	function validate(value) {
        		var validationErrorKey="type";
            var result = true;
             
        		if(type=="alpha" || type=="")
        		{
              result = /^[a-z]+$/i.test(value);
	        	} else if (type == "number") {
	        		//if is NaN then is invalid
	        		result = !isNaN(value);
	        	} else
	        	{
              ngModelCtrl.$setValidity(validationErrorKey, result);
	        		throw new Error("Invalid type, must be 'alpha' or 'number'");
	        	}
	        	ngModelCtrl.$setValidity(validationErrorKey, result);
	        	return result? value:undefined;
        	}
        	
        	ngModelCtrl.$parsers.push(validate);
        	ngModelCtrl.$formatters.push(validate);
      }
    };
  });
