<?	
	function getOutletMenus($id) //we call this from the HTML page to get list of menus per outlet
	{
		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  
		
		$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
		
		//get menus
		$curlResult = callAPI('GET', $apiURL."menus?outletId=$id&type=MENU", false, $apiAuth);
		
		return json_decode($curlResult,true);
	}
	
	function searchForId($id, $array) 
	{
		foreach ($array as $key => $val) 
		{
			if ($val['id'] === $id)
				return true;
		}		
		return false;
	}
?>