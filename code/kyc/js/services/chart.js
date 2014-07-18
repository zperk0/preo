
'use strict';
angular.module('kyc.services', []).
service('$chartService', ['ChartType','$filter',
    function (ChartType,$filter) {

        var area = function (value) {
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
                                enabled: false

                            }
                        }
                    },
                    tooltip: {
                        // borderColor: '#1576B7',
                        borderWidth: 0,
                        shadow:false,
                        // backgroundColor: '#1576B7',
                        useHTML:true,
                        positioner: function(boxWidth, boxHeight, point) {
                            return {
                                x: point.plotX - boxWidth/2 +20,
                                y: point.plotY - boxHeight - 10
                            };
                        },
                        formatter: function () {                                                        
                            var date = $filter('date')(new Date(this.x), 'dd MMM yyyy');                                                        
                            var ui_str = '<div style="background-color: #1576B7; border-radius: 5px; color:#fff;font-family:\'Co Text W01 Light\'; text-align:center; padding:18px 8px;">'+date ;                            
                            console.log(value,value.tooltipText);
                            var tooltipText = (this.y == 1 && value.tooltipText[value.tooltipText.length-1].toLowerCase() ==='s' ) ? value.tooltipText.slice(0,-1) : value.tooltipText;                                                    
                            ui_str += '<b style="color:#fff;font-size:160%;font-weight:bold;font-family:\'Co Text W01 Bold\';text-align:center;display:block;margin-top:8px;">';                            
                            if(value.currency)
                                ui_str += this.y.toFixed(2) +""+ tooltipText+'</b></div>';
                            else
                                ui_str += this.y +""+ tooltipText+'</b></div>';
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
                    minTickInterval: 24 * 3600 * 1000,
                    labels: {
                        style: {
                            color: '#b3b6b8',
                            fontSize: '15px'
                        }

                    },
                },
                yAxis: {
                    gridLineWidth: 0,
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
                },
                series: [{
                    showInLegend: false,
                    name: '',
                    data: value.data
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
                            return '<div class="tooltipPie" style="font-size: 14px; font-weight: 600; padding: 5px 7px">' + Highcharts.numberFormat(this.y, 1) + '</div>';
                        }
                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            //center: ["25%", "50%"],
                            borderWidth:0
                        }
                    },
                    legend: {
                        enabled: true,
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        align:'right',
                        x:-50,
                        borderWidth: 0,
                        itemMarginTop:5,
                        itemMarginBottom:5,
                        itemStyle:{
                            width:"80%",
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
                            return '<div class="tooltipPie" style="font-size: 14px; font-weight: 600; padding: 5px 7px">' + Highcharts.numberFormat(this.y, 1) + '</div>';
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