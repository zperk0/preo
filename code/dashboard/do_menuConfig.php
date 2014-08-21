<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/uploadFileMenuItem.php'); //uploadFile 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/SystemStatic.php');
	
	//1 - if delete, then remove insert,edit
	//2 - if insert, then remove edit
	//3 - delete meal_deal_section_item before removing SECTION & ITEM
	//4 - delete meal_deal_section record before removing ITEM
	
	//The order of things
		//Accounts have menus
		//Menus have sections
		//Sections have items
		//Items have modifiers (options, size, choice of, etc)
		//Modifiers have options
	
	if(!isset($_SESSION['secondaryMenuFlag'])) $_SESSION['secondaryMenuFlag']=0;
	$curlResult = '';
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$newIDs = array(); //store info that updates the page post-call
	$newImages = array();
	
	//Parse JSON object from JS
	$menu = json_decode(file_get_contents('php://input'),true);
	
	$menu_id = $menu['id'];
	
	//create new menu?
	if(preg_match('/^menu\d+$/',$menu_id))
	{	
		$data 					= array();
		$data['name'] 			= $menu['name'];
		$data['accountId'] 		= $menu['accountId'];
		//if(!$_SESSION['secondaryMenuFlag'])
			$data['outletId'] 	= $_SESSION['outlet_id']; //secondary menus are non-associated. disabled
		
		$jsonData 	= json_encode($data);
		$curlResult = callAPI('POST', $apiURL."menus", $jsonData, $apiAuth); //menu created
		$result 	= json_decode($curlResult,true);
		
		//save old - new id relationship
		$newIDs[$menu_id] = $result['id'];
		
		//new MenuID
		$menu_id 	= $result['id']; 
		$menu['id'] = $menu_id;  //update menu-id in JSON
		
		//remove edit tag for the menu!
		$menu['edit'] = false;
		
		if(!isset($_SESSION['secondaryMenuFlag']) || !$_SESSION['secondaryMenuFlag']) $_SESSION['menu_id'] = $menu_id;
	}
	
	if($menu['edit']) //Edit menu
	{
		$data 					= array();
		$data['name'] 			= $menu['name'];
		$data['accountId'] 		= $menu['accountId'];
		//if(!$_SESSION['secondaryMenuFlag'])
			$data['outletId'] 	= $_SESSION['outlet_id']; //secondary menus are non-associated. disabled
		
		$jsonData 	= json_encode($data);
		$curlResult = callAPI('PUT', $apiURL."menus/$menu_id", $jsonData, $apiAuth); //menu edited
		$result 	= json_decode($curlResult,true);
		
		//remove edit tag for the menu!
		$menu['edit'] = false;
	}
	
	//Now we step into the menu
	
	//SECTIONS
	foreach($menu['sections'] as $sKey => $section)
	{
		$section_id	 		= $section['id'];		
		
		$data 				= array();
		$data['name'] 		= $section['name'];
		$data['menuId'] 	= $menu_id;
		$data['position'] 	= $section['position'];
		
		if($section['delete']) //delete section
		{
			if(!preg_match('/s$/',$section['id'])) //skip unsaved sections (123s)
			{
				foreach($section['items'] as $item)
				{
					$item_id = $item['id'];
					
					foreach($item['modifiers'] as $modifier)
					{
						$modifier_id = $modifier['id'];
						
						foreach($modifier['options'] as $option)
						{
							$option_id = $option['id'];
							
							//kill all options
							$curlResult = callAPI('DELETE', $apiURL."modifieritems/$option_id", false, $apiAuth); //deleted
							
							//remove all tags!
							$option['insert'] = false;
							$option['delete'] = false;
							$option['edit']   = false;
						}
						
						//kill all modifiers
						$curlResult = callAPI('DELETE', $apiURL."modifiers/$modifier_id", false, $apiAuth); //deleted
						
						//remove all tags!
						$modifier['insert'] = false;
						$modifier['delete'] = false;
						$modifier['edit']   = false;
					}
					
					//kill item
					if($section['md']) //section contains mealdeal
					{
						$curlResult = callAPI('DELETE', $apiURL."items/$item_id?cascade=true", false, $apiAuth); //deleted (kills all MealDeal dependencies)
					}
					else
					{
						//kill item
						if($item['mdi']) $curlResult = callAPI('DELETE', $apiURL."items/$item_id?cascade=true", false, $apiAuth); //deleted (kills all MealDeal dependencies)
						else $curlResult = callAPI('DELETE', $apiURL."items/$item_id", false, $apiAuth); //deleted 
					}
					
					//remove all tags!
					$item['insert'] = false;
					$item['delete'] = false;
					$item['edit']   = false;
				}
				
				//kill section
				$curlResult = callAPI('DELETE', $apiURL."sections/$section_id", false, $apiAuth); //deleted
			}
			
			//remove all tags for the section!
			$section['insert'] 	= false;
			$section['edit'] 	= false;
			$section['delete'] 	= false;
		}
		
		if($section['insert']) //new section
		{
			$jsonData 	= json_encode($data);
			$curlResult = callAPI('POST', $apiURL."sections", $jsonData, $apiAuth); //section created
			$result 	= json_decode($curlResult,true);
			
			//save old - new id relationship
			$newIDs['section'.$section_id] = 'section'.$result['id'];
			
			//New section ID
			$section_id 	= $result['id'];
			$section['id'] 	= $section_id; //update section-id in JSON
			
			//remove insert, edit tag for the section!
			$section['insert'] 	= false;
			$section['edit'] 	= false;
		}
		
		if($section['edit']) //edit section
		{
			$jsonData 	= json_encode($data);
			
			$curlResult = callAPI('PUT', $apiURL."sections/$section_id", $jsonData, $apiAuth); //section edited
			$result 	= json_decode($curlResult,true);
			
			//remove edit tag for the section!
			$section['edit'] 	= false;
		}
		
		//ITEMS
		foreach($section['items'] as $iKey=>$item)
		{
			$item_id 				= $item['id'];
			$mdi					= $item['mdi'];
			
			$data 					= array();
			$data['name'] 			= $item['name'];
			$data['venueId'] 		= $item['venueId'];
			$data['description'] 	= $item['description'];
			$data['price'] 			= $item['price'];
			$data['quantity'] 		= $item['quantity'];
			$data['visible'] 		= $item['visible'];
			
			$data['menuId'] 		= $menu_id;
			$data['sectionId'] 		= $section_id; 
			$data['position'] 		= $item['position'];


			if ( isset($item['md'])) {
				$data['mealDeal'] 		= $item['md'];
			}
			
			if($item['delete']) //delete item
			{
				if(!preg_match('/i$/',$item['id'])) //skip unsaved items (123i)
				{
					$curlResult = callAPI('GET', $apiURL."itemimages/$item_id", false, $apiAuth);
					$Image = json_decode($curlResult,true);

					if ( $Image ) {
						$PREO_UPLOAD_ROOT = SystemStatic::getUploadRoot( "" );

							//kill menu
						$curlResult = callAPI('DELETE', $apiURL."itemimages/$item_id", false, $apiAuth); //menu deleted
						if ( isset($Image['imageThumb']) ) {
							unlink( $PREO_UPLOAD_ROOT . $Image['imageThumb'] );	
						}
						unlink( $PREO_UPLOAD_ROOT .  $Image['image'] );
					}

					foreach($item['modifiers'] as $modifier)
					{
						$modifier_id = $modifier['id'];
						
						foreach($modifier['options'] as $option)
						{
							$option_id = $option['id'];
							
							//kill all options
							$curlResult = callAPI('DELETE', $apiURL."modifieritems/$option_id", false, $apiAuth); //deleted
							
							//remove all tags!
							$option['insert'] = false;
							$option['delete'] = false;
							$option['edit']   = false;
						}
						
						//kill all modifiers
						$curlResult = callAPI('DELETE', $apiURL."modifiers/$modifier_id", false, $apiAuth); //deleted
						
						//remove all tags!
						$modifier['insert'] = false;
						$modifier['delete'] = false;
						$modifier['edit']   = false;
					}

					//kill item
					if($mdi) $curlResult = callAPI('DELETE', $apiURL."items/$item_id?cascade=true", false, $apiAuth); //deleted (kills all MealDeal dependencies)
					else $curlResult = callAPI('DELETE', $apiURL."items/$item_id", false, $apiAuth); //deleted 
				}
				
				//remove all tags for the item!
				$item['insert'] = false;
				$item['edit'] 	= false;
				$item['delete'] = false;
			}
			
			if($item['insert']) //insert item
			{
				$jsonData 	= json_encode($data);
				$curlResult = callAPI('POST', $apiURL."items", $jsonData, $apiAuth); //item created
				$result 	= json_decode($curlResult,true);
				

				//save old - new id relationship
				$newIDs['item'.$item_id] = 'item'.$result['id'];
				$newImages['item' . $item_id] = array();
				
				//New item ID
				$oldItemId = $item_id;
				$item_id 	= $result['id'];
				$item['id'] = $item_id; //update item-id in JSON

				if ( isset($item['images']) ) {
					$PREO_UPLOAD_ROOT = SystemStatic::getUploadRoot( "/menuitem/" );
					foreach ($item['images'] as $Image) {
						if ( isset($Image['cropped']) && $Image['cropped'] ) {
							// cropImage( $PREO_UPLOAD_ROOT . 'temp/' . $Image['image'], $PREO_UPLOAD_ROOT . 'fix/' . $Image['image'], $Image['w'], $Image['h'], $Image['x'], $Image['y'], 99 );

							$newImage = explode('/', $Image['url']);
							$newImage = $newImage[ count($newImage) - 1 ];
							copy($PREO_UPLOAD_ROOT . '/temp/' . $newImage, $PREO_UPLOAD_ROOT . '/fix/' . $newImage);
							unlink($PREO_UPLOAD_ROOT . '/temp/' . $newImage);

							$data = array();
							$data['image'] = '/menuitem/fix/' . $newImage;
							$data['itemId'] = $item_id;
							$jsonData 	= json_encode($data);
							$curlResult = callAPI('POST', $apiURL."items/$item_id/images", $jsonData, $apiAuth); //item created
							$result 	= json_decode($curlResult,true);
							$newImages['item' . $oldItemId][] = array('id' => 'item' . $item_id, 'replace' => true);
						}
					}
				}
				
				//remove insert, edit tags for the item!
				$item['insert'] = false;
				$item['edit'] 	= false;
			}
			
			if($item['edit']) //edit item
			{
				$jsonData 	= json_encode($data);
				$curlResult = callAPI('PUT', $apiURL."items/$item_id", $jsonData, $apiAuth); //item edited
				$result 	= json_decode($curlResult,true);

				if ( !isset($newImages['item' . $item_id]) ) {
					$newImages['item' . $item_id] = array();
				}
				if ( isset($item['images']) ) {
					$PREO_UPLOAD_ROOT = SystemStatic::getUploadRoot( "/menuitem/" );
					foreach ($item['images'] as $Image) {
						if ( isset($Image['cropped']) && $Image['cropped'] ) {
							// cropImage( $PREO_UPLOAD_ROOT . 'temp/' . $Image['image'], $PREO_UPLOAD_ROOT . 'fix/' . $Image['image'], $Image['w'], $Image['h'], $Image['x'], $Image['y'], 99 );

							$newImage = explode('/', $Image['url']);
							$newImage = $newImage[ count($newImage) - 1 ];
							copy($PREO_UPLOAD_ROOT . '/temp/' . $newImage, $PREO_UPLOAD_ROOT . '/fix/' . $newImage);
							unlink($PREO_UPLOAD_ROOT . '/temp/' . $newImage);

							$data = array();
							$data['image'] = '/menuitem/fix/' . $newImage;
							$data['itemId'] = $item_id;
							$jsonData 	= json_encode($data);
							$curlResult = callAPI('POST', $apiURL."items/$item_id/images", $jsonData, $apiAuth); //item created
							$result 	= json_decode($curlResult,true);
							$newImages['item' . $item_id][] = $result['id'];							
						}
					}
				}
				//remove edit tag for the item!
				$item['edit'] 	= false;
			}
			
			//MODIFIERS
			foreach($item['modifiers'] as $mKey=>$modifier)
			{
				$modifier_id 		= $modifier['id'];
				
				$data = array();
				$data['itemId'] 	= $item_id;
				$data['name'] 		= $modifier['name'];
				$data['position'] 	= $modifier['position'];
				$data['minChoices'] = $modifier['minChoices'];
				$data['maxChoices'] = $modifier['maxChoices'];
				
				if($modifier['delete']) //delete modifier
				{
					if(!preg_match('/i$/',$modifier['id'])) //skip unsaved mods (123m-item123i)
					{
						foreach($modifier['options'] as $option)
						{
							$option_id = $option['id'];
							
							//kill all options
							$curlResult = callAPI('DELETE', $apiURL."modifieritems/$option_id", false, $apiAuth); //deleted
							
							//remove all tags!
							$option['insert'] = false;
							$option['delete'] = false;
							$option['edit']   = false;
						}
						
						//kill all modifier
						$curlResult = callAPI('DELETE', $apiURL."modifiers/$modifier_id", false, $apiAuth); //deleted
					}
					
					//remove all tags for the modifier!
					$modifier['insert'] = false;
					$modifier['edit'] 	= false;
					$modifier['delete'] = false;
				}
				
				if($modifier['insert']) //insert modifier
				{
					$jsonData 	= json_encode($data);
					$curlResult = callAPI('POST', $apiURL."modifiers", $jsonData, $apiAuth); //modifier created
					$result	 	= json_decode($curlResult,true);
					
					//save old - new id relationship
					$newIDs['mod'.$modifier_id] = 'mod'.$result['id'];
					
					//New modifier ID
					$modifier_id 	= $result['id'];
					$modifier['id'] = $modifier_id; //update modifier-id in JSON
					
					//remove insert, edit tags for the modifier!
					$modifier['insert'] = false;
					$modifier['edit'] 	= false;
				}
				
				if($modifier['edit']) //edit modifier
				{
					$jsonData 	= json_encode($data);
					$curlResult = callAPI('PUT', $apiURL."modifiers/$modifier_id", $jsonData, $apiAuth); //modifier edited
					$result	 	= json_decode($curlResult,true);
					
					//remove edit tag for the modifier!
					$modifier['edit'] 	= false;
				}

				//OPTIONS
				foreach($modifier['options'] as $oKey=>$option) //(123o-item123i)
				{
					$option_id 			= $option['id'];
					
					$data 				= array();
					$data['modifierId'] = $modifier_id;
					$data['name'] 		= $option['name'];
					$data['price'] 		= $option['price'];
					$data['position'] 	= $option['position'];
					$data['visible']	= $option['visible'];
					
					if($option['delete']) //delete option
					{
						if(!preg_match('/i$/',$option['id'])) //skip unsaved options
						{
							//kill option
							$curlResult = callAPI('DELETE', $apiURL."modifieritems/$option_id", false, $apiAuth); //deleted
						}
						
						//remove all tags for the option!
						$option['insert'] = false;
						$option['edit']   = false;
						$option['delete'] = false;
					}
					
					if($option['insert']) //insert option
					{
						$jsonData 	= json_encode($data);
						$curlResult = callAPI('POST', $apiURL."modifieritems", $jsonData, $apiAuth); //option created
						$result	 	= json_decode($curlResult,true);
						
						//save old - new id relationship
						$newIDs['opt'.$option_id] = 'opt'.$result['id'];
						
						//New option ID
						$option_id 	= $result['id'];
						$option['id'] = $option_id; //update option-id in JSON
					
						//remove insert,edit tags for the option!
						$option['insert'] = false;
						$option['edit']   = false;
					}
					
					if($option['edit']) //edit option
					{
						$jsonData 	= json_encode($data);
						$curlResult = callAPI('PUT', $apiURL."modifieritems/$option_id", $jsonData, $apiAuth); //option edited
						$result	 	= json_decode($curlResult,true);
						
						//remove edit tags for the option!
						$option['edit']   = false;
					}
				}
			}
		}
	}
	//echo var_export($menu);
	
	if(empty($curlResult)) $curlResult = '[{"status" : 200}]';
	
	$_SESSION['menus'] = $menu;
	//echo $curlResult; //sending a JSON via ajax 
	
	//we need to send back an array along with curlResult
	$newJSON 			= array();
	$newJSON['result'] 	= json_decode($curlResult,true); //make it an array
	$newJSON['update']	= $newIDs; //add array of new values
	$newJSON['images'] 	= $newImages;
	$newJSON 			= json_encode($newJSON); //back to JSON
	
	echo $newJSON; //sending a JSON via ajax 
?>