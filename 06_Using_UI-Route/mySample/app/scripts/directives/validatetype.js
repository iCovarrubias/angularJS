'use strict';

/**
 * @ngdoc directive
 * @name formMatchApp.directive:validateType
 * @description
 * # validateType
 * Checks if a field type is valid, supported values are "number" and "alpha"
 * if type is ommited then is set to "alpha" by default
 */
angular.module('mySampleApp')
  .directive('validateType', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
          var RANGE_DEFAULT_TYPE = "alpha";
        	var type=attrs.validateType?attrs.validateType:RANGE_DEFAULT_TYPE;//default to alpha

          var errorMsg = attrs.errorMsg || "'Invalid type'";
          var errorTag = angular.element("<span />");
          errorTag.addClass("label label-danger");
          
          errorTag.text(scope.$eval(errorMsg));

        	function validate(value) {
        		var validationErrorKey="type";
            var valid = true;
             
        		if(type=="alpha" || type=="")
        		{
              valid = /^[a-z]*$/i.test(value);
	        	} else if (type == "number") {
	        		//if is NaN then is invalid
              //isma, TODO transform to number
              valid = !isNaN(value);
            } else
            {
              ngModelCtrl.$setValidity(validationErrorKey, valid);
	        		throw new Error("Invalid type, must be 'alpha' or 'number'");
	        	}
	        	ngModelCtrl.$setValidity(validationErrorKey, valid);

            //err message handling
            if(ngModelCtrl.$dirty)
            {
              if(valid)
              {
                errorTag.remove();
              } else {
                errorTag.insertAfter(element);
              }
            }
	        	return valid? value:undefined;
        	}
        	
        	ngModelCtrl.$parsers.push(validate);
        	ngModelCtrl.$formatters.push(validate);
      }
    };
  });
