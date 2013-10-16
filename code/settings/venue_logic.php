<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

	//debug
	//echo "<br/><br/>";
	//echo $_SESSION['user_id']."<br/>";
	//echo $_SESSION['user_name']."<br/>";
	//echo $_SESSION['user_email']."<br/>";
	//echo $_SESSION['account_name']."<br/>";
	//echo $_SESSION['account_id']."<br/>";
	//echo $_SESSION['token']."<br/>";

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
		$_SESSION['venue_id'] 		= $dataJSON[0]['id'];
		$_SESSION['venue_name'] 	= $dataJSON[0]['name'];
		$_SESSION['venue_desc'] 	= $dataJSON[0]['description'];
		$_SESSION['venue_cat'] 		= $dataJSON[0]['categoryId'];
		$_SESSION['venue_address']  = $dataJSON[0]['address'];	
		$_SESSION['venue_latitude']	= $dataJSON[0]['latitude'];	
		$_SESSION['venue_longitude']= $dataJSON[0]['longitude'];	
		$_SESSION['venue_postcode']	= $dataJSON[0]['postcode'];	
		
		//we get venue id from _SESSION
		$venueID = $_SESSION['venue_id'];
	}

	if(isset($venueID)) //if there is no venue set then no App or Menu can be set anyway
	{	
		$_SESSION['venue_edit_on']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/venueConfig.php');
	}
	else
		header('location:/');
?>