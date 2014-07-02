
'use strict';
angular.module('kyc.services', []).
service('$chartService', ['ChartType',
    function (ChartType) {

        var area = function (value) {
            return {
                options: {
                    chart: {
                        type: 'areaspline'
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
                        type: 'areaspline'
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
                        borderColor: '#1576B7',
                        borderWidth: 1,
                        backgroundColor: '#1576B7',
                        formatter: function () {
                            return '<b style="color:#fff">' + this.y + ' orders</b>';
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
                        events: {
                            load: function (event) {
                                setTimeout(function () {
                                    $('.highcharts-legend-item rect').attr('rx', '20').attr('ry', '20').attr('width', '16').attr('height', '16');
                                }, 100);
                            }
                        }
                    },
                    tooltip: {
                        borderColor: '#DBDBD9',
                        borderWidth: 1,
                        backgroundColor: '#DBDBD9',
                        formatter: function () {
                            return '<b>' + this.y + '</b>';
                        }
                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            center: ["25%", "50%"],
                        }
                    },
                    legend: {
                        enabled: true,
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        x: 50,
                        borderWidth: 0,
                        useHTML: true,
                        labelFormatter: function () {
                            var style = 'font-weight: normal; font-size: 1.5em; margin-bottom: 12px; margin-top:-2px; font-family:Co Text W01 Light; padding-left:5px;';
                            style += "color:#46545d; max-width:80px;"
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
                        borderColor: '#DBDBD9',
                        borderWidth: 1,
                        backgroundColor: '#DBDBD9',
                        formatter: function () {
                            return '<b>' + this.y + ' </b>';
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