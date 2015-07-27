# gallery

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## 03. Infinite scroll gallery
Create a <scroll-gallery> element directive that when placed, creates an infinite scroll gallery.

### Usage

Add your directive to your view, use the galery-src attribute, it states which gallery it should look for in the galleryRequest service

Example: 
 <scroll-gallery gallery-src="flickrRecent"></scroll-gallery>

### The galleryRequest service
The scroll gallery directive depends on the galleryRequest service, you must use the
galleryRequestProvider to configure how the images are downloaded, parsed, and you can also
add support for multiple requests to different URLs.

#### The galleryRequestProvider
Method:
+ addSource(sourceObj)

This is the only method exposed by the provider, the source object must define the behavior and
data required by the service as follows:

- name: Must match the gallery-src attribute from the view.
- url: The url where the images are downloaded
- pageSize: How many images per page we want
- repeat: If we want to keep adding the same set of images over and over
- isExternal: We must set this to true if we are using an external server to get the images,
	internally it is used to know when to use JSONP instead of GET.
- schema: An object that defines some behavior for our directive

Example:
	var sourceObj = {
		name: "flickrRecent",
		url: "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=45210570c454827ff58b0551baa03ff3&extras=url_m&per_page=30&page=1&format=json&jsoncallback=JSON_CALLBACK",
		pageSize: 3,
		repeat: false,
		isExternal: true,
		schema: {see below}
	}

##### galleryRequestProvider schema
Each server returns the data in a different format and with a different schema, as an example, 
the flickr's public API returns an array of images in an array named "items", while the 
flickr's flickr.photos.getRecent API returns an object with an array named "photos".

To get around this issue you must define the schema object, failing to implement these methods
will get you an exception.

+ getServerDataArray: function(rawData)
	Here you must return the array containing all the images information, each entry on the 
	array will be passed to the getParsedImgData method.

	Arguments: The raw data as returned from the server.
	Expected return: An array containing the image information as returned by the server.

+ getParsedImgData: function(anImage)
	This method is used to map the server image format to one our directive understands.
	
	Arguments: An image as returned by the server, we must build and return an object for
	our directive.

	Expected return: An object literal containing the following properties, 
	none of them are mandatory:
		url: the url of the image
		title: a title for the image
		description: the image description
		width: the img width (number)
		height: the img height (number)

+ getServerError: function(rawData) 
	In case the external server returns an error, return false if there's no error, 
	return a string containing a the message from the server or a custom one.
	NOTE: It would be nice to return an object with many properties, such as 
	error code and msg.

	Arguments: the raw data as received from the server
	Expected return:
		- false, if there no error
		- A string with the error message

+ getNextUrl: function(currentUrl)
	In case you support different URLs to request images, this function will receive as
	a parameter the last URL used to request images, you must return the new URL you want to
	use to request more images.

	Arguments: The last URL used to request images
	Expected return: The next URL to use 

Example of the schema object:
schema: {
	getServerError: function(serverData) {
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
### Future improvements
Establish which method should we call when new images are loaded?

Make the nextPage() method public, so that users of our directive
decide when to request more images.

### Problems found during development
Laying out the page, as image sizes and ratio can vary.

Sources can be quite diverse, which results in more code by the users
of our directive (everything programmed with the schema object).

There's a strange bug where the page is auto-scrolled on reload, which 
was fixed by scrolling the page to the top on document ready, this is
called from the directive's controller and in a real scenario this may 
interfer with other code that may be positioning the site on purpose.
