angular.module('kyc.charts')
.factory('MostPopularItems',['ChartType','Colors','Outlets', function(ChartType,Colors,Outlets) {

	var type = ChartType.PIE;
    var colorIndex = 0;
    var items = {};
    var top5 = [
        {y:0,color:Colors[0]},
        {y:0,color:Colors[1]},
        {y:0,color:Colors[2]},
        {y:0,color:Colors[3]},
        {y:0,color:Colors[4]}                                   
    ]
    
	function setData(order){
        angular.forEach(order.items,function(item){
            if (items[item.id] !== undefined)
                items[item.id].quantity++;
            else
                items[item.id]={
                    name:item.name,
                    quantity:1
                };
        });                            
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
    }

	function getData(){
    	return top5;
    }
    function getType(){
    	return type; 
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        onSetDataComplete:onSetDataComplete
    };
}]);