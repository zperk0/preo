angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', '$AjaxInterceptor', function($scope, $AjaxInterceptor) {

	$scope.reports = [];

	var outlets = false;
	var data = false;

	$AjaxInterceptor.start();

	$scope.$on('preoday.allData', function( event, data ) {
		$scope.allData = data.allData;
		data = true;

		if ( outlets ) {
			$AjaxInterceptor.start();
			prepareScopeReports();
		}
	});

	$scope.$on('preoday.outlets', function( event, data ) {
		$scope.outlets = data.outlets;

		outlets = true;
		if ( data ) {
			$AjaxInterceptor.start();
			prepareScopeReports();	
		}
	});

	$scope.selectAll = function() {

		for ( var i = $scope.reports.length; i--; ) {
			$scope.reports[i].selected = $scope.all_options;
		}

	}

	function prepareScopeReports(){

		if ( $scope.allData ) {
			angular.forEach($scope.allData,function(row){
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

	prepareScopeReports();

    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		

}])