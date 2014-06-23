'use strict';

/* Controllers */
angular.module('kyc.controllers')
.controller('DashboardCtrl', ['$scope','$http', '$compile','ChartType', '$grid', function($scope,$http, $compile,ChartType, $grid) {
  		var allData = [];  		  	  	

  		var charts = {
		    payingCustomers :{
			    data: 345,
			    type: ChartType.NUMBER,
			    title: 'Paying customers'
		    },
		    ordersPerCustomer :{
			    data: 3.4,
			    type: ChartType.NUMBER,
			    title: 'Orders per customers'
		    },
		    averageOrderValue :{
			    data: '£4.81',
			    type: ChartType.NUMBER,
			    title: 'Average order value'
		    },
		    itemsOrdered :{
			    data: '2,264',
			    type: ChartType.NUMBER,
			    title: 'Items ordered'
		    },
		    revenue:{
		        type: ChartType.AREA,
		        data: [369, 640,                    
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ],
                title: 'Revenue',
                numberLeft: '£5,652.40',
                numberRight: '+14%'                

		    },
		    ordersByOutlet: {
		    	type: ChartType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	],
		    	title: 'Orders by outlet'
		    },		    
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
		    mostPopularItems: {
		    	type: ChartType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	],
		    	title: 'Most popular items (top 5)'
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
		    },
		    timeOfOrdersPlaced: {
		    	type: ChartType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	],
		    	title: 'Time of orders placed'
		    },
		    customersColumn: {
		    	type: ChartType.COLUMN,
				data: [
					{name: 'New', y: 20, color: '#1D9BD6'}, 
					{name: 'Returning', y: 80, color: '#494F97'}
				],
				title: 'Customers'
		    },
		    customersPie: {
		    	type: ChartType.PIE,
		    	data: [
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
		    	],
		    	title: 'Customers'
		    },
		};


		$scope.$on('preoday.allData', function( event, data ) {
			$scope.allData = data.allData;


			// set data in charts and reload
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

          $scope.values = [];

          $scope.values = $grid.populateItems( charts );



/*          $scope.values = [
			{ num: 1, row: 1, col: 1, size_x: 2, size_y: 1, display: true, title: 'Paying customers', showChart: false, value: charts.payingCustomers.data },
            { num: 2, row: 1, col: 3, size_x: 2, size_y: 1, display: true, title: 'Orders per customers', showChart: false, value: charts.ordersPerCustomer.data },
            { num: 3, row: 1, col: 5, size_x: 2, size_y: 1, display: true, title: 'Average order value', showChart: false, value: charts.averageOrderValue.data },
            { num: 4, row: 1, col: 7, size_x: 2, size_y: 1, display: true, title: 'Items ordered', showChart: false, value: charts.itemsOrdered.data },
            { num: 5, row: 2, col: 1, size_x: 4, size_y: 2, display: true, title: 'Revenue', showChart: true, value: charts.revenue },
            { num: 6, row: 2, col: 5, size_x: 4, size_y: 2, display: true, title: 'Orders by outlet', showChart: true, value: charts.ordersByOutlet },
            { num: 7, row: 3, col: 1, size_x: 4, size_y: 2, display: true, title: 'Numbers of orders', showChart: true, value: charts.numbersOfOrder },
            { num: 8, row: 3, col: 5, size_x: 4, size_y: 2, display: true, title: 'Most popular items (top 5)', showChart: true, value: charts.mostPopularItems },
            { num: 9, row: 4, col: 1, size_x: 4, size_y: 2, display: true, title: 'Menu item popularity', showChart: true, value: charts.menuItemsPopularity },
            { num: 10, row: 4, col: 5, size_x: 4, size_y: 2, display: true, title: 'Time of orders placed', showChart: true, value: charts.timeOfOrdersPlaced },
            { num: 11, row: 5, col: 1, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, value: charts.customersColumn },
            { num: 12, row: 5, col: 5, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, value: charts.customersPie }

          ];*/

  }]);
