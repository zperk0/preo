'use strict';

angular.module('events')
.directive('event', ['$timeout', '$q', '$rootScope', 'Events', '$modal', '$log', 'DateUtils', 'gettextCatalog',
    function($timeout, $q, $rootScope, Events, $modal, $log, DateUtils, gettextCatalog) {

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

                var eventSelected = $(event.currentTarget).closest('.eventTable'),
                    eventDateElem = eventSelected.find('.eventTDDate input');

                var modalInstance = $modal.open({
                    templateUrl: '/code/events/partials/modal-event.php',
                    controller: 'ModalCtrl as modal',
                    resolve: {
                        items: function () {
                            return {
                                outletLocations: ng.outletLocations,
                                eventObj: angular.copy(eventObj)
                            };
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    // $scope.selected = selectedItem;
                    $log.log(selectedItem);

                    angular.extend(eventObj, selectedItem);

                    if(selectedItem.id === '')
                        $rootScope.$broadcast('createEvent', {evtData: selectedItem, duplicating: true});
                    else
                        $rootScope.$broadcast('updateEvent', {evtData: selectedItem});

                    // update event date after the digest
                    $timeout(function() {
                        eventDateElem.val(DateUtils.getStrDate(selectedItem.date));
                    });
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                    $(document.body).css('overflow', 'auto');

                    // remove duplicated event if modal was dismissed
                    if(ng.isDuplicatingEvent) {

                        ng.events.splice((ng.events.length - 1), 1);
                        ng.isDuplicatingEvent = false;
                    }
                });

                $(document.body).css('overflow', 'hidden');
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

                ng.isDuplicatingEvent = true;

                $timeout(function() {

                    $('.eventTDEdit').last().click();

                    var $newTab = $('.eventTable').last();
                    $("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
                }, 0);
            };

            // Delete event
            ng.delete = function(eventToDelete) {

                var realEventID = eventToDelete.id; // id from DB

                // event not saved in DB
                if(typeof realEventID =='undefined' || realEventID == '' || !String(realEventID).match(/^\d+?$/gi)) {
                    noty({
                        layout: 'center',
                        type: 'confirm',
                        text: gettextCatalog.getString('Are you sure you want to delete this event? Note: all event data will be lost!'),
                        buttons: [
                        {addClass: 'alert tiny', text: gettextCatalog.getString('Yes, delete this event!'), onClick: function($noty) {

                            removeEventFromList(eventToDelete);

                            $noty.close();
                          }
                        },
                        {addClass: 'secondary tiny', text: gettextCatalog.getString('No, go back.'), onClick: function($noty) {
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
                        text: gettextCatalog.getString('Are you sure you want to delete this event? Note: all event data will be lost!'),
                        buttons: [
                        {addClass: 'alert tiny', text: gettextCatalog.getString('Yes, delete this event!'), onClick: function($noty) {


                            $log.log('Make api request...')
                            Events.deleteEvent(eventToDelete).then(
                                function() { // success

                                    $log.log(arguments);
                                    removeEventFromList(eventToDelete);
                                }, function() { // error

                                    noty({
                                        type: 'error',  layout: 'topCenter',
                                        text: gettextCatalog.getString("Sorry, but there's been an error processing your request.")
                                    });
                                });

                            $noty.close();
                          }
                        },
                        {addClass: 'secondary tiny', text: gettextCatalog.getString('No, go back.'), onClick: function($noty) {
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
        }
    };
}]);