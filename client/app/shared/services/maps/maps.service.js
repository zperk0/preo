
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
      deferred.resolve();
    });
    return deferred.promise;
  }

  constructor($q){
    "ngInject";
    this.$q = $q;
  }
}