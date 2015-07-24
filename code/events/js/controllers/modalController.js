(function(window, angular) {

    angular.module('events')
    .controller('ModalCtrl', ['$scope', '$timeout', 'items', '$rootScope', '$log',
        function($scope, $timeout, items, $rootScope, $log) {

            var vm = this,
                schedInit = false,
                slotInit = false;

            vm.outletLocations = items.outletLocations;
            vm.activeTab = 1;
            vm.totalTabs = 3;

            vm.date = new Date();
            vm.minDate = new Date();
            vm.events = [];
            vm.months = [];
            vm.selectedDays = [];

            vm.validation = false;

            for (var i=0; i<=12; i++) {

                var newMonth = moment().utc().startOf('month').add(i, 'M');
                var newDate = {
                    date: newMonth,
                    valueOf: newMonth.valueOf(),
                    text: newMonth.format('MMMM YYYY'),
                    value: {
                        month: newMonth.month(),
                        year: newMonth.year()
                    }
                };

                vm.months.push(newDate);
            }

            $scope.$watch(function(){
                return vm.date;
            }, function(){
                vm.currentMonth = moment(vm.date).utc().startOf('month').valueOf();
                // UtilsService.selfApply($scope);
            });

            vm.eventObj = items.eventObj || {};
            vm.schedules = {freq: 'ONCE', startDate: '', endDate: ''};
            vm.slots = [{end: '', eventId: '', leadTime: '', name: '', start: '', step: '', startFactor: '-1', endFactor: '-1', hasSteps: 'true'}];

            vm.next = function() {

                vm.validation = true;

                if(validateData(vm.activeTab)) {

                    vm.validation = false;

                    if(vm.activeTab < vm.totalTabs)
                        vm.activeTab++;

                    $timeout(function() {

                        if(vm.activeTab == 2 && !schedInit) {

                            schedInit = true;

                            $('.scheduleTab select').multiselect({
                                multiple: false,
                                header: false,
                                selectedList: 1,
                                minWidth: 342
                            });
                        }

                        if(vm.activeTab == 3 && !slotInit) {

                            slotInit = true;

                            initUiSlots();
                        }

                    }, 0);
                }
            };

            vm.previous = function() {

                if(vm.activeTab > 1)
                    vm.activeTab--;
            };

            vm.addSlot = function() {

                vm.slots.push({end: '', eventId: '', leadTime: '', name: '', start: '', step: '', startFactor: '-1', endFactor: '-1', hasSteps: 'true'});

                $timeout(function() {
                    initUiSlots();
                }, 0);
            };

            vm.changeMonth = function() {

                var dateMonth = moment(vm.currentMonth).utc();
                var current = moment(vm.date).utc();
                var dateString = dateMonth.format('YYYY-MM') + '-' + current.format('DD') + ' ' + current.format('HH:mm:ss');
                vm.date = new Date(dateString);
            };

            vm.move = function (direction) {

                $scope.$broadcast('$move', {direction: direction});
                // UtilsService.selfApply($scope);


                $timeout(function() {
                    $('select.titleMonth').multiselect('refresh');
                }, 1000);
            };

            vm.closeModal = function() {

                vm.validation = true;

                if(validateData(vm.activeTab)) {

                    vm.validation = false;

                    vm.eventObj.cSlots = configSlots(vm.slots);
                    vm.eventObj.schedules = configSchedules(vm.schedules, vm.selectedDays);
                    vm.eventObj.duration = configDuration(vm.eventObj);
                    vm.eventObj.date = vm.eventObj.schedules[0] ? vm.eventObj.schedules[0].startDate : '';

                    // return overflow on body
                    $(document.body).css('overflow', 'auto');

                    // close modal and return the event data
                    $scope.$close(vm.eventObj);
                }
            };

            function configSlots(slots) {

                var cSlots = [];

                slots.forEach(function(elem, index) {

                    cSlots.push({
                        name: elem.name,
                        start: !isNaN(elem.start) && elem.start != ''  ?  elem.start * elem.startFactor : '',
                        end: !isNaN(elem.end) && elem.end != ''  ?  elem.end * elem.endFactor : '',
                        step: elem.step,
                        leadTime: elem.leadTime
                    });
                });

                return cSlots;
            }

            function configSchedules(sched, selected) {

                var schedules = [];

                if(sched.freq != 'CUSTOM' && sched.startDate != '' && sched.startDate != '') {

                    var strStart = sched.startDate.split('/'),
                        startDate = new Date(strStart[2], strStart[1] - 1, strStart[0]).toISOString(),
                        strEnd = sched.endDate.split('/'),
                        endDate = new Date(strEnd[2], strEnd[1] - 1, strEnd[0]).toISOString();

                    schedules = [{
                        freq: sched.freq,
                        startDate: startDate.substr(0, startDate.length - 1),
                        endDate: endDate.substr(0, startDate.length - 1)
                    }];
                }
                else {

                    selected.sortBy(function(o){ return o });

                    selected.forEach(function(elem, index) {

                        var customDate = new Date(elem).toISOString();

                        schedules.push({
                            freq: 'ONCE',
                            startDate: customDate.substr(0, customDate.length - 1),
                            endDate: customDate.substr(0, customDate.length - 1)
                        });
                    });
                }


                return schedules;
            }

            function configDuration(eventObj) {

                var days = isNaN(eventObj.days) ? 0 : Number(eventObj.days),
                    hours = isNaN(eventObj.hours) ? 0 : Number(eventObj.hours),
                    minutes = isNaN(eventObj.minutes) ? 0 : Number(eventObj.minutes),
                    duration = (days * 24 * 60) + (hours * 60) + minutes;

                return duration;
            }

            // config ui components for adding collection slot
            function initUiSlots() {

                $('.ct-slots').last().find('select').multiselect({
                    multiple: false,
                    header: false,
                    selectedList: 1,
                    minWidth: 342
                });

                $('.ct-slots').last().find('.slotName').autocomplete({
                    source: [
                        _tr("Collection Slot: Pre-Show"),
                        _tr("Collection Slot: Pre-Game"),
                        _tr("Collection Slot: Interval"),
                        _tr("Collection Slot: Second-Interval"),
                        _tr("Collection Slot: Half-Time"),
                        _tr("Collection Slot: Post-Show"),
                        _tr("Collection Slot: Post-Game")
                    ],
                    delay: 10,
                    minLength: 0,
                    select: function(evt, ui) {

                        // workaround to apply value on model by ui element
                        vm.slots[evt.target.attributes['data-index'].value].name = ui.item.value;
                        $scope.$apply();
                    },
                    position: { my: "left top", at: "left bottom", collision: "none", of: $('.ct-slots').last().find('.slotName')}
                });
            }

            // validate required fields based on active tab
            function validateData(activeTab) {

                var isValid = true;

                switch(activeTab) {
                    case 1:
                        if(!vm.eventObj.name || !vm.eventObj.starttime)
                            isValid = false;
                    break;

                    case 2:
                        if(((vm.schedules.startDate == '' || vm.schedules.endDate == '') && vm.schedules.freq != 'CUSTOM') || ((vm.schedules.freq == 'CUSTOM' && vm.selectedDays.length == 0)))
                            isValid = false;
                    break;

                    case 3:
                        vm.slots.some(function(slot, index) {

                            if(slot.name != '' && slot.leadTime != '') {

                                if((slot.start != '' && slot.end != '' && slot.step != '') || (slot.start == '' && slot.end == '' && slot.step == ''))
                                    isValid = true;
                                else {

                                    if(slot.start == '')
                                        slot.startError = true;
                                    if(slot.end == '')
                                        slot.endError = true;
                                    if(slot.step == '')
                                        slot.stepError = true;

                                    isValid = false;
                                    return true;
                                }
                            }
                            else {

                                isValid = false;
                                return true;
                            }


                            return false;
                        });
                    break;
                }

                return isValid;
            }

            function _init() {

                $('.schedStartDate').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});
                $('.schedEndDate').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});
                $('.startTime').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });

                $('select.titleMonth').multiselect({
                    multiple: false,
                    header: false,
                    selectedList: 1,
                    minWidth: 342
                });

                $('.infoTab select').multiselect({
                    multiple: false,
                    header: false,
                    selectedList: 1,
                    minWidth: 342
                });
            }

            $timeout(_init, 0);
        }]);

}(window, angular));