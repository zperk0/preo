<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	$mdCount = $_POST['mdCount']; //linear count -md
	protect($mdCount);
	
	$mdCountAct = $_POST['mdCountAct']; //actual count -md
	protect($mdCountAct);
	
	$md = array(); //initialising menu 
	
	//remember everything is 1-indexed. 0 is dummy data
	$i = $j = 1;
	while($i <= $mdCountAct && $j <= $mdCount) //$i should break it faster unless linear == actual  -- creating new menu here
	{
		if(isset($_POST['mdName'][$j]) && $_POST['mdName'][$j])
		{
			$md[$i]['id'] 		= /*protect(*/$_POST['mdID'][$j];//);
			$md[$i]['name'] 	= /*protect(*/$_POST['mdName'][$j];//);
			$md[$i]['price'] 	= /*protect(*/$_POST['mdPrice'][$j];//);
			$md[$i]['visible']	= /*protect(*/$_POST['mdVisi'][$j];//);	
			$md[$i]['items']	= array_filter( explode(";", $_POST['mdItems'][$j]), 'strlen' ); //no emptys
			$i++;
		}
		$j++;
	}
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = '';
	
	foreach($md as $mdKey => $mealDeal)
	{
		if(isset($_SESSION['md_edit_on']) && $_SESSION['md_edit_on'] && (preg_match('/^\d+$/',$mealDeal['id']))) //We delete the old meal deals and create a new ones!
		{		
			$mdID = $mealDeal['id'];

			//kill all mdparts
			$curlResult = callAPI('DELETE', $apiURL."menus/mealdeal/items/$mdID", false, $apiAuth); //md parts deleted
				
		} //at this stage all current data is deleted and now we will proceed to putting in new data
		
		
		//create/update md
		$data 				= array();
		$data['name'] 		= $mealDeal['name'];
		$data['price'] 		= $mealDeal['price'];
		$data['visible'] 	= $mealDeal['visible'];
		$data['venueId'] 	= $_SESSION['venue_id'];
		$data['position'] 	= $mdKey;
				
		$jsonData = json_encode($data);
		
		if(isset($_SESSION['md_edit_on']) && $_SESSION['md_edit_on'] && (preg_match('/^\d+$/',$mealDeal['id']))) //Edit
		{	
			$mdID = $mealDeal['id'];
			
			$curlResult = callAPI('PUT', $apiURL."menus/mealdeal/$mdID", $jsonData, $apiAuth); //md updated
			$result = json_decode($curlResult,true);
		}
		else //Create
		{
			$curlResult = callAPI('POST', $apiURL."menus/mealdeal", $jsonData, $apiAuth); //md created
			$result = json_decode($curlResult,true);
				
			$mdID = $result['id'];
		}
		
		//now we create mealDeal parts
		foreach($mealDeal['items'] as $iKey => $itemID)
		{
			//create section
			$data 					= array();
			$data['itemId'] 		= $itemID;
			$data['mealdealId'] 	= $mdID;
					
			$jsonData = json_encode($data);
			$curlResult = callAPI('POST', $apiURL."menus/mealdeal/item", $jsonData, $apiAuth); //menu created
			
			$result = json_decode($curlResult,true);
		}
	}
	
	echo $curlResult; //sending a JSON via ajax 
?>