
angular.module('delivery.controllers',[]).
  controller('deliveryController', function($scope,$http,Resources) {
  	$scope.selected =1;
    $scope.nameFilter = null;
    
    //get venue object
    var venue = Resources.Venue.get({id:phpSession.venue_id},function(result){        
    	$scope.venue = result;    	    	
    },function(err){ console.log("error",arguments)});   

    var venueSettings = Resources.VenueSettings.get({id:phpSession.venue_id},function(result){        
        $scope.venueSettings = result;              
    },function(err){ console.log("error",arguments)});   

    var venueMessages = Resources.VenueMessages.query({venueId:phpSession.venue_id},function(result){        
        console.log("messages",result);
        $scope.venueMessages = result;              
    },function(err){ console.log("error",arguments)});   

    $scope.processForm = function() {
    	console.log("processings");    
        
        //FIXME
        //there's no typestring in the db, if we send this param it crashes
        //not sure why we're receiving both type and typestring here as they seem to be the same.        
        var messages = $scope.venueMessages;
        for (var msg in messages){
            delete messages[msg]["typeString"];
        }

        //save updated venue settings
        venueSettings.$patch({id:phpSession.venue_id},function(){
            console.log('saved:', arguments)
        });

        angular.forEach(venueMessages,function(message){
            message.$put({venueId:phpSession.venue_id},function(){
                console.log('saved:', arguments);
            })

        });    

	};

  });