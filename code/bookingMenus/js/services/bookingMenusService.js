(function(window, angular){

angular.module('bookingMenus')
.service('BookingMenusService', ['$http', 'VENUE_ID', function ($http, VENUE_ID) {

	var service = {},
		venue_id = VENUE_ID;

	service.getMenus = function(filter) {

		var data = {
			venueId: venue_id,
			type: 'booking'
		}

		return Preoday.Menu.get(data);
	};

	service.save = function(data) {

		// duplicating the menu
		var menuData = angular.copy(data);

		// fit into php logic to save menu
		menuData.id = 'menu1';

		// promotion id are limited to 1 menu
		menuData.promotions = [];

		menuData.type = 'BOOKING';

		editProperties(menuData.sections);

		for(var i = 0, totalSection = menuData.sections.length; i < totalSection; i++) {

			editProperties(menuData.sections[i].items);

			for(var j = 0, totalItems = menuData.sections[i].items.length; j < totalItems; j++) {

	    		var item = menuData.sections[i].items[j];
	    		editProperties(item.modifiers);
	    		item.mdi = true;

				for(var k = 0, totalMod = item.modifiers.length; k < totalMod; k++) {

					var mod = item.modifiers[k];
					editProperties(mod.items);

					mod.options = mod.items;
				}
	    	}
	    }

		// console.log(menuData);

		// call for do_menuConfig.php
		return $http.post('/saveMenu', menuData);
	};

	service.remove = function(id) {

		// call for do_menuDelete.php
		return $http({url: '/deleteMenu', method: 'POST', data: 'menuID=' + id, headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
	};

	// editing properties to fit on the old php logic
	function editProperties(arr) {

		for (var i = 0; i < arr.length; ++i) {

	    	if (arr[i] !== undefined) {

				arr[i]['insert'] = true;
				arr[i]['delete'] = false;
				arr[i]['edit'] = false;
			}
		}
	}

	return service;

}]);

}(window, angular));