/*!
 * Site Initialization Script
 * Consolidated and optimized for better performance
 * All initialization happens after DOM and resources are loaded
 */

(function($, window, document) {
  'use strict';

  // Initialize WOW.js animations when DOM is ready
  function initAnimations() {
    if (typeof WOW !== 'undefined') {
      var wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false, // Disable on mobile for better performance
        live: true
      });
      wow.init();
    }
  }

  // Initialize smooth scroll navigation
  function initSmoothScroll() {
    $('.main-nav li a').on('click', function(event) {
      var $anchor = $(this);
      var target = $($anchor.attr('href'));
      
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 60
        }, 1500, 'easeInOutExpo');
      }
    });
  }

  // Initialize sticky header
  function initStickyHeader() {
    if ($('#test').length) {
      $('#test').scrollToFixed();
    }
  }

  // Initialize mobile navigation
  function initMobileNav() {
    $('.res-nav_click').on('click', function() {
      $('.main-nav').slideToggle();
      return false;
    });
  }

  // Initialize portfolio isotope filtering
  function initPortfolio() {
    var $container = $('.portfolioContainer');
    
    if (!$container.length) return;

    var colW = 375;
    var columns = null;

    $container.isotope({
      resizable: true,
      masonry: { columnWidth: colW }
    });

    // Handle responsive layout
    $(window).smartresize(function() {
      var currentColumns = Math.floor(($('body').width() - 30) / colW);
      if (currentColumns !== columns) {
        columns = currentColumns;
        $container.width(columns * colW).isotope('reLayout');
      }
    }).smartresize();

    // Handle filter clicks
    $('.portfolioFilter a').on('click', function() {
      $('.portfolioFilter .current').removeClass('current');
      $(this).addClass('current');
      var selector = $(this).attr('data-filter');
      $container.isotope({ filter: selector });
      return false;
    });
  }

  // Initialize certification filters
  function initCertifications() {
    if (!$('.cert-filter-btn').length) return;

    $('.cert-filter-btn').on('click', function() {
      $('.cert-filter-btn').removeClass('active');
      $(this).addClass('active');

      var filter = $(this).data('filter');

      if (filter === '*') {
        $('.cert-card').fadeOut(300, function() {
          $(this).show().css('display', 'flex');
        }).fadeIn(300);
      } else {
        $('.cert-card').fadeOut(300, function() {
          $(filter).fadeIn(300, function() {
            $(this).css('display', 'flex');
          });
        });
      }
    });

    // Add staggered animation delays
    $('.cert-card').each(function(index) {
      $(this).attr('data-wow-delay', (index * 0.05) + 's');
    });
  }

  // Initialize all components when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
  });

  // Initialize complex interactions after all resources load
  window.addEventListener('load', function() {
    initSmoothScroll();
    initStickyHeader();
    initMobileNav();
    initPortfolio();
    initCertifications();
  });

})(jQuery, window, document);
