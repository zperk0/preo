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

    console.log("Users: ", this.selectedList);
  }

  onCancel(){

    this.selectedList = [];
    this.contextualDrawer.cancel();
  }

  apply() {

    this.contextualDrawer.successWithoutClose({"users": this.selectedList});
    this.selectedList = [];
  }

  constructor($scope, $stateParams, $mdSidenav, Spinner, contextualDrawer) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];
    this.Spinner = Spinner;
    this.contextualDrawer = contextualDrawer;

    this.selectedList = [];
  
  }
}
