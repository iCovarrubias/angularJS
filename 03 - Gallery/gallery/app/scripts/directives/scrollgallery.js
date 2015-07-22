'use strict';

/**
 * @ngdoc directive
 * @name galleryApp.directive:scrollGallery
 * @description
 * # scrollGallery
 */
angular.module('galleryApp')
	.directive('scrollGallery', function(galleryRequest) {

		return {
			template: '<div class="images-cont"></div>\
				<div>\
					<button class="btn btn-primary" ng-click="getNextPage()">\
					More Images!</button>\
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
				galleryRequest.getImages($scope.gallerySrc, function(data){
					if(data) {
						if(angular.isArray(data))
						{
							//we've got the data time to get and display 
							// the first set of images
							$scope.getNextPage();
						}
					}
				});

				$scope.getNextPage = function() {
					galleryRequest.getPageImages($scope.gallerySrc, currentPage++, function(pageImages){
						//we don't really care about the previous set, so we 
						//completely replace it
						$scope.pageElems = pageImages;
					});
				}
			},

			link: function(scope, element, attrs) {

				function watcherFn(watchScope){
					return scope.pageElems;
				}
				scope.$watch(watcherFn, function(newVal, oldVal){
					
					if(angular.isDefined(newVal))
					{
						console.log(scope.pageElems.length)
						var imgCnt = element.find('.images-cont');
						for(var i = 0; i < scope.pageElems.length; i++)
						{
							var img = angular.element("<img />");
							img.attr("src", scope.pageElems[i].url); //isma, relies on the fact that URL exists
							imgCnt.append(img);							
						}
					}

				});

				

			}
		};
	});
