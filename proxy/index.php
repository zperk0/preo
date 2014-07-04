<?php
include('proxy.php');

$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "/api") === 0) {
	$url = substr($_SERVER['REQUEST_URI'], 5);    
}


$proxy = new Proxy();
$proxy->forward($url);