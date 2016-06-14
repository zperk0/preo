export default class menuItemController {
  static get UID(){
    return "menuItemController";
  }

  /* @ngInject */
  constructor() {
    'ngInject';
    this.title = "I am a menuItem component";
  }
}
