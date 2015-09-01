(function(window, angular) {

    angular.module('events')
    .controller('ModalCtrl', ['$scope', '$timeout', 'items', '$rootScope', '$log', 'DateUtils', 'gettextCatalog',
        function($scope, $timeout, items, $rootScope, $log, DateUtils, gettextCatalog) {

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

            vm.frequencies = {
                once: gettextCatalog.getString('ONCE'),
                daily: gettextCatalog.getString('DAILY'),
                weekly: gettextCatalog.getString('WEEKLY'),
                monthly: gettextCatalog.getString('MONTHLY'),
                yearly: gettextCatalog.getString('YEARLY'),
                custom: gettextCatalog.getString('CUSTOM')
            };

            vm.strings = {
                after: gettextCatalog.getString('after'),
                before: gettextCatalog.getString('before'),
                is: gettextCatalog.getString('is'),
                is_not: gettextCatalog.getString('is not'),
                all_locations: gettextCatalog.getString('All Locations')
            }

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
            }, refreshCurrentMonth);

            vm.eventObj = items.eventObj || {name: '', description: '', starttime: '', days: '', hours: '', minutes: ''};
            vm.schedules = {freq: 'ONCE', startDate: '', endDate: ''};
            vm.slots = [{eventId: '', startFactor: '-1', endFactor: '-1', hasSteps: 'true'}];

            // configure event data if we are editing an event
            if(items.eventObj) {

                if(items.eventObj.duration){

                    items.eventObj.days = Math.floor(items.eventObj.duration / 24 / 60);
                    items.eventObj.hours = Math.floor(items.eventObj.duration / 60 % 24);
                    items.eventObj.minutes = Math.floor(items.eventObj.duration % 60);
                }

                if(items.eventObj.schedules.length > 0) {

                    if(items.eventObj.schedules.length > 1) {

                        vm.schedules.freq = 'CUSTOM';

                        items.eventObj.schedules.forEach(function(elem, index) {
                            var date = new Date(elem.startDate);

                            vm.selectedDays.push(date);
                        });
                    }
                    else {

                        vm.schedules = {
                            freq: items.eventObj.schedules[0].freq,
                            startDate: DateUtils.getStrDate(items.eventObj.schedules[0].startDate),
                            endDate: DateUtils.getStrDate(items.eventObj.schedules[0].endDate)
                        }
                    }
                }

                if(items.eventObj.cSlots) {

                    vm.slots = [];
                    // vm.slots = items.eventObj.cSlots;
                    items.eventObj.cSlots.forEach(function(slot, index) {

                        vm.slots.push({
                            end: slot.end != null ? Math.abs(slot.end) : '',
                            eventId: slot.eventId,
                            leadTime: slot.leadTime,
                            name: slot.name,
                            start: slot.start != null ? Math.abs(slot.start) : '',
                            step: slot.step,
                            startFactor: slot.start < 0 || slot.start == null ? -1 : 1,
                            endFactor: slot.end < 0 || slot.end == null ? -1 : 1,
                            hasSteps: slot.step != null ? 'true' : 'false'
                        });
                    });
                }
            }

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

                vm.slots.push({eventId: '', startFactor: '-1', endFactor: '-1', hasSteps: 'true'});

                $timeout(function() {
                    initUiSlots();
                });
            };

            vm.deleteSlot = function(elem) {

                // search for slot to delete
                vm.slots.some(function(e, i) {

                    if(elem == e) {

                        vm.slots.splice(i, 1);
                        return true;
                    }
                    return false;
                });
            };

            vm.changeMonth = function() {

                var dateMonth = moment(vm.currentMonth).utc();
                var current = moment(vm.date).utc();
                var dateString = dateMonth.format('YYYY-MM') + '-' + current.format('DD') + ' ' + current.format('HH:mm:ss');
                vm.date = new Date(dateString);
            };

            vm.move = function (direction) {

                $scope.$broadcast('$move', {direction: direction});

                refreshCurrentMonth();
            };

            vm.closeModal = function() {

                vm.validation = true;

                if(validateData(vm.activeTab)) {

                    vm.validation = false;

                    vm.eventObj.cSlots = configSlots(vm.slots);
                    vm.eventObj.schedules = configSchedules(vm.schedules, vm.selectedDays, vm.eventObj.starttime);
                    vm.eventObj.duration = configDuration(vm.eventObj);
                    vm.eventObj.date = vm.eventObj.schedules[0] ? vm.eventObj.schedules[0].startDate : '';

                    console.log(vm.eventObj.date)

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

            function configSchedules(sched, selected, starttime) {

                var schedules = [],
                    hours = starttime.substr(0, starttime.indexOf(':')),
                    minutes = starttime.substr(starttime.indexOf(':') + 1);

                // regular schedules
                if(sched.freq != 'CUSTOM' && sched.startDate != '' && sched.endDate != '') {

                    var strStart = sched.startDate.split('/'),
                        startDate = moment.utc([strStart[2], strStart[1] - 1, strStart[0], hours, minutes]).format('YYYY-MM-DDTHH:mm:ss'),
                        strEnd = sched.endDate.split('/'),
                        endDate = moment.utc([strEnd[2], strEnd[1] - 1, strEnd[0], hours, minutes]).format('YYYY-MM-DDTHH:mm:ss');

                    schedules = [{
                        freq: sched.freq,
                        startDate: startDate,
                        endDate: endDate
                    }];
                }
                // CUSTOM schedule
                else {

                    // order schedules by date
                    selected.sortBy(function(o){ return o });

                    selected.forEach(function(elem, index) {

                        var customDate = moment.utc(elem);

                        // set start time
                        customDate.hours(hours);
                        customDate.minutes(minutes);
                        customDate = customDate.format('YYYY-MM-DDTHH:mm:ss');

                        schedules.push({
                            freq: 'ONCE',
                            startDate: customDate,
                            endDate: customDate
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

                $('.ct-slots').find('select').multiselect({
                    multiple: false,
                    header: false,
                    selectedList: 1,
                    minWidth: 342
                });

                $('.ct-slots').find('.slotName').each(function() {
                    $(this).autocomplete({
                        source: [
                            gettextCatalog.getString("Pre-Show"),
                            gettextCatalog.getString("Pre-Game"),
                            gettextCatalog.getString("Interval"),
                            gettextCatalog.getString("Second-Interval"),
                            gettextCatalog.getString("Half-Time"),
                            gettextCatalog.getString("Post-Show"),
                            gettextCatalog.getString("Post-Game")
                        ],
                        delay: 10,
                        minLength: 0,
                        select: function(evt, ui) {

                            // workaround to apply value on model by ui element
                            vm.slots[evt.target.attributes['data-index'].value].name = ui.item.value;
                            $scope.$apply();
                        },
                        position: { my: "left top", at: "left bottom", collision: "none", of: $(this) }
                    });
                });

            }

            // validate required fields based on active tab
            function validateData(activeTab) {

                var isValid = true;

                switch(activeTab) {
                    case 1:
                        var pattern = /\d\d:\d\d/;

                        if(!vm.eventObj.name || !vm.eventObj.starttime || !pattern.test(vm.eventObj.starttime) || (vm.eventObj.days == '' && vm.eventObj.hours == '' && vm.eventObj.minutes == '') || isNaN(vm.eventObj.days) || isNaN(vm.eventObj.hours) || isNaN(vm.eventObj.minutes)) {

                            isValid = false;

                            if(!pattern.test(vm.eventObj.starttime))
                                vm.eventObj.starttime = '';
                        }
                    break;

                    case 2:

                        var pattern = /^\d\d\/\d\d\/\d\d\d\d$/;

                        if(((vm.schedules.startDate == '' || !pattern.test(vm.schedules.startDate) || vm.schedules.endDate == '' || !pattern.test(vm.schedules.endDate)) && vm.schedules.freq != 'CUSTOM') || ((vm.schedules.freq == 'CUSTOM' && vm.selectedDays.length == 0))) {

                            isValid = false;

                            // validate date pattern
                            if(!/^\d\d\/\d\d\/\d\d\d\d$/.test(vm.schedules.startDate))
                                vm.schedules.startDate = '';
                            if(!/^\d\d\/\d\d\/\d\d\d\d$/.test(vm.schedules.endDate))
                                vm.schedules.endDate = '';
                        }
                    break;

                    case 3:

                        // validate slot fields
                        vm.slots.some(function(slot, index) {

                            if(slot.name && slot.name != '' && (slot.leadTime && slot.leadTime != '' && !vm.isInvalidFormat(slot.leadTime) || slot.leadTime == 0)) {

                                if(((slot.start != '' && slot.start != null && !isNaN(slot.start)) && (slot.end != '' && slot.end != null && !isNaN(slot.end)) && (slot.step != '' && slot.step != null && !isNaN(slot.step)))
                                    || ((slot.start == '' || slot.start == null) && (slot.end == '' || slot.end == null) && (slot.step == '' || slot.step == null)))
                                    isValid = true;
                                else {

                                    if(slot.start == '')
                                        slot.startError = true;
                                    if(slot.end == '')
                                        slot.endError = true;
                                    if(slot.step == '' || slot.step == null) {

                                        slot.hasSteps = 'true';
                                        slot.stepError = true;

                                        $timeout(function() {

                                            $('.ct-slots').find('select').multiselect('refresh');
                                        });
                                    }

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

            vm.isInvalidFormat = function(data) {

                return isNaN(data);
            };

            function refreshCurrentMonth() {

                vm.currentMonth = moment(vm.date).utc().startOf('month').valueOf();
                $timeout(function() {
                    $('select.titleMonth').multiselect('refresh');
                });
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