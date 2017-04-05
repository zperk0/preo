export default class analyticsStockController {
  static get UID(){
    return "analyticsStockController";
  }

  onActions(item){
    console.log('evento -> ', item);
    alert('clicked');
  } 

  getTitleActionList(){
    this.actions = [
      this.CardActionsCodes.EXPORT_CSV,
      this.CardActionsCodes.EXPORT_PDF,
      this.CardActionsCodes.DAILY_ORDERS,
      this.CardActionsCodes.WEEKLY_ORDERS,
      this.CardActionsCodes.MONTHLY_ORDERS
    ];
   // return actions;
  }

  getTableData(){
  	var obj = {
  		header: ["name", "Quantity", "Revenue"],
  		body:[{id: 1, columns:['abc','def', 6]},{id:2, columns:["23", "23", 11]},{id:3, columns:['232','524',13]}, {id:4, columns:['54','4325',3]}]
  	};

  	return obj;
  }

  constructor($state, $timeout, $window, Spinner, CardActionsCodes) {
    "ngInject";

    this.spinner = Spinner;

    this.CardActionsCodes = CardActionsCodes;

    this.tableData = this.getTableData();
    
    this.getTitleActionList();       
  }

}
