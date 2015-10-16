angular.module('kyc.charts')
.factory('MostPopularItems',['ChartType', 'Colors', 'ChartHelper', 'UtilsService', 'PaymentType', function(ChartType, Colors, ChartHelper, UtilsService, PaymentType) {

	var type = ChartType.PIE;
    var items = {};
    var title = _tr('Most Popular Items');
    var minTimestamp = 0;
    var maxTimestamp = 0;

    var top5 = [
        {y:0,color:Colors[0]},
        {y:0,color:Colors[1]},
        {y:0,color:Colors[2]},
        {y:0,color:Colors[3]},
        {y:0,color:Colors[4]}
    ]

    function clearData(){
        items = {}
        top5 = [
            {y:0,color:Colors[0]},
            {y:0,color:Colors[1]},
            {y:0,color:Colors[2]},
            {y:0,color:Colors[3]},
            {y:0,color:Colors[4]}
        ];
    }

	function setData(order,minDate,maxDate){
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        var orderData = order.paymentType == PaymentType.CASH ? order.pickupTime : order.paid;
        orderData = moment.utc(orderData);
        if (orderData >= minDate && orderData <= maxDate){
            angular.forEach(order.items,function(item){
                if (items[item.menuItemId] !== undefined)
                    items[item.menuItemId].quantity+=item.qty;
                else
                    items[item.menuItemId]={
                        id:item.menuItemId,
                        name:item.name,
                        quantity:item.qty
                    };
            });
        }
	}

    function getIds(list){
        var idList = []
        angular.forEach(list,function(item){
            idList.push(item.id);
        })
        return idList;
    }

    function onSetDataComplete(){
        var allMenuItems = getIds(UtilsService.getItems());
        var itemsArray = _.chain(_.values(items))
            .filter(function(item){return allMenuItems.indexOf(item.id) > -1})
            .sortBy(function(item){return -item.quantity})
            .first(5)
            .value();
        for (var i=0;i<itemsArray.length;i++){
            top5[i].y = itemsArray[i].quantity;
            top5[i].name = itemsArray[i].name;
        }
    }

	function getData(){
        return top5;
    }


    function getType(){
    	return type;
    }

    function getHighChart(){
        return {
            type:type,
            title:title,
            data:getData(),
            getPdf:getPdf,
            getCsv:getCsv
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[moment.utc(minTimestamp).format("DD-MMM-YYYY") + " - " + moment.utc(maxTimestamp).format("DD-MMM-YYYY")],[title]]
        angular.forEach(data,function(d){
            csvData.push([d.name,d.y])
        })
        return {
            data:csvData
        };
    }

    function getPdf(){
        return  {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,
            dataJson: angular.toJson(getData()),
            categories: getCategories()
        }
    }

    function getCategories(){
        var arr = []
        angular.forEach(top5,function(item){
            arr.push(item.name);
        })
        return arr;
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        onSetDataComplete:onSetDataComplete,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);