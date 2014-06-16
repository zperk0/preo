angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', function($scope) {

	$scope.reports = [
		{ id: '1320', outlet: 'Upper Leve', name: 'Craig Fell', time: '16:08:11', quantity: '1', item: 'Peppe... ', modifier: '', total: '£2.50', status: 'COMPLETED'},
		{ id: '1318', outlet: 'James Ha...', name: 'Tim Bradley', time: '13:07:33', quantity: '1', item: 'Steak ... ', modifier: 'with Tea', total: '£2.50', status: 'COMPLETED'},
	];

}])