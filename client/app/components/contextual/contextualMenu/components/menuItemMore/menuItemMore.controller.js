export default class menuItemMoreController {
  static get UID(){
    return "menuItemMoreController"
  }

  /* @ngInject */
  constructor(FeatureService) {
    'ngInject';

    this.hasExternalMenusFeature = FeatureService.hasExternalMenusFeature();
    this.hasMenuItemExternalIdFeature = FeatureService.hasMenuItemExternalIdFeature();
  }
}
