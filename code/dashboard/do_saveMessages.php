<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$curlResult = callAPI('GET', $apiURL."venues/" . $_SESSION['venue_id'] . "/messages", false, $apiAuth);		
	if ($curlResult) {
		$dataResult = json_decode($curlResult, true);

		if ($dataResult && is_array($dataResult) && count($dataResult) > 0) {
			exit();
		}
	}

	$messages = json_decode(stripslashes($_POST['messages']), true);

	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	if (isset($messages) && is_array($messages) && count($messages)) {
		foreach ($messages as $message) {
			protect($message['name']);
			protect($message['content']);
			protect($message['type']);

			$message['orderType'] = $message['type'];
			$jsonData = json_encode($message);

			$curlResult = callAPI('POST', $apiURL."venues/" . $_SESSION['venue_id'] . "/messages", $jsonData, $apiAuth);		
		}
	}

	echo $curlResult; //sending a JSON via ajax
?>