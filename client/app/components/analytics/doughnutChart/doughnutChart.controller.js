export default class doughnutChartController {
  static get UID(){
    return "doughnutChartController"
  }  

  onActions(item){
    console.log('clicked item ', item);
  }

  getCanvasTitle(){
    return this.config.chartTitle;
  }

  /* @ngInject */
  constructor(Spinner, Snack, $timeout) {                                        
  	'ngInject';                                                                        
    
    this.Spinner = Spinner;
    this.Snack = Snack; 
    this.$timeout = $timeout;    
    
    this.shouldShowActions = this.config.actions && this.config.actions.length > 0 ? true : false;
    this.legendDone = false;

   // this.initChart(); 
  }

}
