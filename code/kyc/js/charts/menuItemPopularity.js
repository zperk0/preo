angular.module('kyc.charts')
.factory('MenuItemPopularity',['ChartType', function(ChartType) {

	var type = ChartType.AREA;	
    
    var data = [];
    var title = 'Menu Item Popularity'
    
    var menuItems = {}
    var startDate = 0;
    var endDate = 0;

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
    var items = [];
    
    var selectedItem = -1;

    var minDate;
    var maxDate;


	function setData(order,minDate,maxDate){        
        var timestamp = new Date(order.created).setHours(0, 0, 0, 0);
        angular.forEach(order.items,function(item){
            
            if (menuItems[item.menuItemId] === undefined){
                selectedItem = selectedItem == -1 ? item.menuItemId : selectedItem;                
                items.push({name:item.name,menuItemId:item.menuItemId,callback:selectItem}); 
                menuItems[item.menuItemId] = {}
            }
            if (menuItems[item.menuItemId][timestamp] === undefined){
                menuItems[item.menuItemId][timestamp]=0
            }
            menuItems[item.menuItemId][timestamp]++;
        });
         
	}

    function selectItem(itemId,cb){
        clearData();
        selectedItem = itemId;        
        onSetDataComplete(minDate,maxDate);        
        cb(getHighChart());
    }

    function onSetDataComplete(minDateP,maxDateP){
        minDate = minDateP;
        maxDate = maxDateP;
        var nowTimestamp = new Date().getTime();        
        var minTimestamp = minDate.getTime();
        var maxTimestamp = maxDate.getTime();
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

        data = []
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
        
        angular.forEach(menuItems[selectedItem],function(dR,key){                            
            var orderDate = Number(key)
            var dataRow = [Number(key),dR];
            if (minTimestamp <= orderDate && maxTimestamp >= orderDate ){
                data.push(dataRow);            
                totalOrders +=dR;                
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
            startDate = data[0][0];
            endDate = data[data.length-1][0];
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
            numberLeft:totalOrders,
            modal: getModal(),
            items:items,
            getPdf:getPdf,
            getCsv:getCsv
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[getItemName(selectedItem)]]
        angular.forEach(data,function(d){
            csvData.push([ ChartHelper.formatDate(d[0]),d[1] ]) 
        })
        return {
            data:csvData
        };
    }

    function getPdf(){
        return chartInfo = {
            type:type,
            title:title + " - " +getItemName(selectedItem),
            startDate: minTimestamp,
            endDate: maxTimestamp,  
            currency:"",
            total: totalOrders,
            percentage:ChartHelper.getPercentage(data,previousSpecifiedData),    
            dataJson: JSON.stringify(getData())
        }
    }

    function clearData(){
        data = [];
        dailyOrders = {};
        totalOrders = 0;   

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