
export default class taxGroupsController {
  static get UID(){
    return 'taxGroupsController';
  }

  onCreate() {
    this.$state.go('main.dashboard.taxes.taxGroups.create');
  }

  onEdit(taxGroup) {
    this.$state.go('main.dashboard.taxes.taxGroups.edit', {
      taxId: taxGroup.id
    });
  }

  onAfterDelete(taxGroup) {
    const indexTaxGroup = this.taxGroups.indexOf(taxGroup);
    if (indexTaxGroup > -1) {
      this.taxGroups.splice(indexTaxGroup, 1);
    }
  }

  /* @ngInject */
  constructor($scope, $state, taxGroups) {
    'ngInject';
    // Dependencies
    this.$scope = $scope;
    this.$state = $state;
    // Resolves and Defaults
    this.taxGroups = taxGroups;
    this.disabledSticky = true;

    const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
      if (viewName.indexOf('taxDetailsView') === 0) {
        this.disabledSticky = false;
      }
    });

    $scope.$on('$destroy', () => {
      onViewContentLoaded && onViewContentLoaded();
    });
  }
}
