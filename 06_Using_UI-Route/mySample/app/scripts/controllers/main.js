'use strict';

/**
 * @ngdoc function
 * @name mySampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mySampleApp
 */
angular.module('mySampleApp')
.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  	//unmatched URLs
  	$urlRouterProvider.otherwise("/");

  	//define states
  	$stateProvider
  		.state('main', {
  			url: "/",
  			templateUrl: "/views/main.html"
  		})
  		.state('charts', {
  			url: "/charts",
  			templateUrl: "/views/state/charts.html",
        controller: 'ChartsCtrl'
  		})
  		.state('spreadsheets', {
  			url: "/spreadsheets",
  			templateUrl: "/views/state/spreadsheets.html",
        controller: "SpreadSheetCtrl"
  		})
      .state('charts_spread', {
        url: "/charts_spread",
        templateUrl: "/views/state/charts_spread.html",
        controller: "ChartsspreadsheetCtrl"
      })
  		.state('forms', {
  			url: "/forms",
  			templateUrl: "/views/state/forms.html",
        controller: "FormsCtrl"
  		})
  		.state('spoiler', {
  			url: "/spoiler",
  			templateUrl: "/views/state/spoiler.html"
        // controller: "spoilerCtrl"
  		})
      .state('galleries_local', {
        url: "/galleries/local",
        controller: "GalleryCtrl",
        templateUrl: "/views/state/galleries/local.html"
      })
      .state('galleries_flickr', {
        url: "/galleries/flickr",
        controller: "GalleryCtrl",
        templateUrl: "/views/state/galleries/flickr.html"
      })
      .state('galleries_flickr_recent', {
        url: "/galleries/flickr_recent",
        controller: "GalleryCtrl",
        templateUrl: "/views/state/galleries/flickr_recent.html"
      })
      .state('galleries_google', {
        url: "/galleries/googleImages",
        controller: "GalleryCtrl",
        templateUrl: "/views/state/galleries/google.html"
      });
}])
.controller('MainCtrl', function ($scope) {
	$scope.appTitle = "Exercise 6";
});
