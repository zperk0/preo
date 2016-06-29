
export default class eventsController {
  static get UID(){
    return "eventsController";
  }


  constructor() {
    "ngInject";
    this.tags = [{
      menuItemId:1,
      code:'cont'
    }, {
      menuItemId:1,
      code:'mil'
    }];
  }
}
