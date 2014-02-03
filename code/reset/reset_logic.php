<?php

	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI_Header.php');   //API calling function
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); 
	
	if(isset($_GET['code']))
	{
		$code = $_GET['code'];
		protect($code);
		
		$curlResult = callAPI_Header('GET', $apiURL."users/auth/change/$code", false, $apiAuth);
		if(preg_match('/^4.*$/',$curlResult))
		{  
			$continueFlag = 0;
		}
		else
		{  
			$continueFlag = 1;
		}
	}
	else
	{
		$continueFlag = 0;
	}
?>