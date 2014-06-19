angular.module('accountSettings.resources').
  factory('AccountFeature', function($resource) {
    
    var AccountFeature = $resource('/api/accounts/:accountId/features/:featureId',{accountId:"@accountId",featureId:"@featureId"},{
    		put:{
    			method:"PUT",
    			//this doesn't work. why?
    			// transformRequest: function (data, headersGetter) {
    						
    			// 			var accountFeature = angular.copy(data);
    			// 			delete accountFeature.feature;
    			// 			console.log("sending",accountFeature);
       //          return JSON.stringify(accountFeature);
       //      }
    		}
    });    

		return AccountFeature;

  });    