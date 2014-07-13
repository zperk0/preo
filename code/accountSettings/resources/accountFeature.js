angular.module('accountSettings.resources').
  factory('AccountFeature', function($resource) {
    
    var AccountFeature = $resource('/api/accounts/:accountId/features/:featureId',{accountId:"@accountId",featureId:"@featureId"},{
    		put:{
    			method:"PUT",    
    		}
    });    

    AccountFeature.prototype.getLink = function(){    	
    	if (this.feature && this.feature.$link){
    		console.log("getting link:",this.feature.$link)
    		return this.feature.$link;
    	}
    	
    	return false;
    }

		return AccountFeature;

  });    