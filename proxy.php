<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function


if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] && startsWith($_SERVER['REQUEST_URI'],"/api")){
	$url = $apiURL."".substr($_SERVER['REQUEST_URI'], 5);
    $apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
    //FIXME 
    //not sure when i need this or post
    $data = file_get_contents('php://input');
} else{
    header('HTTP/1.1 400 Bad Request');
    header('X-Proxy-Error: no url');
    exit;
}

$contentType = "application/json";
if (isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE']){
        $contentType = $_SERVER['CONTENT_TYPE'];
}

$curl = curl_init($url);                                                                      
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);      
if($data) curl_setopt($curl, CURLOPT_POSTFIELDS, $data);  
curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (cURL)');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
	'Content-Type: '.$contentType,                                                                                
	'Authorization: ' . $apiAuth)                                                                      
);   
if(preg_match('/https/', $url))
	curl_setopt($curl, CURLOPT_CAINFO, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/cert.pem'); //required for SSL verfication 

$curlResponse = curl_exec($curl);
$status = curl_getinfo( $curl );

http_response_code ($status["http_code"]);
$responseContentType = "text/thml";
if (isset($status["content_type"]) && $status["content_type"]){
    $responseContentType = $status["content_type"];
}
header('Content-Type: '.$responseContentType);

curl_close($curl);

echo $curlResponse;

function startsWith($haystack, $needle)
{     
     return (substr($haystack, 0, strlen($needle)) === $needle);
}


?>