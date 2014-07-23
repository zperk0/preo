angular.module('kyc.resources').
  factory('Order',['$resource', function($resource) {
    
    var Order = $resource('/api/orders',{},{});

    return Order;
}]);