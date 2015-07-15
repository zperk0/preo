(function(window, angular) {

    angular.module('events')
    .controller('ModalCtrl', ['$scope',
        function($scope) {
        
            var vm = this;
            vm.activeTab = 1;
            vm.eventObj = {};
            vm.slots = [{end: '', eventId: '', leadTime: '', name: '', start: '', step: ''}];
            vm.schedules = [{freq: 'ONCE', startDate: '', endDate: ''}];

            // cSlots: [{
            //     end: '', eventId: '', leadTime: '', name: '', start: '', step: ''
            // }]
            
            vm.next = function() {

                if(vm.activeTab < 3) 
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