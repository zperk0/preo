(function(window, angular) {

    angular.module('events')
    .controller('EventsCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID', 'Events', 'CollectionSlots', '$AjaxInterceptor', '$modal', '$log',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, Events, CollectionSlots, $AjaxInterceptor, $modal, $log) {

        var vm = this,
            submitTime = 0;

        function _init() {

            $rootScope.requests = 0;
            $AjaxInterceptor.start();

            _getEvents();
            _getOutletLocations();

            $scope.$on('updateEvent', updateEvent);
        }

        function _getEvents() {

            var oneDay = 24 * 60 * 60 * 1000,
                date = new Date(),
                interval = 7,
                firstDate = new Date(date.getTime() - (oneDay * interval)),
                filter = firstDate.getFullYear() + '/' + (firstDate.getMonth() + 1) + '/' + firstDate.getDate();

            // get events from the last 7 days (interval)
            Events.get(filter).then(function(result) {

                var events = result || [],
                    arrPromises = [];

                //get slots and expand schedule
                events.forEach(function(elem, index) {

                    var sched = elem.schedules,
                        defer = $q.defer();

                    // decode schedule
                    if (sched.length > 0) {

                        elem.date = sched[0].startDate;
                        elem.starttime = formatTime(sched[0].startDate);
                        elem.endtime = formatTime(sched[0].endDate);
                    }
                    // clousure for getting the slot from the right event
                    (function(_event) {

                        // get slots from the event
                        CollectionSlots.get(_event).then(function(resp) {

                            // $log.log(resp)

                            var slots = resp || [];
                            _event.cSlots = [];

                            if(slots.length == 0)
                                _event.cSlots.push({
                                    end: '', eventId: '', leadTime: '', name: '', start: '', step: ''
                                });
                            else
                                slots.forEach(function(e, i) {

                                    _event.cSlots.push(e);
                                    _event.collectionCount = i;
                                });

                            defer.resolve();
                        }, function(result) {
                            //something went wrong on API
                            // console.error(result);
                            // console.error('Error getting slots from API: ' + result.data.message);

                            // resolving the promise just to bind the events on scope
                            defer.resolve(result.data);
                            // defer.reject(result.data);
                        });
                    }(elem));

                    arrPromises.push(defer.promise);
                });

                $q.all(arrPromises).then(function() {

                    vm.events = events;

                    // Wait to finish ng-repeat
                    $timeout(function() {

                        $AjaxInterceptor.complete();
                    }, 0);

                    vm.redirectFlag = 0;
                    vm.event_edit_on = 1;
                });
            }, function(data) {
                //something went wrong on API
                // console.error(data);
                // console.error('Error getting events from API:' + data.message);
                vm.redirectFlag = 1;
                vm.event_edit_on = 0;
            });
        }

        vm.addEvent = function() {

            var modalInstance = $modal.open({
                templateUrl: '/code/events/partials/modal-event.php',
                controller: 'ModalCtrl as modal',
                resolve: {
                    items: function () {
                        return {
                            outletLocations: vm.outletLocations
                        };
                    }
                }
            });

            modalInstance.result.then(function (eventData) {

                // $log.log(eventData);
                var deferred = $q.defer();
                var data = formatData(angular.copy(eventData));

                $rootScope.requests = 0;
                $AjaxInterceptor.start();

                Events.create(data).then(function(result) {

                    console.log('event ok (create) ', result);
                    // $log.log(result);
                    configSlots(result, eventData, deferred);

                }, function(result) {
                    console.error('Error saving event. ');
                    // $log.log(result);
                    deferred.resolve(result);
                });

                deferred.promise.then(function() {

                    // console.log('all done');
                    vm.events.push(eventData);
                    $AjaxInterceptor.complete();
                });
            }, function () {

                // $log.log('Modal dismissed at: ' + new Date());
                $(document.body).css('overflow', 'auto');
            });

            $(document.body).css('overflow', 'hidden');
        };

        vm.save = function() {

            $('small.error').hide();

            var valid = false;

            $('.eventTable').each(function(i, e) {

                var startElem = $(e).find('.eventTDStart'),
                    endElem = $(e).find('.eventTDEnd'),
                    stepElem = $(e).find('.eventTDStep');

                if((startElem.find('input').val() == '' && endElem.find('input').val() == '' && stepElem.find('input').val() == '') ||
                   (startElem.find('input').val() != '' && endElem.find('input').val() != '' && stepElem.find('input').val() != ''))
                    valid = true;
                else {

                    $timeout(function() {
                        if($(e).find('.eventTDEdit').css('display') != 'none')
                            $(e).find('.eventTDEdit').click();
                    },0);

                    if(startElem.find('input').val() == '')
                        startElem.find('small.error').show();
                    if(endElem.find('input').val() == '')
                        endElem.find('small.error').show();
                    if(stepElem.find('input').val() == '')
                        stepElem.find('small.error').show();

                    valid = false;
                    return false;
                }
            });

            if(!valid)
                return false;

            var newSubmitTime = new Date().getTime();

            if((newSubmitTime - submitTime) > 300) {

                var arrPromises = [];

                vm.isSaving = true;

                // $log.log('EVENTS TO SAVE: ', vm.events);
                // $log.log('total events: ' + vm.events.length)

                // create/update event
                vm.events.forEach(function(elem, index) {

                    var data = formatData(angular.copy(elem)),
                        deferred = $q.defer();

                    // edit old
                    if(elem.id && !String(elem.id).match('/^e.*$/')) {

                        // $log.log('EDIT: ' + elem.id, data);
                        Events.update(elem, data).then(function(result) {

                            // $log.log('event ok (update)');
                            // $log.log(result);
                            configSlots(result, elem, deferred);

                        }, function(result) {
                            // console.error('Error saving event. ');
                            // $log.log(result);
                            deferred.resolve(result);
                        });
                    }
                    // create new
                    else {

                        // $log.log('Create EVENT: ', data);
                        Events.create(data).then(function(result) {

                            // $log.log('event ok (create) ');
                            // $log.log(result);
                            configSlots(result, elem, deferred);

                        }, function(result) {
                            // console.error('Error saving event. ');
                            // $log.log(result);
                            deferred.resolve(result);
                        });
                    }

                    arrPromises.push(deferred.promise);
                });

                // $log.log('total promises events: ' + vm.events.length)

                // wait for all event promises to be resolved
                $q.all(arrPromises).then(function() {

                    // $log.log('All finished')
                    vm.isSaving = false;
                }, function() {

                    // $log.log('All finished - error')
                    vm.isSaving = false;
                });

                // save last submit time
                submitTime = new Date().getTime();
            }
        }

        function formatData(evt) {

            var dateToEdit = null,
                data = {
                    venueId: VENUE_ID,
                    name: evt.name,
                    description: evt.description,
                    visible: evt.visible || 1
                };

            if(typeof evt.date == 'string') {

                var date = evt.date.split('/');
                dateToEdit = new Date(date[2], date[1] - 1, date[0]);
            }
            else
                dateToEdit = new Date(evt.date);

            if (evt.hasOwnProperty('outletLocationId') && evt.outletLocationId !== 'undefined')
                data.outletLocationId = evt.outletLocationId;

            data.duration = evt.duration;
            data.schedules = evt.schedules;

            return data;
        }

        function updateEvent(event, data) {

            var deferred = $q.defer();
            var dataToUpdate = formatData(angular.copy(data.evtData));

            $rootScope.requests = 0;
            $AjaxInterceptor.start();

            Events.update(data.evtData, dataToUpdate).then(function(result) {

                $log.log('event ok (update)');
                // $log.log(result);
                configSlots(result, data.evtData, deferred);

            }, function(result) {
                console.error('Error saving event. ');
                // $log.log(result);
                deferred.resolve(result);
            });

            deferred.promise.then(function() {

                console.log('all done');
                $AjaxInterceptor.complete();
            });
        }

        function getEventDuration(startHours, endHours){

            var diffMs = (endHours - startHours);
            var diffMins = Math.round(diffMs / 60000); // minutes

            return diffMins;
        }

        function configSlots(eventObj, elem, defer) {

            // $log.log('total slots: ' + elem.cSlots.length)

            //kill all eb-times items for thie event
            eventObj.deleteSlots().then(function() {

                var slotsPromises = [];
                // $log.log('event id ' + eventObj.id)
                // $log.log(elem)

                if(elem.cSlots.length > 0) {

                    //just add as previous ones are wiped clean by now!
                    elem.cSlots.forEach(function(e, i) {

                        var deferred = $q.defer();

                        // $log.log('eventObj.id: ' + eventObj.id, e);
                        e.eventId = eventObj.id;
                        // post slots
                        CollectionSlots.create(e).then(function() {

                            // $log.log('slot ok ' + i);
                            deferred.resolve();
                        }, function(data) {

                            // $log.log('slot error ');
                            // $log.log(data);

                            deferred.reject();
                        });;

                        slotsPromises.push(deferred.promise);
                    });

                    // all slots posted, resolve the promise
                    $q.all(slotsPromises).then(defer.resolve);
                }
                else {
                    // $log.log('event slot ok - no slots')
                    defer.resolve();
                }

            }, function(result) {
                // $log.log(result);
                defer.reject(result)
            }); //venue_eb_times data deleted

        }

        function formatTime(str_time) {

            var date = new Date(str_time),
                formatted = str_time ? pad(date.getUTCHours(), 2) + ':' + pad(date.getUTCMinutes(), 2) : '';

            return formatted;
        };

        function _getOutletLocations() {

            Events.getOutletLocations().then(function(result) {

                var outletLocations = result.data,
                    sorted = sortLocations(outletLocations);

                vm.outletLocations = getOutletLocationSelectOptions(sorted);
            });
        }

        function getAllChildren(list, parent){

            var allChildren = [];

            list.forEach(function(elem, index) {
                if(elem.parent == parent.id && elem.id != elem.parent) {

                    elem.children = getAllChildren(list, elem);
                    allChildren.push(elem);
                }
            });

            return allChildren;
        }

        function removeLastChildren(list) {

            list.forEach(function(elem, index) {

                if(elem.children.length == 0){
                    list.splice(index, 1);
                } else {
                    elem.children = removeLastChildren(elem.children);
                }
            });

            return list;
        }

        function sortLocations(locations) {

            locations.sort(locations, function(a, b) { return a.path < b.path; });

            var sorted = [];
            locations.forEach(function(elem, index) {
                if(elem.parent == null && elem.id != null) {
                    elem.children = getAllChildren(locations, elem);
                    sorted.push(elem);
                }
            });

            return removeLastChildren(sorted);
        }

        function getOutletLocationSelectOptions(tree) {

            var output = [];

            tree.forEach(function(elem, index) {

                indentNodeForSelect(elem, 1, output);
            });

            return output;
        }

        function indentNodeForSelect(node, indent, output){

            var children = node.children,
                formattedChild = {
                    id: node.id,
                    name: str_repeat("--", indent) + ' ' + node.name
                };

            output.push(formattedChild);

            children.forEach(function(elem, index) {

                indentNodeForSelect(elem, (indent+1), output);
            });
        }

        // Utils - format string
        window.pad = function(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
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

        // Utils - repeat string
        function str_repeat(input, multiplier) {

            var y = '';
            while (true) {
                if (multiplier & 1) {
                    y += input;
                }
                multiplier >>= 1;
                if (multiplier) {
                    input += input;
                }
                else {
                    break;
                }
            }
            return y;
        }

        _init();
    }]);

}(window, angular));