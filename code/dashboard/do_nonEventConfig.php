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
		$curlResult = callAPI('DELETE', $apiURL."venues/$venueID/hours", false, $apiAuth); //venue_hours data deleted
		
	} //at this stage all current data is deleted and now we will proceed to putting in new data
	
	$venueID = $_SESSION['venue_id']; 
	
	$neTimes = array(); //initialising array
	
	$dow = array('dummy','sunday','monday','tuesday','wednesday','thursday','friday','saturday');
	
	$cIsOpenPickup  = $_POST['isOpenPickup'];
	$cIsOpenDelivery  = $_POST['isOpenDelivery'];
	$cOpen  = $_POST['ohStartTime'];
	$cClose = $_POST['ohEndTime'];
	
	for($i=1;$i<8;$i++)//create array for all days of the week 0=monday, ..., 6=sunday
	{
		$counter = 0;
		foreach($cOpen[$dow[$i]] as $entry)
		{
			$neTimes[$i][$counter]['ohstarttime'] = $entry;
			$counter++;
		}
		
		$counter = 0;
		foreach($cClose[$dow[$i]] as $entry)
		{
			$neTimes[$i][$counter]['ohendtime']   = $entry;
			$counter++;
		}

		$counter = 0;
		foreach($cIsOpenPickup[$dow[$i]] as $entry)
		{
			$neTimes[$i][$counter]['isOpenPickup']   = $entry;
			$counter++;
		}

		$counter = 0;
		foreach($cIsOpenDelivery[$dow[$i]] as $entry)
		{
			$neTimes[$i][$counter]['isOpenDelivery']   = $entry;
			$counter++;
		}
		
	}
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

	//create/recreate
	foreach($neTimes as $dName => $dow)
	{
		foreach($dow as $line)
		{
			$data 			= array();
			$data['day']	= $dName;
			$data['open']	= "$line[ohstarttime]:00";
			$data['close'] 	= "$line[ohendtime]:00";			
			$data['pickup'] 	= $line["isOpenPickup"];
			$data['delivery'] 	= $line["isOpenDelivery"]; 
			
			
			$jsonData = json_encode($data);
			$curlResult = callAPI('POST', $apiURL."venues/$venueID/hours", $jsonData, $apiAuth); //menu created
			
			$result = json_decode($curlResult,true);
		}
	}
	
	echo $curlResult; //sending a JSON via ajax 
?>