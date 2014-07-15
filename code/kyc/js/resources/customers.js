angular.module('kyc.resources').
  factory('VenueCustomers', function($resource) {
    
    var VenueCustomers = $resource('/api/venues/:id/customers',{id:"@id"},{});

    return VenueCustomers;
});