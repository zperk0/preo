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
      } ,
      getEvents: {
        method: 'GET',
        url: '/api/venues/:id/events',
        isArray: true
      }      
    });    

    return Venue;

  }]);