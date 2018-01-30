
export default class sellerDetailsController {
  static get UID(){
    return 'sellerDetailsController';
  }

  onCreate() {
    // Pre populate taxName with default value
    this.taxSettings.taxName = this.gettextCatalog.getString('VAT Number');
    return Preoday.TaxSettings.save(this.taxSettings);
  }

  onUpdate() {
    return this.taxSettings.update();
  }

  onSave() {
    return this.taxSettings.$editing
      ? this.onUpdate.bind(this)
      : this.onCreate.bind(this);
  }

  onPublish(entities) {
    const {taxSettings, DialogService, ErrorService, LabelService, Spinner, Snack, gettextCatalog, contextual} = this;

    if (angular.isUndefined(taxSettings.id)) {
      // Hide drawer
      contextual.hide();
      // Display error message
      return DialogService.show(ErrorService.TAX_SETTINGS_REQUIRED_ID_TO_PUBLISH.title, ErrorService.TAX_SETTINGS_REQUIRED_ID_TO_PUBLISH.message, [{
        name: LabelService.CONFIRMATION
      }]);
    }

    const LOADER_KEY = 'tax-settings-publish';

    Spinner.show(LOADER_KEY);
    taxSettings.publish(entities)
      .then((res) => {
        // Published success
        Snack.show(gettextCatalog.getString('Seller details published'));
        contextual.hide();
      })
      .catch((err) => {
        // Failed to publish
        Snack.showError(gettextCatalog.getString('Error publishing to venues'));
      })
      .finally(() => {
        Spinner.hide(LOADER_KEY);
      });
  }

  debounce(func, wait, immediate) {
    console.log('debouncing');
    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.debounceTimeout = null;
        console.log('in later', immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.debounceTimeout;
      clearTimeout(context.debounceTimeout);
      context.debounceTimeout = setTimeout(later, wait);
      console.log('if call now', callNow);
      if (callNow) func.apply(context, args);
    };
  }

  debounceUpdate() {
    this.sellerForm.$setSubmitted();
    this.isSaving = true;
    if (this.sellerForm.$valid) {
      this.debounce(this.doUpdate.bind(this), 1000)();
    } else {
      // prevent super fast results
      this.$timeout(() => {
        this.isSaving = false;
        this.isError = true;
      }, 500);
    }
  }

  doUpdate() {
    const onSave = this.onSave();
    onSave()
      .then((taxSettings) => {
        angular.extend(this.taxSettings, taxSettings);
        this.taxSettings.$editing = true;

        this.$timeout(() => {
          this.isSaving = false;
          this.isError = false;
        });
      }).catch((err) => {
        console.error(err);
        this.$timeout(() => {
          this.isSaving = false;
          this.isError = true;
        });
      });
    return onSave;
  }

  /* @ngInject */
  constructor(StateService, DialogService, ErrorService, LabelService, Spinner, Snack, $timeout, gettextCatalog, contextual, entities, taxSettings) {
    'ngInject';
    this.StateService = StateService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
    this.contextual = contextual;

    // Defaults
    this.isError = false;
    this.isSaving = false;
    this.isChannel = StateService.isChannel;
    this.debounceTimeout = null;

    // Tax Settings
    this.taxSettings = taxSettings;

    // Entities
    this.entities = entities;
    this.entities.channel = StateService.channel;
  }
}
