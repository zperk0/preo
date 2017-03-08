export default function mdMap(MapsService, UtilsService, VenueService, $timeout, $q, $rootScope, BroadcastEvents){
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


      var distanceMultiplier =  VenueService.getKmOrMiles() && VenueService.getKmOrMiles()=="miles"?  1.6 : 1;
      var deliveryZoneDrawingPolygon = false;
      var shapes = {};
      var polygonDrawer = {};

      function init(){

        if(scope.venue){          
          if (!scope.venue.latitude && !scope.venue.longitude){
            MapsService.getGeoLocationByAddress(scope.venue)
              .then((location)=>{
                scope.venue.latitude = location.lat();
                scope.venue.longitude = location.lng();
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
      }

      function drawDeliveryZones(deliveryZonesToSkip){
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
            , 1000,
            {  
            stroke: true,
            color: deliveryZone.$color.border,
            weight: 3,
            opacity: 0.5,
            fill: true,
            fillColor: deliveryZone.$color.center, //same as color by default
            fillOpacity: 1,
            clickable: false   });
        }
        else if(deliveryZone.type=== 'CUSTOM'){
          return new L.polygon(            
            {
              stroke: true,
              color: deliveryZone.$color.border,
              weight: 3,
              opacity: 0.5,
              fill: true,
              fillColor: deliveryZone.$color.center, //same as color by default
              fillOpacity: 1,
              clickable: false
            });
        }       
      }    

      function updateShape(deliveryZone, shape){
        if(deliveryZone.type === 'DISTANCE'){        
          var radius =  deliveryZone.distance * 1000 * distanceMultiplier;         
          shape.setRadius(radius);
        }else if(deliveryZone.type === 'CUSTOM') {

          shape.setStyle({editable:deliveryZone.editable});

          if (deliveryZone.editable) {
            deliveryZoneDrawingPolygon = deliveryZone;
          }

          if (!deliveryZone.polygon || !deliveryZone.polygon.length){
            scope.map.removeLayer(shape);
            angular.element(document.body).addClass("map-drawing-polygon");

            polygonDrawer = new L.Draw.Polygon(scope.map);
            polygonDrawer.setOptions({fillColor:deliveryZone.$color.center, editable:true, fillOpacity:1, stroke:true, color:deliveryZone.$color.border,zIndex:deliveryZone.id});
            
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

          if(deliveryZone.editable){
              scope.map.on('editable:drawing:end', function (e) {             
              handlePolygonComplete(shape);
            });
          }
        }

        shape.setStyle({fillColor:deliveryZone.$color.center, stroke: true, color:deliveryZone.$color.border,zIndex:deliveryZone.id});

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
          scope.map.removeLayer(shape);   

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
            deliveryZoneDrawingPolygon = false;
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
          var marker = L.marker([pos.lat, pos.lng] , {draggable: !!(scope.onMarkerDrop), icon: myIcon}).addTo(scope.map);   
          
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
            scope.map.panTo(scope.markerPos);
          })
        }

        //InitMap & set center & Pin
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


      function initMap(){
        const myOptions = {
            zoom: 13
        };   
       
        var myMap = L.map(attr.id);
        var mapLayer = MQ.mapLayer(), myMap;            
        
        myMap.addLayer(mapLayer); 

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
        /*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(myMap);*/

       var tileLayer = L.control.layers({
          'Map': mapLayer,
          //'Hybrid': MQ.hybridLayer(),
          'Satellite': MQ.satelliteLayer()
          //'Dark': MQ.darkLayer(),
          //'Light': MQ.lightLayer()
        }).addTo(myMap);

        scope.map = myMap;
        if (scope.markerPos){
          addMarker(scope.markerPos)
        }        

        L.DomEvent.addListener(window, 'resize', handleResize);

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
              //layer.completeShape();            
        });    
      }

      function loadDeliveryZones() {
          
          $timeout(function () {
            scope.onLoad && scope.onLoad();
        
            handleResize();
        
            var firstLoad = true;
             scope.$watch("deliveryZones", function (newDeliveryZones, oldDeliveryZones) {
            
              var deliveryZonesToSkip = [];
              var propsToCompare = ['polygon', 'distance', '$color', 'editable'];

              console.log("comparing", newDeliveryZones, oldDeliveryZones)
              //Diff delivery zones, remove the shapes that are not in new array
              if (!firstLoad){
                for (let i=0;i<oldDeliveryZones.length;i++){
                  let oldDeliveryZone = oldDeliveryZones[i];
                  if (!newDeliveryZones.filter((dz)=>dz.id===oldDeliveryZone.id).length){
                    removeFromMap(oldDeliveryZone)
                  }
                  else { //do a diff and only draw changes
                    console.log("in else")
                    for (let j=0;j<newDeliveryZones.length;j++){ // find matches in old/new delivery zones
                      console.log("searching for matches")
                      let newDeliveryZone = newDeliveryZones[j];
                      if (newDeliveryZone.id === oldDeliveryZone.id){   //if we find a match
                        console.log("found a match", newDeliveryZone, oldDeliveryZone)
                        if (newDeliveryZone.type !== oldDeliveryZone.type){ //and type is different
                          console.log("type is different", newDeliveryZone, oldDeliveryZone)
                          removeFromMap(oldDeliveryZone); //remove old drawing to craete space for a new one
                        } else {
                          let shouldSkip = true; //if type is the same check if there's any changes
                          for (let k=0;k<propsToCompare.length;k++){
                            let prop = propsToCompare[k];
                            console.log("comparing prop", newDeliveryZone[prop], oldDeliveryZone[prop])
                            if (newDeliveryZone[prop] != oldDeliveryZone[prop]){ //compare relevant properties
                              console.log("pro is different", newDeliveryZone, oldDeliveryZone, prop)
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
