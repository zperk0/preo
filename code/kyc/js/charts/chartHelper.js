angular.module('kyc.charts')
.factory('ChartHelper',['$filter', 'TickInterval', function($filter, TickInterval) {

	
    function formatDate(timestamp){
    	var date = new Date(timestamp);
    	return  $filter('date')(date, "dd-MMM-yyyy")    	
    }

    function getPercentage(data,oldData){
        var totalData = getPeriodTotal(data);
        var totalOldData = getPeriodTotal(oldData)        
        var percentage = (totalData * 100 / totalOldData)        
        return percentage === Infinity ? '' : percentage.toFixed(2);
    }

    function getPeriodTotal(data){
        var total = 0;
        angular.forEach(data,function(d){
            total+= d[1]
        })
        return total.toFixed(0);
    }

    var FilterCharts = {
        day: function( data, valueOf ) {
            return data.filter(function( y, index ){
                return moment(y[0]).valueOf() === moment(valueOf).valueOf();
            });
        },
        week: function( data, valueOf ) {
            return data.filter(function( y, index ){
                return moment(y[0]).week() === moment(valueOf).week();
            });
        },
        month: function( data, valueOf ) {
            return data.filter(function( y, index ){
               return moment(y[0]).month() == moment(valueOf).month();
            });
        }
    };

    var CalculateCharts = {
        day: function( data, dataRow ) {
            var daysFiltered = FilterCharts.day(data, dataRow[0]);

            var dataRowCopied = angular.copy(dataRow);

            if ( daysFiltered.length ) {
                daysFiltered[1] += +dataRowCopied[1];
            } else {
                dataRowCopied[0] = moment(dataRowCopied[0]).startOf('day').valueOf();
                data.push(dataRowCopied);
            }
        },
        week: function( data, dataRow ) {
            var weekFiltered = FilterCharts.week(data, dataRow[0]);
            var dataRowCopied = angular.copy(dataRow);

            if ( weekFiltered.length ) {
                data[ data.indexOf(weekFiltered[0]) ][1] += +dataRowCopied[1];
            } else {
                dataRowCopied[0] = moment(dataRowCopied[0]).startOf('week').valueOf();
                data.push(dataRowCopied);
            }
        },
        month: function( data, dataRow ) {
            var monthsFiltered = FilterCharts.month(data, dataRow[0]);
            var dataRowCopied = angular.copy(dataRow);

            if ( monthsFiltered.length ) {
                data[ data.indexOf(monthsFiltered[0]) ][1] += dataRowCopied[1];
            } else {
                dataRowCopied[0] = moment(dataRowCopied[0]).startOf('month').valueOf();
                data.push(dataRowCopied);
            }
        }
    };    

    function getPreparedAreaData(chartData,minTimestamp,maxTimestamp,showDecimal){
        showDecimal = showDecimal ? showDecimal : false;
        var previousSpecifiedTimestamp =  moment(minTimestamp - (maxTimestamp - minTimestamp))        
        var weekTimestamp = moment().subtract('week',1);
        var lastWeekTimestamp = moment().subtract('week',2);
        var monthTimestamp = moment().subtract('month',1);
        var lastMonthTimestamp = moment().subtract('month',2);
        var threeMonthsTimestamp = moment().subtract('month',3);
        var lastThreeMonthsTimestamp = moment().subtract('month',6);
        var sixMonthsTimestamp = moment().subtract('month',6);
        var lastSixMonthsTimestamp = moment().subtract('month',12);
        var yearTimestamp = moment().subtract('year',1);
        var lastYearTimestamp = moment().subtract('year',2);


        var data = [];
        var dataModal = [];
        var previousSpecifiedData = [];
        var weekData = [];
        var previousWeekData = [];
        var monthData = [];
        var previousMonthData = [];
        var threeMonthsData = [];
        var previousThreeMonthsData = [];
        var sixMonthsData = [];
        var previousSixMonthsData = [];
        var previousYearData = [];
        var total = 0;

        var yearData = [];

        var dateType = calculateTickIntervalForString({maxTimestamp: maxTimestamp, minTimestamp: minTimestamp});

        var functionFilteredDates = null;

        switch (dateType) {
            case 'day':
                functionFilteredDates = CalculateCharts.day;
                break;
            case 'week':
                functionFilteredDates = CalculateCharts.week;
                break;
            case 'month':
                functionFilteredDates = CalculateCharts.month;
                break;
        }        

        angular.forEach(chartData,function(dR,key){                                
            var orderDate = Number(key)
            var dataRow = [Number(key),Number(dR.toFixed(2))];
            
            if (minTimestamp <= orderDate && maxTimestamp >= orderDate ){
                functionFilteredDates(dataModal, dataRow);
                data.push(dataRow);
                total +=dR;                
            } else if (orderDate < minTimestamp && orderDate >= previousSpecifiedTimestamp) {
                previousSpecifiedData.push(dataRow)
            }

            if (orderDate >= weekTimestamp) {
                CalculateCharts.day( weekData, dataRow );
            }
            if (orderDate >= lastWeekTimestamp && orderDate< weekTimestamp)
                previousWeekData.push(dataRow)
            if (orderDate >= monthTimestamp){
                CalculateCharts.day( monthData, dataRow );
            }
            if (orderDate >= lastMonthTimestamp && orderDate < monthTimestamp)
                previousMonthData.push(dataRow)

            if (orderDate >= threeMonthsTimestamp) {
                CalculateCharts.week( threeMonthsData, dataRow );
            }
            if (orderDate >= lastThreeMonthsTimestamp && orderDate < threeMonthsTimestamp)
                previousThreeMonthsData.push(dataRow)


            if (orderDate >= sixMonthsTimestamp) {
                CalculateCharts.week( sixMonthsData, dataRow );
            }
            if (orderDate >= lastSixMonthsTimestamp && orderDate < sixMonthsTimestamp)
                previousSixMonthsData.push(dataRow)
            if (orderDate >= yearTimestamp) {
                CalculateCharts.month( yearData, dataRow );
            }
            if (orderDate >= lastYearTimestamp && orderDate < yearTimestamp)
                previousYearData.push(dataRow)

        });


        data.sort(sortData);
        dataModal.sort(sortData);
        weekData.sort(sortData);
        previousWeekData.sort(sortData);
        monthData.sort(sortData);
        previousMonthData.sort(sortData);
        threeMonthsData.sort(sortData);
        previousThreeMonthsData.sort(sortData);
        sixMonthsData.sort(sortData);
        previousSixMonthsData.sort(sortData);
        yearData.sort(sortData);
        previousYearData.sort(sortData);

        if (showDecimal){            
            total = total.toFixed(2)
        }   

        return {
            data: completeEmptyData({
                max: moment(maxTimestamp).startOf('day'),
                min: moment(minTimestamp).startOf('day').valueOf(),
                value: dataModal,
                dateType: calculateTickIntervalForString({ maxTimestamp: maxTimestamp, minTimestamp: minTimestamp }),
                filterData: function( data, valueOf ) {
                    switch (this.dateType) {
                        case 'day':
                            return FilterCharts.day(data, valueOf);
                            break;
                        case 'week':
                            return FilterCharts.week(data, valueOf);
                            break;
                        case 'month':
                            return FilterCharts.month(data, valueOf);
                            break;
                    }
                }
            }),
            dataModal: dataModal,
            previousSpecifiedData: previousSpecifiedData,
            weekData: weekData,
            previousWeekData: previousWeekData,
            monthData: monthData,
            previousMonthData: previousMonthData,
            threeMonthsData: threeMonthsData,
            previousThreeMonthsData: previousThreeMonthsData,
            sixMonthsData: sixMonthsData,
            previousSixMonthsData: previousSixMonthsData,
            yearData: yearData,
            previousYearData: previousYearData,
            total: total,
            minTimestamp: minTimestamp,
            maxTimestamp: maxTimestamp
        }
    }

    function calculateTickInterval( prepData ) {
        var daysDiff = moment(prepData.maxTimestamp,'X').diff(moment(prepData.minTimestamp,'X'), 'days');
        
        switch( true ) {
            case daysDiff < 32:
                return TickInterval.DAY;
                break;
            case daysDiff < 92:
                return TickInterval.WEEK;
                break;
            case daysDiff < 183:
                return TickInterval.WEEK_THREE;
                break;
            default:
                return TickInterval.MONTH;
                break;
        }
    }

    function calculateTickIntervalForString( prepData ) {
        var daysDiff = moment(prepData.maxTimestamp,'X').diff(moment(prepData.minTimestamp,'X'), 'days');
        
        switch( true ) {
            case daysDiff < 32:
                return 'day';
                break;
            case daysDiff < 183:
                return 'week';
                break;
            default:
                return 'month';
                break;
        }
    }

    function completeEmptyData( data ) {
        var maxTimeStampForWhile = data.max;
        var minTimestampForWhile = data.min;

        var responseData = angular.copy(data.value);

        while ( true ) {
            var valueOf = maxTimeStampForWhile.valueOf();

            if ( valueOf < minTimestampForWhile ) {
                break;
            }

            var dataFiltered = data.filterData( responseData, valueOf );

            if ( !dataFiltered.length ) {
                var valueObject = [valueOf, 0];
                responseData.push(valueObject);
            }

            maxTimeStampForWhile = maxTimeStampForWhile.subtract(data.dateType, 1);
        }

        responseData.sort(sortData);

        return responseData;
    }

    function getModalOptions(prepData){
       // options for footer in modal

      return [{
                name: _tr('Specified Dates'),
                value: getPeriodTotal(prepData.data),
                percent: getPercentage(prepData.data, prepData.previousSpecifiedData),
                active: true,
                data: completeEmptyData({
                    max: moment(prepData.maxTimestamp).startOf('day'),
                    min: moment(prepData.minTimestamp).startOf('day').valueOf(),
                    value: prepData.dataModal,
                    dateType: calculateTickIntervalForString(prepData),
                    filterData: function( data, valueOf ) {
                        switch (this.dateType) {
                            case 'day':
                                return FilterCharts.day(data, valueOf);
                                break;
                            case 'week':
                                return FilterCharts.week(data, valueOf);
                                break;
                            case 'month':
                                return FilterCharts.month(data, valueOf);
                                break;
                        }
                    }
                }),
                tickInterval: calculateTickInterval(prepData),
                minTimestamp: prepData.minTimestamp,
                maxTimestamp: prepData.maxTimestamp                
            }, {
                name: _tr('Week'),
                value: getPeriodTotal(prepData.weekData),
                percent: getPercentage(prepData.weekData, prepData.previousWeekData),
                data: completeEmptyData({
                    max: moment().startOf('day'),
                    min: moment().subtract('week', 1).startOf('day').valueOf(),
                    value: prepData.weekData,
                    dateType: 'day',
                    filterData: FilterCharts.day
                }),                
                tickInterval: TickInterval.DAY,
                minTimestamp: moment().subtract('week',1),
                maxTimestamp: moment()
            }, {
                name: _tr('Month'),
                value: getPeriodTotal(prepData.monthData),
                percent: getPercentage(prepData.monthData, prepData.previousMonthData),
                data: completeEmptyData({
                    max: moment().startOf('day'),
                    min: moment().subtract('month',1).startOf('day').valueOf(),
                    value: prepData.monthData,
                    dateType: 'day',
                    filterData: FilterCharts.day
                }),                  
                tickInterval: TickInterval.DAY,
                minTimestamp: moment().subtract('month', 1),
                maxTimestamp: moment()
            }, {
                name: _tr('3 Months'),
                value: getPeriodTotal(prepData.threeMonthsData),
                percent: getPercentage(prepData.threeMonthsData, prepData.previousThreeMonthsData),
                data: completeEmptyData({
                    max: moment().startOf('day'),
                    min: moment().subtract('month',3).startOf('day').valueOf(),
                    value: prepData.threeMonthsData,
                    dateType: 'week',
                    filterData: FilterCharts.week
                }),                  
                tickInterval: TickInterval.WEEK,
                minTimestamp: moment().subtract('month',3),
                maxTimestamp: moment()
            }, {
                name: _tr('6 Months'),
                value: getPeriodTotal(prepData.sixMonthsData),
                percent: getPercentage(prepData.sixMonthsData, prepData.previousSixMonthsData),
                data: completeEmptyData({
                    max: moment().startOf('day'),
                    min: moment().subtract('month',6).startOf('day').valueOf(),
                    value: prepData.sixMonthsData,
                    dateType: 'week',
                    filterData: FilterCharts.week
                }),                    
                tickInterval: TickInterval.WEEK_THREE,
                minTimestamp: moment().subtract('month',6),
                maxTimestamp: moment()
            }, {
                name: _tr('Year'),
                value: getPeriodTotal(prepData.yearData),
                percent: getPercentage(prepData.yearData, prepData.previousYearData),
                data: completeEmptyData({
                    max: moment().startOf('day'),
                    min: moment().subtract('year',1).startOf('day').valueOf(),
                    value: prepData.yearData,
                    dateType: 'month',
                    filterData: FilterCharts.month
                }),                 
                tickInterval: TickInterval.MONTH,
                minTimestamp: moment().subtract('year',1),
                maxTimestamp: moment()
            }, ]

    }


    function sortData(a,b){
            return a[0] - b[0]; 
    }

    return {
        formatDate:formatDate,
        getPercentage:getPercentage,
        getPeriodTotal:getPeriodTotal,
        getPreparedAreaData:getPreparedAreaData,
        getModalOptions:getModalOptions

    };
}]);