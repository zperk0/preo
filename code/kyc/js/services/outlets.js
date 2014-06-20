angular.module('kyc.services')
.service('Outlets',['ACCOUNT_ID','Outlet', function(ACCOUNT_ID,Outlet) {

    var outlets = Outlet.query({accountId:ACCOUNT_ID});
    
    this.getOutlets = function(){    	
        return outlets;
    }

    this.getOutletName = function(outletId){    	
    	var found = false;
    	console.log('here ho',outlets);
    		angular.forEach(outlets,function(outlet){
    			console.log("foreach",outlet.id,outletId);
    			if (outlet.id == outletId)
    				found = outletId
    		})
    		return found;
    }
}]);