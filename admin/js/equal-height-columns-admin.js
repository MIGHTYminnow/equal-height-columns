(function( $ ) {
	
	'use strict';

	$( document ).ready( function() {
		
		/**
		 * Add an element group.
		 *
		 * @since  1.0.0
		 */
		$( '.add-element' ).on( 'click', function() {

			// Disable buttons to prevent wonkiness during fade.
			disableButtons();

			// Get the last settings row.
			var $lastRow = $(this).prev( 'table' ).find( 'tr' ).last();
			var $newRow = $lastRow.clone( true )
			var $input = $newRow.find( 'input' );

			// Get index for new row.
			var newIndex = Number( $input.attr( 'data-index' ) ) + 1;

			// Increment label text.
			$newRow.find( '.index-number' ).text( newIndex );

			// Increment input name index.
			$input.attr( 'name', function(index, name) {
			
				return name.replace(/\[(\d+)\]/, function(fullMatch, n) {
					return '[' + newIndex.toString() + ']';
				});

			});

			// Increment input data attribute.
			$input.attr( 'data-index', newIndex);

			// Remove copied value from new input.
			$input.val( '' );

			// Insert new row at end of list.
			$newRow.hide().insertAfter( $lastRow ).fadeIn( 800, function() {
				
				// Enable buttons again to prevent wonkiness during fade.
				enableButtons();

			});
		
		});

		/**
		 * Remove an element group.
		 *
		 * @since  1.0.0
		 */
		$( '.remove-element' ).on( 'click', function() {

			// Disable buttons to prevent wonkiness during fade.
			disableButtons();

			// Get the row containing the current setting.
			var $currentRow = $(this).parents( 'tr' );

			// Remove original row.
			$currentRow.fadeOut( 800, function() {
				updateSubsequentRows();
				$currentRow.remove();
				
				// Enable buttons again to prevent wonkiness during fade.
				enableButtons();
			});
			
			function updateSubsequentRows( ) {
				// Change index of all subsequent settings rows.
				var $subsequentRows = $currentRow.nextAll( 'tr' );
				$subsequentRows.each( function() {
					
					var $row = $(this);
					var $input = $row.find( 'input' )
					
					// Get new index for row.
					var newIndex = Number( $input.attr( 'data-index' ) ) - 1;

					// Increment label text.
					$row.find( '.index-number' ).text( newIndex );

					// Decrement setting index.
					$row.find( 'input' ).attr( 'name', function(index, name) {
						return name.replace(/\[(\d+)\]/, function(fullMatch, n) {
							var newIndex = Number(n) - 1;
							return '[' + newIndex.toString() + ']';
						});
	    			});

	    			// Decrement input data attribute.
					$input.attr( 'data-index', newIndex);

				});

			}
		
		});

	});

	function disableButtons() {
		$( '.add-element, .remove-element' ).addClass( 'disabled' );
	}

	function enableButtons() {
		$( '.add-element, .remove-element' ).removeClass( 'disabled' );
	}

})( jQuery );
