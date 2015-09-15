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

            ng.exportCsv = function(){

                ng.csvData = prepareExportCsvData(ng.booking);

                console.log(ng.csvData);

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

                // for(var i in data) {

                //     arrBooking.push(data[i]);
                // }

                prepData.push(arrBooking);

                // angular.forEach(ng.customers,function(item){
                //         if (ng.exportAll === "1" || item.selected === true){
                //             prepData.push([item.name,item.totalSpent.toFixed(2),item.emailAddress,item.loyalty,item.offers,item.other]);
                //         }
                // });

                return {
                    data:prepData
                }
            }

            ng.getExportDate = function(){

                var startDate = moment.utc(ng.startDate);
                var endDate = moment.utc(ng.endDate);

                return startDate.format("DD-MMM-YYYY") + " - " + endDate.format("DD-MMM-YYYY");
            }

            ng.getTotalOrders = function(orders) {

                var total = 0;

                for(var i in orders)
                    total += !isNaN(orders[i].qty) ? orders[i].qty : 0;

                return total;
            }
        }
    };
}]);