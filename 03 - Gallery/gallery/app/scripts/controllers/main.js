'use strict';

/**
 * @ngdoc function
 * @name galleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the galleryApp
 */
angular.module('galleryApp')
	.config(function(galleryRequestProvider) {
		var srcLocal = {
			name: "local",
			url: "scripts/services/dummyData.js",
			pageSize: 5,
			repeat: true,
			schema: {
				getServerError: function(serverData) {
					return false;
				},
				getDataArray: function(serverData) {
					return serverData;
				},
				getParsedImgData: function(anImage) {
					var result = {
						url: anImage.url,
						title: anImage.title,
						description: anImage.description,
						width: anImage.width,
						height: anImage.height
					};
					return result;
				}
			}
		};
		galleryRequestProvider.addSource(srcLocal);

		var srcFlickr = {
			name: "flickr",
			url: "https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK",
			pageSize: 2,
			repeat: false,
			isExternal: true,
			schema: {
				getServerError: function(serverData) {
					return false;
				},
				getDataArray: function(serverData) {
					return serverData.items;
				},
				getParsedImgData: function(anImage) {
					return {
						url: anImage.media.m
					};
				}
			}
		};
		galleryRequestProvider.addSource(srcFlickr);
		

		var srcFlickrRecent = {
			name: "flickrRecent",
			url: "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=45210570c454827ff58b0551baa03ff3&extras=url_m&per_page=30&page=1&format=json&jsoncallback=JSON_CALLBACK",
			pageSize: 3,
			repeat: false,
			isExternal: true,
			schema: {
				getServerError: function(serverData) {
					//return the error if exists
					if(serverData && serverData.stat == "ok")
					{
						return false;//no error
					}

					return serverData.message + "\nvisit:" + "https://www.flickr.com/services/api/explore/flickr.photos.getRecent";
				},
				getDataArray: function(serverData){
					return serverData.photos.photo;
				},
				getParsedImgData: function(anImage){
					// Must return an object with URL, title, description
					// and if available, add width and height
					var result = {
						url: anImage.url_m,
						title: anImage.title,
					};
					return result;
				},
				getNextUrl: (function(){
					var page = 1;
					return function(currentUrl){
						var result = currentUrl.replace(/\bpage\=\d+\b/,"page=" +(++page));
						return result;
					}
				})()
			}
		};
		galleryRequestProvider.addSource(srcFlickrRecent);

		var srcGoogleImages = {
			name: "googleImages",
			url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=pokemon&callback=JSON_CALLBACK",
			pageSize: 5,
			repeat: false,
			isExternal: true,
			schema: {
				getServerError: function(serverData) {
					return false;
				},
				getDataArray: function(serverData){
					return serverData.responseData.results;
				},
				getParsedImgData: function(anImage) {
					return {
						url: anImage.unescapedUrl
					};
				}
			}
		};
		galleryRequestProvider.addSource(srcGoogleImages);


	})
	.controller('MainCtrl', function ($scope) {
		$scope.aData = "some data on my main controller";
		$scope.aBehavior = function(){
			console.log("a behavior on my main controller");
		}
	});
