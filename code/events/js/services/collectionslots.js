(function(window, angular){

angular.module('events')
.service('CollectionSlots', function ($http, $q, VENUE_ID) {
    
    var service = {},
        venueid = VENUE_ID;

    service.get = function(eventObj) {

        // return $http.get('/api/events/' + eventid + '/slots');
        return Preoday.PickupSlot.getAll(eventObj);
    };

    service.create = function(data) {

        // return $http.post("/api/events/" + eventid + "/slots", e);
        return Preoday.PickupSlot.create(data);
    };

    service.update = function(eventObj) {

        return eventObj.save();
    };

    service.delete = function(eventObj) {

        // return $http.delete('/api/events/' + event.id + '/slots');
        return eventObj.delete();
    };

    

    return service;

});

}(window, angular));