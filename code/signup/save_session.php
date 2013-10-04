<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	
	$email = $_POST['email'];
	protect($email);
	
	$id = $_POST['id'];
	protect($id);
	
	$name = $_POST['name'];
	protect($name);
	
	$bName = $_POST['bName'];
	protect($bName);
	
	$bID = $_POST['bID'];
	protect($bID);
	
	$_SESSION['account_name']=$bName;
	$_SESSION['account_id']=$bID;
	
	$_SESSION['user_id']	= $id;
	$_SESSION['user_email']	= $email;
	$_SESSION['user_name']	= $name;
	$_SESSION['user_lName']	= substr($name, strrpos($name, ' ')+1);
	$_SESSION['user_fName']	= str_replace(" ".$_SESSION['user_lName'],"",$_SESSION['user_name']);
	$_SESSION['logged']		= 1;
?>