<?php

/**
*
* Plugin Name: poeticsoft-centrotrika
* Plugin URI: https://poeticsoft.com/plugins/centrotrika
* Description: Poeticsoft Centro Trika Custom Web
* Version: 0.00
* Author: Poeticsoft Team
* Author URI: https://poeticsoft.com/about
*/

function core_log($display) { 

  $text = is_string($display) ? $display : json_encode($display, JSON_PRETTY_PRINT);

  file_put_contents(
    WP_CONTENT_DIR . '/core_log.txt',
    $text . PHP_EOL,
    FILE_APPEND
  );
}

add_filter('xmlrpc_enabled', '__return_false');
add_filter('login_display_language_dropdown', '__return_false');

require_once(dirname(__FILE__) . '/mailrelay/main.php');
require_once(dirname(__FILE__) . '/woocommerce/main.php');

// require_once(dirname(__FILE__) . '/maillist.php');
// require_once(dirname(__FILE__) . '/analytics/main.php');
// require_once(dirname(__FILE__) . '/scripts.php');