'use strict';

/**
 * @ngdoc service
 * @name galleryApp.imgRetriever
 * @description
 * # imgRetriever
 * Provider in the galleryApp.
 */
angular.module('mySampleApp')
  .provider('imgRetriever', function () {

    // Private variables
    var serviceUrl; //the URL where we retrieve the information
    var imgData = []; //we save the data downloaded here
    var imgsPerPage = 9; //how many images should we retrieve at a time
    // var currentPage = 1;
    var isDummy = false;
    var totalPages = 1;
    
    // Public API for configuration
    this.setUrl = function (s) {
      serviceUrl = s;
      return this;
    };

    this.setImagesPerPage = function(s) {
      imgsPerPage = s;
      return this;
    };

    this.setUrlProperties = function(o) {
      //isma TODO
      // somehow give it the structure of the data, where in the response should it
      // look for the URLS, the title, the description?
      console.log('imgRetriever - WIP');
      return this;
    }
    //set this to true to iterate over and over the same images
    this.dummyData = function(b){
      isDummy = b;
    }

    // Method for instantiating
    this.$get = function ($http) {
      return {
        //gets all the images from the server, 
        //use carefully
        getImages: function(callback, page) {
          if(!angular.isFunction(callback)) {
            throw new Error("callback must be of type function");  
          } else if(!angular.isDefined(serviceUrl)) {
            throw new Error("Provider not configured, make sure you called imgRetrieverProvider.setUrl()");
          } else {
            $http.get(serviceUrl).then(function(data){
              imgData = data.data;
              //calculate total pages
              if(angular.isArray(imgData))
              {
                if(imgData.length > imgsPerPage)
                {
                  totalPages = Math.ceil((data.data.length / imgsPerPage));  
                }
              }
              callback(data.data);
            }, function(reason){
              callback(false, reason);
            });
          }
        },

        //get only one page at the time
        getPageImages: function(page, callback) {
          //isma TODO, validation

          //get as many images per page allowed
          if(angular.isDefined(imgData) && angular.isArray(imgData)) {
              page = page % totalPages;

              var startIdx = page * imgsPerPage;
              var endIdx  = startIdx + imgsPerPage - 1;
              // console.log(page, startIdx, endIdx);
              
              var res = [];
              for(var i=startIdx; i<=endIdx && i< imgData.length; i++)
              {
                res.push(imgData[i]);
              }
              callback(res);
              // callback(imgData.slice(startIdx, endIdx));
          }
        }
      };
    };
  });
