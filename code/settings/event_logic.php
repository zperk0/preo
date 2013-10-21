<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////EVENT////////////////////////////////////////////////////////////////////////////
	
	//query to find menu
	$curlResult = callAPI('GET', $apiURL."events?venueId=$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		$_SESSION['event_edit_on']=0;
	}
	else
	{	
		$events = array();
		
		$events = $dataJSON;
		
		$eventCount = count($events);
		
		$_SESSION['events_old'] = $events;
		
		$_SESSION['event_edit_on']=1;
	}
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/eventConfig.php');
?>