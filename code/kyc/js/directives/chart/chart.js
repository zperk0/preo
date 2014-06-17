'use strict';

angular.module('kyc.directives').
  directive('chart','ChartType', [function(ChartType) {

  	return {
  		templateUrl: '/code/kyc/js/directives/chart/chart.htm',
  		restrict: 'E',
  		replace: true,
  		scope: {
  			chart: '=element'
  		},
  		link: function( ng, elem, attrs ) {

  			var $actionsChart = elem.find('.actions-chart');
  			var $chart = elem.find('.chart');
  			var heightParent = elem.parent().height();

  			$actionsChart.height( heightParent );
  			$chart.height( heightParent );

  			if ( ng.chart.showChart ){
          console.log(ng.chart.value.type,"ng.chart.value.type");
          ng.chart.highcharts = getChartObject(ng.chart.value.type);  			
          //ng.chart.highcharts.options.chart.height = heightParent - 30;

  			}

  			ng.showOptions = function() {

  				$chart.slideUp('400');
  				$actionsChart.slideDown('400');

  			}

  			ng.hideOptions = function() {

  				$actionsChart.slideUp('400');
  				$chart.slideDown('400');

  			}

        function getChartObject(type){
          switch (type){
            case ChartType.AREA:
              return {
                options:{
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
                            stops: [[0, '#523E8A'],
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
              }        
          }
        }
  		}
  	};

  }]);