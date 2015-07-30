'use strict';

/**
 * @ngdoc function
 * @name formMatchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the formMatchApp
 */
angular.module('formMatchApp')
  .controller('MainCtrl', function ($scope) {
    $scope.data = {};

    $scope.validate = function(){
    	console.log('Is valid:', !!myForm.$valid);
    	$scope.showValidation = !myForm.$valid; 
    }
  });
