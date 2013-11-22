<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//GET
	$menuID = $_GET['id'];
	protect($menuID);

	//////MENU////////////////////////////////////////////////////////////////////////////
	
	//query to find menu sanity
	$curlResult = callAPI('GET', $apiURL."menus/$menuID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
		
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404) || empty($menuID)) 
	{	
		header("location:$_SESSION[path]/");
	}
	else
	{	
		$outletID 			 	= $dataJSON['outletId'];
		$_SESSION['menu_id'] 	= $menuID;
		$_SESSION['outlet_id'] 	= $outletID;
		
		//now we need to populate all data pertaining to this menu
		$menu = $dataJSON;

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
			{
				if(isset($item['modifiers'][0]['items']))
				{
					$itemOptionArray[]['count'] = count($item['modifiers'][0]['items']);
				}
				else
				{
					$itemOptionArray[]['count'] = 0;
				}
			}
		}
		
		//+d($menu);
	
		$_SESSION['menu_edit_on']=1;
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/menuConfig.php');
	}
?>