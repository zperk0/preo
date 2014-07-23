angular.module('accountSettings.resources').
  factory('AccountFeature', ['$resource',function($resource) {
    
    var AccountFeature = $resource('/api/accounts/:accountId/features/:featureId',{accountId:"@accountId",featureId:"@featureId"},{
    		put:{
    			method:"PUT",    
    		},
            getPrice:{
                method:'GET',
                url:'/api/accounts/:accountId/features/:featureId/price'
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

  }]);    