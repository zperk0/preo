(function(window, angular) {

    angular.module('bookingSettings')
    .controller('BookingSettingsCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$AjaxInterceptor', 'BookingSettings', 'gettextCatalog',
        function($scope, $rootScope, $timeout, $q, $AjaxInterceptor, BookingSettings, gettextCatalog) {

        var vm = this,
            noSettingsSaved = false;

        vm.invalidForm = false;

        vm.save = function() {

            if(!validateData()) {
                vm.invalidForm = true;
                return;
            }

            var data = {
                restaurantName: vm.settings.restaurantName || '',
                lockDays: vm.settings.lockDays || '',
                reminderDays: vm.settings.reminderDays || ''
            };

            $AjaxInterceptor.start();

            if(noSettingsSaved) {

                BookingSettings.save(data).then(function(result) {

                    // bind jscore instance
                    vm.settings = result;
                    $AjaxInterceptor.complete();
                    showSuccessMsg();
                }, function() {

                    $AjaxInterceptor.complete();
                    showErrorMsg();
                });
            } else {

                BookingSettings.update(vm.settings, data).then(function(result) {

                    $AjaxInterceptor.complete();
                    showSuccessMsg();
                }, function() {

                    $AjaxInterceptor.complete();
                    showErrorMsg();
                });
            }
        }

        vm.isInvalidNumber = function(input) {
            return isNaN(input);
        };

        function validateData() {

            var isValid = true;

            if(vm.settings) {

                if(!vm.settings.restaurantName || vm.settings.restaurantName == '')
                    isValid = false;

                if(vm.isInvalidNumber(vm.settings.reminderDays) || vm.settings.restaurantName == '')
                    isValid = false;

                if(vm.isInvalidNumber(vm.settings.lockDays) || vm.settings.restaurantName == '')
                    isValid = false;
            } else {
                isValid = false;
            }

            return isValid;
        }

        function showSuccessMsg() {

            noty({
                type: 'success',
                text: gettextCatalog.getString('Booking settings has been saved!')
            });
        }

        function showErrorMsg() {

            noty({
                type: 'error',  layout: 'topCenter',
                text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
            });
        }

        function _init() {

            $rootScope.requests = 0;
            $AjaxInterceptor.start();

            BookingSettings.getSettings().then(function(result) {

                var data = result || {};

                vm.settings = data;
                $AjaxInterceptor.complete();
            }, function(result) {

                // no settings saved
                if(result.status == 404)
                    noSettingsSaved = true;
                else
                    showErrorMsg();

                $AjaxInterceptor.complete();
            });
        }

        $timeout(_init);
    }]);

}(window, angular));