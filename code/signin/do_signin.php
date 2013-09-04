<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function
	
	$email = $_POST['email'];
	protect($email);
	
	$password = $_POST['password'];
	protect($password);
	
	$data['username']	= $email;
	$data['password']	= $password;
	
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('POST', $apiURL."users/auth", $jsonData, $apiAuth);
	
	// 	DEBUG
	if($curlResult) echo "Success!"; 
	else echo "Fail :(";

	echo "<br/><br/><pre>".json_encode(json_decode($curlResult), JSON_PRETTY_PRINT)."</pre><br/>";
	
	echo "<br/>Need to check if data is sent by PreoDay systems and then proceed to dashboard<br/>";
	
?>