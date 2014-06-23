angular.module('kyc.controllers').controller('StreamCtrl', ['$scope','StreamService','pusher',
 function($scope,StreamService,pusher) {

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

}]);