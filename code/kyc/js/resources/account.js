angular.module('kyc.resources').
  factory('Account',['$resource', function($resource) {
    
    var Account = $resource('/api/accounts/:id', {}, {
      getItems: {
        method: 'GET',
        url: '/api/accounts/:id/items',
        isArray: true
      }
    });    

    return Account;

  }]);