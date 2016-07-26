export default class menuCardListController {
  static get UID(){
    return "menuCardListController"
  }

  showMenu(menu){
    this.$state.go("main.dashboard.menus.menu",{menuId:menu.id});
  }

  showCreateMenu(){

    let newMenu = {
        accountId:this.VenueService.currentVenue.accountId,
        $selected:true,
        type:'MENU',
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


  constructor(VenueService, $state) {
    "ngInject";
    this.VenueService=VenueService;
    this.$state = $state;
  }
}
