<?php session_start();
	
	$tempLang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'en';
	$tempPath = $_SESSION['path'];
	
	$_SESSION['logged']= 0; //change logged state
	$_SESSION['token']= 0; //reset token
	
	$_SESSION=array(); //kill it
	
	session_destroy(); //destroy PHP session
	
	session_start();
	$_SESSION['lang'] = $tempLang; //we need to remember the lang even after logout
	
	header('location:'.$tempPath.'/'); //redirect to homepage
	
	exit;
?>