export default class FeatureService {

  static get UID(){
    return "FeatureService";
  }

  hasOutletFeature () {

    if (this.UserService.isAdmin()) {
      return true;
    }

    return this.getLocalFeature(Preoday.constants.Feature.OUTLET);
  }

  hasCustomPickupSlotsFeature () {

    return this.getLocalFeature(Preoday.constants.Feature.CUSTOM_PICKUP_SLOTS);
  }

  hasNestedModifierFeature () {

    return this.getLocalFeature(Preoday.constants.Feature.NESTED_MODIFIER);
  }

  hasDeliveryZoneFeature () {

    return this.getLocalFeature(Preoday.constants.Feature.DELIVERY_ZONES);
  }


  getLocalFeature (featureId) {
    let index = this.localFeatures.map(function(item){
        return +item.id;
    }).indexOf(+featureId);

    return index === -1 ? false : this.localFeatures[index];
  }

  hasFeature (featureId) {

    return this.$q((resolve,reject)=> {

        if (!this.VenueService.hasVenueSet()) {
            console.log('venue not set');
            return reject();
        }

        let localFeature = this.getLocalFeature(featureId);

        if (localFeature) {
            return resolve(localFeature);
        }

        this.VenueService
            .currentVenue
            .hasFeature(featureId)
            .then((feature) => {

                this.localFeatures.push(feature);
                resolve(feature);
            }, reject);
    });
  }

  constructor($q, $injector, UserService, VenueService) {
    "ngInject";

    this.$q = $q;
    this.$injector = $injector;
    this.UserService = UserService;
    this.VenueService = VenueService;
    this.localFeatures = VenueService.currentVenue.features;
  }
}