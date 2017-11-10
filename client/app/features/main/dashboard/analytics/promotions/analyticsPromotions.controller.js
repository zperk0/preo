export default class analyticsPromotionsController {
  static get UID(){
    return "analyticsPromotionsController";
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

    if(this.dataFilters.report.isIndividual && !this.dataFilters.promotion){
      return false;
    }

    if(!this.spinnerRunning())
      this.showSpinner();

    this.ReportsService.getReportData(this.dataFilters)
    .then((data) => {

     //this.reportsData = data;

      this.updateView();

      this.hideSpinner();

    }, (err) => {
     console.log('ReportService fetch promotions Error - ', err);
     this.hideSpinner();
    });

  }

  getParamsDate(){
    var response = {};
    if(this.dataFilters.datesRange.startDate && this.dataFilters.datesRange.endDate){
      response.start = this.dataFilters.datesRange.startDate;
      response.end = this.dataFilters.datesRange.endDate;
    }
    else{
      var events = [];

      this.dataFilters.events.forEach((row) => {
        events.push(row.startDate);
      });

      events.sort((a , b) => {
        if(a > b) return 1;
        if(a < b) return -1;

        return 0;
      });

      response.start = moment(events[0]).format('L');
      response.end = moment(events[events.length-1]).format('L');
    }

    return response;
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
      data = this.currentReport;
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
      case this.LabelService.EXPORT_CSV.id:
      this.exportCsv();
      break;

      case this.LabelService.EXPORT_PDF.id:
      this.exportPdf();
      break;
    }

  }

  getReportTypes(){

    var types = [this.ReportTypes.PROMOTIONS, this.ReportTypes.PROMOTIONS_INDIVIDUAL];
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

  onFilter(filters, typeChanged){
    this.dataFilters = filters;  

    // view is loaded with empty report fitler, no search at first time
    if(!this.dataFilters.report){
      this.shouldShowdatatable = false;
      return;
    }

    // If none item selected, do nothing.
    if(this.dataFilters.report.isIndividual && !this.dataFilters.promotion){
      this.$timeout(() => {
        this.shouldShowdatatable = false;
      });
      return;
    }

    var paramsChanged = this.ReportsService.checkIfParamsChanged(this.dataFilters, true, [filters.report.id]);

    //Fetch from Api when any filter, except Report is changed, or if report changed but has no data to show for it.
    if(paramsChanged){
      this.shouldShowdatatable = false;
      this.debounceFetch();
    }
    else{
      this.updateView();
    }
  }

  updateView(){

    this.reportTitle = this.dataFilters.report.name;
    this.getTableData();
    this.getTableActionList(this.dataFilters.report.actions);

    if(this.spinnerRunning())
      this.hideSpinner();
  }

  // on Click is fired before query.order is changed by the lib. So cant use it here. AND cant change his value here..
  onReorder(orderBy){

    var currentOrder = null;
    var direction = true;
    var sortBy = orderBy;

    //look at this.query.order to check the last orderBy selected.
    // if its the same column, just change direction, if its another column, just change sortBy with direction = true
    if(this.query.order.substring(0,1) == '-'){
      currentOrder = this.query.order.substr(1);
      direction = false;
    }
    else
      currentOrder = this.query.order;

    if(currentOrder == orderBy){
      if(direction)
        sortBy = "-" + orderBy;
      else
        sortBy = orderBy;
    }
    else{
      sortBy = orderBy;
    }
      
    this.currentReport = this.$filter('orderObj')( this.currentReport, sortBy ,'value');
    let newValues = this.currentReport.slice(0, this.infiniteScrollIndex);

    this.tableData.body = newValues;
    this.checkLinesSelected();
  }

  checkLinesSelected(){
      //if table is showing all results, no need to check linesSelected
    if(this.tableData.body.length !== this.currentReport.length && this.linesSelected.length > 0){

      let selected = angular.copy(this.linesSelected);
      for(var i=0; i <this.tableData.body.length; i++){

        let foundRow = -1;
        for(var j=0; j < selected.length; j++) {
          if(this.compareRowAsJson(this.tableData.body[i], selected[j])){
            foundRow = j;
            break;
          }
        }

        if(foundRow >= 0)
          selected.splice(foundRow, 1);
        if(selected.length == 0)
          break;
      }

      selected.forEach((rowNotFound) => {
        for(var i=0; i < this.linesSelected.length; i++){
          if(this.compareRowAsJson(this.linesSelected[i], rowNotFound)){
            this.linesSelected.splice(i, 1);
          }
        }
      });      
    }
  }

  compareRowAsJson(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
  }

  onInfiniteScroll(){

    if(this.shouldShowdatatable && !this.loadingMoreData){

      if(this.tableData.body.length !== this.currentReport.length){
        this.loadingMoreData = true;
          
          var itemsLeft = this.currentReport.length - this.infiniteScrollIndex;
          var newPossibleValues = this.currentReport.slice(this.infiniteScrollIndex);

          var newValues =[];
          if(itemsLeft < this.valuesPerScrollPage)
            newValues = newPossibleValues.slice(0, itemsLeft);
          else
            newValues = newPossibleValues.slice(0, this.valuesPerScrollPage);

          this.$timeout(() => {
            this.tableData.body = this.tableData.body.concat(newValues);
            this.loadingMoreData = false;

            this.infiniteScrollIndex += this.valuesPerScrollPage;
          },1500);
      }
    }
  }

  hideSpinner(){
    this.spinner.hide('analytics-promotions');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('analytics-promotions');
  }

  showSpinner(){
    this.spinner.show('analytics-promotions');
  }

  setInitialFilterValues(){
    if(this.ReportsService.data){
      let params = this.ReportsService.getParamsFromData();

      this.dataFilters.venues = params.venueIds;
      this.dataFilters.outlets = params.outletIds;

      if(params.maxCreated && params.minCreated){
        this.dataFilters.datesRange = {
          startDate: params.minCreated,
          endDate: params.maxCreated
        };
      }

      if(params.eventIds){
        this.dataFilters.events = params.eventIds;      
      }
    }

    if(this.reportNameSelected){
      this.dataFilters.report = this.reportNameSelected;
    }
  }

  constructor($filter, $stateParams,ReportsService, $scope, $state, $timeout, $window, Spinner, LabelService, ReportTypes, hasKnowYourCustomersFeature) {
    "ngInject";

    this.spinner = Spinner;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$filter = $filter;

    this.ReportsService = ReportsService;
   // this.reportsData = ReportsService.data;

    this.LabelService = LabelService;
    this.ReportTypes = ReportTypes;

    this.hasKnowYourCustomersFeature = hasKnowYourCustomersFeature;

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



