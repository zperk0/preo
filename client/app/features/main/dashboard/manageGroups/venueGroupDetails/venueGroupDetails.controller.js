
export default class venueGroupDetailsController {

  static get UID(){
    return 'venueGroupDetailsController';
  }

  validateEntities() {
    // Retrieve selected entities on drawer
    const entity = this.params.selected;
    // Validate if has at least two venues
    return angular.isArray(entity.venueIds)
      && entity.venueIds.length > 1;
  }

  createOrUpdate() {
    const {venueGroup} = this;
    if (venueGroup.id) {
      return venueGroup.update();
    }
    return Preoday.VenueGroup.create(venueGroup);
  }

  onSave(entity) {
    const {venueGroup, StateService, DialogService, ErrorService, LabelService, Spinner, Snack, $timeout, $state, gettextCatalog} = this;
    const LOADER_KEY = 'venue-group-save';

    if (!angular.isObject(venueGroup)
     || !angular.isObject(entity)
     || !entity.name) {
       return;
    }

    if (!this.validateEntities()) {
      // Extra validation for channels to check any selected entity before save
      return DialogService.show(ErrorService.CHANNEL_ENTITIES_REQUIRED.title, ErrorService.CHANNEL_ENTITIES_REQUIRED.message, [{
        name: LabelService.CONFIRMATION
      }]);
    }

    Spinner.show(LOADER_KEY);
    this.createOrUpdate()
      .then((data) => {
        // Set $saved to property
        this.$saved = true;

        $timeout(() => {
          angular.extend(venueGroup, data);
          Snack.show(gettextCatalog.getString('Venue group saved'));
          $state.go('main.dashboard.manageGroups');
        });
      }).catch((err) => {
        Snack.showError(gettextCatalog.getString('Error saving venue group'));
      }).finally(() => {
        Spinner.hide(LOADER_KEY);
      });
  }

  onCancel() {
    this.$state.go('main.dashboard.manageGroups');
  }

  constructor($scope, $state, $timeout, StateService, DialogService, ErrorService, LabelService, BroadcastEvents, Spinner, Snack, gettextCatalog, entities, venueGroup) {
    'ngInject';
    // Dependencies
    this.$state = $state;
    this.$timeout = $timeout;
    this.StateService = StateService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    // Resolves and defaults
    this.entities = entities;
    this.venueGroup = venueGroup;
    this.template = 'venueGroup';
    // Set default `$saved` property
    this.$saved = false;

    // Set params
    this.params = {
      entities: {venueGroups: [], venues: entities.venues},
      selected: {groupIds: [], venueIds: venueGroup.venueIds}
    };

    // Create a copy of the original data
    this.originalVenueGroup = angular.copy(venueGroup);

    $scope.$on('$destroy', () => {
      if (angular.isObject(this.venueGroup)) {
        // Reset editable `venueGroup` to original value
        if (this.venueGroup.id && !this.$saved) {
          angular.extend(this.venueGroup, this.originalVenueGroup);
        } else if (!this.venueGroup.id) {
          // Remove `new venueGroup` object
          const indexVenueGroup = this.entities.venueGroups.indexOf(venueGroup);
          if (indexVenueGroup > -1) {
            this.entities.venueGroups.splice(indexVenueGroup, 1);
          }
        }
      }
    });
  }
}
