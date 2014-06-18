'use strict';

angular.module('kyc.directives').
  directive('chart', ['$modal', function($modal) {

    return {
      templateUrl: template_url('chart/chart.htm'),
      restrict: 'E',
      replace: true,
      scope: {
        chart: '=element'
      },
      link: function( ng, elem, atrrs ) {

        var $actionsChart = elem.find('.actions-chart');
        var $chart = elem.find('.chart');
        var heightParent = elem.parent().height();

        $actionsChart.height( heightParent );
        $chart.height( heightParent );

        if ( ng.chart.showChart ){
          ng.chart.highcharts.options.chart.height = heightParent - 30;
        }

        elem.on('dblclick', function() {

          $modal.open({
            templateUrl: modal_url('chart'),
            controller: function( $scope ) {
              $scope.chart = ng.chart;

              $scope.title = ng.chart.title;
            }
          });

        });

        ng.showOptions = function() {

          $chart.slideUp('400');
          $actionsChart.slideDown('400');

        }

        ng.hideOptions = function() {

          $actionsChart.slideUp('400');
          $chart.slideDown('400');

        }

      }
    };

  }]);