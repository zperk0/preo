angular.module('kyc.services')
.service('OrderService',['ACCOUNT_ID','Order','INITIAL_DATES', function(ACCOUNT_ID,Order,INITIAL_DATES) {

    
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

		function load(minPaid,maxPaid) {                   
      minPaid = minPaid === undefined ? moment(INITIAL_DATES.start).startOf('day').valueOf() : minPaid.startOf('day').valueOf();
      maxPaid = maxPaid === undefined ? moment(INITIAL_DATES.end).startOf('day').valueOf() : maxPaid.endOf('day').valueOf();
        return Order.query({accountId:ACCOUNT_ID,maxPaid:maxPaid,minPaid:minPaid},function (res){
          console.log('called load',res);
          orders = res;
				}).$promise;            
      }

		
    return {
    	load:load,
    	getOrders:getOrders

    }

}]);