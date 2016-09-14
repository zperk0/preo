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
      console.log('going to check admin', user);
      this.checkAdmin(user);
    }, (error)=>{
      console.log("rejecting here", error);
      this.authDeferred.reject(error);

      this.unsetAuthDeferred();
    });

    return this.authDeferred.promise;
  }

  checkAdmin (user) {

    user.isAdmin()
      .then(() => {
        console.log('admin checked success');
        this.isUserAdmin = true;
        this.setCurrentUser(user);
      }, () => {
        console.log('admin checked false');
        this.isUserAdmin = false;
        this.setCurrentUser(user);
      });
  }

  setCurrentUser (user) {

    this.user = user;
    this.$rootScope.$broadcast(this.BroadcastEvents._ON_USER_AUTH,user);

    console.log('resolving deferred ---- ', user);
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

  restore () {

    this.authDeferred = null;
    this.isUserAdmin = false;    
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