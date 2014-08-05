angular.module('kyc.controllers').controller('ReportsCtrl', ['$scope', '$AjaxInterceptor','OrderService','Export','ACCOUNT_ID','AllReports', 'UtilsService','$filter',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID,AllReports,UtilsService,$filter) {

	var orders;
	var title = _tr("Reports");
	$scope.setLocation('reports');
	$scope.exportAll="1";	
	$scope.direction = true;
	var isPrepared = false;
	
	
	$scope.selectAll = function() {
		for ( var i = $scope.selectedReport.data.length; i--; ) {
			$scope.selectedReport.data[i].$selected = $scope.all_options;
		}
	}

	$scope.isMarketingTitle = function(title){
		var is = title === 'loyalty' || title === 'offers' || title === 'other';;			
		return is ? title : is;
	}

	function prepareScopeReports(){
			
			$scope.reports = AllReports.getReportsList();
			
			$scope.selectReport($scope.reports[0]);			

			if ( $scope.selectedReport && $scope.selectedReport.data ) {
				$scope.reportsList = $scope.selectedReport.data;
				$scope.totalItems = Object.keys($scope.selectedReport.data).length;
			} else {
				$scope.reportsList = [];
				$scope.totalItems = 0;
			}

			$scope.selectedReport.data = UtilsService.dynamicSortObject($scope.selectedReport.data, $scope.orderBy, $scope.direction)

			$scope.numPerPage = 20;
			$scope.currentPage = 1;		
			$AjaxInterceptor.complete();
			isPrepared = true;
	}

	  $scope.$watch('currentPage + numPerPage', function() {
	  	loadReportsByPage();
	  });

	var loadReportsByPage = function(){
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    // console.log($scope.selectedReport);
	    if ( $scope.selectedReport && $scope.selectedReport.data ) {    
	    	$scope.reportsList = $scope.selectedReport.data.slice(begin, end );
		}	 		
	}		  	


	$scope.setOrderBy = function(orderBy, direction){				
		if (direction !== undefined)
				$scope.direction = direction;		
		else 
			$scope.direction = !$scope.direction;
		console.log('set order by',orderBy,$scope.direction)
		$scope.orderBy = orderBy;
		$scope.selectedReport.data = UtilsService.dynamicSortObject($scope.selectedReport.data, orderBy, $scope.direction)
		loadReportsByPage();
	}
	

	$scope.selectReport = function(which){
		if (which){
			var report = which;
		} else {
			var report = $scope.reports.filter(function(r){
				return r.selected === true;
			});
			if ( report.length ) {
				report = report[0];
			}
		}

		$scope.selectedReport = {
			data: report.getData(),
			title: report.getTitle(),
			titles: report.getTitles(),
			description: report.description
		}

		$scope.totalItems = Object.keys($scope.selectedReport.data).length;	
		$scope.reportsList = UtilsService.sliceObject($scope.selectedReport.data, 0, $scope.numPerPage);
		$scope.currentPage = 1;		
		
		
		$scope.direction = report.direction !== undefined ? report.direction : $scope.direction;
		var orderBy = report.orderBy !== undefined ? report.orderBy :  $scope.selectedReport.titles[0];
		$scope.setOrderBy(orderBy);
		
	}

	$scope.getTitle = function (title){		
		return AllReports.getTitle(title);
	}

		function prepareExportPdfData(){
			var prepData = {};				
			angular.forEach($scope.selectedReport.data,function(item){
					if ($scope.exportAll === "1" || item.$selected === true){													
							angular.forEach(item,function(val,prop){
								if (prop[0]==="$")
									return;
								var propTitle = $scope.getTitle(prop);
								if (prepData[propTitle] === undefined){
									prepData[propTitle] = [];
								}
								prepData[propTitle].push(getFilteredProp(val,prop));
							})							
					}
			});
			console.log('returning:',{
				title:$scope.selectedReport.title,
				startDate:$scope.form.start_date.valueOf(),
				endDate:$scope.form.end_date.valueOf(),
	      dataJson:angular.toJson(prepData)
	    })
			return {
				title:$scope.selectedReport.title,
				startDate:$scope.$parent.form.start_date.valueOf(),
				endDate:$scope.$parent.form.end_date.valueOf(),
	      dataJson:angular.toJson(prepData)
	    }
	}


	function prepareExportCsvData(){
		var prepData = [[$scope.getExportDate()],[$scope.selectedReport.title],$scope.selectedReport.titles];	
			angular.forEach($scope.selectedReport.data,function(item){
					if ($scope.exportAll === "1" || item.$selected === true){						
							var row = [];
							angular.forEach(item,function(val,prop){
								if (prop[0]==="$")
									return;
								
								row.push(getFilteredProp(val,prop))
							})
							prepData.push(row);						
					}
			});
		return {
       data:prepData
    }
	}

	function getFilteredProp(obj,prop){			
		switch (prop){
			case ('day'):
			case ('lastOrder'):
			case ('dateJoined'):
			case ('dateOfOrder'):
			case ('date'):
				return  $filter('date')(obj,"dd/MM/yyyy");
			case ('valueSold'):
			case ('totalSpent'):
			case ('percentDecrease'):
			case ('percentIncrease'):
				return obj.toFixed(2) 									
			default:
				return obj
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
    setTimeout(function(){
      	$('.invisibleBack').addClass('visible')
      },200)
  };

  $scope.hideOptions = function() {
    angular.element('.flip-container').removeClass('active');
    setTimeout(function(){
      	$('.invisibleBack').removeClass('visible')
      },200)
  }

  if (!isPrepared)
		prepareScopeReports();
}])