<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$liveFlag = $_POST['liveFlag'];
	protect($liveFlag);
	
	$offFlag = $_POST['offFlag'];
	protect($offFlag);	

	$offFlagVerify = isset($_POST['offFlagVerify']) ? $_POST['offFlagVerify'] : 0;
	protect($offFlagVerify);
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];

	function validCall($curlResult) {
		if ($curlResult) {
			$curlResult = json_decode($curlResult, true);
			if ($curlResult['status'] == 403) {
				echo '{"status": "error"}'; exit();
			}
		}		
	}
	
	if(!$offFlag) //not going offline!
	{
		if($liveFlag) //then we make it DEMO
		{
			$data = array();
			$data['liveFlag'] = true;
			$data['demoFlag'] = true;
			$jsonData = json_encode($data);
			
			$curlResult = callAPI('PUT', $apiURL."venues/$venueID/demo", $data, $apiAuth); //live=0 and demo=0
			validCall($curlResult);

			$_SESSION['venue_demoFlag'] = 1;
			$_SESSION['venue_liveFlag'] = 1;			
			
			$_SESSION['appUnPublished'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
			header('location:'.$_SESSION['path'].'/dashboard'); //redirect to dash
		}
		else //lets go live
		{
			$data = array();
			$data['liveFlag'] = true;
			$data['demoFlag'] = false;
			$jsonData = json_encode($data);
			
			$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/demo", $data, $apiAuth); //reset both flags (offline)
			validCall($curlResult);

			$curlResult = callAPI('PUT', $apiURL."venues/$venueID/live", $data, $apiAuth); //go live!
			validCall($curlResult);	

			$_SESSION['venue_demoFlag'] = 0;
			$_SESSION['venue_liveFlag'] = 1;	

			if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
				$_SESSION['appPublished'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
				header('location:'.$_SESSION['path'].'/dashboard'); //redirect to dash
			} else {
				return true;
			}
		}
	}
	else //take the app offline.
	{
		$data = array();
		$data['liveFlag'] = false;
		$data['demoFlag'] = false;
		$jsonData = json_encode($data);
		
		if ( $offFlagVerify ) {
			$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/live", $data, $apiAuth); //reset both flags (offline)
			validCall($curlResult);		

			$_SESSION['venue_demoFlag'] = 0;
			$_SESSION['venue_liveFlag'] = 0;			
		} else {
			$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/demo", $data, $apiAuth); //reset both flags (offline)
			validCall($curlResult);

			$_SESSION['venue_demoFlag'] = 0;
			$_SESSION['venue_liveFlag'] = 0;
			$_SESSION['appOffline'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
			header('location:'.$_SESSION['path'].'/dashboard'); //redirect to dash
		}
	}
?>