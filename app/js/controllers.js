'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('DashboardCtrl', ['$scope', function($scope) {

  		var revenueChart = {
  			options: {
	            chart: {
	                type: 'area',
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
                data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
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
                data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
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
                data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
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
                data: [ 
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
                ],
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
                data: [ 
                	{name: "Upper Level Jimmy Mac", y: 6, color: '#17A3DD'},
                	{name: "Upper Level James Hargreaves", y: 4, color: '#1476B7'},
                	{name: "Lower Level Jimmy Mac", y: 7, color: '#533A86'}, 
                	{name: "Upper Level James Hargreaves", y: 3, color: '#F5B13D'}, 
                	{name: "Bob Lord Stand", y: 2, color: '#8ABE4F'}
                ],
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
                data: [ 
                	{name: "Day of collection", y: 6, color: '#17A3DD'},
                	{name: "Before the day of collection", y: 4, color: '#1476B7'},
                ],
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
                data: [ 
                	{name: "Day of collection", y: 6, color: '#17A3DD'},
                	{name: "Before the day of collection", y: 4, color: '#1476B7'},
                ],
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
                data: [{name: 'New', y: 20, color: '#1D9BD6'}, {name: 'Returning', y: 80, color: '#494F97'}]
            }]
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
            { num: 1, row: 1, col: 1, size_x: 2, size_y: 1, title: 'Paying customers', showChart: false, value: '345' },
            { num: 2, row: 1, col: 2, size_x: 2, size_y: 1, title: 'Orders per customers', showChart: false, value: '3.4' },
            { num: 3, row: 1, col: 3, size_x: 2, size_y: 1, title: 'Average order value', showChart: false, value: '£4.81' },
            { num: 4, row: 1, col: 4, size_x: 2, size_y: 1, title: 'Items ordered', showChart: false, value: '2,264' },
            { num: 5, row: 2, col: 1, size_x: 4, size_y: 2, title: 'Revenue', showChart: true, highcharts: revenueChart },
            { num: 6, row: 2, col: 3, size_x: 4, size_y: 2, title: 'Orders by outlet', showChart: true, highcharts: ordersByOutlet },
            { num: 7, row: 3, col: 1, size_x: 4, size_y: 2, title: 'Numbers of orders', showChart: true, highcharts: numbersOfOrder },
            { num: 8, row: 3, col: 3, size_x: 4, size_y: 2, title: 'Most popular items (top 5)', showChart: true, highcharts: mostPopularItems },
            { num: 9, row: 4, col: 1, size_x: 4, size_y: 2, title: 'Menu item popularity', showChart: true, highcharts: menuItemsPopularity },
            { num: 10, row: 4, col: 3, size_x: 4, size_y: 2, title: 'Time of orders placed', showChart: true, highcharts: timeOfOrdersPlaced },
            { num: 11, row: 5, col: 1, size_x: 4, size_y: 2, title: 'Customers', showChart: true, highcharts: customersColumn },
            { num: 12, row: 5, col: 3, size_x: 4, size_y: 2, title: 'Customers', showChart: true, highcharts: customersPie }

          ];

  }])
  .controller('StockCtrl', ['$scope', function($scope) {

  	$scope.stocks = [
  		{ name: '7-UP', quantity: 4 },
  		{ name: 'Bovril', quantity: 56 },
  		{ name: 'Carlsberg', quantity: 207 },
  		{ name: 'Coca Cola', quantity: 36 },
  	];

  }])
  .controller('CustomersCtrl', ['$scope', function($scope) {

  	$scope.customers = [
  		{ name: 'Adian', spent: '£6.80', email: 'burnleypie@adrianb.net' },
  		{ name: 'Alex Jones', spent: '£12.00', email: 'jonesey77@live.co.uk' },
  		{ name: 'Alex Parr', spent: '£1.80', email: 'thealexparr@gmail.com' },
  	];

  }])
  .controller('ReportsCtrl', ['$scope', function($scope) {

  	$scope.reports = [
  		{ id: '1320', outlet: 'Upper Leve', name: 'Craig Fell', time: '16:08:11', quantity: '1', item: 'Peppe... ', modifier: '', total: '£2.50', status: 'COMPLETED'},
  		{ id: '1318', outlet: 'James Ha...', name: 'Tim Bradley', time: '13:07:33', quantity: '1', item: 'Steak ... ', modifier: 'with Tea', total: '£2.50', status: 'COMPLETED'},
  	];

  }])
  .controller('StreamCtrl', ['$scope', function($scope) {

  	$scope.streams = [
  		{ order: 'order', spent: '£3.40', name: 'Bill Carr', numbers: '1 x Carlsberg', time: '10 seconds ago'},
  		{ order: 'failed', spent: '£3.40', name: 'Tony Hares', numbers: '1 x Carlsberg', time: '10 seconds ago'},
  	];

  }]);
