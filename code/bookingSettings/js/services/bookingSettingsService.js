(function(window, angular){

angular.module('bookingSettings')
.service('BookingSettings', function ($http, ACCOUNT_ID) {

	var service = {},
		account_id = ACCOUNT_ID;

	service.getSettings = function(filter) {

		// TODO: set endpoint
		return $http.get('/bookingsSettings?accountid=' + account_id);
	};

	service.save = function(data) {

		// TODO: set endpoint
		return $http.post('/bookingsSettings');
	};

	return service;

});

}(window, angular));