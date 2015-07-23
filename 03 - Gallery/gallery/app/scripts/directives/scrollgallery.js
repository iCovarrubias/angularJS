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
				var aRow = [];//an array containing a row of images
				
				// a helper function that fills each row
				//isma, this is not working, replaced with function simpleFillRow()
				function fillRow(imgCnt)
				{
					var	totalRowW = imgCnt.prop('scrollWidth'),
					rowW = totalRowW;

					var totalW = 0;
					for(var i =0; i < aRow.length; i++)
					{
						totalW += aRow[i].width;
					}

					for(var i = 0; i < scope.pageElems.length; i++)
					{
						var img = angular.element("<img />");
						img.attr("src", scope.pageElems[i].url); //isma, relies on URL existence
						
						totalW += scope.pageElems[i].width;
						aRow.push({img:img, width: scope.pageElems[i].width});
						rowW -= 4;
						if(totalW > rowW)
						{
							// fillRow(imgCnt, aRow, rowW, totalW);
							//reset everything
							if(totalWidth > rowW)
							{
								var ratio = rowW / totalWidth;
								// var smallestImgH = 0;
								for(var j = 0; j <arr.length; j++)
								{
									var img = arr[j].img,
										width = arr[j].width;

									var resizedWidth = width * ratio;
									arr[j].width = resizedWidth; //in case we don't fill the row
									img.attr('width',resizedWidth);
									element.append(img);
								}
								//row filled, so we get rid of the row contents
								aRow.splice(0, aRow.length);
							} else {
								//not enough images to fill the row

							}

							totalW = 0;
							rowW = totalRowW;
						}
					}
					if(aRow.length > 0)
					{
						fillRow(imgCnt, aRow, rowW);
					}
				}
				//A helper function to fill rows of images
				//this can become a service
				function simpleFillRow() {

				}



				//watch each time page elements changes
				function watcherFn(watchScope){
					return scope.pageElems;
				}
				scope.$watch(watcherFn, function(newVal, oldVal){
					
					if(angular.isDefined(newVal))
					{
						console.log(scope.pageElems.length)
						if(scope.pageElems.length == 0)
						{
							scope.endReached = true;
						} else {
							var imgCnt = element.find('.images-cont');
							fillRow(imgCnt);
							
						}
						
					}

				});

				

			}
		};
	});
