export default class menuEditorController {
  static get UID(){
    return "menuEditorController";
  }

  toggleSideNav(){
    this.contextualDrawer.show();
  }

  /* @ngInject */
  constructor(contextualDrawer) {
    "ngInject";
    this.contextualDrawer = contextualDrawer;
  }
}
