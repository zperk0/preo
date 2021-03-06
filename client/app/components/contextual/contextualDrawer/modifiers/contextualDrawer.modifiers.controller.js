export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerModifier";
  }

  onNewModifierMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("on cancel move"); //dont need to do anything here, just want to cancel the move
  }

  navigateToPage(){
    this.$state.go("main.dashboard.menus.modifiers")
  }

  close(){
    this.contextualDrawer.close();
  }

  isInFilter (modifier, filterName) {

    // return true;
    return !filterName || modifier.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
  }

  constructor($scope, ModifierService, $stateParams, $mdSidenav, $state, contextualDrawer, StateService) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.$state = $state;
    this.contextualDrawer = contextualDrawer;

    this.cancelledModifiers = [];
    ModifierService.getModifiers(StateService.venue.id).then((data)=>{
      this.data = angular.copy(data);
    });
  }
}
