
export default class emailsController {
  static get UID(){
    return "emailsController";
  }
  increaseZoom(){
    this.zoomLevel = this.zoomLevel < 1 ? this.zoomLevel + this.zoomInterval : this.zoomLevel;
  }

  decreaseZoom(){
    this.zoomLevel = this.zoomLevel > 0.5 ? this.zoomLevel - this.zoomInterval : this.zoomLevel;
  }

  toggleDrawer(){
    if (!this.contextualDrawer.isOpen('style') && this.$location.search()['drawer-emails-style']){
      this.contextual.showDrawer('style-emails');
    }
  }

  constructor($scope, Spinner, contextual, $location, contextualDrawer, $rootScope, $window, $timeout, StyleService) {
    "ngInject";
    this.$timeout = $timeout;
    this.$window=$window;

    this.$scope = $scope;
    $rootScope.$on('$locationChangeSuccess', this.toggleDrawer.bind(this))

    this.Spinner = Spinner;
    this.$location = $location;
    this.contextual = contextual;
    this.contextualDrawer = contextualDrawer;
    this.StyleService = StyleService;
    this.zoomLevel = 1;
    this.zoomInterval = 0.05;
    this.toggleDrawer();
  }

}
