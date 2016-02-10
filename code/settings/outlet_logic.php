<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/settings/outlet_functions.php');   //outlet functions

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];
	
	//////OUTLET////////////////////////////////////////////////////////////////////////////
	
	//query to find outlets
	$curlResult = callAPI('GET', $apiURL."outlets?accountId=$accountID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
		
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		header("location:$_SESSION[path]/");
	}
	else
	{	
		$outlets = $dataJSON;
				
		//Get outlet count
		$outletCount = count($outlets);
		
		//get menus
		$curlResult = callAPI('GET', $apiURL."menus?accountId=$accountID&type=MENU", false, $apiAuth);
		
		$menus = json_decode($curlResult,true);
		
		$_SESSION['outlet_edit_on']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/outletConfig.php');
	}
?>