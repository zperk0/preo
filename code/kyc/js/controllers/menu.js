
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','$http','Outlet','Orders','ACCOUNT_ID',
	function($scope,$http,Outlet,Orders,ACCOUNT_ID) {	
		
			Outlet.query({accountId:ACCOUNT_ID},function(result){
					$scope.outlets = result;

					$scope.$broadcast('preoday.outlets', { outlets: result });
			});

			$scope.fetchData = function(){
					//orders&venueId=1
					//milliseconds //completed status only 
					$http.get('/code/kyc/data/data.json').success(function (result){					

						 $scope.allData = result;

						 $scope.$broadcast('preoday.allData', { allData: result });

					 });
			};

			$scope.fetchData();
}])