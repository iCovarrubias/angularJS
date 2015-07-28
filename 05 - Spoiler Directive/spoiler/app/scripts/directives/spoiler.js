'use strict';

/**
 * @ngdoc directive
 * @name spoilerApp.directive:spoiler
 * @description
 * # spoiler
 */
angular.module('spoilerApp')
  .directive('spoiler', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var wrapper = angular.element('<span />');
          wrapper.addClass('spoiler-alert');
          wrapper.css('display','inline');

        var originalText = element.text();
      	if(attrs['spoiler'] == 'censor')
      	{
          wrapper.addClass('spoiler-removed');
          wrapper.text('spoiler removed...');
      		//censor, the text will be hidden and unaccessible
      		element.wrap(wrapper);
      		element.css('visibility','hidden');
      	} else 
      	{
          //we must make it visible
          var wrapperText='spoiler...';
          wrapper.addClass('spoiler-hidden');
          wrapper.text(wrapperText);
          element.before(wrapper);

          //show when hovering over the spoiler... tag
          wrapper.on('mouseover', function(evt){
            wrapper.text("");
            element.css({
              'transition': '.5s all',
              'opacity': 1
            });
          });

          //hide when leaving the parent the element containing the directive
          var parent = element.parent();
          parent.on('mouseleave', function(evt) {
            wrapper.text(wrapperText);
            element.css({
              'transition': '.5s all',
              'opacity': 0
            })
          });
      		
      		element.css('opacity',0);
      	}
        // element.text('this is the spoiler directive');
      }
    };
  });
