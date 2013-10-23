<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];
	
	//////USER////////////////////////////////////////////////////////////////////////////
	
	//query to find users
	$curlResult = callAPI('GET', $apiURL."accounts/$accountID/users", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
		
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		header('location:/');
	}
	else
	{	
		$account = $dataJSON;
		
		//Get user count
		$userCount = count($account['users']);
		
		$_SESSION['user_edit_on']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/userConfig.php');
	}
?>