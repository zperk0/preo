<?php //facebook variables
	$appId       = '514075612022129';
	$appSecret   = 'b03bcc985fede7b7e3cf7b46df7769c6';
	$redirect    = urlencode('http://'.$_SERVER['SERVER_NAME'].'/code/shared/facebook_signup.php');
	$scope       = 'user_about_me,email,publish_stream';
	
	
	
	$authCodeUrl  = "http://www.facebook.com/dialog/oauth?".
		"client_id="     . $appId . 
		"&redirect_uri=" . $redirect . 
		"&scope="        . $scope .
		"&state="   	 . $_SESSION['fb_state']; //state must be defined before outside this file
?>