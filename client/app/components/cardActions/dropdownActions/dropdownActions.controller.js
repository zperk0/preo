export default class dropdownActionsController {
  static get UID(){
    return "dropdownActionsController";
  }

  showActions(){ 
  	this.shouldShowActions = !this.shouldShowActions;  
  }

  onMouseLeave(){
  	this.shouldShowActions = false;  
  }

  constructor($scope, gettextCatalog) {
    'ngInject';

    this.shouldShowActions = false;
  }
}
