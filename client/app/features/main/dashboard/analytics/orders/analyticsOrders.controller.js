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
    else if(item == this.cardActionsCodes.NOTIFICATION){
      var modal = {
        title: this.gettextCatalog.getString('Send a push notification...'),
        placeholder: this.gettextCatalog.getString('Write here your message'),
        titleMessage: this.gettextCatalog.getString('Please note, push notifications will only be received by users who have your mobile app installed.'),
        buttons: [{name:this.gettextCatalog.getString('Send')}]
      };

      this.DialogService.showTextDialog(this.$scope, modal.title, modal.placeholder, modal.titleMessage,modal.buttons)
      .then(() => {

        var venueId = "";
        var usersSelected = [];
        var textToPush = this.$scope.diagCtrl.textArea;        

        this.ReportsService.sendPushNotification( venueId, usersSelected,textToPush)
        .then(() => {
   
        }, (err) => {
          console.log('Error pushing notify - ', err);
        });

      }, () => {
        console.log('Cancel dialog');
      });
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

    var report = this.dataFilters.report;

    var viewTable = this.ReportsService.prepareDataToTable(report.id);

    // var viewTable = {
    //   header: this.ReportsService.getReportHeader(report.id),
    //   body: []
    // };

    // var data = this.reportsData && this.reportsData[report.id] ? this.reportsData[report.id] : [];

    // data.forEach((row) => {

    //   let rowObj = [];
    //   viewTable.header.forEach((head) => {
    //     let colObj = {};
    //     if(row.hasOwnProperty(head.key)){
    //       colObj.value = row[head.key];
    //       colObj.fieldType = head.fieldType;
    //      // colObj[head.key] = row[head.key];
    //       colObj.key = head.key;
    //     }
    //     else{
    //       colObj.value = "-";
    //      // colObj[head.key] = "-";
    //       colObj.key = head.key;
    //     }

    //     rowObj.push(colObj);
    //   });

    //   viewTable.body.push(rowObj);
    // });   
   
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

    if(typeChanged == 'Report'){
      isReportUpdated = true;
      //this.dataFilters.report = filters.report;
    }

    //Fetch from Api when any filter, except Report is changed, or if report changed but has not data to show on it.
    if(!isReportUpdated || (isReportUpdated && !this.reportsData.hasOwnProperty(filters.report.id)) ){
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
    this.spinner.hide('orders-parameter change');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('orders-parameter change');
  }

  showSpinner(){
    this.spinner.show('orders-parameter change');
  }

  constructor($filter, $stateParams, $state, $timeout, $window, Spinner, ReportTypes, ReportsService, CardActionsCodes) {
    "ngInject";

    this.spinner = Spinner;

    this.cardActionsCodes = CardActionsCodes;
    this.ReportTypes = ReportTypes;
   // this.gettextCatalog = gettextCatalog;
    this.ReportsService = ReportsService;

    this.reportTypes = this.getReportTypes();


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

    this.selected = [];

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
