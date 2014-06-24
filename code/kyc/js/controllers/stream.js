angular.module('kyc.controllers').controller('StreamCtrl', ['$scope', function($scope) {

  	$scope.streams = [
  		{ code: '835', order: 'order', spent: '3.40', name: 'Bill Carr', numbers: '1 x Carlsberg', time: '10 seconds ago'},
  		{ code: '836', order: 'failed', spent: '3.40', name: 'Tony Hares', numbers: '1 x Carlsberg', time: '10 seconds ago'},
  	];

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

}]);