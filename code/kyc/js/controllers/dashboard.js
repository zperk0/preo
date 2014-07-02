'use strict';

/* Controllers */
angular.module('kyc.controllers')
.controller('DashboardCtrl', ['$scope','$http', '$compile','ChartType', '$grid','AllCharts','$AjaxInterceptor',
 function($scope,$http, $compile,ChartType, $grid,AllCharts,$AjaxInterceptor) {
  		var allData = [];  		  	  	

	
 		var charts = AllCharts.getPreparedCharts();
 	
        $scope.changeVisibility = function( value ) {

        	if ( !value.display ) {
				setTimeout(function() {
				    angular.element('#removable_' + value.num).triggerHandler('click');
				}, 0);
			} else {

				var childScope = $scope.$new();
				childScope.value = value;
				$scope.$parent.gridster.add_widget.apply($scope.$parent.gridster, [$compile( '<li class="widget"><chart element="value"></chart></li>' )(childScope), value.size_x, value.size_y, value.col, value.row]);
			}
        };

         $scope.gridsterOptions = {
            resize: {
              enabled: true
            },
            widget_margins: [11, 11],
	        widget_base_dimensions: [120, 150],
	        min_cols: 6
          };

          $scope.values = [];

          $scope.values = $grid.populateItems( charts );


          $AjaxInterceptor.complete();
 

  }]);
