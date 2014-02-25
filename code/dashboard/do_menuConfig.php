<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	/*
	
	if(!isset($_SESSION['secondaryMenuFlag'])) $_SESSION['secondaryMenuFlag']=0;
	
	//get menuID
	$menuID = $_POST['menuID'];
	protect($menuID);
	
	if(isset($menuID) && !preg_match('/^menu\d+$/',$menuID)) //We delete the old menu and create a new one!
	{		
		$menu = array();
		
		//query to find old menu sanity
		$curlResult = callAPI('GET', $apiURL."menus/$menuID", false, $apiAuth);
		$dataJSON = json_decode($curlResult,true);
		$menu = $dataJSON;
		
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
						$curlResult = callAPI('DELETE', $apiURL."modifieritems/$optionID", false, $apiAuth); //deleted
					}
					
					//kill all modifiers
					$curlResult = callAPI('DELETE', $apiURL."modifiers/$modifierID", false, $apiAuth); //deleted
				}
				
				//kill all items
				$curlResult = callAPI('DELETE', $apiURL."items/$itemID", false, $apiAuth); //deleted
			}
			
			//kill all sections and section-items
			$curlResult = callAPI('DELETE', $apiURL."sections/$sectionID", false, $apiAuth); //deleted
		}
	} //at this stage all current data is deleted and now we will proceed to putting in new data
	
	$mName = $_POST['mName']; //menu name
	protect($mName);
	
	$sectionCount = $_POST['sectionCount']; //linear count -section
	protect($sectionCount);
	
	$sectionCountAct = $_POST['sectionCountAct']; //actual count -section
	protect($sectionCountAct);
	
	$itemCount = $_POST['itemCount']; //linear count -item
	protect($itemCount);
	
	$itemCountAct = $_POST['itemCountAct']; //actual count -item
	protect($itemCountAct);
	
	$menu = array(); //initialising menu 
	
	//remember everything is 1-indexed. 0 is dummy data
	$i = $j = 1;
	while($i <= $sectionCountAct && $j <= $sectionCount) //$i should break it faster unless linear == actual  -- creating new menu here
	{
		if(isset($_POST['mSectionName'][$j]))
		{
			$menu[$i]['name'] = $_POST['mSectionName'][$j];//);
			
			//now we get all items in this section
			$a = $b = 1; //same 1-index logic here too
			while($a <= $itemCountAct && $b <= $itemCount)
			{
				if(isset($_POST['iName']['section'.$j][$b]))
				{
					$menu[$i]['items'][$a]['name'] 			= $_POST['iName']['section'.$j][$b];//);
					$menu[$i]['items'][$a]['desc'] 			= $_POST['iDesc']['section'.$j][$b];//);
					if( (!isset($_POST['iPrice']['section'.$j][$b])) || (isset($_POST['iPrice']['section'.$j][$b]) && empty($_POST['iPrice']['section'.$j][$b])) )
						$menu[$i]['items'][$a]['price'] 		= 0.00;
					else
						$menu[$i]['items'][$a]['price'] 		= $_POST['iPrice']['section'.$j][$b];//);
					$menu[$i]['items'][$a]['quantity'] 		= $_POST['iQuan']['section'.$j][$b];//);
						if(!isset($menu[$i]['items'][$a]['quantity']) || !$menu[$i]['items'][$a]['quantity']){ $menu[$i]['items'][$a]['quantity'] = 0; }
					$menu[$i]['items'][$a]['visible'] 		= '1';  // $_POST['iVisi']['section'.$j][$b];//);
						if(!isset($menu[$i]['items'][$a]['visible']) || !$menu[$i]['items'][$a]['visible']){ $menu[$i]['items'][$a]['visible'] = 0; }
					
					$c = $d = 1; //same 1-index logic here too
					while($c <= $_POST['item'.$b.'_modCountAct'] && $d <= $_POST['item'.$b.'_modCount'])
					{
						if(isset($_POST['iMod']['item'.$b]['m'.$d]))
						{
							$menu[$i]['items'][$a]['modifiers'][$c]['name'] 	= $_POST['iMod']['item'.$b]['m'.$d];//);
							$menu[$i]['items'][$a]['modifiers'][$c]['type'] 	= $_POST['iModType']['item'.$b]['m'.$d];//);
						
							//now we get all the options
							$x = $y = 1;
							while($x <= $_POST['item'.$b.'_optionCountAct'] && $y <= $_POST['item'.$b.'_optionCount'])
							{
								if(isset($_POST['oName']['item'.$b]['m'.$d][$y]))
								{
									$menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['name'] = $_POST['oName']['item'.$b]['m'.$d][$y];//);
									if( !isset($_POST['oPrice']['item'.$b]['m'.$d][$y]) || ( isset($_POST['oPrice']['item'.$b]['m'.$d][$y]) && empty($_POST['oPrice']['item'.$b]['m'.$d][$y]) ) )
										$menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['price'] = 0.00;
									else	
										$menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['price'] = $_POST['oPrice']['item'.$b]['m'.$d][$y];//);
									$menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['visible'] = '1';  // $_POST['oVisi']['item'.$b]['m'.$d][$y];//);
										if(!isset($menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['visible']) || !$menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['visible']){ $menu[$i]['items'][$a]['modifiers'][$c]['options'][$x]['visible'] = 0; }
									
									$x++;
								}
								$y++;
							}
							$c++;
						}
						$d++;
					}
					$a++;
				}
				$b++;
			}
			$i++;
		}
		$j++;
	}
	
	//debug 
	//echo var_export($menu); exit;
	
	//The order of things
		//Accounts have menus
		//Menus have items
		//Menus have sections
		//Menu sections have a cross table with items
		//Items have modifiers (options, size, choice of, etc)
		//modifiers have modifier-items 
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$newIDs = array();
	
	//create/update menu
	$data 				= array();
	$data['name'] 		= $mName;
	$data['accountId'] 	= $_SESSION['account_id'];
	//if(!$_SESSION['secondaryMenuFlag'])
		$data['outletId'] 	= $_SESSION['outlet_id']; //secondary menus are non-associated. disabled
	
	$jsonData = json_encode($data);
	
	if(isset($menuID) && !preg_match('/^menu\d+$/',$menuID)) //Edit
	{	
		$curlResult = callAPI('PUT', $apiURL."menus/$menuID", $jsonData, $apiAuth); //menu updated
		$result = json_decode($curlResult,true);
	}
	else //Create
	{
		$curlResult = callAPI('POST', $apiURL."menus", $jsonData, $apiAuth); //menu created
		$result = json_decode($curlResult,true);
		
		//save old - new id relationship
		$newIDs[$menuID] = $result['id'];
		$menuID = $result['id'];
		
		
		if(!isset($_SESSION['secondaryMenuFlag']) || !$_SESSION['secondaryMenuFlag']) $_SESSION['menu_id'] = $menuID;
	}
	
	//now we create sections > items > sectionsXitems > modifiers > modifier-items
	foreach($menu as $sKey => $section)
	{
		//create section
		$data 				= array();
		$data['name'] 		= $section['name'];
		$data['menuId'] 	= $menuID;
		$data['position'] 	= $sKey;
				
		$jsonData = json_encode($data);
		$curlResult = callAPI('POST', $apiURL."sections", $jsonData, $apiAuth); //menu created
		
		$result = json_decode($curlResult,true);
		
		//+d($curlResult);
		
		$section_id = $result['id'];
		
		if(isset($section['items']) && !empty($section['items'])){
			foreach($section['items'] as $iKey=>$item)
			{
				//create item along with put an entry in sectionxitems
				$data 					= array();
				$data['name'] 			= $item['name'];
				$data['venueId'] 		= $_SESSION['venue_id'];
				$data['description'] 	= $item['desc'];
				$data['price'] 			= $item['price'];
				$data['quantity'] 		= $item['quantity'];
				$data['visible'] 		= $item['visible'];
				
				$data['menuId'] 		= $menuID; //sectionxitems
				$data['sectionId'] 		= $section_id; //sectionxitems
				$data['position'] 		= $iKey+1000; //sectionxitems
				
				$jsonData = json_encode($data);
				$curlResult = callAPI('POST', $apiURL."items", $jsonData, $apiAuth); //item created
				
				$result = json_decode($curlResult,true);
				
				//+d($curlResult);
				
				$item_id = $result['id'];
				
				if(isset($item['modifiers']))
				{
					foreach($item['modifiers'] as $mKey=>$modifier)
					{
						//create modifier
						$data = array();
						$data['itemId'] = $item_id;
						$data['name'] = $modifier['name'];
						$data['position'] = $mKey;
					
						switch($modifier['type'])
						{
							case "S":
							{
								$data['minChoices'] = "1";
								$data['maxChoices'] = "1";
								break;
							}
							case "M":
							{
								$data['minChoices'] = "1";
								$data['maxChoices'] = "-1";
								break;
							}
							case "O":
							{
								$data['minChoices'] = "0";
								$data['maxChoices'] = "-1";
								break;
							}
							default:
							{
								$data['minChoices'] = "0";
								$data['maxChoices'] = "-1";
								break;
							}
						}
					
						$jsonData = json_encode($data);
						$curlResult = callAPI('POST', $apiURL."modifiers", $jsonData, $apiAuth); //modifier created
						
						$result = json_decode($curlResult,true);
						
						//+d($curlResult);
						
						$modifier_id = $result['id'];
					
						foreach($modifier['options'] as $oKey=>$option)
						{
							//create modifier item
							$data = array();
							$data['modifierId'] = $modifier_id;
							$data['name'] = $option['name'];
							$data['price'] = $option['price'];
							$data['position'] = $oKey;
							$data['visible'] = $option['visible'];
						
							$jsonData = json_encode($data);
							$curlResult = callAPI('POST', $apiURL."modifieritems", $jsonData, $apiAuth); //modifier created
							
							//+d($curlResult);
						}
					}
				}
			}
		}
	}
	$_SESSION['menus'] = $menu;
	//echo $curlResult; //sending a JSON via ajax 
	
	//we need to send back an array along with curlResult
	$newJSON = array();
	$newJSON['result'] = json_decode($curlResult,true); //make it an array
	$newJSON['update']= $newIDs; //add array of new values
	
	$newJSON = json_encode($newJSON); //back to JSON
	
	echo $newJSON; //sending a JSON via ajax 
	
	*/
	
	//DUMMY CALL BACK
	//we get account id from _SESSION
	$accountID = $_SESSION['account_id'];
	
	$PHP = json_decode(file_get_contents('php://input'),true);
	
	//echo var_export($PHP);
	
	//////VENUE////////////////////////////////////////////////////////////////////////////
	
	//query to find venues
	$curlResult = callAPI('GET', $apiURL."venues?accountId=$accountID", false, $apiAuth);
	
	$dataJSON = json_decode($curlResult,true);
	
	echo $curlResult;
?>