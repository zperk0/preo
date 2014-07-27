
'use strict';

/* Controllers */
angular.module('kyc.controllers')
    .controller('DashboardCtrl', ['$scope', '$http', '$compile', 'ChartType', '$grid', 'AllCharts', '$AjaxInterceptor','$timeout','$notification', 'UtilsService',
        function ($scope, $http, $compile, ChartType, $grid, AllCharts, $AjaxInterceptor,$timeout,$notification, UtilsService) {
            $scope.setLocation('dashboard');

            $scope.$parent.showDateFilter = true;

            var charts = AllCharts.getPreparedCharts();

            $scope.$on('KYC_RELOAD',function(){                
                charts = AllCharts.getPreparedCharts();                                    
                $scope.values = $grid.populateItems(charts);
                refreshGrid();                
            })
            

            $scope.changeVisibility = function (value) {

                if (!value.display) {
                    setTimeout(function () {
                        angular.element('#removable_' + value.num).triggerHandler('click');
                    }, 0);
                } else {
                    angular.element('#removable_' + value.num).closest('.flip-container').parent().show();

                    UtilsService.reOrderWidgets( angular.element('#sscontainer') );
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
                        

            function refreshGrid(){
               $scope.values = $grid.populateItems(charts);
               $timeout(function(){
                    var isFirstTime = window.sessionStorage.getItem("firsttime_feature_4") === "1";
                    if (isFirstTime){
                        window.sessionStorage.setItem("firsttime_feature_4",0);
                        $notification.confirm({               
                          title: _tr("Welcome to Know Your Customer"),
                          content: _tr("From here you can view detailed reports and analytics about your customers and the transactions they make."),
                          showTerm: false,
                          btnOk: false,
                          btnCancel: _tr('GET STARTED'),            
                          windowClass:'medium'
                        });
                    }

                    
                    $(window).trigger('resize')
                    angular.element('#sscontainer').trigger("ss-rearrange");
                    
                    $AjaxInterceptor.complete();
                }, 1000)
            }
            refreshGrid();
           
        }
    ]);
