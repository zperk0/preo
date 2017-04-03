export default class analyticsSummaryController {
  static get UID(){
    return "analyticsSummaryController";
  }

  constructor($state, $timeout, $window, Spinner,  AnalyticsChartsCodes) {
    "ngInject";

    this.spinner = Spinner;  

    this.dataDailyrevenue = {};
    this.titleDailyrevenue = "";

    this.AnalyticsChartsCodes = AnalyticsChartsCodes;

    this._init();

  }

  _init(){

    this.dataDailyrevenue = [10, 15, 20 ,25 , 30 , 35 , 40];
    this.titleDailyrevenue = this.AnalyticsChartsCodes.DAILY_REVENUE.fullName;
 
    this.IdRevenuechannel = this.AnalyticsChartsCodes.REVENUE_BY_CHANNEL.id;
    this.titleRevenuechannel = this.AnalyticsChartsCodes.REVENUE_BY_CHANNEL.fullName;
    this.dataRevenuechannel = [58, 42];

    this.IdOrderchannel = this.AnalyticsChartsCodes.ORDERS_BY_CHANNEL.id;
    this.titleOrderchannel = this.AnalyticsChartsCodes.ORDERS_BY_CHANNEL.fullName;
    this.dataOrderchannel = [91, 9];
	// fim init
  }
}


