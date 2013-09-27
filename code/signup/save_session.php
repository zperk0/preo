<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	
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
	
	$_SESSION['id']=$id;
	$_SESSION['email']=$email;
	$_SESSION['name']=$name;
	$_SESSION['lName']=substr($name, strrpos($name, ' ')+1);
	$_SESSION['fName']=str_replace(" ".$_SESSION['lName'],"",$name);
	$_SESSION['bName']=$bName;
	$_SESSION['bID']=$bID;
	$_SESSION['logged']=1;
?>