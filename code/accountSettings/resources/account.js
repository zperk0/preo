
angular.module('accountSettings.resources').
  factory('Account', ['$resource',function($resource) {
    
    var Account = $resource('/api/accounts/:id',{id:"@id"}, {
    	put:{
          method: "PUT"
        }    	
    });

	return Account
  }]);