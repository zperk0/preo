<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function


if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] && startsWith($_SERVER['REQUEST_URI'],"/api")){
	$apiCall = $apiURL."".substr($_SERVER['REQUEST_URI'], 5);
    $apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
    //FIXME 
    //not sure when i need this or post
    $params = file_get_contents('php://input');
} else{
    header('HTTP/1.1 400 Bad Request');
    header('X-Proxy-Error: no url');
    exit;
}

$result = callAPI($_SERVER['REQUEST_METHOD'],$apiCall,$params,$apiAuth);

echo $result;

function startsWith($haystack, $needle)
{     
     return (substr($haystack, 0, strlen($needle)) === $needle);
}


?>