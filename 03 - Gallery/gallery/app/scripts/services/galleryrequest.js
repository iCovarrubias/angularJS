'use strict';

/**
 * @ngdoc service
 * @name galleryApp.galleryRequest
 * @description
 * # galleryRequest
 * Provider in the galleryApp.
 */
angular.module('galleryApp')
  .provider('galleryRequest', function () {
    //a collection of image sources
    var imgSrc = {};
    //add a source with options
    this.addSource = function(src){
      if(angular.isObject(src)){
        //required data
        if(angular.isUndefined(src.name)) {
          throw new Error("'name' of your source must be defined");
        }
        if(angular.isUndefined(src.url)) {
          throw new Error("'url' of your source must be defined");
        }

        //deep copy the source
        var obj = {};
        angular.copy(src, obj);

        //defaults
        if(angular.isUndefined(obj.pageSize)) {
          obj.pageSize = 9; //the images per page
        }
        if(angular.isUndefined(obj.repeat))
        {
          obj.repeat = false;
        } else {
          obj.repeat = !!obj.repeat; //use the boolean value
        }
        obj.imgData = []; //this is where our image data is saved
        obj.totalPages = 1;
        imgSrc[obj.name] = obj;
        return this;
      }
    }

    // Method for instantiating
    this.$get = function ($http) {
      return {
        getImages: function(src, callback) {
          if(!angular.isFunction(callback)) {
            throw new Error("'callback' must be of type function");  
          } else if(!angular.isDefined(imgSrc[src])) {
            throw new Error("Provider not configured for this source:" + src);
          } else {
            var galSrc = imgSrc[src];

            $http.get(galSrc.url).then(function(data){
              //isma, TODO: format according to the schema
              galSrc.imgData = data.data;
              
              //calculate total pages
              if(angular.isArray(galSrc.imgData))
              {
                if(galSrc.imgData.length > galSrc.pageSize)
                {
                  galSrc.totalPages = Math.ceil((data.data.length / galSrc.pageSize));  
                }
              }
              callback(galSrc.imgData);
            }, function(reason){
              callback(false, reason);
            });
          }
        },

        //get only one page at the time
        getPageImages: function(src, page, callback) {
          //isma TODO, validation

          var galSrc = imgSrc[src];
          //get as many images per page allowed
          if(angular.isDefined(galSrc) && angular.isArray(galSrc.imgData)) {
              //isma TODO: add behavior when dummyData is false
              page = page % galSrc.totalPages;

              var startIdx = page * galSrc.pageSize;
              var endIdx  = startIdx + galSrc.pageSize - 1;
              // console.log(page, startIdx, endIdx);
              
              var res = [];
              for(var i=startIdx; i<=endIdx && i< galSrc.imgData.length; i++)
              {
                res.push(galSrc.imgData[i]);
              }
              callback(res);
              // callback(imgData.slice(startIdx, endIdx));
          }
        }
      }
    };
  });
