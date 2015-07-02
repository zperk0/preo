(function(window, angular){

angular.module('events')
.service('Events', function ($http, $q, VENUE_ID) {
    
    var service = {},
        venueid = VENUE_ID;

    service.get = function (filter) {

        return Preoday.Event.getAll(venueid, filter);
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

    service.update = function(elem) {

        // JSCORE Event
        return elem.save();
    };

    service.create = function(data) {

        return Preoday.Event.create(venueid, data);
    }

    service.getOutletLocations = function() {

        return $http.get('/api/venues/' + venueid + '/outletlocations?outlets=false');
    };

    return service;

});

}(window, angular));