(function(window, angular){

angular.module('booking')
.service('BookingService', ['$http', 'VENUE_ID', function ($http, VENUE_ID) {

    var service = {},
    	venue_id = VENUE_ID;

    service.getBookings = function(filter) {

    	var queryParams = {expand: 'orders,user', venueId: venue_id};

    	if(filter.startDate) queryParams.after = formatDate(filter.startDate);
    	if(filter.endDate) queryParams.before = formatDate(filter.endDate);

    	return Preoday.Booking.getBookings(queryParams);
    };

    // format to MM/DD/YYYY
    function formatDate(date) {

    	var split = date.split('/');

    	return split[1] + '/' +  split[0] + '/' + split[2];
    }

    return service;

}]);

}(window, angular));