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

    if (!data) {
      data = {};
    }

    data.permissions = this.Permissions.ADMIN;

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

    this.$timeout(() => {

      if (user.permissions && user.permissions[this.Permissions.ADMIN] === true) {
        user.$admin = true;
      } else {
        user.$admin = false;
      }

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

    const {
      StateConfig,
      UtilsService,
    } = this;
    const deferred = this.$q.defer();

    Preoday.User.signout()
      .then(success => {
        deferred.resolve(success);

        if (!shouldKeepInScreen) {

          if (StateConfig.isChannel) {
            window.location.href = UtilsService.getHost() + '/#/auth/signin';
          } else {
            this.$state.go('redirect', { destination: 'auth.signin', timeout: 1000, refresh: true });
          }
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

  constructor($q, $timeout, $rootScope, BroadcastEvents, UtilsService, PermissionService, StateConfig, Permissions, $state) {
    "ngInject";
    this.$q = $q;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    this.UtilsService = UtilsService;
    this.PermissionService = PermissionService;
    this.StateConfig = StateConfig;
    this.Permissions = Permissions;
    this.$state = $state;

    this.authDeferred = null;
  }
}