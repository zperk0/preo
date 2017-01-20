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

  constructor($scope, $timeout, ModifierService, $stateParams, $mdSidenav, $state, contextualDrawer) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.$state = $state;
    this.contextualDrawer = contextualDrawer;

    this.cancelledModifiers = [];
    ModifierService.getModifiers($stateParams.venueId).then((data)=>{
      this.data = angular.copy(data);
      $timeout(function() {
        $scope.$broadcast('suspend');
      }, 0, false);
    });
  }
}
