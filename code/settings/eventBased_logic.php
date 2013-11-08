<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////event-based time data////////////////////////////////////////////////////////////////////////////
	
	//query to find events
	$curlResult = callAPI('GET', $apiURL."events?venueId=$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	$events = $dataJSON;
	$eventCount = count($events);
	
	//query to find venues_ne_times_data
		
	$ebTimes = array();
	
	for($i=0;$i<$eventCount;$i++)
	{
		$eventID = $events[$i]['id'];
		 
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/ebtimes?eventId=$eventID", false, $apiAuth);
	
		$dataJSON = json_decode($curlResult,true);
		if(!(isset($dataJSON['status']) && $dataJSON['status']='404'))
		{	
			$ebTimes[$i]['eventID'] 		= $eventID;	
			$ebTimes[$i]['name'] 			= $events[$i]['name'];
			$ebTimes[$i]['desc'] 			= $events[$i]['description'];
			$ebTimes[$i]['date'] 			= date('d/m/Y',strtotime($events[$i]['date']));
			
			$ebTimes[$i]['id']	 			= $dataJSON['id']; 	
			$ebTimes[$i]['starttime'] 		= substr($events[$i]['starttime'], 0, -3);
			$ebTimes[$i]['endtime'] 		= substr($events[$i]['endtime'], 0, -3);
			$ebTimes[$i]['csstarttime']	 	= substr($dataJSON['csstarttime'], 0, -3); 	
			$ebTimes[$i]['csendtime'] 		= substr($dataJSON['csendtime'], 0, -3); 		
			$ebTimes[$i]['leaddrinkstime'] 	= $dataJSON['leaddrinkstime']; 
			$ebTimes[$i]['leadfoodtime'] 	= $dataJSON['leadfoodtime'];	
		}
	}
	
	if(!empty($ebTimes)) 
		$_SESSION['venue_ebtimes_edit_on'] = 1;	
	else
		$_SESSION['venue_ebtimes_edit_on'] = 0;
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/eventBasedConfig.php');
?>