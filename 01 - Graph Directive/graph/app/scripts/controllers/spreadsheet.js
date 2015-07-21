'use strict';

/**
 * @ngdoc function
 * @name graphApp.controller:SpreadsheetCtrl
 * @description
 * # SpreadsheetCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')
  .controller('SpreadSheetCtrl', function ($scope) {
    var data = [
		["", "Ford", "Volvo", "Toyota", "Honda"],
		["2014", 10, 11, 12, 13],
		["2015", 20, 11, 14, 13],
		["2016", 30, 15, 12, 13]
	];

	$scope.ssData = data;
  });
