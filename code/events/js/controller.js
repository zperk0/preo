(function(window, angular) {

    angular.module('events')
    .controller('EventsCtrl', function($scope, Events, $timeout, $q) {
        // get all events
        var vm = this;

        function _init() {
            _getEvents();
            _getOutletLocations();
        }

        function _getEvents() {

            var oneDay = 24 * 60 * 60 * 1000,
                date = new Date(),
                interval = 7,
                firstDate = new Date(date.getTime() - (oneDay * interval)),
                filter = firstDate.getFullYear() + '/' + (firstDate.getMonth() + 1) + '/' + firstDate.getDate();

            // get events from the last 7 days (interval)
            Events.get(filter).then(function(result) {

                var events = result.data || [],
                    arrPromises = [];

                //get slots and expand schedule
                events.forEach(function(elem, index) {

                    var sched = elem.schedules,
                        defer = $q.defer();
                    // decode schedule
                    if (sched.length > 0) {

                        elem.date = sched[0].startDate;
                        elem.starttime = sched[0].startDate;
                        elem.end = sched[0].endDate;
                    }

                    // get slots from the event
                    Events.getSlots(elem.id).then(function(resp) {

                        var slots = resp.data || [];
                        elem.cSlots = [];

                        slots.forEach(function(e, i) {

                            elem.cSlots.push({
                                collectionslot: e.collectionslot,
                                leadtime: e.leadtime
                            });
                            elem.collectionCount = i;
                        });

                        defer.resolve();
                    });

                    arrPromises.push(defer.promise);
                });

                $q.all(arrPromises).then(function() {

                    vm.events = events;
                    console.log(vm.events);

                    // Wait to finish ng-repeat
                    $timeout(function() {
                        //now we add datepicker
                        $('.eventTDDate input').fdatepicker({format: 'dd/mm/yyyy'});
                        //now we add timepicker
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                    }, 0);
                });
            }, function() {
                //something went wrong on API
                console.error('Error getting events from API.');
                vm.redirectFlag = 1;
            });
        }

        function _getOutletLocations() {

            Events.getOutletLocations().then(function(result) {

                var outletLocations = result.data;

                console.log(outletLocations)

                vm.outletLocations = outletLocations;
            }); 
        }
        // Format date to show on table (DD/MM/YYYY)
        vm.formatDate = function(str_date) {

            var date = new Date(str_date),
                formatted = str_date ? date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() : '';

            return formatted;
        };
        // Format time to show on table (HH:MM)
        vm.formatTime = function(str_time) {

            var date = new Date(str_time),
                formatted = str_time ? date.getHours() + ':' + date.getMinutes() : '';

            return formatted;
        };

        _init();
    });

}(window, angular));