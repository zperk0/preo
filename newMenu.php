<?php session_start();
	require('getPath.php'); //the only relative link we will have
	//resetting global vars
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');

	$_SESSION['secondaryMenuFlag']= 1;

	// $curlResult = callAPI('GET', $apiURL."venues/". $_SESSION['venue_id'] ."/promotions", false, $apiAuth);
	// $promotions = json_decode($curlResult,true);

	// if($_SESSION['groupMenu']) {

	// 	$curlResult = callAPI('GET', $apiURL."menus?expand=true&venueId=". $_SESSION['venue_id'] ."&type=booking", false, $apiAuth);
	// 	$menu = json_decode($curlResult,true);
	// }

	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/menuConfig.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>