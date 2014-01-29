<?php session_start();
	
	$tempLang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'en';
	$tempPath = $_SESSION['path'];
	
	$_SESSION['logged']= 0; //change logged state
	$_SESSION['token']= 0; //reset token
	
	$privLogout = 0;
	
	if( isset($_SESSION['privLogout']) && $_SESSION['privLogout']) $privLogout = 1;
	
	$_SESSION=array(); //kill it
	
	session_destroy(); //destroy PHP session
	
	session_start();
	$_SESSION['lang'] = $tempLang; //we need to remember the lang even after logout
	
	$_SESSION['privLogout'] = $privLogout; //remeber if user got kicked out due to privilege issue
	
	header('location:'.$tempPath.'/'); //redirect to homepage
	
	exit;
?>