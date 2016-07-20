export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerModifier";
  }

  onNewModifierMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("on cancel move"); //dont need to do anything here, just want to cancel the move
  }

  close(){
    this.$mdSidenav('modifiers').close()
      .then(function () {
        console.log("close Modifiers is done");
      });

  }

  constructor($scope, ModifierService, $stateParams,$mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledModifiers = [];
    ModifierService.getModifiers($stateParams.venueId).then((data)=>{
      this.data = data;
    })
  }
}
