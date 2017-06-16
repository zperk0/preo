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

  constructor($scope) {
    'ngInject';

    this.shouldShowActions = false;

    this.exportActions = [];
  }
}
