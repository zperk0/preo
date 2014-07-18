angular.module('kyc.controllers').controller('StreamCtrl', ['$scope','OrderService','pusher','$AjaxInterceptor','$interval','VENUE_ID',
 function($scope,OrderService,pusher,$AjaxInterceptor,$interval,VENUE_ID) {

    $scope.$parent.showDateFilter = false;


    $scope.setLocation('stream');
	$scope.orders = OrderService.getOrders();
    var onTimeout = false;
    var pusherUpdateEvent = function() {                
        if (!onTimeout){
            onTimeout = true;
            OrderService.load(function(orders){
                $scope.orders = orders;
            })        
            setTimeout(function(){onTimeout = false},500);
        }
    };
      
    pusher.reset();
    var venueId = VENUE_ID;
    console.log('got venue id :',venueId);
    var selectedOutlets = $scope.getSelectedOutlets();
    var outletIds = [];
    angular.forEach(selectedOutlets,function(outlet){
        outletIds.push(outlet.id);
    })
    pusher.bind(venueId, outletIds, pusherUpdateEvent);

    $scope.getStatusName = function(status){
        var statusMap = {
            PAYMENT_FAILED:"FAILED",
            NOSHOW:"NO SHOW"
        }

        return statusMap[status] ? statusMap[status] : status;
    }

    $scope.getStatusColor = function(status){
        switch (status) {
            case "PENDING":
            case "ACCEPTED":
            case "PREPARING":
            case "READY":
            case "DELIVERING":
            case "COMPLETED":
                return "good"
            case "NOSHOW":
            case "REJECTED":
            case "CANCELLED":
            case "PAYMENT_FAILED":
            default:
                return "bad"
        }
    }

    $scope.outletFilter = function(order){        
        return (outletIds && outletIds.length === 0) || (outletIds.indexOf(order.outletId)>-1)
            
    }

    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		

    $scope.activeStream = function( stream ) {

      var result = $scope.orders.filter(function( item ) {
        return item.active === true;
      });

      if ( result && result[0] && result[0].code != stream.code ) {
        result[0].active = false;
      }

      stream.active = !stream.active
    }

    $scope.getOrderItems = function(order){
      var items = [];
      angular.forEach(order.items,function(item){
        items.push(item.qty+" x " + item.name);
      });
      return items;
    }


    // var intervalPromise = $interval(function () { $scope.$apply() }, 5000);      
    // $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });


    $AjaxInterceptor.complete();

}]);