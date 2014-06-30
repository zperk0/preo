angular.module('kyc.services')
.service('StreamService',['ACCOUNT_ID','Order', function(ACCOUNT_ID,Order) {

  
    var orders;
    
    function getOrders(){
        orders.sort(function(a,b){
          return (new Date(b.updated).getTime() - new Date(a.updated).getTime());
        })
        return orders
		}

		function load(callback) {                     
        return Order.query({accountId:ACCOUNT_ID},function (res){
          orders = res;
          if(callback)
            callback(res);
				}).$promise;            
      }
		
    return {
    	load:load,
    	getOrders:getOrders,    

    }

}]);