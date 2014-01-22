<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$mdID = $_POST['mdID'];
	protect($mdID);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	//get mealdeal sections
	$curlResultMD = callAPI('GET', $apiURL."items/$mdID/mealdealsections", false, $apiAuth);
	$dataJSONMD = json_decode($curlResultMD,true);
	
	foreach($dataJSONMD as $mdsection)
	{
		$msID  = $mdsection['id'];
		
		//get mealdeal items
		$curlResultMDS = callAPI('GET', $apiURL."mealdealsections/$msID/items", false, $apiAuth);
		$dataJSONMDS = json_decode($curlResultMDS,true);
		
		foreach($dataJSONMDS as $mdsectionitem)
		{
			$mdSecItemID = $mdsectionitem['id'];	
			$curlDelete = callAPI('DELETE', $apiURL."mealdealitems/$mdSecItemID", false, $apiAuth);
		}
		
		$curlDelete = callAPI('DELETE', $apiURL."mealdealsections/$msID", false, $apiAuth);
	}
	
	//kill mealdeal
	$curlResult = callAPI('DELETE', $apiURL."items/$mdID", false, $apiAuth); //md parts deleted
	
	echo $curlResult;

	//at this stage all event data is deleted
?>