'use strict';

/* Controllers */
angular.module('kyc.controllers')
.controller('DashboardCtrl', ['$scope','$http', '$compile','ChartType', '$grid','AllCharts',
 function($scope,$http, $compile,ChartType, $grid,AllCharts) {

	
 		var charts = AllCharts.getPreparedCharts();
 		/*
  		var charts = {		   
		  
		    numbersOfOrder: {
		    	type: ChartType.AREA,
		    	data: [ 	6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,                  
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ],
                title: 'Numbers of orders',
                numberLeft: '1,175',
                numberRight: '+27%'                
		    },		    
		    menuItemsPopularity: {
		    	type: ChartType.AREA,
		    	data: [	1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ],
                title: 'Menu item popularity',
                numberLeft: '735',
                numberRight: '+17%',
                items: [ // items for show select in chart
                	{id: 1, name: 'Teste 1'},
                	{id: 2, name: 'Teste 2'},
                	{id: 3, name: 'Teste 3'}
                ],
                modal: {
                	highcharts: {
                		type: ChartType.AREA_MODAL // type of highcharts in modal
                	},
                	options: [ // options for footer in modal
                		{ name: 'Specified Dates', value: '102', percent: '+14%', status: 'positive', active: true },
                		{ name: 'Week', value: '67', percent: '+21%', status: 'positive' },
                		{ name: 'Month', value: '122', percent: '+140%', status: 'positive' },
                		{ name: '3 Months', value: '235', percent: '-7%', status: 'negative' },
                		{ name: '6 Months', value: '427', percent: '+217%', status: 'positive' },
                		{ name: 'Year', value: '978', percent: '-17%', status: 'negative' },
                	]
                }
		    }		   
	*/
			

	
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

  }]);
