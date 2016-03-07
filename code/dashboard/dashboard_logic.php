<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');

	//We need flags to check whether certain information has been previously saved or not. This way we find out whether its a return user or a new user or even a new user who left halfway through.
	$_SESSION['noEHFlag'] = 0;
	$_SESSION['noPaymentFlag'] = 0;
	$_SESSION['signupWizFlag']=0;
	$_SESSION['dashboardFlag']=0;

	//ROLE TEST
	if( !isset($_SESSION['user_role']) && isset($_SESSION['account_id']) )
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
			$result = getCurrentlyUserRole();
		  if ( isset($result['status']) && $result['status'] == 403 ) {
			// $_SESSION['privLogout'] = 1;
			header("location:".$_SESSION['path'].'/staff');
			exit;
		  }

		  header("location:".$_SESSION['path'].'/switch'); exit();
	}


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens

	$venueID = isset($_SESSION['venue_id']) ? $_SESSION['venue_id'] : 0;

	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];

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
	else if((((isset($_SESSION['venue_eventFlag']) && !$_SESSION['venue_eventFlag']) || (!isset($_SESSION['venue_eventFlag']))) && (isset($venueID) && $venueID)) && ((!isset($_SESSION['venue_liveFlag']) || !$_SESSION['venue_liveFlag']) && (!isset($_SESSION['venue_demoFlag']) || !$_SESSION['venue_demoFlag'])))
	{
		$curlResult = callAPI('GET', $apiURL."venues/$venueID/hours", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);

		if( (empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) && ((!isset($_SESSION['venue_liveFlag']) || !$_SESSION['venue_liveFlag']) && (!isset($_SESSION['venue_demoFlag']) || !$_SESSION['venue_demoFlag'])))
		{
			$_SESSION['noEHFlag']=1;
		}
	}
	else if ( (!isset($_SESSION['venue_liveFlag']) || !$_SESSION['venue_liveFlag']) && ( !isset($_SESSION['venue_demoFlag']) || !$_SESSION['venue_demoFlag']))
		$_SESSION['noEHFlag'] = 1;

	if((!isset($_SESSION['noVenueFlag']) || !$_SESSION['noVenueFlag']) && (!isset($_SESSION['noAppFlag-1']) || !$_SESSION['noAppFlag-1']) && (!isset($_SESSION['noAppFlag-2']) || !$_SESSION['noAppFlag-2']) && (!isset($_SESSION['noMenuFlag']) || !$_SESSION['noMenuFlag']) && (!isset($_SESSION['noEHFlag']) || !$_SESSION['noEHFlag'])) /*User has given data for all 5 already*/
	{

		if (!isset($_SESSION['venue_code']) && $venueID > 0) {
			loggedVenue($venueID);
		}
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


		// FIXME: This is a hack to get login redirect to work because everything assumes
		// That the dashboard is loaded on every login. This should be removed once the redirect
		// is setup correctly
		if (isset($_SESSION['REDIRECT_AFTER_LOGIN']) && $_SESSION['REDIRECT_AFTER_LOGIN']) {
			$redirect = $_SESSION['REDIRECT_AFTER_LOGIN'];
			unset($_SESSION['REDIRECT_AFTER_LOGIN']);
			header("location: " . $redirect);
			exit();
		}





		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/wl-paths.php');   //wallpaper-logo paths
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
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/wl-paths.php');   //wallpaper-logo paths
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