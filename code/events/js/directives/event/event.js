'use strict';

angular.module('events')
.directive('event', ['$timeout', function($timeout) {

    return {
        templateUrl: '/code/events/js/directives/event/event.php',
        restrict: 'E',
        replace: true,
        scope: {
            events: '=elements',
            outletLocations: '=outlet'
        },
        link: function(ng, elem, attrs) {

            ng.expandOptions = function(event) {

                var curItem = $(event.currentTarget).closest('table'),
                    isEditButton = $(event.currentTarget).hasClass('eventTDEdit');

                if(!$(event.currentTarget).attr('readonly') && !isEditButton) // not expand again when clicking on input
                    return;
                
                // hide edit button
                if(isEditButton) $(event.currentTarget).hide();
                else $(event.currentTarget).closest('table').find('.eventTDEdit').hide();

                curItem.find("tr").addClass('eventEdit');
                curItem.find("tr").removeClass('savedInput');
                curItem.find("input").removeAttr("readonly");
                curItem.find(".eventSave").removeClass('hide');
                curItem.find(".eventSave").show();
                curItem.find(".optionTR").slideRow('down');
                curItem.css('background', '#fafafa');
                curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
                curItem.css('max-width', '100%');

                // multiselect ui
                curItem.find("td.eventTDCollection select").multiselect({
                    multiple: false,
                    header: false,
                    noneSelectedText: _tr("Choose a Collection Slot"),
                    selectedList: 1,
                    minWidth: 342
                });

                // multiselect ui
                curItem.find("td.eventTDOutletLocation select").multiselect({
                    multiple: false,
                    header: false,
                    noneSelectedText: _tr("Choose Event Location"),
                    selectedList: 1,
                    minWidth: 342
                });
            };

            ng.collapseOptions = function(event) {

                var button = $(event.currentTarget),
                    curItem = button.closest('table');

                button.hide();

                curItem.find("tr").removeClass('eventEdit');
                curItem.find("tr").addClass('savedInput');
                curItem.find("input").attr("readonly", "readonly");
                curItem.find(".eventTDEdit").removeClass('hide');
                curItem.find(".eventTDEdit").show();
                curItem.find(".optionTR").slideRow('up');
                curItem.css('background', 'transparent');
                curItem.css('box-shadow', '0px 0px 0px');
                curItem.css('max-width', '100%');
            };

            // Format date to show on table (DD/MM/YYYY)
            ng.formatDate = function(str_date) {

                var date = new Date(str_date),
                    formatted = str_date ? date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() : '';

                return formatted;
            };

            // Format time to show on table (HH:MM)
            ng.formatTime = function(str_time) {

                var date = new Date(str_time),
                    formatted = str_time ? date.getHours() + ':' + date.getMinutes() : '';

                return formatted;
            };
        }
    };
}]);