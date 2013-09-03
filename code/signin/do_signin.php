<?php session_start();

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); 
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php'); 
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php'); 
	
	$email = $_POST['email'];
	protect($email);
	
	$password = $_POST['password'];
	protect($password);
	
	$data['email']		= $email;
	$data['password']	= $password;
	
	$jsonData = json_encode($data);
	
	if(callAPI('GET', $apiURL."user", $jsonData, $apiAuth)) echo "Success!<br/>";
	else echo "Fail :( <br/>";
	
	echo "<br/>Need to check if data is sent by PreoDay systems and then proceed to dashboard<br/>";
	
?>