angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', '$AjaxInterceptor','OrderService','Export','ACCOUNT_ID',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID) {
	$scope.setLocation('reports');
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
			var minTimestamp = moment($scope.search.start_date);
      var maxTimestamp = moment($scope.search.end_date);
			angular.forEach(allOrders,function(row){			
      var orderData = moment(row.created);        
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


	function prepareExportCsvData(){
		var prepData = [["Reports"]];
			angular.forEach($scope.reports,function(item){				
					if ($scope.exportAll === "1" || item.selected === true){
							prepData.push([item.id,item.outlet,item.name,item.time,item.quantity,item.item,item.modifier,item.total,item.status]);
					}
			})
		return {
       data:prepData
    }
	}

	function prepareExportPdfData(){
		var prepData = {
			"Id" :[],
			"Outlet":[],
			"Name":[],
			"Qty":[],
			"Item":[],
			"Modifier":[],
			"Total":[],
			"Status":[]
		};
			angular.forEach($scope.reports,function(item){
					if ($scope.exportAll === "1" || item.selected === true){
							prepData["Id"].push(item.id)
							prepData["Outlet"].push(item.outlet);
							prepData["Name"].push(item.name);
							prepData["Qty"].push(item.quantity);
							prepData["Item"].push(item.item);
							prepData["Modifier"].push(item.modifier);
							prepData["Total"].push(item.total);
							prepData["Status"].push(item.status);
					}
			})
		return {
			title:"Reports",
			startDate:$scope.search.start_date.getTime(),
			endDate:$scope.search.end_date.getTime(),
      dataJson:JSON.stringify(prepData)
    }
	}


	$scope.exportPdf= function(){
  	$scope.pdfData = prepareExportPdfData();    
  }

  $scope.exportCsv = function(){
    $scope.csvData = prepareExportCsvData();
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