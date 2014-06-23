angular.module('kyc.services')
.service('OutletService',['ACCOUNT_ID','Outlet', function(ACCOUNT_ID,Outlet) {

    var outlets = Outlet.query({accountId:ACCOUNT_ID});
    
    this.getOutlets = function(){    	
        return outlets;
    }

    this.getOutletName = function(outletId){    	
    	var found = false;
    		angular.forEach(outlets,function(outlet){
    			if (outlet.id == outletId)
    				found = outlet.name
    		})
    		return found;
    }
}]);