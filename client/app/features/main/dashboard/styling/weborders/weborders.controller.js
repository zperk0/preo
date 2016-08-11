
export default class webordersController {
  static get UID(){
    return "webordersController";
  }

  increaseZoom(){
    this.zoomLevel = this.zoomLevel < 1 ? this.zoomLevel + this.zoomInterval : this.zoomLevel;
  }

  decreaseZoom(){
    this.zoomLevel = this.zoomLevel > 0.5 ? this.zoomLevel - this.zoomInterval : this.zoomLevel;
  }

  openDrawer(el){
    this.$location.search('drawer-style',el);
    this.$scope.$apply(); //apply to immediatelly change the location ,not only on next digest cycle


  }

  receiveMessage(event){
      var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
      if (origin[origin.length-1] !=='/')
          origin+="/";
      if (origin !== window._PREO_DATA._WEBORDERS){
        console.log("received message from origin", origin);
        return;
      }
      console.log("got event", event);
      switch(event.data) {
        case "LOADED":
          this.Spinner.hide('iframe');
          break;
        default:
          this.openDrawer(event.data);
          break;
      }

  }


  constructor($scope, $stateParams, Spinner, contextual, $location, contextualDrawer, $rootScope) {
    "ngInject";
    this.webordersUrl = window._PREO_DATA._WEBORDERS+'?venueId='+$stateParams.venueId;
    this.webordersEditUrl = this.webordersUrl+'&editor=true'
    console.log(this.webordersUrl);

    this.$scope = $scope;
    if (!window.hasListener){
      window.addEventListener("message", this.receiveMessage.bind(this), false);
      window.hasListener = true;
    }

    $rootScope.$on('$locationChangeSuccess', (event)=>{
      console.log("location change success", $location, $location.search());
      if (!this.contextualDrawer.isOpen('style') && this.$location.search()['drawer-style']){
        this.contextual.showDrawer('style');
      }
    })


    Spinner.show('iframe');
    this.Spinner = Spinner;
    this.$location = $location;
    this.contextual = contextual;
    this.contextualDrawer = contextualDrawer;
    this.zoomLevel = 1;
    this.zoomInterval = 0.05;
  }
}
