(function(window, angular){

angular.module('events')
.service('Events', function ($http, $q, VENUE_ID) {
    
    var service = {},
        venueid = VENUE_ID;

    service.get = function (filter) {

        var query = filter ? '?after=' + filter : '';

        return $http.get('/api/venues/' + venueid + '/events' + query);
    };

    service.deleteEvent = function(eventid) {

        // $eventID = $_POST['eventID'];
        // protect($eventID);
        
        // $venueID = $_SESSION['venue_id'];
        
        // $apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
        
        // //kill all eb-times items for thie event
        // $curlResult = callAPI('DELETE', $apiURL."events/$eventID/slots", false, $apiAuth); //venue_eb_times data deleted
        
        // //kill event
        // $curlResult = callAPI('DELETE', $apiURL."events/$eventID", false, $apiAuth); //event deleted
        
        // echo $curlResult;

        console.log('DELETE: ' + eventid);

        var arrPromises = [];

        // kill all eb-times items for thie event
        // arrPromises.push($http.delete('/api/events/' + eventid + '/slots'));
        
        //kill event
        // arrPromises.push($http.delete('/api/events/' + eventid))

        return $q.all(arrPromises);
    };

    service.saveChanges = function(events) {

        var arrPromises = [];

        console.log('EVENTS TO SAVE: ');
        console.log(events);

        // create/update event
        events.forEach(function(elem, index) {
            
            var data = {},
                defer = $q.defer();

            data.venueId = venueid;
            data.name = elem.name;
            data.description = elem.description;
            data.visible = elem.visible || 0;
        
            var dateToEdit = new Date(elem.date);

            if(dateToEdit == 'Invalid Date') {
                var date = angular.copy(elem.date);
                date = elem.date.split('/');
                dateToEdit = new Date(date[2], date[1] - 1, date[0]);
            }

            var year = dateToEdit.getUTCFullYear(),
                month = dateToEdit.getUTCMonth(),
                day = dateToEdit.getUTCDate(),
                starttimeStr = elem.starttime.split(':'),
                endtimeStr = elem.endtime.split(':'),
                finalStartTime = new Date(year, month, day, starttimeStr[0], starttimeStr[1]),
                finalEndTime = new Date(year, month, day, endtimeStr[0], endtimeStr[1]);

            if (elem.hasOwnProperty('outletLocationId') && elem.outletLocationId !== 'undefined') {
                data.outletLocationId = elem.outletLocationId;
            }
            data.duration = getEventDuration(finalStartTime, finalEndTime);
            data.schedules = [];
            data.schedules.push({
                freq: 'ONCE',
                startDate: day + '/' + pad(String(Number(month) + 1), 2) + '/' + year + 'T' + elem.starttime + ':00',
                endDate: day + '/' + pad(String(Number(month) + 1), 2) + '/' + year + 'T' + elem.endtime + ':00'
            });

            // edit old'
            if(elem.id && !String(elem.id).match('/^e.*$/')) {

                console.log('EDIT: ' + elem.id);
                console.log(data);
                var eventID = elem.id;

                $http.put("/api/events/" + eventID, data).then(function() {

                    //event created, let's config the slots
                    configSlots(eventId, elem, e, defer);
                });

            }
            // create new
            else {   
                console.log('Create EVENT: ');
                console.log(data);
                
                $http.post("/api/venues/" + venueid + "/events", data).then(function(result) {

                    var eventID = result.data.id;

                    //event created, let's config the slots
                    configSlots(eventId, elem, e, defer);
                });
            }
            
            // add promise
            arrPromises.push(defer.promise);
        });

        function configSlots(eventid, elem, e, defer) {

            var slotsPromises = [];

            //kill all eb-times items for thie event
            $http.delete("/api/events/" + eventid + "/slots").then(function() {

                //just add as previous ones are wiped clean by now!
                elem.cSlots.forEach(function(e, i) {

                    e.eventId = elem.id;
                    // data.collectionslot = e.name;
                    // data.leadtime = e.time;

                    console.log('eventid: ' + eventid);
                    console.log('SAVE SLOT: ');
                    console.log(e);

                    // post slots
                    slotsPromises.push($http.post("/api/events/" + eventid + "/slots", data)); //menu created
                });

            }); //venue_eb_times data deleted  
        
            // all slots posted, resolve the promise
            $q.all(slotsPromises).then(defer.resolve);        
        }

        return $q.all(arrPromises);

        // $newEvents = array();
        
        // $eventCount = $_POST['eventCount']; //linear count -event
        // protect($eventCount);
        
        // $eventCountAct = $_POST['eventCountAct']; //actual count -event
        // protect($eventCountAct);
        
        // $events = array(); //initialising event 
        
        // //remember everything is 1-indexed. 0 is dummy data
        // $i = $j = 1;
        // while($i <= $eventCountAct && $j <= $eventCount) //$i should break it faster unless linear == actual  -- creating new event here
        // {
        //     if(isset($_POST['eName'][$j]) && $_POST['eName'][$j])
        //     {
        //         try { $events[$i]['id'] = $_POST['eID'][$j]; } catch(Exception $e){ /*nothing*/ } 
        //         $events[$i]['name']     = $_POST['eName'][$j];
        //         $events[$i]['desc']     = $_POST['eDesc'][$j];
        //         $events[$i]['starttime']= $_POST['eTime'][$j];
        //         $events[$i]['endtime']  = $_POST['eETime'][$j];
        //         if (isset($_POST['eOutletLocation']) && isset($_POST['eOutletLocation'][$j])) {
        //             $events[$i]['outletLocationId']     = $_POST['eOutletLocation'][$j];
        //         }
        //         $tempDate               = $_POST['eDate'][$j];
        //             //convert to YYYYMMDD (from DD/MM/YYYY)
        //             preg_match('/(\d\d)\/(\d\d)\/(\d\d\d\d)/',$tempDate, $matches);
        //             $events[$i]['date'] = $matches[3].'-'.$matches[2].'-'.$matches[1];
        //         $events[$i]['visible']  = $_POST['eVisi'][$j];
        //             if(!isset($events[$i]['visible']) || !$events[$i]['visible']) $events[$i]['visible'] = 0;
                
        //         //protect
        //         protect($events[$i]['name']);
        //         protect($events[$i]['desc']);
                
        //         //now we get all the collectionSlots
        //         $x = $y = 1;
        //         while($x <= $_POST['event'.$j.'_optionCountAct'] && $y <= $_POST['event'.$j.'_optionCount'])
        //         {
        //             if(isset($_POST['eColl']['event'.$j][$y]) && $_POST['eColl']['event'.$j][$y])
        //             {
        //                 $events[$i]['cSlots'][$x]['name'] = $_POST['eColl']['event'.$j][$y];
        //                 $events[$i]['cSlots'][$x]['time'] = $_POST['eLead']['event'.$j][$y];
                        
        //                 $x++;
        //             }
        //             $y++;
        //         }
                
        //         $i++;
        //     }
        //     $j++;
        // }
        
        // $apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
        
        // $venueID = $_SESSION['venue_id'];
        
        // $curlResult = '';
        
        // foreach($events as $event)
        // {       
        //     //create/update event
        //     $data                   = array();
        //     $data['venueId']        = $_SESSION['venue_id'];
        //     $data['name']           = $event['name'];
        //     $data['description']    = $event['desc'];
        //     $data['visible']        = $event['visible'];
        //     if (isset($event['outletLocationId'])) {
        //         $data['outletLocationId']   = $event['outletLocationId'];
        //     }
        //     $data['duration']       = getEventDuration($event['starttime'],$event['endtime']);
        //     $data['schedules'] = array();
        //     $data['schedules'][0] = array();
        //     $data['schedules'][0]['freq'] = 'ONCE';
        //     $data['schedules'][0]['startDate'] = $event['date'].'T'.$event['starttime'].':00';
        //     $data['schedules'][0]['endDate'] = $event['date'].'T'.$event['endtime'].':00';
            
        //     $jsonData = json_encode($data);
            
            // if(isset($event['id']) && !preg_match('/^e.*$/',$event['id'])) //edit old
            // {
            //     $eventID = $event['id'];
            //     $curlResult = callAPI('PUT', $apiURL."events/$eventID", $jsonData, $apiAuth); //event created
            // }
            // else //create new
            // {   
            //     $curlResult = callAPI('POST', $apiURL."venues/$venueID/events", $jsonData, $apiAuth); //event created
            //     $dataJSON = json_decode($curlResult,true);
            //     $newEvents[$event['id']] = $dataJSON['id'];
            //     $eventID = $dataJSON['id'];
            // }
            
        //     //kill all eb-times items for thie event
        //     $curlResult = callAPI('DELETE', $apiURL."events/$eventID/slots", false, $apiAuth); //venue_eb_times data deleted
        
        //     //just add as previous ones are wiped clean by now!
        //     foreach($event['cSlots'] as $cSlot)
        //     {
        //         $data                   = array();
        //         $data['eventId']        = $eventID;
        //         $data['collectionslot'] = $cSlot['name'];
        //         $data['leadtime']       = $cSlot['time'];
                        
        //         $jsonData = json_encode($data);
        //         $curlResult = callAPI('POST', $apiURL."events/$eventID/slots", $jsonData, $apiAuth); //menu created
                
        //         $result = json_decode($curlResult,true);
        //     }
        // }
        
        // //we need to send back an array along with curlResult
        // $newJSON = json_decode($curlResult,true); //make it an array
        // $newJSON['update']= $newEvents; //add array of new values
        
        // $newJSON = json_encode($newJSON); //back to JSON
        
        // echo $newJSON; //sending a JSON via ajax
    }

    service.getSlots = function(eventid) {

        return $http.get('/api/events/' + eventid + '/slots');
    };


    service.getOutletLocations = function() {

        return $http.get('/api/venues/' + venueid + '/outletlocations?outlets=false');
    };

    function getEventDuration(startHours, endHours){

        var diffMs = (endHours - startHours);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        return diffMins;
    }

    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    return service;

});

}(window, angular));