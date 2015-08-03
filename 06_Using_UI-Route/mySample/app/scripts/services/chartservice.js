'use strict';

/**
 * @ngdoc service
 * @name mySampleApp.ChartService
 * @description
 * # ChartService
 * Factory in the mySampleApp.
 */
angular.module('mySampleApp')
  .factory('ChartService', function () {
    // Public API here
    return {
      loadGoogleVisualization: function (callback) {
        //isma, way to go! google.load is bugged, must add the "callback" parameter
        try {
          google.load('visualization', '1', {
            'callback':callback, 
            // 'callback':'console.log(\'google loaded\');', 
            'packages':['corechart']
          });
          return true;
        } catch(e) {
          console.log(e);
          return false;
        }
      }
    };
  });
