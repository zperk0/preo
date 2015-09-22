(function(window, angular) {

'use scrict';

    angular.module('booking')
    .controller('BookingCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingService', 'PromotionService', 'MenuService', 'gettextCatalog', 'BookingSettingsService',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingService, PromotionService, MenuService, gettextCatalog, BookingSettingsService) {

        var vm = this,
            menu = null,
            promotions = null;

        

        vm.generateReport = function() {

            var promises = [],
                filter = {
                    startDate: vm.startDate,
                    endDate: vm.endDate
                };

            // console.log('Getting bookings from ', filter);

            $AjaxInterceptor.start();

            BookingService.getBookings(filter).then(function(result) {

                var bookings = result || [];

                console.log('bookings', bookings);

                for(var i = 0, totalBookings = bookings.length; i < totalBookings; i++) {

                    var doBooking = function (){
                        var deferred = $q.defer()/*,
                        bookingPromotion = PromotionService.getPromotionById(bookings[i].promotionId);*/
                        bookings[i].date = moment(bookings[i].date).format('DD/MM/YY');
                        bookings[i]['time'] = formatTime(bookings[i]['time']);
                        // bookings[i].$promotionName = bookingPromotion ? bookingPromotion.Name : '';
                        bookings[i].$promotionName = bookings[i].promotionId;

                        (function(defer, bk) {

                            bk.getMenu().then(function(data) {

                                console.log('menu', data);
                                bk.$menus = data;
                                bk.$sections = MenuService.groupItemBySection(bk.$menus, bk.orders);
                                console.log('menu', bk.$menus);

                                defer.resolve();
                            });
                        })(deferred, bookings[i]);
                        return deferred.promise;
                    }
                    
                    promises.push(doBooking);
                }

                if(bookings.length == 0) {
                    allDataLoaded();
                }

                $q.all(promises).then(allDataLoaded);

                function allDataLoaded(){

                    vm.bookingData = bookings;
                    $AjaxInterceptor.complete();
                }
            }, function() {

                showErrorMsg();
                $AjaxInterceptor.complete();
            });
        };

        vm.toggleDetails = function(index) {

            var details = $('.booking-details')[index];

            if($(details).css('display') == 'none')
                $(details).slideRow('down');
            else
                $(details).slideRow('up');
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

            BookingSettingsService.getSettings().then(function() {

                var startDate = $('.sched-start-date').fdatepicker({format:'dd/mm/yyyy'}).on('changeDate', function() { startDate.hide(); $('.sched-end-date').focus(); }).data('datepicker');
                var endDate = $('.sched-end-date').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() <= startDate.date.valueOf() ? 'disabled' : '';}}).data('datepicker');

                $AjaxInterceptor.complete();
                // PromotionService.getPromotions().then(function(data) {

                //     $AjaxInterceptor.complete();
                // }, function() {

                //     showErrorMsg();
                //     $AjaxInterceptor.complete();
                // });
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