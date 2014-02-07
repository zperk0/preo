<?php session_start(); //start the session so this file can access $_SESSION vars.

	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI_Header.php');   //API calling function
	
	$password = $_POST['password'];
	$code = $_POST['code'];
	
	$data = array();
	$data['password'] = $password;
	
	$jsonData = json_encode($data);
	$curlResult = callAPI_Header('POST', $apiURL."users/auth/change/$code", $jsonData, $apiAuth); //password updated
	
	if(preg_match('/^4.*$/',$curlResult))
	{  
		$curlResult = array();
		$curlResult['status'] = "404"; 
		$curlResult = json_encode($curlResult); 
	}
	else
	{  
		$curlResult = array();
		$curlResult['pass'] = "OK"; 
		$curlResult = json_encode($curlResult); 
	}
	
	echo $curlResult; //sending a JSON via ajax
?>