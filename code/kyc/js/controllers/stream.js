angular.module('kyc.controllers').controller('StreamCtrl', ['$scope','Stream', function($scope,Stream) {

	$scope.streams = Stream.getOrders();

    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		

}]);