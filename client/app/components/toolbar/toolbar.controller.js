export default class toolbarController {
  static get UID(){
    return "toolbarController";
  }

  /* @ngInject */
  constructor() {
    'ngInject';
    this.title = "I am a toolbar component";
  }
}
