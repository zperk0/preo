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

        var deferred = $q.defer();

        // clean up slots first
        if(event.cSlots.length > 0)
            event.deleteSlots().then(function() {
                delEvent(event, deferred);
            }, function(data) {
                deferred.reject(data);
            });
        else
            delEvent(event, deferred);

        function delEvent(e, d) {

            e.delete().then(function(data) {
                console.log('deleted all')
                console.log(d)
                d.resolve(data);
            }, function(data) {
                d.reject(data);
            });
        }

        return deferred.promise;

        // kill all eb-times items for thie event
        // arrPromises.push($http.delete('/api/events/' + event.id + '/slots'));
        
        //kill event
        // arrPromises.push($http.delete('/api/events/' + event.id));
    };

    service.update = function(elem, data) {

        console.log(elem, data)

        // JSCORE Event
        return elem.save(data);
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