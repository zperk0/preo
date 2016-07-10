export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerModifier";
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
    ModifierService.getModifiers($stateParams.venueId,'items').then((data)=>{
      this.data = data;
    })
  }
}
