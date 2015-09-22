'use strict';

angular.module('booking')
.directive('bookingItem', ['$timeout', '$q', '$rootScope', 'gettextCatalog', 'VENUE_PERMALINK',
    function($timeout, $q, $rootScope, gettextCatalog, VENUE_PERMALINK) {

    return {
        templateUrl: '/code/booking/js/directives/booking-item/booking-item.php',
        restrict: 'A',
        replace: true,
        scope: {
            booking: '=element'
        },
        link: function(ng, elem, attrs) {

            ng.permalink = VENUE_PERMALINK;

            ng.getOrdensPlaced = function() {

                var sections = ng.booking.$sections,
                    guests = ng.booking.people,
                    minValue = Infinity;

                // we are considering always the min value of orders placed
                for(var x in sections) {

                    var items = sections[x],
                        value = Math.floor(getTotalItems(items) / items[0].min);

                    if(value < minValue)
                        minValue = value;
                }

                return minValue == Infinity ? 'N/A' : minValue;
            };

            function getTotalItems(items) {

                var total = 0;

                for(var i = 0; i < items.length; i++)
                    total += !isNaN(items[i].item.qty) ? items[i].item.qty : 0;

                return total;
            };
        }
    };
}]);