<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$liveFlag = $_POST['liveFlag'];
	protect($liveFlag);
	
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	if($liveFlag) //then we make it DEMO
	{
		$data = array();
		$data['liveFlag'] = true;
		$data['demoFlag'] = true;
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('PUT', $apiURL."venues/$venueID/demo", $data, $apiAuth); //live=1 and demo=1
		
		$_SESSION['appUnPublished'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
		header('location:'.$_SESSION['path'].'/dashboard.php'); //redirect to dash
	}
	else //lets go live
	{
		$data = array();
		$data['liveFlag'] = true;
		$data['demoFlag'] = false;
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/demo", $data, $apiAuth);
		$curlResult = callAPI('PUT', $apiURL."venues/$venueID/live", $data, $apiAuth);
		
		$_SESSION['appPublished'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
		header('location:'.$_SESSION['path'].'/dashboard.php'); //redirect to dash
	}
?>