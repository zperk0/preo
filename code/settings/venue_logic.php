<?php

 						 
	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];
	
	//////VENUE////////////////////////////////////////////////////////////////////////////
	
	//query to find venues
	$curlResult = callAPI('GET', $apiURL."venues?accountId=$accountID", false, $apiAuth);
	
	$dataJSON = json_decode($curlResult,true);
	
	if(!empty($dataJSON)) 
	{	
		$_SESSION['venue_id'] 			= $dataJSON[0]['id'];
		$_SESSION['venue_name'] 		= $dataJSON[0]['name'];
		$_SESSION['venue_desc'] 		= $dataJSON[0]['description'];
		$_SESSION['venue_cat'] 			= $dataJSON[0]['categoryId'];
		$_SESSION['venue_address']  	= $dataJSON[0]['address1'];			
		$_SESSION['venue_latitude']		= $dataJSON[0]['latitude'];	
		$_SESSION['venue_longitude']	= $dataJSON[0]['longitude'];	
		$_SESSION['venue_postcode']		= $dataJSON[0]['postcode'];	
		$_SESSION['venue_country']		= $dataJSON[0]['country'];	
		$_SESSION['venue_eventFlag']	= $dataJSON[0]['eventFlag'];	
		$_SESSION['venue_liveFlag']		= $dataJSON[0]['liveFlag'];
		$_SESSION['venue_demoFlag']		= $dataJSON[0]['demoFlag'];	
		$_SESSION['venue_code']			= $dataJSON[0]['code'];	
		$_SESSION['venue_deliveryFlag']	= $dataJSON[0]['deliverFlag'];			
		$_SESSION['venue_address2']  	= $dataJSON[0]['address2'];	
		$_SESSION['venue_address3']  	= $dataJSON[0]['address3'];			
		$_SESSION['venue_town']  		= $dataJSON[0]['city'];	
		$_SESSION['venue_language']		= explode("-",$dataJSON[0]['locale'])[0];	 //get the locale code if there is a country code or not.
		$_SESSION['venue_timezone']		= $dataJSON[0]['timeZone'];	
		$_SESSION['venue_currency']		= $dataJSON[0]['ccy'];	
					

		
		//we get venue id from _SESSION
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
			$_SESSION['delivery_discount'] 		= $dataJSON["deliveryDiscount"];
			$_SESSION['delivery_phone'] 		= $dataJSON["deliveryPhone"];
			$_SESSION['venue_discount'] 		= $dataJSON["pickupDiscount"];
		}
		
		// get messages
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/messages", false, $apiAuth );
		$dataJSON = json_decode($curlResult,true);

		$_SESSION["message_flag"] = "0";
		if(!empty($dataJSON))
		{
			$deliveryMsgs = array();	
 			if (count($dataJSON) < 1  ){
				$_SESSION["message_flag"] = "0";
			}else{
				foreach ($dataJSON as $row_data ){
					
					$tempArray = array(
							"id" => $row_data['id'],
							"name"=> $row_data['name'],
							"content" => $row_data['content'],
							"active" => $row_data['active']	
					);					
					if (!isset($deliveryMsgs[$row_data["type"]]))
						$deliveryMsgs[$row_data["type"]] = array();

					array_push($deliveryMsgs[$row_data["type"]],$tempArray);
				}
				$_SESSION["delivery_msgs"] = $deliveryMsgs;
				$_SESSION["message_flag"] = "1";
			}
		}

		$redirectFlag = 1;
	}

	if(isset($venueID)) //if there is no venue set then no App or Menu can be set anyway
	{	
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