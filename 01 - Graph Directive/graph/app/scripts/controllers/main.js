'use strict';

/**
 * @ngdoc function
 * @name graphApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')
	.controller('MainCtrl', function ($scope) {
		var colors = {
			skin: "#D49C6A",
			mokka: "#804715",
			rose: "#D4706A",
			cherry: "#801B15",
			teal: "#417C81",
			darkTeal: "#0E48AE",
			leafGreen: "#52A55D",
			pokeGreen: "#10631B"
		};
    	$scope.barData = {
    		title: "A bar graphic of Power",
    		type: "bars",
    		max: 100,
    		data: [
	    		{value: 10, color: colors.cherry},
	    		{value: 20, color: colors.cherry},
	    		{value: 30, color: colors.cherry},
	    		{value: 40, color: colors.cherry},
	    		{value: 50, color: colors.cherry},
	    		{value: 60, color: colors.cherry},
	    		{value: 70, color: colors.cherry},
	    		{value: 80, color: colors.cherry},
	    		{value: 90, color: colors.cherry},
	    		{value: 100, color: colors.cherry}
    		],
    		xAxisLbl: "Period",
    		yAxisLbl: "the Y"
    	};

    	$scope.pieData = {

    	};


    	$scope.lineGraph = {

    	};
  });
