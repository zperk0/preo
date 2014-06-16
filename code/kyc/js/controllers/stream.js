angular.module('kyc.controllers').controller('StreamCtrl', ['$scope', function($scope) {

	$scope.streams = [
		{ order: 'order', spent: '£3.40', name: 'Bill Carr', numbers: '1 x Carlsberg', time: '10 seconds ago'},
		{ order: 'failed', spent: '£3.40', name: 'Tony Hares', numbers: '1 x Carlsberg', time: '10 seconds ago'},
	];

}]);