<?php

 	function formatDisplayPercentage($num){

 	if ($num > 1 || !((isset($num) && $num))) 		
 		return $num;
 	else 
		return floor($num * 100);
	
	}
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');   //API calling function

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];
	
	//////VENUE////////////////////////////////////////////////////////////////////////////
	
	//query to find venues

	if (!isset($_SESSION['venue_id'])) {
		$curlResult = callAPI('GET', $apiURL."venues?accountId=$accountID", false, $apiAuth);
		
		$dataJSON = json_decode($curlResult,true);

		if (!empty($dataJSON)) {
			$dataJSON[0]['locale'] = explode("-",$dataJSON[0]['locale'])[0];
			setDataVenue($dataJSON[0]);		
		}
	}

	$venueID = $_SESSION['venue_id'];	

	//get settings
	$curlResult = callAPI('GET', $apiURL."venues/$venueID/settings", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(!empty($dataJSON))
	{
		$_SESSION['venue_leadtime']			= $dataJSON['leadTime'];
		$_SESSION['venue_collectinterval']	= $dataJSON['collectInterval'];		
		$_SESSION['delivery_zone'] 			= $dataJSON["deliveryZone"];
		$_SESSION['venue_order_min']		= $dataJSON["orderMin"];
		$_SESSION['delivery_charge'] 		= $dataJSON["deliveryCharge"];
		$_SESSION['delivery_charge_below']	= $dataJSON["deliveryChargeBelow"];
		$_SESSION['delivery_order_min'] 	= $dataJSON["deliveryOrderMin"];
		$_SESSION['delivery_lead_time'] 	= $dataJSON["deliveryLeadTime"];
		$_SESSION['delivery_discount'] 		= formatDisplayPercentage($dataJSON["deliveryDiscount"]);
		$_SESSION['delivery_phone'] 		= $dataJSON["deliveryPhone"];
		$_SESSION['max_delivery_distance'] 		= $dataJSON["maxDeliveryDistance"];
		$_SESSION['venue_discount'] 		= formatDisplayPercentage($dataJSON["pickupDiscount"]);
	}
			

	$redirectFlag = 1;


	if(isset($venueID)) //if there is no venue set then no App or Menu can be set anyway
	{	

		$curlResult = callAPI('GET', $apiURL."accounts/$accountID/features/11", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);
		if (!empty($dataJSON)){
			$_SESSION['has_feature_voucher']=1;		
		} else {
			$_SESSION['has_feature_voucher']=0;		
		}

		$_SESSION['venue_edit_on']=1;
		
		if( (!isset($_SESSION['signupWizFlag'])) || (isset($_SESSION['signupWizFlag']) && !$_SESSION['signupWizFlag']) )
			$redirectFlag = 0;
		
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/venueConfig.php');
	}
	else
		header("location:$_SESSION[path]/");
	
	function currency_list(){
		$currencies = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/js/data/common-currency.json'), true);		 		
		return $currencies;
	}

	function dump($value) {
	    //echo "<pre>"; 
	    var_dump($value); 
    	//echo "</pre>:;
	}
	
?>