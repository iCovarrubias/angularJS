'use strict';

/**
 * @ngdoc directive
 * @name galleryApp.directive:scrollGallery
 * @description
 * # scrollGallery
 */
angular.module('mySampleApp')
	.directive('scrollGallery', function(galleryRequest, rowFiller) {

		return {
			template: '<div class="images-cont"></div>\
				<div> \
					<span class="label label-info" ng-show="endReached">No more images to show</span> \
				</div>',
			restrict: 'E',
			scope: {
				gallerySrc: "@"
			},
			controller: function($scope, $element, $attrs){
				var currentPage = 0;
				//request all the images
				if(angular.isUndefined($scope.gallerySrc))
				{
					throw new Error('"gallery-src" attribute not defined in directive');
				}
				galleryRequest.getImages($scope.gallerySrc, function(data, reason){
					if(data) {
						if(angular.isArray(data))
						{
							//we've got the data time to get and display 
							// the first set of images
							$scope.getNextPage();
						}
					} else {
						throw new Error(reason);
					}
				});

				$scope.getNextPage = function() {
					galleryRequest.getPageImages($scope.gallerySrc, currentPage++, function(pageImages){
						//we don't really care about the previous set, so we 
						//completely replace it
						$scope.pageImages = pageImages;
					});
				}
			},

			link: function(scope, element, attrs) {

				var imgCnt = element.find('.images-cont');

				//watch each time page elements changes
				function watcherFn(watchScope){
					return scope.pageImages;
				}
				scope.$watch(watcherFn, function(newVal, oldVal){
					
					if(angular.isDefined(newVal))
					{
						console.log(scope.pageImages.length)
						if(scope.pageImages.length == 0)
						{
							scope.endReached = true;
						} else {
							
							
							//pass the container, an array of images and a configuration object
							//containing max-width/max-height and that kind of stuff
							// rowFiller.fillAndResize(imgCnt, scope.pageImages);
							rowFiller.simpleFill(imgCnt, scope.pageImages);
						}
						
					}

				});

				var win = angular.element(window);
				var doc = angular.element(document);
				//check window bounds for scrolling
				function checkBounds(evt){

					// console.log(win.scrollTop() + win.height() , 
					// 	"[" + win.scrollTop() + " + " + win.height() + "]",
					// 	doc.height());

					if(win.scrollTop() + win.height() >= doc.height())
					{
						scope.$apply(function(){scope.getNextPage()});
					}
				}

				win.on('scroll wheel keydown', checkBounds);

				//prevent page from scrolling and loading a bunch of images
				angular.element(document).ready(function(){
					win.scrollTop(0);
				});

			}
		};
	});
