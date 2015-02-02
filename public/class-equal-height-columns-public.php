<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://wordpress.org/plugins/equal-height-columns
 * @since      1.0.0
 *
 * @package    Equal_Height_Columns
 * @subpackage Equal_Height_Columns/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the dashboard-specific stylesheet and JavaScript.
 *
 * @package    Equal_Height_Columns
 * @subpackage Equal_Height_Columns/public
 * @author     MIGHTYminnow, Mickey Kay, Braad Martin mickeyskay@gmail.com
 */
class Equal_Height_Columns_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The display name of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin__displau_name    The public name of this plugin.
	 */
	private $plugin_display_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @var      string    $plugin_name            The name of this plugin.
	 * @var      string    $plugin_display_name    The public name of this plugin.
	 * @var      string    $version                The version of this plugin.
	 */
	public function __construct( $plugin_name, $plugin_display_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->plugin_display_name = $plugin_display_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Equal_Height_Columns_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Equal_Height_Columns_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/equal-height-columns-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Equal_Height_Columns_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Equal_Height_Columns_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/equal-height-columns-public.js', array( 'jquery' ), $this->version, false );

	}

}
