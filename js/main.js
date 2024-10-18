/* ===================================================================
 * Epitome - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // This will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // Force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // Fade out the loading animation
            $("#loader").fadeOut("slow", function() {
                // Fade out the whole preloader DIV
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // For hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        });
    };

   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function() {
        var hdr = $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        $WIN.on('scroll', function() {
            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            } else {
                hdr.removeClass('sticky');
            }
        });
    };

   /* Mobile Menu
    * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {
        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();
            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {
            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });
    };

   /* Highlight the current section in the navigation bar
    * ------------------------------------------------------ */
    var ssWaypoints = function() {
        var sections = $(".target-section"),
            navigation_links = $(".header-main-nav li a");

        sections.waypoint({
            handler: function(direction) {
                var active_section = (direction === "up") ? 
                    $(this.element).prevAll(".target-section").first() : 
                    $(this.element);

                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');
                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");
            },
            offset: '25%'
        });
    };

   /* Masonry
    * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {
        var containerBricks = $('.masonry');
        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };

   /* Photoswipe
    * ----------------------------------------------------- */
    var ssPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // Get items
        $folioItems.each(function(i) {
            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                item = {
                    src: $href,
                    w: parseInt($size[0], 10),
                    h: parseInt($size[1], 10)
                };

            if ($caption.length > 0) {
                item.title = '<h4>' + $.trim($title.html()) + '</h4>' + $.trim($caption.html());
            }

            items.push(item);
        });

        // Bind click event
        $folioItems.each(function(i) {
            $(this).find('.thumb-link').on('click', function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                };
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });
        });
    };

   /* Slick Slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            fade: true,
            cssEase: 'linear'
        });
    };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }
                window.location.hash = target;
            });
        });
    };

   /* Alert Boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {
        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        });
    };

   /* Animate On Scroll
    * ------------------------------------------------------ */
    var ssAOS = function() {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };

   /* FAQ Toggle
    * ------------------------------------------------------ */
    var ssFaqToggle = function() {
        $('.faq-question').on('click', function() {
            var $answer = $(this).next('.faq-answer');
            $answer.slideToggle(300);
        });
    };

   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {
        ssPreloader();
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssWaypoints();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();
        ssFaqToggle();
    })();

})(jQuery);
