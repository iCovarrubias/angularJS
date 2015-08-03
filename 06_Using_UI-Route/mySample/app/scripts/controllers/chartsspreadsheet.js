'use strict';

/**
 * @ngdoc function
 * @name mySampleApp.controller:ChartsspreadsheetCtrl
 * @description
 * # ChartsspreadsheetCtrl
 * Controller of the mySampleApp
 */
angular.module('mySampleApp')
  .controller('ChartsspreadsheetCtrl', function ($scope, ChartService) {
    	var loadGoogle = ChartService.loadGoogleVisualization(loadGoogleCallback);
    	// console.log('Google Charts correctly');
		function loadGoogleCallback(){
    		// console.log('Google Charts a callback');
    		$scope.$apply(function(){
    			var data = [
					["AngularJS", "Ember.js", "Backbone.js", "Knockout"],
					[100, 75, 150, 20]
				];

				$scope.ssData = data;
				$scope.lineData = {
		    		columns: [
						["string", 'Framework'],
						["number", 'Users']
					],
					rows: [
						['AngularJS',$scope.ssData[1][0]],
						['Ember.js',$scope.ssData[1][1]],
						['Backbone.js',$scope.ssData[1][2]],
						['Knockout',$scope.ssData[1][3]],
					],
					options: {
						title: "Top JavaScript MVC Frameworks"
					}
				};
    		});
		}

		$scope.update = function() {
			$scope.lineData.rows[0][1] = +$scope.ssData[1][0];
			$scope.lineData.rows[1][1] = +$scope.ssData[1][1];
			$scope.lineData.rows[2][1] = +$scope.ssData[1][2];
			$scope.lineData.rows[3][1] = +$scope.ssData[1][3];
		}
  });
