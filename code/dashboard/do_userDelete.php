<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$userID = $_POST['userID'];
	protect($userID);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	//kill event
	$curlResult = callAPI('DELETE', $apiURL."users/$userID", false, $apiAuth); //event deleted
	
	echo $curlResult;

	//at this stage all userID data is deleted
?>