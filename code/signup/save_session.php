<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/signup/signup_functions.php'); 
	
	$email = $_POST['email'];
	protect($email);
	
	$id = $_POST['id'];
	protect($id);
	
	$fName = $_POST['fName'];
	protect($fName);
	
	$lName = $_POST['lName'];
	protect($lName);
	
	$bName = $_POST['bName'];
	protect($bName);
	
	$bID = $_POST['bID'];
	protect($bID);

	setUserLogger([
		'account' => [
			'name' 		=> $bName,
			'id'   		=> $bID
		],
		'user' => [
			'id'		=> $id,
			'email' 	=> $email,
			'firstName' => $fName,
			'lastName'	=> $lName,
			'role' 		=> 'OWNER'
		]
	]);	
?>