<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	$data = array();
	$data['demoFlag'] = false;
	$data['liveFlag'] = false; //both are set together so the app is now offline
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/demo", $data, $apiAuth);
?>