angular.module('kyc.charts')
.factory('NumberOfOrders',['ChartType', 'ChartHelper', 'PaymentType', function(ChartType, ChartHelper, PaymentType) {

	var type = ChartType.AREA;
    var dailyOrders = {};
    var title = _tr('Number of Orders');

    var minTimestamp =0;
    var maxTimestamp =0;

    var prepData = {};

	function setData(order,minDate,maxDate){
        var timestamp = order.paymentType == PaymentType.CASH ? order.pickupTime : order.paid;
        timestamp = moment.utc(timestamp).startOf('day').valueOf();
        if (dailyOrders[timestamp])
            dailyOrders[timestamp]++;
        else
            dailyOrders[timestamp]=1;
	}

    function onSetDataComplete(minDate,maxDate){
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        prepData = ChartHelper.getPreparedAreaData(dailyOrders,minDate,maxDate);


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
            numberLeft:prepData.total,
            numberRight:ChartHelper.getPercentage(getData(),prepData.previousSpecifiedData),
            modal: getModal(),
            getPdf:getPdf,
            getCsv:getCsv,
            tooltipText: _tr(' orders')

        }
    }

    function getPdf(){
        return  {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,
            total: prepData.total,
            currency:"",
            percentage:ChartHelper.getPercentage(prepData.data,prepData.previousSpecifiedData),
            dataJson: JSON.stringify(getData())
        }
    }

    function clearData(){
        prepData = {};
        dailyOrders = {};

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