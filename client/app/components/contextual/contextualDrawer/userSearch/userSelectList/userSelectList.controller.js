export default class userSelectListController {

  static get UID() {
    return "userSelectListController"
  }

  isSelected(user) {
    return this.selectedList.map((item) => {return item.id}).indexOf(user.id) !== -1;
  }

  doSearch(){

    const {
      StateService,
      Spinner,
      Snack,
      ErrorService,
    } = this;

    Spinner.show('user-search');
    StateService.venue.searchCustomers(this.searchLabel).then((data) => {
      this.userList = data;
      this.alreadySearch = true;
      Spinner.hide('user-search');
    }, () => {
      Spinner.hide('user-search');
      return Snack.showError(ErrorService.DEFAULT.message);
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

  constructor($scope, $stateParams, $timeout, Spinner, Snack, contextual, StateService, ErrorService) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.contextual = contextual;
    this.Spinner = Spinner;
    this.StateService = StateService;
    this.ErrorService = ErrorService;
    this.Snack = Snack;

    this.clean();

    $scope.$on('$onSideNavClose', () =>{
      this.clean();
    });
  }
}
