/**
 * Equal Heights Public JS
 *
 * @since  1.0.0
 */
( function( $ ) {
	'use strict';

	$( window ).on( 'load', function() {

		// Don't do anything if no equal height column elements are specified.
		if ( 'undefined' === typeof equalHeightColumnElements ) {
			return;
		}

		// Initialize equal heights using variables passed from PHP.
		$.each( equalHeightColumnElements, function() {

			// Loop through each item in the collection
			$.each( this, function() {

				// Scope the vars
				var $selector, breakpoint;

				// Confirm that the selector is valid
				try {

					// Test the selector
					$selector = $( this.selector );

				} catch ( e ) {

					// If we have an error, the selector must not be valid,
					// so skip it and continue to the next selector
					return true;
				}

				// Set the breakpoint
				breakpoint = this.breakpoint;

				// Start the party
				$selector.initEqualHeights( null, null, breakpoint );

			});
		});
	});

})( jQuery );

/**
 * Equal Heights Plugin
 *
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same height (floats, etc).
 *
 * Based on Rob Glazebrook's (cssnewbie.com) script
 *
 * Features
 *  - ability to include a break point (the minimum viewport width at which the script does anything)
 *  - binds to window resize events (resize and orientationchange)
 *  - will automatically detect new elements added to the DOM
 *  - can be called multiple times without duplicating any events
 *
 * Usage: jQuery( object ).equalHeights( [minHeight], [maxHeight], [breakPoint] );
 *
 * Example 1: jQuery( ".cols" ).equalHeights(); Sets all .cols to the same height.
 * Example 2: jQuery( ".cols" ).equalHeights( 400 ); Sets all .cols to at least 400px tall.
 * Example 3: jQuery( ".cols" ).equalHeights( 100, 300 ); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * Example 4: jQuery( ".cols" ).equalHeights( null, null, 768 ); Only resize .cols above 768px viewport
 */
( function( $ ) {
	'use strict';

	// Debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function( func, threshold ) {

		// The timer
		var timeout;

		return function debounced() {

			// Store the passed in function and args
			var obj = this;
			var args = arguments;

			// This is the callback that the timer triggers when debouncing is complete
			function delayed() {

				// We have successfully debounced, trigger the function
				func.apply( obj, args );

				// And clear the timer
				timeout = null;
			}

			// If the timer is active, clear it
			if ( timeout ) {
				clearTimeout( timeout );
			}

			// Set the timer to 50ms and have it call delayed() when it completes
			timeout = setTimeout( delayed, threshold || 50 );
		};
	};

	// Main plugin function
	$.fn.initEqualHeights = function( minHeight, maxHeight, breakPoint ) {

			// Scope our variables
			var selector, minHeight, maxHeight, breakPoint, args, eventData,
				ourEvents, eventSet, thisEvent, eventName;

			// Get the selector used to call equalHeights
			selector = this.selector;

			// Use the args that were passed in or use the defaults
			minHeight = minHeight || null;
			maxHeight = maxHeight || null;
			breakPoint = breakPoint || 0;

			// Combine args into an object
			args = { minHeight: minHeight, maxHeight: maxHeight, breakPoint: breakPoint };

			// Check if our global already exists
			if ( window.equalHeightsItems ) {

				// It does, so add or overwrite the current object in it
				window.equalHeightsItems[selector] = args;
			} else {

				// It doesn't, so create the global and store the current object in it
				window.equalHeightsItems = {};
				window.equalHeightsItems[selector] = args;
			}

		// Grab the current event data from the window object if it exists
		eventData = $._data( window, 'events' ) || {};

		// Store the events that will retrigger doEqualHeights()
		ourEvents = [ 'resize', 'orientationchange', 'equalheights' ];

		// Loop through each event and attach our handler if it isn't attached already
		$( ourEvents ).each( function() {

			// Reset our flag to false
			eventSet = false;

			// Store this event
			thisEvent = this;

			// Add the namespace
			eventName = this + '.equalheights';

			// Check whether this event is already on the window
			if ( eventData[ thisEvent ] ) {

				// Be careful not to disturb any unrelated listeners
				$( eventData[ thisEvent ] ).each( function() {

					// Confirm that the event has our namespace
					if ( this.namespace == 'equalheights' ) {

						// It does, so set our flag to true
						eventSet = true;
					}
				});
			}

			// If our flag is still false then we can safely attach the event
			if ( ! eventSet ) {

				// Namespace it and debounce it to be safe
				$( window ).on( eventName, debounce( triggerEqualHeights ) );
			}
		});

		// Trigger the first equalizing
		triggerEqualHeights();
	};

	// Function to trigger the equalizing
	function triggerEqualHeights() {

		// Loop through each object in our global
		$.each( window.equalHeightsItems, function( selector, args ) {

			// Call doEqualHeights and pass in the current object
			doEqualHeights( selector, args );
		});
	}

	// Function to do the equalizing of the heights
	function doEqualHeights( selector, args ) {

		// Scope our variables
		var $items, minHeight, maxHeight, breakPoint;

		// Grab the collection of items fresh from the DOM
		$items = $( selector );

		// Store the passed in args
		minHeight = args.minHeight;
		maxHeight = args.maxHeight;
		breakPoint = args.breakPoint;

		$items.equalizeTheHeights( minHeight, maxHeight, breakPoint );

	}

	/**
	 * Manually/directly equalize the heights of elements in a jQuery object collection.
	 *
	 * @since 1.1.0
	 *
	 * @param int minHeight Minimum height for elements after resizing.
	 * @param int maxHeight Maximum height for elements after resizing.
	 * @param int breakPoint Breakpoint above which to equalize heights.
	 *
	 * @return jQuery collection of targeted elements.
	 */
	$.fn.equalizeTheHeights = function( minHeight, maxHeight, breakPoint ) {

		// Scope our variables
		var tallest, e, a, width;

		// Calculate the tallest item
		tallest = ( minHeight ) ? minHeight : 0;
		$( this ).each( function() {
			$( this ).outerHeight( 'auto' );
			if ( $( this ).outerHeight() > tallest ) {
				tallest = $( this ).outerHeight();
			}
		});

		// Get viewport width (taking scrollbars into account)
		e = window;
		a = 'inner';
		if ( !( 'innerWidth' in window ) ) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		width = e[ a + 'Width' ];

		// Equalize heights if viewport width is above the breakpoint
		if ( width >= breakPoint ) {
			if ( ( maxHeight ) && tallest > maxHeight ) {
				tallest = maxHeight;
			}
			return $( this ).each( function() {
				$( this ).outerHeight( tallest );
			});
		}
	}


})( jQuery );
