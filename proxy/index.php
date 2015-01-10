<?php
session_start();
include('proxy.php');
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file

$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "/api") === 0) {
	$url = substr($_SERVER['REQUEST_URI'], 5);    
}
$url = $apiURL . ltrim($url, "/");

if (isset($_SESSION['token'])) {
	$apiAuth = "PreoDay ".$_SESSION['token'];
}

$proxy = new Proxy($url,$apiAuth);
$proxy->forward();