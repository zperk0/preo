
angular.module('delivery.controllers',[]).
  controller('deliveryController', function($scope,$http,Resources,$q) {
  	$scope.selected =2;    
    var placeholderMessages = {
        notify : [
        {
            placeholder:{
                content:"Your order is running 15 mins late",
                name:"Late Order"   
            }
        },
        {
            placeholder:{
                content:"Your order is on its way",
                name:"En-route"   
            }
        },
        {
            placeholder:{
                content:"There is a problem with your order. Please call us",
                name:"Call us"   
            }
        }
    ],
    reject:[
        {
            placeholder:{
                content:"Your address is out of our delivery zone",
                name:"Out of zone"   
            }
        },
        {
            placeholder:{
                content:"Sorry, that item is out of stock",
                name:"Out of stock"   
            }
        },
        {
            placeholder:{
                content:"Sorry, Your order has been rejected. Please call us",
                name:"Call us"   
            }
        }
    ]};
    
    //get venue object
    var venue = Resources.Venue.get({id:phpSession.venue_id},function(result){        
    	$scope.venue = result;    	    	
    },function(err){ console.log("error",arguments)});   

    var venueSettings = Resources.VenueSettings.get({id:phpSession.venue_id},function(result){        
        $scope.venueSettings = result;              
    },function(err){ console.log("error",arguments)});   

    var venueMessages = Resources.VenueMessages.query({venueId:phpSession.venue_id},function(messages){                                
        console.log('setting:',messages)
        var notifications = 0;
        var rejects = 0;        
        for (var i=0;i<6;i++){
            if (messages.length>i){
                var message = messages[i];
                if (message.placeholder)
                    continue;
                if (message.type == "PUSH_NOTIFY"){
                    angular.extend(message,placeholderMessages.notify[notifications]);
                    notifications++;
                } else{
                    angular.extend(message,placeholderMessages.reject[rejects])
                    rejects++;
                }
            } else {
                if (notifications < 3){
                    var vm = new Resources.VenueMessages({
                        name:"",
                        content:"",
                        type:"PUSH_NOTIFY",
                        active:0,  
                        placeholder : placeholderMessages.notify[notifications].placeholder
                    });                    
                    notifications++;          
                } else {
                    var vm = new Resources.VenueMessages({
                        name:"",
                        content:"",
                        type:"PUSH_REJECT",
                        active:0, 
                        placeholder : placeholderMessages.reject[rejects]
                    })   
                    rejects++;
                }
                venueMessages.push(vm);
            }
        }        
        $scope.messages = venueMessages;
    },function(err){ console.log("error",arguments)});   

    $scope.validateMessage = function(message){
        console.log('validating message:',message)
        if (message && message.name && message.content){
            if (message.name.trim() !== "" && message.content.trim() !== ""){
                console.log('returning true')
                return true;
            }
        }
        console.log('returning false');
        return false;
    }


    $scope.processForm = function() {
    	console.log("processings");            
        console.log($scope.messages);
        //FIXME
        //there's no typestring in the db, if we send this param it crashes
        //not sure why we're receiving both type and typestring here as they seem to be the same.                
        var messages = $scope.messages;
        for (var msg in messages){
            delete messages[msg]["typeString"];
            delete messages[msg]["placeholder"];
        }

        //save updated venue settings
        venueSettings.$patch({id:phpSession.venue_id},function(){
            console.log('saved venue settings:', arguments)
        });

        //save updated messages        
        angular.forEach(messages,function(message){
            //if the message is on the database
            if (message.id){
                //if it is not blank, update it, 
                if (message.name.trim() !== "" && message.content.trim() !== "") {
                    message.$put({venueId:phpSession.venue_id},function(){   
                        console.log("put message",arguments)                 
                    });
                }  // else delete it
                else {
                    message.$remove({venueId:phpSession.venue_id},function(){
                        console.log("deleted message",arguments)
                    });
                }
            } //if it's not in the database
            else {          
                //push if the message is not blank
                console.log("on else:")
                if (message.name && message.name.trim() != "" && message.content && message.content.trim() !== ""){
                    console.log("on if in else")
                    message.$save({venueId:phpSession.venue_id},function(){
                        console.log("saved message",arguments)
                    });
                }
            }
        });            
	};

  });