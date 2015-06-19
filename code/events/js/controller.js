(function(window, angular) {

    angular.module('events')
    .controller('EventsCtrl', function($scope, Events, $timeout, $q) {
        // get all events
        var vm = this;

        function _init() {
            _getEvents();
            _getOutletLocations();
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
                        elem.starttime = sched[0].startDate;
                        elem.end = sched[0].endDate;
                    }

                    // get slots from the event
                    Events.getSlots(elem.id).then(function(resp) {

                        var slots = resp.data || [];
                        elem.cSlots = [];

                        slots.forEach(function(e, i) {

                            elem.cSlots.push({
                                collectionslot: e.collectionslot,
                                leadtime: e.leadtime
                            });
                            elem.collectionCount = i;
                        });

                        defer.resolve();
                    });

                    arrPromises.push(defer.promise);
                });

                $q.all(arrPromises).then(function() {

                    vm.events = events;
                    console.log(vm.events);

                    // Wait to finish ng-repeat
                    $timeout(function() {
                        //now we add datepicker
                        $('.eventTDDate input').fdatepicker({format: 'dd/mm/yyyy'});
                        //now we add timepicker
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
                        $('.eventTDTime input').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });

                        $('select.eventField').multiselect({
                           multiple: false,
                           header: false
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

        function _getOutletLocations() {

            Events.getOutletLocations().then(function(result) {

                var outletLocations = result.data,
                    sorted = sortLocations(outletLocations);

                console.log(outletLocations, sorted);

                vm.outletLocations = getOutletLocationSelectOptions(sorted);

                console.log(vm.outletLocations);
            }); 
        }

        function getAllChildren(list, parent){
            // $allChildren = array();
            // foreach ($list as $location){
            //     if ($location['parent'] == $parent['id'] && ($location['id'] != $location['parent'])){
            //         $location['children'] = getAllChildren($list,$location);
            //         $allChildren[] = $location;
            //     }
            // }
            // return $allChildren;

            var allChildren = [];

            list.forEach(function(elem, index) {

                if(elem.parent == parent.id && elem.id != elem.parent) {

                    elem.children = getAllChildren(list, elem);
                    allChildren.push(elem);
                }
            });

            return allChildren;
        }

        function removeLastChildren(list){
            // foreach (list as $i => $outlet){
            //     if(!count($outlet['children'])){
            //         unset(list[$i]);
            //     } else {
            //         list[$i]['children'] = removeLastChildren($outlet['children']);
            //     }
            // }   
            // return list;

            list.forEach(function(elem, index) {

                if(elem.children.length != 0){
                    list.splice(index, 1);
                } else {
                    elem.children = removeLastChildren(elem.children);
                }
            });

            return list;
        }

        function sortLocations(locations){
            // usort(locations,'byPath');     
            
            // $sorted = array();
            // foreach (locations as $key => $location){
            //     if ($location['parent'] == null && $location['id'] !=null){
            //             $location['children'] = getAllChildren(locations,$location);
            //             $sorted[] = $location;
            //     }
            // }
            // return removeLastChildren($sorted);

            // locations.sort(function(a, b) {

            //     return a.path >b.path;
            // });

            var sorted = [];
            locations.forEach(function(elem, index) {
                if(elem.parent == null && elem.id != null) {
                    elem.children = getAllChildren(locations, elem);
                    sorted.push(elem);
                }
            })
            
            return removeLastChildren(sorted);
        }

        function getOutletLocationSelectOptions(tree){     
            // $output = array(); 
            // foreach ($tree as $node){           
            //     indentNodeForSelect($node,1,$output);
            // }       
            // return $output;

            var output = [];

            tree.forEach(function(elem, index) {

                indentNodeForSelect(elem, 1, output);
            });

            return output;
        }

        function indentNodeForSelect(node, indent, output){

            // $children = $node['children'];
            // $formattedChild = ['id'=>$node['id'],'name'=>str_repeat("--",$indent).' '.$node['name']];       
            // $output[] = $formattedChild;
            // foreach ($children as $child){
            //     indentNodeForSelect($child,$indent+1,$output);          
            // }

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


        // Format date to show on table (DD/MM/YYYY)
        vm.formatDate = function(str_date) {

            var date = new Date(str_date),
                formatted = str_date ? date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() : '';

            return formatted;
        };
        // Format time to show on table (HH:MM)
        vm.formatTime = function(str_time) {

            var date = new Date(str_time),
                formatted = str_time ? date.getHours() + ':' + date.getMinutes() : '';

            return formatted;
        };

        _init();
    });

}(window, angular));