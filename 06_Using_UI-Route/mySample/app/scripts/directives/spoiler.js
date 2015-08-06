'use strict';

/**
 * @ngdoc directive
 * @name spoilerApp.directive:spoiler
 * @description
 * # spoiler
 */
angular.module('mySampleApp')
  .directive('spoiler', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var BACKGROUND_IMAGE_URL='url(images/spoiler/spoilers.gif)';
        var wrapper = angular.element('<span />');
          wrapper.addClass('spoiler-alert');
        
        element.wrap(wrapper);
        wrapper = element.parent();

        //wrap
        wrapper.css({
          'background-image': BACKGROUND_IMAGE_URL,
          'background-size': 'contain',
          'background-repeat': 'repeat-x',
          'background-origin': 'content-box'
        });      
        
        element.css({
          opacity: 0
        });

      	if(attrs['spoiler'] == 'censor')
      	{
          wrapper.addClass('spoiler-removed');
      	} else 
      	{
          //we must make it visible
          wrapper.addClass('spoiler-hidden');

          //show when hovering over the spoiler... tag
          wrapper.on('mouseover', function(evt){
            wrapper.css('background-image','none');
            element.css({
              'transition': '.5s all',
              'opacity': '1'
            });
          });

          //hide when leaving the parent the element containing the directive
          // var parent = element.parent();
          wrapper.on('mouseleave', function(evt) {
            // wrapper.text(wrapperText);
            wrapper.css({
              'background-image':BACKGROUND_IMAGE_URL});
            element.css({
              'transition': '.5s all',
              'opacity': '0'
            });
          });
      	
      	}
      }
    };
  });
