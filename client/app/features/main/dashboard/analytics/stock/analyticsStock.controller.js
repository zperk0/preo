export default class analyticsStockController {
  static get UID(){
    return "analyticsStockController";
  }

  onActions(item){
    console.log('evento -> ', item);
    console.log('exported -->> ', this.selected);
    alert('clicked');
  }

  getReportTypes(){
    var stocks = [{id: 1, type:'report', name:'All items sold' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
                  {id: 2, type:'report', name:'Items increasing in popularity' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
                  {id: 3, type:'report', name:'Items descreasing in popularity' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
                  {id: 4, type:'report', name:'Items increasing in revenue' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
                  {id: 5, type:'report', name:'Items decreasing in revenue' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
                  {id: 6, type:'chart', name:'Individual item data (number sold)' , valueType: this.ChartsValueTypes.NUMBER ,  actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF,  this.cardActionsCodes.MONTHLY_ORDERS, this.cardActionsCodes.WEEKLY_ORDERS, this.cardActionsCodes.DAILY_ORDERS]},
                  {id: 7, type:'chart', name:'Individual item data (revenue)' , valueType: this.ChartsValueTypes.NUMBER ,actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_ORDERS, this.cardActionsCodes.WEEKLY_ORDERS, this.cardActionsCodes.DAILY_ORDERS]},
               ];  

    return stocks;
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

  getChartData(report){

    var obj = {
            chartTitle: report.name,
            data: { x:['2017-05-01', '2017-01-01', '2017-02-02', '2017-03-03', '2016-03-04', '2016-05-07', '2017-01-30'] , y:[10, 15, 20 ,25 , 30 , 35 , 40]},
            actions: report.actions,
            type: report.valueType
          };

    return obj;
  }

  getTableData(report){

    function formatMoney(number){
      //return '$'+number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return number.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' , currencyDisplay:'symbol'});
    }
    var obj = {};
    
    if(report.name === 'All items sold'){
        obj = {
         header: {name:"Name", quantity:"Quantity", revenue:"Revenue"},        
         body:[{id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee…',quantity: 1,revenue: formatMoney(29)},
                {id:2, name: 'general',quantity: 9999999, revenue:formatMoney(9999999.99)}, 
                {id:3, name:'jason', quantity:30,revenue: formatMoney(888888)},
                {id:4, name:'victort',quantity: 545,revenue: formatMoney(54562)}
         ]};
    }
    else if (report.id === ''){
      obj = {
          header: {name: "Name", orders:"Orders", spend:"Spend", email:"Email", tel:"Tel", customerMarketing:"Marketing"},        
          body:[{id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeee…1111', orders:  1, spend:formatMoney(29), email:'0ops@preoday.com', tel:'93551334', customerMarketing: true},
                {id:2, name:'general', orders: 9999999, spend: formatMoney(9999999.99), email: '1ops2@preoday.com', tel:'88881334', customerMarketing: false}, 
                {id:3, name:'jason', orders: 30.45, spend: formatMoney(888888), email:'2ops3@preoday.com', tel:'91251334', customerMarketing: false},
                {id:4, name:'victort', orders: 545, spend: formatMoney(54562), email:'3ops4@preoday.com', tel:'44451334', customerMarketing: true}
          ]};
    }
    
    if(Object.keys(obj).length !== 0){
      this.shouldShowdatatable = true;
      this.query.order = Object.keys(obj.body[0])[1];
    } else{
      this.shouldShowdatatable = false;
      // TO DO - create empty data div
    }

    return obj;
  }

  onDaterangeChange(filters){
    console.log(' DATE RANGE CHANGE ->', filters);

    this.dataFilters.daterange = filters.datesRange;
    this.dataFilters.event = null;
  }

  onReportChange(filters){
    console.log(' REPORT ->', filters);    

    // IF report HAS NO customermarketing checkbox, set the filter in md-data-table to DO NOT filter for this field
    // IF report HAS customermarketing checkbox, set the filter to 'empty' value
    if(filters.report.hasCustomerMarketing)
      this.filterCustomerMarketing = '!!'; //empty
    else
      this.filterCustomerMarketing = '!';

    this.dataFilters.report = filters.report;

    if(filters.report.type === 'report'){
      this.shouldShowChart = false;
      this.visibleReportTitle = filters.report.name;
     
      this.tableData = this.getTableData(filters.report);

      this.getTableActionList(filters.report.actions);
    }
    else if(filters.report.type === 'chart'){

      this.charts = this.getChartData(filters.report);

      this.shouldShowdatatable = false;
      this.shouldShowChart = true;
    }
    
  }

  onVenueChange(filters){
    console.log('VENUE->', filters);
  }

  onCustomerMarketingChange(filters){
    console.log(' MARKET ->', filters);
    if(filters.customerMarketing)
      this.filterCustomerMarketing = filters.customerMarketing;
    else
      this.filterCustomerMarketing = '!!'; //empty
    
    //this.tableData = this.filtertableData(value);
  }

  onEventChange(filters){
    console.log(' EVENT CHANGE ->', filters);

    this.dataFilters.event = filters.event;
  }

  init(){
   
  }

  constructor($filter, $state, $timeout, $window, Spinner, CardActionsCodes, ChartsValueTypes) {
    "ngInject";

    this.spinner = Spinner;

    this.cardActionsCodes = CardActionsCodes;
    this.ChartsValueTypes = ChartsValueTypes;

    this.reportTypes = this.getReportTypes();

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;   
    this.shouldShowChart = false;

    this.tableData = {};

    this.dataFilters = {
      venue: null,
      report: null,
      daterange: null,
      event: null
    };

    this.selected = [];
   
    this.visibleReportTitle = "";

    this.query = {
      order: '',
    //  limit: 5,
     // page: 1
    };

    //this.init();

   // this.tableData = this.getTableData({id:1}); this.shouldShowdatatable = true;
  } 
 
}



