(function(window, angular){

angular.module('events')
.service('Events', function ($http, $q, VENUE_ID) {
    
    var service = {},
        venueid = VENUE_ID;

    service.get = function (filter) {

        var query = filter ? '?after=' + filter : '';

        return $http.get('/api/venues/' + venueid + '/events' + query);
    };

    service.deleteEvent = function(event) {

        // console.log('DELETE: ' + event.id);

        var arrPromises = [];

        arrPromises.push(event.delete());

        // kill all eb-times items for thie event
        // arrPromises.push($http.delete('/api/events/' + event.id + '/slots'));
        
        //kill event
        // arrPromises.push($http.delete('/api/events/' + event.id));

        return $q.all(arrPromises);
    };

    service.saveChanges = function(events) {

        var arrPromises = [];

        // console.log('EVENTS TO SAVE: ');
        // console.log(events);

        // create/update event
        events.forEach(function(elem, index) {
            
            var data = formatData(elem),
                deferred = $q.defer();

            // edit old
            if(elem.id && !String(elem.id).match('/^e.*$/')) {

                // console.log('EDIT: ' + elem.id);
                // console.log(elem);
                // console.log(data);
                arrPromises.push(elem.save(data));

                // var eventID = elem.id;

                // $http.put("/api/events/" + eventID, data).then(function() {

                //     //event created, let's config the slots
                //     configSlots(eventID, elem, deferred);
                // });

            }
            // create new
            else {

                console.log('Create EVENT: ');
                console.log(elem);
                console.log(data);

                arrPromises.push(Preoday.Event.create(venueid, data));
                
                // $http.post("/api/venues/" + venueid + "/events", data).then(function(result) {

                //     var eventID = result.data.id;

                //     //event created, let's config the slots
                //     configSlots(eventID, elem, deferred);
                // });
            }
            
            // add promise
            // arrPromises.push(deferred.promise);
        });

        function configSlots(eventid, elem, defer) {

            var slotsPromises = [];

            //kill all eb-times items for thie event
            $http.delete("/api/events/" + eventid + "/slots").then(function() {

                //just add as previous ones are wiped clean by now!
                elem.cSlots.forEach(function(e, i) {

                    e.eventId = eventid;
                    // data.collectionslot = e.name;
                    // data.leadtime = e.time;

                    // console.log('eventid: ' + eventid);
                    // console.log('SAVE SLOT: ');
                    // console.log(e);

                    // post slots
                    slotsPromises.push($http.post("/api/events/" + eventid + "/slots", e)); //menu created
                });

            }); //venue_eb_times data deleted  
        
            // all slots posted, resolve the promise
            $q.all(slotsPromises).then(defer.resolve);        
        }

        return $q.all(arrPromises);
    }

    service.getSlots = function(eventid) {

        return $http.get('/api/events/' + eventid + '/slots');
    };


    service.getOutletLocations = function() {

        return $http.get('/api/venues/' + venueid + '/outletlocations?outlets=false');
    };

    function formatData(evt) {

        var dateToEdit = null,
            data = {
                venueId: venueid,
                name: evt.name,
                description: evt.description,
                visible: evt.visible || 1
            };

        if(evt.date.indexOf('/') != -1) {

            var date = evt.date.split('/');
            dateToEdit = new Date(date[2], date[1] - 1, date[0]);
        }
        else
            dateToEdit = new Date(evt.date);

        console.log(dateToEdit)

        var year = dateToEdit.getUTCFullYear(),
            month = dateToEdit.getUTCMonth(),
            day = dateToEdit.getUTCDate(),
            starttimeStr = evt.starttime.split(':'),
            endtimeStr = evt.endtime.split(':'),
            finalStartTime = new Date(year, month, day, starttimeStr[0], starttimeStr[1]),
            finalEndTime = new Date(year, month, day, endtimeStr[0], endtimeStr[1]);


        if (evt.hasOwnProperty('outletLocationId') && evt.outletLocationId !== 'undefined')
            data.outletLocationId = evt.outletLocationId;

        data.duration = getEventDuration(finalStartTime.getTime(), finalEndTime.getTime());
        data.schedules = [
            {
                freq: 'ONCE',
                startDate: year + '-' + pad(String(Number(month) + 1), 2) + '-' + pad(String(day), 2) + 'T' + evt.starttime + ':00',
                endDate: year + '-' + pad(String(Number(month) + 1), 2) + '-' + pad(String(day), 2) + 'T' + evt.endtime + ':00'
            }
        ];

        return data;
    }

    function getEventDuration(startHours, endHours){

        var diffMs = (endHours - startHours);
        var diffMins = Math.round(diffMs / 60000); // minutes

        return diffMins;
    }

    return service;

});

}(window, angular));