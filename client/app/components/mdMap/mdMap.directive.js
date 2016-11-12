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



      var deliveryZoneDrawingPolygon = false;
      var shapes = {};

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
        scope.drawingManager.setDrawingMode(null)
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
          return new google.maps.Circle({
            fillOpacity: 1,
            strokeWeight: 3,
            clickable: false,
            editable: false,
            center: {lat:scope.centerPos.lat, lng: scope.centerPos.lng},
          });
        }
        else if(deliveryZone.type === 'CUSTOM'){
          var polygonShape =  new google.maps.Polygon({
            strokeOpacity: 1,
            strokeWeight: 3,
            clickable: false,
            editable: false,
            fillOpacity: 1
          });

          // google.maps.event.addListener(polygonShape, 'dragend', function(){
          //   handlePolygonComplete(polygonShape);
          // });
            return polygonShape;

        }
      }

      function updateShape(deliveryZone, shape){
        if(deliveryZone.type === 'DISTANCE'){
          console.log("updating shape", deliveryZone, shape);
          var radius =  deliveryZone.distance * 1000;
          shape.setRadius(radius)
        } else if (deliveryZone.type === 'CUSTOM') {
          shape.setOptions({editable:deliveryZone.editable});
          deliveryZoneDrawingPolygon = deliveryZone;
          if (!deliveryZone.polygon || !deliveryZone.polygon.length){
            shape.setMap(null);
            scope.drawingManager.setOptions({polygonOptions:{fillColor:deliveryZone.$color.center, editable:true, fillOpacity:1, strokeColor:deliveryZone.$color.border,zIndex:deliveryZone.id}});
            angular.element(document.body).addClass("map-drawing-polygon")
            return scope.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
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
          console.log("coords", coords);
          shape.setPaths(coords);
           if (deliveryZone.editable){
            // debugger;
              google.maps.event.addListener(shape.getPath(), 'insert_at', function(){
                console.log("on insert, ", shape.getPath())
                handlePolygonComplete(shape);
              });

              google.maps.event.addListener(shape.getPath(), 'remove_at', function(){
                console.log("on remove, ",shape.getPath())
                handlePolygonComplete(shape);
              });

              google.maps.event.addListener(shape.getPath(), 'set_at', function(){
                console.log("on set, ", shape.getPath())
                handlePolygonComplete(shape);
              });
          }
        }
        shape.setOptions({fillColor:deliveryZone.$color.center, strokeColor:deliveryZone.$color.border,zIndex:deliveryZone.id});

        if (deliveryZone.visible){
          shape.setMap(scope.map)
        } else {
          shape.setMap(null)
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
          shape.setMap(null);
          delete shapes[deliveryZone.id];
        }

        function preparePolygonArray(polygon){
          var coordinates = (polygon.getPath().getArray());
          var arr = [];
          for (var i=0;i<coordinates.length;i++){
            var c = coordinates[i];
            var lat = c.lat().toFixed(5);
            var lng = c.lng().toFixed(5);
            arr.push(lat);
            arr.push(lng);
          }
          return arr;
        }

        function handlePolygonComplete(polygon){
          $timeout(()=>{
            shapes[deliveryZoneDrawingPolygon.id] = polygon;
            deliveryZoneDrawingPolygon.polygon = preparePolygonArray(polygon);
            polygon.setOptions({editable:false});
            scope.drawingManager.setOptions({polygonOptions:{editable:false}});
            scope.drawingManager.setDrawingMode(null)
            deliveryZoneDrawingPolygon = false;
          })
        }

        // draggable marker
         function handleDrop(event){
          var latLng = {lat:event.latLng.lat(), lng:event.latLng.lng()};
          if (scope.onMarkerDrop){
            scope.onMarkerDrop(latLng);
          }
        }

        function addMarker (pos) {
           var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
           var marker = new google.maps.Marker({
                position: myLatlng,
                map: scope.map,
                draggable:!!(scope.onMarkerDrop),
                icon: '/images/map-pin.png'
            });
           marker.addListener('dragend', handleDrop);
        } //end addMarker


        //resize when size of things change to prevent map from becoming grayed out
        function handleResize(){
          $timeout(function(){
            var center = scope.map.getCenter();
            google.maps.event.trigger(scope.map, "resize");
            scope.map.setCenter(center);
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
            zoom: 13,
            center: new google.maps.LatLng(scope.centerPos.lat, scope.centerPos.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        scope.map = new google.maps.Map(document.getElementById(attr.id), myOptions);
        scope.drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: false,
          polygonOptions: {
            clickable: false,
            editable: false,
          }
        });
        scope.drawingManager.setMap(scope.map);


        google.maps.event.addDomListener(window, "resize", handleResize);
        google.maps.event.addListener(scope.drawingManager, 'polygoncomplete', (polygon)=>{
          angular.element(document.body).removeClass("map-drawing-polygon")
          handlePolygonComplete(polygon)
        });
        $rootScope.$on(BroadcastEvents._ON_NAVBAR_TOGGLE,handleResize);

        if (scope.markerPos){
          addMarker(scope.markerPos)
        }

        google.maps.event.addListenerOnce(scope.map, 'idle', function(){
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
        });


      }


      init();
    }
  }
}
