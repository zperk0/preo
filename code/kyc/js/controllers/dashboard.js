'use strict';

/* Controllers */

angular.module('kyc.controllers', [])
  .controller('DashboardCtrl', ['$scope','$http', '$compile', function($scope,$http, $compile) {
  		var allData = [];
  		var NUMBER = 0;
  		var BAR = 1;
  		var PIE = 2;
  		var AREA = 3;

  		var chartsType = {
  			NUMBER: 0,
  			BAR: 1,
  			PIE: 2,
  			AREA: 3
  		};

  		var charts = {
		    payingCustomers :{
			    data: 345,
			    type: chartsType.NUMBER
		    },
		    ordersPerCustomer :{
			    data: 3.4,
			    type: chartsType.NUMBER
		    },
		    averageOrderValue :{
			    data: '£4.81',
			    type: chartsType.NUMBER
		    },
		    itemsOrdered :{
			    data: '2,264',
			    type: chartsType.NUMBER
		    },
		    revenue:{
		        type: chartsType.AREA,
		        data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]

		    },
		    numbersOfOrder: {
		    	type: chartsType.AREA,
		    	data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
		    },
		    menuItemsPopularity: {
		    	type: chartsType.AREA,
		    	data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
		    },
		    ordersByOutlet: {
		    	type: chartsType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	]
		    },
		    mostPopularItems: {
		    	type: chartsType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	]
		    },
		    timeOfOrdersPlaced: {
		    	type: chartsType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	]
		    },
		    customersPie: {
		    	type: chartsType.PIE,
		    	data: [
              	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
              	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
              	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
              	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
              	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	]
		    },
		    customersBar: {
		    	type: chartsType.PIE,
				data: [
					{name: 'New', y: 20, color: '#1D9BD6'}, 
					{name: 'Returning', y: 80, color: '#494F97'}
				]
		    }
		};
  		
		$http.get('/code/kyc/data/data.json').success(function (result){					
			 		allData = result;
			 		for (var chart in charts){
			 				charts[chart].data = getFilteredData(chart);
			 		}
		 });

		function getFilteredData(filter){

				switch (filter){
						case "payingCustomers": 							
							var newCustomers = [];
							var repeatedCustomers = [];
							angular.forEach(allData	,function(row){									
								var customerId  = row.userId;
								if (newCustomers.indexOf(customerId) === -1){
									newCustomers.push(customerId);
								}
								else{
									if (repeatedCustomers.indexOf(customerId) === -1)
										repeatedCustomers.push(customerId);
								}
							});												
							return newCustomers.length;
						case "mostPopularItems": 
							var items = {};							
							angular.forEach(allData	,function(row){
								
									angular.forEach(row.items,function(item){
										if (items[item.id] !== undefined)
											items[item.id].quantity++;
										else
											items[item.id]={
												name:item.name,
												quantity:1
											};
									});
							});					
							var top5 = [
									{y:0},
									{y:0},
									{y:0},
									{y:0},
									{y:0}									
							]
							
							for (var id in items){
								for (var pos in top5){
									console.log(items[id].quantity,top5[pos].y)
									if (items[id].quantity > top5[pos].y){
											for (var i=(top5.length-1);i>pos;i--){
												top5[i].y = top5[i-1].y
												top5[i].name = top5[i-1].name
											}
											top5[pos].y = items[id].quantity;
											top5[pos].name = items[id].name;
											break;
									}
								}
							}
							return top5;		
						default: 
							return {};
							break;
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

          // Mock widgets
          $scope.values = [
            { num: 1, row: 1, col: 1, size_x: 2, size_y: 1, display: true, title: 'Paying customers', showChart: false, value: charts.payingCustomers.data },
            { num: 2, row: 1, col: 3, size_x: 2, size_y: 1, display: true, title: 'Orders per customers', showChart: false, value: charts.ordersPerCustomer.data },
            { num: 3, row: 1, col: 5, size_x: 2, size_y: 1, display: true, title: 'Average order value', showChart: false, value: charts.averageOrderValue.data },
            { num: 4, row: 1, col: 7, size_x: 2, size_y: 1, display: true, title: 'Items ordered', showChart: false, value: charts.itemsOrdered.data },
            { num: 5, row: 2, col: 1, size_x: 4, size_y: 2, display: true, title: 'Revenue', showChart: true, highcharts: charts.revenue },
            { num: 6, row: 2, col: 5, size_x: 4, size_y: 2, display: true, title: 'Orders by outlet', showChart: true, highcharts: charts.orders },
            { num: 7, row: 3, col: 1, size_x: 4, size_y: 2, display: true, title: 'Numbers of orders', showChart: true, highcharts: charts.numbersOfOrder },
            { num: 8, row: 3, col: 5, size_x: 4, size_y: 2, display: true, title: 'Most popular items (top 5)', showChart: true, highcharts: charts.mostPopularItems },
            { num: 9, row: 4, col: 1, size_x: 4, size_y: 2, display: true, title: 'Menu item popularity', showChart: true, highcharts: charts.menuItemsPopularity },
            { num: 10, row: 4, col: 5, size_x: 4, size_y: 2, display: true, title: 'Time of orders placed', showChart: true, highcharts: charts.timeOfOrdersPlaced },
            { num: 11, row: 5, col: 1, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, highcharts: charts.customersColumn },
            { num: 12, row: 5, col: 5, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, highcharts: charts.customersPie }

          ];

  }]);
