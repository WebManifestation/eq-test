(function($) {

	// var controller = {

	// 	getBackgroundUrl: function() {
	// 		return dataObject.background;
	// 	}
	// };

	var loadedObject = {};

	function loadImgResource(key, src, callback) {
		loadedObject[key] = false;
		console.log(loadedObject);
		var $img = $('<img/>').attr('src', src)
						.load(function() {
							if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
					            return 'broken image!';
					        } else {
					        	loadedObject[key] = true;
					        	$.each(loadedObject, function(key, loaded) {
					        		console.log(key, loaded);
					        		if (!loaded) {
					        			return false;
					        		} else {
					        			$overlay.fadeOut(1000);
					        		};
					        	});
					            callback();
					        }
						})
	};

	function getWindowHeight() {
		var windowHeight = $(window).outerHeight();

		return windowHeight;
	};


	var $overlay = $('.loading-overlay'),
		overlayUrl = 'img/loading.gif';

	// give loading overlay a background once resource is loaded
	loadImgResource('loader', overlayUrl, function() {
		console.log('image loaded!');
		$overlay.css({'background-image': 'url(' + overlayUrl + ')'});
	});

	// set width to window
	$.fn.fixToWindowHeight = function() {
		var $this = this;

		// min window height on load
		$this.css({ 'min-height' : getWindowHeight() });

		// min window height on resize
		$(window).resize(function() {
			$this.css({ 'min-height' : getWindowHeight() });
		});
	};


	// main plugin
	$.fn.eqTest = function(data) {
		var $this = this;
		// console.log($this);

		// set container height
		$this.fixToWindowHeight();
		// set container background
		var backgroundImage = data.backgroundImage,
			backgroundColor = data.backgroundColor;
		// color
		$this.css({'background-color':  backgroundColor});
		// image
		loadImgResource('background', backgroundImage, function() {
			$this.css({'background-image': 'url(' + backgroundImage + ')'});
		});
	}

	// var backgroundUrl = controller.getBackgroundUrl();

	// loadImgResource(backgroundUrl, function() {
	// 	console.log('loaded');
	// });




})(jQuery);