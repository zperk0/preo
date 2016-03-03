'use strict';

angular.module('events')
    .directive('dndList', function() {
        return  {
            restrict: 'A',
            scope: {
                list: '=dndList',
                dndCallback: '&'
            },
            link: function(scope, element, attrs) {

                var toUpdate = null,
                    oldComponentIndex = -1,
                    container = $(element[0]);

                // watch changes on model
                scope.$watch(function() {return scope.list; }, function(value) {
                    toUpdate = value;
                });

                // jquery ui sortable
                container.sortable({
                    opacity: 0.5,
                    axis: "y",
                    cursor: "move",
                    handle: ".sortSlotHandle",
                    cancel: "input,textarea,select,option",
                    placeholder: "sortable-placeholder-sec",
                    items: ".ct-slots",
                    revert: 100,
                    delay: 100,
                    start:function (event, ui) {

                        // on start we define where the item is dragged from
                        oldComponentIndex = $(ui.item).attr("data-index");
                    },
                    stop:function (event, ui) {

                        var i = $(ui.item),
                            newComponentIndex = i.index();

                        if(newComponentIndex != oldComponentIndex) {

                            // move the item
                            var toMove = toUpdate[oldComponentIndex];
                            toUpdate.splice(oldComponentIndex, 1);
                            toUpdate.splice(newComponentIndex, 0, toMove);

                            // apply on model
                            scope.$apply(scope.slots);

                            // callback to refresh jquery ui components
                            scope.dndCallback();
                        }
                    }
                });

            }
        }
    });