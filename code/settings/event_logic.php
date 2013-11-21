<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////EVENT////////////////////////////////////////////////////////////////////////////
	
	//query to find events
	$curlResult = callAPI('GET', $apiURL."events?venueId=$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		$_SESSION['event_edit_on']=0;
		$redirectFlag = 1;
	}
	else
	{	
		$events = array();
		
		$events = $dataJSON;
		
		//get slots
		foreach($events as $key => $event)
		{
			$eventID = $event['id'];
		 
			$curlResult = callAPI('GET', $apiURL."venues/$venueID/ebtimes?eventId=$eventID", false, $apiAuth);
		
			$dataJSON = json_decode($curlResult,true);
			
			if(!(isset($dataJSON['status']) && $dataJSON['status']='404'))
			{	
				$count = 0;
				foreach($dataJSON as $cSlot)
				{
					$events[$key]['cSlots'][$count]['collectionslot'] 	= $cSlot['collectionslot'];
					$events[$key]['cSlots'][$count]['leadtime'] 		= $cSlot['leadtime'];	
					$count++;
				}
				$events[$key]['collectionCount']=$count;
			}
		}
		
		$eventCount = count($events);
		
		$_SESSION['events_old'] = $events;
		
		$_SESSION['event_edit_on']=1;
		$redirectFlag = 0;
	}
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/eventConfig.php');
?>