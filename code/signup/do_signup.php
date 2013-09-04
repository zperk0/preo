<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function
	
	$fName = $_POST['fName'];
	protect($fName);
	
	$lName = $_POST['lName'];
	protect($lName);
	
	$name = $fName." ".$lName;
	
	$email = $_POST['email'];
	protect($email);
	
	$password = $_POST['password'];
	protect($password);
	
	$businessName = $_POST['businessName'];
	protect($businessName);
	
	$notificationFlag = $_POST['notification-switch']; //0=off, 1=on
	protect($notificationFlag);  //currently we dont store this!
	
	$data['name']				= $businessName;
	$data['owner']['name']		= $name;
	$data['owner']['username']	= $email;
	$data['owner']['email']		= $email;
	$data['owner']['password'] 	= $password;
	
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('POST', $apiURL."accounts", $jsonData, $apiAuth);
	
	//DEBUG
	if($curlResult) echo "Success!"; 
	else echo "Fail :(";

	echo "<br/><br/><pre>".json_encode(json_decode($curlResult), JSON_PRETTY_PRINT)."</pre><br/>";
	
	echo "<br/>Need to check if data is being recorded by PreoDay systems and then proceed to dashboard<br/>";
?>