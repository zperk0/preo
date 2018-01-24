
export default class taxGroupDetailsController {

  static get UID(){
    return 'taxGroupDetailsController';
  }

  setEntities() {
    const {StateService, taxGroup, params} = this;
    if (StateService.isChannel && angular.isObject(params)) {
      // Set entities to replicate it for venues
      angular.extend(taxGroup, {entities: params.selected});
    }
  }

  validateEntities() {
    // Retrieve selected entities on drawer
    const entity = this.params.selected;
    // Validate if has at least one channel, venue group or venue
    return entity.venueIds.length
      || entity.groupIds.length
      || entity.channelId;
  }

  createOrUpdate() {
    const {taxGroup} = this;
    if (taxGroup.id) {
      return taxGroup.update();
    }
    return Preoday.TaxGroup.create(taxGroup);
  }

  onSave(entity) {
    const {taxGroup, StateService, Spinner, Snack, $timeout, $state, gettextCatalog} = this;
    const LOADER_KEY = 'tax-group-save';

    if (!angular.isObject(taxGroup)
     || !angular.isObject(entity)
     || !entity.name) {
       return;
    }

    if (StateService.isChannel && !this.validateEntities()) {
      // Extra validation for channels to check any selected entity before save
      return;
    }

    // Set `entities` for channel
    this.setEntities();

    Spinner.show(LOADER_KEY);
    this.createOrUpdate()
      .then((data) => {
        // Set $saved to property
        this.$saved = true;

        taxGroup.$deleted = false;
        taxGroup.$selected = false;

        $timeout(() => {
          angular.extend(taxGroup, data);
          this.setEntities();
          Snack.show(gettextCatalog.getString('Tax group saved'));
          $state.go('main.dashboard.taxes.taxGroups');
        });
      }).catch((err) => {
        Snack.showError(gettextCatalog.getString('Error saving tax group'));
      }).finally(() => {
        Spinner.hide(LOADER_KEY);
      });
  }

  onCancel() {
    this.$state.go('main.dashboard.taxes.taxGroups');
  }

  constructor($scope, $state, $timeout, StateService, BroadcastEvents, Spinner, Snack, gettextCatalog, taxGroups, taxGroup, entities) {
    'ngInject';
    // Dependencies
    this.$state = $state;
    this.$timeout = $timeout;
    this.StateService = StateService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    // Resolves and defaults
    this.taxGroups = taxGroups;
    this.taxGroup = taxGroup;

    // Set default `$saved` property
    this.$saved = false;

    // Create a copy of the original data
    this.originalTaxGroup = angular.copy(taxGroup);

    if (StateService.isChannel) {
      // Set channel into `entities`
      entities.channel = StateService.channel;
      // Set template
      this.template = 'taxGroup.channel';
      // Set params
      this.params = {
        entities: entities,
        selected: taxGroup.entities
      };

      if (angular.isUndefined(taxGroup.id)) {
        this.params.onBeforeSubmit = function() {
          if (this.contextualForm.$invalid) {
            this.contextualForm.submitted = true;
            return $scope.$broadcast(BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED);
          }

          if (this.contextualForm.selectedTabIndex === 1) {
            return this.onSubmit();
          }

          this.contextualForm.selectedTabIndex = 1;
        };

        this.params.doneButtonText = function() {
          if (this.contextualForm && this.contextualForm.selectedTabIndex === 1) {
            return gettextCatalog.getString('Done');
          }
          return gettextCatalog.getString('Choose Venues');
        };
      }
    } else {
      this.template = 'taxGroup';
    }

    $scope.$on('$destroy', () => {
      if (angular.isObject(this.taxGroup)) {
        // Reset editable `taxGroup` to original value
        if (this.taxGroup.id && !this.$saved) {
          angular.extend(this.taxGroup, this.originalTaxGroup);
          this.taxGroup.$selected = false;
        } else if (!this.taxGroup.id) {
          // Remove `new taxGroup` object
          const indexTaxGroup = this.taxGroups.indexOf(taxGroup);
          if (indexTaxGroup > -1) {
            this.taxGroups.splice(indexTaxGroup, 1);
          }
        }
      }
    });
  }
}
