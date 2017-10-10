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
      this.Spinner.hide('user-search');
    }, () => {
      this.Spinner.show('user-search');
    });
  }

  constructor($scope, $stateParams, $timeout, Spinner, Snack, contextual, UserService) {
    "ngInject";

    console.log("userSelectListController ", $scope);

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.UserService = UserService;
    this.Snack = Snack;
    this.contextual = contextual;

    this.userList = [];
  }
}
