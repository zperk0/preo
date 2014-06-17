
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','$http','Outlet','ACCOUNT_ID',
	function($scope,$http,Outlet,ACCOUNT_ID) {	

			Outlet.query({accountId:ACCOUNT_ID},function(result){
					$scope.outlets = result;
			});

			$scope.fetchData = function(){
					$http.get('/code/kyc/data/data.json').success(function (result){					
						 		$scope.allData = result;						 		
						 		console.log(result);
					 });
			};

			$scope.fetchData();
}])