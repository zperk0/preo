export default class cardActionsController {
  static get UID(){
    return "cardActionsController";
  }

  doClose(){
    console.log("doing close");
    this.onClose();
  }

  /* @ngInject */
  constructor() {
   console.log("cardactions",this);
  }
}
