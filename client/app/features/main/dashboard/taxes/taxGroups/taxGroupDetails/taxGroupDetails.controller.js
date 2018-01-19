
export default class taxGroupDetailsController {

  static get UID(){
    return 'taxGroupDetailsController';
  }

  createOrUpdate() {
    const {taxGroup} = this;
    if (taxGroup.id) {
      return taxGroup.update();
    }
    return Preoday.TaxGroup.create(taxGroup);
  }

  onSaveVenue(entity) {
    const {taxGroup, Spinner, Snack, $timeout, $state, gettextCatalog} = this;
    const LOADER_KEY = 'tax-group-save';

    if (!angular.isObject(taxGroup) || !angular.isObject(entity) || !entity.name) {
      return;
    }

    Spinner.show(LOADER_KEY);
    this.createOrUpdate()
      .then((data) => {
        // Set $saved to property
        this.$saved = true;

        taxGroup.$deleted = false;
        taxGroup.$selected = false;

        $timeout(() => {
          angular.extend(taxGroup, data);
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

  constructor($scope, $state, $timeout, Spinner, Snack, gettextCatalog, taxGroups, taxGroup) {
    'ngInject';
    // Dependencies
    this.$state = $state;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    // Resolves and defaults
    this.taxGroups = taxGroups;
    this.taxGroup = taxGroup;
    this.template = 'taxGroup';

    // Set default `$saved` property
    this.$saved = false;

    // Create a copy of the original data
    this.originalTaxGroup = angular.copy(taxGroup);

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
