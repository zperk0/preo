angular.module('kyc.controllers').controller('StreamCtrl', ['$scope','StreamService','pusher','$AjaxInterceptor',
 function($scope,StreamService,pusher,$AjaxInterceptor) {

	$scope.streams = StreamService.getOrders();

    var pusherUpdateEvent = function() {
        
        StreamService.load(function(orders){
            $scope.streams = orders;
        })
        
    };
      
    pusher.reset();
    var venueId = 2
    var outletIds = [];
    pusher.bind(venueId, outletIds, pusherUpdateEvent);


    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		

    $scope.activeStream = function( stream ) {

      var result = $scope.streams.filter(function( item ) {
        return item.active === true;
      });

      if ( result && result[0] && result[0].code != stream.code ) {
        result[0].active = false;
      }

      stream.active = !stream.active
    }

    $AjaxInterceptor.complete();

}]);