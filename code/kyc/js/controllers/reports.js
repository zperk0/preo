angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', '$AjaxInterceptor','OrderService','Export','ACCOUNT_ID','AllReports',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID,AllReports) {

	var orders;
	$scope.setLocation('reports');
	$scope.exportAll="1";	


	prepareScopeReports();
	
	$scope.selectAll = function() {
		for ( var i = $scope.reports.length; i--; ) {
			$scope.reports[i].selected = $scope.all_options;
		}
	}

	function prepareScopeReports(){
		orders = OrderService.getOrders();		
		AllReports.init(orders).then(function(){
			$scope.reportsList = AllReports.getReportsList();
			$scope.selectReport($scope.reportsList[0]);			
			$AjaxInterceptor.complete();
		})		
	}

	$scope.selectReport = function(report){		
		$scope.selectedReport = {
			data: report.getData(),
			title: report.getTitle(),
			titles: report.getTitles()
		}			
		console.log('setting s',$scope.selectedReport);			
	}

	$scope.setOrderBy = function(title){		
		$scope.orderBy = title;
		$scope.direction = !$scope.direction
	}

	$scope.getTitle = function(title){		
		return AllReports.getTitle(title);
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

	

	$scope.exportPdf= function(){
  	$scope.pdfData = prepareExportPdfData();    
  }

  $scope.exportCsv = function(){
    $scope.csvData = prepareExportCsvData();
  }

	
  $scope.showOptions = function() {
    angular.element('.flip-container').addClass('active');
  };

  $scope.hideOptions = function() {
    angular.element('.flip-container').removeClass('active');
  }		

}])