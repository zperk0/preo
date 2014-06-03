angular.module('accountSettings.resources').
  factory('AccountFeature', function($resource) {
    
    var AccountFeature = $resource('/api/features/accountFeature/:accountId/:accountFeatureId',{accountId:"@accountId",accountFeatureId:"@accountFeatureId"},{
    		put:{
    			method:"PUT"
    		}
    });    

		return AccountFeature;

  });    