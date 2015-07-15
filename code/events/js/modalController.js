(function(window, angular) {

    angular.module('events')
    .controller('ModalCtrl', ['$scope',
        function($scope) {
        
            var vm = this;
            vm.activeTab = 1;
            vm.totalTabs = 4;

            vm.date = new Date();
            vm.minDate = new Date();
            vm.events = [];

            vm.eventObj = {};
            vm.slots = [{end: '', eventId: '', leadTime: '', name: '', start: '', step: ''}];
            vm.schedules = [{freq: 'ONCE', startDate: '', endDate: ''}];
            
            vm.next = function() {

                if(vm.activeTab < vm.totalTabs) 
                    vm.activeTab++;
            };

            vm.previous = function() {

                if(vm.activeTab > 1)
                    vm.activeTab--;
            };

            vm.addSlot = function() {

                vm.slots.push({end: '', eventId: '', leadTime: '', name: '', start: '', step: ''});
            };

            vm.addSchedule = function() {

                vm.schedules.push({end: '', eventId: '', leadTime: '', name: '', start: '', step: ''});
            };

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

            vm.closeModal = function() {

                vm.eventObj.cSlots = vm.slots;
                vm.eventObj.schedules = vm.schedules;

                $scope.$close(vm.eventObj);
            };

            function _init() {


            }
            
            _init();
        }]);

}(window, angular));