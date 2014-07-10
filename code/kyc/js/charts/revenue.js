angular.module('kyc.charts')
.factory('Revenue',['ChartType','ChartHelper', function(ChartType,ChartHelper) {

	var type = ChartType.AREA;	
    var dailyRevenue = {};    
    var title = 'Revenue'
    var prepData = {};
    var minTimestamp =0;
    var maxTimestamp =0;
    var currency;

	function setData(order,minDate,maxDate){

        var timestamp = moment(order.paid).startOf('day').valueOf();
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
            tooltipText:currency
            
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[title]]
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
        return chartInfo = {
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