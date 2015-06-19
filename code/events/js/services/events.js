(function(window, angular){

angular.module('events')
.service('Events', function ($http) {
    
    var service = {};

    service.show = function () {
        if (isNative) {
            window.plugins.spinnerDialog.show(null, null, true);
        } else {
            $ionicLoading.show({
              template: 'Loading...'
            });            
        }
    };

    service.hide = function () {
        if (isNative) {
            window.plugins.spinnerDialog.hide();
        } else {
            $ionicLoading.hide();
        }
    }

    service.get = function (filter) {

        var query = filter ? '?after=' + filter : '';

        return $http.get('/api/venues/5/events' + query);
    };

    service.getSlots = function(eventid) {

        return $http.get('/api/events/' + eventid + '/slots');
    };

    service.getOutletLocations = function() {

        return $http.get('/api/venues/5/outletlocations?outlets=false');
    };

    return service;

});

}(window, angular));