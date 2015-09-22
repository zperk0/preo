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

            ng.getTotalItems = function(items) {

                var total = 0;

                for(var i = 0; i < items.length; i++)
                    total += !isNaN(items[i].item.qty) ? items[i].item.qty : 0;

                return total;
            };

            ng.exportCsv = function(){

                ng.csvData = prepareExportCsvData(ng.booking);

                console.log('csvData', ng.csvData);

                // $http({
                //     method: "post",
                //     url: '/api/accounts/' + ACCOUNT_ID + '/exports/csv/report',
                //     transformRequest: transformRequestAsFormPost,
                //     data: csvData
                // }).then(function() {
                //     console.log(arguments);
                // })
            }

            function prepareExportCsvData(data){

                var prepData = [[ng.getExportDate()],[title]],
                    arrBooking = [data.promotion, data.clientData.name, data.date, data.time, data.guests, data.ordersPlaced];

                prepData.push(arrBooking);

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