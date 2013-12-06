<?php
	//POST = Create 
	//POST /auth = Query
	//PUT = update
	//GET = non-JSON data

	function callAPI_Header($method, $url, $data, $auth)
	{
		$curl = curl_init($url);                                                                      
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);      
		if($data) curl_setopt($curl, CURLOPT_POSTFIELDS, $data);  
		curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (cURL)');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                      
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
			'Content-Type: application/json',                                                                                
			'Authorization: ' . $auth)                                                                      
		);   
		if(preg_match('/https/', $url))
			curl_setopt($curl, CURLOPT_CAINFO, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/cert.pem'); //required for SSL verfication 

		$curlResponse = curl_exec($curl);
		
		//curl_close($curl);
		
		return curl_getinfo($curl, CURLINFO_HTTP_CODE);
	}
?>