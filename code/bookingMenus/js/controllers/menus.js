(function(window, angular) {

    angular.module('bookingMenus')
    .controller('MenusCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingMenusService',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingMenusService) {

        var vm = this;

        var fakeData = [
            {
                name: 'Menus name 1',
                description: 'Something',
                promotions: [
                    {
                        name: 'Promotion name 1'
                    },
                    {
                        name: 'Promotion name 2'
                    }
                ]
            },
            {
                name: 'Menus name 2',
                description: 'Something',
                promotions: [
                    {
                        name: 'Promotion name 1'
                    },
                    {
                        name: 'Promotion name 2'
                    },
                    {
                        name: 'Promotion name 3'
                    },
                    {
                        name: 'Promotion name 4'
                    },
                    {
                        name: 'Promotion name 5'
                    },
                    {
                        name: 'Promotion name 6'
                    }
                ]
            },
            {
                name: 'Menus name 3',
                description: 'Something',
                promotions: [
                    {
                        name: 'Promotion name 1'
                    },
                    {
                        name: 'Promotion name 2'
                    }
                ]
            }
        ];

        vm.createMenu = function() {
            window.location.href = '/newMenu';
        }

        function duplicateItemMenu(evt, data) {

            vm.menusData.push(data);
        }

        function removeItemMenu(evt, data) {

            for(var x in vm.menusData) {
                if(vm.menusData[x] == data){
                    vm.menusData.splice(x, 1);
                    break;
                }
            }

            $scope.$apply();
        }

        function _init() {

            $rootScope.requests = 0;
            // $AjaxInterceptor.start();

            // BookingMenusService.getMenus().then(function() {

            //     vm.menusData = result.data;
            //     $AjaxInterceptor.complete();
            // });

            vm.menusData = fakeData;

            $scope.$on('duplicateItemMenu', duplicateItemMenu);
            $scope.$on('removeItemMenu', removeItemMenu);
        }

        $timeout(_init);
    }]);

}(window, angular));