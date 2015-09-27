<?php
	//POST = Create 
	//POST /auth = Query
	//PUT = update
	//GET = non-JSON data

	function callAPI($method, $url, $data, $auth)
	{
		$curl = curl_init($url);                                                                      
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);      
		if($data) curl_setopt($curl, CURLOPT_POSTFIELDS, $data);  
		curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (cURL)');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                      
		$headers = array(                                                                          
			'Content-Type: application/json',                                                                                
			'Authorization: ' . $auth,
			'preo-appid: webapp',
			'x-real-ip: '.$_SERVER['REMOTE_ADDR']);

		if (isset($_SESSION['venue_id'])){
        $headers[] = 'preo-venueid: '.$_SESSION['venue_id'];
    }

        if (!preg_match('/http/', $url)) {
            $url = 'https://' . $url;
        }

		curl_setopt($curl, CURLOPT_HTTPHEADER,$headers);   
		if(preg_match('/https/', $url)){
			curl_setopt($curl, CURLOPT_CAINFO, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/cert.pem'); //required for SSL verfication 
		}

		$curlResponse = curl_exec($curl);
		
		curl_close($curl);
		
		return $curlResponse;
	}
?>