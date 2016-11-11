export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerModifier";
  }

  onNewModifierMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("on cancel move"); //dont need to do anything here, just want to cancel the move
  }

  close(){

    this.contextualDrawer.close();
  }

  constructor($scope, ModifierService, $stateParams,$mdSidenav, contextualDrawer) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.contextualDrawer = contextualDrawer;

    this.cancelledModifiers = [];
    ModifierService.getModifiers($stateParams.venueId).then((data)=>{
      this.data = data;
    })
  }
}
