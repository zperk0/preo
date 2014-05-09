<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$vName = $_POST['vName'];
	protect($vName);
	
	$vAdd = $_POST['vAdd'];
	protect($vAdd);
	
	$vAdd2 = $_POST['vAdd2'];
	protect($vAdd2);
	
	$vAdd3 = $_POST['vAdd3'];
	protect($vAdd3);
		
	$vPostal = $_POST['vPostal'];
	protect($vPostal);
	
	$vTown = $_POST['vTown'];
	protect($vTown);
	
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

	$dMinVal = $_POST["dMinVal"];
	protect($dMinVal );

	$dCharge = $_POST["dCharge"];
	protect($dCharge );

	$dChargeBelow = $_POST["dChargeBelow"];
	protect($dChargeBelow );

	$dLeadTime = $_POST["dLeadTime"];
	protect($dLeadTime );
	
	$vDeliveryDiscount = $_POST["vDeliveryDiscount"];
	protect($vDeliveryDiscount );

	$contactInfo = $_POST["contactInfo"];
	protect($contactInfo );
	
	$vDiscount = $_POST['vDiscount'];
	protect($vDiscount);
		
	$vDelivery = $_POST["vDelivery"];
	protect($vDelivery);

	$cusNotif1 = $_POST["cusNotif1"];
	protect($cusNotif1);
	$cusNotif2 = $_POST["cusNotif3"];
	protect($cusNotif2);
	$cusNotif3 = $_POST["cusNotif3"];
	protect($cusNotif3);
	$cusNotif4 = $_POST["cusNotif4"];
	protect($cusNotif4);
	$cusNotif5 = $_POST["cusNotif5"];
	protect($cusNotif5);
	$cusNotif6 = $_POST["cusNotif6"];
	protect($cusNotif6);
	
	$shortName1 = $_POST["shortName1"];
	protect($shortName1);
	$shortName2 = $_POST["shortName2"];
	protect($shortName2);
	$shortName3 = $_POST["shortName3"];
	protect($shortName3);	
	$shortName4 = $_POST["shortName4"];
	protect($shortName1);
	$shortName5 = $_POST["shortName5"];
	protect($shortName2);
	$shortName6 = $_POST["shortName6"];
	protect($shortName3);	
	
	

	$active1 = $_POST["active1"];
	protect($active1);
	$active2 = $_POST["active2"];
	protect($active2);
	$active3 = $_POST["active3"];
	protect($active3);	
	$active4 = $_POST["active4"];
	protect($active4);
	$active5 = $_POST["active5"];
	protect($active5);
	$active6 = $_POST["active6"];
	protect($active6);	
	

	$language = $_POST['language'];
	protect($language);
	
	$timezone = $_POST['timezone'];
	protect($timezone);

	$vCurrency = $_POST['currency'];
	protect($vCurrency);

	$vOrderMin = $_POST['vOrderMin'];
	protect($vCurrency);


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
	$data['address1']			= $vAdd;
	$data['address2']			= $vAdd2;
	$data['address3']			= $vAdd3;
	$data['latitude']			= $vLat;
	$data['longitude']			= $vLong;
	$data['postcode']			= $vPostal;
	$data['country']			= $vCountry;
	$data['categoryId']			= $vCat;
	$data['eventFlag']			= $vEvent;
	$data['city']			= $vTown;
	$data['locale']			= $language."-".$vCountry;
	$data['timeZone']			= $timezone;
	$data['deliverFlag']   = $vDelivery;
	$data['ccy']			= $vCurrency;
	
		
		
	if(isset($_SESSION['venue_code']))
		$data['code'] = $_SESSION['venue_code'];
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	if($vEvent) $_SESSION['venue_eventFlag'] = 1;
	else $_SESSION['venue_eventFlag'] = 0;
	
	if(isset($_SESSION['venue_edit_on']) && $_SESSION['venue_edit_on'])
	{
		$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id'], $jsonData, $apiAuth);
		
		$data = array();
		$data['leadTime']			= $leadtime;
		$data['deliveryOrderMin']	= $dMinVal;
		$data['deliveryCharge']	    = $dCharge;	
		$data['deliveryChargeBelow']= $dChargeBelow;
		$data['collectInterval']	= $cDuration;
		$data['deliveryZone']		= $dZone;					
		$data['deliveryLeadTime']	= $dLeadTime;
		$data['deliveryDiscount']   = $vDeliveryDiscount;
		$data['pickupDiscount']   	= $vDiscount;
		$data['orderMin']			= $vOrderMin;
			
		

		

		$data['deliveryPhone']		= $contactInfo;



		$jsonData = json_encode($data);
		
		$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);

		// save message
		for ($ind = 1; $ind < 7; $ind++ ){
			$data = array();
			$data['name'] = $name[$ind - 1];
			$data['content'] = $content[$ind - 1];
			$data['active'] = $active[$ind - 1];
			if ($ind < 4)
				$data['type'] = "PUSH_NOTIFY";
			else
				$data['type'] = "PUSH_REJECT";

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
		$data['deliveryOrderMin']	= $dMinVal;
		$data['deliveryCharge']	    = $dCharge;	
		$data['deliveryChargeBelow']= $dChargeBelow;
		$data['collectInterval']	= $cDuration;
		$data['deliveryZone']		= $dZone;					
		$data['deliveryLeadTime']	= $dLeadTime;
		$data['deliveryDiscount']   = $vDeliveryDiscount;
		$data['pickupDiscount']   	= $vDiscount;
		$data['orderMin']			= $vOrderMin;
		
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