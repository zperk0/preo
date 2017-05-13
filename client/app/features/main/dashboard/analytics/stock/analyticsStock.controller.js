export default class analyticsStockController {
  static get UID(){
    return "analyticsStockController";
  }

  debounce(func, wait, immediate) {
    console.log("debouncing");
    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.debounceTimeout = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.debounceTimeout;
      clearTimeout(context.debounceTimeout);
      context.debounceTimeout = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  }

  debounceFetch(){

    this.debounce(this.updateReportData.bind(this), 1000)();
  }

  updateReportData(){

    if(!this.spinnerRunning())
      this.showSpinner();

    this.ReportsService.getReportData(this.dataFilters)
    .then((data) => {
      console.log('resolve reportserivde data -> ', data);
     this.reportsData = data;

      this.updateView();

      this.hideSpinner();

    }, (err) => {
     console.log('erro reportserive ', err);
     this.hideSpinner();
    });

  }

  getExportData(){
    this.exportData = this.exportAction.data;
    this.exportDataUrl = this.exportAction.url;
    console.log('Exporting data...');
  }

  onSubmit(){
    console.log('on submit');
  }
  onActions(item){

    var rowsSelected = null;
    var rowsHeader = this.tableData.header;
    if(this.linesSelected.length > 0){
      rowsSelected = this.linesSelected;
    }
    else{
      rowsSelected = this.tableData.body;
    }

    console.log('lines selected -> ', this.linesSelected);
    if(item == this.cardActionsCodes.EXPORT_CSV){

      this.exportAction = this.ReportsService.exportReportToCsv(this.dataFilters.report, rowsSelected);
      var formSubmit = document.getElementById('postData');
      this.$timeout(() =>{
          formSubmit.click();
        }
      );
    }
    else if(item == this.cardActionsCodes.EXPORT_PDF){

      this.exportAction = this.ReportsService.exportReportToPdf(this.dataFilters.report, rowsSelected);
      var formSubmit = document.getElementById('postData');

      this.$timeout(() =>{
          formSubmit.click();
        }
      );
    }
  }

  getReportTypes(){

    var types = [this.ReportTypes.STOCK, this.ReportTypes.STOCKITEMDATA];
    return types;
  }

  getTableActionList(actions){

    if(actions && actions.length > 0){
      this.actions = actions;
      this.shouldShowActions = true;
    }else {
      this.actions = [];
      this.shouldShowActions = false;
    }

  }

  getChartData(){

    var report = this.dataFilters.report;
    var data = this.reportsData && this.reportsData[report.id] ? this.reportsData[report.id] : {keys: [], values: []};

    var obj = {
      name: report.name,
     // data: { x:['2017-05-01', '2017-01-01', '2017-02-02', '2017-03-03', '2016-03-04', '2016-05-07', '2017-01-30'] , y:[10, 15, 20 ,25 , 30 , 35 , 40]},
      data: {x: data.keys, y: data.values},
      actions: report.actions,
      //type: 'currency',
      startDate: this.dataFilters.datesRange.startDate,
      endDate: this.dataFilters.datesRange.endDate
    };

    this.shouldShowChart = true;

    return obj;
  }

  getTableData(){

    var report = this.dataFilters.report;

    var viewTable = this.ReportsService.prepareDataToTable(report.id);

   //  var viewTable = {
   //    header: this.ReportsService.getReportHeader(report.id),
   //    body: []
   //  };

   //  var data = this.reportsData && this.reportsData[report.id] ? this.reportsData[report.id] : [];

   // // var testdata = [{ name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1…',itemcount: 1, itemtotal: 29},
   // //    { name: 'general',itemcount: 9999999,itemtotal:9999999.99},
   // //    { name:'jason', itemcount:30,itemtotal: 888888},
   // //    { name:'victort',itemcount: 545, itemtotal: 54562.1}];

   //  data.forEach((row) => {

   //    let rowObj = [];
   //    viewTable.header.forEach((head) => {
   //      let colObj = {};
   //      if(row.hasOwnProperty(head.key)){
   //        colObj.value = row[head.key];
   //        colObj.fieldType = head.fieldType;
   //       // colObj[head.key] = row[head.key];
   //        colObj.key = head.key;
   //      }
   //      else{
   //        colObj.value = "-";
   //       // colObj[head.key] = "-";
   //        colObj.key = head.key;
   //      }

   //      rowObj.push(colObj);
   //    });

   //    viewTable.body.push(rowObj);
   //  });

    // the first item in table will be the Order selector
    if(viewTable.body.length > 0){
      this.shouldShowdatatable = true;
      this.query.order = viewTable.header[0].key;
    } else{
      this.shouldShowdatatable = false;
      // TO DO - create empty data div
    }

    return viewTable;
  }

  onFilter(filters , typeChanged){

    this.dataFilters = filters;

    // view is loaded with empty report fitler, no search at first time
    if(!this.dataFilters.report)
      return;

    var isReportUpdated = false;
    var isChartReport = this.dataFilters.report.isChartType;

    if(typeChanged == 'Report'){

      isReportUpdated = true;

      if(isChartReport){
        this.shouldShowdatatable = false;
      }
      else{
        this.shouldShowChart = false;
      }
    }

    // If none item selected, do nothing.
    if(isChartReport && !this.dataFilters.item){
      this.shouldShowChart = false;
      return;
    }

    //Fetch from Api when any filter, except Report is changed, or if report changed but has no data to show for it.
    if(!isReportUpdated || (isReportUpdated && this.reportsData && !this.reportsData.hasOwnProperty(filters.report.id)) ){
      this.debounceFetch();
    }
    else{
      this.updateView();
    }

  }

  updateView(){

    if(this.dataFilters.report.isChartType == true){

      this.chartData = this.getChartData();
    }
    else{

      this.reportTitle = this.dataFilters.report.name;

      this.tableData = this.getTableData();

      this.getTableActionList(this.dataFilters.report.actions);
    }

  }

  hideSpinner(){
    this.spinner.hide('stock-parameter change');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('stock-parameter change');
  }

  showSpinner(){
    this.spinner.show('stock-parameter change');
  }

  constructor($stateParams,ReportsService, $scope, $state, $timeout, $window, Spinner, CardActionsCodes, ReportTypes) {
    "ngInject";

    this.spinner = Spinner;
    this.$scope = $scope;
    this.$timeout = $timeout;

    this.ReportsService = ReportsService;

    this.cardActionsCodes = CardActionsCodes;
    this.ReportTypes = ReportTypes;

    this.reportTypes = this.getReportTypes();

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;
    this.shouldShowChart = false;
    this.shouldShowItemFilter = false;

    this.linesSelected = [];
    this.tableData = {};
    this.reportsData = [];
    this.reportItems = null;

    this.dataFilters = {
      venues: null,
      report: null,
      datesRange: null,
      events: null,
      item: null
    };

    this.reportTitle = "";

    this.query = {
      order: '',
    //  limit: 5,
     // page: 1
   };

   if($stateParams.reportName){

    this.showSpinner();

    this.reportTypes.forEach((x) => {
      if(x.name === $stateParams.reportName){
        x.default = true;
      }
    });

  }

}

}



