<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function
	
	$vName = $_POST['vName'];
	protect($vName);
	
	$vAdd = $_POST['vAdd'];
	protect($vAdd);
	
	$vCode = $_POST['vCode'];
	protect($vCode);
	
	preg_match('/\((.*), (.*)\)/', $vCode, $matches);
	$vLat=$matches[1];
	$vLong=$matches[2];
	
	$vPostCode = substr($vAdd, strrpos($vAdd, ', ')+1);
	
	$vDesc = $_POST['vDesc'];
	protect($vDesc);
	
	$data['name']			= $vName;
	$data['description']	= $vDesc;
	$data['accountId']		= $_SESSION['account_id'];
	$data['address']		= $vAdd;
	$data['latitude']		= $vLat;
	$data['longitude']		= $vLong;
	$data['postcode']		= $vPostCode;
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('POST', $apiURL."venues", $jsonData, $apiAuth);
	
	echo $curlResult; //sending a JSON via ajax
?>