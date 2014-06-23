angular.module('kyc.services')
  .factory('pusher', function (PUSHER_KEY) {
    // Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) window.console.log(message);
    };

    var pusher;
    var channel
    return {
      bind: function(venueId, outletIds, callback) {
        if ( outletIds.length > 0 ){
          angular.forEach(outletIds,function(outletId){            
            channel = pusher.subscribe('preoday.order.outlet.' + outletId);          
            channel.bind('update', callback);
          }) ;          
        } else {
          channel = pusher.subscribe('preoday.order.venue.' + venueId);          
          channel.bind('update', callback);
        }        
      },
      reset: function() {
        console.log('reseting',pusher);
        if ( pusher ) {
          var chans = pusher.allChannels();
          angular.forEach(chans, function(channel) {
            channel.unbind();
            pusher.unsubscribe(channel.name);
          })

        } else {
          pusher = new Pusher(PUSHER_KEY);
        }
      },
      bindConnection: function(event, callback) {
        pusher.connection.bind(event, callback);
      }
    };
  });
