<?php
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	/* Requesting Facebook Fields */

	if(!(isset($_SESSION['fb_state']))) $_SESSION['fb_state'] = md5(uniqid(rand(), TRUE)); //NEED FOR CSRF PROTECTION VIA FACEBOOK CONNECT
	
	require_once($_SERVER['DOCUMENT_ROOT'].'/code/shared/facebook_vars.php'); 

	$fb_field_flag = 0;
	
	if(isset($_SESSION['fb_flag']) && $_SESSION['fb_flag']) {
		$fName    = $_SESSION['fb_fName'];
		$lName    = $_SESSION['fb_lName'];
		$email    = $_SESSION['fb_email'];
		$fbId     = $_SESSION['fb_uId'];
		$fbToken  = $_SESSION['fb_accessToken'];
	 
		//Setting flags for FB-Connect TRUE
		$fb_field_flag = 1; 	
	}
	////////////////////////////////////
	
	//CHECK IF FB-USER IS ALREADY A MEMBER
	if($fb_field_flag && isset($fbId))
	{
		//Checking to see if User already exists.
		$curlResult = callAPI('GET', $apiURL."users/$fbId/fb", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);
		
		if(isset($dataJSON['id']) && $dataJSON['id']) //User Exists
		{
			$userID = $dataJSON['id'];
			//sign user in
			$curlResult = callAPI('POST', $apiURL."users/$userID/fbauth", false, $apiAuth);
			$dataJSON2 = json_decode($curlResult,true);
		
			if(isset($dataJSON2['token']))
			{ 
				$_SESSION['token']=$dataJSON2['token'];
				header("location:dashboard.php"); //if user already exists perform an auto-login
				exit();
			}
		}

	}
	//////////////////////////////////////
	
	function randomPassword() {
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}

?>