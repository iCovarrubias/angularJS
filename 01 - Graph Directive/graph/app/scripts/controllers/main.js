'use strict';

//isma, really , no better place than here?
// google.load('visualization', '1.0', { packages: ['corechart']});
// 'callback':'console.log(\'success\');'
/**
 * @ngdoc function
 * @name graphApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')
	.controller('MainCtrl', function ($scope, ChartService) {
		
		var loadGoogle = ChartService.loadGoogleVisualization();
		if(loadGoogle)
		{
			google.setOnLoadCallback(function() {
				if(google.visualization.DataTable)
				{
					$scope.$apply(function(){
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

						$scope.barData = $scope.pieData;

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
					});//end $applu

					
					
				}
				else
				{
					throw new Error('There was an error loading Google Charts');
				}
					
			});
		}
		// function loadCallback() {
			// var data = new google.visualization.DataTable();

			// $scope.$apply(function() {
				
			// });
		// }
		// google.setOnLoadCallback(loadCallback);

		

    	// $scope.barData = $scope.pieData;


    	


    	$scope.reset = function(){
    		//isma, this replaces the old pieData object
    		//now bar is a different object, which is expected
    		// to demonstrate how watchers work
    		$scope.pieData = {
				rows: [
					['Mushrooms', 1],
					['Onions', 4],
					['Olives', 2], 
					['Zucchini', 1],
					['Pepperoni', 0]
				],
				options: {},
				columns: [
					["string","Topping"],
					["number","Slices"]
				]
			};
    	};


    	$scope.addOne = function() {
    		//isma, probabbly going to break if pieData.rows doesn't exist
    		//anyways this is only to demonstrate that the chart is correctly updated
    		// $scope.$apply(function()
    		{
	    		for(var i=0; i < $scope.pieData.rows.length; i++)
	    		{
	    			$scope.pieData.rows[i][1]++;
	    		}
	    		console.log($scope.pieData.rows);
    		}
    		// );
    	};
  });
