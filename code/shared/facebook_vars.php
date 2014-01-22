<?php //facebook variables
	$appId       = '1433047090264597';
	$appSecret   = '4f064e33db83c49c3030706782639c9a';
	$redirect    = urlencode('http://'.$_SERVER['SERVER_NAME'].'/code/shared/facebook_signup.php');
	$scope       = 'user_about_me,email';
	
	
	
	$authCodeUrl  = "http://www.facebook.com/dialog/oauth?".
		"client_id="     . $appId . 
		"&redirect_uri=" . $redirect . 
		"&scope="        . $scope .
		"&state="   	 . $_SESSION['fb_state']; //state must be defined before outside this file
?>