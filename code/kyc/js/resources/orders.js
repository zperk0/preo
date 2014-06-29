angular.module('kyc.resources').
  factory('Orders', function($resource) {
    
    var Orders = $resource('/api/orders',{},{});

    return Orders;
});