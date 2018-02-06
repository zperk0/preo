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

  /* @ngInject */
  constructor($stateParams) {
    'ngInject';
    // Dependencies
    this.$stateParams = $stateParams;
  }
}
