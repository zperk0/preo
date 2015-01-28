<?php session_start(); //start the session so this file can access $_SESSION vars.
	function formatPercentage($num){
		if (isset($num) && $num)
			return $num/100;
		else
			return $num;
	}

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');   //API calling function
	
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

	$vDelivery = $_POST['vDelivery'];
	protect($vDelivery);

	$vCash = $_POST['vCash'];
	protect($vCash);
	
	$vCode = $_POST['vCode'];
	protect($vCode);
	
	$vDiscount = formatPercentage($_POST['vDiscount']);
	protect($vDiscount);

	$language = $_POST['language'];
	protect($language);
	
	$timezone = $_POST['timezone'];
	protect($timezone);

	$vCurrency = $_POST['currency'];
	protect($vCurrency);

	$vOrderMin = $_POST['vOrderMin'];
	protect($vCurrency);
	

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
	$data['deliverFlag']		= $vDelivery;
	$data['cashFlag']		= $vCash;
	$data['city']			= $vTown;
	$data['locale']			= $language."-".$vCountry;
	$data['timeZone']			= $timezone;
	$data['ccy']			= $vCurrency;
	//save the venue_currency so we can use it in the other pages.
	$_SESSION['venue_currency'] = $vCurrency;
	
		
		
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
		$data['pickupDiscount']   	= $vDiscount;
		$data['orderMin']			= $vOrderMin;
		
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);

		setDataVenue($data);
		
							
	}
	else{		
		if ($_GET['skipUser']){
			$accountData = array();
			$accountData['name'] = $vName;
			$accountJsonData = json_encode($accountData);
			$curlResult	 = callAPI('POST', $apiURL."accounts", $accountJsonData, $apiAuth);	
		}		
		$data['accountId'] = json_decode($curlResult,true)['id'];		
		$jsonData = json_encode($data);	
		$venueCurlResult = callAPI('POST', $apiURL."venues", $jsonData, $apiAuth);
		
		$result = json_decode($venueCurlResult, true);
		
		$data = array();
		$data['leadTime']			= $leadtime;
		$data['pickupDiscount']   	= $vDiscount;
		$data['orderMin']			= $vOrderMin;	
		
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('POST', $apiURL."venues/".$result['id']."/settings", $jsonData, $apiAuth);		

		//Finally add outlet
		$data = array();
		$data['venueId'] 	= $result['id'];
		$_SESSION['venue_id'] = $data['venueId'];
		$_SESSION['noVenueFlag'] = 0;
		$data['name'] 		= $vName;
		$data['latitude'] 	= $vLat;
		$data['longitude'] 	= $vLong;
		
		$jsonData = json_encode($data);
		$curlResult = callAPI('POST', $apiURL."outlets", $jsonData, $apiAuth); 

	}


	
	echo $venueCurlResult; //sending a JSON via ajax
?>