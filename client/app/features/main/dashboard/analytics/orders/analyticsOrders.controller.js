export default class analyticsOrdersController {
  static get UID(){
    return "analyticsOrdersController";
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

     // this.reportsData = data;

      this.updateView();

      this.hideSpinner();

    }, (err) => {
      console.log('ReportService fetch Orders Error - ', err);
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

  onNotificationInput() {
    let nonBMP = "[^\u0000-\uFFFF]";
    if (this.$scope.diagCtrl.textArea) {
      this.$scope.diagCtrl.textArea = this.$scope.diagCtrl.textArea.replace(new RegExp(nonBMP, 'gu'), '');
    }
  }

  sendNotification(){
    var modal = {
      title: this.gettextCatalog.getString('Send a push notification...'),
      placeholder: this.gettextCatalog.getString('Write here your message'),
      titleMessage: this.gettextCatalog.getString('Please note, push notifications will only be received by users who have your mobile app installed.'),
      buttons: [{name:this.gettextCatalog.getString('Send')}]
    };

    this.DialogService.showTextDialog(this.$scope, modal.title, modal.placeholder, modal.titleMessage,modal.buttons, this.onNotificationInput)
    .then(() => {

      var usersSelected = [];
      var textToPush = this.$scope.diagCtrl.textArea;

      if(this.linesSelected.length > 0){
        usersSelected = this.linesSelected;
      }
      else{
        usersSelected = this.tableData.body;
      }

      this.showSpinner();

      this.ReportsService.sendPushNotification( usersSelected,textToPush)
      .then((data) => {
        this.Snack.show(this.gettextCatalog.getString('The message was sent successfully.'));
        this.hideSpinner();
      }, (err) => {
        this.Snack.showError(this.gettextCatalog.getString('An error occurred sending your message. Please try again later.'));
        console.log('Error pushing notify -', err);
        this.hideSpinner();
      });

    }, () => {
      console.log('cancel dialog');
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

      case this.LabelService.NOTIFICATION.id:
      this.sendNotification()
      break;
    }

  }

  getReportTypes(){

    var types = [this.ReportTypes.ORDERS,this.ReportTypes.BUSIESTDAYS,this.ReportTypes.BUSIESTEVENTS];
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

  onFilter(filters , typeChanged){

    this.dataFilters = filters;

    // view is loaded with empty report fitler, no search at first time
    if(!this.dataFilters.report){
      this.shouldShowdatatable = false;
      return;
    }

    var paramsChanged = this.ReportsService.checkIfParamsChanged(this.dataFilters, true, [filters.report.id]);

    if(paramsChanged){
      this.debounceFetch();
    }
    else{
      this.updateView();
    }

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

  updateView(){

    this.reportTitle = this.dataFilters.report.name;

    this.getTableActionList(this.dataFilters.report.actions);

    this.getTableData();

    if(this.spinnerRunning())
      this.hideSpinner();
  }

  hideSpinner(){
    this.spinner.hide('analytics-orders');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('analytics-orders');
  }

  showSpinner(){
    this.spinner.show('analytics-orders');
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

  onInitError() {
    this.hideSpinner();
  }

  constructor($filter, Snack, $q, $scope, $stateParams, $state, $timeout, $window, Spinner, ReportTypes, ReportsService, LabelService, gettextCatalog, DialogService, hasKnowYourCustomersFeature) {
    "ngInject";

    this.spinner = Spinner;
    this.$timeout = $timeout;
    this.$filter = $filter;
    this.Snack = Snack;
    this.$q = $q;
    this.$scope = $scope;

    this.loadingMoreData = false;

    this.LabelService = LabelService;
    this.ReportTypes = ReportTypes;
    this.gettextCatalog = gettextCatalog;
    this.ReportsService = ReportsService;
    //this.reportsData = ReportsService.data;
    this.DialogService = DialogService;

    this.hasKnowYourCustomersFeature = hasKnowYourCustomersFeature;

    this.reportTypes = this.getReportTypes();

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;

    this.infiniteScrollIndex = 0;
    this.valuesPerScrollPage = 20;

    this.linesSelected = [];
    this.tableData = {};

    if($stateParams.reportName){

     this.reportNameSelected = $stateParams.reportName;
    }

    this.showSpinner();

    $scope.$on('$scrollToEndOfPage', this.onInfiniteScroll.bind(this));

    this.dataFilters = {
      venues: null,
      report: null,
      datesRange: null,
      events: null
    };

    this.setInitialFilterValues();

    this.selected = [];

    this.reportTitle = "";

    this.query = {
      order: '',
    //  limit: 5,
     // page: 1
    };

  }

}
