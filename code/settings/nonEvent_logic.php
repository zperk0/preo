<?php

	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); 

	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////nonEvent////////////////////////////////////////////////////////////////////////////
	
	$curlResult = callAPI('GET', $apiURL."venues/$venueID/hours", false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
			
	$neTimes = array();
	
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		//do nothing
	}
	else
	{
		$suCount = 0;
		$mCount = 0;
		$tCount = 0;
		$wCount = 0;
		$thCount = 0;
		$fCount = 0;
		$sCount = 0;
		
		foreach($dataJSON as $entry)
		{
			switch($entry['day'])
			{
				case "1";
				{
					$neTimes[$entry['day']][$suCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$suCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$suCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$suCount]['delivery']   = intval($entry['delivery']);
					$suCount++;
					break;
				}
				case "2";
				{
					$neTimes[$entry['day']][$mCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$mCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$mCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$mCount]['delivery']   = intval($entry['delivery']);
					$mCount++;
					break;
				}
				case "3";
				{
					$neTimes[$entry['day']][$tCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$tCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$tCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$tCount]['delivery']   = intval($entry['delivery']);
					$tCount++;
					break;
				}
				case "4";
				{
					$neTimes[$entry['day']][$wCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$wCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$wCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$wCount]['delivery']   = intval($entry['delivery']);
					$wCount++;
					break;
				}
				case "5";
				{
					$neTimes[$entry['day']][$thCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$thCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$thCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$thCount]['delivery']   = intval($entry['delivery']);
					$thCount++;
					break;
				}
				case "6";
				{
					$neTimes[$entry['day']][$fCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$fCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$fCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$fCount]['delivery']   = intval($entry['delivery']);
					$fCount++;
					break;
				}
				case "7";
				{
					$neTimes[$entry['day']][$sCount]['ohstarttime'] = substr($entry['open'], 0, 5);
					$neTimes[$entry['day']][$sCount]['ohendtime']   = substr($entry['close'], 0, 5);
					$neTimes[$entry['day']][$sCount]['pickup']   = intval($entry['pickup']);
					$neTimes[$entry['day']][$sCount]['delivery']   = intval($entry['delivery']);
					$sCount++;
					break;
				}
			}
		}
	}
	
	//+d($neTimes);
	
	if(count($neTimes)) 
	{
		$_SESSION['venue_netimes_edit_on'] = 1;
		$redirectFlag=0;
	}
	else
		$redirectFlag=1;
		
	if(isset($_GET['r']))
	{
		$redirectFlag = $_GET['r'];
		protect($redirectFlag);	
	}

	$menus = $_SESSION['menus'];			
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/nonEventConfig.php');
?>