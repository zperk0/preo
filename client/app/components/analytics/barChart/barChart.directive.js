import controller from './barChart.controller'

export default function barChart(VenueService, ChartsValueTypes){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      config:"="  
    },
    template: require("./barChart.tpl.html"),
    controller: controller.UID,
    controllerAs: "barChartCtrl",
    bindToController: true,
    replace:true,
    link: (scope, elem, attr, ctrl) => {

     // ctrl.initCanvas(elem); 
   
      var currencySymbol = VenueService.currentVenue.ccySymbol;
      var canvas = elem[0].querySelector('#barchart');
      var chartValues = ctrl.config.data;
      var isCurrency = ctrl.config.type === ChartsValueTypes.CURRENCY ? true : false;

      _initChart();

      function _calcYaxisLegend(){
        var maxValue = Math.max(...chartValues.y);        

        var baseRound = 0;
        var valueRounded = 0;

        // Round rules defined by Simon to find Y axis values
        if(maxValue < 100){
          baseRound = 10;
        } else if(maxValue >100 && maxValue < 10000){
          baseRound = 100;
        } else if(maxValue > 10000){
          baseRound = 1000;
        }

        valueRounded = Math.ceil(maxValue/baseRound) * baseRound;
        
        return valueRounded;
      }

      function _customTooltips(tooltip) {        
 
        var tooltipEl = elem[0].querySelector('#chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';       
              
          canvas.parentNode.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add('bottom');
          tooltipEl.classList.add('above');
        } else {
          tooltipEl.classList.add('no-transform');
        }

        // Set Text
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map((bodyItem) => { return bodyItem.lines});
          var titleCss = 'chartjs-tooltip-title';
          var bodyCss = 'chartjs-tooltip-body';
          var innerHtml = "";
          
          innerHtml = "<div class ='" + titleCss + "'>";
          titleLines.forEach(function(title) {
            innerHtml += "<p><span>" + title + '</span></p>';
          });
       
          innerHtml += "</div>";
          innerHtml += "<div class ='" + bodyCss + "'>";
          bodyLines.forEach(function(body, i) {
            innerHtml += "<p><span>" + body + "</span> </p>";
          });
          innerHtml += "</div>";

          tooltipEl.innerHTML = innerHtml;
        }

        var positionY = canvas.offsetTop;
        var positionX = canvas.offsetLeft;
       
        tooltipEl.style.display = 'block';
        tooltipEl.style.maxHeight = 64 + 'px';
        tooltipEl.style.maxWidth = 99 + 'px';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX  + 'px';
        tooltipEl.style.top =  positionY + tooltip.caretY - tooltip.caretSize + 'px';

        tooltipEl.style.padding =  tooltip.yPadding + 'px ' ; //+ tooltip.xPadding + 'px';    
      }   

      function _initChart(){  
    
        var ctx = canvas.getContext("2d");        
       
        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(114, 71, 176, 0.37)');   
        gradient.addColorStop(1, 'rgba(2, 136, 209, 0.37)');

        var gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
        gradient2.addColorStop(1, '#0288d1'); // start
        gradient2.addColorStop(0, '#7247b0'); // end
        
        Chart.defaults.global.pointHitDetectionRadius = 1; 
        Chart.defaults.global.tooltips.backgroundColor= 'rgba(255,255,255,0.8)';
        Chart.defaults.global.tooltips.bodyFontColor= '#000000';
        Chart.defaults.global.tooltips.bodyFontFamily= "Roboto";
        Chart.defaults.global.tooltips.bodyFontSize= 11;
        Chart.defaults.global.tooltips.titleFontFamily= "Roboto";
        Chart.defaults.global.tooltips.titleFontStyle= "bold";
        Chart.defaults.global.tooltips.titleFontSize= 11;
        Chart.defaults.global.tooltips.titleFontColor= '#000000';
        Chart.defaults.global.tooltips.displayColors= false;
        Chart.defaults.global.tooltips.caretSize= 7;
        Chart.defaults.global.tooltips.footerFontSize = 0;
        Chart.defaults.global.hover.mode = 'single';
        //Chart.defaults.global.elements.rectangle.borderColor= 'rgba(0,0,0,0.5)';
        //Chart.defaults.global.elements.rectangle.borderWidth= 1;
        
        var chartOptions = _customOptions();

        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartValues.x,
            datasets: [{          
               backgroundColor: gradient2,
               hoverBackgroundColor: gradient,
               data: chartValues.y,
               borderColor: "rgba(151,187,205,1)",
               borderWidth: 1         
             }]
           },
           options: chartOptions
          });
      }

      function _customOptions(){

        var yMax = _calcYaxisLegend();
        var yStepSize = yMax / 4 ; // Always 4 ticks only. Fixed
      
        return {
          responsive: true,
          maintainAspectRatio: false,       
          scales: {
            yAxes: [{
              ticks: {                   
                max: yMax,
                min: 0,
                stepSize: yStepSize,
                callback: function(value,index,values) {
                  var resp = (isCurrency) ?  currencySymbol + value : value;               
                  return resp;
                }
              },
              gridLines:{
                display: false                   
              }
            }],
            xAxes: [{
                ticks: {
                  display: false
                },
                gridLines: {
                  display: false
                }
            }]
          },
          title: {
            display: false
          },
          legend: {
            display: false
          },

          tooltips: {
             // position: 'nearest',
            mode: 'index',             
            yPadding: 18.5,
            xPadding: 18.5,
             // yAlign: 'bottom',
             // xAlign: 'center',
            caretSize: 8,
            backgroundColor: 'rgba(200, 200, 200, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 4,
            enabled: false,           
            custom: _customTooltips,
            callbacks: {
              title: function(tooltipItem){                
                //return moment(tooltipItem[0].xLabel).format('DD MMM YYYY'); 
                return tooltipItem[0].xLabel;  
              },
              label: function(tooltipItem) {
                var resp = (isCurrency) ?  currencySymbol + Number(tooltipItem.yLabel) : Number(tooltipItem.yLabel);    
                return resp;
              },
              footer: function() { return ' '; }                 
            }            
          }
        }
      }

    }
  }
}
