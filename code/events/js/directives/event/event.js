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
            
            ng.expandOptions = function() {

                $(document).on("click", ".eventTDEdit, .eventTR input[readonly='readonly']", function() {
                    
                    if($(this).hasClass('eventTDEdit')) $(this).hide();
                    else $(this).closest('table').find('.eventTDEdit').hide();
                    $curItem = $(this).closest('table');
                    $curItem.find("tr").addClass('eventEdit');
                    $curItem.find("tr").removeClass('savedInput');
                    $curItem.find("input").removeAttr("readonly");
                    $curItem.find(".eventSave").removeClass('hide');
                    $curItem.find(".eventSave").show();
                    $curItem.find(".optionTR").slideRow('down');
                    $curItem.css('background', '#fafafa');
                    $curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
                    $curItem.css('max-width', '100%');
                    
                    $curItem.find("td.eventTDCollection select").each(function() {
                        $(this).multiselect({
                           multiple: false,
                           header: false,
                           noneSelectedText: _tr("Choose a Collection Slot"),
                           selectedList: 1,
                           minWidth: 342
                        }); 
                    });

                    $curItem.find("td.eventTDOutletLocation select").each(function() {
                        $(this).multiselect({
                           multiple: false,
                           header: false,
                           noneSelectedText: _tr("Choose Event Location"),
                           selectedList: 1,
                           minWidth: 342
                        }) ; 
                    });
                });
            };
        }
    };
}]);