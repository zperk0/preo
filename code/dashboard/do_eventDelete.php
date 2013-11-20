<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$eventID = $_POST['eventID'];
	protect($eventID);
	
	$venueID = $_SESSION['venue_id'];
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	//kill all eb-times items for thie event
	$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/ebtimes?eventId=$eventID", false, $apiAuth); //venue_eb_times data deleted
	
	//kill event
	$curlResult = callAPI('DELETE', $apiURL."events/$eventID", false, $apiAuth); //event deleted
	
	echo $curlResult;

	//at this stage all event data is deleted
?>