/*jslint node: true */
"use strict";

module.exports = function( grunt ) {

	// Load all tasks.
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		devUpdate: {
	        main: {
	            options: {
	                updateType: 'prompt',
	                packages: {
	                    devDependencies: true
	                },
	            }
	        }
	    },
		jshint: {
			all: [
				'Gruntfile.js',
				'assets/js/src/**/*.js',
				'assets/js/test/**/*.js'
			],
			options: {
				curly:   true,
				eqeqeq:  true,
				immed:   true,
				latedef: true,
				newcap:  true,
				noarg:   true,
				sub:     true,
				undef:   true,
				boss:    true,
				eqnull:  true,
				globals: {
					exports: true,
					module:  false
				}
			}
		},
		// https://www.npmjs.org/package/grunt-wp-i18n
	    makepot: {
	        target: {
	            options: {
	                domainPath: '/languages/',    // Where to save the POT file.
	                potFilename: 'equal-height-columns.pot',   // Name of the POT file.
	                type: 'wp-plugin'  // Type of project (wp-plugin or wp-theme).
	            }
	        }
	    },
		clean: {
			main: ['release/<%= pkg.version %>']
		},
		copy: {
			// Copy the plugin to a versioned release directory
			main: {
				src:  [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.sass-cache/**',
					'!css/src/**',
					'!js/src/**',
					'!img/src/**',
					'!assets/**',
					'!design/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules'
				],
				dest: 'release/<%= pkg.version %>/equal-height-columns/'
			}
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/<%= pkg.version %>/equal-height-columns.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*']
			}
		}
	} );

	// Default task.

	grunt.registerTask( 'default', [
		'jshint',
		'makepot'
	] );


	grunt.registerTask( 'build', [
		'devUpdate',
		'default',
		'makepot',
		'clean',
		'copy',
		'compress'
	] );

	grunt.util.linefeed = '\n';
};