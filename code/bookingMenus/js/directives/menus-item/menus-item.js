'use strict';

angular.module('bookingMenus')
.directive('menusItem', ['$timeout', '$q', '$rootScope', 'gettextCatalog', 'BookingMenusService', '$AjaxInterceptor',
    function($timeout, $q, $rootScope, gettextCatalog, BookingMenusService, $AjaxInterceptor) {

    return {
        templateUrl: '/code/bookingMenus/js/directives/menus-item/menus-item.php',
        restrict: 'A',
        replace: true,
        scope: {
            menu: '=element',
            duplicateMenu: '=',
            removeMenu: '='
        },
        link: function(ng, elem, attrs) {

            ng.editItem = function(menuId) {

                window.location.href = '/editmenu/' + ng.menu.id;
            };

            // Duplicate event
            ng.duplicateItem = function(menuItem, event) {

                noty({
                    layout: 'center',
                    type: 'confirm',
                    text: gettextCatalog.getString('Are you sure you want to duplicate this menu? Note: You\'ll be redirect to edit the menu.'),
                    buttons: [
                    {addClass: 'alert tiny', text: gettextCatalog.getString('Yes, duplicate this menu!'), onClick: function($noty) {

                        var newMenu = angular.copy(menuItem);

                        // promotion id are limited to 1 menu
                        newMenu.promotions = [];

                        $AjaxInterceptor.start();
                        BookingMenusService.save(newMenu).then(
                            function(result) { // success

                                newMenu.id = result.data.menuid;
                                ng.duplicateMenu(newMenu);

                                $AjaxInterceptor.complete();
                            }, function() { // error

                                $AjaxInterceptor.complete();
                                noty({
                                    type: 'error',  layout: 'topCenter',
                                    text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                                });
                            });

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

            // Delete event
            ng.removeItem = function(menuItem) {

                var menuId = menuItem.id; // id from DB

                noty({
                    layout: 'center',
                    type: 'confirm',
                    text: gettextCatalog.getString('Are you sure you want to delete this menu? Note: all menu data will be lost!'),
                    buttons: [
                    {addClass: 'alert tiny', text: gettextCatalog.getString('Yes, delete this menu!'), onClick: function($noty) {

                        $AjaxInterceptor.start();
                        BookingMenusService.remove(menuId).then(
                            function() { // success

                                $AjaxInterceptor.complete();
                                ng.removeMenu(menuItem);
                            }, function() { // error

                                $AjaxInterceptor.complete();
                                noty({
                                    type: 'error',  layout: 'topCenter',
                                    text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                                });
                            });


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