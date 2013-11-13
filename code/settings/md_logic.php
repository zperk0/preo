<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	$_SESSION['noItemsFlag']=0;
	$mdCount=0;
	
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////Items////////////////////////////////////////////////////////////////////////////
	
	//query to find all items for mealdeals
	$curlResult = callAPI('GET', $apiURL."items/all/$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		$_SESSION['noItemsFlag']=1;
	}
	else
	{	
		$items = array();
		
		$items = $dataJSON;
	}
	
	////////////////MealDeals//////////////////////////////////////////////////////////////////
	
	//query to find all mealdeals
	$curlResult = callAPI('GET', $apiURL."menus/mealdeals/$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(!(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)))
	{	
		$_SESSION['md_edit_on']=1;
		
		$md = $dataJSON;
		
		$mdCount = count($md);
		
	}
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/mdConfig.php');
?>