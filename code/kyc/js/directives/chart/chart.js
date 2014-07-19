'use strict';

angular.module('kyc.directives').
  directive('chart', ['$modal','ChartType', '$chartService','Export','ACCOUNT_ID', function($modal, ChartType, $chartService,Export,ACCOUNT_ID) {

  	return {
  		templateUrl: '/code/kyc/js/directives/chart/chart.php',
  		restrict: 'E',
  		replace: true,
  		scope: {
  			chart: '=element'
  		},
  		link: function( ng, elem, attrs ) {                

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
                if (ng.chart.value.data.length <= 1){
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
              windowClass: windowClass + ' modal-preoday',
              controller: function( $scope ) {

                $scope.optionHasData = function(option){       
                  return option.data.length > 1 && +option.value > 0 ? 1 : 0 ;
                }

                $scope.noData = false;
                
                $scope.chart = angular.copy(ng.chart);
                if ( ng.chart.value.modal.highcharts ) {
                  var firstOption = ng.chart.value.modal.options[0];

                  ng.chart.value.tickInterval = firstOption.tickInterval; 
                  ng.chart.value.minTimestamp = moment(firstOption.minTimestamp).valueOf();
                  ng.chart.value.maxTimestamp = moment(firstOption.maxTimestamp).valueOf();

                  var value = angular.copy(ng.chart.value);

                  value.data = firstOption.data;

                  $scope.chart.highcharts = $chartService.getChart(  ng.chart.value.modal.highcharts.type, value );               
                  
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
                  $scope.chart.highcharts = $chartService.getChart( ng.chart.value.modal.highcharts.type, {tooltipText:ng.chart.value.tooltipText,data:option.data, tickInterval:option.tickInterval, minTimestamp: moment(option.minTimestamp).valueOf(), maxTimestamp: moment(option.maxTimestamp).valueOf()});
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
              }
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
        };

        ng.hideOptions = function() {
          $flipContainer.removeClass('active');
        }
  	
        ng.removeGrid = function( chart, $event ) {
          chart.display = false;
          //console.log(ng.$parent);
          //ng.$parent.$parent.gridster.remove_widget(angular.element($event.target).parents('li'));
          elem.parent().hide();
        }

        ng.changeItem = function( item ){
          var items = ng.chart.value.items.filter(function(i){
            return i.selected === true;
          });

          if ( items.length ) {
            ng.selectedItem = items[0];

            ng.selectedItem.callback(ng.selectedItem.menuItemId,function(highchart){
                ng.chart.value = highchart;
                refreshChart();              
            });
          }
        }

        ng.exportPdf= function(){
          ng.pdfData = ng.chart.value.getPdf();          
        }

        ng.exportCsv = function(){
          ng.csvData = ng.chart.value.getCsv();                    
          console.log("exporting csvData",ng.csvData);
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