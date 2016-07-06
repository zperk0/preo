export default class contextualService {
  static get UID(){
    return "contextual";
  }


  showMenu(template, entity, onSuccess, onError){
    this.contextualDrawer.close();
    this.contextualMenu.show(template, entity, onSuccess, onError);
  }

  showDrawer(id){
    this.contextualMenu.close();
    this.contextualDrawer.show(id);
  }

  constructor(contextualMenu, contextualDrawer) {
    "ngInject";
    this.contextualMenu = contextualMenu;
    this.contextualDrawer = contextualDrawer;

  }
}
