angular.module('kyc.services')
.service('OutletService',['ACCOUNT_ID','Outlet', function(ACCOUNT_ID,Outlet) {

    var outlets = Outlet.query({accountId:ACCOUNT_ID});
    
    this.getOutlets = function(){    	
        return outlets;
    }

    this.getOutletName = function(outletId){    	
    	var found = false;
        console.log("outletId",outletId,outlets);
    		angular.forEach(outlets,function(outlet){
    			if (outlet.id == outletId){
    				found = outlet.name
                    console.log('found',outlet.id,outletId);
                }
    		})
    		return found;
    }
}]);