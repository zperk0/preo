<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$vName = $_POST['vName'];
	protect($vName);
	
	$vAdd = $_POST['vAdd'];
	protect($vAdd);
	
	$vAdd = $_POST['vAdd'];
	protect($vAdd);
	
	$vPostal = $_POST['vPostal'];
	protect($vPostal);
	
	$vCountry = $_POST['vCountry'];
	protect($vCountry);
	
	$vCat = $_POST['vCat'];
	protect($vCat);
	
	$leadtime = $_POST['leadtime'];
	protect($leadtime);
	
	$cDuration = $_POST['cDuration'];
	protect($cDuration);
	
	$vEvent = $_POST['vEvent'];
	protect($vEvent);
	
	$vCode = $_POST['vCode'];
	protect($vCode);

	$dZone = $_POST['dZone'];
	protect($dZone);

	$minVal = $_POST["minVal"];
	protect($minVal );

	$dCharge = $_POST["dCharge"];
	protect($dCharge );

	$dOrder = $_POST["dOrder"];
	protect($dOrder );

	$dLeadTime = $_POST["dLeadTime"];
	protect($dLeadTime );
	
	$disCounted = $_POST["disCounted"];
	protect($disCounted );

	$contactInfo = $_POST["contactInfo"];
	protect($contactInfo );

	$name = array();
	$content = array();
	$active = array();
	for ($ind = 1; $ind < 7; $ind ++ ){
		$name[$ind - 1] = $_POST["shortName".$ind];
		protect($name[$ind - 1] );

		$content[$ind - 1] = $_POST["cusNotif".$ind];
		protect($content[$ind - 1] );

		$active[$ind - 1] = $_POST["active".$ind];
		protect($active[$ind - 1] );
	}
	

	preg_match('/\((.*), (.*)\)/', $vCode, $matches);
	$vLat=$matches[1];
	$vLong=$matches[2];
	
	$vDesc = $_POST['vDesc'];
	protect($vDesc);
	
	$data['name']				= $vName;
	$data['description']		= $vDesc;
	$data['accountId']			= $_SESSION['account_id'];
	$data['address']			= $vAdd;
	$data['latitude']			= $vLat;
	$data['longitude']			= $vLong;
	$data['postcode']			= $vPostal;
	$data['country']			= $vCountry;
	$data['categoryId']			= $vCat;
	$data['eventFlag']			= $vEvent;
	if(isset($_SESSION['venue_code']))
		$data['code']				= $_SESSION['venue_code'];
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	if($vEvent) $_SESSION['venue_eventFlag'] = 1;
	else $_SESSION['venue_eventFlag'] = 0;
	
	if(isset($_SESSION['venue_edit_on']) && $_SESSION['venue_edit_on'])
	{
		$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id'], $jsonData, $apiAuth);
		$_SESSION['venue_edit_on'] = 0;
		
		$data = array();
		$data['leadTime']			= $leadtime;
		$data['collectInterval']	= $cDuration;
		$data['deliveryZone']		= $dZone;
		$data['orderMin']	        = $minVal;
		$data['deliveryCharge']	    = $dCharge;
		$data['deliveryOrderMin']	= $dOrder;
		$data['deliveryLeadTime']	= $dLeadTime;
		$data['deliveryDiscount']   = $disCounted;
		$data['deliveryPhone']		= $contactInfo;

		$jsonData = json_encode($data);
		
		$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);

		// save message
		for ($ind = 1; $ind < 7; $ind++ ){
			$data = array();
			$data['name'] = $name[$ind - 1];
			$data['content'] = $content[$ind - 1];
			$data['active'] = $active[$ind - 1];

			$jsonData = json_encode($data );
			if ($_SESSION["message_flag"] == 1 ){
				$curlResult = callAPI('PUT', $apiURL."venues/".$_SESSION['venue_id']."/messages/".$_SESSION['msg'.$ind.'_id'], $jsonData, $apiAuth);
			}else{
				$curlResult = callAPI('POST', $apiURL."venues/".$_SESSION['venue_id']."/messages", $jsonData, $apiAuth);
			}
		}
							
	}
	else
	{
		$curlResult = callAPI('POST', $apiURL."venues", $jsonData, $apiAuth);
		
		$result = json_decode($curlResult, true);
		
		$data = array();
		$data['leadTime']			= $leadtime;
		$data['collectInterval']	= $cDuration;
		
		if($_SESSION['signupWizFlag'])
		{
			//default data
			$data['textColour']			= 'FFFFFF';
			$data['buttonColour']		= '3AA2DC';
			$data['buttonTextColour']	= 'FFFFFF';
			$data['title'] 				= $vName;	
			$data['wallpaperId']		= 1;
			$data['button2Colour'] 		= '3AA2DC';
			$data['button2TextColour'] 	= 'FFFFFF';	
			$data['button3Colour'] 		= '2E70B7';		
			$data['button3TextColour'] 	= 'FFFFFF';
		}
		
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('POST', $apiURL."venues/".$result['id']."/settings", $jsonData, $apiAuth);
	
		//Finally add outlet
		$data = array();
		$data['venueId'] 	= $result['id'];
		$data['name'] 		= $vName;
		$data['latitude'] 	= $vLat;
		$data['longitude'] 	= $vLong;
		
		$jsonData = json_encode($data);
		$curlResult = callAPI('POST', $apiURL."outlets", $jsonData, $apiAuth); 
	}
	
	echo $curlResult; //sending a JSON via ajax
?>