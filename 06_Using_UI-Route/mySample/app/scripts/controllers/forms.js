'use strict';

/**
 * @ngdoc function
 * @name mySampleApp.controller:FormsCtrl
 * @description
 * # FormsCtrl
 * Controller of the mySampleApp
 */
angular.module('mySampleApp')
  .controller('FormsCtrl', function ($scope) {
  	// $scope.data = {};

  	 $scope.errMsgs = {
    	elErrorAlpha: "CTRL Error: solo se permiten letras y una sola palabra",
    	rangeDate: "CTRL Error: fecha fuera de rango",
    	rangeNumber: "CTRL Error: Número fuera de rango",
    	match: "CTRL Error: el número no coincide"
    };

    $scope.validate = function(){
    	console.log('Is valid:', !!myForm.$valid);
    	$scope.showValidation = !myForm.$valid; 
    }
  });
