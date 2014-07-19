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
            total+=d[1]
        })
        return total.toFixed(0);
    }

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

        var data = []
        var previousSpecifiedData = [];
        var weekData = []   
        var previousWeekData = []
        var monthData = [];
        var previousMonthData = []
        var threeMonthsData = []
        var previousThreeMonthsData =[]
        var sixMonthsData = []
        var previousSixMonthsData = []
        var yearData = []
        var previousYearData = [];
        var total = 0;

        angular.forEach(chartData,function(dR,key){                                
            var orderDate = Number(key)
            var dataRow = [Number(key),Number(dR.toFixed(2))];
            
            if (minTimestamp <= orderDate && maxTimestamp >= orderDate ){
                data.push(dataRow);            
                total +=dR;                
            } else if (orderDate < minTimestamp && orderDate >= previousSpecifiedTimestamp)
                previousSpecifiedData.push(dataRow)
            if (orderDate >= weekTimestamp)
                weekData.push(dataRow)
            if (orderDate >= lastWeekTimestamp && orderDate< weekTimestamp)
                previousWeekData.push(dataRow)
            if (orderDate >= monthTimestamp)
                monthData.push(dataRow)
            if (orderDate >= lastMonthTimestamp && orderDate < monthTimestamp)
                previousMonthData.push(dataRow)

            if (orderDate >= threeMonthsTimestamp)
                threeMonthsData.push(dataRow)
            if (orderDate >= lastThreeMonthsTimestamp && orderDate < threeMonthsTimestamp)
                previousThreeMonthsData.push(dataRow)


            if (orderDate >= sixMonthsTimestamp)
                sixMonthsData.push(dataRow)
            if (orderDate >= lastSixMonthsTimestamp && orderDate < sixMonthsTimestamp)
                previousSixMonthsData.push(dataRow)
            if (orderDate >= yearTimestamp)
                yearData.push(dataRow)
            if (orderDate >= lastYearTimestamp && orderDate < yearTimestamp)
                previousYearData.push(dataRow)

        });

        

        data.sort(sortData);
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
            data:data,
            previousSpecifiedData:previousSpecifiedData,
            weekData:weekData,
            previousWeekData:previousWeekData,
            monthData:monthData,
            previousMonthData:previousMonthData,
            threeMonthsData:threeMonthsData,
            previousThreeMonthsData:previousThreeMonthsData,
            sixMonthsData:sixMonthsData,
            previousSixMonthsData:previousSixMonthsData,
            yearData:yearData,
            previousYearData:previousYearData,
            total:total,
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
            case daysDiff < 183:
                return TickInterval.WEEK;
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

            var valueObject = [valueOf];

            if ( responseData.indexOf(valueObject) === -1 ) {
                valueObject.push(0);
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
                    max: moment(prepData.maxTimestamp),
                    min: moment(prepData.minTimestamp).valueOf(),
                    value: prepData.data,
                    dateType: calculateTickIntervalForString(prepData)
                }),
                tickInterval: calculateTickInterval(prepData),
                minTimestamp: prepData.minTimestamp,
                maxTimestamp: prepData.maxTimestamp                
            }, {
                name: _tr('Week'),
                value: getPeriodTotal(prepData.weekData),
                percent: getPercentage(prepData.weekData, prepData.previousWeekData),
                data: completeEmptyData({
                    max: moment().subtract('week',1),
                    min: moment().subtract('week', 2).valueOf(),
                    value: prepData.weekData,
                    dateType: 'day'
                }),                
                tickInterval: TickInterval.DAY,
                minTimestamp: moment().subtract('week',1),
                maxTimestamp: moment()
            }, {
                name: _tr('Month'),
                value: getPeriodTotal(prepData.monthData),
                percent: getPercentage(prepData.monthData, prepData.previousMonthData),
                data: completeEmptyData({
                    max: moment(),
                    min: moment().subtract('month',1).valueOf(),
                    value: prepData.monthData,
                    dateType: 'day'
                }),                  
                tickInterval: TickInterval.DAY,
                minTimestamp: moment().subtract('month', 1),
                maxTimestamp: moment()
            }, {
                name: _tr('3 Months'),
                value: getPeriodTotal(prepData.threeMonthsData),
                percent: getPercentage(prepData.threeMonthsData, prepData.previousThreeMonthsData),
                data: completeEmptyData({
                    max: moment(),
                    min: moment().subtract('month',3).valueOf(),
                    value: prepData.threeMonthsData,
                    dateType: 'week'
                }),                  
                tickInterval: TickInterval.WEEK,
                minTimestamp: moment().subtract('month',3),
                maxTimestamp: moment()
            }, {
                name: _tr('6 Months'),
                value: getPeriodTotal(prepData.sixMonthsData),
                percent: getPercentage(prepData.sixMonthsData, prepData.previousSixMonthsData),
                data: completeEmptyData({
                    max: moment(),
                    min: moment().subtract('month',6).valueOf(),
                    value: prepData.sixMonthsData,
                    dateType: 'week'
                }),                    
                tickInterval: TickInterval.WEEK,
                minTimestamp: moment().subtract('month',6),
                maxTimestamp: moment()
            }, {
                name: _tr('Year'),
                value: getPeriodTotal(prepData.yearData),
                percent: getPercentage(prepData.yearData, prepData.previousYearData),
                data: completeEmptyData({
                    max: moment(),
                    min: moment().subtract('year',1).valueOf(),
                    value: prepData.yearData,
                    dateType: 'month'
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