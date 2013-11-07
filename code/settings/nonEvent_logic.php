<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////nonEvent////////////////////////////////////////////////////////////////////////////
	
	//query to find venues_ne_times_data
		
	$neTimes = array();
	
	for($i=0;$i<7;$i++)
	{
		$dow = '';
		switch($i)
		{
			case 0:{ $dow = 'monday'; break; }
			case 1:{ $dow = 'tuesday'; break; }
			case 2:{ $dow = 'wednesday'; break; }
			case 3:{ $dow = 'thursday'; break; }
			case 4:{ $dow = 'friday'; break; }
			case 5:{ $dow = 'saturday'; break; }
			case 6:{ $dow = 'sunday'; break; }
		}
		
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/netimes?dow=$dow", false, $apiAuth);
	
		$dataJSON = json_decode($curlResult,true);
			
		$neTimes[$i]['ohstarttime'] 	= $dataJSON['ohstarttime'];	
		$neTimes[$i]['ohendtime'] 		= $dataJSON['ohendtime']; 		
		$neTimes[$i]['csstarttime']	 	= $dataJSON['csstarttime']; 	
		$neTimes[$i]['csendtime'] 		= $dataJSON['csendtime']; 		
		$neTimes[$i]['leaddrinkstime'] 	= $dataJSON['leaddrinkstime']; 
		$neTimes[$i]['leadfoodtime'] 	= $dataJSON['leadfoodtime'];	
	}
	
	if(count($neTimes)) 
	{
		$_SESSION['venue_netimes_edit_on'] = 1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/nonEventConfig.php');
	}
	else
		header("location:$_SESSION[path]/");
?>