'use strict';

angular.module('events')
.directive('event', ['$timeout', '$q', '$rootScope', 'Events', function($timeout, $q, $rootScope, Events) {

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


                    $newTab.find(".optionTR .eventTDCollection input").each(function(key, value) {
                            $(this).autocomplete({
                                source: slots,
                                select: function(event,ui){
                                    console.log('here',event, ui)
                                    $(event.target).val(ui.item.key);
                                }, delay: 10, minLength: 0,position: { my: "left top", at: "left bottom", collision: "none" } });
                    });


                    if(!$newTab.find('.eventSave').is(':visible')) $newTab.find('.eventTDEdit').trigger('click');
                    $("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
                }, 0);

                /*OLD CODE*/
                // var button = event.currentTarget;

                // //new item or duplicate?
                // var dup = 0;
                // if($(button).hasClass("eventDuplicate")) dup = 1;
                // var $oldTab, $newTab;
                // //get table event number
                // var $curTable = $(button).closest('table');
                // var eventID = $curTable.attr('id');
                
                // //get and update current count
                // var eventCount = $("#eventCount").val();
                // var newCount = parseInt(parseInt(eventCount) + 1);
                // $("#eventCount").val(newCount);
                // $("#eventCountAct").val(parseInt($("#eventCountAct").val())+1);
                
                // if(dup) //clone an existing row
                // {
                //     //create variables and insert
                //     var $newOCount = $("#"+eventID+"_optionCount").clone(true);
                //     $newOCount.attr('id','event'+newCount+'_optionCount');
                //     $newOCount.attr('name','event'+newCount+'_optionCount');
                //     var $newOCountAct = $("#"+eventID+"_optionCountAct").clone(true);
                //     $newOCountAct.attr('id','event'+newCount+'_optionCountAct');
                //     $newOCountAct.attr('name','event'+newCount+'_optionCountAct');
                //     $("#"+eventID+"_optionCountAct").after($newOCountAct);
                //     $("#"+eventID+"_optionCountAct").after($newOCount);
                
                //     //clone specific table
                //     $oldTab = $("#"+eventID);           
                //     $newTab = $("#"+eventID).clone(false);
                //     $newTab.attr('id','event'+newCount);
                // }
                // else //clone a dummy row
                // {
                //     //create variables and insert
                //     var $newOCount = $("#event0_optionCount").clone(true);
                //     $newOCount.attr('id','event'+newCount+'_optionCount');
                //     $newOCount.attr('name','event'+newCount+'_optionCount');
                //     $newOCount.val(1);
                //     var $newOCountAct = $("#event0_optionCountAct").clone(true);
                //     $newOCountAct.attr('id','event'+newCount+'_optionCountAct');
                //     $newOCountAct.attr('name','event'+newCount+'_optionCountAct');
                //     $newOCountAct.val(1);
                //     $("#event0_optionCountAct").after($newOCountAct);
                //     $("#event0_optionCountAct").after($newOCount);
                    
                //     //clone dummy table
                //     $newTab = $("#event0").clone(true);
                //     $newTab.attr('id','event'+newCount);
                // }
                
                // //Replace ids with incremented value and make value = default value
                // $newTab.find(".eventTR input").each(function() {
                //     if(!dup) $(this).val( $(this).prop("defaultValue") );
                //     var tempName = $(this).attr('name');
                //     var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
                //     $(this).attr('name', newName);
                // });
                
                // //Replace ids with incremented value and make value = default value
                // $newTab.find(".optionTR .eventTDCollection input").each(function(key, value) {
                //     if(!dup) $(this).val( $(this).prop("defaultValue") );
                //     var tempName = $(this).attr('name');
                //     var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
                //     newName = newName.replace(/\[\d+\]/gi, "["+(key+1)+"]");
                //     $(this).attr('name', newName);
                // });

                // //Replace ids with incremented value and make value = default value
                // $newTab.find(".optionTR .eventTDLead input").each(function(key, value) {
                //     if(!dup) $(this).val( $(this).prop("defaultValue") );
                //     var tempName = $(this).attr('name');
                //     var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
                //     newName = newName.replace(/\[\d+\]/gi, "["+(key+1)+"]");
                //     $(this).attr('name', newName);
                // });
                
                // //remove multiselect
                // if(dup) $newTab.find(".ui-multiselect").remove();



                // //Replace ids with incremented value and make value = default value + add multiselect
                // $newTab.find(".optionTR .eventTDOutletLocation select").each(function(key, value) {
                //     if(!dup) $(this).val( $(this).prop("defaultValue") );
                //     if ($oldTab) $(this).val($oldTab.find(".optionTR .eventTDOutletLocation select").val());
                //     var tempName = $(this).attr('name');            
                //     var newName = tempName.replace(/event\d+/gi, 'event'+newCount);         
                //     newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");           
                //     $(this).attr('name', newName);

                //     $(this).multiselect({
                //        multiple: false,
                //        header: false,
                //        noneSelectedText: _tr("Choose Event Location"),
                //        selectedList: 1,
                //        minWidth: 342
                //     }); 
                // });
                
                // if(!dup){
                //     //now we fix placeholder
                //     $newTab.find("input[name^=eName]").each(function() {
                //         var temp = $(this).val();
                //         $(this).val("");
                //         $(this).attr('placeholder', temp);
                //     });
                    
                //     //now we fix placeholder
                //     $newTab.find("input[name^=eTime]").each(function() {
                //         var temp = $(this).val();
                //         $(this).val("");
                //         $(this).attr('placeholder', temp);
                //         $(this).attr('pattern', "\\d\\d:\\d\\d");
                //     });
                    
                //     //now we fix placeholder
                //     $newTab.find("input[name^=eETime]").each(function() {
                //         var temp = $(this).val();
                //         $(this).val("");
                //         $(this).attr('placeholder', temp);
                //         $(this).attr('pattern', "\\d\\d:\\d\\d");
                //     });
                    
                //     //now we fix placeholder
                //     $newTab.find("input[name^=eDate]").each(function() {
                //         var temp = $(this).val();
                //         $(this).val("");
                //         $(this).attr('placeholder', temp);
                //         $(this).attr('pattern', "^\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d$");
                //     });
                    
                //     //now we fix placeholder
                //     $newTab.find("input[name^=eLead]").each(function() {
                //         var temp = $(this).val();
                //         $(this).val("");
                //         $(this).attr('placeholder', temp);
                //     });
                // }
                
                // //now we fix eID
                // $newTab.find("input[name^=eID]").val("e"+newCount);
                        
                // //now we give the item id to the duplicate button
                // $newTab.find(".eventDuplicate").attr('id',"dup"+newCount);
                
                // var $newTab = $('.eventTable').last();

                // // //now we add datepicker
                // $newTab.find(".eventTDDate input").fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}}); 
                
                // // //now we add timepicker
                // $newTab.find("input[name^=eTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
                // $newTab.find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
                
                // $newTab.css('backgroundColor','#fafafa');
                // $newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
                // $newTab.css('max-width', '100%'); 
                
                // // //hide it so we can animate it!
                // // $newTab.css('display','none');
                
                // // //insert before section header/before hidden div
                // // $(".firstEventDiv").before($newTab); 
                // // $newTab.slideRow('down');


                // $newTab.find(".optionTR .eventTDCollection input").each(function(key, value) {
                //         $(this).autocomplete({
                //             source: slots,
                //             select: function(event,ui){
                //                 console.log('here',event, ui)
                //                 $(event.target).val(ui.item.key);
                //             }, delay: 10, minLength: 0,position: { my: "left top", at: "left bottom", collision: "none" } });
                // });


                // if(!$newTab.find('.eventSave').is(':visible')) $newTab.find('.eventTDEdit').trigger('click');
                // $("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
            };

            // Delete event
            ng.delete = function(eventToDelete) {

                var realEventID = eventToDelete.id; // id from DB

                console.log(realEventID);
                
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
                            

                            console.log('Make api request...')
                            Events.deleteEvent(eventToDelete).then(
                                function() { // success

                                    console.log(arguments);
                                    removeEventFromList(eventToDelete);
                                }, function() { // error
                                    
                                    noty({
                                        type: 'error',  layout: 'topCenter',
                                        text: _tr("Sorry, but there's been an error processing your request.")
                                    });
                                });

                            /*OLD CODE*/
                            // var url = "/deleteEvent";
                            // $.ajax({
                            //        type: "POST",
                            //        url: url,
                            //        data: 'eventID='+realEventID, // serializes the form's elements.
                            //        success: function(data)
                            //        {
                            //             try {
                            //                 var dataArray = jQuery.parseJSON(data); //parsing JSON
                            //             }
                            //             catch(e) {
                                            
                            //                 noty({
                            //                   type: 'error',  layout: 'topCenter',
                            //                   text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
                            //                 });
                                            
                            //                 return false;
                            //             }
                                            
                            //             removeEventFromList(eventToDelete);
                            //         }
                            //      });
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
            ng.formatDate = function(str_date) {

                var date = new Date(str_date),
                    formatted = str_date ? pad(String(date.getUTCDate()), 2) + '/' + pad(String(date.getUTCMonth() + 1), 2) + '/' + date.getUTCFullYear() : '';

                return formatted;
            };
        }
    };
}]);