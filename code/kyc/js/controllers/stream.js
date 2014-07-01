angular.module('kyc.controllers').controller('StreamCtrl', ['$scope','StreamService','pusher','$AjaxInterceptor',
 function($scope,StreamService,pusher,$AjaxInterceptor) {

	$scope.orders = StreamService.getOrders();
    console.log($scope.orders);
    var pusherUpdateEvent = function() {        
        StreamService.load(function(orders){
            $scope.orders = orders;
        })        
    };
      
    pusher.reset();
    var venueId = 2
    var outletIds = [];
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
        items.push(item.qty+"x " + item.name);
      });
      return items;
    }

    $scope.getTimeDiff = function(date){

        if (typeof date !== 'object') {
            date = new Date(date);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            intervalType = 'year';
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                intervalType = 'month';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = 'day';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        intervalType = "hour";
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            intervalType = "minute";
                        } else {
                            interval = seconds;
                            intervalType = "second";
                        }
                    }
                }
            }
        }

        if (interval > 1) {
            intervalType += 's';
        }
      return interval + ' ' + intervalType;      
  }
    

    $AjaxInterceptor.complete();

}]);