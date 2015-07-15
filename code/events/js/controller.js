(function(window, angular) {

    angular.module('events')
    .controller('EventsCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID', 'Events', 'CollectionSlots', '$AjaxInterceptor', '$modal', function($scope, $rootScope, $timeout, $q, VENUE_ID, Events, CollectionSlots, $AjaxInterceptor, $modal) {
        
        var vm = this,
            submitTime = 0;

        $rootScope.requests = 0;
        $AjaxInterceptor.start();

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

                console.log(result);

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

                    // get slots from the event
                    CollectionSlots.get(elem).then(function(resp) {

                        // console.log(resp)

                        var slots = resp || [];
                        elem.cSlots = [];

                        // console.log(slots)
                        if(slots.length == 0)
                            elem.cSlots.push({
                                end: '', eventId: '', leadTime: '', name: '', start: '', step: ''
                            })
                        else
                            slots.forEach(function(e, i) {

                                // elem.cSlots.push({
                                //     collectionslot: e.collectionslot,
                                //     leadtime: e.leadTime
                                // });
                                elem.cSlots.push(e);
                                elem.collectionCount = i;
                            });

                        defer.resolve();
                    }, function(result) {
                        //something went wrong on API
                        // console.error(result);
                        console.error('Error getting slots from API: ' + result.data.message);
                        
                        // resolving the promise just to bind the events on scope
                        defer.resolve(result.data);
                        // defer.reject(result.data);
                    });

                    arrPromises.push(defer.promise);
                });

                $q.all(arrPromises).then(function() {

                    vm.events = events;

                    // Wait to finish ng-repeat
                    $timeout(function() {

                        //now we add datepicker
                        $('.eventTDDate input').fdatepicker({format: 'dd/mm/yyyy'});

                        //now we add timepicker
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });

                        $("input[name^=eTime]").on('changeTime',function() {

                            currTime = $(this).val()+":00";
                            newTime = extractAMPM("January 01, 2000 "+currTime);                            
                            $(this).parents('table').find("input[name^=eETime]").timepicker('remove');
                            $(this).parents('table').find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                            $(this).parents('table').find("input[name^=eETime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
                            $(this).parents('table').find("input[name^=eETime]").timepicker('setTime', newTime);
                        });

                        $AjaxInterceptor.complete();
                    }, 0);

                    vm.redirectFlag = 0;
                    vm.event_edit_on = 1;
                });
            }, function(data) {
                //something went wrong on API
                console.error(data);
                console.error('Error getting events from API:' + data.message);
                vm.redirectFlag = 1;
                vm.event_edit_on = 0;
            });
        }

        vm.addEvent = function() {

            var modalInstance = $modal.open({
                templateUrl: '/code/events/partials/modal-event.php',
                controller: 'ModalCtrl as modal'/*,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }*/
            });

            modalInstance.result.then(function (selectedItem) {
                // $scope.selected = selectedItem;
                console.log(selectedItem);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });

            // var obj = {
            //     cSlots: [{
            //         end: '', eventId: '', leadTime: '', name: '', start: '', step: ''
            //     }]
            // };

            // vm.events.push(obj);

            // $timeout(function() {

            //     $('.eventTDEdit').last().click();

            //     var $newTab = $('.eventTable').last();

            //     // //now we add datepicker
            //     $newTab.find(".eventTDDate input").fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}}); 
                
            //     // //now we add timepicker
            //     $newTab.find("input[name^=eTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
            //     $newTab.find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
                
            //     $newTab.find("input[name^=eTime]").on('changeTime',function() {

            //         currTime = $(this).val()+":00";
                    
            //         newTime = extractAMPM("January 01, 2000 "+currTime);
                    
            //         $(this).parents('table').find("input[name^=eETime]").timepicker('remove');
            //         $(this).parents('table').find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
            //         $(this).parents('table').find("input[name^=eETime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
            //         $(this).parents('table').find("input[name^=eETime]").timepicker('setTime', newTime);
            //     });

            //     $newTab.css('backgroundColor','#fafafa');
            //     $newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
            //     $newTab.css('max-width', '100%'); 
                
            //     // //hide it so we can animate it!
            //     // $newTab.css('display','none');
                
            //     // //insert before section header/before hidden div
            //     // $(".firstEventDiv").before($newTab); 
            //     // $newTab.slideRow('down');

            //     if(!$newTab.find('.eventSave').is(':visible')) $newTab.find('.eventTDEdit').trigger('click');
            //     $("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
            // }, 0)
        };

        vm.save = function() {

            var newSubmitTime = new Date().getTime();

            if((newSubmitTime - submitTime) > 300) {
                
                vm.isSaving = true;

                var arrPromises = [];

                // console.log('EVENTS TO SAVE: ', vm.events);

                // create/update event
                vm.events.forEach(function(elem, index) {
                    
                    var data = formatData(angular.copy(elem)),
                        deferred = $q.defer();

                    console.log(elem)

                    // edit old
                    if(elem.id && !String(elem.id).match('/^e.*$/')) {

                        console.log(elem)

                        // console.log('EDIT: ' + elem.id, data);
                        Events.update(elem, data).then(function(result) {

                            console.log(result);
                            configSlots(result, elem, deferred);

                        }, function(result) {
                            console.error('Error saving event. ');
                            console.log(result);
                            deferred.resolve(result);
                        });
                    }
                    // create new
                    else {

                        // console.log('Create EVENT: ', data);
                        Events.create(data).then(function(result) {

                            console.log(result);
                            configSlots(result, elem, deferred);

                        }, function(result) {
                            console.error('Error saving event. ');
                            console.log(result);
                            deferred.resolve(result);
                        });
                    }

                    arrPromises.push(deferred.promise);
                });
                
                // wait for all event promises to be resolved
                $q.all(arrPromises).then(function() {

                    vm.isSaving = false;
                    // console.log(arguments);
                }, function() {

                    vm.isSaving = false;
                    // console.log(arguments);
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

            if(evt.date.indexOf('/') != -1) {

                var date = evt.date.split('/');
                dateToEdit = new Date(date[2], date[1] - 1, date[0]);
            }
            else
                dateToEdit = new Date(evt.date);

            var year = dateToEdit.getUTCFullYear(),
                month = dateToEdit.getUTCMonth(),
                day = dateToEdit.getUTCDate(),
                starttimeStr = evt.starttime.split(':'),
                endtimeStr = evt.endtime.split(':'),
                finalStartTime = new Date(year, month, day, starttimeStr[0], starttimeStr[1]),
                finalEndTime = new Date(year, month, day, endtimeStr[0], endtimeStr[1]);


            if (evt.hasOwnProperty('outletLocationId') && evt.outletLocationId !== 'undefined')
                data.outletLocationId = evt.outletLocationId;

            data.duration = getEventDuration(finalStartTime.getTime(), finalEndTime.getTime());
            data.schedules = [
                {
                    freq: 'ONCE',
                    startDate: year + '-' + pad(String(Number(month) + 1), 2) + '-' + pad(String(day), 2) + 'T' + evt.starttime + ':00',
                    endDate: year + '-' + pad(String(Number(month) + 1), 2) + '-' + pad(String(day), 2) + 'T' + evt.endtime + ':00'
                }
            ];

            return data;
        }

        function getEventDuration(startHours, endHours){

            var diffMs = (endHours - startHours);
            var diffMins = Math.round(diffMs / 60000); // minutes

            return diffMins;
        }

        function configSlots(eventObj, elem, defer) {


            
            //kill all eb-times items for thie event
            eventObj.deleteSlots().then(function() {

                var slotsPromises = [];
                console.log('event id ' + eventObj.id)
                console.log(elem)

                if(elem.cSlots.length > 0) {

                    //just add as previous ones are wiped clean by now!
                    elem.cSlots.forEach(function(e, i) {
                    
                        // console.log('eventObj.id: ' + eventObj.id, e);
                        e.eventId = eventObj.id;
                        // post slots
                        slotsPromises.push(CollectionSlots.create(e));
                        
                    });

                    // all slots posted, resolve the promise
                    $q.all(slotsPromises).then(defer.resolve);
                }
                else
                    defer.resolve();

            }, function(result) {
                console.log(result);
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