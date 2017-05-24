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

     this.reportsData = data;

      this.updateView();

      this.hideSpinner();

    }, (err) => {
     console.log('ReportService fetch Stock Error - ', err);
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

  getRowsToExport(){
    var data = [];

    if(this.linesSelected.length > 0){
      data = this.linesSelected;
    }
    else{
      data = this.tableData.body;
    }

    data = this.$filter('orderObj')( data, this.query.order ,'value');

    return data;
  }

  exportCsv(){
    var rowsSelected = this.getRowsToExport();
    var rowsHeader = this.tableData.header;

    this.ReportsService.exportReportToCsv(this.dataFilters.report, rowsSelected)
    .then((data) => {
      this.exportAction = data;
      var formSubmit = document.getElementById('postData');
      this.$timeout(() =>{
        formSubmit.click();
      });
    });
  }

  exportPdf(){
    var rowsSelected = this.getRowsToExport();
    var rowsHeader = this.tableData.header;

    this.ReportsService.exportReportToPdf(this.dataFilters.report, rowsSelected)
    .then((data) => {
      this.exportAction = data;
      var formSubmit = document.getElementById('postData');
      this.$timeout(() =>{
        formSubmit.click();
      });
    });
  }

  onActions(item){

    switch(item.id){
      case this.cardActionsCodes.EXPORT_CSV.id:
      this.exportCsv();
      break;

      case this.cardActionsCodes.EXPORT_PDF.id:
      this.exportPdf();
      break;
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
      startDate: this.dataFilters.datesRange.startDate,
      endDate: this.dataFilters.datesRange.endDate
    };

    if(report.type)
      obj.type = report.type;

    this.chartData = obj;
  }

  getTableData(){

    this.linesSelected = [];

    var report = this.dataFilters.report;

    var viewTable = this.ReportsService.prepareDataToTable(report.id);

    // the first item in table will be the Order selector
    if(viewTable.body.length > 0){
      this.shouldShowdatatable = true;
      this.query.order = viewTable.header[0].key;
    } else{
      this.shouldShowdatatable = false;
      // TO DO - create empty data div
    }

    this.currentReport = this.$filter('orderObj')( angular.copy(viewTable.body), this.query.order ,'value');

    this.tableData = {
      header: viewTable.header,
      body: this.currentReport.slice(0, this.valuesPerScrollPage)
    };

    this.infiniteScrollIndex = this.valuesPerScrollPage;
  }

  onFilter(filters , typeChanged){

    this.dataFilters = filters;
    var isReportUpdated = false;

    // view is loaded with empty report fitler, no search at first time
    if(!this.dataFilters.report){
      this.shouldShowdatatable = false;
      return;
    }

    var isChartReport = this.dataFilters.report.isChartType;

    // If none item selected, do nothing.
    if(isChartReport && !this.dataFilters.item){
      this.$timeout(() => {
        this.shouldShowChart = false;
        this.shouldShowdatatable = false;
      });
      return;
    }

    if(typeChanged == 'Report'){

      isReportUpdated = true;

      this.shouldShowdatatable = false;
      this.shouldShowChart = false;
    }

    var paramsChanged = this.ReportsService.checkIfParamsChanged(this.dataFilters, true, [filters.report.id]);

    //Fetch from Api when any filter, except Report is changed, or if report changed but has no data to show for it.
    if(!isReportUpdated ||(isReportUpdated && paramsChanged)){
      this.debounceFetch();
    }
    else{
      this.updateView();
    }

  }

  updateView(){

    if(this.dataFilters.report.isChartType == true){

      this.$timeout(() => {
        this.getChartData();
        this.shouldShowChart = true;
      });
    }
    else{

      this.reportTitle = this.dataFilters.report.name;

      this.getTableData();

      this.getTableActionList(this.dataFilters.report.actions);
    }

    if(this.spinnerRunning())
      this.hideSpinner();
  }

  onInfiniteScroll(){

    if(this.shouldShowdatatable && !this.loadingMoreData){

      if(this.tableData.body.length !== this.currentReport.length){
        this.loadingMoreData = true;

          //before return it, order by the CURRENT order ...
          var itemsLeft = this.currentReport.length - this.infiniteScrollIndex;
          var newPossibleValues = this.currentReport.slice(this.infiniteScrollIndex);
          var reportOrdered = this.$filter('orderObj')( newPossibleValues, this.query.order ,'value');

          var newValues =[];
          if(itemsLeft < this.valuesPerScrollPage)
            newValues = reportOrdered.slice(0, itemsLeft);
          else
            newValues = reportOrdered.slice(0, this.valuesPerScrollPage);

          this.$timeout(() => {
            this.tableData.body = this.tableData.body.concat(newValues);
            this.loadingMoreData = false;

            this.infiniteScrollIndex += this.valuesPerScrollPage;
          },200);
      }
    }
  }

  hideSpinner(){
    this.spinner.hide('analytics-stock');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('analytics-stock');
  }

  showSpinner(){
    this.spinner.show('analytics-stock');
  }

  setInitialFilterValues(){
    if(this.ReportsService.data){
      let params = this.ReportsService.data;

      this.dataFilters.venues = params.venueIds;
      this.dataFilters.outlets = params.outletIds;

      if(params.maxCreated && params.minCreated){
        this.dataFilters.datesRange = {
          startDate: params.minCreated,
          endDate: params.maxCreated
        };
      }

      if(params.events){
        this.dataFilters.events = params.events.map((event) => {
          return event.occurrenceId;
        });
      }
    }

    if(this.reportNameSelected){
      this.dataFilters.report = this.reportNameSelected;
    }
  }

  constructor($filter, $stateParams,ReportsService, $scope, $state, $timeout, $window, Spinner, CardActionsCodes, ReportTypes) {
    "ngInject";

    this.spinner = Spinner;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$filter = $filter;

    this.ReportsService = ReportsService;
    this.reportsData = ReportsService.data;

    this.cardActionsCodes = CardActionsCodes;
    this.ReportTypes = ReportTypes;

    this.reportTypes = this.getReportTypes();

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;
    this.shouldShowChart = false;

    this.infiniteScrollIndex = 0;
    this.valuesPerScrollPage = 20;

    this.loadingMoreData = false;

    this.linesSelected = [];
    this.tableData = {};

    if($stateParams.reportName){

     this.reportNameSelected = $stateParams.reportName;
    }

    this.showSpinner();

    this.dataFilters = {
      venues: null,
      report: null,
      datesRange: null,
      events: null,
      item: null
    };

    this.setInitialFilterValues();

    $scope.$on('$scrollToEndOfPage', this.onInfiniteScroll.bind(this));

    this.reportTitle = "";

    this.query = {
      order: '',
    //  limit: 5,
     // page: 1
   };

}

}



