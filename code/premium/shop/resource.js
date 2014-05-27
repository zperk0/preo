angular.module('shop.resources',['ngResource']).
  factory('Resources', function($resource) {
    
    var Venue = $resource('/api/venues/:id',{id:"@id"}, {});

    var VenueSettings = $resource('/api/venues/:id/settings',{id:"@id"}, {
      patch : {
        method: "PATCH"      
      }

    });

    var VenueMessages = $resource('/api/venues/:venueId/messages/:id',{venueId:"@venueId",id:"@id"}, {
        put:{
          method: "PUT"
        }
    });    
    
    return {
        Venue:Venue,
        VenueSettings:VenueSettings,
        VenueMessages:VenueMessages
    };

  });