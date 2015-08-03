'use strict';


angular.module('mySampleApp')
  .factory('rowFiller', function () {
    
    function fillAndResize(container, images, conf)
    {
      // it would be better to let the directive define the container width or at 
      // least which properties to use to calculate it
      var containerW = container.prop('scrollWidth');
      var rowW = containerW; //the row changes its width because of a 2px margin

      var imagesW = 0;
      var aRow = [];

      for(var i = 0; i < images.length; i++)
      {
        
        
        imagesW += images[i].width; //the original width as returned from the server
        aRow.push(images[i]);
        rowW -= 4;
        if(imagesW > rowW)
        {
          var ratio = rowW / imagesW;
          // var smallestImgH = 0;
          for(var j = 0; j <aRow.length; j++)
          {
            var img = angular.element("<img />");
                img.attr("src", aRow[j].url); //isma, relies on URL existence
            
            var width = aRow[j].width;
            var resizedWidth = width * ratio;
            // aRow[j].width = resizedWidth;
            img.attr('width',resizedWidth);
            container.append(img);
          }
          //row filled, so we get rid of the row contents
          aRow.splice(0, aRow.length);
          imagesW = 0;
          rowW = containerW;
        }
      }

      if(aRow.length > 0)
      {
        // console.log('does simple fill');
        simpleFill(container, aRow);
      }
    }

    //will append the images as they come
    function simpleFill(container, images, conf) {
      if(angular.isArray(images)) {
        for(var i=0; i<images.length; i++){
          var img = angular.element("<img />");
          img.attr("src", images[i].url); //isma, relies on URL existence
          container.append(img);
        }
      }
    }

    // Public API here
    return {
      simpleFill: simpleFill,
      fillAndResize: fillAndResize
    };
  });
