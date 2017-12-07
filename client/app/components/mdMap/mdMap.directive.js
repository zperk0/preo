export default function mdMap(MapsService, UtilsService, VenueService, $timeout, $q, $rootScope, BroadcastEvents, $state, StateService){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      venue:"=?",
      deliveryZones:"=?",
      centerPos:"=?",
      markerPos:"=?",
      onMarkerDrop:"&?",
      onLoad: '&?'
    },
    template: require("./mdMap.tpl.html"),
    replace:true,
    link: (scope, el, attr) => {


      const kmOrMiles = VenueService.getKmOrMiles(StateService.venue);
      var distanceMultiplier =  kmOrMiles && kmOrMiles == "miles" ?  1.6 : 1;
      var deliveryZoneDrawingPolygon;
      var shapes = {};
      var polygonDrawer = {};
      var auxGeocoding = {}; // USed to Store lat/lng values coming from Geocode when venue has no lat/lng yet.
      var marker = null;
      var shouldCallClickEvent = true;
      var lastClick = {};
      var updateMap = false; //Used to know if map should be updated when a venue change address/city/country
      var lastActiveElement = null;

      // This is a hack to prevent LeafLet Polygon to add a new vertex when mouse drag event is fired
      function disableMouseTouch() {
        var originalOnTouch = L.Draw.Polyline.prototype._onTouch;
        L.Draw.Polyline.prototype._onTouch = e => {
          if( e.originalEvent.pointerType != 'mouse' ) {
            return originalOnTouch.call(this, e);
          }
        }
      }

      function init(){

        if(scope.venue){
          if (!scope.venue.latitude && !scope.venue.longitude){
            searchGeocode().then(()=>{
                placeCenterAndPin();
              },()=>{
                placeCenterAndPin();
              }).catch(()=>{
                placeCenterAndPin();
              })
          } else {
            placeCenterAndPin();
          }
        }

        disableMouseTouch();
      }

      function searchGeocode(){
        var deferred = $q.defer();
        if(scope.venue.address1 && scope.venue.address1.length > 0){
          MapsService.getGeoLocationByAddress(scope.venue)
              .then((location)=>{
                auxGeocoding.lat = location.lat;
                auxGeocoding.lng = location.lng;
                deferred.resolve(auxGeocoding);
              },()=>{
                deferred.reject();
              }).catch(()=>{

              })
        }
        else{
           deferred.resolve();
        }

        return deferred.promise;

      }

      function drawDeliveryZones(deliveryZonesToSkip){

        lastActiveElement = document.activeElement;
        console.log("drawing deliveryZones", deliveryZonesToSkip, scope.deliveryZones)

        if (scope.deliveryZones){
          for (let i=0;i<scope.deliveryZones.length;i++){
            let dz = scope.deliveryZones[i];
            if (deliveryZonesToSkip.indexOf(dz)===-1){
              console.log("drawing", dz);
              drawShape(dz);
            } else {
              console.log("skipping", dz);
            }
          }
        }
      }

      function getNewShape(deliveryZone){
        if(deliveryZone.type === 'DISTANCE'){
          return new L.circle(
            [scope.centerPos.lat, scope.centerPos.lng]
            , 1000, { });
        }
        else if(deliveryZone.type=== 'CUSTOM'){
          return new L.polygon({});
        }
      }

      function updateShape(deliveryZone, shape){
        if(deliveryZone.type === 'DISTANCE'){

          var radius =  deliveryZone.distance * 1000 * distanceMultiplier;
          shape.setRadius(radius);
        }else if(deliveryZone.type === 'CUSTOM') {

          shape.setStyle({editable: deliveryZone.$editable});

          if (deliveryZone.$editable) {
            deliveryZoneDrawingPolygon = deliveryZone;
          }

          if (!deliveryZone.polygon || !deliveryZone.polygon.length){
            scope.map.removeLayer(shape);
            angular.element(document.body).addClass("map-drawing-polygon");

            polygonDrawer = new L.Draw.Polygon(scope.map);
            polygonDrawer.setOptions({fillColor:deliveryZone.$color.border, editable:true, fillOpacity:1, stroke:true, color:deliveryZone.$color.border,zIndex:deliveryZone.id});

            return polygonDrawer.enable(); //new L.Draw.Polygon(scope.map).enable();
          }

          var coords = [];
          for (var i=0;i<deliveryZone.polygon.length;i+=2){
            var lat = Number(deliveryZone.polygon[i]);
            var lng = Number(deliveryZone.polygon[i+1]);
            coords.push({
              lat:lat,
              lng:lng
            })
          }

          shape.setLatLngs(coords);

          if (deliveryZone.$editable) {
              scope.map.on('editable:drawing:end', function (e) {
              handlePolygonComplete(shape);
            });
          }

        }

        shape.setStyle({fillColor:deliveryZone.$color.border, editable:true, fillOpacity:0.3, opacity: 0.5,stroke:true, color:deliveryZone.$color.border,zIndex:deliveryZone.id});

        if (deliveryZone.visible){
          shape.addTo(scope.map);
        } else {
          scope.map.removeLayer(shape);
        }

      }

       function drawShape(deliveryZone){
          var shape = shapes[deliveryZone.id];
          if (!shape){
            shape = getNewShape(deliveryZone);
            shapes[deliveryZone.id]  = shape;
          }

          updateShape(deliveryZone, shape)
        }

        function removeFromMap(deliveryZone){

          var shape = shapes[deliveryZone.id];

          if (shape) {
            scope.map.removeLayer(shape);
          }

          delete shapes[deliveryZone.id];
        }

        function preparePolygonArray(polygon){

          var coordinates = (polygon.getLatLngs());
          var arr = [];
          for (var i=0;i<coordinates[0].length;i++){
            var c = coordinates[0][i];
            var lat = c.lat.toFixed(5);
            var lng = c.lng.toFixed(5);
            arr.push(lat);
            arr.push(lng);
          }

          return arr;
        }

        function handlePolygonComplete(polygon){
          $timeout(()=>{
            shapes[deliveryZoneDrawingPolygon.id] = polygon;
            deliveryZoneDrawingPolygon.polygon = preparePolygonArray(polygon);
            polygon.setStyle({editable:false});
            //deliveryZoneDrawingPolygon = false;
          })
        }

        function handlePolygonCancelled(polygon){
          $timeout(()=>{

            removeFromMap(deliveryZoneDrawingPolygon);
            deliveryZoneDrawingPolygon.type = 'DISTANCE';
          })
        }

        // draggable marker
         function handleDrop(event){

          var latLng = {lat:event.target._latlng.lat , lng:event.target._latlng.lng};

          if (scope.onMarkerDrop){
            scope.onMarkerDrop(latLng);
          }
        }

        function addMarker (pos) {

          var myIcon = L.icon({
                iconUrl: '/images/map-pin.png',
                iconSize: [28, 40],
                iconAnchor: [15, 39]
          });

          marker = L.marker([pos.lat, pos.lng] , {draggable: !!(scope.onMarkerDrop), icon: myIcon}).addTo(scope.map);

          marker.addEventListener('dragend', handleDrop);
          scope.markerPos = {
              lat: pos.lat,
              lng: pos.lng
          };
        } //end addMarker


        //resize when size of things change to prevent map from becoming grayed out
        function handleResize(){
          $timeout(function(){
            var center = scope.map.getCenter();
            scope.map.invalidateSize();

            if(scope.markerPos)
              scope.map.panTo(scope.markerPos);
            else
              scope.map.panTo(scope.centerPos);
          })
        }

        //InitMap & set center & Pin
        function placeCenterAndPin(){
          setCenterAndMarker();
          initMap();
        }

        function setCenterAndMarker(){
          if (scope.venue){
            if(!updateMap && scope.venue.latitude && scope.venue.longitude){
              scope.centerPos = {
                  lat:scope.venue.latitude,
                  lng:scope.venue.longitude
              }
              scope.markerPos = scope.centerPos;
            }
            else if(updateMap && auxGeocoding.lat && auxGeocoding.lng){
              scope.centerPos = {
                  lat:auxGeocoding.lat,
                  lng:auxGeocoding.lng
              }
            }
          }

          if (!scope.centerPos){
            scope.centerPos = {
              lat:51.5285582,
              lng:-0.2416802
            }
          }
        }


        function initMap(){
          const myOptions = {
              zoom: 16
          };

          var myMap = L.map(attr.id);
          // MapqQuest Plugin
         /* var mapLayer = MQ.mapLayer(), myMap;

          myMap.addLayer(mapLayer);
          var tileLayer = L.control.layers({
            'Map': mapLayer,
            //'Hybrid': MQ.hybridLayer(),
            'Satellite': MQ.satelliteLayer()
            //'Dark': MQ.darkLayer(),
            //'Light': MQ.lightLayer()
          }).addTo(myMap);*/

          /*
           Leaflet has no idle event. The most cleanest way to achieve this is testing when map finishs load tiles (load)
          OR if necessary test when you finish interact over the map (moveend)
           */
          myMap.once('load' , loadDeliveryZones);

          myMap.setView([scope.centerPos.lat, scope.centerPos.lng], myOptions.zoom);

         /*
            User OpenStreeMaps its possible, but its necessary approval from adminsitrators
            https://operations.osmfoundation.org/policies/tiles/
          */
          L.tileLayer('https://tiles-dev.preoday.com/osm/{z}/{x}/{y}.png', {
                       maxZoom: 18,
                       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(myMap);

          scope.map = myMap;
          if (scope.markerPos){
            addMarker(scope.markerPos)
          }

          L.DomEvent.addListener(window, 'resize', handleResize);

          addMapEvents();
       }

      function addMapEvents(){
        var drawnItems = new L.FeatureGroup();

        scope.map.addLayer(drawnItems);

        scope.map.on('draw:created', function (e) {
              var type = e.layerType,
                  layer = e.layer;

              drawnItems.addLayer(layer);

            if(type == 'polygon'){

              angular.element(document.body).removeClass("map-drawing-polygon");

              handlePolygonComplete(layer);
            }
        });

        scope.map.on('draw:canceled', function (e) {
              var type = e.layerType,
                  layer = e.layer;

            if(type == 'polygon'){

              angular.element(document.body).removeClass("map-drawing-polygon");

              handlePolygonCancelled(layer);

              if (lastActiveElement) {
                lastActiveElement.focus()
              }

              lastActiveElement = null;
            }
        });

        if (!scope.deliveryZones){
          scope.map.on('click', function(e){

            var currentClick = {
                              lat: (e.latlng.lat).toFixed(5),
                              lng: (e.latlng.lng).toFixed(5)
            };

            setTimeout(function(){
              if(shouldCallClickEvent && currentClick !== scope.markerPos && lastClick !== currentClick){

                if(marker){
                  scope.map.removeLayer(marker);
                }

                scope.markerPos = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                };

                addMarker(scope.markerPos);
                marker.fireEvent('dragend');

                lastClick = { lat: (e.latlng.lat).toFixed(5),
                              lng: (e.latlng.lng).toFixed(5)
                };
              }
            }, 200);

            shouldCallClickEvent = true;

          });

          /*
            There is a problem with LEafLet that doesnt allow differ single click from double click. So everytime you double click, fires click event too.
            A way to fix it is controlling a local variable (shouldCallClickEvent) and setting a TimeOut to click event, so dblclick event can fire before
            click event get executed.
           */
          scope.map.on('dblclick', function(e){
            shouldCallClickEvent = false;
          });

          scope.$watch("venue", function(newValue, oldValue){
              // prevent to call searchGeocode service without need
              if(newValue.address1 !== oldValue.address1
                 || newValue.address2 !== oldValue.address2
                 || newValue.address3 !== oldValue.address3
                 || newValue.city !== oldValue.city
                 || newValue.country !== oldValue.country)
              {
                  updateMap = true;
                  scope.map.setZoom(18);
                  searchGeocode().then(function (){
                    setCenterAndMarker();

                    scope.map.setView([scope.centerPos.lat, scope.centerPos.lng], 18);

                  }, () => {

                  }).finally(function() {
                    updateMap = false;
                  });
              }
          },true);
        }
      }

      function loadDeliveryZones() {

          $timeout(function () {
            scope.onLoad && scope.onLoad();

            handleResize();

            var firstLoad = true;

             scope.$watch("deliveryZones", function (newDeliveryZones, oldDeliveryZones) {

              var deliveryZonesToSkip = [];
              var propsToCompare = ['polygon', 'distance', '$color', 'editable'];

              // console.log("comparing", newDeliveryZones, oldDeliveryZones)
              //Diff delivery zones, remove the shapes that are not in new array
              if (!firstLoad){
                for (let i=0;i<oldDeliveryZones.length;i++){
                  let oldDeliveryZone = oldDeliveryZones[i];
                  if (!newDeliveryZones.filter((dz)=>dz.id===oldDeliveryZone.id).length){
                    removeFromMap(oldDeliveryZone)
                  }
                  else { //do a diff and only draw changes
                    // console.log("in else")
                    for (let j=0;j<newDeliveryZones.length;j++){ // find matches in old/new delivery zones
                      // console.log("searching for matches")
                      let newDeliveryZone = newDeliveryZones[j];
                      if (newDeliveryZone.id === oldDeliveryZone.id){   //if we find a match
                        // console.log("found a match", newDeliveryZone, oldDeliveryZone)
                        if (newDeliveryZone.type !== oldDeliveryZone.type){ //and type is different
                          // console.log("type is different", newDeliveryZone, oldDeliveryZone)
                          removeFromMap(oldDeliveryZone); //remove old drawing to craete space for a new one
                        } else {
                          let shouldSkip = true; //if type is the same check if there's any changes
                          for (let k=0;k<propsToCompare.length;k++){
                            let prop = propsToCompare[k];
                            // console.log("comparing prop", newDeliveryZone[prop], oldDeliveryZone[prop])
                            if (newDeliveryZone[prop] != oldDeliveryZone[prop]){ //compare relevant properties
                              // console.log("pro is different", newDeliveryZone, oldDeliveryZone, prop)
                              shouldSkip= false
                              break;
                            }
                          }

                          if (shouldSkip){ //if nothing has changed, skip this delivery zone
                            deliveryZonesToSkip.push(newDeliveryZone);
                          }
                        }
                        break;
                      }
                    }
                  }
                }
              } else {
                firstLoad= false;
              }

              drawDeliveryZones(deliveryZonesToSkip);
            }, true);
          });
        }


      init();
    }
  }
}
