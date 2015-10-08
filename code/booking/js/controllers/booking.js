(function(window, angular) {

'use scrict';

    angular.module('booking')
    .controller('BookingCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$AjaxInterceptor', 'BookingService', 'MenuService', 'gettextCatalog', 'BookingSettingsService', '$filter',
        function($scope, $rootScope, $timeout, $q, $AjaxInterceptor, BookingService, MenuService, gettextCatalog, BookingSettingsService, $filter) {

        var vm = this,
            menu = null,
            promotions = null;

        vm.maxItemsPerPage = 25;
        vm.currentPage = 1;
        vm.bookingsToShow = [];

        vm.toggleDetails = function(index, bookingItem) {

            var details = $('.booking-details')[index];

            if($(details).css('display') == 'none')
                $(details).slideRow('down');
            else
                $(details).slideRow('up');

            // load menu data, if not loaded yet
            if(!bookingItem.$menus) {

                $AjaxInterceptor.start();
                MenuService.loadMenu(bookingItem).then(function(menus) {

                    bookingItem.$menus = menus;
                    bookingItem.sectionsFiltered = MenuService.groupItemBySection(bookingItem.$menus, bookingItem.orders);
                    $AjaxInterceptor.complete();
                });
            }
        };

        vm.getBookings = function() {

            fetchData().then(function(data) {

                // console.log('bookings', data);
                vm.bookingData = $filter('orderBy')(data, '$bookingDate');

                // booking items on the screen
                vm.bookingsToShow = vm.bookingData.slice(0, vm.maxItemsPerPage);
            });
        };

        // handle booking pagination
        vm.changePage = function(page) {

            var lastIndexShowed = vm.maxItemsPerPage * (page - 1);

            console.log(page)
            vm.bookingsToShow = vm.bookingData.slice(lastIndexShowed, vm.maxItemsPerPage * page);
            vm.currentPage = page;
        };

        // prepare data to generate booking report
        vm.prepareData = function() {

            var promises = [];

            if(vm.bookingData.length) {

                $AjaxInterceptor.start();

                // load all menus not loaded yet from the bookings (service cache the values)
                $.each(vm.bookingData, function(index, booking) {

                    var deferred = $q.defer();
                    if(!booking.$menus) {
                        MenuService.loadMenu(booking).then(function(menus) {
                            deferred.resolve();
                        }, function() {
                            deferred.reject();
                            $AjaxInterceptor.complete();
                            showErrorMsg();
                        });
                    } else {
                        deferred.resolve();
                    }

                    promises.push(deferred.promise);
                });

                $q.all(promises).then(function() {

                    $.each(vm.bookingData, function(index, booking) {

                        // once loaded, service will return cached data
                        MenuService.loadMenu(booking).then(function(menus) {

                            // set menu data on booking item
                            booking.$menus = menus;
                            // set items grouped by section
                            booking.sectionsFiltered = MenuService.groupItemBySection(booking.$menus, booking.orders);
                        });
                    });

                    $AjaxInterceptor.complete();
                    $timeout(function() {

                        $scope.$broadcast('generateReportTrigger');
                    });
                }, function() {

                    $AjaxInterceptor.complete();
                    showErrorMsg();
                });
            }
        };

        // fetch booking data
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

                        deferred.resolve();

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

        function formatTime(time) {

            // remove miliseconds from the time string
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