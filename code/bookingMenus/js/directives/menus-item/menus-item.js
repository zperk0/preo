'use strict';

angular.module('bookingMenus')
.directive('menusItem', ['$timeout', '$q', '$rootScope', 'gettextCatalog', 'BookingMenusService',
    function($timeout, $q, $rootScope, gettextCatalog, BookingMenusService) {

    return {
        templateUrl: '/code/bookingMenus/js/directives/menus-item/menus-item.php',
        restrict: 'A',
        replace: true,
        scope: {
            menu: '=element'
        },
        link: function(ng, elem, attrs) {

            ng.editItem = function(menuId) {

                window.location.href = '/menus/' + ng.menu.id;
            };

            // Duplicate event
            ng.duplicateItem = function(menuItem, event) {

                var newMenu = angular.copy(menuItem);

                console.log('Make api request...');

                BookingMenusService.save(newMenu).then(
                    function() { // success

                        $rootScope.$broadcast('duplicateItemMenu', newMenu);
                    }, function() { // error

                        noty({
                            type: 'error',  layout: 'topCenter',
                            text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                        });
                    });

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

                                    $rootScope.$broadcast('removeItemMenu', menuItem);
                        //     }, function() { // error

                        //         noty({
                        //             type: 'error',  layout: 'topCenter',
                        //             text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                        //         });
                        //     });


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