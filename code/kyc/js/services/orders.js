angular.module('kyc.services')
.service('OrderService',['ACCOUNT_ID','Order', function(ACCOUNT_ID,Order) {

    
    //start with at least one year of data    
    var orders;

    
    function getOrders(){
        return orders
		}

    function getMinData(){
      return minData;
    }

    function getMaxData(){
      return maxData;
    }

		function load(callback,minCreated,maxCreated) {                         
        return Order.query({accountId:ACCOUNT_ID,maxCreated:maxCreated,minCreated:minCreated},function (res){
          orders = res;
          if(callback)
            callback(res);
				}).$promise;            
      }

		
    return {
    	load:load,
    	getOrders:getOrders

    }

}]);