'use strict';

/**
 * @ngdoc directive
 * @name formMatchApp.directive:validateRange
 * @description
 * # validateRange
 *	Checks if a field range is valid, you can set this directive "number" and "date"
 * if type is ommited then is set to "number" by default
 */
angular.module('formMatchApp')
  .directive('validateRange', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
      	var minRange = attrs.minRange;
      	var maxRange = attrs.maxRange;
      	var validateType = attrs.validateRange ? attrs.validateRange:"number"; //default number
      	function validate(myValue)
      	{
      		//the constant passed to ngModelCtrl.$setValidity
      		var validationErrorKey="range";
      		function validateNumeric(value)
      		{
                        var theValue = +value;
      			var valid = !isNaN(theValue);
      			if(valid && angular.isDefined(minRange))
      			{
      				valid = theValue >= minRange;
      			}

      			if(valid && angular.isDefined(maxRange))
      			{
      				valid = theValue <= maxRange;
      			}
      			// console.log("validateNumeric", theValue,valid);
      			ngModelCtrl.$setValidity(validationErrorKey,valid);
      			return valid?value: undefined;
      		}

      		function validateDate(value)
      		{
      			var valid = true;
                        var theValue = new Date(value).getTime();
      			if(valid && angular.isDefined(minRange))
      			{
                              var minRangeDate = minRange == "today"?Date.now():minRange;
      				valid = theValue >= new Date(minRangeDate).getTime();
      			}
                        if(valid && angular.isDefined(maxRange))  
                        {
                              var maxRangeDate = maxRange == "today"?Date.now():maxRange;
                              valid = theValue <= new Date(maxRangeDate).getTime();
                        }
                        console.log("validateDate", theValue,valid);
                        ngModelCtrl.$setValidity(validationErrorKey, valid);
                        return valid?value: undefined;
      		}

      		if(validateType == "" || validateType == "number")
      		{
      			return validateNumeric(myValue);
      		} else if(validateType == "date") {
      			return validateDate(myValue);
      		} else {
      			ngModelCtrl.$setValidity(validationErrorKey, false);
      			throw new Error("Invalid type, must be 'number' or 'date'");
      			return undefined;
      		}
		}



		ngModelCtrl.$parsers.push(validate);
		ngModelCtrl.$formatters.push(validate);
		// scope.$watch(ngModelCtrl.$viewValue, function(){
		// 	console.log('watching');
		// 	validate(myValue);
		// })
      }
    };
  });
