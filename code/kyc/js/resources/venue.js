angular.module('kyc.resources').
  factory('Venue',['$resource', function($resource) {
    
    var Venue = $resource('/api/venues/:id', {}, {
      query: {
        method: 'GET',
        isArray: true
      },
      getItems: {
        method: 'GET',
        url: '/api/venues/:id/items',
        isArray: true
      }      
    });    

    return Venue;

  }]);