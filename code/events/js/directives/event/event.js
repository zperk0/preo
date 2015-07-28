'use strict';

angular.module('events')
.directive('event', ['$timeout', '$q', '$rootScope', 'Events', '$modal', '$log', 'DateUtils', function($timeout, $q, $rootScope, Events, $modal, $log, DateUtils) {

    return {
        templateUrl: '/code/events/js/directives/event/event.php',
        restrict: 'E',
        replace: true,
        scope: {
            events: '=elements',
            outletLocations: '=outlet'
        },
        link: function(ng, elem, attrs) {

            // Expand options to edit event info
            ng.expandOptions = function(event, eventObj) {

                var modalInstance = $modal.open({
                    templateUrl: '/code/events/partials/modal-event.php',
                    controller: 'ModalCtrl as modal',
                    resolve: {
                        items: function () {
                            return {
                                outletLocations: ng.outletLocations,
                                eventObj: eventObj
                            };
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    // $scope.selected = selectedItem;
                    $log.log(selectedItem);
                    // vm.events.push(selectedItem);
                }, function () {
                    $log.log('Modal dismissed at: ' + new Date());
                    $(document.body).css('overflow', 'auto');
                });

                $(document.body).css('overflow', 'hidden');

                // var curItem = $(event.currentTarget).closest('table'),
                //     isEditButton = $(event.currentTarget).hasClass('eventTDEdit');

                // if(!$(event.currentTarget).attr('readonly') && !isEditButton) // not expand again when clicking on input
                //     return;

                // // hide edit button
                // if(isEditButton) $(event.currentTarget).hide();
                // else $(event.currentTarget).closest('table').find('.eventTDEdit').hide();

                // curItem.find("tr").addClass('eventEdit');
                // curItem.find("tr").removeClass('savedInput');
                // curItem.find("input").removeAttr("readonly");
                // curItem.find(".eventSave").removeClass('hide');
                // curItem.find(".eventSave").show();
                // curItem.find(".optionTR").slideRow('down');
                // curItem.css('background', '#fafafa');
                // curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
                // curItem.css('max-width', '100%');

                // // multiselect ui
                // // curItem.find("td.eventTDCollection select").multiselect({
                // //     multiple: false,
                // //     header: false,
                // //     noneSelectedText: _tr("Choose a Collection Slot"),
                // //     selectedList: 1,
                // //     minWidth: 342
                // // });

                // // autocomplete for slot name
                // curItem.find(".eventTDCollection .slotName").autocomplete({
                //     source: [
                //         _tr("Collection Slot: Pre-Show"),
                //         _tr("Collection Slot: Pre-Game"),
                //         _tr("Collection Slot: Interval"),
                //         _tr("Collection Slot: Second-Interval"),
                //         _tr("Collection Slot: Half-Time"),
                //         _tr("Collection Slot: Post-Show"),
                //         _tr("Collection Slot: Post-Game")
                //     ],
                //     delay: 10,
                //     minLength: 0,
                //     select: function(evt, ui) {

                //         var childIndex = ng.outletLocations.length > 0 ? 2 : 1;

                //         // workaround to apply value on model by ui element
                //         eventObj.cSlots[evt.target.parentElement.parentElement.rowIndex - childIndex].name = ui.item.value;
                //         ng.$apply();
                //     },
                //     position: { my: "left top", at: "left bottom", collision: "none", of: curItem.find(".eventTDCollection .slotName")}
                // });

                // // multiselect ui
                // curItem.find("td.eventTDOutletLocation select").multiselect({
                //     multiple: false,
                //     header: false,
                //     noneSelectedText:
                //     _tr("Choose Event Location"),
                //     selectedList: 1,
                //     minWidth: 342
                // });
            };

            // Collapse options and stop editing
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

            // Duplicate event
            ng.duplicate = function(objEvent, event) {

                var newEvent = angular.copy(objEvent);

                newEvent.id = '';
                ng.events.push(newEvent);

                $timeout(function() {

                    $('.eventTDEdit').last().click();

                    var $newTab = $('.eventTable').last();

                    // //now we add datepicker
                    $newTab.find(".eventTDDate input").fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}});

                    // //now we add timepicker
                    $newTab.find("input[name^=eTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                    $newTab.find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });

                    $newTab.css('backgroundColor','#fafafa');
                    $newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
                    $newTab.css('max-width', '100%');

                    // //hide it so we can animate it!
                    // $newTab.css('display','none');

                    // //insert before section header/before hidden div
                    // $(".firstEventDiv").before($newTab);
                    // $newTab.slideRow('down');

                    if(!$newTab.find('.eventSave').is(':visible')) $newTab.find('.eventTDEdit').trigger('click');
                    $("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
                }, 0);
            };

            // Delete event
            ng.delete = function(eventToDelete) {

                var realEventID = eventToDelete.id; // id from DB

                $log.log(realEventID);

                // event not saved in DB
                if(typeof realEventID =='undefined' || realEventID == '' || !String(realEventID).match(/^\d+?$/gi)) {
                    noty({
                        layout: 'center',
                        type: 'confirm',
                        text: _tr('Are you sure you want to delete this event? Note: all event data will be lost!'),
                        buttons: [
                        {addClass: 'alert tiny', text: _tr('Yes, delete this event!'), onClick: function($noty) {

                            removeEventFromList(eventToDelete);

                            $noty.close();
                          }
                        },
                        {addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
                            $noty.close();
                          }
                        }
                      ]
                    });
                }
                // event in DB
                else {
                    noty({
                        layout: 'center',
                        type: 'confirm',
                        text: _tr('Are you sure you want to delete this event? Note: all event data will be lost!'),
                        buttons: [
                        {addClass: 'alert tiny', text: _tr('Yes, delete this event!'), onClick: function($noty) {


                            $log.log('Make api request...')
                            Events.deleteEvent(eventToDelete).then(
                                function() { // success

                                    $log.log(arguments);
                                    removeEventFromList(eventToDelete);
                                }, function() { // error

                                    noty({
                                        type: 'error',  layout: 'topCenter',
                                        text: _tr("Sorry, but there's been an error processing your request.")
                                    });
                                });

                            $noty.close();
                          }
                        },
                        {addClass: 'secondary tiny', text: _tr('No, go back.'), onClick: function($noty) {
                            $noty.close();
                          }
                        }
                      ]
                    });
                }
            };

            // Remove event from scope
            function removeEventFromList(eventToDelete) {

                $rootScope.safeApply(function() {

                    ng.events.some(function(elem, index) {

                        if(elem == eventToDelete) {
                            ng.events.splice(index, 1);
                            return true;
                        }

                        return false;
                    });
                });
            }

            // Format date to show on table (DD/MM/YYYY)
            ng.formatDate = DateUtils.getStrDate;
            // ng.formatDate = function(str_date) {

            //     var date = new Date(str_date),
            //         formatted = str_date ? pad(String(date.getUTCDate()), 2) + '/' + pad(String(date.getUTCMonth() + 1), 2) + '/' + date.getUTCFullYear() : '';

            //     return formatted;
            // };
        }
    };
}]);