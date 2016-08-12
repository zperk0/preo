export default class menusSelectController {
  static get UID(){
    return "menusSelectController"
  }

  fetchMenus() {

    this.MenuService.getMenus({
      venueId: this.$stateParams.venueId
    }).then((data) => {

      this.data.menus = data.menus;
    }, () => {

    })
  }

  constructor($stateParams, MenuService) {
    "ngInject";
    
    this.data = {};
    this.$stateParams = $stateParams;
    this.MenuService = MenuService;

    this.fetchMenus();
  }
}
