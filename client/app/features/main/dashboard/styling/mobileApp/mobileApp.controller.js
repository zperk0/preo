
export default class mobileAppController {
  static get UID(){
    return "mobileAppController";
  }

  toggleDrawer(){
    if (!this.contextualDrawer.isOpen('style') && this.$location.search()['drawer-mobile-style']){
      this.contextual.showDrawer('style-mobile');
    }
  }

  constructor($scope, Spinner, contextual, $location, contextualDrawer, StyleService, $rootScope, $window, $timeout) {
    "ngInject";
    this.$timeout = $timeout;
    this.$window=$window;

    this.$scope = $scope;
    $rootScope.$on('$locationChangeSuccess', this.toggleDrawer.bind(this))

    this.Spinner = Spinner;
    this.$location = $location;
    this.contextual = contextual;
    this.StyleService = StyleService;
    this.contextualDrawer = contextualDrawer;
    this.toggleDrawer();
  }
}
