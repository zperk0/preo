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
        }
    };
}]);