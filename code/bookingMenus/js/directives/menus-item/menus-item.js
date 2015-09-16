'use strict';

angular.module('bookingMenus')
.directive('menusItem', ['$timeout', '$q', '$rootScope', 'gettextCatalog',
    function($timeout, $q, $rootScope, gettextCatalog) {

    return {
        templateUrl: '/code/bookingMenus/js/directives/menus-item/menus-item.php',
        restrict: 'A',
        replace: true,
        scope: {
            menu: '=element'
        },
        link: function(ng, elem, attrs) {

            ng.editItem = function(menuId) {

                window.location.href = '/menus/' + menuId;
            };

            // Duplicate event
            ng.duplicateItem = function(menuItem, event) {

                var newMenu = angular.copy(menuItem);
                newMenu.id = '';

                console.log('Make api request...');

                // BookingMenusService.save(newMenu).then(
                //     function() { // success

                //     }, function() { // error

                //         noty({
                //             type: 'error',  layout: 'topCenter',
                //             text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                //         });
                //     });

                $rootScope.$broadcast('duplicateItemMenu', newMenu);
            };

            // Delete event
            ng.removeItem = function(menuItem) {

                var menuId = menuItem.id; // id from DB

                noty({
                    layout: 'center',
                    type: 'confirm',
                    text: gettextCatalog.getString('Are you sure you want to delete this menu? Note: all menu data will be lost!'),
                    buttons: [
                    {addClass: 'alert tiny', text: gettextCatalog.getString('Yes, delete this menu!'), onClick: function($noty) {

                        console.log('Make api request...')
                        // BookingMenusService.remove(menuId).then(
                        //     function() { // success

                        //     }, function() { // error

                        //         noty({
                        //             type: 'error',  layout: 'topCenter',
                        //             text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                        //         });
                        //     });

                        $rootScope.$broadcast('removeItemMenu', menuItem);

                        $noty.close();
                      }
                    },
                    {addClass: 'secondary tiny', text: gettextCatalog.getString('No, go back.'), onClick: function($noty) {
                        $noty.close();
                      }
                    }
                  ]
                });
            };
        }
    };
}]);