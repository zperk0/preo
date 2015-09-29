(function(window, angular) {

'use scrict';

    angular.module('booking')
    .controller('BookingCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingService', 'PromotionService', 'MenuService', 'gettextCatalog', 'BookingSettingsService', '$filter',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingService, PromotionService, MenuService, gettextCatalog, BookingSettingsService, $filter) {

        var vm = this,
            menu = null,
            promotions = null;

        vm.toggleDetails = function(index) {

            var details = $('.booking-details')[index];

            if($(details).css('display') == 'none')
                $(details).slideRow('down');
            else
                $(details).slideRow('up');
        };

        vm.getBookings = function() {

            fetchData().then(function(data) {

                console.log(data);
                vm.bookingData = $filter('orderBy')(data, '$bookingDate');
            });
        };

        function fetchData() {

            var promises = [],
                reportDeferred = $q.defer(),
                filter = {
                    startDate: vm.startDate,
                    endDate: vm.endDate
                };

            // console.log('Getting bookings from ', filter);

            $AjaxInterceptor.start();

            BookingService.getBookings(filter).then(function(result) {

                var bookings = result || [];

                for(var i = 0, totalBookings = bookings.length; i < totalBookings; i++) {

                    var deferred = $q.defer(),
                        _booking = bookings[i];

                    if(_booking.promotionId) {

                        var dateObj = moment(_booking.date).utc(),
                            timeSplit = _booking['time'] ? _booking['time'].split(':') : [];

                        if(timeSplit.length > 0) {

                            dateObj.hour(timeSplit[0]);
                            dateObj.minutes(timeSplit[1]);
                        }

                        _booking.date = dateObj.format('DD/MM/YY');
                        _booking['time'] = formatTime(_booking['time']);
                        _booking.$bookingDate = dateObj.valueOf();
                        _booking.$promotionName = _booking.promotionId;

                        (function(defer, bk) {

                            bk.getMenu().then(function(data) {

                                bk.$menus = data;
                                bk.sectionsFiltered = MenuService.groupItemBySection(bk.$menus, bk.orders);

                                for(var x in bk.sectionsFiltered)
                                    bk.sectionsFiltered[x].total = getTotalItems(bk.sectionsFiltered[x].items);

                                defer.resolve();
                            }, function() {

                                defer.resolve();
                            });
                        })(deferred, _booking);

                        promises.push(deferred.promise);
                    }
                }

                if(bookings.length == 0) {

                    reportDeferred.resolve(bookings);
                    $AjaxInterceptor.complete();
                }

                $q.all(promises).then(function() {

                    // filter bookings that don't have a promotion id
                    var bookingsFiltered = bookings.filter(function(b){return b.promotionId});
                    reportDeferred.resolve(bookingsFiltered);

                    $AjaxInterceptor.complete();
                }, function() {

                    $AjaxInterceptor.complete();
                    showErrorMsg();
                });
            }, function() {

                $AjaxInterceptor.complete();
                showErrorMsg();
            });

            return reportDeferred.promise;
        }

        function getTotalItems(items) {

            var total = 0;

            for(var i = 0; i < items.length; i++)
                total += !isNaN(items[i].qty) ? items[i].qty : 0;

            return total;
        };

        function formatTime(time) {

            return time.length == 8 ? time.substr(0, time.length - 3) : time;
        }

        function showErrorMsg(msg) {

            var errorMsg = msg || gettextCatalog.getString("Sorry, but there's been an error processing your request.");

            noty({
                type: 'error',  layout: 'topCenter',
                text: errorMsg
            });
        }

        function _init() {

            $rootScope.requests = 0;
            $AjaxInterceptor.start();

            var startDate = $('.sched-start-date').fdatepicker({format:'dd/mm/yyyy'}).on('changeDate', function() { startDate.hide(); $('.sched-end-date').focus(); }).data('datepicker');
            var endDate = $('.sched-end-date').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() <= startDate.date.valueOf() ? 'disabled' : '';}}).data('datepicker');
            var daysAhead = moment().add('30', 'days');

            vm.startDate = moment().format('DD/MM/YYYY');
            vm.endDate = daysAhead.format('DD/MM/YYYY');

            BookingSettingsService.getSettings().then(function() {

                $AjaxInterceptor.complete();
                vm.getBookings();

            }, function() {

                var noSettingMsg = gettextCatalog.getString('Please, setup the group booking settings first.');

                $AjaxInterceptor.complete();
                showErrorMsg(noSettingMsg);

                $timeout(function() {
                    window.location.href = '/bookingSettings'
                }, 2500);
            });
        }

        $timeout(_init);
    }]);

}(window, angular));