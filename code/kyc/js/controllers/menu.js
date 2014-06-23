
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService',
	function($scope,OutletService) {	

		$scope.outlets = OutletService.getOutlets();
		

}])