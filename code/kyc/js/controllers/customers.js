angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope', function($scope) {

	$scope.customers = [
		{ name: 'Adian', spent: '£6.80', email: 'burnleypie@adrianb.net' },
		{ name: 'Alex Jones', spent: '£12.00', email: 'jonesey77@live.co.uk' },
		{ name: 'Alex Parr', spent: '£1.80', email: 'thealexparr@gmail.com' },
	];

}])