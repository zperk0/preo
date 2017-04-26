export default class analyticsOrdersController {
  static get UID(){
    return "analyticsOrdersController";
  }

  onActions(item){
    console.log('evento -> ', item);
    console.log('exported -->> ', this.selected);
    alert('clicked');
  }

  getReportTypes(){
    var orders = [{id: 1, type:'report', name:'All orders' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.NOTIFICATION]},
                  {id: 2, type:'report', name:'Busiest days' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},                  
                  {id: 4, type:'report', name:'Tax report' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},                  
               ];  

    if(this.isEventVenue)
      orders.push({id: 5, type:'report', name:'Busiest events' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]});
    else
      orders.push({id: 3, type:'report', name:'Busiest time of day' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]});

    return orders;
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

    if(typeChanged == 'Event'){
      this.onEventChange(filters.event);
    }

  }

  onDaterangeChange(datesRange){
    console.log(' DATE RANGE CHANGE ->', datesRange);

    this.dataFilters.daterange = datesRange;
    this.dataFilters.event = null;
  }

  onReportChange(report){
    console.log(' REPORT ->', report);   

    this.dataFilters.report = report;

    if(report.type === 'report'){
      this.shouldShowChart = false;
      this.visibleReportTitle = report.name;
     
      this.tableData = this.getTableData(report);

      this.getTableActionList(report.actions);
    }
    else if(report.type === 'chart'){
      // there is no chart reports at this view
    }
    
  }

  onVenueChange(venues){
    console.log('VENUE->', venues);
  }  

  onEventChange(event){
    console.log(' EVENT CHANGE ->', event);

    this.dataFilters.event = event;
  }

  init(){
   
  }

  constructor($filter, $state, $timeout, $window, Spinner, CardActionsCodes, ChartsValueTypes, VenueService) {
    "ngInject";

    this.spinner = Spinner;

    this.cardActionsCodes = CardActionsCodes;
    this.ChartsValueTypes = ChartsValueTypes;

    this.reportTypes = this.getReportTypes();

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;       

    this.tableData = {};

    this.isEventVenue = VenueService.currentVenue.eventFlag == 1 ? true : false;

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
  } 

}
