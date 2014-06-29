'use strict';

angular.module('kyc.directives').
  directive('chart', ['$modal','ChartType', '$chartService','Export','ACCOUNT_ID', function($modal, ChartType, $chartService,Export,ACCOUNT_ID) {

  	return {
  		templateUrl: '/code/kyc/js/directives/chart/chart.htm',
  		restrict: 'E',
  		replace: true,
  		scope: {
  			chart: '=element'
  		},
  		link: function( ng, elem, attrs ) {
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
          
            $modal.open({
              templateUrl: modal_url('chart'),
              windowClass: 'modal-preoday',
              controller: function( $scope ) {

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
          console.log(ng.chart);
          var obj = ng.chart.value.getPdf();
          console.log(obj,"obj");
          var pdf = new Export.Pdf(obj);          
          pdf.$save({accountId:ACCOUNT_ID},function(res){
            console.log('hoo',res);
          });
        }

        ng.exportCsv = function(){
          var obj = ng.chart.value.getCsv();          
          var pdf = new Export.Csv(obj);          
          console.log('sending',pdf)
          pdf.$save({accountId:ACCOUNT_ID},function(res){
            console.log('hee',res);
          });
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