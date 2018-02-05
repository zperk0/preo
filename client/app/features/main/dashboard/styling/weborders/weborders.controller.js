
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
    this.$timeout(()=>{
      this.$location.search('drawer-style',el);
    })
  }

  onPublish(entities) {

  }

  receiveMessage(event){
      var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
      let originToCompare = origin.split("//")[1].split("/")[0]
      let webordersOrigin = this.$window._PREO_DATA._WEBORDERS_EDIT.split("//")[1].split("/")[0];
      console.log("received message from origin", origin, originToCompare, webordersOrigin);
      if (originToCompare !== webordersOrigin){
        return;
      }
      console.log("wabapp got event", event);
      switch(event.data) {
        case "__LOADED__":
          this.$timeout.cancel(this.iframeError)
          this.Spinner.hide('iframe');
          break;
        case "NAVBAR":
          this.openDrawer(event.data);
          break;
        case "LOGO":
          this.openDrawer(event.data);
          break;
        case "HEADER":
          this.openDrawer(event.data);
          break;
        case "PRIMARY":
          this.openDrawer(event.data);
          break;
        case "SECTIONS":
          this.openDrawer(event.data);
          break;
        case "BACKGROUND":
          this.openDrawer(event.data);
          break;
        default:
          break;
      }

  }

  toggleDrawer(){
    if (!this.contextualDrawer.isOpen('style') && this.$location.search()['drawer-style']){
      this.contextual.showDrawer('style');
    }
  }

  reload(){
    window.location.reload();
  }

  init(permalink, editorid) {
    const editor = editorid ? 'editor=' + editorid : 'editor=true';

    if (this.webordersUrl.indexOf('://localhost') !== -1) {

     this.webordersUrl += '?permalink=' + permalink;
     this.webordersEditUrl += '?permalink=' + permalink + '&' + editor;
    } else {
      this.webordersUrl += permalink;
      this.webordersEditUrl += permalink + '?' + editor;
    }

    if (!this.$window.hasListener){
      this.$window.addEventListener("message", this.receiveMessage.bind(this), false);
      this.$window.hasListener = true;

      this.$rootScope.$on('$locationChangeSuccess', this.toggleDrawer.bind(this))
    }

    this.Spinner.show('iframe');
  //  this.Spinner = Spinner;
    this.zoomLevel = 1;
    this.zoomInterval = 0.05;
    this.toggleDrawer();
    this.iframeError = this.$timeout(()=>{
      this.iframeFailed = true;
      this.Spinner.hide('iframe');
    },60000);
  }

  constructor($scope, $stateParams, Spinner, contextual, $location, contextualDrawer, $rootScope, $window, $timeout, StateService, DialogService, ErrorService, entities) {
    "ngInject";
    this.$timeout = $timeout;
    this.$window=$window;

    this.webordersUrl = $window._PREO_DATA._WEBORDERS;
    this.webordersEditUrl = $window._PREO_DATA._WEBORDERS_EDIT
    var permalink = '';
    var editorId = null;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.Spinner = Spinner;
    this.$location = $location;
    this.contextual = contextual;
    this.contextualDrawer = contextualDrawer;

    if(StateService.channel) {
      this.isChannel = StateService.isChannel;
      this.entities = entities;
      this.entities.channel = StateService.channel;

      StateService.channel.findWebSettingAndVenuePermalink()
      .then((data) => {
        permalink = data.permalink;

        if(data.webSettings) {
          editorId = data.webSettings.id;
        }

        this.init(permalink, editorId);
      }, () => {
        DialogService.show(ErrorService.errorTitle, ErrorService.FAILED_LOADING_STYLING.message, [{
          name: gettextCatalog.getString('OK')
        }]);
      });
    } else {
      permalink = StateService.venue.permalink;
      this.init(permalink);
    }
  }
}
