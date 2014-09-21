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
		header("location:$_SESSION[path]/");
	}
	else
	{	
		$account = $dataJSON;
		
		$curlResult = callAPI('GET', $apiURL."invite/account/$accountID", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);

		//Get user count
		$userCount = count($account['users']);
		$inviteUserCount = 0;
		$inviteUsers = $dataJSON;
		
		$_SESSION['user_edit_on']=1;
		$_SESSION['invite_user_edit_on']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/userConfig.php');
	}
?>