<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

	$token = $_POST['token'];
	protect($token);
	
	$gpid = $_POST['gpid'];
	protect($gpid);
	
	//check if user already exists - if so try login - else signup
	$curlResult = callAPI('GET', $apiURL."users/auth/gp/$gpid", false, $apiAuth);
	
	$jsonResult = json_decode($curlResult, true);
	
	if(isset($jsonResult['gpid']) && $gpid == $jsonResult['gpid'])
	{
		//do login
		$curlResult = callAPI('POST', $apiURL."users/auth/gp/$token", false, $apiAuth);
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
			
			$dataArray['signupFlag'] = "0";
		}
		else
			$dataArray['signupFlag'] = "1";
	}
	else
		$dataArray['signupFlag'] = "1";
		
		
	echo json_encode($dataArray);
?>