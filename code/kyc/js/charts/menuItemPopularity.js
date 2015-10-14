angular.module('kyc.charts')
.factory('MenuItemPopularity',['ChartType','ChartHelper', 'UtilsService', function(ChartType,ChartHelper, UtilsService) {

	var type = ChartType.AREA;
    var title = _tr('Menu Item Popularity');
    var menuItems = {}
    var selectedItem = window.sessionStorage.getItem("KYC_SELECTED_ITEM")
    var minDate;
    var maxDate;
    var prepData = {};
    var items = [];

    items = UtilsService.getItems();


	function setData(order,minDate,maxDate){
        var timestamp = moment.utc(order.pickupTime).startOf('day').valueOf();

        angular.forEach(order.items,function(item){

            if (menuItems[item.menuItemId] === undefined){
                selectedItem = selectedItem === null ? item.menuItemId : Number(selectedItem);
                //items.push({name:item.name,menuItemId:item.menuItemId,callback:selectItem});
                menuItems[item.menuItemId] = {}
            }
            if (menuItems[item.menuItemId][timestamp] === undefined){
                menuItems[item.menuItemId][timestamp]=0
            }
            menuItems[item.menuItemId][timestamp]+=item.qty;
        });

	}

    function selectItem(itemId,cb){
        // clearData();
        selectedItem = itemId;
        window.sessionStorage.setItem("KYC_SELECTED_ITEM",itemId);

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
            selectedItemId:selectedItem,
            selectedItem: getItem(selectedItem),
            selectItem:selectItem,
            data: getData(),
            numberLeft:prepData.total,
            modal: getModal(),
            items: UtilsService.getItems(),
            getPdf:getPdf,
            getCsv:getCsv,
            tooltipText: _tr(' orders')
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[minDate.format("DD-MMM-YYYY") + " - " + maxDate.format("DD-MMM-YYYY")],[getItemName(selectedItem)]];
        angular.forEach(data,function(d){
            csvData.push([ ChartHelper.formatDate(d[0]),d[1] ])
        })

        return {
            data:csvData
        };
    }

    function getPdf(){
        return  {
            type:type,
            title:title + " - " +getItemName(selectedItem),
            startDate: minDate.valueOf(),
            endDate: maxDate.valueOf(),
            total: prepData.total,
            percentage:ChartHelper.getPercentage(prepData.data,prepData.previousSpecifiedData),
            dataJson: JSON.stringify(getData())
        }
    }

    function clearData(){
        prepData = {};
        items =[];
        menuItems = {};
    }

    function getItemName(itemId){
        var found = false;
        angular.forEach(UtilsService.getItems(),function(item){
                if (item.id == itemId)
                    found = item.name
        })
        return found
    }

    function getItem(itemId) {
        var found = false;
        angular.forEach(UtilsService.getItems(),function(item, key){
                if (item.id == itemId)
                    found = item
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