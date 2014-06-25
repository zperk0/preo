angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', '$AjaxInterceptor','OrderService', function($scope, $AjaxInterceptor,OrderService) {

	$scope.reports = [];
	
	var allOrders = OrderService.getOrders();
	prepareScopeReports();

	$scope.selectAll = function() {
		for ( var i = $scope.reports.length; i--; ) {
			$scope.reports[i].selected = $scope.all_options;
		}
	}

	function prepareScopeReports(){

		if ( allOrders) {
			angular.forEach(allOrders,function(row){
				angular.forEach(row.items,function(item){
					$scope.reports.push({
						id:row.id,
						outlet:getOutletName(row.outletId),
						name:getUserName(row.user),
						time:row.created,				
						quantity:item.qty,
						item:item.name,
						modifier:getModifiers(item),
						total:item.total,
						status:row.status
					})
				})		
			});
		}
		console.log('here ho');
		$AjaxInterceptor.complete();
	}

	function getOutletName(id){
		if ( $scope.outlets ) {

			var outlet = $.grep($scope.outlets, function(e){ return e.id == id; })[0]

			if ( outlet instanceof Object ) {
				return outlet.name;   
			}

			return '';
		}

		return '';
	}

	function getUserName(user){
			return user.firstName +" "+user.lastName;
	}

	function getModifiers(item){
		var modifiers = [];
		angular.forEach(item.modifiers,function(modifier){
			modifiers.push(modifier.name)
		})
		return modifiers.join(",");
	}
    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		

}])