<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$mdID = $_POST['mdID'];
	protect($mdID);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	//kill md parts
	$curlResult = callAPI('DELETE', $apiURL."menus/mealdeal/items/$mdID", false, $apiAuth); //md parts deleted
	
	//kill md
	$curlResult = callAPI('DELETE', $apiURL."menus/mealdeal/$mdID", false, $apiAuth); //md deleted
	
	echo $curlResult;

	//at this stage all event data is deleted
?>