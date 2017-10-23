export default class menuItemMoreController {
  static get UID(){
    return "menuItemMoreController"
  }

  /* @ngInject */
  constructor(VenueService,FeatureService) {
    'ngInject';

    this.hasExternalMenusFeature = FeatureService.hasExternalMenusFeature();
    this.hasMenuItemExternalIdFeature = FeatureService.hasMenuItemExternalIdFeature();
    this.isEvent = VenueService.currentVenue.isEvent();
  }
}
