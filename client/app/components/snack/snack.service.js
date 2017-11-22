export default class Snack {

  static get UID(){
    return "Snack";
  }

  show (content) {
    var scope = this.$rootScope.$new();
    scope.text = content;
    this.$mdToast.show({
      template: require("./snack.tpl.html"),
      scope:scope
    });
  }

  showError (content) {
    var scope = this.$rootScope.$new();
    scope.text = content;
    this.$mdToast.show({
      template: require("./snack.error.tpl.html"),
      scope:scope
    });
  }

  showWarning (content, options) {
    var scope = this.$rootScope.$new();
    scope.text = content;
    this.$mdToast.show(angular.extend({
      template: require("./snack.warning.tpl.html"),
      scope: scope
    }, options || {}));
  }


  constructor( $mdToast, $rootScope) {
    "ngInject";
    this.$mdToast = $mdToast;
    this.$rootScope = $rootScope;
  }
}
