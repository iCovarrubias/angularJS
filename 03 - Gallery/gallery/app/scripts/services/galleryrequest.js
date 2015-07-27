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
    this.addSource = function(src) {
      if(angular.isObject(src)){
        //required data
        if(angular.isUndefined(src.name)) {
          throw new Error("'name' of your source must be defined");
        }
        if(angular.isUndefined(src.url)) {
          throw new Error("'url' of your source must be defined");
        }
        if(angular.isUndefined(src.schema))
        {
          throw new Error("Define a schema");
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

       
        if(angular.isUndefined(obj.schema.data)){
          obj.schema.data = {};
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
        getImages: function(src, callback) 
        {
          if(!angular.isFunction(callback)) {
            throw new Error("'callback' must be of type function");  
          } else if(!angular.isDefined(imgSrc[src])) {
            throw new Error("Provider not configured for this source:" + src);
          } else 
          {
            var galSrc = imgSrc[src];

            var httpMethod = "get";
            if(galSrc.isExternal)
            {
              httpMethod = "jsonp";
            } 
            $http[httpMethod](galSrc.url).then(function(data){
              var imgData = [];
              var rawData = data.data;
              var servError = galSrc.schema.getServerError(rawData);
              if(servError)
              {
                callback(false, servError);
                return;
              }
              
              var serverData = galSrc.schema.getDataArray(rawData);

              if(angular.isArray(serverData))
              {
                for(var i=0; i<serverData.length; i++)
                {
                  var serverImg = serverData[i]; //a single image from the server
                  
                  var img = galSrc.schema.getParsedImgData(serverImg);
                  
                  //Isma: we could check if the image already exists in galSrc.imgData
                  //  but can result in poor performance
                  imgData.push(img);
                }
                galSrc.imgData = galSrc.imgData.concat(imgData);
              }

              // if(angular.isArray(galSrc.imgData)){
                //calculate total pages
                if(galSrc.imgData.length > galSrc.pageSize)
                {
                  galSrc.totalPages = Math.ceil((galSrc.imgData.length / galSrc.pageSize));  
                }
                callback(galSrc.imgData);
              // }
            },function(reason)
            {
              callback(false, reason);
            });
          }
        },

        //get only one page at the time
        getPageImages: function(src, page, callback, noReload) {
          //isma TODO, validation

          var galSrc = imgSrc[src];
          //get as many images per page allowed
          if(angular.isDefined(galSrc) && angular.isArray(galSrc.imgData)) {
              if(galSrc.repeat)
              {
                page = page % galSrc.totalPages;
              } else if(page >= galSrc.totalPages)
              {
                if(galSrc.schema.getNextUrl && !noReload)
                {
                  console.log("Ran out of images! request more");
                  galSrc.url = galSrc.schema.getNextUrl(galSrc.url);
                  var ctx = this;
                  this.getImages(galSrc.name, function(data){
                    if(!data)
                    {
                      console.error("A problem occurred while downloading more images");
                      callback([]);
                    } else 
                    {
                      console.warn("More images were downloaded, no reload");
                      ctx.getPageImages(src, page, callback, true);
                    }
                  });
                } else {
                  //out of images
                  callback([]);
                }
                return;
              }
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
