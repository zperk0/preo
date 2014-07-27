angular.module('kyc.charts')
.factory('MostPopularItems',['ChartType','Colors','ChartHelper', function(ChartType,Colors,ChartHelper) {

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
        var orderData = moment(order.paid);
        if (orderData >= minDate && orderData <= maxDate){
            angular.forEach(order.items,function(item){
                if (items[item.menuItemId] !== undefined)
                    items[item.menuItemId].quantity+=item.qty;
                else
                    items[item.menuItemId]={
                        name:item.name,
                        quantity:item.qty
                    };
            }); 
        }                                 
	}

    function onSetDataComplete(){
        for (var id in items){
            for (var pos in top5){
                if (items[id].quantity > top5[pos].y){
                    for (var i=(top5.length-1);i>pos;i--){
                        top5[i].y = top5[i-1].y
                        top5[i].name = top5[i-1].name
                    }
                    top5[pos].y = items[id].quantity;
                    top5[pos].name = items[id].name;
                    break;
                }
            }
        }
        top5 = _.filter(top5,function(row){
            return row.name !== undefined
        })
        
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
        var csvData =[[moment(minTimestamp).format("DD-MMM-YYYY") + " - " + moment(maxTimestamp).format("DD-MMM-YYYY")],[title]]
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