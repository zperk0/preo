
export default class MapsService {

  static get UID(){
    return "MapsService";
  }

  load(){
    if (window.google && window.google.maps){
      return this.$q.resolve();
    }
    var deferred = this.$q.defer();
    $script("https://maps.googleapis.com/maps/api/js?libraries=drawing", ()=>{
      console.log("loaded map, reoslving");
      deferred.resolve();
    });
    return deferred.promise;
  }

  getGeoLocationByAddress(venue){
        let address = [venue.address1];
        if (venue.address2) {
            address.push(venue.address2);
        }
        address.push(venue.postcode);
        address.push(venue.city);
        let deferred = this.$q.defer();
        let geocoder = new google.maps.Geocoder();
        let geocoderRequest = { address: address.join(', ') };
        geocoder.geocode(geocoderRequest, (results, status)=>{
          if (results && results instanceof Object && results.length) {
            deferred.resolve(results['0'].geometry.location);
          } else {
              geocoderRequest.address = venue.city + ", "  + venue.country;
              geocoder.geocode(geocoderRequest, (results, status)=>{
                if (results && results instanceof Object && results.length) {
                  deferred.resolve(results['0'].geometry.location);
                } else{
                  deferred.reject();
                }
              });
            }
          });
        return deferred.promise;
      };

  constructor($q){
    "ngInject";
    this.$q = $q;
  }
}