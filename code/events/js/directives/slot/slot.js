'use strict';

angular.module('events')
.directive('slot', ['$timeout', function($timeout) {
    return {
        templateUrl: '/code/events/js/directives/slot/slot.php',
        restrict: 'A',
        replace: true,
        scope: {
            slots: '=elements',
            event_index: '=countevent'
        },
        link: function(ng, elem, attrs) {

            ng.add = function() {

                // add new slot
                ng.slots.push({
                    collectionslot: 'PREGAME',
                    leadtime: ''
                });

                $timeout(function() {

                    // multiselect ui
                    var select = $(elem.context.parentElement).find('select').last();
                    select.multiselect({
                        multiple: false,
                        header: false,
                        noneSelectedText: _tr("Choose a Collection Slot"),
                        selectedList: 1,
                        minWidth: 342
                     });

                    // scroll body to the new slot position
                    $("html, body").animate({scrollTop: select.closest('tr').offset().top - ( $(window).height() - select.closest('tr').outerHeight(true) ) / 2}, 200);
                }, 0);
            };
            
            ng.delete =  function(elem) {

                // search for slot to delete
                ng.slots.some(function(e, i) {
                    
                    if(elem == e) {

                        ng.slots.splice(i, 1);
                        return true;
                    }
                    return false;
                });
            };
        }
    };
}]);