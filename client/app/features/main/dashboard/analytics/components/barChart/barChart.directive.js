//import controller from './barChart.controller'

export default function barChart(Spinner, $timeout, gettextCatalog, $filter, ReportsService, LabelService, ErrorService, DialogService){
  'ngInject';
  return {
  restrict: 'E',
  scope:{
    config:"=",
    kyc:"="
  },
  template: require("./barChart.tpl.html"),
  replace:true,
  link: (scope, elem, attr, ctrl) => {

    scope.onActions = _onUpdate;
    scope.getExportData = _getExportData;
    scope.showOverlay = _showOverlay;
    scope.getOverlayContent = _getOverlayContent;
    scope.onOverlayClick = _onOverlayClick; 

    var chartValues = {x:[], y:[]};

    var canvas = elem[0].querySelector('#barchart');

    //always init with Daily view if not setted. Or if will not use these modes
    var currentDataVisualization = null;
    var formatType = null;

    _updateChartProperties();

    var barChart = _initChart();
    setHiddenBorders(barChart, 0);
    
    scope.$watch(
      () => { return scope.config.data; },
      function(newValue, oldValue){

        if(typeof oldValue === 'undefined' || (_isEmptyData(newValue) && _isEmptyData(oldValue)))
        return;
        Spinner.show('barchart-directive');

        // update current chart with the same visualization it had before. 
        _onUpdate(null, true);

        Spinner.hide('barchart-directive');
      },
      true
    );

    function _isEmptyData(values){   

      if(!values.daily && !values.weekly && !values.monthly)
        return true;

      if((values.daily && !values.daily.x.length && !values.daily.y.length)
         && (values.weekly && !values.weekly.x.length && !values.weekly.y.length)
         && (values.monthly && !values.monthly.x.length && !values.monthly.y.length))
        return true;

      return false;
    }

    function _getExportData(){
      console.log('Exporting data...');
    }

    function _onUpdate(option, isWatchUpdate){

      // if click on same action, return
      if(option && currentDataVisualization.id == option.id)
        return;

      //when watch if fired, need to update properties, and update param option
      if(!option || (option.id != LabelService.EXPORT_CSV.id && option.id != LabelService.EXPORT_PDF.id))
        _updateChartProperties(option);

      if(!option)
        option = currentDataVisualization;

      switch(option.id){
        case LabelService.EXPORT_CSV.id:
        _exportCsv(option);
        break;

        case LabelService.EXPORT_PDF.id:
        _exportPdf(option);
        break;

        case LabelService.MONTHLY_MODE.id:
        _updateChart();
        break;

        case LabelService.WEEKLY_MODE.id:
        _updateChart();
        break;

        case LabelService.DAILY_MODE.id:
        _updateChart();
        break;
      }
    }

    function _exportPdf(){
      ReportsService.sendGAExportEvent('pdf' , scope.title);
      scope.exportData = _prepareDataToPdf();
      scope.exportDataUrl = ReportsService.getChartExportPdfUrl();

      var formSubmit = elem[0].querySelector('#postData');

      $timeout(() =>{
          formSubmit.click();
        }
      );
    }

    function _exportCsv(){
      ReportsService.sendGAExportEvent('csv' , scope.title);
      scope.exportData = _prepareDataToCsv();
      scope.exportDataUrl = ReportsService.getChartExportCsvUrl();

      var formSubmit = elem[0].querySelector('#postData');

      $timeout(() =>{
          formSubmit.click();
        }
      );
    }

    function _prepareDataToCsv(){
      var minDate = "-";
      var maxDate = "-";

      if(moment(scope.config.startDate,"L").isValid()){

        minDate = moment(scope.config.startDate, "L").format("L");
      }

      if(moment(scope.config.endDate,"L").isValid())
        maxDate = moment(scope.config.endDate,"L").format("L");

      var data = [[minDate + ' - ' + maxDate], [scope.title]];

      chartValues.x.forEach((x, index) => {

        if(formatType == 'currency')
          data.push([x , $filter('currency')(chartValues.y[index])]);
        else if(formatType == 'integer')
          data.push([x , $filter('currency')(chartValues.y[index],true,0)]);
        else
          data.push([x , $filter('currency')(chartValues.y[index],true)]);
      });

      return {data: data};
    }

    function _prepareDataToPdf(){
      var minDate = moment().valueOf();
      var maxDate = moment().valueOf()

      if(moment(scope.config.startDate,"L").isValid()){
        minDate = moment(scope.config.startDate, "L").valueOf();
      }

      if(moment(scope.config.endDate,"L").isValid()){
        maxDate = moment(scope.config.endDate,"L").valueOf();
      }

      var data = [];

      // chartValues.x.forEach((x, index) => {

      //   //if(isCurrency)
      //  //   data.push($filter('currency')(chartValues.y[index]));
      //  // else
      //     data.push($filter('currency')(chartValues.y[index],true));
      // });

      return  {
          type:'COLUMN',
          title: scope.title,
          startDate: minDate,
          endDate: maxDate,
          dataJson: JSON.stringify(chartValues.y),
          categories: chartValues.x
      }
    }

    function _updateActions(){
      let actions = angular.copy(scope.config.actions);
      if(scope.config.actions.indexOf(LabelService.DAILY_MODE) > 0 && !scope.config.data.daily){
        let index = scope.config.actions.indexOf(LabelService.DAILY_MODE);
        actions.splice(index, 1);
      }

      if(scope.config.actions.indexOf(LabelService.WEEKLY_MODE) > 0 && !scope.config.data.weekly){
        let index = scope.config.actions.indexOf(LabelService.WEEKLY_MODE);
        actions.splice(index, 1);
      }

      if(scope.config.actions.indexOf(LabelService.MONTHLY_MODE) > 0 && !scope.config.data.monthly){
        let index = scope.config.actions.indexOf(LabelService.MONTHLY_MODE);
        actions.splice(index, 1);
      }

      scope.activeActions = actions;
    }

    function _updateChartProperties(modeSelected){
      
      //update curretnVisualizationMode
      if(modeSelected){
        currentDataVisualization = modeSelected;
        chartValues = scope.config.data[modeSelected.type];
      }
      else if(scope.config.data.daily){
      
        currentDataVisualization = LabelService.DAILY_MODE;
        chartValues = angular.copy(scope.config.data.daily);
      }
      else if(scope.config.data.weekly){
       
        currentDataVisualization = LabelService.WEEKLY_MODE;
        chartValues = angular.copy(scope.config.data.weekly);
      }
      else if(scope.config.data.monthly){
       
        currentDataVisualization = LabelService.MONTHLY_MODE;
        chartValues = angular.copy(scope.config.data.monthly);
      }

      // show/hide actions from chart if its empty
      if((!chartValues.x && !chartValues.y) || (!chartValues.x.length && !chartValues.y.length))
        scope.shouldShowActions = false;
      else if(scope.config.actions && scope.config.actions.length){
        scope.shouldShowActions = true;
        _updateActions();
      }

      //update title
      var propTitle = scope.config.name[currentDataVisualization.type];
      scope.title = propTitle ? propTitle : scope.config.name;

      //update type
      formatType = scope.config.type;
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

      if(!yValues || !yValues.length)
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

      var chartOptions = _customOptions();

      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartValues.x,
          datasets: [{
            borderColor: "#0287D0",
            borderWidth: 2,
            backgroundColor: gradient2,
            hoverBackgroundColor: gradient,
            data: chartValues.y,
          }]
        },
        options: chartOptions
      });
    }

    function setHiddenBorders(chart, dataset) { 
      let key = Object.getOwnPropertyNames(chart.config.data.datasets[0]._meta)[0];
      let bars = chart.config.data.datasets[dataset]._meta[key];     
      
      bars.data.forEach((bar, index) => {           
        bar.draw = function() {
          Chart.elements.Rectangle.prototype.draw.apply(this, arguments);
          chart.chart.ctx.setLineDash([0,1]);
        }              
     
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
              beginAtZero: true,
              min: 0,
              stepSize: newY.stepSize,
              callback: function(value,index,values) {

                if(formatType == 'currency')
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
         // mode: 'index',
          mode: 'x',
          intersect: false,
          yPadding: 15.5,
          xPadding: 15.5,
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

              if(formatType == 'currency')
                return $filter('currency')(tooltipItem.yLabel);
              else if(formatType == 'integer')
                return $filter('currency')(tooltipItem.yLabel,true,0);
              else
                return $filter('currency')(tooltipItem.yLabel,true);
            },
            footer: function() { return ' '; }
          }
        }
      }

      return opts;
    }

    function _showOverlay() {
      return !scope.kyc;
    }

    function _getOverlayContent() {
      if (!scope.kyc) {
        return LabelService.NOT_AVAILABLE;
      }
    }

    function _onOverlayClick() {
      if (!scope.kyc) {
        DialogService.show(ErrorService.FULL_CLIENT.title, ErrorService.FULL_CLIENT.message, [{
          name: LabelService.CONFIRMATION
        }]);
      }
    }

  }
  }
}