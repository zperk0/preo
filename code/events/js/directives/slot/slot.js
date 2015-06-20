'use strict';

angular.module('events')
.directive('slot', [function() {
    return {
        templateUrl: '/code/events/js/directives/slot/slot.php',
        restrict: 'E',
        replace: true,
        scope: {
            slot: '=element',
            event_index: '=countevent',
            slot_index: '=countslot'
        },
        link: function(ng, elem, attrs) {
            
        }
    };
}]);