
export default class MapsService {

  geoKey(){
    return '7uAxmlh9EbgY5HC1mmJyMMMLB8pkF8Ap';
  } 

  static get UID(){
    return "MapsService";
  }

  load(){
    var deferred = this.$q.defer();
   
    $script('https://open.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key='+ this.geoKey(), () => {
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
        if(venue.address3){
          address.push(venue.address3);
        }

        //address.push(venue.postcode);
        //address.push(venue.city);
        let deferred = this.$q.defer();
        
       // let UrlGeo = 'https://open.mapquestapi.com/geocoding/v1/address?key='+this.geoKey()+'&location=';
       // let UrlGeo = 'https://open.mapquestapi.com/geocoding/v1/address?key='+this.geoKey();
        let UrlGeo = 'https://www.mapquestapi.com/geocoding/v1/address?key='+this.geoKey();        
        let geocoder = new XMLHttpRequest();

        let geoParams = '&street=' + address.join(', ')
                      + '&city='   + venue.city
                     // + '&postalCode=' + venue.postcode
                      + '&country='+ venue.country;
        
        geocoder.open('GET', UrlGeo + geoParams , true);       

        geocoder.onreadystatechange = function() {
         
          if(geocoder.readyState == 4 && geocoder.status == 200){
            
            var results = JSON.parse(geocoder.responseText);
            if(results && results instanceof Object){           
              deferred.resolve(results.results[0].locations[0].latLng);
             
             } else {
              geoParams = '&city='  + venue.city 
                        + '&country='+ venue.country; 

              geocoder.open('GET', UrlGeo + geoParams, true);
              geocoder.send(null);

            }
          }        
        }

        geocoder.send(null);
 
        return deferred.promise;
      };

  constructor($q){
    "ngInject";
    this.$q = $q;
  }
}