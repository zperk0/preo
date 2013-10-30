<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$menuID = $_POST['menuID'];
	protect($menuID);
	
	$menu = array();
	$menu = $_SESSION['menu_old'];
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

	foreach($menu['sections'] as $section)
	{
		$sectionID = $section['id'];
		
		foreach($section['items'] as $item)
		{
			$itemID = $item['id'];
			
			foreach($item['modifiers'] as $modifier)
			{
				$modifierID = $modifier['id'];
				
				foreach($modifier['items'] as $option)
				{
					$optionID = $option['id'];
					
					//kill all options
					$curlResult = callAPI('DELETE', $apiURL."modifieritems/$optionID", false, $apiAuth); //section and section items deleted
				}
				
				//kill all modifiers
				$curlResult = callAPI('DELETE', $apiURL."modifiers/$modifierID", false, $apiAuth); //section and section items deleted
			}
			
			//kill all items
			$curlResult = callAPI('DELETE', $apiURL."items/$itemID", false, $apiAuth); //section and section items deleted
		}
		
		//kill all sections and section-items
		$curlResult = callAPI('DELETE', $apiURL."sections/$sectionID", false, $apiAuth); //section and section items deleted
	}
	
	//kill menu
	$curlResult = callAPI('DELETE', $apiURL."menus/$menuID", false, $apiAuth); //menu deleted
	
	//at this stage all menu data is deleted
?>