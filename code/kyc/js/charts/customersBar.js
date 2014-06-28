angular.module('kyc.charts')
.factory('CustomersBar',['ChartType','Colors', function(ChartType,Colors) {

	var type = ChartType.COLUMN;
    var title = 'Customers (Bar)'
    var data = [
        {name:_tr("New"),y:0,color:Colors[0]},
        {name:_tr("Returning"),y:0,color:Colors[1]}    
    ]
    var newCustomers = [];
    var repeatedCustomers = [];
    
	function setData(order,minDate,maxDate){
        var minTimestamp = minDate.getTime();
        var maxTimestamp = maxDate.getTime();
        var orderData = new Date(order.created).getTime();        
        if (orderData >= minTimestamp && orderData <= maxTimestamp){
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
	}

    function clearData(){
        data = [
            {name:_tr("New"),y:0,color:Colors[0]},
            {name:_tr("Returning"),y:0,color:Colors[1]}    
        ]
        newCustomers = [];
        repeatedCustomers = [];
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
            data:getData()
        }
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);