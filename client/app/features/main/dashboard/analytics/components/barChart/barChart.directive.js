//import controller from './barChart.controller'

export default function barChart(CardActionsCodes, Spinner, $timeout, gettextCatalog, $filter, ReportsService){
  'ngInject';
  return {
  restrict: 'E',
  scope:{
    config:"="
  },
  template: require("./barChart.tpl.html"),
  replace:true,
  link: (scope, elem, attr, ctrl) => {

    scope.onActions = _onAction;
    scope.getExportData = _getExportData;
    scope.shouldShowActions = scope.config.actions && scope.config.actions.length > 0 ? true : false;

    // ONLY when use DAILY, MONTHLY, WEEKLY modes
    // array with Data may always come with Days, formated as YYYY-MM-DD.

    var chartValues = angular.copy(scope.config.data);

    var canvas = elem[0].querySelector('#barchart');

    var isCurrency = scope.config.type == 'currency' ? true : false;
    //var currencySymbol = scope.config.currencySymbol ? scope.config.currencySymbol : "";

    //always init with Daily view if not setted. Or if will not use these modes
    var currentDataVisualization = (scope.config.defaultMode) ? scope.config.defaultMode : CardActionsCodes.DAILY_MODE;

    //if user will not use Daily, Weekly, Monthly modes only need to send a string as title.
    var propTitle = scope.config.name[currentDataVisualization.type];
    scope.title = propTitle ? propTitle : scope.config.name;

    // update chartView before initChart
    if(currentDataVisualization != CardActionsCodes.DAILY_MODE){
      _onAction(currentDataVisualization);
    }

    var barChart = _initChart();

    scope.$watch(
      () => { return scope.config.data; },
      function(newValue, oldValue){

        if(typeof oldValue === 'undefined' || (oldValue.x.length <= 0 && newValue.x.length <= 0 && oldValue.y.length <= 0 && newValue.y.length <= 0))
        return;
        Spinner.show('barchart-directive');

        chartValues = angular.copy(scope.config.data);
        _updateChart();

        Spinner.hide('barchart-directive');
      },
      true
    );

    function _getExportData(){
      console.log('Exporting data...');
    }

    function _onAction(option){

      if(currentDataVisualization == option)
        return;

      if(option == CardActionsCodes.EXPORT_CSV){
        var data = _prepareDataToCsv();
        scope.exportData = _prepareDataToCsv();
        scope.exportDataUrl = ReportsService.getChartExportCsvUrl();
        console.log(' csv data chart -> ', data);

        var formSubmit = elem[0].querySelector('#postData');
        console.log(' button - ', formSubmit);
        $timeout(() =>{
            formSubmit.click();
          }
        );
      }

      if(option == CardActionsCodes.EXPORT_PDF){
        var data = _prepareDataToPdf();
        scope.exportData = _prepareDataToPdf();
        scope.exportDataUrl = ReportsService.getChartExportPdfUrl();
        console.log(' pdf data chart -> ', data);

        var formSubmit = elem[0].querySelector('#postData');

        $timeout(() =>{
            formSubmit.click();
          }
        );
      }

      if(option == CardActionsCodes.MONTHLY_MODE){

        currentDataVisualization = option;
        var propTitle = scope.config.name[option.type];
        scope.title = propTitle ? propTitle : scope.config.name;

        _groupByMonth();
      }

      if(option == CardActionsCodes.WEEKLY_MODE){

        currentDataVisualization = option;
        var propTitle = scope.config.name[option.type];
        scope.title = propTitle ? propTitle : scope.config.name;

        _groupByWeek();
      }

      if(option == CardActionsCodes.DAILY_MODE){

        currentDataVisualization = option;
        var propTitle = scope.config.name[option.type];
        scope.title = propTitle ? propTitle : scope.config.name;

        chartValues = angular.copy(scope.config.data);

        _updateChart();
      }
    }

    function _prepareDataToCsv(){
      var minDate = "-";
      var maxDate = "-";

      if(moment(scope.config.startDate,"L").isValid())
        minDate = moment(scope.config.startDate, "L").format("L");

      if(moment(scope.config.endDate,"L").isValid())
        maxDate = moment(scope.config.endDate,"L").format("L");
      //var minDate = moment(scope.config.startDate, "L").format("L");
     // var maxDate = moment(scope.config.endDate,"L").format("L");
      var data = [[minDate + ' - ' + maxDate], [scope.title]];

      chartValues.x.forEach((x, index) => {

        data.push([x , chartValues.y[index]]);
      });

      return {data: data};
    }

    function _prepareDataToPdf(){
      var minDate = "-";
      var maxDate = "-";

      if(moment(scope.config.startDate,"L").isValid())
        minDate = moment(scope.config.startDate, "L").valueOf();

      if(moment(scope.config.endDate,"L").isValid())
        maxDate = moment(scope.config.endDate,"L").valueOf();
      //var minDate = moment(scope.config.startDate, "L").valueOf();
     // var maxDate = moment(scope.config.endDate,"L").valueOf();

      return  {
          type:'COLUMN',
          title: scope.title,
          startDate: minDate,
          endDate: maxDate,
          dataJson: JSON.stringify(chartValues.y),
          categories: chartValues.x
      }
    }

    function _groupByMonth(){
      var monthX = [];
      var monthY = [];
      var monthCurr = null;

      var key = null;

      var dayValues = angular.copy(scope.config.data);

      dayValues.x.forEach((x, index) => {

        monthCurr = moment(x, "YYYY-MM-DD").endOf('month');

        key = monthCurr.format('MMM YYYY');

        var i = monthX.indexOf(key);

        //if KEY already exists in array, just Sum Y value to previous value
        if(i > -1){
        let sumValue = parseFloat(monthY[i]) + parseFloat(dayValues.y[index]);
        monthY[i] = sumValue.toFixed(2);
        }
        else{
        monthX.push(key);
        monthY.push(dayValues.y[index]);
        }
      });

      chartValues.x = monthX;
      chartValues.y = monthY;
      _updateChart();
    }

    function _groupByWeek(){
      var weekX = [];
      var weekY = [];
      var endWeek = null;
      var startWeek = null;

      var key = null;

      var dayValues = angular.copy(scope.config.data);

      dayValues.x.forEach((x, index) => {

        endWeek = moment(x, "YYYY-MM-DD").endOf('week');
        startWeek = moment(x, "YYYY-MM-DD").startOf('week');
        key = startWeek.format('DD') + '-' + endWeek.format('DD MMM YYYY');

        var i = weekX.indexOf(key);

        //if KEY already exists in array, just Sum Y value to previous value
        if(i > -1){
        let sumValue = parseFloat(weekY[i]) + parseFloat(dayValues.y[index]);
        weekY[i] = sumValue.toFixed(2);
        }
        else{
        weekX.push(key);
        weekY.push(dayValues.y[index]);
        }
      });

      chartValues.x = weekX;
      chartValues.y = weekY;
      _updateChart();
    }

    function _updateChart(){
      barChart.data.datasets[0].data = chartValues.y;
      barChart.data.labels = chartValues.x;

      //update Y scale. Cant ovverride ticks object.
      var newY = _calcOptionsYAxis();
      barChart.options.scales.yAxes[0].ticks.display = newY.display;
      barChart.options.scales.yAxes[0].ticks.max = newY.max;
      barChart.options.scales.yAxes[0].ticks.stepSize = newY.stepSize;

      barChart.update();
    }

    function _calcYaxisMaxSize(yValues){

      if(yValues.length <= 0)
        return 0;

      var maxValue = Math.max(...yValues);

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

    function _calcOptionsYAxis(){

      var yMax = _calcYaxisMaxSize(chartValues.y);
      var yStepSize = yMax / 4 ; // Fixed, always 4 ticks
      var ticks = {};

      if(yMax > 0 ){
        ticks = {
          display: true,
          max: yMax,
          min: 0,
          stepSize: yStepSize
        };
      }
      else{
        ticks = { display: false }
      }

      return ticks;
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

      var chartOptions = _customOptions();

      return new Chart(ctx, {
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

      var newY = _calcOptionsYAxis();

      var opts = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              display: newY.display,
              max: newY.max,
              min: 0,
              stepSize: newY.stepSize,
              callback: function(value,index,values) {
                var label = 0;
                if(isCurrency)
                  return $filter('currency')(value,false, 0);
                else
                  return $filter('currency')(value,true, 0);
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
        yPadding: 15.5,
        xPadding: 15.5,
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

            return tooltipItem[0].xLabel;
          },
          label: function(tooltipItem) {
            if(isCurrency)
              return $filter('currency')(tooltipItem.yLabel);
            else
              return $filter('currency')(tooltipItem.yLabel,true);
          },
          footer: function() { return ' '; }
        }
        }
      }

      return opts;
    }

  }
  }
}
