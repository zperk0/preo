
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

  /* @ngInject */
  constructor($scope, $state, entities) {
    'ngInject';
    // Dependencies
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
