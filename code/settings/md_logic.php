<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	//search 2d array - bespoke
	function array_searcher($needle, $array2d) 
	{ 
		foreach($array2d as $array)
		{ 
			foreach($array as $key => $value) 
			{
				if ($value == $needle) 
				{ 
					return $key; 
				} 
			}
		}
	}  
	/////////////////////////////////////////////////////
	
	$_SESSION['noItemsFlag']=0;
	$mdCount=0;
	
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////Items////////////////////////////////////////////////////////////////////////////
	$mdMenuID='';
	//query to find all items for mealdeals
	$curlResult = callAPI('GET', $apiURL."items/?venueId=$venueID", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		$_SESSION['noItemsFlag']=1;
	}
	else
	{	
		//get sections
		//query to find menus for this venue  
		$accID = $_SESSION['account_id'];
		$mdCurlResult = callAPI('GET', $apiURL."menus?accountId=$accID&type=MENU", false, $apiAuth);
		$mdDataJSON = json_decode($mdCurlResult,true);
		$mdSections = array();
		$itemSectionArray = array();
		if(!empty($mdDataJSON) && (!isset($mdDataJSON['status'])))
		{
			$mdMenuID = $mdDataJSON[0]['id'];
			$_SESSION['mdMenuID'] = $mdMenuID;
			//query to find menu 
			$mdMenuCurlResult = callAPI('GET', $apiURL."menus/$mdMenuID", false, $apiAuth);
			$mdMenuDataJSON = json_decode($mdMenuCurlResult,true);
			
			$mdSections = $mdMenuDataJSON['sections'];
			foreach($mdSections as $s)
			{
				foreach($s['items'] as $it)
				{
					//just getting menu-section => itemid relationship!
					$itemSectionArray[][$s['id']] = $it['id'];
				}
			}
		}

		////////////////MealDeals//////////////////////////////////////////////////////////////////
		
		//query to find all mealdeals
		$curlResult = callAPI('GET', $apiURL."items?menuId=$mdMenuID", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);

		if(!(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)))
		{	
			$_SESSION['md_edit_on']=1;
			$md = array();
			$mdCount = 0;
			$mdSecCount = 0;
			$mdItemCount = 0;
			
			foreach($dataJSON as $menuItem)
			{
				if($menuItem['mealDeal'])
				{
					$miID = $md[$mdCount]['id'] = $menuItem['id'];
					$md[$mdCount]['name'] = $menuItem['name'];
					$md[$mdCount]['sectionID'] = $menuItem['sectionId'];
					$md[$mdCount]['price'] = $menuItem['price'];
					$md[$mdCount]['visible'] = $menuItem['visible'];
					
					//get mealdeal sections
					$curlResultMD = callAPI('GET', $apiURL."items/$miID/mealdealsections", false, $apiAuth);
					$dataJSONMD = json_decode($curlResultMD,true);
					
					foreach($dataJSONMD as $mdsection)
					{
						$msID = $md[$mdCount]['sections'][$mdSecCount]['id'] = $mdsection['id'];
						$md[$mdCount]['sections'][$mdSecCount]['name'] = $mdsection['name'];
						
						//get mealdeal sections
						$curlResultMDS = callAPI('GET', $apiURL."mealdealsections/$msID/items", false, $apiAuth);
						$dataJSONMDS = json_decode($curlResultMDS,true);
						
						foreach($dataJSONMDS as $mdsectionitem)
						{
							$md[$mdCount]['sections'][$mdSecCount]['items'][$mdItemCount] = $mdsectionitem['itemId'];						
							$mdItemCount++;
						}
						$mdItemCount = 0;
						
						$mdSecCount++;
					}
					$mdSecCount = 0;
					$mdCount++;
				}
			}
		}
	}
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/mdConfig.php');
?>