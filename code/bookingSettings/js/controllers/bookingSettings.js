(function(window, angular) {

    angular.module('bookingSettings')
    .controller('BookingSettingsCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingSettings',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingSettings) {

        var vm = this;

        vm.save = function() {

            var data = {
                lockDays: vm.lockDays,
                reminderDays: vm.reminderDays
            };

            // $AjaxInterceptor.start();
            // TODO: uncomment to get group booking settings from api
            // BookingSettings.save(data).then(function(result) {

            //      $AjaxInterceptor.complete();
            // });
        }

        function _init() {

            $rootScope.requests = 0;
            // $AjaxInterceptor.start();
            // TODO: uncomment to get group booking settings from api
            // BookingSettings.getSettings().then(function(result) {

            //     var data = result.data || {};

            //     vm.reminderDays = data.reminderDays || '';
            //     vm.lockDays = data.locakDaysDays || '';
            //     $AjaxInterceptor.complete();
            // });
        }

        $timeout(_init);
    }]);

}(window, angular));