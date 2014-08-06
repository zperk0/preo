angular.module('kyc.services')
.service('OutletService',['ACCOUNT_ID', 'VENUE_ID', 'Outlet', function(ACCOUNT_ID, VENUE_ID, Outlet) {
    var outlets = [];
    this.init = function(callback){
         outlets = Outlet.query({accountId:ACCOUNT_ID, venueId: VENUE_ID},function(res){
            callback(res);
        });
    }    
    
    this.getOutlets = function(){    	
        return outlets;
    }

    this.getOutletName = function(outletId){    	
    	var found = false;
    		angular.forEach(outlets,function(outlet){
    			if (outlet.id == outletId){
    				found = outlet.name
                }
    		})
    		return found;
    }
}]);