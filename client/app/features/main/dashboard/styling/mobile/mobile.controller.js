
export default class mobileController {
  static get UID(){
    return "mobileController";
  }


  constructor(contextual, $location) {
    "ngInject";
    $location.search('drawer-style','LOGO')
    contextual.showDrawer('style');
  }
}
