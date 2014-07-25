angular.module('delivery.resources',['ngResource']).
  factory('Resources', function($resource) {
    
    var Venue = $resource('/api/venues/:id',{id:"@id"}, {
        put: {
            method:"PUT"
        }
    });

    var VenueSettings = $resource('/api/venues/:id/settings',{id:"@id"}, {
      put : {
        method: "PUT"      
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