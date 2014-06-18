angular.module('kyc.controllers').controller('StockCtrl', ['$scope', function($scope) {

  	$scope.stock = {};

		angular.forEach($scope.allData,function(row){
			angular.forEach(row.items,function(item){
				var itemId  = item.id;
					if ($scope.stock[itemId] === undefined){						
						$scope.stock[itemId] = {
								name:item.name,
								quantity:item.qty
						}	
					}
					else{
							$scope.stock[itemId].quantity+=item.qty;
					};																			
			})					
		});

		console.log($scope.stock);
  }])