/*
* adjustImage
* By: HanSeungho landboy@gmail.com
* Version: 1.1.0
* Updated: 2013-12-04
*/

(function($) {
	$.fn.adjustImage = function(options) {
		var defaults = {
			type: 'hor',
			parent: null,
			realtime: false,
			nocache: false
		}
		var opts = $.extend(defaults, options);

		return this.each(function() {
			var $p = $(this);

			$(this).find('img').each(function() {
				var $obj = $(this).attr('src', $(this).attr('src')+(opts.nocache ? '?'+(new Date()).getTime() : '')); // ie9 bug fix

				if (opts.parent) {
					$p = $obj.parents(opts.parent).first();
				}

				$obj.bind('load', function() {
					var parent = { W: $p.width(), H: $p.height() };
					var img = { W: $obj.width(), H: $obj.height() };

					if ($obj.attr('ow') && $obj.attr('oh')) {
						img.W = $obj.attr('ow').toNumeric();
						img.H = $obj.attr('oh').toNumeric();
					}
					else {
						$obj.attr('ow', img.W).attr('oh', img.H);
					}

					switch (opts.type) {
						case 'both-max':
							var rateX = img.W / parent.W;
							var rateY = img.H / parent.H;
							var rate = (rateX > rateY ? rateX : rateY);
							if (rate < 1) rate = 1;

							img.W /= rate;
							img.H /= rate;

							$obj.css({'width': img.W, 'height': img.H});
						break;
						case 'both-min':
							var rate = img.W / parent.W;

							if (rate >= 1) {
								if (img.H / rate < parent.H) {
									if (img.H > parent.H) {
										$obj.css({'width': 'auto', 'height': parent.H});
										img.W = img.W / (img.H / parent.H);
										img.H = parent.H;
									}
								}
								else {
									if (img.W > parent.W) {
										$obj.css({'width': parent.W, 'height': 'auto'});       
										img.W = parent.W;
										img.H = img.H / rate;
									}
								}

								$obj.css({
									'margin-left': (img.W - parent.W) / -2,
									'margin-top': (img.H - parent.H) / -2
								});
							}
							else {
								$obj.css({
									'margin-left': (parent.W - img.W) / 2,
									'margin-top': (parent.H - img.H) / 2
								});
							}
						break;
						default:
							if (img.W > parent.W) {
								img.W = parent.W;

								$obj.css({'width': img.W, 'height': 'auto'});
							}
						break;
					}
				}).each(function() {
					if (this.complete) {
						$(this).trigger('load');
					}
				});

				if (opts.realtime) {
					$(window).resize(function() {
						$obj.trigger('load');
					});
				}
			});
		});
	};
})(jQuery);
