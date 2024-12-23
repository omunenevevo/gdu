jQuery(function($) {
		$(document).ready(function() {

			$('.btl-image-slider-wrapper, .btl-image-slider-thumbs').slick();

			// $('.btl-image-slider-base .image-modal').each(function(index, el) {
			// 	$(el).click(function(event) {
			// 		event.preventDefault();
			// 		$modal = $('<div class="image-container"><img src="'+$(el).attr('data-src')+'" width="'+$(el).attr('width')+'" height="'+$(el).attr('height')+'"/><p>'+$(el).attr('data-caption')+'</p></div>').appendTo('body').modal();
			// 		var urlReplace = "#image-modal=" + $(this).attr('data-src');
			// 		history.pushState(null, null, urlReplace);
			// 		$modal.on($.modal.BEFORE_CLOSE, function(event, modal) {
			// 			history.pushState(null, null, '#');
			// 		});
			// 		return false;
			// 	});
			// });
			// $(window).on('popstate', function() {
			// 	$.modal.close();
			// });
			// if (window.location.href.indexOf('#image-modal') !== -1) {
			// 	var modalArgument = '#image-modal=';
			// 	var start = window.location.href.indexOf(modalArgument) + modalArgument.length;
			// 	var dataSRC = window.location.href.substring(start);
			// 	$('.btl-image-slider-base .image-modal[data-src="'+dataSRC+'"]').trigger('click');
			// }
		});
});
