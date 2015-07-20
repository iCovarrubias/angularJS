# graph

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


## 01. Charts
Use the <graph> directive to draw a chart using google charts

### Requirements
Add the google charts API:
<script type="text/javascript" src="https://www.google.com/jsapi"></script>

Load the corecharts:
google.load('visualization', '1.0', { packages: ['corechart']});

The graph directive depends on the graphRender service, make sure you include it:
<script src="scripts/services/graphrender.js"></script>

Use the graph directive:
<graph g-data="lineData" g-type="pie"></graph>

Supported types are:
pie
bars
lines

Use the g-data attribute to pass data:
$scope.lineData = {
	columns: [
		["string", 'Framework'],
		["number", 'Users']
	],
	rows: [
		['AngularJS',100],
		['Ember.js',75],
		['Backbone.js',150],
		['Knockout',20],
	],
	options: {
		title: "Top JavaScript MVC Frameworks"
	}

};
