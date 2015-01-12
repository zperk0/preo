<?php 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');   //kint

	$dataJSON = getVenues( $_SESSION['user_id'] );

	if(empty($dataJSON)) {
		$_SESSION['noVenueFlag']=1; 	
		header("location:".$_SESSION['path'].'/dashboard');
		exit;		
	} else if(count($dataJSON) === 1) {
		$url = "http://" . $_SERVER["HTTP_HOST"] . "/do_selectVenue";

		$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/';
		session_write_close();
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");      
		curl_setopt($curl, CURLOPT_POSTFIELDS, "venueId=" . $dataJSON[0]['id']);  
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                     
		curl_setopt($curl, CURLOPT_COOKIE, $strCookie); 

		if(preg_match('/https/', $url)){
			$url = str_replace('https', 'http', $url);
			curl_setopt($curl, CURLOPT_CAINFO, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/cert.pem'); //required for SSL verfication 
		}

		$curlResponse = curl_exec($curl);
		$result = json_decode($curlResponse, true)[0];

		if ( $result['status'] == '200' ) {
			header("location:".$_SESSION['path'].'/dashboard');exit();
		} else {
			header("location:".$_SESSION['path'].'/404');exit();
		}
	}

	$venues = $dataJSON;
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/venue/selectVenue_content.php"); 	
?>