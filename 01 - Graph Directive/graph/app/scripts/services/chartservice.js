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
        // console.log('trying to load google visualization');
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
