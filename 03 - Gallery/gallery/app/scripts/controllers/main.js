'use strict';

/**
 * @ngdoc function
 * @name galleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the galleryApp
 */
angular.module('galleryApp')
	.config(function(galleryRequestProvider) {
		var srcLocal = {
			name: "local",
			url: "scripts/services/dummyData.js",
			pageSize: 5,
			repeat: true
		};
		galleryRequestProvider.addSource(srcLocal);

		// imgRetrieverProvider.setUrl('scripts/services/dummyData.js')
		// 	.setImagesPerPage(5)
		// 	.dummyData(true);
	})
	.controller('MainCtrl', function ($scope) {
		$scope.aData = "some data on my main controller";
		$scope.aBehavior = function(){
			console.log("a behavior on my main controller");
		}
	});
