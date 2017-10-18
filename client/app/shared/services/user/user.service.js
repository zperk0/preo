export default class UserService {

  static get UID(){
    return "UserService";
  }

  isAuth (){
    return this.user ? true : false;
  }

  auth (data, skipAdmin) {

    if (this.authDeferred) {
      return this.authDeferred.promise;
    }

    this.authDeferred = this.$q.defer();

    if(this.domainId && data)
      data.domain = this.domainId;

    Preoday.User.auth(data).then((user) => {
      console.log("doing auth", user);

      if (skipAdmin) {
        this.authDeferred.resolve(user);
        return this.unsetAuthDeferred();
      }

      if (user){
        console.log("checking admin")
        this.checkAdmin(user);
      }
    }, (error)=>{
      this.authDeferred.reject(error);

      this.unsetAuthDeferred();
    });

    return this.authDeferred.promise;
  }

  checkAdmin (user) {

    if (!this.authDeferred) {
      this.authDeferred = this.$q.defer();
    }

    this.PermissionService.checkSystemPermission()
      .then(() => {
        user.$admin = true;
        this.setCurrentUser(user);
      }, () => {
        user.$admin = false;
        this.setCurrentUser(user);
      });

    return this.authDeferred.promise;
  }

  setCurrentUser (user) {

    this.user = user;
    this.UtilsService.updateLocale();

    this.$rootScope.$broadcast(this.BroadcastEvents._ON_USER_AUTH,user);

    this.authDeferred && this.authDeferred.resolve(user);

    this.unsetAuthDeferred();
  }

  signout(shouldKeepInScreen) {

    let deferred = this.$q.defer();

    Preoday.User.signout()
      .then(success => {
        deferred.resolve(success);

        if (!shouldKeepInScreen) {
          this.$state.go('redirect', { destination: 'auth.signin', timeout: 1000, refresh: true });
        }
      }, error => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  getCurrent () {

    return this.user || Preoday.User.getCurrent();
  }

  isLogged () {

    return Preoday.User.isLogged();
  }

  unsetAuthDeferred () {

    this.authDeferred = null;
  }

  isAdmin () {

    return this.user && this.user.$admin;
  }

  restore () {

    Preoday.User.setUser(null);
    this.user = null;
    this.authDeferred = null;
  }

  forgotPassword (data) {
    const deferred = this.$q.defer();
    const that = this;
    Preoday.User.forgotPassword(data).then(
      function () {
        deferred.resolve();
      },
      function (error) {
        console.log("rejecting forgotPassword", error)
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

   searchUsers (stringSearch) {
    const deferred = this.$q.defer();
    const that = this;
    Preoday.Domain.searchUsers("preoday", stringSearch).then((data) => {
      deferred.resolve(data);
    }, (error) => {
      console.log("rejecting getDomainUsers", error)
      deferred.reject(error);
    });

    return deferred.promise;
  }

  constructor($q, $rootScope, BroadcastEvents, UtilsService, PermissionService, $state) {
    "ngInject";
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    this.UtilsService = UtilsService;
    this.PermissionService = PermissionService;
    this.$state = $state;

    this.domainId = window._PREO_DATA._DOMAIN ? window._PREO_DATA._DOMAIN : null;

    this.authDeferred = null;
  }
}