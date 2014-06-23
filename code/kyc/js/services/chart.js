'use strict';
angular.module('kyc.services', []).
  service('$chartService', ['ChartType', function( ChartType ) {

  		var area = function( value ) {
  			return {
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
		                    marker: {
		                        enabled: false,
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
            			type: 'datetime',
	                labels: {
	                    enabled: false,
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
	                }
	            },
	            series: [{
	                showInLegend: false,
	                enableMouseTracking: false,
	                name: '',
	                pointInterval: 24 * 3600 * 1000, //day interval
                	pointStart: Date.UTC(2006, 0, 1),
	                data: value.data,

	            }]
        	}
        };      

  		var areaModal = function( value ) {
  			return {
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
			            series: {
			                marker: {
		                    	fillColor: '#126FB2',
		                    	lineColor: '#126FB2',
		                    	lineWidth: 2,
			                }
			            },
		                area: {
		                    //pointStart: 1940,
		                    color: '#E7F1F7',
	                    	lineColor: '#126FB2',
	                    	lineWidth: 3,
		                    marker: {
		                    	fillColor: '#126FB2',
		                    	enabled: false
		                       
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
            			type: 'datetime'	                
	            },
	            yAxis: {
	                gridLineWidth: 0,
	                minorGridLineWidth: 0,
	                title: {
	                    text: ''
	                },
	                labels: {
	                    enabled: true
	                }
	            },
	            series: [{
	                showInLegend: false,
	                name: '',
	                data: value.data,
	                pointInterval: 24 * 3600 * 1000, //day interval
                	pointStart: Date.UTC(2006, 0, 1),
	            }]
        	}
        };      


        var pie = function( value ) {
        	return {
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
	                data: value.data,
	                size: '55%',
	                innerSize: '45%',
	                showInLegend:true,
	                dataLabels: {
	                    enabled: false
	                }
	            }]   
            }     	
        };

        var column = function( value ) {
        	return {
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
	                data: value.data
	            }]
        	}
        };

        var getChart = function( type, value ) {

        	switch(type) {
        		case ChartType.AREA:
        			return area( value );
        			break; 
        		case ChartType.AREA_MODAL:
        			return areaModal( value );
        			break; 
        		case ChartType.PIE:
        			return pie( value );
        			break; 
        		case ChartType.COLUMN:
        			return column( value );
        			break;
        	}

        };


        return {
        	area: area,
        	areaModal: areaModal,
        	pie: pie,
        	column: column,
        	getChart: getChart
        }     

  }]);
