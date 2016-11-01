export default function mdMap(UtilsService, $timeout, $q){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      venue:"=?",
      centerPos:"=?",
      markerPos:"=?",
      onMarkerDrop:"&?",
      onLoad: '&?'
    },
    template: require("./mdMap.tpl.html"),
    replace:true,
    link: (scope, el, attr) => {
      console.log("loading mdmap", scope);

      if(scope.venue){
        if (!scope.venue.latitude && !scope.venue.longitude){
          getGeoLocationByAddress(scope.venue)
            .then((location)=>{
              scope.venue.latitude = location.lat();
              scope.venue.longitude = location.lng();
              placeCenterAndPin();
            })
        } else {
          placeCenterAndPin();
        }
      }

      function handleDrop(event){
        var latLng = {lat:event.latLng.lat(), lng:event.latLng.lng()};
        console.log("Marker drop", latLng);
        if (scope.onMarkerDrop){
          scope.onMarkerDrop(latLng);
        }
      }

      function addMarker (pos) {
         var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
         var marker = new google.maps.Marker({
              position: myLatlng,
              map: scope.map,
              draggable:true,
              icon: '/images/map-pin.png'
          });
         marker.addListener('dragend', handleDrop);
      } //end addMarker

      function initMap(){
        const myOptions = {
            zoom: 13,
            center: new google.maps.LatLng(scope.centerPos.lat, scope.centerPos.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        scope.map = new google.maps.Map(document.getElementById(attr.id), myOptions);
        if (scope.markerPos){
          addMarker(scope.markerPos)
        }
        google.maps.event.addListenerOnce(scope.map, 'idle', function(){
          $timeout(function () {
            scope.onLoad && scope.onLoad();
          });
        });
      }

      function placeCenterAndPin(){
        if (scope.venue){
          scope.centerPos = {
              lat:scope.venue.latitude,
              lng:scope.venue.longitude
            }
           scope.markerPos = scope.centerPos;
        }
        if (!scope.centerPos){
          scope.centerPos = {
            lat:51.5285582,
            lng:-0.2416802
          }
        }
        initMap();
      }

      function getGeoLocationByAddress(venue){
        let address = [venue.address1];
        if (venue.address2) {
            address.push(venue.address2);
        }
        address.push(venue.postcode);
        address.push(venue.city);
        let deferred = $q.defer();
        let geocoder = new google.maps.Geocoder();
        let geocoderRequest = { address: address.join(', ') };
        geocoder.geocode(geocoderRequest, (results, status)=>{
          if (results && results instanceof Object && results.length) {
            deferred.resolve(results['0'].geometry.location);
          } else {
            deferred.reject();
          }
        });

        return deferred.promise;
      };

    }
  }
}
