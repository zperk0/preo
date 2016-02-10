angular.module('accountSettings.resources').
  factory('AccountPackages', ['$resource',function($resource) {
    
    var AccountPackages = $resource('/api/accounts/:accountId/packages/:packageId',{accountId:"@accountId",packageId:"@packageId"},{
    		put:{
          method:'PUT',
        }
    });    

		return AccountPackages;

  }]);    