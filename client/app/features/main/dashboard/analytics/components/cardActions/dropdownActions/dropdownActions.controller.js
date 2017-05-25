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

  constructor($scope, CardActionsCodes) {
    'ngInject';

    this.shouldShowActions = false;
    this.CardActionsCodes = CardActionsCodes;

    this.exportActions = [];
  }
}
