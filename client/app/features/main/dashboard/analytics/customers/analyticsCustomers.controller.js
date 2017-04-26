export default class analyticsCustomersController {
  static get UID(){
    return "analyticsCustomersController";
  }

 onActions(item){
    console.log('evento -> ', item);
    console.log('exported -->> ', this.selected);
    alert('clicked');
  }

  getReportTypes(){
    var customers = [{id: 1, type:'report', name:'All paying customers' , hasCustomerMarketing: true, actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.NOTIFICATION]},
                  {id: 2, type:'report', name:'New customers' ,hasCustomerMarketing: true, actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.NOTIFICATION]},
                  {id: 3, type:'report', name:"Customers who signed up but haven't ordered" ,hasCustomerMarketing: true, actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.NOTIFICATION]},
                  {id: 4, type:'report', name:'Customers who have only ordered once' ,hasCustomerMarketing: true, actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.NOTIFICATION]},
                  {id: 5, type:'report', name:'Sleeping customers' , hasCustomerMarketing: true, actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.NOTIFICATION]},
                  {id: 6, type:'report', name:'Customers requesting delivery to a new area' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF ]}
                
               ];  

    return customers;
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

  getTableData(report){

    function formatMoney(number){
      //return '$'+number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return number.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' , currencyDisplay:'symbol'});
    }
    var obj = {};
    
    if(report.name === 'All paying customers'){
        obj = {
         header: {name:"Name", quantity:"Quantity", revenue:"Revenue",  customerMarketing:"Marketing"},        
         body:[{id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee…',quantity: 1,revenue: formatMoney(29),  customerMarketing: true},
                {id:2, name: 'general',quantity: 9999999, revenue:formatMoney(9999999.99), customerMarketing: false}, 
                {id:3, name:'jason', quantity:30,revenue: formatMoney(888888),  customerMarketing: false},
                {id:4, name:'victort',quantity: 545,revenue: formatMoney(54562),  customerMarketing: false}
         ]};
    }
    else if (report.name === 'Sleeping customers'){
      obj = {
          header: {name: "Name", orders:"Orders", spend:"Spend", email:"Email", tel:"Tel", customerMarketing:"Marketing"},        
          body:[{id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeee…1111', orders:  1, spend:formatMoney(29), email:'0ops@preoday.com', tel:'93551334', customerMarketing: true},
                {id:2, name:'general', orders: 9999999, spend: formatMoney(9999999.99), email: '1ops2@preoday.com', tel:'88881334', customerMarketing: false}, 
                {id:3, name:'jason', orders: 30.45, spend: formatMoney(888888), email:'2ops3@preoday.com', tel:'91251334', customerMarketing: false},
                {id:4, name:'victort', orders: 545, spend: formatMoney(54562), email:'3ops4@preoday.com', tel:'44451334', customerMarketing: true}
          ]};
    }
    
    console.log('obj table ', obj);
    if(Object.keys(obj).length !== 0){
      this.shouldShowdatatable = true;
      this.query.order = Object.keys(obj.body[0])[1];
    } else{
      this.shouldShowdatatable = false;
      // TO DO - create empty data div
    }

    return obj;
  }

  onFilter(filters , typeChanged){ console.log('filters coming -> ', filters);
    if(typeChanged == 'Report'){
      this.onReportChange(filters.report);
    }

    if(typeChanged == 'Venue'){
      this.onVenueChange(filters.venues);
    }

    if(typeChanged == 'DateRange'){
      this.onDaterangeChange(filters.datesRange);
    }

    if(typeChanged == 'CustomerMarketing'){
      this.onCustomerMarketingChange(filters.customerMarketing);
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

  onReportChange(reportFilter){
    console.log(' REPORT ->', reportFilter);    

    // IF report HAS NO customermarketing checkbox, set the filter in md-data-table to DO NOT filter for this field
    // IF report HAS customermarketing checkbox, set the filter to 'empty' value
    if(reportFilter.hasCustomerMarketing)
      this.filterCustomerMarketing = '!!'; //empty
    else
      this.filterCustomerMarketing = '!';

    this.dataFilters.report = reportFilter;

    if(reportFilter.type === 'report'){     
      this.visibleReportTitle = reportFilter.name;
     
      this.tableData = this.getTableData(reportFilter);

      this.getTableActionList(reportFilter.actions);
    }
    else if(reportFilter.type === 'chart'){
      //no charts at this view
    }
    
  }

  onVenueChange(venues){
    console.log('VENUE->', venues);
  }

  onCustomerMarketingChange(customerMarketing){
    console.log(' MARKET ->', customerMarketing);
    if(customerMarketing)
      this.filterCustomerMarketing = customerMarketing;
    else
      this.filterCustomerMarketing = '!!'; //empty
    
    //this.tableData = this.filtertableData(value);
  }

  onEventChange(event){
    console.log(' EVENT CHANGE ->', event);

    this.dataFilters.event = event;
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
