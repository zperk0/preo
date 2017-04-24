export default class barChartController {
  static get UID(){
    return "barChartController"
  } 

  onActions(item){
    console.log('clicked -> ', item, this.config.chartTitle);
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

  }
}