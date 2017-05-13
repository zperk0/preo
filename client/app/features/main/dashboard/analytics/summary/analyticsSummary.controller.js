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

  updateCharts(){

    if(!this.spinnerRunning())
      this.showSpinner();

   this.dataFilters.report = { reportType: this.ReportTypes.SUMMARY };
   // this.ReportService.getReports(parameters)
    this.ReportsService.getReportData(this.dataFilters)
    .then((data) => {
      console.log('report resolv', data);
      this.chartsData = data;

      this.bars.forEach((bar) => {

        bar.startDate = this.dataFilters.datesRange.startDate;
        bar.endDate = this.dataFilters.datesRange.endDate;

        if(data.hasOwnProperty(bar.id)){

          bar.data = {
            x: data[bar.id].keys,
            y: data[bar.id].values
          }
        }
        else{
          bar.data = {
            x: [],
            y: []
          }
        }
      });

      this.doughnuts.forEach((doughnut) => {

        doughnut.startDate = this.dataFilters.datesRange.startDate;
        doughnut.endDate = this.dataFilters.datesRange.endDate;

        if(data.hasOwnProperty(doughnut.id)){

          doughnut.data = {
            labels: data[doughnut.id].keys,
            values: data[doughnut.id].values
          }
        }
        else{
          doughnut.data = {
            labels: [],
            values: []
          }
        }

      });

      this.cards.forEach((card) => {
        let newData = "";
        let value = data[card.id];

        if(data.hasOwnProperty(card.id)){

          card.data = data[card.id];
        }

      });

      this.dataLoaded = true;

      this.$timeout(() => {
        this.hideSpinner();
      });

    }, (err) => {
      console.log('ReportService error', err);
      this.hideSpinner();
    });
  }

  onFilter(filters , typeChanged){

    this.dataFilters = filters;

    this.debounceFetch();
  }

  hideSpinner(){
    this.spinner.hide('summary-parameter change');
  }

  showSpinner(){
    this.spinner.show('summary-parameter change');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('summary-parameter change');
  }

  constructor($stateParams, $location, ReportsService, $state, $timeout, $window, Spinner, ReportTypes) {
    "ngInject";

    this.spinner = Spinner;
    this.ReportsService = ReportsService;

    this.dataFilters = {
      venues: null,
      report: null,
      datesRange: null,
      events: null
    };
    this.$timeout = $timeout;
    this.ReportTypes = ReportTypes;

    this.dataLoaded = false;
    this.showSpinner();

   // $timeout(() => {
    this._init();
  //});

  }

  _init(){

    var types = [this.ReportTypes.SUMMARY];
    this.ReportsService.clearData();
    var charts = this.ReportsService.getReports(types);

    this.cards = charts[0].cards;
    this.bars = charts[0].bars;
    this.doughnuts = charts[0].doughnuts;
  }
}


