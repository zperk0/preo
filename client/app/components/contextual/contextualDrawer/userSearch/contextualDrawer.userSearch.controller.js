export default class contextualDrawerUserSearchController {
  static get UID(){
    return "ContextualDrawerUserSearch";
  }

  toogle(user) {
    
    const index = this.selectedList.map((item) => {return item.id}).indexOf(user.id);
    if (index === -1) {
      this.selectedList.push(user);
    } else {
      this.selectedList.splice(index, 1);
    }
  }

  onCancel(){

    this.contextualDrawer.cancel();
  }

  apply() {

    if (this.selectedList && this.selectedList.length) {
      this.contextualDrawer.successWithoutClose({"users": this.selectedList});
    } else {
      this.contextualDrawer.notify();
    }
  }

  constructor($scope, $stateParams, $mdSidenav, Spinner, contextualDrawer) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];
    this.Spinner = Spinner;
    this.contextualDrawer = contextualDrawer;

    this.selectedList = [];

    $scope.$on('$onSideNavClose', () =>{

      this.selectedList = [];
    });
  
  }
}
