angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', function($scope) {

	$scope.reports = [];

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

	function getOutletName(id){
		console.log($scope.outlets,id);
		var outlet = $.grep($scope.outlets, function(e){ return e.id == id; })[0]
		return outlet.name;   
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

}])