(function(window, angular){

angular.module('booking')
.service('BookingSettingsService', ['VENUE_ID', function (VENUE_ID) {

	var service = {},
		venue_id = VENUE_ID;

	service.getSettings = function() {

		return Preoday.Venue.getBookingSettings({venueId: venue_id});
	};

	return service;

}]);

}(window, angular));