<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$email = strtolower($_POST['emailF']);
	
	$url = "";
	
	if( (isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] == 443) ) $url="https://";
	else $url="http://";
	
	$url.=$_SERVER['HTTP_HOST']."/reset?code=";
	
	$data['email']	= $email;
	$data['link']	= $url;
	
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('POST', $apiURL."users/auth/forgot", $jsonData, $apiAuth);
	
	echo $curlResult; //sending a JSON via ajax
?>