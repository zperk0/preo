(function(window, angular){

angular.module('bookingMenus')
.service('BookingMenusService', function ($http) {

	var service = {};

	service.getMenus = function(filter) {

		return $http.get('/bookingsMenus');
	};

	service.save = function(data) {

		return $http.post('/bookingsMenus', data);
	};

	service.remove = function(id) {

		return $http({url: '/bookingsMenus/' + id, method: 'delete'});
	};

	return service;

});

}(window, angular));