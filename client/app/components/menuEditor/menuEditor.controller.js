export default class menuEditorController {
  static get UID(){
    return "menuEditorController";
  }

  toggleDrawer(id){
    this.contextual.showDrawer(id);
  }

  /* @ngInject */
  constructor(contextual) {
    "ngInject";
    this.contextual = contextual;
  }
}
