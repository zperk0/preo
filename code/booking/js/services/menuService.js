(function(window, angular){

angular.module('booking')
.service('MenuService', ['$http', 'VENUE_ID', '$q', function ($http, VENUE_ID, $q) {

    var service = {},
        venue_id = VENUE_ID;

    service.groupItemBySection = function(menus, orders) {

        console.log(menus, orders);

        var obj = {};
        obj['Unknown'] = [];

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

                    for(var m = 0, totalItems = section.items.length; m < totalItems; m++) {

                        var menuItem = section.items[m];

                        // console.log('menu item', menuItem)
                        // console.log('order item', orderItem)

                        if(orderItem.menuItemId == menuItem.id) {

                            if(!obj[section.id])
                                obj[section.id] = [];

                            obj[section.id].push({
                                min: section.min,
                                sectionName: section.name,
                                item: orderItem
                            });

                            foundSection = true;
                        }
                    }
                }

                if(!foundSection) {

                    obj['Unknown'].push({
                        sectionName: 'Unknown',
                        item: orderItem,
                        min: 1
                    });
                }
            }
        }

        if(obj['Unknown'].length == 0)
            delete obj.Unknown;

        return obj;
    }

    return service;

}]);

}(window, angular));