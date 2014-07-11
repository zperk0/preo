
'use strict';

/* Controllers */
angular.module('kyc.controllers')
    .controller('DashboardCtrl', ['$scope', '$http', '$compile', 'ChartType', '$grid', 'AllCharts', '$AjaxInterceptor','$timeout',
        function ($scope, $http, $compile, ChartType, $grid, AllCharts, $AjaxInterceptor,$timeout) {
            $scope.setLocation('dashboard');


            var charts = AllCharts.getPreparedCharts();

            $scope.changeVisibility = function (value) {

                if (!value.display) {
                    setTimeout(function () {
                        angular.element('#removable_' + value.num).triggerHandler('click');
                    }, 0);
                } else {

                    var childScope = $scope.$new();
                    childScope.value = value;
                    $scope.$parent.gridster.add_widget.apply($scope.$parent.gridster, [$compile('<li class="widget"><chart element="value"></chart></li>')(childScope), value.size_x, value.size_y, value.col, value.row]);
                }
            };

            $scope.shapeshifterConfig = {
                gutterX: 20, // Compensate for div border
                gutterY: 20, // Compensate for div border
                paddingX: 0,
                paddingY: 0,
                minColumns:2
            }
            
            $scope.values = $grid.populateItems(charts);

            $timeout(function(){
                $AjaxInterceptor.complete();
            })            
        }
    ]);
