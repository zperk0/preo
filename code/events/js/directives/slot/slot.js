'use strict';

angular.module('events')
.directive('slot', ['$timeout', '$log', function($timeout, $log) {
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

                var newSlot = {
                    end: '', eventId: '', leadTime: '', name: '', start: '', step: ''
                };

                // add new slot
                ng.slots.push(newSlot);

                $timeout(function() {

                    // multiselect ui
                    var select = $(elem.context.parentElement).find('select').last(),
                        inputName = $(elem.context.parentElement).find('.eventTDCollection .slotName').last();

                    $timeout(function() {
                        select.multiselect({
                            multiple: false,
                            header: false,
                            noneSelectedText: _tr("Choose a Collection Slot"),
                            selectedList: 1,
                            minWidth: 342
                        });

                        $log.log(inputName)

                        // autocomplete for slot name
                        inputName.autocomplete({
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

                                // apply value on model
                                newSlot.name = ui.item.value;
                                ng.$apply();
                            },
                            position: { my: "left top", at: "left bottom", collision: "none", of: inputName}
                        });
                    }, 0);

                    $(elem.context.parentElement).find(".optionTR").last()
                        .slideRow('down')
                        .addClass('eventEdit')
                        .removeClass('savedInput');

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