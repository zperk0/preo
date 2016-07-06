export default class contextualDrawerController {
  static get UID(){
    return "ContextualDrawer";
  }

  constructor($scope, UtilsService, ContextualMenu, $timeout) {
    "ngInject";
    console.log("Showing conextual drawer ");
  }
}
