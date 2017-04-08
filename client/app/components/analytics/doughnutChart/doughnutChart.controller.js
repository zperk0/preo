export default class doughnutChartController {
  static get UID(){
    return "doughnutChartController"
  }    

  initCanvas(){  
   
   var chartId = 'doughnutchart_'; // + this.getCanvasId();  
   console.log('I DO DO CHART -> ', chartId);
   console.log(' CHART ->>> ', document.getElementById(chartId));
  var ctx = document.getElementById(chartId).getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(114, 71, 176, 0.37)');   
    gradient.addColorStop(1, 'rgba(2, 136, 209, 0.37)');
      
    var gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(1, '#0288d1'); // start
    gradient2.addColorStop(0, '#7247b0'); // end
    
    var myChart = new Chart(ctx, {
    type: 'doughnut',
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
          //display: false
        },

        tooltips: {           
            enabled: false                      
        }
    }
  });
  }

  getCanvasId(){
    return this.canvasId;
  }
  

  getCanvasTitle(){
    return this.canvasTitle;
  }

  /* @ngInject */
  constructor(Spinner, Snack, $timeout) {
  	'ngInject';
    console.log('iniciou diretiva da rosca - ', this.getCanvasId());
    this.Spinner = Spinner;
    this.Snack = Snack; 
    this.$timeout = $timeout;
   
  // $timeout(
  //  this.initCanvas(); //, 1000);
   this.test();
  }


customLegend(chart){
    console.log('LABELS ->> ', chart);
    console.log(' THIS ->> ', this);
   // 
    var tooltipEl = document.getElementById('doughnut-legend');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'doughnut-legend';
        tooltipEl.innerHTML = "<ul></ul>"
        tooltipEl.classList.add('chart-legend');
        this.ctx.canvas.parentNode.appendChild(tooltipEl);
      }
      // Data Extract
      var dataChart = chart.config.data.datasets[0].data;
      var colorChart = chart.config.data.datasets[0].backgroundColor;
      var labelChart = chart.config.data.labels;
      
      var bodyLines = null;
      // Set Text
      if (bodyLines) {        
       // var bodyLines = tooltip.body.map(getBody);
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
       var tableRoot = tooltipEl.querySelector('ul');
       // var divRoot = tooltipEl.querySelector('div');
        tableRoot.innerHTML = innerHtml;
        document.getElementById('doughnut-legend').innerHTML= innerHtml;
      }
}

test() {

var chartOptions = {   
    tooltips:{
      enabled: false
    },
    responsive: true,     
    // showTooltips: true,
    //segmentShowStroke: false,
    //percentageInnerCutout: 65,
    cutoutPercentage: 60,
    animate: {
      animateScale: true
    },
    //animationEasing: "easeInOutQuart",
   // legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    legend: {
      display: false,
      labels: {
        generateLabels: this.customLegend 
      }
    }
    //legendCallback: this.customLegend
  }

  var data = [{
    data: 10,
   // color: "#4d0612",
    label: "Data 1"
  }, {
    data: 11,
   // color: "#8b0e19",
    label: "Data 2"
  }, {
    data: 22,
   // color: "#c8102e",
    label: "Data 3"
  }, {
    data: 38,
   // color: "#505050",
    label: "Data 4"
  }, {
    data: 8,
   // color: "#808080",
    label: "Data 5"
  }, {
    data: 12,
   // color: "#a9a9a9",
    label: "Data 6"
  }, ];
  var ctx = document.getElementById("doughnutchart_").getContext("2d");
      
    var gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(1, '#0288d1'); // start
    gradient2.addColorStop(0, '#7247b0'); // end
  var doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Red", "Blue"],
        datasets: [{
           // label: '# of Votes',
            backgroundColor: ['#0388d1', '#5e52b6'],
            hoverBackgroundColor: ['#0388d1', '#5e52b6'],
         
            data: [12, 19],
           // borderColor: "rgba(151,187,205,1)",
            borderWidth: 1      
        }]
    },
    options: chartOptions
  });
 
  //document.getElementById('doughnut-legend').innerHTML = doughnutChart.generateLegend();
}


}
