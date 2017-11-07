export default class menuItemMoreController {
  static get UID(){
    return "menuItemMoreController"
  }

  /* @ngInject */
  constructor(StateService, FeatureService) {
    'ngInject';

    this.hasExternalMenusFeature = FeatureService.hasExternalMenusFeature();
    this.hasMenuItemExternalIdFeature = FeatureService.hasMenuItemExternalIdFeature();
    this.isEvent = StateService.venue.isEvent();
  }
}
