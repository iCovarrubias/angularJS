'use strict';

//isma, really , no better place than here?
google.load('visualization', '1.0', { packages: ['corechart']});

/**
 * @ngdoc function
 * @name graphApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')
	.controller('MainCtrl', function ($scope) {
		
		function loadCallback() {
			var data = new google.visualization.DataTable();

			$scope.$apply(function() {
				$scope.pieData = {
					rows: [
						['Mushrooms', 3],
						['Onions', 1],
						['Olives', 1], 
						['Zucchini', 1],
						['Pepperoni', 2]
					],
					options: {},
					columns: [
						["string","Topping"],
						["number","Slices"]
					]
				};
			});
		}
		google.setOnLoadCallback(loadCallback);

    	$scope.barData = {

    	};


    	$scope.lineGraph = {

    	};
  });
