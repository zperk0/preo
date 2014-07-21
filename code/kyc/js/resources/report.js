angular.module('kyc.resources').
  factory('Report', function($resource) {
    
    var Report = $resource('/api/reports/:venueId',{venueId:"@venueId"},{
    		items:{
    			method:"GET",
                isArray:true,
    			url:"/api/reports/:venueId/items"
    		},
    		orders:{
                method:"GET",
                isArray:true,
                url:"/api/reports/:venueId/orders"
            },
            customerOrders:{
                method:"GET",
                isArray:true,
                url:"/api/reports/:venueId/customerOrders"
            }

    });

    
    return Report
});