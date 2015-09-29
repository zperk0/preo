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

            if (!window.location.origin) {
              window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            }

            var hostName = document.location.origin;
            var lastChar = hostName.substr(hostName.length - 1);
            if (lastChar !== '/') {
                hostName += '/';
            }

            ng.getOrdensPlaced = function() {

                var sections = ng.booking.sectionsFiltered,
                    guests = ng.booking.people,
                    minValue = Infinity;

                // we are considering always the min value of orders placed
                for(var x in sections) {

                    var items = sections[x].items,
                        value = Math.floor(sections[x].total / sections[x].min);

                    if(value < minValue)
                        minValue = value;
                }

                return minValue == Infinity || isNaN(minValue) ? 'N/A' : minValue;
            };

            ng.getWebOrdersUrl = function (booking) {
                return hostName + 'menus/' + VENUE_PERMALINK + '#/booking/' + booking.reference + '/' + booking.user.lastName;
            };
        }
    };
}]);