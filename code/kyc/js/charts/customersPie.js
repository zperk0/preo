angular.module('kyc.charts')
.factory('CustomersPie',['ChartType','Colors','ChartHelper', function(ChartType,Colors,ChartHelper) {

	var type = ChartType.PIE;
    var colorIndex = 0;    
    var title = _tr('Customers (Pie)');
    var data = [
        {name:_tr("New"),y:0,color:Colors[0]},
        {name:_tr("Returning"),y:0,color:Colors[1]}    
    ]
    var newCustomers = [];
    var repeatedCustomers = [];
    var minTimestamp = 0;
    var maxTimestamp = 0;

    function clearData(){
        colorIndex =0;
        data = [
            {name:_tr("New"),y:0,color:Colors[0]},
            {name:_tr("Returning"),y:0,color:Colors[1]}    
        ]
        newCustomers = [];
        repeatedCustomers = [];
    }
    
	function setData(order,minDate,maxDate){
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        var orderData = moment.utc(order.paid);
        if (orderData >= minDate && orderData <= maxDate){
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
            dataJson: JSON.stringify(data),
            categories: [data[0].name,data[1].name]
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