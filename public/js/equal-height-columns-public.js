(function( $ ) {
	'use strict';

	$( document ).ready( function() {
		
		// Initialize equal heights using variables passed from PHP.
		$.each( equalHeightColumnElements, function( settingSlug, object ) {
			
			$.each( object, function( index, args ) {
				
				var selector = args.selector;
				var breakpoint = args.breakpoint;
				$( selector ).equalHeights( null, null, breakpoint );

			});

		});

	});

})( jQuery );

/**
 * Equal Heights Plugin
 * 
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same size (floats, etc).
 *
 * Based on Rob Glazebrook's (cssnewbie.com) script
 *
 * Additions
 *  - ability to include a break point (the minimum viewport width at which the script does anything)
 *  - binds the script to run on load, orientation change (for mobile), and when resizing the window
 *
 * Usage: jQuery(object).equalHeights([minHeight], [maxHeight], [breakPoint]);
 * 
 * Example 1: jQuery(".cols").equalHeights(); Sets all columns to the same height.
 * Example 2: jQuery(".cols").equalHeights(400); Sets all cols to at least 400px tall.
 * Example 3: jQuery(".cols").equalHeights(100,300); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * Example 4: jQuery(".cols").equalHeights(null, null,768); Only resize columns above 768px viewport
 * 
 */
 (function( $ ) {
 	$.fn.equalHeights = function(minHeight, maxHeight, breakPoint) {
 		var items = this;
 		breakPoint = breakPoint || 0;

         // Bind functionality to appropriate events
         $(window).on('load orientationchange resize equalheights', function() {
         	tallest = (minHeight) ? minHeight : 0;
         	items.each(function() {
         		$(this).height('auto');
         		if($(this).outerHeight() > tallest) {
         			tallest = $(this).outerHeight();
         		}
         	});

             // Get viewport width (taking scrollbars into account)
             var e = window;
             a = 'inner';
             if (!('innerWidth' in window )) {
             	a = 'client';
             	e = document.documentElement || document.body;
             }
             width = e[ a+'Width' ];

             // Equalize column heights if above the specified breakpoint
             if ( width >= breakPoint ) {
             	if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
             	console.log(tallest);
             	return items.each(function() {
             		$(this).height(tallest);
             	});
             }
         });
     }

 })(jQuery);