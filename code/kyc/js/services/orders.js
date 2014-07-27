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

    function getMinDateForQuery(minPaid){     
      //we need at least two years of data to calculate the area charts,
      return minPaid === undefined  || minPaid.valueOf() > moment().subtract('year',2).valueOf() ? 
                moment().subtract('year',2).valueOf() : 
                minPaid.startOf('day').valueOf();
    }


		function load(minPaid,maxPaid) {                        
      minPaid = getMinDateForQuery(minPaid);

      //max paid on the query is always now.
      maxPaid = moment().valueOf();
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