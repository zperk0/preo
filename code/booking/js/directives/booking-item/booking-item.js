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

                    var items = sections[x].items,
                        value = Math.floor(sections[x] / sections[x].min);

                    if(value < minValue)
                        minValue = value;
                }

                return minValue == Infinity || isNaN(minValue) ? 'N/A' : minValue;
            };
        }
    };
}]);