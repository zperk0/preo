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

  		//obj with all possible filters and it's types
  		var filters = {
					payingCustomers: {
							type:NUMBER
						},
					mostPopularItems: {
							type:PIE
						}
  		}

  		var charts = {
		    payingCustomers :{
			    value: 345,
			    type: chartsType.NUMBER
		    },
		    ordersPerCustomer :{
			    value: 3.4,
			    type: chartsType.NUMBER
		    },
		    averageOrderValue :{
			    value: '£4.81',
			    type: chartsType.NUMBER
		    },
		    itemsOrdered :{
			    value: '2,264',
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
  		
		$http.get('/data/data.json').success(function (result){					
			 		allData = result;
			 		for (var filter in filters){
			 				filters[filter].data = getFilteredData(filter);
			 		}

			 		//TODO show a loader while we're processing this data, hide it and display the charts after this point.
			 		
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

  		var revenueChart = {
  			options: {
	            chart: {
	                type: 'areaspline',
			       	margin: [0, 0, 0, 0],
			        spacingTop: 0,
			        spacingBottom: 0,
			        spacingLeft: 0,
			        spacingRight: 0	  	                
	            },
				exporting: {
				         enabled: false
				},	            
	            plotOptions: {
	                line: {
	                    marker: {
	                        enabled: false
	                    }
	                },
	                areaspline: {
	                    lineWidth: 0,
	                    fillColor: {
	                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
	                        stops: [
	                            [0, '#523E8A'],
	                            [1, '#1AA1DB']
	                        ]
	                    },                    

	                    pointStart: 1940,
	                    marker: {
	                        enabled: false,
	                        symbol: 'circle',
	                        radius: 2,
	                        states: {
	                            hover: {
	                                enabled: true
	                            }
	                        }
	                    }
	                }
	            },
        	},
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    enabled: false,
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,                
                title: {
                    text: ''
                },
                labels: {
                    enabled: false,
                    formatter: function() {
                        return this.value / 1000 +'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            series: [{
                showInLegend: false, 
                name: 'USA',
                data: charts.revenue.data
            }]
        };

  		var numbersOfOrder = {
  			options: {
	            chart: {
	                type: 'area'
	            },
				exporting: {
				         enabled: false
				},	            
	            plotOptions: {
	                line: {
	                    marker: {
	                        enabled: false
	                    }
	                },
	                area: {
	                    lineWidth: 0,
	                    fillColor: {
	                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
	                        stops: [
	                            [0, '#523E8A'],
	                            [1, '#1AA1DB']
	                        ]
	                    },                    

	                    pointStart: 1940,
	                    marker: {
	                        enabled: false,
	                        symbol: 'circle',
	                        radius: 2,
	                        states: {
	                            hover: {
	                                enabled: true
	                            }
	                        }
	                    }
	                }
	            },
        	},
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    enabled: false,
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,                
                title: {
                    text: ''
                },
                labels: {
                    enabled: false,
                    formatter: function() {
                        return this.value / 1000 +'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            series: [{
                showInLegend: false, 
                name: 'USA',
                data: charts.numbersOfOrder.data
            }]
        };

  		var menuItemsPopularity = {
  			options: {
	            chart: {
	                type: 'area'
	            },
				exporting: {
				         enabled: false
				},	            
	            plotOptions: {
	                line: {
	                    marker: {
	                        enabled: false
	                    }
	                },
	                area: {
	                    lineWidth: 0,
	                    fillColor: {
	                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
	                        stops: [
	                            [0, '#523E8A'],
	                            [1, '#1AA1DB']
	                        ]
	                    },                    

	                    pointStart: 1940,
	                    marker: {
	                        enabled: false,
	                        symbol: 'circle',
	                        radius: 2,
	                        states: {
	                            hover: {
	                                enabled: true
	                            }
	                        }
	                    }
	                }
	            },
        	},
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    enabled: false,
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: false,
                    formatter: function() {
                        return this.value / 1000 +'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            series: [{
                showInLegend: false, 
                name: 'USA',
                data: charts.menuItemsPopularity.data
            }]
        };

        var ordersByOutlet = {
			options: {
	            chart: {
	                type: 'pie',
			       	margin: [0, 0, 0, 0],
			        spacingTop: 0,
			        spacingBottom: 0,
			        spacingLeft: 0,
			        spacingRight: 0	                
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
	                }
	            },	            
	            exporting: {
	                 enabled: false
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false,
	                    center: [150, 130],
	                }
	            },		   
	            legend: {
	                enabled: true,
	                layout: 'vertical',
	                align: 'right',
	                center: [150, 130],
	                width: 200,
	                verticalAlign: 'top',
	                y: 80,
	                x: -30,
	                borderWidth: 0,
	                useHTML: true,
	                labelFormatter: function() {
	                    return '<div style="text-align: left; width:130px;float:left; font-weight: 400; font-size: 13px; margin-bottom: 10px">' + this.name + '</div>';
					}
	            },	                    
        	},          
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Browsers',
                data: charts.ordersByOutlet.data,
                size: '55%',
                innerSize: '45%',
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }
            }]        	
        };

        var mostPopularItems = {
			options: {
	            chart: {
	                type: 'pie',
			       	margin: [0, 0, 0, 0],
			        spacingTop: 0,
			        spacingBottom: 0,
			        spacingLeft: 0,
			        spacingRight: 0	                
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
	                }
	            },	            
	            exporting: {
	                 enabled: false
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false,
	                    center: [150, 130],
	                }
	            },		   
	            legend: {
	                enabled: true,
	                layout: 'vertical',
	                align: 'right',
	                center: [150, 130],
	                width: 200,
	                verticalAlign: 'top',
	                y: 80,
	                x: -30,
	                borderWidth: 0,
	                useHTML: true,
	                labelFormatter: function() {
	                    return '<div style="text-align: left; width:130px;float:left; font-weight: 400; font-size: 13px; margin-bottom: 10px">' + this.name + '</div>';
					}
	            },	                    
        	},          
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Browsers',
                data: charts.mostPopularItems.data,
                size: '55%',
                innerSize: '45%',
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }
            }]        	
        };

        var timeOfOrdersPlaced = {
			options: {
	            chart: {
	                type: 'pie',
			       	margin: [0, 0, 0, 0],
			        spacingTop: 0,
			        spacingBottom: 0,
			        spacingLeft: 0,
			        spacingRight: 0	                
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
	                }
	            },	            
	            exporting: {
	                 enabled: false
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false,
	                    center: [150, 130],
	                }
	            },		   
	            legend: {
	                enabled: true,
	                layout: 'vertical',
	                align: 'right',
	                center: [150, 130],
	                width: 200,
	                verticalAlign: 'top',
	                y: 120,
	                x: -30,
	                borderWidth: 0,
	                useHTML: true,
	                labelFormatter: function() {
	                    return '<div style="text-align: left; width:130px;float:left; font-weight: 400; font-size: 13px; margin-bottom: 10px">' + this.name + '</div>';
					}
	            },	                    
        	},          
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Browsers',
                data: charts.timeOfOrdersPlaced.data,
                size: '55%',
                innerSize: '45%',
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }
            }]        	
        };

        var customersPie = {
			options: {
	            chart: {
	                type: 'pie',
			       	margin: [0, 0, 0, 0],
			        spacingTop: 0,
			        spacingBottom: 0,
			        spacingLeft: 0,
			        spacingRight: 0	                
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
	                }
	            },	            
	            exporting: {
	                 enabled: false
	            },
	            plotOptions: {
	                pie: {
	                    shadow: false,
	                    center: [150, 130],
	                }
	            },		   
	            legend: {
	                enabled: true,
	                layout: 'vertical',
	                align: 'right',
	                center: [150, 130],
	                width: 200,
	                verticalAlign: 'top',
	                y: 120,
	                x: -30,
	                borderWidth: 0,
	                useHTML: true,
	                labelFormatter: function() {
	                    return '<div style="text-align: left; width:130px;float:left; font-weight: 400; font-size: 13px; margin-bottom: 10px">' + this.name + '</div>';
					}
	            },	                    
        	},          
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'Browsers',
                data: charts.customersPie.data,
                size: '55%',
                innerSize: '45%',
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }
            }]        	
        };

        var customersColumn = {
    		options: {
                chart: {
                    type: 'column'
                },
	            exporting: {
	                 enabled: false
	            },                
                plotOptions: {
                    column:{
                        borderRadius: 5
                    },
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                }, 	                
        	},
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                lineWidth: 0,
                tickWidth: 0
            },
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,                    
                title: {
                    text: ''
                },
                labels: {
                    enabled: false,
                }
            },

            series: [{
                pointWidth: 200,
                name: 'Customers',
                showInLegend: false,
                colorByPoint: true,
                data: charts.customersBar.data
            }]
        };

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
            { num: 1, row: 1, col: 1, size_x: 2, size_y: 1, display: true, title: 'Paying customers', showChart: false, value: charts.payingCustomers.value },
            { num: 2, row: 1, col: 3, size_x: 2, size_y: 1, display: true, title: 'Orders per customers', showChart: false, value: charts.ordersPerCustomer.value },
            { num: 3, row: 1, col: 5, size_x: 2, size_y: 1, display: true, title: 'Average order value', showChart: false, value: charts.averageOrderValue.value },
            { num: 4, row: 1, col: 7, size_x: 2, size_y: 1, display: true, title: 'Items ordered', showChart: false, value: charts.itemsOrdered.value },
            { num: 5, row: 2, col: 1, size_x: 4, size_y: 2, display: true, title: 'Revenue', showChart: true, highcharts: revenueChart },
            { num: 6, row: 2, col: 5, size_x: 4, size_y: 2, display: true, title: 'Orders by outlet', showChart: true, highcharts: ordersByOutlet },
            { num: 7, row: 3, col: 1, size_x: 4, size_y: 2, display: true, title: 'Numbers of orders', showChart: true, highcharts: numbersOfOrder },
            { num: 8, row: 3, col: 5, size_x: 4, size_y: 2, display: true, title: 'Most popular items (top 5)', showChart: true, highcharts: mostPopularItems },
            { num: 9, row: 4, col: 1, size_x: 4, size_y: 2, display: true, title: 'Menu item popularity', showChart: true, highcharts: menuItemsPopularity },
            { num: 10, row: 4, col: 5, size_x: 4, size_y: 2, display: true, title: 'Time of orders placed', showChart: true, highcharts: timeOfOrdersPlaced },
            { num: 11, row: 5, col: 1, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, highcharts: customersColumn },
            { num: 12, row: 5, col: 5, size_x: 4, size_y: 2, display: true, title: 'Customers', showChart: true, highcharts: customersPie }

          ];

  }]);
