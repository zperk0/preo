angular.module('kyc.resources').
  factory('Order', function($resource) {
    
    var Order = $resource('/api/orders',{},{});

    return Order;
});