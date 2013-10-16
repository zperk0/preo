<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////MENU////////////////////////////////////////////////////////////////////////////
	
	//query to find menu
	$curlResult = callAPI('GET', $apiURL."menus?venueId=$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
		
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		header('location:/');
	}
	else
	{	
		$menuID 	= $_SESSION['menu_id']		= $dataJSON[0]['id'];
		$outletID 	= $_SESSION['outlet_id'] 	= $dataJSON[0]['outletId'];
		
		//now we need to populate all data pertaining to this menu
		$curlResult = callAPI('GET', $apiURL."menus/$menuID", false, $apiAuth);
		$menu = json_decode($curlResult,true);
		
		//Now lets simplify what we need
		
		//Get section count
		$sectionCount = count($menu['sections']);
		
		//Get item count and option count
		$itemCount = 0;
		$itemOptionArray = array();
		foreach($menu['sections'] as $section)
		{
			$itemCount += count($section['items']);
			
			foreach($section['items'] as $key=>$item)
				$itemOptionArray[]['count'] = count($item['modifiers'][0]['items']);
		}
		
		//+d($menu);
		
		$_SESSION['menu_old'] = $menu;
	
		$_SESSION['menu_edit_on']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/menuConfig.php');
	}
?>