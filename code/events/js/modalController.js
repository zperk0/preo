(function(window, angular) {

    angular.module('events')
    .controller('ModalCtrl', ['$scope', '$timeout', 'items',
        function($scope, $timeout, items) {
        
            var vm = this,
                schedInit = false,
                slotInit = false;

            vm.outletLocations = items;
            vm.activeTab = 1;
            vm.totalTabs = 3;

            // vm.date = new Date();
            vm.minDate = new Date();
            vm.events = [];
            vm.months = [];

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

            // $scope.$watch(function(){
                // return vm.date;
            // }, function(){
                vm.currentMonth = moment(vm.date).utc().startOf('month').valueOf();
                // UtilsService.selfApply($scope);
            // });


            vm.eventObj = {};
            vm.schedules = {freq: 'ONCE', startDate: '', endDate: ''};
            vm.slots = [{end: '', eventId: '', leadTime: '', name: '', start: '', step: '', startFactor: '-1', endFactor: '-1', hasSteps: 'true'}];
            
            vm.next = function() {

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

            // vm.addSchedule = function() {

            //     vm.schedules.push({end: '', eventId: '', leadTime: '', name: '', start: '', step: ''});
            // };

            vm.openEvent = function(events) {

              console.log('open here', events);
              // if (events.length) {
              //   vm.dayEvents = events;
              //   UtilsService.selfApply($scope);
              // } else {
              //   vm.dayEvents = null;
              //   UtilsService.selfApply($scope);
              // }
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
                });
            };

            vm.closeModal = function() {

                var cSlots = [],
                    schedules = [];

                vm.slots.forEach(function(elem, index) {
                    
                    cSlots.push({
                        name: elem.name,
                        start: elem.start * elem.startFactor,
                        end: elem.end * elem.endFactor,
                        step: elem.step,
                        leadTime: elem.leadTime
                    });
                });

                // vm.schedules.forEach(function(elem, index) {
                    
                //     schedules.push({
                //         name: elem.name,
                //         start: elem.start * elem.startFactor,
                //         end: elem.end * elem.endFactor,
                //         step: elem.step,
                //         leadtime: elem.leadtime
                //     });
                // });

                var strStart = vm.schedules.startDate.split('/'),
                    startDate = new Date(strStart[2], strStart[1] - 1, strStart[0]).toISOString(),
                    strEnd = vm.schedules.endDate.split('/'),
                    endDate = new Date(strEnd[2], strEnd[1] - 1, strEnd[0]).toISOString();
1
                // vm.schedules.startDate = startDate;
                // vm.schedules.endDate = endDate;

                vm.eventObj.cSlots = cSlots;
                vm.eventObj.schedules = [
                {
                    freq: vm.schedules.freq,
                    startDate: startDate.substr(0, startDate.length - 1),
                    endDate: endDate.substr(0, startDate.length - 1)
                }];

                console.log(vm.eventObj.schedules);

                var strDt = vm.schedules.startDate.split('/');
                var date = new Date(strDt[2], strDt[1] - 1, strDt[0]);

                vm.eventObj.date = date;

                console.log(isNaN(vm.eventObj.days));
                console.log(isNaN(vm.eventObj.hours));

                var days = isNaN(vm.eventObj.days) ? 0 : Number(vm.eventObj.days);
                var hours = isNaN(vm.eventObj.hours) ? 0 : Number(vm.eventObj.hours);
                var minutes = isNaN(vm.eventObj.minutes) ? 0 : Number(vm.eventObj.hours);

                console.log(days, hours)

                var duration = (days * 24 * 60) + (hours * 60) + minutes;
                vm.eventObj.duration = duration;

                console.log(duration);
                
                // return overflow on body
                $(document.body).css('overflow', 'auto');

                $scope.$close(vm.eventObj);
            };

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
                        
                        // // workaround to apply value on model by ui element
                        vm.slots[evt.target.attributes['data-index'].value].name = ui.item.value;
                        $scope.$apply();

                        // var childIndex = ng.outletLocations.length > 0 ? 2 : 1;

                        // eventObj.cSlots[evt.target.parentElement.parentElement.rowIndex - childIndex].name = ui.item.value;
                    },
                    position: { my: "left top", at: "left bottom", collision: "none", of: $('.ct-slots').last().find('.slotName')} 
                });
            }

            function _init() {

                $('.schedStartDate').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});
                $('.schedEndDate').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});
                $('.startTime').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });

                $('select.titleMonth').multiselect({
                // $('.ct-modal-event select').multiselect({
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