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

  hasVoucherFeature () {

    return this.getLocalFeature(Preoday.constants.Feature.VOUCHER);
  }

  hasBookingFeature () {

    return this.getLocalFeature(Preoday.constants.Feature.BOOKING);
  }

  hasExternalVoucherCodesFeature () {
    return this.getLocalFeature(Preoday.constants.Feature.EXTERNAL_VOUCHER_CODES);
  }

  hasTicketMasterEventFeature(){
   // return true;
    return this.getLocalFeature(Preoday.constants.Feature.EXTERNAL_EVENT_MAPPING);
  }

  hasCustomOutletLocationFieldsFeature () {
    return this.getLocalFeature(Preoday.constants.Feature.CUSTOM_OUTLET_LOCATION_FIELDS);

  }

  hasKnowYourCustomersFeature () {
    return this.getLocalFeature(Preoday.constants.Feature.KNOW_YOUR_CUSTOMERS);
  }

  hasExternalMenusFeature () {
    return this.getLocalFeature(Preoday.constants.Feature.UPDATE_EXTERNAL_MENU);
  }

  hasItemTagsFeature () {
    return this.getLocalFeature(Preoday.constants.Feature.ITEM_TAGS);
  }

  hasDateOfBirthFeature() {
    return this.getLocalFeature(Preoday.constants.Feature.DATE_OF_BIRTH);
  }

  hasMenuItemExternalIdFeature() {
    return this.getLocalFeature(Preoday.constants.Feature.MENU_ITEM_EXTERNAL_ID);
  }

  getLocalFeature (featureId) {
    let index = this.localFeatures.map(function(item){
        return +item.id;
    }).indexOf(+featureId);

    return index === -1 ? false : this.localFeatures[index];
  }

  hasFeature (featureId) {

    return this.$q((resolve,reject)=> {

        if (!this.StateService.venue) {
            console.log('venue not set');
            return reject();
        }

        let localFeature = this.getLocalFeature(featureId);

        if (localFeature) {
            return resolve(localFeature);
        }

        this.StateService
            .venue
            .hasFeature(featureId)
            .then((feature) => {

                this.localFeatures.push(feature);
                resolve(feature);
            }, reject);
    });
  }

  setLocalFeatures () {

    this.localFeatures = this.StateService.venue && this.StateService.venue.features || [];
  }

  constructor($q, $injector, $rootScope, UserService, StateService, BroadcastEvents) {
    "ngInject";

    this.$q = $q;
    this.$injector = $injector;
    this.UserService = UserService;
    this.StateService = StateService;

    this.setLocalFeatures();

    $rootScope.$on(BroadcastEvents._ON_FETCH_VENUES,(event,venues)=>{

      this.setLocalFeatures();
    });
  }
}
