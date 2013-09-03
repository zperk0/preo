<?php session_start();

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); 
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php'); 
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php'); 
	
	$fName = $_POST['fName'];
	protect($fName);
	
	$lName = $_POST['lName'];
	protect($lName);
	
	$name = $fName." ".$lName;
	
	$email = $_POST['email'];
	protect($email);
	
	$password = $_POST['password'];
	protect($password);
	
	$notificationFlag = $_POST['notification-switch'];
	protect($notificationFlag);  //currently we dont store this!
	
	$data['name']		= $name;
	$data['email']		= $email;
	$data['password'] 	= $password;
	
	$jsonData = json_encode($data);
	
	if(callAPI('POST', $apiURL."user", $jsonData, $apiAuth)) echo "Success!<br/>";
	else echo "Fail :( <br/>";
	
	echo "<br/>Need to check if data is being recorded by PreoDay systems and then proceed to dashboard<br/>";
	
?>