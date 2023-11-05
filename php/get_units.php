<?php

// info on cors setup for PHP => https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers
// info on HTTP requests from PHP => https://stackoverflow.com/questions/959063/how-to-send-a-get-request-from-php
// how to return json response from PHP => https://stackoverflow.com/questions/4064444/returning-json-from-a-php-script

cors();

/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 */
function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    //echo "You have CORS!";

    // redirect if all is OK... doesn't work as the redirect is again causing a CORS
    //header("Location: https://mongol.brono.com/mongol/api.php?commandname=get_units&format=json&user=&pass=");
    //die();

    // get URI to extract query params
    $url = $_SERVER['REQUEST_URI'];

    // extract username and password
    $url_components = parse_url($url);
    parse_str($url_components['query'], $params);
    $user = $params['user'];
    $pass = $params['pass'];

    // http_get no longer seems supported
    //$response = http_get("https://mongol.brono.com/mongol/api.php?commandname=get_units&format=json&user=&pass="
    //, array(
    //    'headers' => array(
    //        'Accept' => 'application/json'
    //    )
    //), $info);

    //echo $response;
    //print_r($info);

    // curl alternative (supported)
    $ch = curl_init("https://mongol.brono.com/mongol/api.php?commandname=get_units&format=json&user=$user&pass=$pass");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    $result = curl_exec($ch);
    if(curl_error($ch)) {
        echo "received error: ".curl_error($ch);
    } else {
        header('Content-Type: application/json; charset=utf-8');
        echo $result;
    }
    curl_close($ch);

    //die();
}

?>
