(function(window, angular){

angular.module('bookingSettings')
.service('BookingSettings', ['$http', 'VENUE_ID', function ($http, VENUE_ID) {

	var service = {},
		venue_id = VENUE_ID;

	service.getSettings = function() {

		return $http.get('/api/venues/'+ venue_id +'/booking-settings');
	};

	service.save = function(data) {

		return $http.post('/api/venues/'+ venue_id +'/booking-settings', data);
	};

	service.update = function(data) {

		return $http.put('/api/venues/'+ venue_id +'/booking-settings', data);
	};

	return service;

}]);

}(window, angular));