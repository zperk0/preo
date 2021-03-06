export default class analyticsSummaryController {
  static get UID(){
    return "analyticsSummaryController";
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
  };

  debounceFetch(){

    this.debounce(this.updateCharts.bind(this), 1000)();
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

  getMockValues(keys) {
    let values = [],
        min = 50,
        max = 99;
    for (let key of keys) {
      values.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return values;
  }

  updateBars(data){
    this.bars.forEach((bar) => {

      var dates = this.getParamsDate();

      bar.startDate = dates.start;
      bar.endDate = dates.end;
      bar.data = {};

      if(data.hasOwnProperty(bar.id)){
        let apiData = data[bar.id];

        if(apiData.daily){
          bar.data.daily = {
            x: apiData.daily.keys ,
            y: this.hasKnowYourCustomersFeature ? apiData.daily.values : this.getMockValues(apiData.daily.keys)
          };
        }

        if(apiData.weekly){
          bar.data.weekly = {
            x: this.formatKeysToBarChart(apiData.weekly.keys, 'week') ,
            y: this.hasKnowYourCustomersFeature ? apiData.weekly.values : this.getMockValues(apiData.weekly.keys)
          };
        }

        if(apiData.monthly){
          bar.data.monthly = {
            x: this.formatKeysToBarChart(apiData.monthly.keys, 'month')  ,
            y: this.hasKnowYourCustomersFeature ? apiData.monthly.values : this.getMockValues(apiData.monthly.keys)
         };
        }

      }

    });
  }

  formatKeysToBarChart(keys, type){

    let copyKeys = angular.copy(keys);
    copyKeys.forEach( function(e, index) {
      if(type === 'month')
      keys[index] = moment(e, 'YYYY-MM-DD').format('MMM YYYY');
    else if(type === 'week'){
      let month = moment(e, 'YYYY-MM-DD').format('MMM YYYY');
      let start = moment(e, 'YYYY-MM-DD').format('DD');
      let end = moment(e, 'YYYY-MM-DD').add(6,'day').format('DD');
      keys[index] = start + '-' + end + ' ' + month;
    }
    });

    return keys;
  }

  updateDoughnuts(data){
    this.doughnuts.forEach((doughnut) => {

      var dates = this.getParamsDate();

      doughnut.startDate = dates.start;
      doughnut.endDate = dates.end;

     if(data.hasOwnProperty(doughnut.id)){

       doughnut.data = {
         labels: data[doughnut.id].keys,
         values: this.hasKnowYourCustomersFeature ? data[doughnut.id].values : this.getMockValues(data[doughnut.id].keys)
       }
     }
     else{
        doughnut.data = {
          labels: [],
          values: []
        }
     }

    });
  }

  updateCards(data){
    this.cards.forEach((card) => {
      let newData = "";
      let value = data[card.id];

      if(data.hasOwnProperty(card.id)){

        card.data = data[card.id];
      }

    });
  }

  updateCharts(){

    if(!this.spinnerRunning())
      this.showSpinner();

   this.dataFilters.report = { reportType: this.hasKnowYourCustomersFeature ? this.ReportTypes.SUMMARY : this.ReportTypes.SUMMARY_CARDS };

    this.ReportsService.getReportData(this.dataFilters)
    .then((data) => {

      this.chartsData = data;
      this.updateView();

    }, (err) => {
      console.log('ReportService fetch Summary Error - ', err);
      this.hideSpinner();
    });
  }

  updateView(){

    if(!this.spinnerRunning())
      this.showSpinner();

    var data = this.chartsData;

    this.updateBars(data);
    this.updateDoughnuts(data);
    this.updateCards(data);

    if(this.spinnerRunning())
      this.hideSpinner();

    this.dataLoaded = true;
  }

  onFilter(filters , typeChanged){

    this.dataFilters = filters;

    var doughnutsIds = this.doughnuts.map((x) => {return x.id});
    var cardsIds = this.cards.map((x) => {return x.id});
    var barIds = this.bars.map((x) => {return x.id});
    var reportsIds = doughnutsIds.concat(barIds).concat(cardsIds);

    var paramsChanged = this.ReportsService.checkIfParamsChanged(this.dataFilters, true, reportsIds);

    if(paramsChanged)
      this.debounceFetch();
    else
      this.updateView();
  }

  hideSpinner(){
    this.spinner.hide('analytics-summary');
  }

  showSpinner(){
    this.spinner.show('analytics-summary');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('analytics-summary');
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
  }

  onInitError() {
    this.hideSpinner();
  }

  constructor($stateParams, $location, ReportsService, $state, $timeout, $window, Spinner, ReportTypes, LabelService, ErrorService, DialogService, hasKnowYourCustomersFeature) {
    "ngInject";

    this.spinner = Spinner;
    this.ReportsService = ReportsService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.DialogService = DialogService;
    this.hasKnowYourCustomersFeature = hasKnowYourCustomersFeature;

    this.dataFilters = {
      venues: null,
      report: null,
      datesRange: null,
      events: null
    };
    this.$timeout = $timeout;
    this.ReportTypes = ReportTypes;
    this.chartsData = ReportsService.data;

    this.setInitialFilterValues();

    this.dataLoaded = false;
    this.showSpinner();

    this._init();
  }

  _init(){

    var types = [this.hasKnowYourCustomersFeature ? this.ReportTypes.SUMMARY : this.ReportTypes.SUMMARY_CARDS];
   // this.ReportsService.clearData();
    this.ReportsService.getReports(types)
    .then((data) => {
        this.cards = data[0].cards;
        this.bars = data[0].bars;
        this.doughnuts = data[0].doughnuts;
    });

  }
}


