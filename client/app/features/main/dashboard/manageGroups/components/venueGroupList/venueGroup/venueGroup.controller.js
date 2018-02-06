export default class venueGroupController {
  static get UID(){
    return 'venueGroupController';
  }

  isSelected() {
    const {$stateParams, venueGroup} = this;
    return angular.isObject(venueGroup)
      && (venueGroup.id == $stateParams.venueGroupId)
      || (!venueGroup.id && !$stateParams.venueGroupId);
  }

  onBeforeDelete() {
    const {DialogService, LabelService} = this;

    DialogService.delete(LabelService.TITLE_DELETE_VENUE_GROUP, LabelService.CONTENT_DELETE_VENUE_GROUP)
      .then(this.onDelete.bind(this));
  }

  onDelete() {
    const {Spinner, Snack, gettextCatalog, venueGroup} = this;
    const LOADER_KEY = 'venue-group-delete';

    Spinner.show(LOADER_KEY);

    venueGroup.remove()
      .then(() => {
        if (angular.isFunction(this.onAfterDelete)) {
          this.onAfterDelete({venueGroup: venueGroup});
        }
        Snack.show(gettextCatalog.getString('Venue group deleted'));
      }).catch((err) => {
        // Display error message
        Snack.showError(gettextCatalog.getString('Venue group not deleted'));
      }).finally(() => {
        // Hide spinner loader
        Spinner.hide(LOADER_KEY);
      });
  }

  /* @ngInject */
  constructor(DialogService, LabelService, Spinner, Snack, gettextCatalog, $stateParams) {
    'ngInject';
    // Dependencies
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    this.$stateParams = $stateParams;
  }
}
