/*
* laybox
* By: HanSeungho landboy@gmail.com
* Version: 1.1.0
* Updated: 2014-04-04
*/

(function($) {
	var $win = $(window),
		$dom = $(document),
		$box = $.laybox = function() {
			return $box.open.apply(this, arguments);
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isImage = function(str) {
			return isString(str) && str.match(/\.(jp(e|g|eg)|gif|png|bmp)(.*)?$/i);
		},
		isSwf = function(str) {
			return isString(str) && str.match(/\.(swf)(.*)?$/i);
		},
		getViewPortSize = function(n) { return {
			width: (self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + n,
			height: (self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + n
		}},
		getFrameSize = function(obj) {
			var width = height = 0;

			try {
				$(obj).contents().find('body').children().filter(function() { return this.nodeType == 1; }).each(function() {
					if (width < this.offsetWidth) width = this.offsetWidth;
					height += this.offsetHeight;
				});
			}
			catch (e) {}

			return {
				width: width,
				height: (height + 1)
			}
		},
		getScrollbarSize = function() { // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
				child = parent.children(),
				width = child.innerWidth() - child.height(99).innerWidth();
			parent.remove();
			return width;
		}
	;

	$.extend($box, {
		ids: {
			mask: 'laybox-mask',
			loading: 'laybox-loading',
			canvas: 'laybox-canvas',
			close: 'laybox-close',
			frame: 'laybox-frame'
		},

		defaults: {
			type: '', // image, inline, iframe, ajax
			source: '', // image: url, inline: element id, iframe: url, ajax: { type, dataType, url, data ... }
			width: 0,
			height: 0,
			borderSize: 10,
			borderColor: '#fff',
			mask: true,
			maskColor: '#333',
			maskOpacity: 20,
			maskClose: true,
			loading: true,
			loadingWdith: 32,
			loadingHeight: 32,
			loadingImage: '/images/boxLoading32.gif',
			close: true,
			closeTop: -10,
			closeRight: -10,
			closeImage: '/images/boxClose24.png',
			position: 'centered', // centered, centered-horizontal, fixed
			positionLeft: null,
			positionTop: null,
			canvasPadding: 0,
			canvasBgColor: '#fff',
			canvasResizing: true,
			ajaxed: false // laybox ajax
		},

		opts: {},

		viewPortPadding: 30,
		
		ajaxLoad: null,
		imgPreload: null,

		active: false,

		/* open box */
		open: function(opts, obj) {
			if (!$box.active) {
				$box.active = true;

				opts = opts || {};

				$box.close(opts);

				if (obj) {
					var $obj = $(obj);
					opts.type = ($obj.attr('laybox-type') || opts.type);
					opts.source = ($obj.attr('href') || opts.source);
					opts.width = ($obj.attr('laybox-width') || opts.width);
					opts.height = ($obj.attr('laybox-height') || opts.height);
				}

				if (opts.source && !opts.type) {
					if (isImage(opts.source)) {
						opts.type = 'image';
					}
					else if (isSwf(opts.source)) {
						opts.type = 'swf';
					}
					else if (opts.source.charAt(0) === '#') {
						opts.type = 'inline';
					}
				}

				$box.opts = $.extend({}, $box.defaults, opts);

				if (!$box.opts.type || !$box.opts.source) {
					$box.close();
					return;
				}

				var types = $box.opts.type.split('.');

				// hide object element
				$box.hide(true);

				// mask
				if ($box.opts.mask) $box.create.mask();
				// loading
				if ($box.opts.loading) $box.create.loading();

				// canvas
				var $canvas = $box.create.canvas();

				switch (types[0]) {
					case 'image':
						var img = $box.imgPreload = new Image();
						img.onerror = function() {
							this.onerror = this.onload = null;
							$box.error();
						};
						img.onload = function() {
							this.onerror = this.onload = null;

							$box.opts.width = this.width;
							$box.opts.height = this.height;

							$("<img />").attr({
								'src': this.src,
								'alt': ""
							}).appendTo($canvas.children());

							$box.loaded();
						};
						img.src = $box.opts.source;
					break;
					case 'swf':
						var html = '<object id="laybox-swf" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%">'+
							'<param name="allowScriptAccess" value="always" />'+
							'<param name="movie" value="'+$box.opts.source+'" />'+
							'<param name="quality" value="high" />'+
							'<param name="wmode" value="transparent" />'+
							'<embed src="'+$box.opts.source+'" type="application/x-shockwave-flash" quality="high" width="100%" height="100%" wmode="transparent" allowScriptAccess="always" />'+
						'</object>';
						$canvas.children().append(html);
						$box.loaded();
					break;
					case 'inline':
						$canvas.children().append($($box.opts.source).children());
						$canvas.unload(function() {
							$($box.opts.source).append($canvas.children('div').children());				
						});
						$box.loaded();
					break;
					case 'iframe':
						$('<iframe id="'+$box.ids.frame+'" src="'+$box.opts.source+'" frameBorder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+($.browser.msie?' allowtransparency="true"':'')+'></iframe>').css({
							'width': '100%',
							'height': '100%',
							'border': 'none',
							'overflow': 'auto'
						}).appendTo($canvas.children()).one('load', function() {
							setTimeout(function () { $box.loaded(); }, 300);
						});

						$canvas.unload(function() {
							$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
						});
					break;
					case 'ajax':
						var ajaxUrl = ajaxData = '';
						$.each($box.opts.source.split('?'), function(i, value) {
							switch(i) {
								case 0:	ajaxUrl = value; break;
								case 1:	ajaxData = value; break;
							}							
						});
						$box.ajaxLoad = $.ajax({
							type: (types[1] || 'get'),
							url: ajaxUrl,
							data: ajaxData,
							error: function (request, status, error) {
								$box.error();
							},
							success: function (data) {
								var $imgs = $canvas.children().append(data).find('img');
								var total = $imgs.length;
								if (total > 0) {
									var loaded = 0;
									$imgs.each(function() {
										var img = new Image();
										img.onload = function() {
											this.onload = null;
											++loaded;
											if (total <= loaded) $box.loaded();
										};
										img.src = $(this).attr('src');
									});
								}
								else $box.loaded();
							}
						});
					break;
				}
			}
			return false;
		},

		/* loaded box */
		loaded: function() {
			// close
			if ($box.opts.close) {
				$box.create.close();
			}

			// set canvas size
			switch ($box.opts.type.split('.')[0]) {
				case 'inline':
				case 'ajax':
					var $contents = $('#'+$box.ids.canvas).children();
					if ($box.opts.width == 0 || $box.opts.height == 0) {
						$box.opts.width = $contents.width();
						$box.opts.height = $contents.height();
					}
					$contents.find('.'+$box.ids.close).click(function() {
						$box.close();
						return false;
					});
				break;
				case 'iframe':
					var $frame = $('#'+$box.ids.frame);
					if ($box.opts.width == 0 || $box.opts.height == 0) {
						$.extend($box.opts, getFrameSize($frame[0]));

						$('#'+$box.ids.frame).load(function() {
							$.extend($box.opts, getFrameSize(this));
							$box.resize.canvas();
						});
					}
					try {
						$frame.contents().find('.'+$box.ids.close).click(function() {
							$box.close();
							return false;
						});
					}
					catch (e) { }
				break;
			}

			$box.resize.canvas();

			switch ($box.opts.position) {
				case 'centered':
				case 'centered-horizontal':
					$box.position.centered.canvas();
				break;
				case 'fixed':
					$box.position.fixed.canvas();
				break;
			}

			$('#'+$box.ids.loading).remove();
			$('#'+$box.ids.canvas).css({'display': 'none', 'visibility': 'visible'}).fadeIn('fast');

			$win.bind('scroll.laybox', function() {
				if ($box.opts.mask) $box.resize.mask();
				switch ($box.opts.position) {
					case 'centered':
						$box.position.centered.canvas();
					break;
					case 'fixed':
						$box.position.fixed.canvas();
					break;
				}
			});

			$win.bind('resize.laybox', function() {
				if ($box.opts.mask) $box.resize.mask();
				$box.resize.canvas();
				var positions = $box.opts.position.split('-');
				switch (positions[0]) {
					case 'centered':
						$box.position.centered.canvas(positions[1]);
					break;
				}
			});

			$box.active = false;
		},

		/* close box */
		close: function(opts) {
			var $mask = $('#'+$box.ids.mask);
			var $loading = $('#'+$box.ids.loading);
			var $canvas = $('#'+$box.ids.canvas);

			opts = opts || {};

			if ($box.ajaxLoad) {
				$box.ajaxLoad.abort();
			}
			$box.ajaxLoad = null;

			if ($box.imgPreload) {
				$box.imgPreload.onload = $box.imgPreload.onerror = null;
			}

			if (!opts.ajaxed) {
				$loading.remove();
				$mask.remove();
			}
			$canvas.trigger('unload').remove();

			// hide object element
			$box.hide(false);

			$win.unbind('scroll.laybox');
			$win.unbind('resize.laybox');

			$box.active = false;

			return false;
		},

		/* error */
		error: function() {
			alert('데이터 로딩을 실패하였습니다.');
			$box.close();
		}
	});

	/* create function */
	$box.create = {
		mask: function() {
			if ($($box.ids.mask).length > 0) return;
			var $div = $('<div id="'+$box.ids.mask+'"></div>').css({
				'position': 'fixed',
				'top': 0,
				'left': 0,
				'width': '100%',
				'height': '100%',
				'background': $box.opts.maskColor,
				'filter': 'alpha(opacity='+$box.opts.maskOpacity+')',
				'-moz-opacity': ($box.opts.maskOpacity / 100),
				'opacity': ($box.opts.maskOpacity / 100),
				'z-index': 1000000,
				'display': 'none'
			}).appendTo('body');
			$box.resize.mask();
			$div.fadeIn('fast').click(function() {
				if ($box.opts.maskClose) {
					$box.close();
				}
			});
		},
		loading: function() {
			if ($($box.ids.loading).length > 0) return;
			if ($box.opts.loadingImage) {
				var $div = $('<div id="'+$box.ids.loading+'"></div>').css({
					'width': $box.opts.loadingWdith+'px',
					'height': $box.opts.loadingHeight+'px',
					'margin-left': ($box.opts.loadingWdith / 2 * -1)+'px',
					'z-index': 1000001,
					'visibility': 'hidden'
				}).append('<img src="'+$box.opts.loadingImage+'" />').appendTo('body');
				$box.position.centered.loading();
				$div.css({'display': 'none', 'visibility': 'visible'}).fadeIn('fast');
			}
		},
		canvas: function() {
			var $div = $('<div id="'+$box.ids.canvas+'"></div>').css({
				'position': 'absolute',
				'top': '-1000000px',
				'padding': $box.opts.canvasPadding+'px',
				'z-index': 1000002,
				'visibility': 'hidden'
			});
			if ($box.opts.borderSize) {
				$div.css({'border': $box.opts.borderSize+'px solid '+$box.opts.borderColor});
			}
			if ($box.opts.canvasBgColor) {
				$div.css({'background-color': $box.opts.canvasBgColor});
			}
			return $div.append($('<div />').css({
				'overflow': 'auto'
			})).appendTo('body');
		},
		close: function() {
			var $canvas = $('#'+$box.ids.canvas);

			$('#'+$box.ids.close).remove();

			if ($canvas.length && $box.opts.closeImage) {
				$('<a id="'+$box.ids.close+'" href="#" />').css({
					'position': 'absolute',
					'top': ($box.opts.closeTop - $box.opts.borderSize)+'px',
					'right': ($box.opts.closeRight - $box.opts.borderSize)+'px',
					'z-index': 1000003
				}).click(function() {
					$box.close();
					return false;
				}).append('<img src="'+$box.opts.closeImage+'" />').appendTo($canvas.children());
			}
		}
	};

	/* hide function */
	$box.hide = function(flag) {
		$('object').css({
			'visibility': (flag ? 'hidden' : 'visible')
		});
	};

	/* resize function */
	$box.resize = {
		mask: function() {
			$('#'+$box.ids.mask).css('height', $dom.height());
		},
		canvas: function() {
			var $canvas = $('#'+$box.ids.canvas);

			var vps = getViewPortSize((($box.viewPortPadding * 2) + getScrollbarSize()) * -1);
			var width = $box.opts.width;
			var height = $box.opts.height;

			if ($box.opts.canvasResizing) {
				if ($box.opts.type.split('.')[0] == 'image') {
					var rateX = width / vps.width;
					var rateY = height / vps.height;
					var rate = (rateX > rateY ? rateX : rateY);
					if (rate < 1) rate = 1;

					width /= rate;
					height /= rate;

					$canvas.children('div').children('img').css({
						'width': width+'px',
						'height': height+'px'
					});
				}
				else {
					if (width > vps.width) width = vps.width;
					if (height > vps.height) height = vps.height;
				}
			}

			$canvas.children().css({
				'width': width+'px',
				'height': height+'px'
			});
		}
	};

	/* position function */
	$box.position = {
		// centered
		centered: {
			loading: function() {
				$('#'+$box.ids.loading).css({'position': 'fixed', 'top':'50%', 'left': '50%'});
			},
			canvas: function(direction) {
				var $canvas = $('#'+$box.ids.canvas);
				var scroll = {left: $win.scrollLeft(), top: $win.scrollTop()};

				var width = $canvas.width() + (($box.opts.borderSize + $box.opts.canvasPadding) * 2);
				var height = $canvas.height() + (($box.opts.borderSize + $box.opts.canvasPadding) * 2);
				var left = scroll.left + ($box.opts.positionLeft!==null ? $box.opts.positionLeft : Math.round(($win.width() - width) / 2));
				var top = scroll.top + ($box.opts.positionTop!==null ? $box.opts.positionTop : Math.round(($win.height() - height) / 2));

				if (left < scroll.left) left = scroll.left;
				if (top < scroll.top) top = scroll.top;

				var properties = null;
				switch (direction) {
					case 'horizontal':	properties = {'left': left}; break;
					default:				properties = {'left': left, 'top': top}; break;
				}
				if (properties) $canvas.css(properties);
			}
		},
		// fixed
		fixed: {
			canvas: function() {
				var $canvas = $('#'+$box.ids.canvas);
				$canvas.css({
					'left': ($box.opts.positionLeft + $win.scrollLeft()),
					'top': ($box.opts.positionTop + $win.scrollTop())
				});
			}
		}
	};

	/* ajax process */
	$box.ajax = function(setting, options) {
		options = $.extend({}, options, {
			'ajaxed': true
		});
		$box.opts = $.extend($box.defaults, options);

		// mask
		if ($box.opts.mask) $box.create.mask();
		// loading
		if ($box.opts.loading) $box.create.loading();

		setTimeout(function() {
			$.ajax($.extend({}, setting, {
				error: function() {
					setting.error(arguments[0]);
					$box.close();
				},
				success: function() {
					if (setting.success(arguments[0]) !== false) {
						$box.open($.extend(options, {
							mask: false,
							loading: false
						}));
					}
					else $box.close();
				}
			}));
		}, 300);
	};

	// jQuery plugin initialization
	$.fn.laybox = function(options) {
		return this.each(function(index) {
			$(this).bind('click', function() {
				return $box.open(options, this);
			});
		});
	};
})(jQuery);