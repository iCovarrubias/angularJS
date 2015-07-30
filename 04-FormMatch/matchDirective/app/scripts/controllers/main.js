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

    $scope.errMsgs = {
    	elErrorAlpha: "Error: solo se permiten letras y una sola palabra",
    	rangeDate: "Error: fecha fuera de rango",
    	rangeNumber: "Error: Número fuera de rango",
    	match: "Error: el número no coincide"
    };

    $scope.validate = function(){
    	console.log('Is valid:', !!myForm.$valid);
    	$scope.showValidation = !myForm.$valid; 
    }
  });
