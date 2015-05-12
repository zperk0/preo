<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); 


	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	//we get account id from _SESSION
	$venueID = $_SESSION['venue_id'];
	
	//////EVENT////////////////////////////////////////////////////////////////////////////
	
	//query to find events
	$date = strtotime(date("Y-m-d H:i:s"));
	$date = strtotime("-7 day", $date);
	$date = date("Y/m/d", $date);
	$curlResult = callAPI('GET', $apiURL."venues/$venueID/events?after=" . $date, false, $apiAuth);
	$dataJSON = json_decode($curlResult,true);
	
	if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)) 
	{	
		$_SESSION['event_edit_on']=0;
		$redirectFlag = 1;
	}
	else
	{	
		$events = array();
		
		$events = $dataJSON;
		
		//get slots and expand schedule
		foreach($events as $key => $event)
		{
			$eventID = $event['id'];

			// decode schedule
			$sched = $event['schedules'];
			if ( !empty($sched) ) {
				$sched = $sched[0];
				$events[$key]['date'] = $sched['startDate'];
				$events[$key]['starttime'] = $sched['startDate'];
				$events[$key]['endtime'] = $sched['endDate'];
			}
		 
			$curlResult = callAPI('GET', $apiURL."events/$eventID/slots", false, $apiAuth);
		
			$dataJSON = json_decode($curlResult,true);
			
			if(!(isset($dataJSON['status']) && $dataJSON['status']='404'))
			{	
				$count = 0;
				foreach($dataJSON as $cSlot)
				{
					$events[$key]['cSlots'][$count]['collectionslot'] 	= $cSlot['collectionslot'];
					$events[$key]['cSlots'][$count]['leadtime'] 		= $cSlot['leadtime'];	
					$count++;
				}
				$events[$key]['collectionCount']=$count;
			}
		}
		
		$eventCount = count($events);
		
		$_SESSION['events_old'] = $events;
		
		$_SESSION['event_edit_on']=1;
		$redirectFlag = 0;
	}
	
	if(isset($_GET['r']))
	{
		$redirectFlag = $_GET['r'];
		protect($redirectFlag);	
	}

	function byPath($a,$b){
		return $a['path'] > $b['path'];
	}

	function getAllChildren($list,$parent){
			$allChildren = array();
			foreach ($list as $location){
				if ($location['parent'] == $parent['id'] && ($location['id'] != $location['parent'])){
					$location['children'] = getAllChildren($list,$location);
					$allChildren[] = $location;
				}
			}
			return $allChildren;
	}

	function removeLastChildren($list){
		foreach ($list as $i => $outlet){
			if(!count($outlet['children'])){
				unset($list[$i]);
			} else {
				$list[$i]['children'] = removeLastChildren($outlet['children']);
			}
		}	
		return $list;
	}

	function sortLocations($locations){
		usort($locations,'byPath');		
		
		$sorted = array();
		foreach ($locations as $key => $location){
			if ($location['parent'] == null && $location['id'] !=null){
					$location['children'] = getAllChildren($locations,$location);
					$sorted[] = $location;
			}
		}
		
		return removeLastChildren($sorted);
	}

	function getOutletLocationSelectOptions($tree){		
		$output = array(); 
		foreach ($tree as $node){			
			indentNodeForSelect($node,1,$output);
		}		
		return $output;
	}

	function indentNodeForSelect($node,$indent,&$output){
		$children = $node['children'];
		$formattedChild = ['id'=>$node['id'],'name'=>str_repeat("--",$indent).' '.$node['name']];		
		$output[] = $formattedChild;
		foreach ($children as $child){
			indentNodeForSelect($child,$indent+1,$output);			
		}	
	}

	$curlResult = callAPI('GET', $apiURL."venues/$venueID/outletlocations?outlets=false", false, $apiAuth);
	$outletLocations = json_decode($curlResult,true);
	
	$tree = sortLocations($outletLocations);	

	$_SESSION['outlet_locations'] = getOutletLocationSelectOptions($tree);
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/eventConfig.php');
?>