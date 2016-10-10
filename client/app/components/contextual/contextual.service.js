export default class contextualService {
  static get UID(){
    return "contextual";
  }


  showMenu(template, entity, onSuccess, onError, params){
    this.contextualDrawer.close();
    this.contextualMenu.show(template, entity, onSuccess, onError, params);
  }

  showDrawer(id){
    this.contextualMenu.close();
    return this.contextualDrawer.show(id);
  }

  hide() {
    this.contextualMenu.close();
    this.contextualDrawer.close();
  }

  constructor(contextualMenu, contextualDrawer) {
    "ngInject";
    this.contextualMenu = contextualMenu;
    this.contextualDrawer = contextualDrawer;

  }
}
