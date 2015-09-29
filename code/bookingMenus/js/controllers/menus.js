(function(window, angular) {

    angular.module('bookingMenus')
    .controller('MenusCtrl', ['$scope', '$rootScope', '$timeout', '$AjaxInterceptor', 'BookingMenusService', 'BookingSettingsService', 'gettextCatalog',
        function($scope, $rootScope, $timeout, $AjaxInterceptor, BookingMenusService, BookingSettingsService, gettextCatalog) {

        var vm = this;

        vm.createMenu = function() {
            window.location.href = '/newGroupMenu';
        }

        function duplicateItemMenu(evt, data) {

            vm.menusData.push(data);

            // redirect user to edit the menu duplicated with a message
            window.location.href = '/editmenu/' + data.id + '?duplicated=true';
        }

        function removeItemMenu(evt, data) {

            $rootScope.safeApply(function() {

                vm.menusData.splice(vm.menusData.indexOf(data), 1);
            });
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

                BookingMenusService.getMenus().then(function(data) {

                    vm.menusData = data || [];

                    for(var i = 0, total = vm.menusData.length; i < total; i++) {

                        vm.menusData[i].$promotions = vm.menusData[i].promotions;
                    }

                    $AjaxInterceptor.complete();
                }, function() {

                    $AjaxInterceptor.complete();
                    showErrorMsg();
                });

                $scope.$on('duplicateItemMenu', duplicateItemMenu);
                $scope.$on('removeItemMenu', removeItemMenu);
            }, function() {

                var noSettingMsg = gettextCatalog.getString('Please, setup the group booking settings first.');

                $AjaxInterceptor.complete();
                showErrorMsg(noSettingMsg);

                $timeout(function() {
                    window.location.href = '/bookingSettings'
                }, 2500);
            });
        }

        // Utils - angular safe apply
        $rootScope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $timeout(_init);
    }]);

}(window, angular));