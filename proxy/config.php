<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

/*
 * The server you want to proxy to
 * Provide without any ports and protocol
 */ 
$config['server'] = $apiURL;

/*
 * Forwarding ports for http and https
 */
$config['http_port']  = 8080;
$config['https_port'] = 4433;

/*
 * Timeout in seconds
 */
$config['timeout'] = 5;

/*
 * HTTP Auth
 */
$config['user'] = 'user';
$config['pass'] = 'pass';

//Add api auth
$config['apiAuth'] = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens