angular.module('kyc.services')
.service('Stream',['ACCOUNT_ID','Order', function(ACCOUNT_ID,Order) {

	console.log('init stream service');
  
    var orders;
    
    function getOrders(){
    		console.log("getting orders on service:",orders);
        return orders
		}

		function load() {                     
        return Order.query({accountId:ACCOUNT_ID},function (res){
          console.log('got orders on service',res);
          orders = res;
				}).$promise;            
      }
		
    return {
    	load:load,
    	getOrders:getOrders,    

    }

}]);