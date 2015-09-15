(function(window, angular) {

    angular.module('booking')
    .controller('BookingCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingService',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingService) {

        var vm = this;

        var bookingDataTest = [
            {
                promotion: 'Christmas dinner',
                date: '20/12/2015',
                time: '17:00',
                guests: 10,
                page: '',
                ordersPlaced: '7 of 10',
                clientData: {
                    identification: 'Apple',
                    name: 'Bob Bobson',
                    phone: '01234 56789',
                    email: 'bob.bobson@apple.com'
                },
                orders: [
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    }
                ]
            },
            {
                promotion: 'Christmas dinner',
                date: '20/12/2015',
                time: '17:00',
                guests: 10,
                page: '',
                ordersPlaced: '7 of 10',
                clientData: {
                    identification: 'Apple',
                    name: 'Bob Bobson',
                    phone: '01234 56789',
                    email: 'bob.bobson@apple.com'
                },
                orders: [
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    }
                ]
            },
            {
                promotion: 'Christmas dinner',
                date: '20/12/2015',
                time: '17:00',
                guests: 10,
                page: '',
                ordersPlaced: '7 of 10',
                clientData: {
                    identification: 'Apple',
                    name: 'Bob Bobson',
                    phone: '01234 56789',
                    email: 'bob.bobson@apple.com'
                },
                orders: [
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    },
                    {
                        name: 'Section name',
                        dishes: [
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 1
                            },
                            {
                                name: 'Dish name',
                                qty: 5
                            },
                            {
                                name: 'Dish name',
                                qty: 2
                            },
                            {
                                name: 'Dish name',
                                qty: 3
                            }
                        ]
                    }
                ]
            },

        ];

        vm.generateReport = function() {

            var filter = {
                startDate: vm.startDate,
                endDate: vm.endDate
            };

            console.log('Getting bookings from ', filter);

            $AjaxInterceptor.start();

            // TODO: uncomment when api is ready
            // BookingService.getBookings(filter).then(function(result) {
            //     console.log('result', result);
            //     vm.bookingData = result.data;
            // });

            vm.bookingData = bookingDataTest;

            $timeout(function() {

                $AjaxInterceptor.complete();
            }, 500);
        };

        vm.toggleDetails = function(index) {

            var details = $('.booking-details')[index];

            if($(details).css('display') == 'none')
                $(details).slideRow('down');
            else
                $(details).slideRow('up');
        };

        function _init() {

            $rootScope.requests = 0;

            $('.sched-start-date').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});
            $('.sched-end-date').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});
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