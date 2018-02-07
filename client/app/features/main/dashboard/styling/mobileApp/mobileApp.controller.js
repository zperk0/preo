
export default class mobileAppController {
  static get UID(){
    return "mobileAppController";
  }

  toggleDrawer(){
    if (!this.contextualDrawer.isOpen('style') && this.$location.search()['drawer-mobile-style']){
      this.contextual.showDrawer('style-mobile');
    }
  }

  onPublish(entities) {

    const { Spinner, StyleService, StateService, Snack, DialogService, ErrorService, gettextCatalog, LabelService} = this;

    const mobileSettingsId = StyleService.modelIds && StyleService.modelIds.mobile;

    if (!mobileSettingsId) {
     return DialogService.show(ErrorService.errorTitle, ErrorService.STYLE_REQUIRED_ID_PUBLISH.message, [{
        name: gettextCatalog.getString('OK')
      }]);
    }

    const LOADER_KEY = 'publishing-venues-style-mobile';

    Spinner.show(LOADER_KEY);
    StateService.channel.publishMobileSettings(mobileSettingsId, entities)
    .then(() => {
      Snack.show(LabelService.SNACK_STYLE_PUBLISHED);
      Spinner.hide(LOADER_KEY);
    }, (err) => {
      console.log('Error publishing mobile-style to venues:', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(ErrorService.DEFAULT.message);
    })
    .catch((err) => {
      console.log('Catch - Error publishing mobile-style to venues:', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(ErrorService.DEFAULT.message);
    });
  }

  constructor($scope, Snack, Spinner, contextual, $location, contextualDrawer, StyleService, LabelService, ErrorService, DialogService, $rootScope, $window, $timeout, StateService, gettextCatalog, entities) {
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
