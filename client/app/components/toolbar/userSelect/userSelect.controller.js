export default class userSelectController {
  static get UID(){
    return "userSelectController";
  }

  signout(){
    this.UserService.signout();
  }

  navigateTo(route){
    this.$state.go(route)
  }

  openMenu ($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };


  constructor(UserService, $state, $rootScope, BroadcastEvents, VenueService) {
    "ngInject";
    this.UserService =UserService;
    this.VenueService =VenueService;
    this.$state =$state;
    this.user = UserService.user;

    $rootScope.$on(BroadcastEvents._ON_USER_AUTH,(event,user)=>{
      this.user=user;
    });
  }
}
