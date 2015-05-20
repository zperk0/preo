<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	$venueID = $_SESSION['venue_id'];
	$accountID = $_SESSION['account_id'];
	
	if($_SESSION['venue_liveFlag']=="1" && $_SESSION['venue_demoFlag']=="0") $live = 1;
	else $live = 0;
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	//////PAYMENTS////////////////////////////////////////////////////////////////////////////
	if ($_SESSION['venue_cashFlag']) {
		$noPaymentFlag = 0;
	} else {
		$curlResult = callAPI('GET', $apiURL."accounts/$accountID/paymentproviders", false, $apiAuth);
		$dataJSON = json_decode($curlResult, true);
		
		if(!empty($dataJSON))
		{
			$connectedFlag = 0;
			foreach($dataJSON as $paymentProvider)
			{
				if(isset($paymentProvider['type']) && $paymentProvider['type'] == 'Stripe')
					$connectedFlag = 1;
			}
			$noPaymentFlag = !$connectedFlag;
		}
		else
			$noPaymentFlag=1;
	}
		
	$currentMode = "";
	if($_SESSION['venue_demoFlag'] && $_SESSION['venue_liveFlag'])
		$currentMode = "DEMO";
	else if($_SESSION['venue_liveFlag'] && !$_SESSION['venue_demoFlag'])
		$currentMode = "LIVE";
	else if(!$_SESSION['venue_liveFlag']&& !$_SESSION['venue_demoFlag'])
		$currentMode = "OFFLINE";
?>