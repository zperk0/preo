(function(window, angular){

angular.module('booking')
.service('BookingService', function ($http) {

    var service = {};

    service.getBookings = function(filter) {

    	var after = filter ? 'after=' + filter.startDate + ',' : '',
    		before = filter ? 'before=' + filter.endDate : '';

    	return $http.get('/bookings?' + after + before);
    };

    return service;

});

}(window, angular));