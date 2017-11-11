export default class menusSelectController {
  static get UID(){
    return "menusSelectController"
  }

  fetchMenus() {

    this.MenuService.getMenus({
      venueId: this.StateService.venue.id
    }).then((data) => {

      this.data.menus = data.menus;
    }, () => {

    })
  }

  getFilteredMenus() {

    return this.data.menus.filter(function (item) {

      return item.id;
    });
  }

  constructor($stateParams, MenuService, StateService) {
    "ngInject";

    this.data = {};
    this.$stateParams = $stateParams;
    this.MenuService = MenuService;
    this.StateService = StateService;

    this.fetchMenus();
  }
}
