export default class UserService {

  static get UID(){
    return "UserService";
  }

  auth (data) {
    return this.$q((resolve, reject)=>{
        Preoday.User.auth(data).then((user) => {
        this.user = user;
        this.$rootScope.$broadcast(this.BroadcastEvents._ON_USER_AUTH,user);
        resolve(user);
      }, (error)=>{
        console.log("rejecting");
        reject(error);
      });
    });
  }

  signout() {
    Preoday.User.signout();
    window.location.reload();
  }


  constructor($q, $rootScope, BroadcastEvents) {
    "ngInject";
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
  }
}