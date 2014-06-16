angular.module('kyc.controllers').controller('StockCtrl', ['$scope', function($scope) {

  	$scope.stocks = [
  		{ name: '7-UP', quantity: 4 },
  		{ name: 'Bovril', quantity: 56 },
  		{ name: 'Carlsberg', quantity: 207 },
  		{ name: 'Coca Cola', quantity: 36 },
  	];

  }])