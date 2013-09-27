<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function
	
	$email = strtolower($_POST['email']);
	protect($email);
	
	$data['email']	= $email;
	
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('POST', $apiURL."users/auth/forgot", $jsonData, $apiAuth);
	
	$dataJSON = json_decode($curlResult,true);
	
	if(isset($dataJSON['token'])) $_SESSION['token']=$dataJSON['token']; //otherwise its an error! 
	
	echo $curlResult; //sending a JSON via ajax
?>