export default class userNotificationsController {
  static get UID(){
    return "userNotificationsController"
  }

  debounceUpdate (which) {
    console.log("debouncing update", which);
    this.isSaving = true;
    this.debounce(this.updateNotifications.bind(this), 1000)();
  }

  updateNotifications () {
    this.user.patch({
      optinMarketing: this.user.optinMarketing,
      optinProduct: this.user.optinProduct,
      optinSupport: this.user.optinSupport,
      optinGdpr: this.user.optinGdpr
    }).then((user) => {
      angular.extend(this.user, user);
      this.finish();
    }, () => {
      this.finish(true);
    }).catch(() => {
      this.finish(true);
    });
  }

  finish(withError) {
    this.$timeout(() => {
      this.isSaving = false;
      this.hasError = Boolean(withError);
    });
  }

  debounce(func, wait, immediate) {
    console.log("debouncing");
    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.debounceTimeout = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.debounceTimeout;
      clearTimeout(context.debounceTimeout);
      context.debounceTimeout = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  };

  /* @ngInject */
  constructor(UserService, $timeout) {
    'ngInject';

    this.$timeout = $timeout;
    this.user = UserService.getCurrent();
  }
}
