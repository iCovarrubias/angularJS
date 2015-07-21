'use strict';

/**
 * @ngdoc service
 * @name graphApp.ChartService
 * @description
 * # ChartService
 * Factory in the graphApp.
 */
angular.module('graphApp')
  .factory('ChartService', function () {
    // Public API here
    return {
      loadGoogleVisualization: function () {
        //isma, way to go! google.load is bugged, must add the "callback" parameter
        try {
          google.load('visualization', '1', {
            'callback':'console.log(\'success\');', 
            'packages':['corechart']
          });
          return true;
        } catch(e) {
          return false;
        }
      }
    };
  });
