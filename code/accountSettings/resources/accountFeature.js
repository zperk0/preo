angular.module('accountSettings.resources').
  factory('AccountFeature', function($resource) {
    
    var AccountFeature = $resource('/api/accounts/:accountId/features/:featureId',{accountId:"@accountId",featureId:"@featureId"},{
    		put:{
    			method:"PUT"
    		}
    });    

		return AccountFeature;

  });    