angular.module('kyc.charts')
.factory('AverageOrderValueArea',['ChartType', 'ChartHelper', 'PaymentType', function(ChartType, ChartHelper, PaymentType) {

    var type = ChartType.AREA;
    var dailyAverageTotal = {};
    var dailyAverageOrder = {};
    var title = _tr('Average order value (area)');
    var prepDataTotal = {};
    var prepDataOrder = {};
    var prepData = {};
    var minTimestamp =0;
    var maxTimestamp =0;
    var currency;

    function setData(order,minDate,maxDate){
        var timestamp = order.paymentType == PaymentType.CASH ? order.created : order.paid;
        timestamp = moment.utc(timestamp).endOf('day').valueOf();

        if (dailyAverageTotal[timestamp]){
            dailyAverageTotal[timestamp] += order.total;
            ++dailyAverageOrder[timestamp];
        }
        else {
            dailyAverageTotal[timestamp] = order.total;
            dailyAverageOrder[timestamp] = 1;
        }
    }

    function onSetDataComplete(minDate,maxDate,currencySymbol){
        currency = currencySymbol;
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        prepDataTotal = ChartHelper.getPreparedAreaData(dailyAverageTotal,minDate,maxDate,true);
        prepDataOrder = ChartHelper.getPreparedAreaData(dailyAverageOrder,minDate,maxDate,true);

        prepData = averageData( prepDataTotal, prepDataOrder, minDate, maxDate );
    }

    function averageData( prepDataTotal, prepDataOrder, minDate, maxDate ) {

        var prepDataAverage = {};

        angular.forEach(prepDataTotal, function( value, key ) {

            if ( value instanceof Array ) {

                var result = [];

                for (var i = 0, len = value.length; i < len; i++) {
                    var valueData = value[i];

                    var resultNumber = 0;

                    var valuePrepDataOrder = prepDataOrder[key][i][1];

                    if ( valueData[1] > 0 && valuePrepDataOrder > 0 ) {
                        resultNumber = ((valueData[1] / valuePrepDataOrder).toFixed(2)) / 1;
                    }

                    result.push( [valueData[0], resultNumber] );
                };

                prepDataAverage[key] = result;

            } else {
                prepDataAverage[key] =  ((value / prepDataOrder[key]).toFixed(2)) / 1;
            }

        })

        return {
            data: prepDataAverage.data,
            dataModal: prepDataAverage.dataModal,
            previousSpecifiedData: prepDataAverage.previousSpecifiedData,
            weekData: prepDataAverage.weekData,
            previousWeekData: prepDataAverage.previousWeekData,
            monthData: prepDataAverage.monthData,
            previousMonthData: prepDataAverage.previousMonthData,
            threeMonthsData: prepDataAverage.threeMonthsData,
            previousThreeMonthsData: prepDataAverage.previousThreeMonthsData,
            sixMonthsData: prepDataAverage.sixMonthsData,
            previousSixMonthsData: prepDataAverage.previousSixMonthsData,
            yearData: prepDataAverage.yearData,
            previousYearData: prepDataAverage.previousYearData,
            total: isNaN(prepDataAverage.total) ? (0).toFixed(2) : prepDataAverage.total.toFixed(2),
            minTimestamp: minDate,
            maxTimestamp: maxDate
        }
    }


    function getData(){
       return prepData.data;
    }

    function getType(){
        return type;
    }


    function getHighChart(){

        return {
            type:type,
            title:title,
            data: getData(),
            currency:currency,
            numberLeft:prepData.total,
            modal: getModal(),
            getPdf:getPdf,
            getCsv:getCsv,
            tooltipText:decodeURI(currency)

        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[moment.utc(minTimestamp).format("DD-MMM-YYYY") + " - " + moment.utc(maxTimestamp).format("DD-MMM-YYYY")],[title]]
        angular.forEach(data,function(d){
            csvData.push([ ChartHelper.formatDate(d[0]),d[1]])
        })
        return {
            data:csvData
        };
    }

    function clearData(){

        dailyAverageTotal = {};
        dailyAverageOrder = {};
        prepDataTotal = {};
        prepDataOrder = {};
        prepData = {};

    }

    function getPdf(){
        return  {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,
            total: prepData.total,
            currency:currency,
            percentage:ChartHelper.getPercentage(prepData.data,prepData.previousSpecifiedData),
            dataJson: JSON.stringify(getData())
        }
    }


    function getModal(){
        return  {
            highcharts: {
                type: ChartType.AREA_MODAL // type of highcharts in modal
            },
            options: ChartHelper.getModalOptions(prepData)
        }
    }


    return {
        getData:getData,
        getType:getType,
        clearData:clearData,
        setData:setData,
        onSetDataComplete:onSetDataComplete,
        getHighChart:getHighChart
    };
}]);