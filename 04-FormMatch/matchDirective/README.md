# form-match
Provide custom validation directives for:
+ Checking that the value of multiple fields coincide
+ Value within range
	+ dates
	+ numbers
+ Ensuring that a value is of a specific data type
	+ alphabetic characters
	+ number
+ Custom error messages.


All of the directives make use of the ngModel controller, so you must provide a name
in the form and in the input element.

You can use CSS to style your elements as with angular's built in validation.


## Custom error messages
Use the error-msg attribute on any directive to add a custom error message.
You must pass an expression to this parameter.

Example with a string:
<input name="aNumber" type="text" class="form-control"
	ng-model="data.aNumber" 
	validate-range min-range="10" max-range="80" 
	error-msg="'The number you are setting is out of range'"/> 

Example with a binding:
<input name="aNumber" type="text" class="form-control"
	ng-model="data.aNumber" 
	validate-range min-range="10" max-range="80" 
	error-msg="errMsgs.rangeNumber"/> 

Where errMsgs.rangeNumber is a string that exists in scope.

## validate-match directive
Checks that the value of a field is equal to another.

### Usage
Example:
	<input name="ccvConfirm" ng-model="aValue" validate-match="data.ccv" />

This checks if the input value is equals to data.ccv.

### CSS
Validation error key: equal
When valid: ng-valid-equal
When invalid: ng-invalid-equal


## validate-range directive
Checks that a value is within range. You can set this directive "number" and "date", 
if type is ommited then is set to "number" by default.

Use this directive with the attributes min-range and max-range, if the attribute is missing
then it would validate as if there was no restriction on range, for example, 
if you set min-range=10 and ommit max-range, then any value above equals or greater than 10 
will be valid.

For dates, you can set min and max ranges to "today".

### Usage
Example for numbers:
	<input name="aNumber" type="text" 
		ng-model="data.aNumber" 
		validate-range min-range="10" max-range="80" />

Example for dates:
	<input name="aDate" type="date" class="form-control"
		ng-model="data.aDate"
		validate-range="date" min-range="09/19/1986" max-range="today"/> 

### CSS
Validation error key: range
When valid: ng-valid-range
When invalid: ng-invalid-range

## validate-type directive
Checks if the value type is valid, you can set this directive to "number" or "alpha", 
if type is ommited then is set to "alpha" by default.

### Usage
For alphabetic values:
	<input name="alpaChar" type="text" class="form-control"
		ng-model="data.alphaChars" validate-type /> 

For numbers:
	<input name="numericNum" type="text" class="form-control"
		ng-model="data.numericNumbers" validate-type="number"/> 

### CSS
Validation error key: type
When valid: ng-valid-type
When invalid: ng-invalid-type


### Problems found during development
Pass this to your notes!
+ Using the ngModelController:
	We can expose the ngModelController on the scope by providing a name for the form and a name for the input element. 

	We can use the "require" field in the directive's definition object to request the ngModel controller:
	{
		require: 'ngModel'
	}

+ Using the '?' in the require parameter
	Prefixing the controller name in the require field makes the controller optional:
	{ require: '?ngModel' }

	You can combine it with the ancestor paramete:
	{ require: '^?ngMode;' }

We push this into the $parsers and $formatters pipelines, so that the validation function gets called each time either the model or the view changes.

+ Double escaping the apostrophe
If you want to use apostrophes when evaluating strings with scope.$eval() 
you need to double escape them: 
	"'Error: value doesn\\'t match'"

If you start your string with a single quote, there's no need to double escape:
	'"Error: value doesn\'t match"'

