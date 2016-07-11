export default class cardItemChildController {
  static get UID(){
    return "cardItemChildController";
  }

  onNewModifierMoved($modifiers){
    this.Snack.show("moving modifier to size");
  }

  constructor(Snack) {
    'ngInject';
    this.Snack = Snack;
    this.newModifiers=[];
  }
}
