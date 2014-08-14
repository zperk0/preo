'use strict';

angular.module('kyc.directives').
  directive('chart', ['$modal','ChartType', '$chartService','Export','ACCOUNT_ID', 'UtilsService', 'ChartHelper', '$timeout', function($modal, ChartType, $chartService,Export,ACCOUNT_ID, UtilsService, ChartHelper, $timeout) {

  	return {
  		templateUrl: '/code/kyc/js/directives/chart/chart.php',
  		restrict: 'E',
  		replace: true,
  		scope: {
  			chart: '=element'
  		},
  		link: function( ng, elem, attrs ) {                
        
        if ( !ng.chart.display ) {
          elem.parent().hide();
        }

        ng.ACCOUNT_ID = ACCOUNT_ID;
        //find out if there is enough data to be displayed
        ng.noData = false;        
        function setNoData(){          
          if (ng.chart.showChart){
            switch (ng.chart.value.type){            
              case ChartType.PIE:          
              case ChartType.COLUMN:       
                //we need at least one item, with data in pies/columns charts
                if (ng.chart.value.data.length === 0){                  
                  ng.noData = true;
                } else {
                  var allZero = true;
                  angular.forEach(ng.chart.value.data,function(data){
                      if (data.y > 0)
                        allZero = false;
                  })                  
                  ng.noData = allZero;
                }
              break;          
              case ChartType.AREA:
                //we need at least two days of data in area charts
                if (ng.chart.value.data.length < 1) {
                  ng.noData = true;
                }
              break;
            }
          }else {            
            //we need a number in number charts
            if (ng.chart.value === 0 || ng.chart.value === 'NaN' || ng.chart.value == NaN){
              ng.noData = true;
            }          
          }
        }
        setNoData();


        ng.ChartType = ChartType;
        
        var $actionsChart = elem.find('.actions-chart');
        var $chart = elem.find('.chart');
        

        var $flipContainer = elem.closest('.flip-container');

        refreshChart();
  			
        
        function openModal() {

          if ( ng.chart.value.modal ) {
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            var windowClass = w > 1300 ? 'large' : 'xlarge';

            var mod = $modal.open({
              templateUrl: modal_url('chart'),
              windowClass: windowClass + ' modal-preoday modal-chart',
              controller: ['$scope',function( $scope ) {

                $scope.optionHasData = function(option){       
                  return option.data.length > 1 ? 1 : 0 ;
                }

                $scope.noData = false;
                $scope.displayChart = false;

                $scope.ACCOUNT_ID = ACCOUNT_ID;

                
                $scope.chart = angular.copy(ng.chart);
                if ( ng.chart.value.modal.highcharts ) {
                  var firstOption = ng.chart.value.modal.options[0];

                  ng.chart.value.tickInterval = firstOption.tickInterval; 
                  ng.chart.value.minTimestamp = moment.utc(firstOption.minTimestamp).valueOf();
                  ng.chart.value.maxTimestamp = moment.utc(firstOption.maxTimestamp).valueOf();

                  var value = angular.copy(ng.chart.value);

                  value.data = firstOption.data;

                  $scope.selectedData = value;

                  $scope.chart.highcharts = $chartService.getChart(  ng.chart.value.modal.highcharts.type, value );

                  $timeout(function(){
                    $scope.chart.highcharts.options.chart.width = $('#highchartsContent').width() - 20;
                    $scope.displayChart = true;
                  }, 100)
                }


                $scope.exportPdf= function(){
                  var data = ng.chart.value.getPdf();

                  data.startDate = $scope.selectedData.minTimestamp;
                  data.endDate = $scope.selectedData.maxTimestamp;
                  data.dataJson = JSON.stringify($scope.selectedData.data);

                  $scope.pdfData = data;
                }

                $scope.exportCsv = function(){

                  var data = $scope.selectedData.data;
                  var csvData =[[moment.utc($scope.selectedData.minTimestamp).format("DD-MMM-YYYY") + " - " + moment.utc($scope.selectedData.maxTimestamp).format("DD-MMM-YYYY")],['Revenue']]
                  angular.forEach(data,function(d){
                      csvData.push([ ChartHelper.formatDate(d[0]),d[1]]) 
                  });

                  $scope.csvData = { data: csvData };
                }             

                $scope.showOptions = function() {
                  $('.modal-chart .flip-container').addClass('active');                  
                  setTimeout(function(){
                    $('.modal-chart .invisibleBack').addClass('visible')
                  },200)
                };

                $scope.hideOptions = function() {
                  $('.modal-chart .flip-container').removeClass('active');                  
                  setTimeout(function(){
                    $('.modal-chart .invisibleBack').removeClass('visible')
                  },200)
                }

                $scope.cancel = function() {
                    mod.close();
                };                

                $scope.title = ng.chart.title;

                $scope.selectOption = function( option ) {

                  $scope.noData = false;

                  var itemActive = $scope.chart.value.modal.options.filter(function(item) {
                    return item.active == true;
                  });

                  if ( itemActive ) {
                    itemActive[0].active = false;
                  }

                  option.active = true;

                  $scope.selectedData = angular.copy(option);
                  $scope.selectedData.minTimestamp = moment.utc(option.minTimestamp).valueOf();
                  $scope.selectedData.maxTimestamp = moment.utc(option.maxTimestamp).valueOf();

                  $scope.chart.highcharts = $chartService.getChart( ng.chart.value.modal.highcharts.type, {tooltipText:ng.chart.value.tooltipText,data:option.data, currency: ng.chart.value.currency, tickInterval:option.tickInterval, minTimestamp: moment.utc(option.minTimestamp).valueOf(), maxTimestamp: moment.utc(option.maxTimestamp).valueOf()});
                  // $scope.chart.highcharts.options.chart.width = $('#highchartsContent').width();
                }

                $scope.setNoData = function( option ) {
                  $scope.noData = true;


                  var itemActive = $scope.chart.value.modal.options.filter(function(item) {
                    return item.active == true;
                  });

                  if ( itemActive ) {
                    itemActive[0].active = false;
                  }              
                  
                  option.active = true;    
                }
              }]
            });
            
            mod.opened.then(function(){
              setTimeout(function(){              
                  $(".modal-preoday").addClass("active");
              },1)
            }) 
          }
        };

        ng.showOptions = function() {
          $flipContainer.addClass('active');
          setTimeout(function(){
            elem.find('.invisibleBack').addClass('visible');  
          },200);
          
        };

        ng.hideOptions = function() {
          $flipContainer.removeClass('active');          
          setTimeout(function(){
            elem.find('.invisibleBack').removeClass('visible');
          },100);
        }
  	
        ng.removeGrid = function( chart, $event ) {
          chart.display = false;
          elem.parent().hide();

          UtilsService.reOrderWidgets( elem.closest('.sscontainer') );
        }    

        ng.changeItem = function( item ){
            
            console.log('selectedItemId',ng.chart.value.selectedItemId);
            ng.chart.value.selectItem( ng.chart.value.selectedItemId,function(highchart){
                console.log('highchart',highchart);
                ng.chart.value = highchart;
                refreshChart();              
            });
        }

        ng.exportPdf= function(){
          ng.pdfData = ng.chart.value.getPdf();          
        }

        ng.exportCsv = function(){
          ng.csvData = ng.chart.value.getCsv();                    
        }

        ng.getText = function(chart){
          
            if (typeof chart.value === "object"){
              var strNum = chart.value.numberLeft
            }
            else{
              var strNum = chart.value.toLocaleString()
            }
            if (chart.currency){
              return decodeURI(chart.currency) + strNum;
            }
            else
              return strNum;
        }

        function refreshChart(){
                    
          var highchartsConfig =  $chartService.getChart(  ng.chart.value.type, ng.chart.value );          
          if ( ng.chart.value.items ) {
              highchartsConfig.options.chart.height = 205;

              elem.parent().addClass('highchartsItem');
          }

          if (ng.chart.value.type === ChartType.AREA){            
            highchartsConfig.options.chart.events = {
              click:openModal
            }
          };
          
          ng.chart.highcharts = highchartsConfig;

        }

      }
    };

  }]);