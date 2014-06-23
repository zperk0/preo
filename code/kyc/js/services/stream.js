angular.module('kyc.services')
.service('StreamService',['ACCOUNT_ID','Order', function(ACCOUNT_ID,Order) {

	console.log('init stream service');
  
    var orders;
    
    function getOrders(){
    		console.log("getting orders on service:",orders);
        return orders
		}

		function load(callback) {                     
        return Order.query({accountId:ACCOUNT_ID},function (res){
          console.log('got orders on service',res);
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