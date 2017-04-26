export default class analyticsSummaryController {
  static get UID(){
    return "analyticsSummaryController";
  }

  onFilter(filters , typeChanged){
    
    if(typeChanged == 'Venue'){
      this.onVenueChange(filters.venues);
    }

    if(typeChanged == 'DateRange'){
      this.onDaterangeChange(filters.datesRange);
    }    

    if(typeChanged == 'Event'){
      this.onEventChange(filters.event);
    }

  }

  onDaterangeChange(datesRange){
    console.log(' DATE RANGE CHANGE ->', datesRange);

    this.dataFilters.daterange = datesRange;
    this.dataFilters.event = null;
  }  

  onVenueChange(venues){
    console.log('VENUE->', venues);
  }  

  onEventChange(event){
    console.log(' EVENT CHANGE ->', event);

    this.dataFilters.event = event;
  }

  constructor($state, $timeout, $window, Spinner,  ChartsValueTypes, CardActionsCodes) {
    "ngInject";

    this.spinner = Spinner;  

    this.dataFilters = {
      venue: null,
      report: null,
      daterange: null,
      event: null
    };

    this.dataDailyrevenue = {};
    this.titleDailyrevenue = "";
    this.cardActionsCodes = CardActionsCodes;  
    this.$timeout = $timeout;
    this.ChartsValueTypes = ChartsValueTypes;
//this.rendered = false;
    this._init();

  }

  _init(){

    this.monthlyOrdersChart = {
      chartTitle: 'Monthly Orders',
      data: { x:['01', '02','03','04','05','06','07','08','09','10','11','12'] , y:[10, 15, 20 ,25 , 30 , 35 , 40, 80, 90, 112, 113, 120]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF],
      type: this.ChartsValueTypes.NUMBER
    };

    this.bars = 
    [{
      chartTitle: 'Daily Revenue',
      data: { x:['2017-05-01', '2017-01-01', '2017-02-02', '2017-03-03', '2016-03-04', '2016-05-07', '2017-01-30'] , y:[10, 15, 20 ,25 , 30 , 35 , 40]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_ORDERS, this.cardActionsCodes.WEEKLY_ORDERS, this.cardActionsCodes.DAILY_ORDERS],
      type: this.ChartsValueTypes.CURRENCY
    },

     {
      chartTitle: 'Daily Orders',
      data: { x:['2017-05-01', '2017-01-01', '2017-02-02', '2017-03-03', '2016-03-04', '2016-05-07', '2017-01-30'] , y:[1, 15, 20 ,255 , 456 , 358.65 , 856.5]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_ORDERS, this.cardActionsCodes.WEEKLY_ORDERS, this.cardActionsCodes.DAILY_ORDERS],
      type: this.ChartsValueTypes.NUMBER
    },

    {
      chartTitle: 'Daily Customers',
      data: { x:['2017-05-01', '2017-01-01', '2017-02-02', '2017-03-03', '2016-03-04', '2016-05-07', '2017-01-30'] , y:[100, 200, 2000 ,5654 , 10123.12 , 15435 , 18435.76]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_ORDERS, this.cardActionsCodes.WEEKLY_ORDERS, this.cardActionsCodes.DAILY_ORDERS],
      type: this.ChartsValueTypes.NUMBER
    }];

    this.doughnuts = 
    [{      
      chartTitle: 'Revenue by channel',
      data: {labels:['Web', 'Mobile'], values:[58.7, 117.2]},
      actions: [this.cardActionsCodes.EXPORT_CSV,this.cardActionsCodes.EXPORT_PDF],
      type: this.ChartsValueTypes.CURRENCY
    },

    {   
      chartTitle: 'Orders by channel',
      data: {labels:['Web', 'Mobile'], values:[12.3, 57452.7]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF],
      type: this.ChartsValueTypes.NUMBER
    },

    {   
      chartTitle: 'New vs Returning customers',
      data: {labels:['Web', 'Mobile'], values:[456.45, 6745.7]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF],
      type: this.ChartsValueTypes.NUMBER
    },

    {   
      chartTitle: 'How customers signed up',
      data: {labels:['Web', 'Mobile'], values:[1342.21, 2353.56]},
      actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF],
      type: this.ChartsValueTypes.NUMBER
    }];
   
	// fim init
  }
}


