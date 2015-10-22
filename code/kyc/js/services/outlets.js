angular.module('kyc.services')
.service('OutletService',['ACCOUNT_ID', 'VENUE_ID', 'Outlet', '$q', function(ACCOUNT_ID, VENUE_ID, Outlet, $q) {
    var outlets = null;
    var deferred = null;

    this.init = function(callback){
         outlets = Outlet.query({accountId:ACCOUNT_ID, venueId: VENUE_ID},function(res){
            callback(res);

            if (deferred) {
                deferred.resolve();
            }
        }, function () {
            deferred.reject();
        });
    }    
    
    this.getOutlets = function(){
        if (outlets) {
            return $q.when(outlets);
        }

        if (!deferred) {
            deferred = $q.defer();
        }

        return deferred.promise;
    }

    this.getOutletName = function(outletId){    	
    	var found = false;
    		angular.forEach(outlets,function(outlet){
    			if (outlet.id == outletId){
    				found = outlet.name
                }
    		})
    		return found;
    };
}]);