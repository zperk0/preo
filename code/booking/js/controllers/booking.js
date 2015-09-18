(function(window, angular) {

'use scrict';

    angular.module('booking')
    .controller('BookingCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingService',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingService) {

        var vm = this;

        vm.generateReport = function() {

            var filter = {
                startDate: vm.startDate,
                endDate: vm.endDate
            };

            console.log('Getting bookings from ', filter);

            $AjaxInterceptor.start();

            BookingService.getBookings(filter).then(function(result) {

                var bookings = result || [];

                console.log('bookings', bookings);

                for(var i = 0, totalBookings = bookings.length; i < totalBookings; i++) {
                    bookings[i].date = moment(bookings[i].date).format('DD/MM/YY');
                    bookings[i]['time'] = formatTime(bookings[i]['time']);
                }

                vm.bookingData = bookings;
                $AjaxInterceptor.complete();
            });
        };

        function formatTime(time) {

            return time.length == 8 ? time.substr(0, time.length - 3) : time;
        }

        vm.toggleDetails = function(index) {

            var details = $('.booking-details')[index];

            if($(details).css('display') == 'none')
                $(details).slideRow('down');
            else
                $(details).slideRow('up');
        };

        function _init() {

            $rootScope.requests = 0;

            var startDate = $('.sched-start-date').fdatepicker({format:'dd/mm/yyyy'}).on('changeDate', function() { startDate.hide(); $('.sched-end-date').focus(); }).data('datepicker');
            var endDate = $('.sched-end-date').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() <= startDate.date.valueOf() ? 'disabled' : '';}}).data('datepicker');
        }

        $timeout(_init);
    }]);

}(window, angular));