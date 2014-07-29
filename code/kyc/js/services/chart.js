
'use strict';
angular.module('kyc.services', []).
service('$chartService', ['ChartType','$filter', 'TickInterval',
    function (ChartType,$filter, TickInterval) {

        var area = function (value) {
            return {
                options: {
                    chart: {
                        type: 'areaspline',
                        height:'250',
                        style: {
                            cursor: 'url(/img/cursorChart.png), auto',
                        }
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
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
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
                    minTickInterval: 24 * 3600 * 1000,
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
                    data: value.data,
                }]
            }
        };

        var areaModal = function (value) {
            var len = value.data.length; 
            return {
                options: {
                    chart: {
                        type: 'areaspline',
                        height:'250'
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
                        areaspline: {
                            color: '#E7F1F7',
                            lineColor: '#126FB2',
                            lineWidth: 3,
                            marker: {
                                fillColor: '#126FB2',
                                enabled: len > 1 ? false : true

                            }
                        }
                    },
                    tooltip: {
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        shadow:false,
                        useHTML:true,
                        positioner: function(boxWidth, boxHeight, point) {
                            var substract = boxWidth / 2;

                            substract -= this.chart.plotLeft;

                            return {
                                x: point.plotX - substract,
                                y: point.plotY - boxHeight
                            };
                        },
                        formatter: function () {
                            var date;

                            if ( this.series.xAxis.tickInterval === TickInterval.MONTH ) {
                                date = $filter('date')(new Date(this.x), 'MMM yyyy');
                            } else if ( this.series.xAxis.tickInterval === TickInterval.WEEK || this.series.xAxis.tickInterval === TickInterval.WEEK_THREE ) {
                                date = moment.utc(this.x).startOf('week').format('DD MMM YYYY') + ' <br /> - <br />' + moment.utc(this.x).endOf('week').format('DD MMM YYYY');
                            } else {
                                date = $filter('date')(new Date(this.x), 'dd MMM yyyy');
                            }

                            var ui_str = '<div style="position:relative;"><div style="background-color: #1576B7; border-radius: 5px; color:#fff;font-family:\'Co Text W01 Light\'; text-align:center; padding:18px 8px;">'+date ;                            
                            var tooltipText = (this.y == 1 && value.tooltipText[value.tooltipText.length-1].toLowerCase() ==='s' ) ? value.tooltipText.slice(0,-1) : value.tooltipText;                                                    
                            ui_str += '<b style="color:#fff;font-size:160%;font-weight:bold;font-family:\'Co Text W01 Bold\';text-align:center;display:block;margin-top:8px;">';
                            if(value.currency)
                                ui_str += tooltipText + "" + this.y.toFixed(2) + '</b></div>';
                            else
                                ui_str += this.y +""+ tooltipText+'</b></div>';

                            ui_str += '<span style="position: absolute; left: 42%; bottom: -8px; background:url(/img/arrowBlue.png) left top no-repeat; width: 15px; height: 8px; display: block;" "></span></div>';
                            return ui_str;
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime',
                    tickInterval: value.tickInterval,
                    min: value.minTimestamp,
                    max: value.maxTimestamp,
                    labels: {
                        style: {
                            color: '#b3b6b8',
                            fontSize: '15px'                          
                        },
                        formatter: function() {
                            var date;

                            if ( this.axis.tickInterval === TickInterval.MONTH ) {
                                date = $filter('date')(new Date(moment.utc(this.value).startOf('month')), 'MMM');
                            } else if ( this.axis.tickInterval === TickInterval.WEEK || this.axis.tickInterval === TickInterval.WEEK_THREE ) {
                                date = $filter('date')(new Date(moment.utc(this.value).startOf('week').add('days', 3)), 'dd.MMM');
                            } else {
                                date = $filter('date')(new Date(this.value), 'dd.MMM');
                            }

                            return date;
                        },                        
                    },
                },
                yAxis: {     
                    gridLineWidth: 1,
                    gridLineColor: '#C0C0C0',
                    gridLineDashStyle: 'dot',
                    minorGridLineWidth: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            color: '#b3b6b8',
                            fontSize: '15px'
                        }
                    },
                    min: 0,
                    minRange: 1
                },
                series: [{
                    showInLegend: false,
                    name: '',
                    data: value.data,
                    marker: {
                        symbol: 'url(/img/marker.png)'
                    }                    
                }]
            }
        };


        var pie = function (value) {
            return {
                options: {
                    chart: {
                        type: 'pie',
                        height:'250',
                        events: {
                            load: function (event) {
                                setTimeout(function () {
                                    $('.highcharts-legend-item rect')
                                    .attr('rx', '20')
                                    .attr('ry', '20')
                                    .attr('width', '16')
                                    .attr('height', '16')
                                    .css({"cursor":"pointer"});
                                }, 100);
                            }
                        }
                    },
                    tooltip: {
                        // borderColor: '#DBDBD9',
                        hideDelay:0,
                        borderWidth: 0,
                        backgroundColor: '#DBDBD9',
                        shadow: false,
                        useHTML: true,
                        positioner: function(boxWidth, boxHeight, point) {
                            return {
                                x: point.plotX - boxWidth/2 +10 ,
                                y: point.plotY - boxHeight - 5
                            };
                        },
                        formatter: function () {
                            return '<div style="position:relative;"><div class="tooltipPie" style="font-size: 14px; font-weight: 600; padding: 5px 7px">' + 
                            Highcharts.numberFormat(this.y, (this.y % 1 === 0 ? 0 : 1)) + '</div> <span style="position: absolute; left: 33%; bottom: -15px; background:url(/img/arrowPie.png) left top no-repeat; width: 15px; height: 9px; display: block;" "></span> </div>';
                        }
                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            center: ["20%", "55%"],
                            borderWidth:0
                        }
                    },
                    legend: {
                        width: 50,
                        enabled: true,
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        align:'center',
                        // x:20,
                        // float:true,
                        borderWidth: 0,
                        itemMarginTop:5,
                        itemMarginBottom:5,
                        itemStyle:{
                            width:210,
                            lineHeight:20,
                            fontSize:13             
                        },
                        useHTML: false,
                        labelFormatter: function () {
                            var style = 'font-family:Co Text W01 Light;';
                            style += "color:#46545d;"
                            return '<div style="' + style + '">' + this.name + '</div>';
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
                    data: value.data,
                    size: '80%',
                    innerSize: '65%',
                    showInLegend: true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        };

        var column = function (value) {
            return {
                options: {
                    chart: {
                        height:'250',
                        type: 'column'
                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            borderRadius: 5
                        },
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: false,
                                format: '{point.y:.1f}'
                            }
                        }
                    },
                    tooltip: {
                        hideDelay:0.1,
                        crosshairs: false,
                        shared: true,
                        followPointer: true,                        
                        borderWidth: 0,
                        backgroundColor: '#DBDBD9',
                        shadow: false,
                        useHTML: true,
                        positioner: function(boxWidth, boxHeight, point) {
                            return {
                                x: point.plotX - boxWidth/2 +10 ,
                                y: point.plotY - boxHeight - 5
                            };
                        },
                        formatter: function () {
                            return '<div style="position:relative;"><div class="tooltipPie" style="font-size: 14px; font-weight: 600; padding: 5px 7px">' + 
                            Highcharts.numberFormat(this.y, (this.y % 1 === 0 ? 0 : 1)) + '</div> <span style="position: absolute; left: 33%; bottom: -15px; background:url(/img/arrowPie.png) left top no-repeat; width: 15px; height: 9px; display: block;" "></span> </div>';
                        }
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
                    colorByPoint: false,
                    color: {
                        linearGradient: {
                            x1: 1,
                            y1: 1,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#523E8A'],
                            [1, '#1AA1DB']
                        ]
                    },
                    data: value.data
                }]
            }
        };

        var getChart = function (type, value) {

            switch (type) {
            case ChartType.AREA:
                return area(value);
                break;
            case ChartType.AREA_MODAL:
                return areaModal(value);
                break;
            case ChartType.PIE:
                return pie(value);
                break;
            case ChartType.COLUMN:
                return column(value);
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

    }
]);