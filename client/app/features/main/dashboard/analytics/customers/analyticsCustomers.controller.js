export default class analyticsCustomersController {
  static get UID(){
    return "analyticsCustomersController";
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
      console.log('data - ', data);
      this.reportsData = data;

      this.updateView();

      this.hideSpinner();

    }, (err) => {
      console.log('ReportService fetch Customers Error - ', err);
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
      if(this.dataFilters.customerMarketing){
        data = this.$filter('marketingFilter')(this.tableData.body, this.fieldToFilter, true);
      }
      else{
        data = this.tableData.body;
      }
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

  sendNotification(){
    var modal = {
      title: this.gettextCatalog.getString('Send a push notification...'),
      placeholder: this.gettextCatalog.getString('Write here your message'),
      titleMessage: this.gettextCatalog.getString('Please note, push notifications will only be received by users who have your mobile app installed.'),
      buttons: [{name:this.gettextCatalog.getString('Send')}]
    };

    this.DialogService.showTextDialog(this.$scope, modal.title, modal.placeholder, modal.titleMessage,modal.buttons)
    .then(() => {
      
      var usersSelected = [];
      var textToPush = this.$scope.diagCtrl.textArea;
      
      if(this.linesSelected.length > 0){
        usersSelected = this.linesSelected;
      }
      else{
        usersSelected = this.tableData.body;
      }

      this.ReportsService.sendPushNotification( usersSelected,textToPush)
      .then((data) => {
        console.log('response push notif', data);
      }, (err) => {
        console.log('erro push nootif', err);
      });

    }, () => {
      console.log('cancel dialog');
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

      case this.cardActionsCodes.NOTIFICATION.id:
      this.sendNotification()
      break;
    }

  }

  getReportTypes(){    
    
    var types = [this.ReportTypes.PAYINGCUSTOMERS,this.ReportTypes.NEWCUSTOMERS,this.ReportTypes.CUSTOMERS, this.ReportTypes.NEWAREADELIVERY];
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

    this.linesSelected = [];

    return viewTable;
  }

  onFilter(filters , typeChanged){

    this.dataFilters = filters;

    // view is loaded with empty report fitler, no search at first time
    if(!this.dataFilters.report){
      this.shouldShowdatatable = false;     
      return;
    }

    var isReportUpdated = false;

    if(typeChanged == 'Report'){
     
      isReportUpdated = true;
    }

    // If typeChanged = customermarketing means that Report has this property
    // So if value comes = TRUE filter table, ELSE do not filter (empty filter)
    if(typeChanged == 'CustomerMarketing'){
      if(filters.customerMarketing)
        this.filterCustomerMarketing = true;
      else
        this.filterCustomerMarketing = false;// '!!'; //empty value
    }

    //CustomerMarketing its only a filter, no need new search
    //Fetch from Api when any filter, except Report is changed, or if report changed but has not data to show on it.
    if( (!isReportUpdated && typeChanged != 'CustomerMarketing') || (isReportUpdated && !this.reportsData.hasOwnProperty(filters.report.id)) ){

      this.debounceFetch();
    }
    else{
      this.updateView();
    }

  }

  updateView(){

    this.reportTitle = this.dataFilters.report.name;

    this.tableData = this.getTableData();

    this.getTableActionList(this.dataFilters.report.actions);

  }

  hideSpinner(){
    this.spinner.hide('analytics-cutomer');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('analytics-cutomer');
  }

  showSpinner(){
    this.spinner.show('analytics-cutomer');
  }

  constructor($filter, $stateParams, $state, $scope, $timeout, $window, Spinner, ReportTypes, DialogService, ReportsService, gettextCatalog, CardActionsCodes) {
    "ngInject";

    this.spinner = Spinner;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$filter = $filter;

    this.cardActionsCodes = CardActionsCodes;
    this.ReportTypes = ReportTypes;
    this.gettextCatalog = gettextCatalog;
    this.ReportsService = ReportsService;
    this.DialogService = DialogService;

    this.reportTypes = this.getReportTypes();
    this.fieldToFilter = 'customerMarketing';

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;

    this.linesSelected = [];
    this.tableData = {};
    this.reportsData = {};

    this.dataFilters = {
      venue: null,
      report: null,
      datesRange: null,
      events: null
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
