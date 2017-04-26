//import controller from './doughnutChart.controller'

export default function doughnutChart(VenueService, ChartsValueTypes, CardActionsCodes){
  'ngInject';
  return {
    restrict: 'E',
    scope:{     
      config:"="      
    },
    template: require("./doughnutChart.tpl.html"),
    //controller: controller.UID,
   // controllerAs: "doughnutChartCtrl",
    replace: true,
   // bindToController: true, 
    link: (scope, elem, attr, ctrl) => {

    scope.onActions = _onAction;
    scope.shouldShowActions = scope.config.actions && scope.config.actions.length > 0 ? true : false;

    var canvas = elem[0].querySelector('#doughnutchart');
    var chartValues = scope.config.data;
    var currencySymbol = VenueService.currentVenue.ccySymbol;
    var isCurrency = scope.config.type === ChartsValueTypes.CURRENCY ? true : false;
    var legendDone = false;

    var doughnutChart = _initChart();

    function _onAction(option){      

        if(option === CardActionsCodes.EXPORT_CSV){

        }

        if(option === CardActionsCodes.EXPORT_PDF){

        }
       
    }
     
    function _initChart(){

      var chartOptions = _customOptions();
        
      var ctx = canvas.getContext("2d");        
       
      var gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
          gradient2.addColorStop(1, '#0288d1'); // start
          gradient2.addColorStop(0, '#7247b0'); // end
     
      return new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: chartValues.labels,
              datasets: [{                
                 backgroundColor: ['#0388d1', '#5e52b6'],
                 hoverBackgroundColor: ['#0388d1', '#5e52b6'],
                 data: chartValues.values,                
                 borderWidth: 1      
               }]
             },
             options: chartOptions
        });
    }

    function _customOptions(){
      return {   
          tooltips:{
            enabled: false
          },
          responsive: true,
           maintainAspectRatio: false,          
            cutoutPercentage: 70,
            animate: {
              animateScale: true
            },
           legend: {
            display: false,
            labels: {
              generateLabels: _customLegend 
            }
          }          
        }
    }


    function _customLegend(chart){

      // This is a workaround. When using Custom Legend, chart is recreating the same legend multiple times.
      if(legendDone){    
        return;
      }

      legendDone = true;
      
       var tooltipEl = elem[0].querySelector('#doughnut-legend');
        tooltipEl.innerHTML = '<table></table>';

          // Data Extract from chart
          var dataChart = chart.config.data.datasets[0].data;
          var colorChart = chart.config.data.datasets[0].backgroundColor;
          var labelChart = chart.config.data.labels;
          var totalValue = dataChart.reduce((a, b) => a + b, 0);

          var innerHtml = "";
          var circleCss = 'legend-circle';
          var textLegendCss = 'legend-text';

          innerHtml = "<tbody class='"+ textLegendCss +"'>";
          for(var i = 0; i < dataChart.length; i++){

            innerHtml += "<tr>";
            var label = labelChart[i];
            var color = colorChart[i];
            var value = dataChart[i];
            var valPercent = ((value/totalValue)*100).toFixed(0) + '%';

            var valueToString = (isCurrency) ? currencySymbol + value.toLocaleString() : value.toLocaleString();

            var divColor = "<td><div style ='background-color:" + color + "' class='" + circleCss + "'> </div></td>";
            
            innerHtml += "<td><div style ='display:inline-flex;background-color:" + color + "' class='" + circleCss + "'> </div></td>";
            innerHtml += "<td><span>"+ valPercent + "</span></td>";
            innerHtml += "<td><span> - </span></td>";
            innerHtml += "<td><span>"+ label + ' (' + valueToString + ')' +"</span></td>"    
            
            innerHtml += "</tr>";
             
          }     

          innerHtml += "</tbody>";     
          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;   
    }

    }
  }
}
