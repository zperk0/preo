(function(window, angular){

angular.module('booking')
.service('MenuService', ['$http', 'VENUE_ID', '$q', function ($http, VENUE_ID, $q) {

    var service = {},
        venue_id = VENUE_ID,
        cachedMenus = {};

    service.groupItemBySection = function(menus, orders) {

        // console.log('menu', menus);
        // console.log('order', orders);

        var obj = {};
        obj['Unknown'] = {items: []};

        for(var i = 0, totalOrders = orders.length; i < totalOrders; i++) {

            var order = orders[i];
            // console.log('order', order);

            for(var j = 0, totalItems = order.items.length; j < totalItems; j++) {

                var orderItem = order.items[j],
                    foundSection = false;

                // console.log('order item', orderItem);

                for(var l = 0, totalSections = menus.sections.length; l < totalSections; l++) {

                    var section = menus.sections[l];
                    // console.log('section', section);

                    for(var m = 0, mTotalItems = section.items.length; m < mTotalItems; m++) {

                        var menuItem = section.items[m];

                        // console.log('menu item', menuItem)
                        // console.log('order item', orderItem)

                        if(orderItem.menuItemId == menuItem.id) {

                            if(!obj[section.id]) {
                                obj[section.id] = {};
                                obj[section.id].items = [];
                                obj[section.id].sectionName = section.name;
                                obj[section.id].min = section.min;
                                obj[section.id].position = section.position;
                            }

                            obj[section.id].items.push(orderItem);
                            foundSection = true;
                        }
                    }
                }

                if(!foundSection) {

                    obj['Unknown'].min = 1;
                    obj['Unknown'].sectionName = 'Unknown';
                    obj['Unknown'].position = Infinity;
                    obj['Unknown'].items.push(orderItem);
                }
            }
        }

        if(obj['Unknown'].items.length == 0)
            delete obj.Unknown;

        // add total items per section to the object
        for(var x in obj)
            obj[x].total = getTotalItems(obj[x].items);

        return obj;
    }

    service.loadMenu = function(booking) {

        var deferred = $q.defer();

        if(cachedMenus[booking.promotionId]) {

            defer.resolve(cachedMenus[booking.promotionId]);
        }
        else {

            // flag to know that we are already getting the menu with this promotion id, until the data is loaded
            cachedMenus[booking.promotionId] = true;
            // jscore method
            booking.getMenu().then(function(menu) {

                cachedMenus[booking.promotionId] = menu;
                deferred.resolve(menu);
            });
        }

        return deferred.promise;
    };

    function getTotalItems(items) {

        var total = 0;

        for(var i = 0; i < items.length; i++)
            total += !isNaN(items[i].qty) ? +items[i].qty : 0;

        return total;
    }

    return service;

}]);

}(window, angular));