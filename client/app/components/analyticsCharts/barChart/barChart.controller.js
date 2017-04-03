export default class barChartController {
  static get UID(){
    return "barChartController"
  }    

  initCanvas(){

  window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };
Chart.defaults.global.pointHitDetectionRadius = 1;
    
    var customTooltips = function(tooltip) {
      // Tooltip Element
      var tooltipEl = document.getElementById('chartjs-tooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
               // tooltipEl.innerHTML = "<table></table>"
  
        this._chart.canvas.parentNode.appendChild(tooltipEl);
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
      function getBody(bodyItem) {
        return bodyItem.lines;
      }
     
      // Set Text
      if (tooltip.body) {
        var titleLines = tooltip.title || [];
        var bodyLines = tooltip.body.map(getBody);
        var titleStyle = "font-weight: bold; font-family: Roboto; font-size: 11px; line-height: 0.91; text-align: center; margin-bottom: 6px";
        var bodyStyle = "font-weight: normal; font-family: Roboto; font-size: 11px; line-height: 0.91; text-align: center; color: #131313";
        var innerHtml = "";//"<thead style='" + styleTitle + "'>";
        innerHtml = "<div style ='" + titleStyle + "'>";
        titleLines.forEach(function(title) {
          innerHtml += "<p><span>" + title + '</span></p>';
        });
       // innerHtml += '</thead><tbody>';
        innerHtml += "</div>";
        innerHtml += "<div style ='" + bodyStyle + "'>";
        bodyLines.forEach(function(body, i) {
        //  var colors = tooltip.labelColors[i];
         // var style = 'background:' + colors.backgroundColor;
         // style += '; border-color:' + colors.borderColor;
         // style += '; border-width: 2px'; 
         // var span = '<span style="' + style + '"></span>';
         // innerHtml += '<tr><td>' + body + '</td></tr>';
         innerHtml += "<p><span>" + body + "</span> </p>";
        });
        innerHtml += "</div>";
       // innerHtml += '</tbody>';
       // var tableRoot = tooltipEl.querySelector('table');
       // var divRoot = tooltipEl.querySelector('div');
       // divRoot.innerHTML = innerHtml;
        tooltipEl.innerHTML = innerHtml;
      }
      var positionY = this._chart.canvas.offsetTop;
      var positionX = this._chart.canvas.offsetLeft;
      // Display, position, and set styles for font
      tooltipEl.style.display = 'block';
      tooltipEl.style.maxHeight = 64 + 'px';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX  + 'px';
      tooltipEl.style.top =  positionY + tooltip.caretY - tooltip.caretSize + 'px';
     // tooltipEl.style.fontFamily = tooltip._titleFontFamily;
     // tooltipEl.style.fontSize = tooltip.titleFontSize;
      //tooltipEl.style.fontStyle = tooltip._fontStyle;
      tooltipEl.style.padding =  tooltip.yPadding + 'px ' ; //+ tooltip.xPadding + 'px';    
    };


  var ctx = document.getElementById('chart').getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(114, 71, 176, 0.37)');   
    gradient.addColorStop(1, 'rgba(2, 136, 209, 0.37)');
      
    var gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(1, '#0288d1'); // start
    gradient2.addColorStop(0, '#7247b0'); // end
    
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

    //Chart.defaults.global.elements.rectangle.borderColor= 'rgba(0,0,0,0.5)';
    //Chart.defaults.global.elements.rectangle.borderWidth= 1;
    Chart.defaults.global.hover.mode = 'single';

    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [{
           // label: '# of Votes',
            backgroundColor: gradient2,
            hoverBackgroundColor: gradient,
         
            data: [12, 19, 3, 5, 2, 3, 5 , 6 ,7 ,8 ,9 ,10, 13 , 12 , 12 ],
            borderColor: "rgba(151,187,205,1)",
            borderWidth: 1         
        }]
    },
    options: {
      responsive: true,     
     /* gridLines: {
        drawBorder: false,
        drawTicks: false
      },*/
        scales: {
            yAxes: [{
                ticks: {
                  //  beginAtZero:true,
                   max: 50,
                   min: 0,
                   stepSize: 10,
                    callback: function(value,index,values) {                   
                      return '$' + value;
                    }
                },
                gridLines:{
                  display: false
                  //color: "rgba(0 , 0, 0 ,0)"
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
/*          text: "Daily revenue",
          position: 'top-left',
          fontSize: 16,
          fontFamily: 'Roboto',
          fontColor: 'rgba(0,0,0,0.87)'*/

        },
        legend: {
          display: false
        },

        tooltips: {
           // position: 'nearest',
            mode: 'index',
           // intersect: false,
            yPadding: 18.5,
            xPadding: 18.5,
           // yAlign: 'bottom',
           // xAlign: 'center',
            caretSize: 8,
            backgroundColor: 'rgba(200, 200, 200, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 4,
            enabled: false,
            //mode: 'index',
           //position: 'nearest',
            custom: customTooltips,
            callbacks: {
              title: function(tooltipItem){
                return "19 " + tooltipItem[0].xLabel + "2017";
              },
                label: function(tooltipItem) {
                return "$" + Number(tooltipItem.yLabel) + "2,222.22";
                },
              footer: function() { return ' '; }
                //, 
                //labelColor: function(tooltipItem){
               // var obj = {borderColor: 'rgba(0,0,0,0.8)', backgroundColor: 'rgba(0,0,0,0.8)'};
                //  return obj;
               // }
              }            
        }
    }
  });
  }


  

  getCanvasTitle(){
    return this.canvasTitle;
  }

  /* @ngInject */
  constructor(Spinner, Snack, $timeout) {
  	'ngInject';
    console.log('iniciou diretiva');
    this.Spinner = Spinner;
    this.Snack = Snack; 
    this.$timeout = $timeout;
   
    this.initCanvas();
  }
}
