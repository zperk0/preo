'use strict';

angular.module('kyc.directives').
  directive('chart', ['$modal','ChartType', '$chartService', function($modal, ChartType, $chartService) {

  	return {
  		templateUrl: '/code/kyc/js/directives/chart/chart.htm',
  		restrict: 'E',
  		replace: true,
  		scope: {
  			chart: '=element'
  		},
  		link: function( ng, elem, attrs ) {

        var $actionsChart = elem.find('.actions-chart');
        var $chart = elem.find('.chart');
        var heightParent = elem.parent().height() || 322;
        var $flipContainer = elem.closest('.flip-container');

        $actionsChart.height( heightParent );
        $chart.height( heightParent );
        
  			if ( ng.chart.showChart ){
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

            ng.chart.highcharts.options.chart.height = heightParent;
          }

  			}

        ng.openModal = function() {

          $modal.open({
            templateUrl: modal_url('chart'),
            windowClass: 'modal-preoday',
            controller: function( $scope ) {

              $scope.chart = angular.copy(ng.chart);

              if ( ng.chart.value.modal && ng.chart.value.modal.highcharts ) {
                $scope.chart.highcharts = $chartService.getChart(ng.chart.value.modal.highcharts.type, ng.chart.value);
                $scope.chart.highcharts.options.chart.height = heightParent + 60;
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
              }
            }
          });

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

        ng.changeItem = function(){
        }

      }
    };

  }]);