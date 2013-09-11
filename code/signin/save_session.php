<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay

	$token = $_POST['token'];
	protect($token);
	
	$email = $_POST['email'];
	protect($email);
	
	$id = $_POST['id'];
	protect($id);
	
	$name = $_POST['name'];
	protect($name);
	
//	$bName = $_POST['bName']; NOT RECEIVED!
//	protect($bName);
	
	$_SESSION['token']=$token;
	$_SESSION['id']=$id;
	$_SESSION['email']=$email;
	$_SESSION['name']=$name;
	//$_SESSION['bName']=$bName;
	$_SESSION['logged']=1;
?>