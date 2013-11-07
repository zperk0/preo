<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	/*if(isset($_SESSION['venue_ebtimes_edit_on']) && $_SESSION['venue_ebtimes_edit_on']) //We delete all old times associated with this venueID
	{		
		$venueID = $_SESSION['venue_id'];
		
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

		//kill all sections and section-items
		$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/netimes", false, $apiAuth); //venue_ne_times data deleted
		
	} //at this stage all current data is deleted and now we will proceed to putting in new data
	*/
	
	$venueID = $_SESSION['venue_id']; 
	
	$ebTimes = array(); //initialising array
	
	$eventCount = $_POST['eventCount']; //linear count -event
	protect($eventCount);
	
	$eventCountAct = $_POST['eventCountAct']; //actual count -event
	protect($eventCountAct);
	
	$a = $b = 0; //need to change to 1 as 0 = dummy data
	
	while($a <= $eventCountAct && $b <= $eventCount)
	{
		if(isset($_POST['ebID'][$b]) && $_POST['ebID'][$b])
		{
			$ebTimes[$a]['id'] 				= /*protect(*/$_POST['ebID'][$b];//);
			$ebTimes[$a]['name'] 			= /*protect(*/$_POST['ebName'][$b];//);
			$ebTimes[$a]['desc'] 			= /*protect(*/$_POST['ebDesc'][$b];//);
			$tempDate 						= /*protect(*/$_POST['ebDate'][$b];//);
				//convert to YYYYMMDD (from DD/MM/YYYY)
				preg_match('/(\d\d)\/(\d\d)\/(\d\d\d\d)/',$tempDate, $matches);
				$ebTimes[$a]['date'] 		= $matches[3].$matches[2].$matches[1];
			$ebTimes[$a]['starttime'] 		= /*protect(*/$_POST['ebTime'][$b];//);
			$ebTimes[$a]['endtime'] 		= /*protect(*/$_POST['ebETime'][$b];//);
			$ebTimes[$a]['csstarttime'] 	= /*protect(*/$_POST['csStartTime'][$b];//);
			$ebTimes[$a]['csendtime'] 		= /*protect(*/$_POST['csEndTime'][$b];//);
			$ebTimes[$a]['leaddrinkstime'] 	= /*protect(*/$_POST['leadDrinksMins'][$b];//);
			$ebTimes[$a]['leadfoodtime'] 	= /*protect(*/$_POST['leadFoodMins'][$b];//);
			$a++;
		}
		$b++;
	}
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	
	//create/recreate
	foreach($ebTimes as $ebtime)
	{
		//create event
		$data 					= array();
		$data['venueId']		= $_SESSION['venue_id'];
		$data['name'] 			= $ebtime['name'];
		$data['description'] 	= $ebtime['desc'];
		$data['starttime'] 		= $ebtime['starttime'];
		$data['endtime'] 		= $ebtime['endtime'];
		$data['date'] 			= $ebtime['date'];
		$data['visible'] 		= "1";
		
		$jsonData = json_encode($data);
		
		$eventID= '';
		if(isset($ebtime['id']) && !preg_match('/^e\d+$/',$ebtime['id'])) //edit old
		{
			$eventID = $ebtime['id'];
			$curlResult = callAPI('PUT', $apiURL."events/$eventID", $jsonData, $apiAuth); //event created
		}
		else //create new
		{	
			$curlResult = callAPI('POST', $apiURL."events", $jsonData, $apiAuth); //event created
			$returnData = json_decode($curlResult, true);
			$eventID = $returnData['id'];
		}
			
		$data 					= array();
		$data['eventId'] 		= $eventID;
		$data['csstarttime'] 	= $ebtime['csstarttime'];
		$data['csendtime'] 		= $ebtime['csendtime'];
		$data['leaddrinkstime'] = $ebtime['leaddrinkstime'];
		$data['leadfoodtime'] 	= $ebtime['leadfoodtime'];
				
		$jsonData = json_encode($data);
		$curlResult = callAPI('POST', $apiURL."venues/$venueID/ebtimes", $jsonData, $apiAuth); //menu created
		
		$result = json_decode($curlResult,true);
		
	}
	
	echo $curlResult; //sending a JSON via ajax 
?>