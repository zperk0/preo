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

        ng.noData = false;
        angular.forEach(ng.chart.value.data,function(data){
          console.log(new Date(data[0]),data[1]);
        })
        switch (ng.chart.value.type){
          case ChartType.NUMBER:
            //we need a number in number charts
            if (ng.chart.value === 0 || ng.chart.value === 'NaN' || ng.chart.value == NaN){
              ng.noData = true;
            }
            break;
          case ChartType.PIE:          
          case ChartType.COLUMN:          
            //we need at least one item in pies/columns charts
            if (ng.chart.value.data.length === 0){
              ng.noData = true;
            }
          break;          
          case ChartType.AREA:
            //we need at least two days of data in area charts
            if (ng.chart.value.data.length <= 1){
              ng.noData = true;
            }
          break;
        }
        console.log('ng.noData',ng.noData);

        ng.ChartType = ChartType;
        var initialHeight = ng.chart.value.type === ChartType.number ? 150 : 322;
        var $actionsChart = elem.find('.actions-chart');
        var $chart = elem.find('.chart');
        var heightParent = elem.parent().height() || initialHeight;

        var $flipContainer = elem.closest('.flip-container');

        $actionsChart.height( heightParent );
        $chart.height( heightParent );
        
  			

        refreshChart();
  			
        
        ng.openModal = function() {

          if ( ng.chart.value.modal ) {
          
            var mod = $modal.open({
              templateUrl: modal_url('chart'),
              windowClass: 'large modal-preoday',
              controller: function( $scope ) {
                console.log(ng.chart.value.modal.options,'opts')
                $scope.chart = angular.copy(ng.chart);
                if ( ng.chart.value.modal.highcharts ) {
                  $scope.chart.highcharts = $chartService.getChart(  ng.chart.value.modal.highcharts.type, ng.chart.value );
                  $scope.chart.highcharts.options.chart.height = heightParent + 40;
                }

                $scope.title = ng.chart.title;

                $scope.selectOption = function( option ) {

                  var itemActive = $scope.chart.value.modal.options.filter(function(item) {
                    return item.active == true;
                  });

                  if ( itemActive ) {
                    itemActive[0].active = false;
                  }
                  
                  option.active = true;
                  $scope.chart.highcharts = $chartService.getChart( ng.chart.value.modal.highcharts.type, {data:option.data});
                }             
              }
            });
            
            mod.opened.then(function(){
              setTimeout(function(){              
                  $(".modal-preoday").addClass("active");
                  console.log("ho!")
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
          ng.$parent.$parent.$parent.gridster.remove_widget(angular.element($event.target).parents('li'));
        }

        ng.changeItem = function( item ){
          ng.selectedItem = item;          
          item.callback(item.menuItemId,function(highchart){            
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
          console.log ("getting text",chart.value);                    
            if (typeof chart.value === "object"){
              var strNum = chart.value.numberLeft
            }
            else{
              var strNum = chart.value.toLocaleString()
            }
            if (chart.currency)              
              return chart.currency + strNum;
            else
              return strNum;
        }

        function refreshChart(){
          heightParent = elem.parent().height() || initialHeight;
          $actionsChart.height( heightParent );
          $chart.height( heightParent );

          ng.chart.highcharts = $chartService.getChart(  ng.chart.value.type, ng.chart.value );

          if ( heightParent ) {

            if ( ng.chart.value.numberLeft || ng.chart.value.numberRight ) {
              heightParent -= 40;
            }

            if ( ng.chart.value.items ) {
              heightParent -= 90;
            } else {
              heightParent -= 30;
            }

            if ( ng.chart.value.type == ChartType.COLUMN ) {
              heightParent -= 15;
            }
            if (ng.chart.highcharts)
              ng.chart.highcharts.options.chart.height = heightParent;
          }
        }

      }
    };

  }]);