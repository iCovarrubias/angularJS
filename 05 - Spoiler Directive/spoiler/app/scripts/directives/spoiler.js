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
      // template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	if(attrs['spoiler'] == 'censor')
      	{
      		//censor, the text will be hidden and unaccessible
      		var wrapper = angular.element('<span />');
      		wrapper.text('spoiler...');
      		wrapper.css('display','inline');
      		element.wrap(wrapper);

      		element.css('visibility','hidden');
      	} else 
      	{
      		var parent = element.parent();
      		parent.hover(function(evt){
      			//isma, do a fancy animation?
      			element.css('visibility', 'visible');
      		}, function(evt) {
      			element.css('visibility', 'hidden');
      		});

      		element.css(
      		{
      			'visibility':'hidden'
      		});

      		
      	}
        // element.text('this is the spoiler directive');
      }
    };
  });
