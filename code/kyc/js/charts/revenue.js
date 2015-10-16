angular.module('kyc.charts')
.factory('Revenue',['ChartType', 'ChartHelper', 'PaymentType', function(ChartType, ChartHelper, PaymentType) {

	var type = ChartType.AREA;
    var dailyRevenue = {};
    var title = _tr('Revenue');
    var prepData = {};
    var minTimestamp =0;
    var maxTimestamp =0;
    var currency;

	function setData(order,minDate,maxDate){
        var timestamp = order.paymentType == PaymentType.CASH ? order.pickupTime : order.paid;
        timestamp = moment.utc(timestamp).endOf('day').valueOf();

        if (dailyRevenue[timestamp])
            dailyRevenue[timestamp]+=order.total
        else
            dailyRevenue[timestamp]=order.total;
	}

    function onSetDataComplete(minDate,maxDate,currencySymbol){
        currency = currencySymbol;
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        prepData = ChartHelper.getPreparedAreaData(dailyRevenue,minDate,maxDate,true);
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
            numberRight:ChartHelper.getPercentage(prepData.data,prepData.previousSpecifiedData),
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

        dailyRevenue = {};
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