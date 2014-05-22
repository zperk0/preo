<?php

session_start();
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
//we use the user's token
$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens


$action = "";
if (isset($_GET["action"]) && $_GET["action"]) {
	$action = $_GET["action"];
}   

// try first by the id param if any set
if (isset($_GET["id"]) && $_GET["id"]) {      
	$venueId = $_GET["id"];      
 	$venue = json_decode(callAPI('GET', $apiURL."venues/$venueId", false, $apiAuth),true);    
}
// Else return the current venue_id
else if (isset($_SESSION['venue_id']) && !$_SESSION['venue_id']){
	$venueId = $_SESSION['venue_id'];      
 	$venuesue = json_decode(callAPI('GET', $apiURL."venues/$venueId", false, $apiAuth),true);    
 	} 
//if no id set, get the first one for client
else {
 $accountID = $_SESSION['account_id'];
 $venuesJson = callAPI('GET', $apiURL."venues?accountId=$accountID", false, $apiAuth);
 $venues = json_decode($venuesJson,true);
 $venue = $venues[0];
 $venueId = $venue["id"];
}     

$ret = 1;
switch($action){
	case "message":		

		$messages =  json_decode(callAPI('GET', $apiURL."venues/$venueId/messages", false, $apiAuth));		
		$venue["messages"] = $messages;
//		$ret = 2;
//		$venue["messages"] = "messages";
	case "settings":
		$settings =  json_decode(callAPI('GET', $apiURL."venues/$venueId/settings", false, $apiAuth));  
		$venue["settings"] = $settings;
//		$ret = 3;
//		$venue["settings"] = "settings";
	break;	
	default: 	
	$ret = 4;
	break;
}

//echo $ret;
echo json_encode($venue);

?>
