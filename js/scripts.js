(function ($) {

  function setOverlayDimensions(owl) {
    let overlay = owl.siblings('.carousel-frame-overlay');
    if (overlay.length > 0) {
      let border_top_width = parseFloat(overlay.css('border-top-width').replace('px', ''));
      let border_bottom_width = parseFloat(overlay.css('border-bottom-width').replace('px', ''));
      let border_left_width = parseFloat(overlay.css('border-left-width').replace('px', ''));
      let border_right_width = parseFloat(overlay.css('border-right-width').replace('px', ''));

      let active_item = owl.find('.owl-item.active.center').first();
      let active_width = active_item.outerWidth();
      let active_height = active_item.outerHeight();

      overlay.css({
        'width': (active_width + border_left_width + border_right_width) + 'px',
        'height': (active_height + border_top_width + border_bottom_width) + 'px',
        'margin-left': '-' + ((active_width / 2) + border_left_width) + 'px'
      });
    }
  }

  function owlCarousel() {
    let owls = $('.owl-carousel');
    owls.each(function () {
      let owl = $(this);

      let loop = owl.data('loop');
      let center = owl.data('center');
      let autoplay = owl.data('autoplay');
      let speed = owl.data('speed');
      let autoplayTimeout = (speed !== undefined) ? speed : 2000;
      let frame = owl.data('frame');

      let slides_margin = owl.data('slides-margin');
      let margin = (slides_margin !== undefined) ? slides_margin : 10;

      let xs_slides = owl.data('xs-slides');
      let sm_slides = owl.data('sm-slides');
      let md_slides = owl.data('md-slides');
      let lg_slides = owl.data('lg-slides');
      let xl_slides = owl.data('xl-slides');

      let xs_count = (xs_slides !== undefined) ? xs_slides : 1;
      let sm_count = (sm_slides !== undefined) ? sm_slides : 2;
      let md_count = (md_slides !== undefined) ? md_slides : 3;
      let lg_count = (lg_slides !== undefined) ? lg_slides : 4;
      let xl_count = (xl_slides !== undefined) ? xl_slides : 5;

      if (frame) {
        owl.on('initialized.owl.carousel', function (event) {
          setOverlayDimensions(owl);
        });
      }

      owl.owlCarousel({
        margin: margin,
        loop: loop,
        center: center,
        autoplay: autoplay,
        autoplayTimeout: autoplayTimeout,
        autoplayHoverPause: autoplay,
        responsiveClass: true,
        responsive: {
          0: {items: xs_count},
          576: {items: sm_count},
          768: {items: md_count},
          992: {items: lg_count},
          1200: {items: xl_count}
        }
      });

      if (frame) {
        owl.on('changed.owl.carousel', function (event) {
          setOverlayDimensions(owl);
        });
        $(window).on('load', function(){
          setOverlayDimensions(owl);
        });
      }

    });
  }

  // Use this variable to set up the common and page specific functions.
  let BraveCarouselFunctions = {
    // All pages
    'common': {
      init: function () {
        // JavaScript to be fired on all pages

      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired

        owlCarousel();

      },
      loaded: function () {
        //JavaScript to be fired on all pages after everything has loaded.

      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  let BraveCarouselUTIL = {
    fire: function (func, func_name, args) {
      let namespace = BraveCarouselFunctions;
      func_name = (func_name === undefined) ? 'init' : func_name;
      let fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][func_name] === 'function';
      if (fire) {
        namespace[func][func_name](args);
      }
    },
    loadEvents: function () {
      // Fire common init JS
      BraveCarouselUTIL.fire('common', 'init');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        BraveCarouselUTIL.fire(classnm);
        BraveCarouselUTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      BraveCarouselUTIL.fire('common', 'finalize');
    },

    finishedLoadingEvents: function () {
      // Fire common init JS
      BraveCarouselUTIL.fire('common', 'loaded');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        BraveCarouselUTIL.fire(classnm, 'loaded');
      });

    }
  };

  // Load Events
  $(document).ready(BraveCarouselUTIL.loadEvents);
  $(window).load(BraveCarouselUTIL.finishedLoadingEvents);

})(jQuery); // Fully reference jQuery after this point.
