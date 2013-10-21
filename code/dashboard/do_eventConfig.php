<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	if(isset($_SESSION['event_edit_on']) && $_SESSION['event_edit_on']) //We delete the old events and create a new ones!
	{		
		$venueID = $_SESSION['venue_id'];
		
		$events = array();
		$events = $_SESSION['events_old'];
		
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

		foreach($events as $event)
		{
			$eventID = $event['id'];
			
			//kill all events
			$curlResult = callAPI('DELETE', $apiURL."events/$eventID", false, $apiAuth); //event deleted
		}
	} //at this stage all current data is deleted and now we will proceed to putting in new data	
		
	$eventCount = $_POST['eventCount']; //linear count -event
	protect($eventCount);
	
	$eventCountAct = $_POST['eventCountAct']; //actual count -event
	protect($eventCountAct);
	
	$events = array(); //initialising event 
	
	//remember everything is 1-indexed. 0 is dummy data
	$i = $j = 1;
	while($i <= $eventCountAct && $j <= $eventCount) //$i should break it faster unless linear == actual  -- creating new event here
	{
		if(isset($_POST['eName'][$j]) && $_POST['eName'][$j])
		{
			$events[$i]['name'] 	= /*protect(*/$_POST['eName'][$j];//);
			$events[$i]['desc'] 	= /*protect(*/$_POST['eDesc'][$j];//);
			$events[$i]['time'] 	= /*protect(*/$_POST['eTime'][$j];//);
			$tempDate 				= /*protect(*/$_POST['eDate'][$j];//);
				//convert to YYYYMMDD (from DD/MM/YYYY)
				preg_match('/(\d\d)\/(\d\d)\/(\d\d\d\d)/',$tempDate, $matches);
				$events[$i]['date'] = $matches[3].$matches[2].$matches[1];
			$events[$i]['visible'] 	= /*protect(*/$_POST['eVisi'][$j];//);
				if(!isset($events[$i]['visible']) || !$events[$i]['visible']) $events[$i]['visible'] = 0;
			
			$i++;
		}
		$j++;
	}
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	foreach($events as $event)
	{
		//create event
		$data 					= array();
		$data['venueId']		= $_SESSION['venue_id'];
		$data['name'] 			= $event['name'];
		$data['description'] 	= $event['desc'];
		$data['time'] 			= $event['time'];
		$data['date'] 			= $event['date'];
		$data['visible'] 		= $event['visible'];
		
		$jsonData = json_encode($data);
	
		$curlResult = callAPI('POST', $apiURL."events", $jsonData, $apiAuth); //event created
	}
	
	echo $curlResult; //sending a JSON via ajax 
	
	
	//reset var
	if(isset($_SESSION['event_edit_on']) && $_SESSION['event_edit_on'])
		$_SESSION['event_edit_on']=0;
?>