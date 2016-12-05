export default class menuCardListController {
  static get UID(){
    return "menuCardListController"
  }

  showMenu(menu){
    this.$state.go("main.dashboard.menus.menu",{menuId:menu.id});
  }

  showCreateMenu($event, type) {

    let newMenu = {
        accountId:this.VenueService.currentVenue.accountId,
        $selected:true,
        type: type,
        name:''
    };
    let isCreating = false;
    this.menus.forEach((s, index)=>{
        if (!s.id){
          isCreating = true;
        }
    });
    if (isCreating){
      return;
    }
    this.menus.push(newMenu);
  }

  constructor(VenueService, $state, FeatureService) {
    "ngInject";
    this.VenueService=VenueService;
    this.$state = $state;

    let menuTypes = ['MENU'];

    if (FeatureService.hasVoucherFeature()) {
      menuTypes.push('VOUCHER');
    }

    this.menus = this.menus.filter((menu) => {

      return menuTypes.indexOf(menu.type) !== -1;
    });
  }
}
