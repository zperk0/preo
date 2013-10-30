<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$outletID = $_POST['outletID'];
	protect($outletID);
	
	$outletApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the outlet's token here
	
	//first we delete all outlet_menu entries 
	$curlResult = callAPI('DELETE', $apiURL."outlets/$outletID/menu", false, $outletApiAuth); //outlet menus deleted
	
	//now we kill off outlet
	$curlResult = callAPI('DELETE', $apiURL."outlets/$outletID", false, $outletApiAuth); //outlet deleted
	
	//at this stage all outlet data is deleted
?>