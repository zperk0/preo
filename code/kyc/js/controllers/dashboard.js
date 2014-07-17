
'use strict';

/* Controllers */
angular.module('kyc.controllers')
    .controller('DashboardCtrl', ['$scope', '$http', '$compile', 'ChartType', '$grid', 'AllCharts', '$AjaxInterceptor','$timeout',
        function ($scope, $http, $compile, ChartType, $grid, AllCharts, $AjaxInterceptor,$timeout) {
            $scope.setLocation('dashboard');

            $scope.$parent.showDateFilter = true;

            var charts = AllCharts.getPreparedCharts();

            $scope.changeVisibility = function (value) {

                if (!value.display) {
                    setTimeout(function () {
                        angular.element('#removable_' + value.num).triggerHandler('click');
                    }, 0);
                } else {
                    angular.element('#removable_' + value.num).closest('.flip-container').parent().show();
                }

                angular.element('#sscontainer').trigger("ss-rearrange");
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

                $(window).trigger('resize')
            }, 1000)
        }
    ]);
