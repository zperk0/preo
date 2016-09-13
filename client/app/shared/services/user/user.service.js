export default class UserService {

  static get UID(){
    return "UserService";
  }

  isAuth (){
    return this.user ? true : false;
  }

  auth (data) {

    if (this.authDeferred) {
      return this.authDeferred.promise;
    }

    this.authDeferred = this.$q.defer();

    Preoday.User.auth(data).then((user) => {

      this.checkAdmin(user);
    }, (error)=>{
      console.log("rejecting");
      this.authDeferred.reject(error);

      this.unsetAuthDeferred();
    });

    return this.authDeferred.promise;
  }

  checkAdmin (user) {

    user.isAdmin()
      .then(() => {
        
        this.isUserAdmin = true;
        this.setCurrentUser(user);
      }, () => {
        
        this.isUserAdmin = false;
        this.setCurrentUser(user);
      });
  }

  setCurrentUser (user) {

    this.user = user;
    this.$rootScope.$broadcast(this.BroadcastEvents._ON_USER_AUTH,user);
    this.authDeferred.resolve(user);

    this.unsetAuthDeferred();    
  }

  signout() {
    Preoday.User.signout();
    window.location.reload();
  }

  getCurrent () {

    return this.user;
  }

  isLogged () {

    return Preoday.User.isLogged();
  }

  unsetAuthDeferred () {

    this.authDeferred = null;
  }

  isAdmin () {

    return this.isUserAdmin;
  }

  constructor($q, $rootScope, BroadcastEvents) {
    "ngInject";
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;

    this.authDeferred = null;

    this.isUserAdmin = false;
  }
}