export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerItem";
  }

  close(){
    return this.$mdSidenav('items').close()
  }

  navigateToPage(){
    this.$state.go("main.dashboard.menus.itemList")
  }

  checkTypes () {

    let currentMenu = this.MenuService.getCurrentMenu();
    if (currentMenu) {
      if (currentMenu.isVoucher()) {
        this.types = ['ALL', 'EMAIL', 'POST'];
      } else {
        this.types = ['NONE'];
      }
    } else {
      this.types = ['NONE'];
    }
  }

  isInFilter (item, filterName) {

    if (this.types) {
      let validType = this.types.indexOf(item.voucherType) !== -1;
      if (!validType) {
        return false;
      }
    }

    return !filterName || (item.name && item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  constructor($scope, ItemService, $stateParams,$mdSidenav, $state, MenuService) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.$state = $state;
    this.MenuService = MenuService;

    this.cancelledItems = [];
    this.types = ['NONE'];



    ItemService.getItems($stateParams.venueId)
      .then(() => {

        this.data = angular.copy(ItemService.data);
      });

    let unRegisterWatch = $scope.$watch(() => {

      return MenuService.getCurrentMenu();
    }, () => {

      this.checkTypes();
    });

    $scope.$on('$destroy', () => {

      unRegisterWatch && unRegisterWatch();
    });
  }
}
