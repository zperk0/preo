'use strict';

angular.module('events')
.directive('event', [ function() {
    return {
        templateUrl: '/code/events/js/directives/event/event.php',
        restrict: 'E',
        replace: true,
        scope: {
            event: '=element',
            index: '=count'
        },
        link: function(ng, elem, attrs) {
            
        }
    };
}]);