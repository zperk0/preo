<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	$redirectFlag=0;
	
	//GET
	if(isset($_GET['id']))
	{
		$menuID = $_GET['id'];
		protect($menuID);
	}
	else
	{
		header("location:$_SESSION[path]/");
		exit;
	}
	
	if($_SESSION['signupWizFlag'])
	{
		$redirectFlag = 1;	
	}
	else
		$redirectFlag = 0;
		
		
	if(isset($_GET['r']))
	{
		$redirectFlag = $_GET['r'];
		protect($redirectFlag);	
	}
		
	//////MENU////////////////////////////////////////////////////////////////////////////
	
	//query to find menu sanity
	$curlResult = callAPI('GET', $apiURL."menus/$menuID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
		
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404) || empty($menuID)) 
	{	
		header("location:$_SESSION[path]/");
		exit;
	}
	else
	{	
		if($_SESSION['account_id'] != $dataJSON['accountId'])
		{
			header("location:$_SESSION[path]/");
			exit;
		}
	
		$outletID 			 	= $dataJSON['outletId'];
		$_SESSION['menu_id'] 	= $menuID;
		$_SESSION['outlet_id'] 	= $outletID;
		
		//now we need to populate all data pertaining to this menu
		$menu = $dataJSON;

		//Now lets simplify what we need

		//Get section count, item count & info on modifiers + options
		$itemCount = 0;
		$tempCounter = 0;
		$itemModOptArray = array();
		
		$sectionCount = count($menu['sections']);
		foreach($menu['sections'] as $section)
		{
			$itemCount += count($section['items']);
		
			foreach($section['items'] as $item)
			{
				$itemModOptArray[$tempCounter]['id'] = $item['id'];
				$itemModOptArray[$tempCounter]['modCount'] = count($item['modifiers']);
				$itemModOptArray[$tempCounter]['optCount'] = 0;
				
				foreach($item['modifiers'] as $modifiers)
				{
					$itemModOptArray[$tempCounter]['optCount'] += count($modifiers['items']);
				}
				
				$tempCounter++;
			}
		}
		
		$_SESSION['menu_edit_on']=1;
		
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/menuConfig.php');
	}
?>