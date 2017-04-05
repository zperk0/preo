export default class mdTableController {
  static get UID(){
    return "mdTableController"
  }    

  /* @ngInject */
  constructor(Spinner, Snack, $timeout ) {
  	'ngInject';
    console.log('iniciou diretiva Table', this.data);
    this.Spinner = Spinner;
    this.Snack = Snack; 
    this.$timeout = $timeout;     
  }
}
