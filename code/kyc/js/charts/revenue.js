angular.module('kyc.charts')
.factory('Revenue',['ChartType','ChartHelper', function(ChartType,ChartHelper) {

	var type = ChartType.AREA;	
    var dailyRevenue = {};
    var data = [];
    var title = 'Revenue'
    var totalRevenue =0;
    var minTimestamp =0;
    var maxTimestamp =0;


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
    var allDatas = []

	function setData(order,minDate,maxDate){
        var timestamp = new Date(order.paid).setHours(0, 0, 0, 0);
        if (dailyRevenue[timestamp])
            dailyRevenue[timestamp]+=order.total
        else
            dailyRevenue[timestamp]=order.total;        
        
        
        
	}

    function onSetDataComplete(minDate,maxDate){

        var nowTimestamp = new Date().getTime();        
        minTimestamp = minDate.getTime();
        maxTimestamp = maxDate.getTime();
        var previousSpecifiedTimestamp =  new Date(minTimestamp - (maxTimestamp - minTimestamp))
        var weekTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 7))
        var lastWeekTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 7 * 2))
        var monthTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 30))
        var lastMonthTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 30 * 2))
        var threeMonthsTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 90));
        var lastThreeMonthsTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 90 * 2));
        var sixMonthsTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 180))
        var lastSixMonthsTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 180 * 2))
        var yearTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 365))
        var lastYearTimestamp = new Date(new Date().getTime() - (1000 * 3600 * 24 * 365 * 2))

        previousSpecifiedData = [];
        weekData = []   
        previousWeekData = []
        monthData = [];
        previousMonthData = []
        threeMonthsData = []
        previousThreeMonthsData =[]
        sixMonthsData = []
        previousSixMonthsData = []
        yearData = []
        previousYearData = [];



        startDate = -1;
        endDate = 0;
        angular.forEach(dailyRevenue,function(dR,key){                                
            var orderDate = Number(key)
            var dataRow = [Number(key),Number(dR.toFixed(2))];
            if (minTimestamp <= orderDate && maxTimestamp >= orderDate ){
                data.push(dataRow);            
                totalRevenue +=dR;                
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

        })
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

        if (data.length>0){            
            totalRevenue = totalRevenue.toFixed(2)
        }   
    }   

    function sortData(a,b){
            return a[0] > b[0]; 
    }
	function getData(){
	   return data;
    }

    function getType(){
    	return type; 
    }
    



    function getHighChart(){
        return {
            type:type,
            title:title,
            data: getData(),
            currency:"£",
            numberLeft:totalRevenue,
            numberRight:ChartHelper.getPercentage(data,previousSpecifiedData), 
            modal: getModal(),
            getPdf:getPdf,
            getCsv:getCsv,
            tooltipText: "£"
            
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
        data = [];
        dailyRevenue = {};
        totalRevenue = 0;   

    }

    function getPdf(){
        return chartInfo = {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,  
            total: totalRevenue,
            currency:"£",
            percentage:ChartHelper.getPercentage(data,previousSpecifiedData),    
            dataJson: JSON.stringify(getData())
        }
    }


    function getModalOptions(){
        return [ // options for footer in modal
                    { name: 'Specified Dates', value: ChartHelper.getPeriodTotal(data), percent: ChartHelper.getPercentage(data,previousSpecifiedData), active: true, data:getData() },
                    { name: 'Week', value: ChartHelper.getPeriodTotal(weekData), percent: ChartHelper.getPercentage(weekData,previousWeekData), data:weekData  },
                    { name: 'Month', value: ChartHelper.getPeriodTotal(monthData), percent: ChartHelper.getPercentage(monthData,previousMonthData), data:monthData },
                    { name: '3 Months', value: ChartHelper.getPeriodTotal(threeMonthsData), percent: ChartHelper.getPercentage(threeMonthsData,previousThreeMonthsData), data:threeMonthsData },
                    { name: '6 Months', value:  ChartHelper.getPeriodTotal(sixMonthsData), percent: ChartHelper.getPercentage(sixMonthsData,previousSixMonthsData), data:sixMonthsData },
                    { name: 'Year',  value:  ChartHelper.getPeriodTotal(yearData), percent: ChartHelper.getPercentage(yearData,previousYearData), data:yearData },
                ]

    }

    function getModal(){
            return  {
                highcharts: {
                    type: ChartType.AREA_MODAL // type of highcharts in modal
                },
                options: getModalOptions()
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