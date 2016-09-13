export default class FeatureService {

  static get UID(){
    return "FeatureService";
  }

  hasOutletFeature () {

    return this.getLocalFeature(Preoday.constants.Feature.OUTLET);
  }

  getLocalFeature (featureId) {

    if (this.UserService.isAdmin()) {
        return true;
    }

    let index = this.localFeatures.map(function(item){
        return +item.featureId;
    }).indexOf(+featureId);

    return index === -1 ? false : this.localFeatures[index];
  }

  hasFeatureForInit (featureId) {

    return this.$q((resolve,reject)=> {

        return this.hasFeature(featureId)
            .then(resolve, resolve);
    });
  }

  hasFeature (featureId) {

    let VenueService = this.$injector.get('VenueService');

    return this.$q((resolve,reject)=> {

        if (!VenueService.hasVenueSet()) {
            console.log('venue not set');
            return reject();
        }

        let localFeature = this.getLocalFeature(featureId);

        if (localFeature) {
            return resolve(localFeature);
        }

        VenueService
            .currentVenue
            .hasFeature(featureId)
            .then((feature) => {
                
                this.localFeatures.push(feature);
                resolve(feature);
            }, reject);
    });
  }

  clearLocalFeatures () {

    this.localFeatures = [];
    this.tryedToLoad = [];
  }

  constructor($q, $injector, UserService) {
    "ngInject";

    this.$q = $q;
    this.$injector = $injector;
    this.UserService = UserService;

    this.localFeatures = [];
    this.tryedToLoad = [];
  }  
}