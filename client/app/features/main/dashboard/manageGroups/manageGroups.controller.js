
export default class manageGroupsController {
  static get UID() {
    return 'manageGroupsController';
  }

  onCreate() {
    this.$state.go('main.dashboard.manageGroups.create');
  }

  onEdit(venueGroup) {
    this.$state.go('main.dashboard.manageGroups.edit', {
      venueGroupId: venueGroup.id
    });
  }

  onAfterDelete(venueGroup) {
    const indexVenueGroup = this.entities.venueGroups.indexOf(venueGroup);
    if (indexVenueGroup > -1) {
      this.entities.venueGroups.splice(indexVenueGroup, 1);
    }
  }

  /* @ngInject */
  constructor($scope, $state, entities) {
    'ngInject';
    // Dependencies
    this.$scope = $scope;
    this.$state = $state;
    // Resolve and Defaults
    this.entities = entities;
    this.disabledSticky = true;

    const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
      if (viewName.indexOf('venueGroupDetailsView') === 0) {
        this.disabledSticky = false;
      }
    });

    $scope.$on('$destroy', () => {
      onViewContentLoaded && onViewContentLoaded();
    });
  }
}
