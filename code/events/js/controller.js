(function(window, angular) {

    angular.module('events')
    .controller('EventsCtrl', function($scope, $rootScope, Events, $timeout, $q) {
        // get all events
        var vm = this,
            submitTime = 0;

        function _init() {

            Preoday.User.auth({
                username: 'caio.ricci@gdcommunity.co.uk',
                password: '123456'
            }).then(function(user) {
                console.log('user logged', user);

                _getEvents();
                _getOutletLocations();
            });

            // _getEvents();
            // _getOutletLocations();
        }

        function _getEvents() {

            var oneDay = 24 * 60 * 60 * 1000,
                date = new Date(),
                interval = 7,
                firstDate = new Date(date.getTime() - (oneDay * interval)),
                filter = firstDate.getFullYear() + '/' + (firstDate.getMonth() + 1) + '/' + firstDate.getDate();

            // get events from the last 7 days (interval)
            Events.get(filter).then(function(result) {

                var events = result.data || [],
                    arrPromises = [];

                //get slots and expand schedule
                events.forEach(function(elem, index) {

                    var sched = elem.schedules,
                        defer = $q.defer();
                    // decode schedule
                    if (sched.length > 0) {

                        elem.date = sched[0].startDate;
                        elem.starttime = formatTime(sched[0].startDate);
                        elem.endtime = formatTime(sched[0].endDate);
                    }

                    // get slots from the event
                    Events.getSlots(elem.id).then(function(resp) {

                        var slots = resp.data || [];
                        elem.cSlots = [];

                        console.log(slots)

                        slots.forEach(function(e, i) {

                            elem.cSlots.push({
                                collectionslot: e.collectionslot,
                                leadtime: e.leadTime
                            });
                            elem.collectionCount = i;
                        });

                        defer.resolve();
                    });

                    arrPromises.push(defer.promise);
                });

                $q.all(arrPromises).then(function() {

                    vm.events = events;

                    // Wait to finish ng-repeat
                    $timeout(function() {

                        //now we add datepicker
                        $('.eventTDDate input').fdatepicker({format: 'dd/mm/yyyy'});

                        //now we add timepicker
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });

                        $("input[name^=eTime]").on('changeTime',function() {

                            currTime = $(this).val()+":00";
                            newTime = extractAMPM("January 01, 2000 "+currTime);                            
                            $(this).parents('table').find("input[name^=eETime]").timepicker('remove');
                            $(this).parents('table').find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                            $(this).parents('table').find("input[name^=eETime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
                            $(this).parents('table').find("input[name^=eETime]").timepicker('setTime', newTime);
                        });
                    }, 0);

                    vm.redirectFlag = 0;
                    vm.event_edit_on = 1;
                });
            }, function() {
                //something went wrong on API
                console.error('Error getting events from API.');
                vm.redirectFlag = 1;
                vm.event_edit_on = 0;
            });
        }

        vm.addEvent = function() {

            var obj = {
                cSlots: [{
                    collectionslot: 'PRESHOW',
                    leadtime: ''
                }]
            };

            vm.events.push(obj);

            $timeout(function() {

                $('.eventTDEdit').last().click();

                var $newTab = $('.eventTable').last();

                // //now we add datepicker
                $newTab.find(".eventTDDate input").fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}}); 
                
                // //now we add timepicker
                $newTab.find("input[name^=eTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
                $newTab.find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
                
                $newTab.find("input[name^=eTime]").on('changeTime',function() {

                    console.log('change time')

                    currTime = $(this).val()+":00";
                    
                    newTime = extractAMPM("January 01, 2000 "+currTime);
                    
                    $(this).parents('table').find("input[name^=eETime]").timepicker('remove');
                    $(this).parents('table').find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                    $(this).parents('table').find("input[name^=eETime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
                    $(this).parents('table').find("input[name^=eETime]").timepicker('setTime', newTime);
                });

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
            }, 0)
        };

        vm.save = function() {

            var newSubmitTime = new Date().getTime();

            if((newSubmitTime - submitTime) > 300) {
                
                vm.isSaving = true;

                Events.saveChanges(vm.events).then(function() {

                    vm.isSaving = false;
                    console.log(arguments);
                }, function() {

                    vm.isSaving = false;
                    console.log(arguments);
                });

                submitTime = new Date().getTime();
            }
            
            /*OLD CODE*/
            // //prevent multiple submissions
            // var newSubmitTime = new Date().getTime();
            
            // if( (newSubmitTime - submitTime) > 300 )
            // {
            //     //lock all
            //     $("body .eventSave").each(function(){
            //         if($(this).is(":visible"))
            //             $(this).trigger('click');
            //     });
                
                
            //     var url = "/saveEvent";
                
            //     $('#eventSubButton').hide();
            //     $('#savingButton').show();

            //     $.ajax({
            //        type: "POST",
            //        url: url,
            //        data: $(this).serialize(), // serializes the form's elements.
            //        success: function(data)
            //        {
            //             try
            //             {
            //                 var dataArray = jQuery.parseJSON(data); //parsing JSON
            //             }
            //             catch(e)
            //             {
            //                 noty({
            //                   type: 'error',  layout: 'topCenter',
            //                   text: _tr("Sorry, but there's been an error processing your request.") /*text: 'Connection Error! Check API endpoint.'*/
            //                 });
            //                 //alert(data);
            //                 return false;
            //             }
                        
            //             if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
            //             {
            //                 noty({
            //                   type: 'error',  layout: 'topCenter',
            //                   text: _tr("Sorry, but there's been an error processing your request.") /*text: dataArray['message']*/
            //                 });
                       
            //             }
            //             else
            //             {   
            //                 newIDs = dataArray['update'];

            //                 if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
            //                 {
            //                     $.each(newIDs, function(index, value) {
            //                       $('input[value='+index+']').val(value); //find by value and update!
            //                     });
            //                 }
                            
            //                 noty({ type: 'success', text: 'Event configuration has been saved!' });
            //                 if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/payment");}, 1000);
            //             }
            //         }
            //      }).done(function() {
            //         $('#eventSubButton').show();
            //         $('#savingButton').hide();
            //      });
            // }
            // //update Time
            // submitTime = new Date().getTime();
            // return false; // avoid to execute the actual submit of the form.
        }

        function formatTime(str_time) {

            var date = new Date(str_time),
                formatted = str_time ? pad(date.getUTCHours(), 2) + ':' + pad(date.getUTCMinutes(), 2) : '';

            return formatted;
        };

        function _getOutletLocations() {

            Events.getOutletLocations().then(function(result) {

                var outletLocations = result.data,
                    sorted = sortLocations(outletLocations);

                vm.outletLocations = getOutletLocationSelectOptions(sorted);
            }); 
        }

        function getAllChildren(list, parent){

            var allChildren = [];

            list.forEach(function(elem, index) {
                if(elem.parent == parent.id && elem.id != elem.parent) {

                    elem.children = getAllChildren(list, elem);
                    allChildren.push(elem);
                }
            });

            return allChildren;
        }

        function removeLastChildren(list) {

            list.forEach(function(elem, index) {

                if(elem.children.length == 0){
                    list.splice(index, 1);
                } else {
                    elem.children = removeLastChildren(elem.children);
                }
            });

            return list;
        }

        function sortLocations(locations) {

            locations.sort(locations, function(a, b) { return a.path < b.path; });

            var sorted = [];
            locations.forEach(function(elem, index) {
                if(elem.parent == null && elem.id != null) {
                    elem.children = getAllChildren(locations, elem);
                    sorted.push(elem);
                }
            });
            
            return removeLastChildren(sorted);
        }

        function getOutletLocationSelectOptions(tree) {
            
            var output = [];

            tree.forEach(function(elem, index) {

                indentNodeForSelect(elem, 1, output);
            });

            return output;
        }

        function indentNodeForSelect(node, indent, output){
            
            var children = node.children,
                formattedChild = {
                    id: node.id,
                    name: str_repeat("--", indent) + ' ' + node.name
                };       
            
            output.push(formattedChild);
            
            children.forEach(function(elem, index) {

                indentNodeForSelect(elem, (indent+1), output);
            });
        }

        // Utils - format string
        window.pad = function(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }

        // Utils - angular safe apply
        $rootScope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        // Utils - repeat string
        function str_repeat(input, multiplier) {
          
            var y = '';
            while (true) {
                if (multiplier & 1) {
                    y += input;
                } 
                multiplier >>= 1;
                if (multiplier) {
                    input += input;
                } 
                else {
                    break;
                } 
            } 
            return y;
        }
        
        _init();
    });

}(window, angular));