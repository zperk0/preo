//import controller from './doughnutChart.controller'

export default function doughnutChart(CardActionsCodes, Spinner, $timeout, ReportsService, $filter, LabelService, ErrorService, DialogService){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      config:"=",
      kyc:"="
    },
    template: require("./doughnutChart.tpl.html"),
  //controller: controller.UID,
   // controllerAs: "doughnutChartCtrl",
   replace: true,
   // bindToController: true,
   link: (scope, elem, attr, ctrl) => {

    var chartColors = ['#0388d1', '#5e52b6'];

    scope.onActions = _onAction;
    scope.getExportData = _getExportData;
    scope.showOverlay = _showOverlay;
    scope.getOverlayContent = _getOverlayContent;
    scope.onOverlayClick = _onOverlayClick;
    scope.shouldShowActions = scope.config.actions && scope.config.actions.length > 0 ? true : false;

    var canvas = elem[0].querySelector('#doughnutchart');
    var chartValues = angular.copy(scope.config.data);

    var formatType = scope.config.type;

    var legendDone = false;

    var doughnutChart = _initChart();

    scope.$watch(
      () => { return scope.config.data; },
      function(newValue, oldValue){

        if(typeof oldValue === 'undefined' || (oldValue.values.length <= 0 && newValue.values.length <= 0 && oldValue.labels.length <= 0 && newValue.labels.length <= 0))
          return;

        Spinner.show('doughnut-directive');

        chartValues = angular.copy(scope.config.data);
        legendDone = false;

        _updateChart();
        Spinner.hide('doughnut-directive');
      },
      true
    );

    function _getExportData(){
      console.log('Exporting data...');
    }

    function _onAction(option){

      switch(option.id){
        case CardActionsCodes.EXPORT_CSV.id:
        _exportCsv();
        break;

        case CardActionsCodes.EXPORT_PDF.id:
        _exportPdf();
        break;
      }

    }

    function _exportPdf(){
      ReportsService.sendGAExportEvent('pdf' , scope.config.name);
      scope.exportData = _prepareDataToPdf();
      scope.exportDataUrl = ReportsService.getChartExportPdfUrl();        

      var formSubmit = elem[0].querySelector('#postData');

      $timeout(() =>{
          formSubmit.click();
      });
    }

    function _exportCsv(){
      ReportsService.sendGAExportEvent('csv' , scope.config.name);
      scope.exportData = _prepareDataToCsv();
      scope.exportDataUrl = ReportsService.getChartExportCsvUrl();        

      var formSubmit = elem[0].querySelector('#postData');
      
      $timeout(() =>{
          formSubmit.click();
      });
    }

    function _prepareDataToCsv(){
      var minDate = "-";
      var maxDate = "-";

      if(moment(scope.config.startDate,"L").isValid())
        minDate = moment(scope.config.startDate, "L").format("L");

      if(moment(scope.config.endDate,"L").isValid())
        maxDate = moment(scope.config.endDate,"L").format("L");

      var data = [[minDate + ' - ' + maxDate], [scope.config.name]];

      chartValues.values.forEach((x, index) => {       

        if(formatType == 'currency')
          data.push([$filter('currency')(x) , chartValues.labels[index]]);
        else if(formatType == 'integer')
          data.push([$filter('currency')(x,true,0) , chartValues.labels[index]]);
        else
          data.push([$filter('currency')(x,true) , chartValues.labels[index]]);
      });

      return {data: data};
    }

    function _prepareDataToPdf(){
      var minDate = "-";
      var maxDate = "-";

      var data = [];
      chartValues.values.forEach((value, index) => {
        let obj = {
          name: chartValues.labels[index],
          y: value, //$filter('currency')(value,true) ,
          color: chartColors[index]
        }

        data.push(obj);
      });

      if(moment(scope.config.startDate,"L").isValid())
        minDate = moment(scope.config.startDate, "L").valueOf();

      if(moment(scope.config.endDate,"L").isValid())
        maxDate = moment(scope.config.endDate,"L").valueOf();

      return  {
          type:'PIE',
          title: scope.config.name,
          startDate: minDate,
          endDate: maxDate,
          dataJson: JSON.stringify(data),
          categories: chartValues.labels
      }
    }

    function _updateChart(){
      doughnutChart.data.datasets[0].data = chartValues.values;
      doughnutChart.data.labels = chartValues.labels;

      doughnutChart.update();

      //update custom legend
      doughnutChart.generateLegend();
    }

    function _initChart(){

      var chartOptions = _customOptions();

      var ctx = canvas.getContext("2d");

        return new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: chartValues.labels,
            datasets: [{
             backgroundColor: chartColors,
             hoverBackgroundColor: chartColors,
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
        var valPercent = totalValue <= 0 ? '0%' : ((value/totalValue)*100).toFixed(0) + '%';

        var valueToString = 0;
        if(formatType == 'currency')
          valueToString = $filter('currency')(value);// currencySymbol + value.toLocaleString();
        else if(formatType == 'integer')
          valueToString = $filter('currency')(value, true,0);
        else
          valueToString = $filter('currency')(value, true);
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

    function _showOverlay() {
      return !scope.kyc;
    }

    function _getOverlayContent() {
      if (!scope.kyc) {
        return 'NOT AVAILABLE';
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
