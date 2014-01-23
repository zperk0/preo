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
			$md[$i]['id'] 			= /*protect(*/$_POST['mdID'][$j];//);
			$md[$i]['name'] 		= /*protect(*/$_POST['mdName'][$j];//);
			$md[$i]['price'] 		= /*protect(*/$_POST['mdPrice'][$j];//);
			$md[$i]['sectionID']	= /*protect(*/$_POST['mdSecID'][$j];//);	
			$md[$i]['visible']		= /*protect(*/$_POST['mdVisi'][$j];//);	
			
			$a = $b = 1;
			while($a <= $_POST['md'.$j.'_secCountAct'] && $b <= $_POST['md'.$j.'_secCount']) 
			{
				if((isset($_POST['iMD'][$j]['s'.$b]) && $_POST['iMD'][$j]['s'.$b]))
				{
					$md[$i]['sections'][$a]['name'] = /*protect(*/$_POST['iMD'][$j]['s'.$b];//);
					$md[$i]['sections'][$a]['items'] = array_filter( explode(";", $_POST['mdItems'][$j]['s'.$b]), 'strlen' ); //no emptys
					
					$a++;
				}
				$b++;
			}
			$i++;
		}
		$j++;
	}
	
	//debug
	//echo var_export($md);
	//exit;
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = '';
	$newMDs = array();
	
	foreach($md as $mdKey => $mealDeal)
	{
		if( (preg_match('/^\d+$/',$mealDeal['id'])) ) //We delete the old meal deals and create a new ones!
		{		
			$mdID = $mealDeal['id'];
			
			//get mealdeal sections
			$curlResultMD = callAPI('GET', $apiURL."items/$mdID/mealdealsections", false, $apiAuth);
			$dataJSONMD = json_decode($curlResultMD,true);
			
			foreach($dataJSONMD as $mdsection)
			{
				$msID  = $mdsection['id'];
				
				//get mealdeal items
				$curlResultMDS = callAPI('GET', $apiURL."mealdealsections/$msID/items", false, $apiAuth);
				$dataJSONMDS = json_decode($curlResultMDS,true);
				
				foreach($dataJSONMDS as $mdsectionitem)
				{
					$mdSecItemID = $mdsectionitem['id'];	
					$curlDelete = callAPI('DELETE', $apiURL."mealdealitems/$mdSecItemID", false, $apiAuth);
				}
				
				$curlDelete = callAPI('DELETE', $apiURL."mealdealsections/$msID", false, $apiAuth);
			}	
		} //at this stage all current data is deleted and now we will proceed to putting in new data but retaining the old id
		
		
		//create/update md
		$data 				= array();
		$data['name'] 		= $mealDeal['name'];
		$data['price'] 		= $mealDeal['price'];
		$data['visible'] 	= $mealDeal['visible'];
		$data['venueId'] 	= $_SESSION['venue_id'];
		$data['position'] 	= $mdKey;
		$data['sectionId'] 	= $mealDeal['sectionID'];
		$data['mealDeal'] 	 = 1;
		$data['description'] = "Meal Deal";
		$data['quantity'] 	 = 0;
		$data['menuId'] 	 = $_SESSION['mdMenuID']; 
		
		$jsonData = json_encode($data);
		
		//check item id if it exists then edit otherwise post
		$curlResultCheck = callAPI('GET', $apiURL."items/".$mealDeal['id'], false, $apiAuth);
		$dataJSONCheck = json_decode($curlResultCheck,true);
		
		if( isset($dataJSONCheck['id']) && $dataJSONCheck['id'] ) //Edit
		{	
			$mdID = $mealDeal['id'];
			
			$curlResult = callAPI('PUT', $apiURL."items/$mdID", $jsonData, $apiAuth); //md updated
			$result = json_decode($curlResult,true);
		}
		else //Create
		{
			$curlResult = callAPI('POST', $apiURL."items", $jsonData, $apiAuth); //md created
			$result = json_decode($curlResult,true);
				
			$mdID = $result['id'];
			$newMDs[$mealDeal['id']] = $mdID;
			
		}
		
		//now we create mealDeal parts
		foreach($mealDeal['sections'] as $sKey => $mdSection)
		{
			//create section
			$data 				= array();
			$data['name'] 		= $mdSection['name'];
			$data['itemId']		= $mdID;
			$data['minChoices']	= 1;
			$data['maxChoices']	= 1;
			$data['position']	= $sKey*1000;
					
			$jsonData = json_encode($data);
			$curlResult = callAPI('POST', $apiURL."mealdealsections", $jsonData, $apiAuth); //md section created
			
			$result = json_decode($curlResult,true);
			$mdSectionID = $result['id'];
			
			foreach($mdSection['items'] as $iKey => $item)
			{
				//create section
				$data 				= array();
				$data['itemId']		= $item;
				$data['sectionId']	= $mdSectionID;
				$data['position']	= $iKey*1000;
						
				$jsonData = json_encode($data);
				$curlResult = callAPI('POST', $apiURL."mealdealitems", $jsonData, $apiAuth); //md section created
				
				$result = json_decode($curlResult,true);
			}
			
		}
	}
	
	//echo $curlResult; //sending a JSON via ajax 
	
	//we need to send back an array along with curlResult
	$newJSON = array();
	$newJSON['result'] = json_decode($curlResult,true); //make it an array
	$newJSON['update']= $newMDs; //add array of new values
	
	$newJSON = json_encode($newJSON, true); //back to JSON
	
	echo $newJSON; //sending a JSON via ajax 
?>