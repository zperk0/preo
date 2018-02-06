
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

  onPublish(entities) {

    const { Spinner, StyleService, StateService, Snack, DialogService, ErrorService, gettextCatalog, LabelService} = this;

    const fragmentId = StyleService.modelIds && StyleService.modelIds.templateFragment;
    const imageId = StyleService.modelIds && StyleService.modelIds.image;

    if (!fragmentId && !imageId) {
     return DialogService.show(ErrorService.errorTitle, ErrorService.STYLE_REQUIRED_ID_PUBLISH.message, [{
        name: gettextCatalog.getString('OK')
      }]);
    }

    const LOADER_KEY = 'publishing-venues-style-email';

    Spinner.show(LOADER_KEY);
    StateService.channel.publishTemplateFragments(fragmentId, entities)
    .then(StateService.channel.publishImages.bind(this, imageId, entities))
    .then(() => {
      Snack.show(LabelService.SNACK_STYLE_PUBLISHED);
      Spinner.hide(LOADER_KEY);
    }, (err) => {
      console.log('Error publishing email-style to venues:', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(ErrorService.DEFAULT);
    })
    .catch((err) => {
      console.log('Catch - Error publishing email-style to venues:', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(ErrorService.DEFAULT);
    });
  }

  constructor($scope, Snack, Spinner, contextual, $location, contextualDrawer, DialogService, LabelService, $rootScope, $window, $timeout, StyleService, StateService, ErrorService, gettextCatalog, entities) {
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
    this.StateService = StateService;
    this.DialogService = DialogService;
    this.gettextCatalog = gettextCatalog;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.Snack = Snack;
    this.toggleDrawer();

    if(StateService.channel) {
      this.isChannel = StateService.isChannel;
      this.entities = entities;
      this.entities.channel = StateService.channel;
    }
  }

}
