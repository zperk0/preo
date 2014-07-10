angular.module('kyc.charts')
.factory('MenuItemPopularity',['ChartType','ChartHelper', function(ChartType,ChartHelper) {

	var type = ChartType.AREA;	
    var title = _tr('Menu Item Popularity');
    var menuItems = {}        
    var selectedItem = -1;
    var minDate;
    var maxDate;
    var prepData = {};
    var items = [];


	function setData(order,minDate,maxDate){        
        var timestamp = moment(order.created).startOf('day').valueOf();
        angular.forEach(order.items,function(item){
            
            if (menuItems[item.menuItemId] === undefined){
                selectedItem = selectedItem == - 1 ? item.menuItemId : selectedItem;                
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
        prepData = ChartHelper.getPreparedAreaData(menuItems[selectedItem],minDate,maxDate,false);
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
            modal: getModal(),
            items:items,
            getPdf:getPdf,
            getCsv:getCsv,
            tooltipText: _tr(' orders')
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
            startDate: minDate.valueOf(),
            endDate: maxDate.valueOf(),  
            currency:"",
            total: prepData.total,
            percentage:ChartHelper.getPercentage(prepData.data,prepData.previousSpecifiedData),    
            dataJson: JSON.stringify(getData())
        }
    }

    function clearData(){
        prepData = {};        
    }

    function getItemName(itemId){
        var found = false;
        angular.forEach(items,function(item){
                if (item.menuItemId == itemId)
                    found = item.name
        })
        return found
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