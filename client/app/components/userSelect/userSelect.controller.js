export default class userSelectController {
  static get UID(){
    return "userSelectController";
  }

  signout(){
    this.UserService.signout();
  }

  openMenu = ($mdOpenMenu, ev) => {
    $mdOpenMenu(ev);
  };

  /* @ngInject */
  constructor(UserService, $rootScope, BroadcastEvents) {
    'ngInject';
    this.UserService =UserService;
    this.user = UserService.user;

    $rootScope.$on(BroadcastEvents._ON_USER_AUTH,(event,user)=>{
      this.user=user;
    });
  }
}
