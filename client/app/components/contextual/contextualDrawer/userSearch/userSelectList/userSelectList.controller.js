export default class userSelectListController {

  static get UID() {
    return "userSelectListController"
  }

  isSelected(user) {
    return this.selectedList.map((item) => {return item.id}).indexOf(user.id) !== -1;
  }

  doSearch(){
    this.Spinner.show('user-search');
    this.UserService.searchUsers(this.searchLabel).then((data) => {
      this.userList = data;
      this.alreadySearch = true;
      this.Spinner.hide('user-search');
    }, () => {
      this.Spinner.hide('user-search');
      return this.Snack.showError(this.ErrorService.DEFAULT.message);
    });
  }

  showSelectedUsers() {
    this.userList = this.selectedList;
  }

  showNoResults() {
    return this.alreadySearch === true && !this.userList.length;
  }
  
  clean() {
    this.userList = [];
    this.searchLabel = "";
    this.alreadySearch = false;
  }

  constructor($scope, $stateParams, $timeout, Spinner, Snack, contextual, UserService, ErrorService) {
    "ngInject";

    console.log("userSelectListController ", $scope);

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.contextual = contextual;
    this.Spinner = Spinner;
    this.UserService = UserService;
    this.ErrorService = ErrorService;
    this.Snack = Snack;

    this.clean();

    $scope.$on('$onSideNavClose', () =>{
      console.log("DRAWER CLOSED");
      this.clean();
    });
  }
}
