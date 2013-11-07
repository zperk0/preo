<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
			
	$outletCount = $_POST['outletCount']; //linear count -outlet
	protect($outletCount);
	
	$outletCountAct = $_POST['outletCountAct']; //actual count -outlet
	protect($outletCountAct);
	
	$outlets = array(); //initialising outlet 
	
	//remember everything is 1-indexed. 0 is dummy data
	$i = $j = 1;
	while($i <= $outletCountAct && $j <= $outletCount) //$i should break it faster unless linear == actual  -- creating new outlet here
	{
		if(isset($_POST['oName'][$j]) && $_POST['oName'][$j])
		{
			try { 
				$outlets[$i]['id']		= /*protect(*/$_POST['oID'][$j];/*);*/
				$outlets[$i]['menus'] 	= /*protect(*/$_POST['oMenu'][$j];//);
			} catch(Exception $e){ /*nothing*/ } 
			
			$outlets[$i]['name'] 		= /*protect(*/$_POST['oName'][$j];//);
			
			$i++;
		}
		$j++;
	}
	
	$outletApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the outlet's token here
	
	foreach($outlets as $outlet)
	{
		//create outlet
		$data 					= array();
		
		if(isset($outlet['id']) && $outlet['id']) //edit old
		{
			//first we update outlet
			$outletID = $outlet['id'];
			
			$data['name']		= $outlet['name'];
		
			$jsonData = json_encode($data);
			
			$curlResult = callAPI('PUT', $apiURL."outlets/$outletID", $jsonData, $outletApiAuth); //outlet created
			
			//now we delete all outlet_menu entries and recreate them to ensure we have the latest bindings
			$curlResult = callAPI('DELETE', $apiURL."outlets/$outletID/menu", false, $outletApiAuth); //outlet role created
			
			if(isset($outlet['menus']) && count($outlet['menus']))
			{
				foreach($outlet['menus'] as $menu)
				{
					$menuID = $menu;
					$curlResult = callAPI('POST', $apiURL."outlets/$outletID/menu?menuId=$menuID", false, $outletApiAuth); //outlet role created
				}
			}
		}
		else //create new
		{
			$data 				= array();
			$data['name']		= $outlet['name'];
			$data['venueId']	= $_SESSION['venue_id'];
			
			$jsonData = json_encode($data);

			//appToken here is the web-apps token and not the outlet's
		
			$curlResult = callAPI('POST', $apiURL."outlets", $jsonData, $outletApiAuth); //outlet created
			
			$dataJSON = json_decode($curlResult,true);
			$outletID = $dataJSON['id'];
			
			//now we update the outlet_menu table with correct outlets
			if(isset($outlet['menus']) && count($outlet['menus']))
			{
				foreach($outlet['menus'] as $menu)
				{
					$menuID = $menu;
					$curlResult = callAPI('POST', $apiURL."outlets/$outletID/menu?menuId=$menuID", false, $outletApiAuth); //outlet role created
				}
			}
		}
	}
	
	echo $curlResult; //sending a JSON via ajax 
?>