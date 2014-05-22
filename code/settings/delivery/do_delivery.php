<?php

session_start();
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function

$results = array();
//we use the user's token
$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
$PARAMS = json_decode(file_get_contents('php://input'), true);
$settings = json_encode($PARAMS["settings"]);
$results["settings"] = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $settings, $apiAuth);



foreach ($PARAMS["messages"] as $message){
	$jsonData = json_encode($message);
	if ($message['name'] == "" && $message['content'] == ""){										
		if (isset($message['id']) && $message['id']) {		
			$results["messages"][] = callAPI("DELETE", $apiURL."venues/".$_SESSION['venue_id']."/messages/".$id[$ind], false, $apiAuth);													
		}
	} 
	else if (isset($message['id']) && $message['id']) {		
		$results["messages"][] = callAPI('PUT', $apiURL."venues/".$_SESSION['venue_id']."/messages/".$id[$ind], $jsonData, $apiAuth);
	}
	else {
		$results["messages"][] = callAPI('POST', $apiURL."venues/".$_SESSION['venue_id']."/messages", $jsonData, $apiAuth);
	}

}

return $results;

?>
