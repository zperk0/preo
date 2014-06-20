'use strict';

/* Controllers */
angular.module('kyc.controllers')
.controller('DashboardCtrl', ['$scope','$http', '$compile','ChartType', function($scope,$http, $compile,ChartType) {
  		var allData = [];  		  	  	

  		var charts = {
		    revenue:{
		        type: ChartType.AREA,
		        data: [369, 640,                    
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]

		    },
		    numbersOfOrder: {
		    	type: ChartType.AREA,
		    	data: [ 	6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,                  
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
		    },
		    menuItemsPopularity: {
		    	type: ChartType.AREA,
		    	data: [		1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
		    }
		  }
  				

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

      //     $scope.values = [
						// { num: 1, row: 1, col: 1, size_x: 2, size_y: 1, display: true, title: 'Paying customers', showChart: false, value: charts.payingCustomers.data },
      //       { num: 2, row: 1, col: 3, size_x: 2, size_y: 1, display: true, title: 'Orders per customers', showChart: false, value: charts.ordersPerCustomer.data },
      //       { num: 3, row: 1, col: 5, size_x: 2, size_y: 1, display: true, title: 'Average order value', showChart: false, value: charts.averageOrderValue.data },
      //       { num: 4, row: 1, col: 7, size_x: 2, size_y: 1, display: true, title: 'Items ordered', showChart: false, value: charts.itemsOrdered.data },
      //       { num: 5, row: 2, col: 1, size_x: 4, size_y: 2, display: true, title: 'Revenue', showChart: true, value: charts.revenue },
      //       { num: 6, row: 2, col: 5, size_x: 4, size_y: 2, display: true, title: 'Orders by outlet', showChart: true, value: charts.ordersByOutlet },
      //       { num: 7, row: 3, col: 1, size_x: 4, size_y: 2, display: true, title: 'Numbers of orders', showChart: true, value: charts.numbersOfOrder },
      //       { num: 8, row: 3, col: 5, size_x: 4, size_y: 2, display: true, title: 'Most popular items (top 5)', showChart: true, value: charts.mostPopularItems },
      //       { num: 9, row: 4, col: 1, size_x: 4, size_y: 2, display: true, title: 'Menu item popularity', showChart: true, value: charts.menuItemsPopularity },
      //       { num: 10, row: 4, col: 5, size_x: 4, size_y: 2, display: true, title: 'Time of orders placed', showChart: true, value: charts.timeOfOrdersPlaced },
      //       { num: 11, row: 5, col: 1, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, value: charts.customersBar },
      //       { num: 12, row: 5, col: 5, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, value: charts.customersPie }

      //     ];

  }]);
