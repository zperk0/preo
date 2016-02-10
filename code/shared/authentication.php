<?php

if(!isset($_SESSION['logged']) || !$_SESSION['logged'] || !isset($_SESSION['token']))
{
	$_SESSION['REDIRECT_AFTER_LOGIN'] = $_SERVER['REQUEST_URI'];
	header('location:/login');
	exit();
}

if ( !isset($_SESSION['venue_id']) && (!isset($_SESSION['noVenueFlag']) || $_SESSION['noVenueFlag'] != 1) ) {
	header("location:".$_SESSION['path'].'/selectVenue');
	exit;
}
?>