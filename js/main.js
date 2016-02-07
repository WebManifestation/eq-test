(function($) {

	// var controller = {

	// 	getBackgroundUrl: function() {
	// 		return dataObject.background;
	// 	}
	// };

	var loadedObject = {};

	function loadImgResource(key, src, callback) {
		loadedObject[key] = false;
		
		var $img = $('<img/>').attr('src', src)
						.load(function() {
							if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
					            return 'broken image!';
					        } else {
					        	var loadedArray = [];
					        	loadedObject[key] = true;
					        	$.each(loadedObject, function(key, loaded) {
					        		// console.log(key, loaded);
					        		loadedArray.push(loaded);
					        	});


					        	// console.log($.inArray(false, loadedArray));

					        	// if ($.inArray(false, loadedArray) == -1 ) {
					        	// 	$overlay.fadeOut(1000);
					        	// };

					            callback();
					        }
						});
	};

	function loadImages(array, callback) {

		var loadedImages = {};

		$.each(array, function(key, src) {

			loadedImages[key] = false;

			var $img = $('<img/>').attr('src', src)
							.load(function() {
								if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
						            return 'broken image!';
						        } else {
						        	var loadedArray = [];
						        	loadedImages[key] = true;
						        	$.each(loadedImages, function(key, loaded) {
						        		// console.log(key, loaded);
						        		loadedArray.push(loaded);
						        	});


						        	// console.log($.inArray(false, loadedArray));

						        	if ($.inArray(false, loadedArray) == -1 ) {
						        		// $overlay.fadeOut(1000);
						        		console.log('all images loaded');
						        		callback();
						        	};
						        }
							});

		});


	};

	// function loadAllImages(test) {
	// 	console.log('loading all images', test);

	// 	// need to know the structer of test object
	// 	$.each(test, function(i, val) {
	// 		// question
	// 		loadImgResource( i + '-question', val.question.style.background, function() { console.log('loaded:', i + '-question') });

	// 		//options
	// 		$.each(val.options, function(x, val) {
	// 			// console.log(x,val);
	// 			loadImgResource( i + '-'+ x + '-option', val.style.background, function() { console.log('loaded:',i + '-'+ x + '-option') });
	// 		});
	// 	});

	// };

	function getWindowHeight() {
		var windowHeight = $(window).outerHeight();

		return windowHeight;
	};


	var $overlay = $('.loading-overlay'),
		overlayUrl = 'img/loading.gif';

	// give loading overlay a background once resource is loaded
	loadImgResource('loader', overlayUrl, function() {
		console.log('overlay loaded!');
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
			console.log('background loaded!');
			$this.css({'background-image': 'url(' + backgroundImage + ')'});
			// loadAllImages(data.test);
			render.trigger();
		});
		// loadImgResource('test', 'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg', function() {
		// 	console.log('test loaded');
		// 	// $this.css({'background-image': 'url(' + backgroundImage + ')'});
		// });
	
		//
		var render = {

			meta: {
				status: 'loading',

			},

			checkStatus: function() {
				return this.meta.status;
			},

			setStatus: function(status) {
				this.meta.status = status;
			},

			getObject: function(key) {

				var key = parseInt(key);

				return data.test[key];
			},

			trigger: function() {
				var status = this.checkStatus();

				console.log('status:',status);

				if (status == 'loading') {

					this.setStatus('0');

					this.qNaRender();
				};
			},

			qNaRender: function() {
				console.log("let's start rendering");

				var status = this.checkStatus(),
					imagesArray = new Array();

				console.log('status:',status);

				// render status qNa object
				// get corresponding object
				var data = this.getObject(status);

				console.log('current obj', data);

				// load images

				imagesArray.push(data.question.style.background);

				$.each(data.options, function(x, option) {
					imagesArray.push(option.style.background);
				});

				loadImages(imagesArray, function() {
					console.log('All images loaded from array:', imagesArray);

					$overlay.fadeOut(1000);

					//render qNa obejct

					// $this.append($('<img/>', { src: data.question.style.background }));
				})

			}
		}
	}

	// var backgroundUrl = controller.getBackgroundUrl();

	// loadImgResource(backgroundUrl, function() {
	// 	console.log('loaded');
	// });




})(jQuery);