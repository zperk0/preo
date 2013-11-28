<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$fName = $_POST['fName'];
	protect($fName);
	
	$lName = $_POST['lName'];
	protect($lName);
	
	$email = $_POST['email'];
	protect($email);
	
	$password = $_POST['password'];
	protect($password);
	
	$businessName = $_POST['businessName'];
	protect($businessName);
	
	$fbid = $_POST['fbid'];
	protect($fbid);
	
	$gpid = $_POST['gpid'];
	protect($gpid);
	
	//$notificationFlag = $_POST['notification-switch']; //0=off, 1=on
	//protect($notificationFlag);  //currently we dont store this!
	
	$data['name']				= $businessName;
	$data['owner']['firstName']	= $fName;
	$data['owner']['lastName']	= $lName;
	$data['owner']['username']	= $email;
	$data['owner']['email']		= $email;
	$data['owner']['password'] 	= $password;
	$data['owner']['fbid'] 		= $fbid;
	$data['owner']['gpid'] 		= $gpid;
	
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('POST', $apiURL."accounts", $jsonData, $apiAuth);
	
	$dataJSON = json_decode($curlResult,true);
	
	if(isset($dataJSON['owner']['token'])) $_SESSION['token']=$dataJSON['owner']['token']; //otherwise its an error! 
	
	echo $curlResult; //sending a JSON via ajax
	
	//DEBUG
	//$decodedCurl = json_decode($curlResult,true);
	//if($curlResult) echo "Success!"; 
	//else echo "Fail :(";
	//echo "<br/><br/><pre>".json_encode(json_decode($curlResult), JSON_PRETTY_PRINT)."</pre><br/>";
	//echo "<br/>Need to check if data is being recorded by PreoDay systems and then proceed to dashboard<br/>";
?>