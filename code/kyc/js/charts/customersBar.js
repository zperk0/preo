angular.module('kyc.charts')
.factory('CustomersBar',['ChartType','Colors', function(ChartType,Colors) {

	var type = ChartType.BAR;
    var colorIndex = 0;    
    var data = [
        {name:_tr("New"),y:0,color:Colors[0]},
        {name:_tr("Returning"),y:0,color:Colors[1]}    
    ]
    var newCustomers = [];
    var repeatedCustomers = [];
    
	function setData(order){
        var customerId  = order.userId;
        if (newCustomers.indexOf(customerId) === -1){
            newCustomers.push(customerId);
            data[0].y++;
        }
        else{
            if (repeatedCustomers.indexOf(customerId) === -1){
                repeatedCustomers.push(customerId);
                data[1].y++;
            }
        }                               
	}


	function getData(){
    	return data;
    }
    function getType(){
    	return type; 
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
    };
}]);