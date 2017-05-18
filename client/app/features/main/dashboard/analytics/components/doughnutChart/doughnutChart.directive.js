//import controller from './doughnutChart.controller'

export default function doughnutChart(CardActionsCodes, Spinner, $timeout, ReportsService, $filter){
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
    scope.getExportData = _getExportData;
    scope.shouldShowActions = scope.config.actions && scope.config.actions.length > 0 ? true : false;

    var canvas = elem[0].querySelector('#doughnutchart');
    var chartValues = angular.copy(scope.config.data);

    var isCurrency = scope.config.type == 'currency' ? true : false;

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
      scope.exportData = _prepareDataToPdf();
      scope.exportDataUrl = ReportsService.getChartExportPdfUrl();        

      var formSubmit = elem[0].querySelector('#postData');

      $timeout(() =>{
          formSubmit.click();
      });
    }

    function _exportCsv(){
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
     // var minDate = moment(scope.config.startDate, "DD/MM/YYYY").format("DD-MMM-YYYY");
     // var maxDate = moment(scope.config.endDate,"DD/MM/YYYY").format("DD-MMM-YYYY");
      var data = [[minDate + ' - ' + maxDate], [scope.config.name]];

      chartValues.values.forEach((x, index) => {

        data.push([x , chartValues.labels[index]]);
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
     // var minDate = moment(scope.config.startDate, "DD/MM/YYYY").valueOf();
     // var maxDate = moment(scope.config.endDate,"DD/MM/YYYY").valueOf();

      return  {
          type:'PIE',
          title: scope.config.name,
          startDate: minDate,
          endDate: maxDate,
          dataJson: JSON.stringify(chartValues.values),
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
        var valPercent = totalValue <= 0 ? '0%' : ((value/totalValue)*100).toFixed(0) + '%';

        var valueToString = 0;
        if(isCurrency)
          valueToString = $filter('currency')(value);// currencySymbol + value.toLocaleString();
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

  }
}
}
