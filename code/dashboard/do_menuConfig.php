<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	if(isset($_SESSION['menu_edit_on']) && $_SESSION['menu_edit_on']) //We delete the old menu and create a new one!
	{		
		$menuID = $_SESSION['menu_id'];
		
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
		if(isset($_POST['mSectionName'][$j]) && $_POST['mSectionName'][$j])
		{
			$menu[$i]['name'] = /*protect(*/$_POST['mSectionName'][$j];//);
			
			//now we get all items in this section
			$a = $b = 1; //same 1-index logic here too
			while($a <= $itemCountAct && $b <= $itemCount)
			{
				if(isset($_POST['iName']['section'.$j][$b]) && $_POST['iName']['section'.$j][$b])
				{
					$menu[$i]['items'][$a]['name'] = /*protect(*/$_POST['iName']['section'.$j][$b];//);
					$menu[$i]['items'][$a]['desc'] = /*protect(*/$_POST['iDesc']['section'.$j][$b];//);
					$menu[$i]['items'][$a]['price'] = /*protect(*/$_POST['iPrice']['section'.$j][$b];//);
					$menu[$i]['items'][$a]['quantity'] = /*protect(*/$_POST['iQuan']['section'.$j][$b];//);
						if(!isset($menu[$i]['items'][$a]['quantity']) || !$menu[$i]['items'][$a]['quantity']){ $menu[$i]['items'][$a]['quantity'] = 0; }
					$menu[$i]['items'][$a]['visible'] = /*protect(*/$_POST['iVisi']['section'.$j][$b];//);
						if(!isset($menu[$i]['items'][$a]['visible']) || !$menu[$i]['items'][$a]['visible']){ $menu[$i]['items'][$a]['visible'] = 0; }
					
					//now we get all the options
					$x = $y = 1;
					while($x <= $_POST['item'.$b.'_optionCountAct'] && $y <= $_POST['item'.$b.'_optionCount'])
					{
						if(isset($_POST['oName']['item'.$b][$y]) && $_POST['oName']['item'.$b][$y])
						{
							$menu[$i]['items'][$a]['options'][$x]['name'] = /*protect(*/$_POST['oName']['item'.$j][$y];//);
							$menu[$i]['items'][$a]['options'][$x]['price'] = /*protect(*/$_POST['oPrice']['item'.$j][$y];//);
							$menu[$i]['items'][$a]['options'][$x]['visible'] = /*protect(*/$_POST['oVisi']['item'.$j][$y];//);
								if(!isset($menu[$i]['items'][$a]['options'][$x]['visible']) || !$menu[$i]['items'][$a]['options'][$x]['visible']){ $menu[$i]['items'][$a]['options'][$x]['visible'] = 0; }
							
							$x++;
						}
						$y++;
					}
					$a++;
				}
				$b++;
			}
			$i++;
		}
		$j++;
	}
	
	//The order of things
		//Accounts have menus
		//Menus have items
		//Menus have sections
		//Menu sections have a cross table with items
		//Items have modifiers (options, size, choice of, etc)
		//modifiers have modifier-items 
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	
	//create/update menu
	$data 				= array();
	$data['name'] 		= $mName;
	$data['accountId'] 	= $_SESSION['account_id'];
	$data['outletId'] 	= $_SESSION['outlet_id'];
	
	$jsonData = json_encode($data);
	
	if(isset($_SESSION['menu_edit_on']) && $_SESSION['menu_edit_on']) //Edit
	{	
		$menuID = $_SESSION['menu_id'];
		
		$curlResult = callAPI('PUT', $apiURL."menus/$menuID", $jsonData, $apiAuth); //menu updated
		$result = json_decode($curlResult,true);
	}
	else //Create
	{
		$curlResult = callAPI('POST', $apiURL."menus", $jsonData, $apiAuth); //menu created
		$result = json_decode($curlResult,true);
			
		$_SESSION['menu_id'] = $result['id'];
	}
	
	//now we create sections > items > sectionsXitems > modifiers > modifier-items
	foreach($menu as $sKey => $section)
	{
		//create section
		$data 				= array();
		$data['name'] 		= $section['name'];
		$data['menuId'] 	= $_SESSION['menu_id'];
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
				
				$data['menuId'] 		= $_SESSION['menu_id']; //sectionxitems
				$data['sectionId'] 		= $section_id; //sectionxitems
				$data['position'] 		= $iKey; //sectionxitems
				
				$jsonData = json_encode($data);
				$curlResult = callAPI('POST', $apiURL."items", $jsonData, $apiAuth); //item created
				
				$result = json_decode($curlResult,true);
				
				//+d($curlResult);
				
				$item_id = $result['id'];
							
				//create modifier
				$data = array();
				$data['itemId'] = $item_id;
				$data['name'] = "options"; //we can make this dynamic (and others below) and get front end to allow creation of "sizes", "choice of", etc
				$data['minChoices'] = "0";
				$data['maxChoices'] = "100";
				$data['position'] = $iKey;
				
				$jsonData = json_encode($data);
				$curlResult = callAPI('POST', $apiURL."modifiers", $jsonData, $apiAuth); //modifier created
				
				$result = json_decode($curlResult,true);
				
				//+d($curlResult);
				
				$modifier_id = $result['id'];
				
				if(isset($item['options']))
				{
					foreach($item['options'] as $oKey=>$option)
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
	
	echo $curlResult; //sending a JSON via ajax 
	
	//reset var
	if(isset($_SESSION['menu_edit_on']) && $_SESSION['menu_edit_on'])
		$_SESSION['menu_edit_on']=0;
?>