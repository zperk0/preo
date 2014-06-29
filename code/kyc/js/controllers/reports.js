angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', '$AjaxInterceptor','OrderService','Export','ACCOUNT_ID',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID) {

	$scope.reports = [];
	
	var allOrders = OrderService.getOrders();
	prepareScopeReports();
	$scope.exportAll="1"	;

	$scope.selectAll = function() {
		for ( var i = $scope.reports.length; i--; ) {
			$scope.reports[i].selected = $scope.all_options;
		}
	}

	function prepareScopeReports(){

		if ( allOrders) {
			angular.forEach(allOrders,function(row){
				var minTimestamp = $scope.search.start_date.getTime();
      var maxTimestamp = $scope.search.end_date.getTime();
      var orderData = new Date(row.created);        
      if (orderData >= minTimestamp && orderData <= maxTimestamp){
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
				}
			});
		}
		$AjaxInterceptor.complete();
	}


	function prepareExportData(){
		var prepData = [["Reports"]];
			angular.forEach($scope.reports,function(item){				
				console.log(item,prepData);	
					if ($scope.exportAll === "1" || item.selected === true){
							prepData.push([item.id,item.outlet,item.name,item.time,item.quantity,item.modifier,item.total,item.status]);
					}
			})
		return {
       data:prepData
    }
	}


	$scope.exportData = function(which){
		console.log('exporting data',which);
		var data = prepareExportData();
		switch (which){
			case 'pdf':
				// new Export.Pdf(data).$save({accountId:ACCOUNT_ID},function(res){
	   		// console.log('hoo',res);
	   		// });
				break;
			case 'csv':
			console.log('sending',data);
				new Export.Csv(data).$save({accountId:ACCOUNT_ID},function(res){
	          console.log('hoo',res);
	      });
				break;
		}
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