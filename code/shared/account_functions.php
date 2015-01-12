<?php 
	function getVenues( $adminId ){
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens		
		$curlResult = callAPI('GET', $GLOBALS['apiURL']."venues?adminId=" . $adminId, false, $apiAuth);
		return json_decode($curlResult,true);
	}

	function loggedVenue( $venueId ){
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
		//query to find venues
		$curlResult = callAPI('GET', $GLOBALS['apiURL']."venues/" . $venueId, false, $apiAuth);
		
		$dataJSON = json_decode($curlResult,true);

		//query to find venues
		$curlResultAccount = callAPI('GET', $GLOBALS['apiURL']."accounts/" . $dataJSON['accountId'], false, $apiAuth);
		
		$dataJSONAccount = json_decode($curlResultAccount,true);
		
		if(empty($dataJSON)) 
			$_SESSION['noVenueFlag']=1; 
		else
		{	
			$_SESSION['noVenueFlag']=0; 
			$_SESSION['account_id'] 			= $dataJSON['accountId'];
			$_SESSION['account_name'] 			= $dataJSONAccount['name'];			
			$_SESSION['venue_id'] 				= $dataJSON['id'];
			$_SESSION['venue_name'] 			= $dataJSON['name'];
			if (isset($dataJSON['permalink'])) {
				$_SESSION['venue_permalink'] = $dataJSON['permalink'];
			}
			$_SESSION['venue_desc'] 			= $dataJSON['description'];
			$_SESSION['venue_cat'] 				= $dataJSON['categoryId'];
			$_SESSION['venue_address1']  		= $dataJSON['address1'];	
			$_SESSION['venue_address2']  		= $dataJSON['address2'];	
			$_SESSION['venue_address3']  		= $dataJSON['address3'];			
			$_SESSION['venue_postcode']			= $dataJSON['postcode'];	
			$_SESSION['venue_country']			= $dataJSON['country'];	
			$_SESSION['venue_eventFlag']		= $dataJSON['eventFlag'];	
			$_SESSION['venue_demoFlag']			= $dataJSON['demoFlag'];	
			$_SESSION['venue_liveFlag']			= $dataJSON['liveFlag'];	
			$_SESSION['venue_code']				= $dataJSON['code'];	
			$_SESSION['venue_town']				= $dataJSON['city'];	
			$_SESSION['venue_language']				= $dataJSON['locale'];	
			$_SESSION['venue_timezone']				= $dataJSON['timeZone'];	
			$_SESSION['venue_currency']				= $dataJSON['ccy'];	
			$_SESSION['venue_ccySymbol']				= $dataJSON['ccySymbol'];	
			
			
			//we get venue id from _SESSION
			$venueID = $_SESSION['venue_id'];
			$accountID = $_SESSION['account_id'];
		}	
		if(isset($venueID)) //if there is no venue set then no App or Menu can be set anyway
		{
			//////APP////////////////////////////////////////////////////////////////////////////
			
			//query to find app-settings  
			$curlResult = callAPI('GET', $GLOBALS['apiURL']."venues/$venueID/settings", false, $apiAuth);
			
			$dataJSON = json_decode($curlResult,true);
			
			if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
			{	
				$_SESSION['noAppFlag-1']=1; 
				$_SESSION['noAppFlag-2']=1; 
			}
			else if(isset($dataJSON['textColour']) && !empty($dataJSON['textColour']))
			{	
				$_SESSION['noAppFlag-1']=0; 
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
					$_SESSION['noAppFlag-2']=0; 
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
			$curlResult = callAPI('GET', $GLOBALS['apiURL']."menus?accountId=$accountID", false, $apiAuth);
			
			$dataJSON = json_decode($curlResult,true);
			
			if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
			{	
				$_SESSION['noMenuFlag']=1; 
				
				//Let's get the outlet ID now
				$curlResult = callAPI('GET', $GLOBALS['apiURL']."outlets?accountId=$accountID", false, $apiAuth);
				$result = json_decode($curlResult, true);
				
				$_SESSION['outlet_id'] = $result[0]['id'];
			}
			else
			{
				$_SESSION['noMenuFlag']=0; 
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

		return $curlResult = '[{"status" : 200}]';		
	}
?>