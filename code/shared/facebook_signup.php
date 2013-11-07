<?php session_start();

	require('../../getPath.php'); //the only relative link we will have
	
	$fbCode="";
	$tokenUrl="";

	if(isset($_GET['error'])) //User declines facebook-connect request
	{
		header('location:'.$_SESSION['path'].'/signup.php');
	}
	else if((isset($_GET['code'])) && ($_REQUEST['state'] == $_SESSION['fb_state'])) //User accepts facebook-connect request & no CSRF attack
	{
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/facebook_vars.php'); //get our facebook vars
		
		$fbCode = $_GET['code']; //getting the authentication code 
		
		$tokenUrl = "https://graph.facebook.com/oauth/access_token?".
			"client_id=" . $appId . 
			"&redirect_uri=" . $redirect . 
			"&client_secret=" . $appSecret . 
			"&code=" . $fbCode; //creating a link to secure an access_token
		
		$params = array(); //initializing array
		
		parse_str(file_get_contents($tokenUrl), $params); //passing a string that was returned when $tokenUrl is invoked along with a pass-by-reference-array
		
		$fbAccessToken   = $params['access_token']; //acquiring access token
		
		$graph_url = "https://graph.facebook.com/me?access_token=".$fbAccessToken;

		$user = json_decode(file_get_contents($graph_url));
		
		$_SESSION['fb_fName']       = $user->first_name;     
		$_SESSION['fb_lName']       = $user->last_name;     
		$_SESSION['fb_email']       = $user->email;           
		$_SESSION['fb_uId']         = $user->id;
		$_SESSION['fb_gender']      = $user->gender;
		$_SESSION['fb_accessToken'] = $fbAccessToken;   
		$_SESSION['fb_flag']		= 1;
		
		header('location:'.$_SESSION['path'].'/signup.php');
		exit;
	}
	else
	{
		header('location:'.$_SESSION['path'].'/'); //Redirect back to homepage
		exit;
	}
?>