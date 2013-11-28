<?php session_start();

	require('../../getPath.php'); //the only relative link we will have
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
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
		
		$token = $_SESSION['fb_accessToken'];
		$fbid = $_SESSION['fb_uId'];

		//check if user already exists - if so try login - else signup
		$curlResult = callAPI('GET', $apiURL."users/auth/fb/$fbid", false, $apiAuth);
		
		$jsonResult = json_decode($curlResult, true);
		
		if(isset($jsonResult['fbid']) && $fbid == $jsonResult['fbid'])
		{
			//do login
			$curlResult = callAPI('POST', $apiURL."users/auth/fb/$token", false, $apiAuth);
			$dataJSON = json_decode($curlResult,true);
			if(isset($dataJSON['token']))
			{			
				$_SESSION['token']=$dataJSON['token'];
				
				$email 	= $dataJSON['email'];
				$id 	= $dataJSON['id'];
				$fName 	= $dataJSON['firstName'];
				$lName 	= $dataJSON['lastName'];
				
				//we use the user's token to get accounts stuff
				$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
				$curlResult = callAPI('GET', $apiURL."accounts", false, $apiAuth); 
				
				try
				{
					$dataArray = json_decode($curlResult, true); //parsing JSON
				
				}
				catch(Exception $e)
				{
					echo "Could not process json payload";
					header('HTTP', true, 400); // 400 bad request
					exit(1);
				}
				
				if(!empty($dataArray['status'])) //error
				{
					echo $dataArray['message'];
					header('HTTP', true, 400); // 400 bad request
					exit(1);
				
				}
				else
				{	
					$_SESSION['account_name']	= $dataArray[0]['name'];
					$_SESSION['account_id']		= $dataArray[0]['id'];
				}
				
				$_SESSION['user_id']	= $id;
				$_SESSION['user_email']	= $email;
				$_SESSION['user_fName']	= $fName;
				$_SESSION['user_lName']	= $lName;
				$_SESSION['logged']		= 1;
				
				header('location:'.$_SESSION['path'].'/dashboard.php');
			}
			else
			{
				header('location:'.$_SESSION['path'].'/signup.php');
				exit;
			}
		}
		else
		{
			header('location:'.$_SESSION['path'].'/signup.php');
			exit;
		}
	}
	else
	{
		header('location:'.$_SESSION['path'].'/'); //Redirect back to homepage
		exit;
	}
?>