<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	if(isset($_SESSION['venue_netimes_edit_on']) && $_SESSION['venue_netimes_edit_on']) //We delete all old times associated with this venueID
	{		
		$venueID = $_SESSION['venue_id'];
		
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

		//kill all sections and section-items
		$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/netimes", false, $apiAuth); //venue_ne_times data deleted
		
	} //at this stage all current data is deleted and now we will proceed to putting in new data
	
	$venueID = $_SESSION['venue_id']; 
	
	$neTimes = array(); //initialising array
	
	for($i=0;$i<7;$i++)//create array for all days of the week 0=monday, ..., 6=sunday
	{
		$neTimes[$i]['dow'] = /*protect(*/$_POST['dow'][$i];//);
		$neTimes[$i]['ohstarttime'] = /*protect(*/$_POST['ohStartTime'][$i];//);
		$neTimes[$i]['ohendtime'] = /*protect(*/$_POST['ohEndTime'][$i];//);
		$neTimes[$i]['csstarttime'] = /*protect(*/$_POST['csStartTime'][$i];//);
		$neTimes[$i]['csendtime'] = /*protect(*/$_POST['csEndTime'][$i];//);
		$neTimes[$i]['leaddrinkstime'] = /*protect(*/$_POST['leadDrinksMins'][$i];//);
		$neTimes[$i]['leadfoodtime'] = /*protect(*/$_POST['leadFoodMins'][$i];//);
	}
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	
	//create/recreate
	foreach($neTimes as $netime)
	{
		$data 					= array();
		$data['dow'] 			= $netime['dow'];
		$data['ohstarttime']	= $netime['ohstarttime'];
		$data['ohendtime'] 		= $netime['ohendtime'];
		$data['csstarttime'] 	= $netime['csstarttime'];
		$data['csendtime'] 		= $netime['csendtime'];
		$data['leaddrinkstime'] = $netime['leaddrinkstime'];
		$data['leadfoodtime'] 	= $netime['leadfoodtime'];
				
		$jsonData = json_encode($data);
		$curlResult = callAPI('POST', $apiURL."venues/$venueID/netimes", $jsonData, $apiAuth); //menu created
		
		$result = json_decode($curlResult,true);
		
	}
	
	echo $curlResult; //sending a JSON via ajax 
?>