<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	$newEvents = array();
	
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
			try { $events[$i]['id']	= /*protect(*/$_POST['eID'][$j];/*);*/ } catch(Exception $e){ /*nothing*/ } 
			$events[$i]['name'] 	= /*protect(*/$_POST['eName'][$j];//);
			$events[$i]['desc'] 	= /*protect(*/$_POST['eDesc'][$j];//);
			$events[$i]['starttime']= /*protect(*/$_POST['eTime'][$j];//);
			$events[$i]['endtime'] 	= /*protect(*/$_POST['eETime'][$j];//);
			$tempDate 				= /*protect(*/$_POST['eDate'][$j];//);
				//convert to YYYYMMDD (from DD/MM/YYYY)
				preg_match('/(\d\d)\/(\d\d)\/(\d\d\d\d)/',$tempDate, $matches);
				$events[$i]['date'] = $matches[3].'-'.$matches[2].'-'.$matches[1];
			$events[$i]['visible'] 	= /*protect(*/$_POST['eVisi'][$j];//);
				if(!isset($events[$i]['visible']) || !$events[$i]['visible']) $events[$i]['visible'] = 0;
			
			//now we get all the collectionSlots
			$x = $y = 1;
			while($x <= $_POST['event'.$j.'_optionCountAct'] && $y <= $_POST['event'.$j.'_optionCount'])
			{
				if(isset($_POST['eColl']['event'.$j][$y]) && $_POST['eColl']['event'.$j][$y])
				{
					$events[$i]['cSlots'][$x]['name'] = /*protect(*/$_POST['eColl']['event'.$j][$y];//);
					$events[$i]['cSlots'][$x]['time'] = /*protect(*/$_POST['eLead']['event'.$j][$y];//);
					
					$x++;
				}
				$y++;
			}
			
			$i++;
		}
		$j++;
	}
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$venueID = $_SESSION['venue_id'];
	
	$curlResult = '';
	
	foreach($events as $event)
	{
		//create/update event
		$data 					= array();
		$data['venueId']		= $_SESSION['venue_id'];
		$data['name'] 			= $event['name'];
		$data['description'] 	= $event['desc'];
		$data['visible'] 		= $event['visible'];
		$data['schedules'] = array();
		$data['schedules'][0] = array();
		$data['schedules'][0]['freq'] = 'ONCE';
		$data['schedules'][0]['startDate'] = $event['date'].'T'.$event['starttime'].':00';
		$data['schedules'][0]['endDate'] = $event['date'].'T'.$event['endtime'].':00';
		
		$jsonData = json_encode($data);
		
		if(isset($event['id']) && !preg_match('/^e.*$/',$event['id'])) //edit old
		{
			$eventID = $event['id'];
			$curlResult = callAPI('PUT', $apiURL."events/$eventID", $jsonData, $apiAuth); //event created
		}
		else //create new
		{	
			$curlResult = callAPI('POST', $apiURL."venues/$venueID/events", $jsonData, $apiAuth); //event created
			$dataJSON = json_decode($curlResult,true);
			$newEvents[$event['id']] = $dataJSON['id'];
			$eventID = $dataJSON['id'];
		}
		
		//kill all eb-times items for thie event
		$curlResult = callAPI('DELETE', $apiURL."events/$eventID/slots", false, $apiAuth); //venue_eb_times data deleted
	
		//just add as previous ones are wiped clean by now!
		foreach($event['cSlots'] as $cSlot)
		{
			$data 					= array();
			$data['eventId'] 		= $eventID;
			$data['collectionslot'] = $cSlot['name'];
			$data['leadtime'] 		= $cSlot['time'];
					
			$jsonData = json_encode($data);
			$curlResult = callAPI('POST', $apiURL."events/$eventID/slots", $jsonData, $apiAuth); //menu created
			
			$result = json_decode($curlResult,true);
		}
	}
	
	//we need to send back an array along with curlResult
	$newJSON = json_decode($curlResult,true); //make it an array
	$newJSON['update']= $newEvents; //add array of new values
	
	$newJSON = json_encode($newJSON); //back to JSON
	
	echo $newJSON; //sending a JSON via ajax 
?>