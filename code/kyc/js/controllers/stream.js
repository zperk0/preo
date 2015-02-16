angular.module('kyc.controllers').controller('StreamCtrl', ['$scope','OrderService','pusher','$AjaxInterceptor','$interval','VENUE_ID', 'UtilsService',
 function($scope,OrderService,pusher,$AjaxInterceptor,$interval,VENUE_ID, UtilsService) {

    $scope.$parent.showDateFilter = false;

    $scope.setLocation('stream');
	$scope.orders = OrderService.getOrders();

    var lastTimeStamp = moment().valueOf();

    $scope.orders.$promise.then(function(){
        $scope.orders = $scope.orders.sort(UtilsService.dynamicSort('updated', true))

        if ( $scope.orders.length ) {
            lastTimeStamp = moment($scope.orders[0].updated).valueOf();
        }
    });

    var isRequesting = false;

    var qtdRequests = 0;
    
    var pusherUpdateEvent = function() {
        ++qtdRequests;
        
        if ( !isRequesting ) {
            isRequesting = true;
            qtdRequests = 0;

            OrderService.loadSince(lastTimeStamp, outletIds).then(function(orders){
                if ( orders.length ) {
                    lastTimeStamp = moment(orders[0].updated).valueOf();

                    $scope.orders = UtilsService.mergeArraysUnique( orders, angular.copy($scope.orders) );
                }

                isRequesting = false;

                if ( qtdRequests ) { 
                    pusherUpdateEvent();
                }
            });
        }
    };
      
    $scope.$on('KYC_RELOAD', function(){
        reloadPusher();

        $AjaxInterceptor.complete();
    });
      
    var venueId = VENUE_ID;
    var selectedOutlets = null;
    var outletIds = [];

    var reloadPusher = function(){
        outletIds = [];
        pusher.reset();

        selectedOutlets = $scope.getSelectedOutlets();

        angular.forEach(selectedOutlets,function(outlet){
            outletIds.push(outlet.id);
        });

        pusher.bind(venueId, outletIds, pusherUpdateEvent);
    }

    reloadPusher();

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
        return (outletIds && outletIds.length === 0) || (outletIds.indexOf(order.outletId) !== -1)
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