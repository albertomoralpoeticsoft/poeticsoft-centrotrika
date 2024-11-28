<?php

add_action(
  'init',
  function() {

    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $tablename = $wpdb->prefix . 'mail_collection';
    $wpdb->query(
      "CREATE TABLE IF NOT EXISTS $tablename (
        id INTEGER NOT NULL AUTO_INCREMENT,
        send_date BIGINT NOT NULL,
        email VARCHAR(256),
        PRIMARY KEY (id)
      ) $charset_collate;"
    );
  }
);

add_action( 
  'wpforms_process_complete', 
  function ($fields, $entry, $form_data, $entry_id) {      

    global $wpdb;
    $tablename = $wpdb->prefix . 'mail_collection';
    $date = time();
    $mail = $fields['1']['value'];

    $wpdb->insert(
      $tablename,
      [
        'send_date' => $date,
        'email' => $mail
      ],
      [
        'send_date' => '%d',
        'email' => '%s'
      ]
    ); 
  }, 
  10, 
  4 
);

function centrotrika_mail_collection( WP_REST_Request $req ) {

  $res = new WP_REST_Response();

  try {   

    global $wpdb; 
    $tablename = $wpdb->prefix . 'mail_collection';

    $sqlmails = "
    SELECT DISTINCT
    mails.send_date, mails.email
    FROM {$tablename} mails
    ORDER BY mails.send_date
    ";
    $result = array_map(
      function($mail) {

        $date = date('d/m/y H:i', $mail->send_date);

        return $date . ' - ' . $mail->email;
      },
      $wpdb->get_results($sqlmails)
    );

    $maillist = implode(PHP_EOL, $result);
    
    header( 'Content-Type: text/plain; charset=' . get_option( 'blog_charset' ) );

    echo $maillist;

    exit();
      
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());

    return $res;
  }
}

add_action(
  'rest_api_init',
  function() {

    register_rest_route(
      'centrotrika/mail',
      'collection',
      [
        'methods'  => 'GET',
        'callback' => 'centrotrika_mail_collection',
        'permission_callback' => '__return_true'
      ]
    );
  }
);
