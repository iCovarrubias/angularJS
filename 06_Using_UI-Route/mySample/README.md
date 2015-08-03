# my-sample

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


## Probelms found
Using UI-Router $stateProvider and $urlRouterProvider:
	I didn't understand at first how closely related the $urlRouterProvider.otherwise() method
	and the url property in state definition are, the otherwise() method will change the url to:
	http://localhost:9000/#/

	So if you omit the URL in the main view it will not be found:
	.state('main', {
		url: "/",
		templateUrl: "/views/main.html"
	})


Importing my already done excercises was not as sweet as developing them:
I either had to add more modules to my app or import them and change the module
manually (which is what I did).

I had to add the <script /> tags manually to the index.html file, I was used
to yeoman adding them from me.

Overall the way to go was to use a yeoman generator that allowed me to generate 
components that I could later export, but I couldn't find an official one.
There was a way to make my modules public, but I didn't want to polute the Internet
with my code. 


In the spreadsheet_charts tab, if data is not on scope  when the application is bootstrapped, 
then the HandsOnTable "data" property gets set to undefined, later when we load the charts
and assign the "ssData" attribute to a new object, the binding to the data in the spreadsheet
is lost., you must use the loadData method to compensate for this.