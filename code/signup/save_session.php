<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	
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
	
	$_SESSION['account_name']=$bName;
	$_SESSION['account_id']=$bID;
	
	$_SESSION['user_id']	= $id;
	$_SESSION['user_email']	= $email;
	$_SESSION['user_fName']	= $fName;
	$_SESSION['user_lName']	= $lName;
	$_SESSION['logged']		= 1;
?>