(function(window, angular){

angular.module('events')
.service('CollectionSlots', function ($http, $q, VENUE_ID) {
    
    var service = {},
        venueid = VENUE_ID;

    service.get = function(eventObj) {

        return Preoday.PickupSlot.getAll(eventObj);
    };

    service.create = function(data) {

        return Preoday.PickupSlot.create(data);
    };

    service.update = function(eventObj) {

        return eventObj.save();
    };

    service.delete = function(eventObj) {

        return eventObj.delete();
    };

    

    return service;

});

}(window, angular));