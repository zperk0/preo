<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	//We need flags to check whether certain information has been previously saved or not. This way we find out whether its a return user or a new user or even a new user who left halfway through.
	$_SESSION['noVenueFlag'] = 0; 
	$_SESSION['noAppFlag-1'] = 0;
	$_SESSION['noAppFlag-2'] = 0;
	$_SESSION['noMenuFlag'] = 0;
	$_SESSION['noEHFlag'] = 0;
	$_SESSION['noPaymentFlag'] = 0;
	$_SESSION['signupWizFlag']=0;
	$_SESSION['dashboardFlag']=0;
	
	//ROLE TEST
	if( !isset($_SESSION['user_role']) )
	{
		// Get the user role from the account
		// we use the user's token
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
		$newCurl = callAPI('GET', $apiURL."accounts/".$_SESSION['account_id'].'/users', false, $apiAuth); 
		$allUsers = json_decode($newCurl, true);

		// Get the logged in users role
		if( !empty($allUsers) && isset($allUsers['users']) ) 
		{
			$id = $_SESSION['user_id'];
			$role ='';
			
			foreach($allUsers['users'] as $accUser)
			{
				if($accUser['id'] == $id)
					$role = $accUser['role'];
			}
			$_SESSION['user_role']	= $role;
		}
	}

	if( !isset($_SESSION['user_role']) || ($_SESSION['user_role'] != 'OWNER' && $_SESSION['user_role'] != 'ADMIN') )
	{
		$_SESSION['privLogout'] = 1;
		header("location:".$_SESSION['path'].'/logout');
		exit;
	}
	
	
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
		$_SESSION['venue_id'] 				= $dataJSON[0]['id'];
		$_SESSION['venue_name'] 			= $dataJSON[0]['name'];
		if (isset($dataJSON[0]['permalink'])) {
			$_SESSION['venue_permalink'] 		= $dataJSON[0]['permalink'];
		}
		$_SESSION['venue_desc'] 			= $dataJSON[0]['description'];
		$_SESSION['venue_cat'] 				= $dataJSON[0]['categoryId'];
		$_SESSION['venue_address1']  		= $dataJSON[0]['address1'];	
		$_SESSION['venue_address2']  		= $dataJSON[0]['address2'];	
		$_SESSION['venue_address3']  		= $dataJSON[0]['address3'];			
		$_SESSION['venue_postcode']			= $dataJSON[0]['postcode'];	
		$_SESSION['venue_country']			= $dataJSON[0]['country'];	
		$_SESSION['venue_eventFlag']		= $dataJSON[0]['eventFlag'];	
		$_SESSION['venue_demoFlag']			= $dataJSON[0]['demoFlag'];	
		$_SESSION['venue_liveFlag']			= $dataJSON[0]['liveFlag'];	
		$_SESSION['venue_code']				= $dataJSON[0]['code'];	
		$_SESSION['venue_town']				= $dataJSON[0]['city'];	
		$_SESSION['venue_language']				= $dataJSON[0]['locale'];	
		$_SESSION['venue_timezone']				= $dataJSON[0]['timeZone'];	
		$_SESSION['venue_currency']				= $dataJSON[0]['ccy'];	
		$_SESSION['venue_ccySymbol']				= $dataJSON[0]['ccySymbol'];	
		
		
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
		else if(isset($dataJSON['textColour']) && !empty($dataJSON['textColour']))
		{	
			$_SESSION['venue_collectinterval']	= $dataJSON['collectInterval'];	
			$_SESSION['venue_leadtime']			= $dataJSON['leadTime'];	
			
			//app-1
			$_SESSION['app_heading']			= $dataJSON['heading'];
			$_SESSION['app_subHeading']			= $dataJSON['subHeading'];
			$_SESSION['app_textColour']			= $dataJSON['textColour'];
			$_SESSION['app_buttonColour']		= $dataJSON['buttonColour'];
			$_SESSION['app_buttonTextColour']	= $dataJSON['buttonTextColour'];
			$_SESSION['app_wallpaperId']		= $dataJSON['wallpaperId'];
			$_SESSION['app_logo']				= $dataJSON['logoId'];
			
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
		else
		{
			$_SESSION['venue_collectinterval']	= $dataJSON['collectInterval'];	
			$_SESSION['venue_leadtime']			= $dataJSON['leadTime'];

			$_SESSION['noAppFlag-1']=1; 
			$_SESSION['noAppFlag-2']=1;
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
	
	//////EH////////////////////////////////////////////////////////////////////////////
	if((isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']) && $venueID)
	{
		//eventBased check for event
		//query to find events
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/events", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);
		
		if( ( empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) && (!$_SESSION['venue_liveFlag'] && !$_SESSION['venue_demoFlag'])) 
		{	
			$_SESSION['noEHFlag']=1;
		}
	}
	else if((((isset($_SESSION['venue_eventFlag']) && !$_SESSION['venue_eventFlag']) || (!isset($_SESSION['venue_eventFlag']))) && (isset($venueID) && $venueID)) && (!$_SESSION['venue_liveFlag'] && !$_SESSION['venue_demoFlag']))
	{
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/hours", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);
				
		if( (empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) && (!$_SESSION['venue_liveFlag'] && !$_SESSION['venue_demoFlag'])) 
		{	
			$_SESSION['noEHFlag']=1;
		}
	}
	else if ( (!isset($_SESSION['venue_liveFlag']) || !$_SESSION['venue_liveFlag']) && ( !isset($_SESSION['venue_demoFlag']) || !$_SESSION['venue_demoFlag']))
		$_SESSION['noEHFlag'] = 1;
	
	if(!$_SESSION['noVenueFlag'] && !$_SESSION['noAppFlag-1'] && !$_SESSION['noAppFlag-2'] && !$_SESSION['noMenuFlag'] && !$_SESSION['noEHFlag']) /*User has given data for all 5 already*/
	{	
		//going to the dashboard!
		
		//+d($_SESSION);
		
		//get mode
		$currentMode = "";
		if($_SESSION['venue_demoFlag'] && $_SESSION['venue_liveFlag'])
			$currentMode = "DEMO";
		else if($_SESSION['venue_liveFlag'] && !$_SESSION['venue_demoFlag'])
			$currentMode = "LIVE";
		else if(!$_SESSION['venue_liveFlag']&& !$_SESSION['venue_demoFlag'])
			$currentMode = "OFFLINE";
		
		//lets get some quick reports
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/reports", false, $apiAuth);
		$dataResult = json_decode($curlResult, true);
		$_SESSION['venue_report_totalOrders'] 		= $dataResult['totalOrders'];
		$_SESSION['venue_report_totalRevenue'] 		= $dataResult['totalRevenue'];
		$_SESSION['venue_report_newUsers'] 			= $dataResult['newUsers'];
		$_SESSION['venue_report_returningUsers'] 	= $dataResult['returningUsers'];
		//+d($dataResult);
	

		$newCurl = callAPI('GET', $apiURL."accounts/".$_SESSION['account_id'].'/users', false, $apiAuth); 
		$_SESSION['dashboardFlag']=1;
		$_SESSION['signupWizFlag']=0;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/wl-paths.php');   //wallpaper-logo paths
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/dashboard_content.php"); 			
	}
	else if($_SESSION['noVenueFlag']) /* User has not given all 5 so first check Venue */
	{	
		$_SESSION['signupWizFlag']=1;
		$redirectFlag=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/venueConfig.php"); 
	}
	else if($_SESSION['noAppFlag-1']) /* User has not given all 5 so second check App-1 */
	{	
		$_SESSION['signupWizFlag']=1;
		$redirectFlag=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/wl-paths.php');   //wallpaper-logo paths
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/appConfig1.php");
	}
	else if($_SESSION['noAppFlag-2']) /* User has not given all 5 so third check App-2 */
 	{	
 		$_SESSION['signupWizFlag']=1;
		$redirectFlag=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
 		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
 		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/appConfig2.php"); 
 	}
	else if($_SESSION['noMenuFlag']) /* User has not given all 5 so fourth check Menu */
	{	
		$_SESSION['signupWizFlag']=1;
		$redirectFlag=1;
		
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/dashboard/menuConfig.php"); 
	}
	else if($_SESSION['noEHFlag']) /* User has not given all 5 so fifth check EH */
	{	
		$_SESSION['signupWizFlag']=1;
		if(!$_SESSION['venue_eventFlag']) 
		{
			header("location:".$_SESSION['path'].'/openinghours');
			exit;
		}
		else
		{
			header("location:".$_SESSION['path'].'/events');
			exit;
		}
	}


	//FIXME these methods below are duplicated in venue_logic. Not sure what's the best way to share them.
	function currency_list(){
		$currencies = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/js/data/common-currency.json'), true);		 		
		return $currencies;
	}
?>