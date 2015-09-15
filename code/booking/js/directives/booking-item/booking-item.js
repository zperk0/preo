'use strict';

angular.module('booking')
.directive('bookingItem', ['$timeout', '$q', '$rootScope', 'gettextCatalog',
    function($timeout, $q, $rootScope, gettextCatalog) {

    return {
        templateUrl: '/code/booking/js/directives/booking-item/booking-item.php',
        restrict: 'A',
        replace: true,
        scope: {
            booking: '=element'
        },
        link: function(ng, elem, attrs) {

        }
    };
}]);