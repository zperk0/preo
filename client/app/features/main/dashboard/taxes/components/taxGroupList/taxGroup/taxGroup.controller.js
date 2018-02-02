export default class taxGroupController {
  static get UID(){
    return 'taxGroupController';
  }

  isBlockedForVenue() {
    const {StateService, taxGroup} = this;
    return taxGroup.sourceId && taxGroup.venueId
      && angular.isObject(StateService.venue) && StateService.venue.id;
  }

  onConfirmDelete() {
    const {DialogService, LabelService} = this;

    DialogService.delete(LabelService.CONFIRMATION_TITLE, LabelService.CONTENT_TAX_GROUP_ASSIGNED_TO_ITEM)
      .then(() => {
        this.onDelete();
      });
  }

  onBeforeDelete() {
    const {DialogService, LabelService} = this;

    DialogService.delete(LabelService.TITLE_DELETE_TAX_GROUP, LabelService.CONTENT_DELETE_TAX_GROUP)
      .then(this.canDelete.bind(this));
  }

  canDelete() {
    const {Spinner, Snack, gettextCatalog, taxGroup} = this;
    const LOADER_KEY = 'tax-group-can-delete';

    Spinner.show(LOADER_KEY);

    taxGroup.canRemove()
      .then(this.onDelete.bind(this))
      .catch((err) => {
        // If there are menu items using this tax group, confirm first
        if (err.status && err.status == 409) {
          return this.onConfirmDelete();
        }
        Snack.showError(gettextCatalog.getString('Tax group not deleted'));
      }).finally(() => {
        // Hide spinner loader
        Spinner.hide(LOADER_KEY);
      });
  }

  onDelete() {
    const {Spinner, Snack, gettextCatalog, taxGroup} = this;
    const LOADER_KEY = 'tax-group-delete';

    Spinner.show(LOADER_KEY);

    taxGroup.remove()
      .then(() => {
        if (angular.isFunction(this.onAfterDelete)) {
          this.onAfterDelete({taxGroup: taxGroup});
        }
        Snack.show(gettextCatalog.getString('Tax group deleted'));
      }).catch((err) => {
        // Display error message
        Snack.showError(gettextCatalog.getString('Tax group not deleted'));
      }).finally(() => {
        // Hide spinner loader
        Spinner.hide(LOADER_KEY);
      });
  }

  /* @ngInject */
  constructor(StateService, DialogService, LabelService, Spinner, Snack, gettextCatalog) {
    'ngInject';
    this.StateService = StateService;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
  }
}
