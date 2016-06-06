export default class userSelectController {
  static get UID(){
    return "userSelectController";
  }

  openMenu = ($mdOpenMenu, ev) => {
    $mdOpenMenu(ev);
  };

  /* @ngInject */
  constructor() {
    'ngInject';
    this.title = "I am a userSelect component";
    this.user = {
      name:"Baron Von Jimmy McLong-Name"
    };
  }
}
