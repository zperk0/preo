'use strict';

angular.module('booking')
.directive('bookingItemDetails', ['$timeout', '$q', '$rootScope', 'gettextCatalog', '$http', 'ACCOUNT_ID',
    function($timeout, $q, $rootScope, gettextCatalog, $http, ACCOUNT_ID) {

    return {
        templateUrl: '/code/booking/js/directives/booking-item-details/booking-item-details.php',
        restrict: 'A',
        replace: true,
        scope: {
            booking: '=element'
        },
        link: function(ng, elem, attrs) {

            var title = gettextCatalog.getString("Booking");
            ng.account_id = ACCOUNT_ID;

            ng.exportXLS = function(){

                ng.csvData = prepareExportCsvData(ng.booking);
            }

            function prepareExportCsvData(data){

                var prepData = {
                    client: {
                        name: ng.booking.user.name,
                        phone: ng.booking.user.phone,
                        email: ng.booking.user.email
                    },
                    booking: {
                        promotion: ng.booking.promotionId,
                        date: ng.booking.date,
                        time: ng.booking.time,
                        guests: ng.booking.people
                    },
                    sections: ng.booking.sectionsFiltered
                }

                return {
                    data:prepData
                }
            }

            ng.getExportDate = function(){

                var startDate = moment.utc(ng.startDate);
                var endDate = moment.utc(ng.endDate);

                return startDate.format("DD-MMM-YYYY") + " - " + endDate.format("DD-MMM-YYYY");
            };
        }
    };
}]);