<?php
	// Method: POST, PUT, GET etc
	// Data: array("param" => "value") ==> index.php?param=value

	function callAPI($method, $url, $data, $auth)
	{
		$curl = curl_init($url);                                                                      
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);                                                                     
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data);                                                                  
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                      
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
			'Content-Type: application/json',                                                                                
			'Content-Length: ' . strlen($data),                                                                       
			'Authorization: ' . $auth)                                                                       
		);   

		/*switch ($method)
		{
			case "POST":
				curl_setopt($curl, CURLOPT_POST, 1);

				if ($data)
					curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
				break;
			case "PUT":
				curl_setopt($curl, CURLOPT_PUT, 1);
				break;
			default:
				if ($data)
					$url = sprintf("%s?%s", $url, http_build_query($data));
		}*/

		// Optional Authentication:
		//curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		//curl_setopt($curl, CURLOPT_USERPWD, "username:password");

		//curl_setopt($curl, CURLOPT_URL, $url);
		//curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

		return curl_exec($curl);
	}
?>