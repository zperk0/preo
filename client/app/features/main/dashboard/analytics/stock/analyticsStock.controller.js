export default class analyticsStockController {
  static get UID(){
    return "analyticsStockController";
  }

  onActions(item){
    console.log('evento -> ', item);
    console.log('exported -->> ', this.selected);
    alert('clicked');
  } 

  getTitleActionList(actions){
   
    if(actions && actions.length > 0){
      this.actions = actions;
      this.shouldShowActions = true;
    }else {
      this.actions = [];
      this.shouldShowActions = false;
    }
    // this.actions = [
    //   this.CardActionsCodes.EXPORT_CSV,
    //   this.CardActionsCodes.EXPORT_PDF,
    //   this.CardActionsCodes.DAILY_ORDERS,
    //   this.CardActionsCodes.WEEKLY_ORDERS,
    //   this.CardActionsCodes.MONTHLY_ORDERS
    // ];
  
  }

  getTableData(report){

    function formatMoney(number){
      //return '$'+number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return number.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' , currencyDisplay:'symbol'});
    }
    var obj = {};
    // obj ={ 
    //   body: [
    //     {id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee…', quantity:1, revenue: formatMoney(29)}, 
    //     {id:2, name:'general', quantity:9999999, revenue: formatMoney(9999999.99)}, 
    //     {id:3, name:'jason',   quantity:30.45, revenue: formatMoney(888888)},
    //     {id:4, name:'victort', quantity:30.47, revenue: formatMoney(54562)}
    // ]};  

    if(report.id === 1){
        obj = {
         header: {name:"Name", quantity:"Quantity", revenue:"Revenue"},        
         body:[{id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee…',quantity: 1,revenue: formatMoney(29)},
                {id:2, name: 'general',quantity: 9999999, revenue:formatMoney(9999999.99)}, 
                {id:3, name:'jason', quantity:30,revenue: formatMoney(888888)},
                {id:4, name:'victort',quantity: 545,revenue: formatMoney(54562)}
         ]};
    }
    else if (report.id === 3){
      obj = {
          header: {name: "Name", orders:"Orders", spend:"Spend", email:"Email", tel:"Tel", customerMarketing:"Marketing"},        
          body:[{id:1, name:'Item name goes hereeeeeeeeeeeeeeeeeeeeeeeeeee…1111', orders:  1, spend:formatMoney(29), email:'ops@preoday.com', tel:'93551334', customerMarketing: true},
                {id:2, name:'general', orders: 9999999, spend: formatMoney(9999999.99), email: 'ops2@preoday.com', tel:'88881334', customerMarketing: false}, 
                {id:3, name:'jason', orders: 30.45, spend: formatMoney(888888), email:'ops3@preoday.com', tel:'91251334', customerMarketing: false},
                {id:4, name:'victort', orders: 545, spend: formatMoney(54562), email:'ops4@preoday.com', tel:'444451334', customerMarketing: true}
          ]};
    }
    
    if(Object.keys(obj).length !== 0){
      this.shouldShowdatatable = true; console.log('QUERY ORDER -> ', Object.keys(obj.body[0])[1]);
      this.query.order = Object.keys(obj.body[0])[1];
    } else{
      this.shouldShowdatatable = false;
      // exibir algum div de EMpty data
    }

    return obj;
  }

  filtertableData(value){

    var dataFiltered = [];

    function filterBycustomerMarketing(obj){
        console.log('filter -> ', obj);
    }

    dataFiltered = this.tableData.filter((s) => s.customerMarketing === value);
console.log('filter -> ', dataFiltered);
    return dataFiltered;

  }

  onDaterangeChange(value){
    console.log(' DATE RANGE CHANGE ->', value);
  }

  onReportChange(value){
    console.log(' REPORT ->', value);
    this.visibleReportTitle = value.name;

    if(value.customerMarketing)
      this.filterCustomerMarketing = '!!';
    else
      this.filterCustomerMarketing = '!';

    this.tableData = this.getTableData(value);
    this.getTitleActionList(value.actions);
  }

  onVenueChange(value){
    console.log('VENUE->', value);
  }

  onCustomerMarketingChange(value){
    console.log(' MARKET ->', value);
    if(value)
      this.filterCustomerMarketing = value;
    else
      this.filterCustomerMarketing = '!!';
    //this.tableData = this.filtertableData(value);
  }

  onEventChange(value){
    console.log(' EVENT CHANGE ->', value);
  }

  constructor($filter, $state, $timeout, $window, Spinner, CardActionsCodes) {
    "ngInject";

    this.spinner = Spinner;

    this.CardActionsCodes = CardActionsCodes;

    this.shouldShowActions = false;
    this.shouldShowdatatable = false;   

    this.tableData = {};

    this.selected = [];
    this.promise = "";
    this.visibleReportTitle = "";

    this.query = {
      order: '',
    //  limit: 5,
     // page: 1
    };

   // this.tableData = this.getTableData({id:1}); this.shouldShowdatatable = true;
  }

  
  //getDesserts(order) {
  //  console.log('order: ', order);
   // function success(desserts) {
   //   this.tableData = desserts;
    //}
   // this.promise = this.tableData.body.get(this.query, success).$promise;
 // }  
 
}



