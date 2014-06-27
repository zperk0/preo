angular.module('kyc.charts')
.factory('MostPopularItems',['ChartType','Colors', function(ChartType,Colors) {

	var type = ChartType.PIE;
    var colorIndex = 0;
    var items = {};
    var title = 'Most Popular Items';

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
        var minTimestamp = minDate.getTime();
        var maxTimestamp = maxDate.getTime();
        var orderData = new Date(order.created);
        if (orderData >= minTimestamp && orderData <= maxTimestamp){
            angular.forEach(order.items,function(item){
                if (items[item.menuItemId] !== undefined)
                    items[item.menuItemId].quantity++;
                else
                    items[item.menuItemId]={
                        name:item.name,
                        quantity:1
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
        angular.forEach(top5,function(value,index){
            if (value.name === undefined){                
                delete top5[index];
            }
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

        }
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