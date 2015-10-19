(function(window, angular){

angular.module('bookingSettings')
.service('BookingSettings', ['$http', 'VENUE_ID', function ($http, VENUE_ID) {

	var service = {},
		venue_id = VENUE_ID;

	service.getSettings = function() {

		return Preoday.Venue.getBookingSettings({venueId: venue_id});
	};

	service.save = function(data) {

		var settingsData = {
			venueId: venue_id,
			settings: data
		};

		return Preoday.Venue.saveBookingSettings(settingsData);
	};

	service.update = function(bsettings, data) {

		var settingsData = {
			venueId: venue_id,
			settings: data
		};

		// jscore instance
		return bsettings.updateSettings(settingsData);
	};

	return service;

}]);

}(window, angular));