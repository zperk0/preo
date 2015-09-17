(function(window, angular) {

    angular.module('bookingSettings')
    .controller('BookingSettingsCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$AjaxInterceptor', 'BookingSettings',
        function($scope, $rootScope, $timeout, $q, $AjaxInterceptor, BookingSettings) {

        var vm = this,
            noSettingsSaved = false;

        vm.invalidForm = false;

        vm.save = function() {

            var data = {
                restaurantName: vm.restaurantName,
                lockDays: vm.lockDays || '',
                reminderDays: vm.reminderDays || ''
            };

            if(!validateData()) {
                vm.invalidForm = true;
                return;
            }

            $AjaxInterceptor.start();

            if(noSettingsSaved)
                BookingSettings.save(data).then(function(result) {

                    $AjaxInterceptor.complete();
                });
            else
                BookingSettings.update(data).then(function(result) {

                    $AjaxInterceptor.complete();
                });
        }

        vm.isInvalidNumber = function(input) {
            return isNaN(input);
        };

        function validateData() {

            var isValid = true;

            if(vm.isInvalidNumber(vm.reminderDays))
                isValid = false;

            if(vm.isInvalidNumber(vm.lockDays))
                isValid = false;

            return isValid;
        }

        function _init() {

            $rootScope.requests = 0;
            $AjaxInterceptor.start();

            BookingSettings.getSettings().then(function(result) {

                var data = result.data || {};

                vm.restaurantName = data.restaurantName || '';
                vm.reminderDays = data.reminderDays || '';
                vm.lockDays = data.lockDays || '';
                $AjaxInterceptor.complete();
            }, function() {

                noSettingsSaved = true;
                $AjaxInterceptor.complete();
            });
        }

        $timeout(_init);
    }]);

}(window, angular));