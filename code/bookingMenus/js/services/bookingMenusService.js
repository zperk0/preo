(function(window, angular){

angular.module('bookingMenus')
.service('BookingMenusService', function ($http, VENUE_ID) {

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

		var menuData = angular.copy(data);

		menuData.id = 'menu1';

		editProperties(menuData.sections);

		console.log(menuData.sections)

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

		console.log(menuData);

		// menuData.sections = toObject(menuData.sections);

		// console.log(menuData)

		// menuData.edit = false;

		// call for do_menuConfig.php
		return $http.post('/saveMenu', menuData);
	};

	service.remove = function(id) {

		// call for do_menuDelete.php
		return $http({url: '/deleteMenu', method: 'post', data: 'menuID=' + id });
	};

	function editProperties(arr) {

		// var arr = arrayToFormat;

		// console.log(arr)

		for (var i = 0; i < arr.length; ++i) {

	    	if (arr[i] !== undefined) {

				arr[i]['insert'] = true;
				arr[i]['delete'] = false;
				arr[i]['edit'] = false;
			}
		}

		// return arr;
	}

	return service;

});

}(window, angular));