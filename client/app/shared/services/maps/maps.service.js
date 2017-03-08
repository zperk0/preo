
export default class MapsService {

  static get UID(){
    return "MapsService";
  }

  load(){
    var deferred = this.$q.defer();

    $script('https://open.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=7uAxmlh9EbgY5HC1mmJyMMMLB8pkF8Ap', () => {
   // $script('https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=7uAxmlh9EbgY5HC1mmJyMMMLB8pkF8Ap', ()=>{      
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