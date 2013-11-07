<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	//debug
	//echo "<br/><br/>";
	//echo $_SESSION['user_id']."<br/>";
	//echo $_SESSION['user_name']."<br/>";
	//echo $_SESSION['user_email']."<br/>";
	//echo $_SESSION['account_name']."<br/>";
	//echo $_SESSION['account_id']."<br/>";
	//echo $_SESSION['token']."<br/>";

	//We need flags to check whether certain information has been previously saved or not. This way we find out whether its a return user or a new user or even a new user who left halfway through.
	$_SESSION['noVenueFlag'] = 0; 
	$_SESSION['noAppFlag-1'] = 0;
	$_SESSION['noAppFlag-2'] = 0;
	$_SESSION['noMenuFlag'] = 0;
	$_SESSION['signupWizFlag']=0;
	$_SESSION['dashboardFlag']=0;
	
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];
	
	//////VENUE////////////////////////////////////////////////////////////////////////////
	
	//query to find venues
	$curlResult = callAPI('GET', $apiURL."venues?accountId=$accountID", false, $apiAuth);
	
	$dataJSON = json_decode($curlResult,true);
	
	if(empty($dataJSON)) 
		$_SESSION['noVenueFlag']=1; 
	else
	{	
		$_SESSION['venue_id'] 			= $dataJSON[0]['id'];
		$_SESSION['venue_name'] 		= $dataJSON[0]['name'];
		$_SESSION['venue_desc'] 		= $dataJSON[0]['description'];
		$_SESSION['venue_cat'] 			= $dataJSON[0]['categoryId'];
		$_SESSION['venue_address']  	= $dataJSON[0]['address'];	
		$_SESSION['venue_latitude']		= $dataJSON[0]['latitude'];	
		$_SESSION['venue_longitude']	= $dataJSON[0]['longitude'];	
		$_SESSION['venue_postcode']		= $dataJSON[0]['postcode'];	
		$_SESSION['venue_eventFlag']	= $dataJSON[0]['eventFlag'];	
		
		//we get venue id from _SESSION
		$venueID = $_SESSION['venue_id'];
	}

	if(isset($venueID)) //if there is no venue set then no App or Menu can be set anyway
	{
		//////APP////////////////////////////////////////////////////////////////////////////
		
		//query to find app-settings  
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/settings", false, $apiAuth);
		
		$dataJSON = json_decode($curlResult,true);
		
		if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
		{	
			$_SESSION['noAppFlag-1']=1; 
			$_SESSION['noAppFlag-2']=1; 
		}
		else
		{	
			//echo var_dump($dataJSON);
			//app-1
			$_SESSION['app_heading']			= $dataJSON['heading'];
			$_SESSION['app_subHeading']			= $dataJSON['subHeading'];
			$_SESSION['app_textColour']			= $dataJSON['textColour'];
			$_SESSION['app_buttonColour']		= $dataJSON['buttonColour'];
			$_SESSION['app_buttonTextColour']	= $dataJSON['buttonTextColour'];
			$_SESSION['app_wallpaperId']		= $dataJSON['wallpaperId'];
			$_SESSION['app_logo']				= $dataJSON['logo'];
			
			if(!isset($dataJSON['button2Colour']) || !isset($dataJSON['button2TextColour']) || !isset($dataJSON['button3Colour']) || !isset($dataJSON['button3TextColour']) || !isset($dataJSON['title']))
				$_SESSION['noAppFlag-2']=1;
			else
			{
				//app-2
				$_SESSION['app_button2Colour']		= $dataJSON['button2Colour'];
				$_SESSION['app_button2TextColour']	= $dataJSON['button2TextColour'];
				$_SESSION['app_button3Colour']		= $dataJSON['button3Colour'];
				$_SESSION['app_button3TextColour']	= $dataJSON['button3TextColour'];
				$_SESSION['app_title']				= $dataJSON['title'];
			}
		}
		
		//////MENU////////////////////////////////////////////////////////////////////////////
		
		//query to find menus for this venue  
		$curlResult = callAPI('GET', $apiURL."menus?accountId=$accountID", false, $apiAuth);
		
		$dataJSON = json_decode($curlResult,true);
		
		if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
		{	
			$_SESSION['noMenuFlag']=1; 
			
			//Let's get the outlet ID now
			$curlResult = callAPI('GET', $apiURL."outlets?accountId=$accountID", false, $apiAuth);
			$result = json_decode($curlResult, true);
			
			$_SESSION['outlet_id'] = $result[0]['id'];
		}
		else
		{
			$_SESSION['menus']	= $dataJSON;
			$_SESSION['outlet_id'] 	= $dataJSON[0]['outletId'];
		}
		///////////////////////////////////////////////////////////////////////////////////////// 
	}
	else
	{
		$_SESSION['noAppFlag-1']=1;
		$_SESSION['noAppFlag-2']=1;
		$_SESSION['noMenuFlag']=1;
	}
	
	//echo var_dump($_SESSION);
	
	if(!$_SESSION['noVenueFlag'] && !$_SESSION['noAppFlag-1'] && !$_SESSION['noAppFlag-2'] && !$_SESSION['noMenuFlag']) /*User has given data for all 4 already*/
	{	
		$_SESSION['dashboardFlag']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/dashboard_content.php"); 
	}
	else if($_SESSION['noVenueFlag']) /* User has not given all 4 so first check Venue */
	{	
		$_SESSION['signupWizFlag']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/venueConfig.php"); 
	}
	else if($_SESSION['noAppFlag-1']) /* User has not given all 4 so second check App-1 */
	{	
		$_SESSION['signupWizFlag']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/appConfig1.php");
	}
	else if($_SESSION['noAppFlag-2']) /* User has not given all 4 so third check App-2 */
	{	
		$_SESSION['signupWizFlag']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/appConfig2.php"); 
	}
	else if($_SESSION['noMenuFlag']) /* User has not given all 4 so fourth check Menu */
	{	
		$_SESSION['signupWizFlag']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/menuConfig.php"); 
	}
?>